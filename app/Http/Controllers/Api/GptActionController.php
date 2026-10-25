<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\Finder\SplFileInfo;

class GptActionController extends Controller
{
    /** @var array<string, string> */
    private const ANALYSIS_DIRECTORIES = [
        'files' => 'app',
        'controllers' => 'app/Http/Controllers',
        'frontend' => 'resources/js',
        'wayfinder' => 'resources/js',
    ];

    public function about(): JsonResponse
    {
        return response()->json([
            'name' => config('app.name'),
            'description' => 'Project inventory, allowlisted source-file reading, and limited project-file writing for Souknet.',
            'available_actions' => [
                'analyzeFiles',
                'analyzeModelsAndSchema',
                'analyzeControllers',
                'analyzeFrontend',
                'analyzeWayfinderRoutes',
                'analyzeProjectContext',
                'readProjectFile',
                'writeProjectFile',
            ],
            'message' => 'Project analysis, allowlisted source-file reading, and constrained project-file writing are available. No code is executed.',
        ]);
    }

    public function readFile(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'path' => ['required', 'string', 'max:300'],
        ]);
        $allowedDirectories = [
            'app/Models',
            'app/Http/Controllers',
            'database/migrations',
            'resources/js',
            'routes',
        ];
        $normalizedPath = str_replace('\\', '/', $validated['path']);

        if (str_contains($normalizedPath, '..') || str_starts_with($normalizedPath, '/') || str_contains($normalizedPath, "\0")) {
            return response()->json(['message' => 'File path is not allowed.'], 404);
        }

        $isAllowed = collect($allowedDirectories)->contains(fn (string $directory): bool => str_starts_with($normalizedPath, $directory.'/'));
        $absolutePath = base_path($normalizedPath);
        $realPath = realpath($absolutePath);
        $allowedRealPath = collect($allowedDirectories)->map(fn (string $directory): string|false => realpath(base_path($directory)))
            ->filter()
            ->contains(fn (string $directory): bool => is_string($realPath) && str_starts_with($realPath, $directory.DIRECTORY_SEPARATOR));

        $allowedExtension = in_array(pathinfo($normalizedPath, PATHINFO_EXTENSION), ['php', 'tsx', 'ts', 'jsx', 'js', 'css'], true);

        if (! $isAllowed || ! $allowedRealPath || ! is_file($absolutePath) || ! $allowedExtension) {
            return response()->json(['message' => 'File path is not allowed or does not exist.'], 404);
        }

        if (filesize($absolutePath) > 65536) {
            return response()->json(['message' => 'File exceeds the maximum readable size of 64 KiB.'], 413);
        }

        $contents = File::get($absolutePath);
        $maximumCharacters = 12000;

        return response()->json([
            'path' => $normalizedPath,
            'contents' => mb_substr($contents, 0, $maximumCharacters),
            'truncated' => mb_strlen($contents) > $maximumCharacters,
            'maximum_characters' => $maximumCharacters,
        ]);
    }

    public function writeFile(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'path' => ['required', 'string', 'max:300'],
            'contents' => ['required', 'string', 'max:65536'],
        ]);
        $allowedDirectories = [
            'app/Models',
            'app/Http/Controllers',
            'database/migrations',
            'resources/js',
            'routes',
        ];
        $allowedExtensions = ['php', 'tsx', 'ts', 'jsx', 'js', 'css'];
        $normalizedPath = str_replace('\\\\', '/', $validated['path']);
        $isAllowedDirectory = collect($allowedDirectories)
            ->contains(fn (string $directory): bool => str_starts_with($normalizedPath, $directory.'/'));
        $extension = pathinfo($normalizedPath, PATHINFO_EXTENSION);
        $absolutePath = base_path($normalizedPath);
        $parentRealPath = realpath(dirname($absolutePath));
        $directoryRealPaths = collect($allowedDirectories)
            ->map(fn (string $directory): string|false => realpath(base_path($directory)))
            ->filter();
        $isAllowedParent = is_string($parentRealPath)
            && $directoryRealPaths->contains(fn (string $directory): bool => $parentRealPath === $directory || str_starts_with($parentRealPath, $directory.DIRECTORY_SEPARATOR));

        if (
            str_contains($normalizedPath, '..')
            || str_starts_with($normalizedPath, '/')
            || str_contains($normalizedPath, '\\0')
            || ! $isAllowedDirectory
            || ! in_array($extension, $allowedExtensions, true)
            || ! $isAllowedParent
            || is_link($absolutePath)
        ) {
            return response()->json(['message' => 'File path is not allowed.'], 404);
        }

        if (is_file($absolutePath) && filesize($absolutePath) > 65536) {
            return response()->json(['message' => 'File exceeds the maximum writable size of 64 KiB.'], 413);
        }

        File::put($absolutePath, $validated['contents']);

        return response()->json([
            'message' => 'Project file written successfully.',
            'path' => $normalizedPath,
            'bytes_written' => strlen($validated['contents']),
        ], 200);
    }

    public function analyze(string $area): JsonResponse
    {
        $analysis = match ($area) {
            'files' => $this->analyzeFiles(),
            'models-schema' => $this->analyzeModelsAndSchema(),
            'controllers' => $this->analyzeControllers(),
            'frontend' => $this->analyzeFrontend(),
            'wayfinder' => $this->analyzeWayfinderRoutes(),
            'context' => $this->analyzeProjectContext(),
            default => null,
        };

        if ($analysis === null) {
            return response()->json(['message' => 'Unknown analysis area.'], 404);
        }

        return response()->json(['area' => $area, 'analysis' => $analysis]);
    }

    /** @return array<string, mixed> */
    private function analyzeFiles(): array
    {
        return [
            'description' => 'Allowlisted application source inventory. File contents and secrets are not returned.',
            'directories' => collect(self::ANALYSIS_DIRECTORIES)
                ->map(fn (string $directory): array => [
                    'directory' => $directory,
                    'files' => $this->relativeFilePaths($directory),
                ])
                ->values(),
        ];
    }

    /** @return array<string, mixed> */
    private function analyzeModelsAndSchema(): array
    {
        $models = $this->relativeFilePaths('app/Models');
        $tables = collect(Schema::getTables())->map(function (array $table): array {
            $tableName = $table['name'];

            return [
                'name' => $tableName,
                'columns' => collect(Schema::getColumns($tableName))->map(fn (array $column): array => [
                    'name' => $column['name'],
                    'type' => $column['type_name'] ?? $column['type'] ?? 'unknown',
                    'nullable' => $column['nullable'] ?? null,
                ])->values(),
                'indexes' => collect(Schema::getIndexes($tableName))->map(fn (array $index): array => [
                    'name' => $index['name'] ?? null,
                    'columns' => $index['columns'] ?? [],
                    'primary' => $index['primary'] ?? false,
                    'unique' => $index['unique'] ?? false,
                ])->values(),
            ];
        })->values();

        return [
            'models' => $models,
            'tables' => $tables,
        ];
    }

    /** @return array<string, mixed> */
    private function analyzeControllers(): array
    {
        return [
            'files' => $this->relativeFilePaths('app/Http/Controllers'),
            'routes' => collect(Route::getRoutes())->map(fn ($route): array => [
                'methods' => $route->methods(),
                'uri' => $route->uri(),
                'name' => $route->getName(),
                'action' => $route->getActionName(),
            ])->filter(fn (array $route): bool => str_starts_with($route['action'], 'App\\'))
                ->values(),
        ];
    }

    /** @return array<string, mixed> */
    private function analyzeFrontend(): array
    {
        return [
            'description' => 'React frontend inventory, including page, component, hook, and layout file paths.',
            'directories' => collect(['pages', 'components', 'hooks', 'layouts'])
                ->map(fn (string $directory): array => [
                    'directory' => "resources/js/{$directory}",
                    'files' => $this->relativeFilePaths("resources/js/{$directory}"),
                ])->values(),
        ];
    }

    /** @return array<string, mixed> */
    private function analyzeWayfinderRoutes(): array
    {
        return [
            'generated_files' => collect(['resources/js/actions', 'resources/js/routes', 'resources/js/wayfinder'])
                ->map(fn (string $directory): array => [
                    'directory' => $directory,
                    'files' => $this->relativeFilePaths($directory),
                ])->values(),
            'named_routes' => collect(Route::getRoutes())
                ->filter(fn ($route): bool => $route->getName() !== null)
                ->map(fn ($route): array => [
                    'name' => $route->getName(),
                    'methods' => $route->methods(),
                    'uri' => $route->uri(),
                ])->values(),
        ];
    }

    /** @return array<string, mixed> */
    private function analyzeProjectContext(): array
    {
        $composer = json_decode(File::get(base_path('composer.json')), true);
        $package = json_decode(File::get(base_path('package.json')), true);

        return [
            'application' => config('app.name'),
            'laravel_version' => app()->version(),
            'php_version' => PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION,
            'backend_dependencies' => $composer['require'] ?? [],
            'frontend_dependencies' => $package['dependencies'] ?? [],
            'frontend_dev_dependencies' => $package['devDependencies'] ?? [],
            'product_scope' => [
                'ecommerce',
                'store builder',
                'call center',
                'delivery center',
            ],
            'source_disclosure' => 'Project context includes dependency names and versions only; environment variables, secrets, and raw source are excluded.',
        ];
    }

    /** @return list<string> */
    private function relativeFilePaths(string $directory): array
    {
        $absolutePath = base_path($directory);

        if (! File::isDirectory($absolutePath)) {
            return [];
        }

        return collect(File::allFiles($absolutePath))
            ->map(fn (SplFileInfo $file): string => $directory.'/'.$file->getRelativePathname())
            ->sort()
            ->take(200)
            ->values()
            ->all();
    }
}
