<?php

namespace App\Http\Controllers\Public\Discover;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\SavedList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DiscoverProductsController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $query = Product::query()
            ->where('is_active', true)
            ->with(['business', 'category']);

        $tab = $request->input('tab', 'all');
        if ($tab === 'saved' && Auth::check()) {
            $user = Auth::user();
            $savedList = SavedList::where('user_id', $user->id)
                ->where('type', 'product')
                ->first();

            if ($savedList) {
                $savedIds = $savedList->items()->where('listable_type', Product::class)->pluck('listable_id');
                $query->whereIn('id', $savedIds);
            } else {
                $query->whereRaw('1 = 0');
            }
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('specs', 'like', "%{$search}%")
                    ->orWhereHas('business', function ($bq) use ($search) {
                        $bq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->input('category'));
        }

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        $sort = $request->input('sort', 'newest');
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'price_asc':
                $query->orderBy('price_cents', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price_cents', 'desc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $products = $query->paginate(9)->withQueryString();

        $categories = Category::orderBy('sort_order', 'asc')
            ->orderBy('en', 'asc')
            ->get(['id', 'code', 'icon', 'hex_color', 'en', 'fr', 'ar']);

        $savedProductIds = [];
        if (Auth::check()) {
            $user = Auth::user();
            $savedList = SavedList::where('user_id', $user->id)
                ->where('type', 'product')
                ->first();
            if ($savedList) {
                $savedProductIds = $savedList->items()
                    ->where('listable_type', Product::class)
                    ->pluck('listable_id')
                    ->all();
            }
        }

        return Inertia::render('public/discover/products/page', [
            'products' => $products,
            'categories' => $categories,
            'savedProductIds' => $savedProductIds,
            'filters' => [
                'search' => $request->input('search', ''),
                'category' => $request->input('category', ''),
                'type' => $request->input('type', ''),
                'sort' => $sort,
                'tab' => $tab,
            ],
        ]);
    }
}
