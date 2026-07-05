<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Models\StoreProduct;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class StoreProductController extends Controller
{
    /**
     * Show the form for creating a new product under a store.
     */
    public function create(int $storeId, Request $request): Response
    {
        $store = Store::where('id', $storeId)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        return Inertia::render('stores/products/create', [
            'store' => $store,
        ]);
    }

    /**
     * Store a newly created product under a store.
     */
    public function store(int $storeId, Request $request): RedirectResponse
    {
        $store = Store::where('id', $storeId)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0', // Inputs as dollars (e.g. 19.99)
            'compare_at_price' => 'nullable|numeric|min:0',
            'sku' => 'nullable|string|max:100',
            'barcode' => 'nullable|string|max:100',
            'inventory_quantity' => 'required|integer|min:0',
            'track_inventory' => 'required|boolean',
            'status' => 'required|string|in:draft,active,archived',
            'image_path' => 'nullable|string|max:500',
        ]);

        $slug = Str::slug($validated['name']);
        $originalSlug = $slug;
        $count = 1;
        while (StoreProduct::where('store_id', $store->id)->where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        // Convert dollars to cents for DB storage
        $priceCents = (int) round($validated['price'] * 100);
        $compareAtPriceCents = isset($validated['compare_at_price'])
            ? (int) round($validated['compare_at_price'] * 100)
            : null;

        StoreProduct::create([
            'store_id' => $store->id,
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'price_cents' => $priceCents,
            'compare_at_price_cents' => $compareAtPriceCents,
            'sku' => $validated['sku'] ?? null,
            'barcode' => $validated['barcode'] ?? null,
            'inventory_quantity' => $validated['inventory_quantity'],
            'track_inventory' => $validated['track_inventory'],
            'status' => $validated['status'],
            'image_path' => $validated['image_path'] ?? null,
        ]);

        return redirect()->route('stores.show', $store->id)
            ->with('success', 'Product added successfully!');
    }
}
