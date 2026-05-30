<?php

namespace App\Http\Controllers\Public\SavedRecords;

use App\Http\Controllers\Controller;
use App\Models\ListItem;
use App\Models\Product;
use App\Models\SavedList;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SavedProductsController extends Controller
{
    /**
     * Toggle saving a product.
     */
    public function toggleSave(Request $request, Product $product): RedirectResponse
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        $savedList = SavedList::firstOrCreate([
            'user_id' => $user->id,
            'type' => 'product',
        ], [
            'name' => 'My Saved Products',
            'description' => 'A list of my saved products.',
        ]);

        $listItem = ListItem::where('saved_list_id', $savedList->id)
            ->where('listable_type', Product::class)
            ->where('listable_id', $product->id)
            ->first();

        if ($listItem) {
            $listItem->delete();
            $message = 'Product removed from your saved list.';
        } else {
            ListItem::create([
                'saved_list_id' => $savedList->id,
                'listable_type' => Product::class,
                'listable_id' => $product->id,
            ]);
            $message = 'Product saved successfully.';
        }

        return back()->with('success', $message);
    }

    /**
     * Bulk toggle saving products.
     */
    public function toggleSaveMultiple(Request $request): RedirectResponse
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return back()->with('error', 'No products selected.');
        }

        $savedList = SavedList::firstOrCreate([
            'user_id' => $user->id,
            'type' => 'product',
        ], [
            'name' => 'My Saved Products',
            'description' => 'A list of my saved products.',
        ]);

        $savedCount = 0;
        $unsavedCount = 0;

        foreach ($ids as $id) {
            $listItem = ListItem::where('saved_list_id', $savedList->id)
                ->where('listable_type', Product::class)
                ->where('listable_id', $id)
                ->first();

            if ($listItem) {
                $listItem->delete();
                $unsavedCount++;
            } else {
                ListItem::create([
                    'saved_list_id' => $savedList->id,
                    'listable_type' => Product::class,
                    'listable_id' => $id,
                ]);
                $savedCount++;
            }
        }

        $message = "Successfully updated selections: saved {$savedCount}, unsaved {$unsavedCount}.";

        return back()->with('success', $message);
    }

    /**
     * Display a listing of saved products.
     */
    public function saved(Request $request): Response
    {
        $user = Auth::user();
        $savedList = SavedList::where('user_id', $user->id)
            ->where('type', 'product')
            ->first();

        $query = Product::query()
            ->with(['business', 'category']);

        if ($savedList) {
            $savedIds = $savedList->items()->where('listable_type', Product::class)->pluck('listable_id');
            $query->whereIn('id', $savedIds);
        } else {
            $query->whereRaw('1 = 0');
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

        $products = $query->paginate(9)->withQueryString();

        $savedProductIds = $savedList ? $savedList->items()
            ->where('listable_type', Product::class)
            ->pluck('listable_id')
            ->all() : [];

        return Inertia::render('public/saved-records/saved-products/page', [
            'products' => $products,
            'savedProductIds' => $savedProductIds,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }
}
