<?php

use App\Http\Controllers\Api\GptActionController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:30,1')
    ->prefix('gpt')
    ->name('gpt.')
    ->group(function (): void {
        Route::get('/about', [GptActionController::class, 'about'])->name('about');
        Route::get('/analyze/{area}', [GptActionController::class, 'analyze'])
            ->where('area', 'files|models-schema|controllers|frontend|wayfinder|context')
            ->name('analyze');
        Route::get('/file', [GptActionController::class, 'readFile'])
            ->name('files.read');
        Route::put('/file', [GptActionController::class, 'writeFile'])
            ->name('files.write');
    });
