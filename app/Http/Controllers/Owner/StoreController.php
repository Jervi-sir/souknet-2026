<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    /**
     * Display a list of the owner's stores.
     */
    public function index(Request $request): Response
    {
        $stores = Store::where('user_id', $request->user()->id)
            ->withCount('products')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('stores/index', [
            'stores' => $stores,
        ]);
    }

    /**
     * Show the form for creating a new store.
     */
    public function create(): Response
    {
        return Inertia::render('stores/create');
    }

    /**
     * Store a newly created store.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|alpha_dash',
            'description' => 'nullable|string',
            'domain' => 'nullable|string|max:255',
            'theme_color' => 'nullable|string|max:7', // Hex color e.g., #ff0000
        ]);

        $user = $request->user();
        $slug = $validated['slug'] ?? Str::slug($validated['name']);

        // Ensure unique slug
        $originalSlug = $slug;
        $count = 1;
        while (Store::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        $store = Store::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'domain' => $validated['domain'] ?? null,
            'theme_settings' => [
                'primary_color' => $validated['theme_color'] ?? '#4318FF',
            ],
            'status' => 'active',
        ]);

        return redirect()->route('stores.show', $store->id)
            ->with('success', 'Store created successfully!');
    }

    /**
     * Display details of a specific store.
     */
    public function show(int $id, Request $request): Response
    {
        $store = Store::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->with(['products' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->firstOrFail();

        return Inertia::render('stores/show', [
            'store' => $store,
        ]);
    }

    /**
     * Show storefront customization visual editor.
     */
    public function customize(int $id, Request $request): Response
    {
        $store = Store::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->with(['products' => function ($query) {
                $query->where('status', 'active')->orderBy('created_at', 'desc');
            }])
            ->firstOrFail();

        return Inertia::render('stores/customize', [
            'store' => $store,
        ]);
    }

    /**
     * Save storefront customization visual blocks settings.
     */
    public function saveCustomize(int $id, Request $request): RedirectResponse
    {
        $store = Store::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $validated = $request->validate([
            'blocks' => 'required|array',
            'theme_color' => 'nullable|string|max:7',
            'product_page' => 'nullable|array',
        ]);

        $themeSettings = $store->theme_settings ?? [];
        $themeSettings['blocks'] = $validated['blocks'];
        if (isset($validated['theme_color'])) {
            $themeSettings['primary_color'] = $validated['theme_color'];
        }
        if (isset($validated['product_page'])) {
            $themeSettings['product_page'] = $validated['product_page'];
        }

        $store->update([
            'theme_settings' => $themeSettings,
        ]);

        return redirect()->back()->with('success', 'Storefront layout customized successfully!');
    }
}
