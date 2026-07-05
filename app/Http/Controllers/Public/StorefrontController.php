<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Models\StoreProduct;
use Inertia\Inertia;
use Inertia\Response;

class StorefrontController extends Controller
{
    /**
     * Display the public storefront page.
     */
    public function show(string $slug): Response
    {
        $store = Store::where('slug', $slug)
            ->where('status', 'active')
            ->firstOrFail();

        $products = StoreProduct::where('store_id', $store->id)
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('public/stores/show', [
            'store' => $store,
            'products' => $products,
        ]);
    }

    /**
     * Display a specific product in the public storefront.
     */
    public function product(string $slug, string $productSlug): Response
    {
        $store = Store::where('slug', $slug)
            ->where('status', 'active')
            ->firstOrFail();

        $product = StoreProduct::where('store_id', $store->id)
            ->where('slug', $productSlug)
            ->where('status', 'active')
            ->firstOrFail();

        return Inertia::render('public/stores/product', [
            'store' => $store,
            'product' => $product,
        ]);
    }
}
