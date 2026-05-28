<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display category businesses list.
     */
    public function show(Request $request, string $code): Response
    {
        $category = Category::where('code', $code)->firstOrFail();

        $query = Business::query()
            ->where('status', 'published')
            ->where('category_id', $category->id)
            ->with(['category', 'photos'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews');

        // Apply additional inner-category filters
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('tagline', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('city')) {
            $query->where('city', $request->input('city'));
        }

        // Apply sorting
        $sort = $request->input('sort', 'newest');
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'rating':
                $query->orderByDesc('reviews_avg_rating')->orderByDesc('reviews_count');
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        // Paginate results
        $businesses = $query->paginate(9)->withQueryString();

        // Get categories for sidebar
        $categories = Category::orderBy('sort_order', 'asc')
            ->orderBy('en', 'asc')
            ->withCount(['businesses' => function ($query) {
                $query->where('status', 'published');
            }])
            ->get(['id', 'code', 'icon', 'hex_color', 'en', 'fr', 'ar']);

        // Get unique cities listing businesses in this category
        $cities = Business::where('status', 'published')
            ->where('category_id', $category->id)
            ->whereNotNull('city')
            ->where('city', '!=', '')
            ->distinct()
            ->orderBy('city', 'asc')
            ->pluck('city');

        return Inertia::render('public/category/page', [
            'category' => $category,
            'businesses' => $businesses,
            'categories' => $categories,
            'cities' => $cities,
            'filters' => [
                'search' => $request->input('search', ''),
                'city' => $request->input('city', ''),
                'sort' => $sort,
            ],
        ]);
    }
}
