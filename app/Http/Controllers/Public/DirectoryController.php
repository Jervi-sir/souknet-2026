<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DirectoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Business::query()
            ->where('status', 'published')
            ->with(['category', 'photos'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews');

        // Apply filters
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('tagline', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->input('category'));
        }

        if ($request->filled('city')) {
            $query->where('city', $request->input('city'));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->boolean('verified')) {
            $query->where('is_verified', true);
        }

        // Apply sorting
        $sort = $request->input('sort', 'newest');
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'rating':
                // Order by rating average desc, then count desc
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

        // Get categories for filtering
        $categories = Category::orderBy('sort_order', 'asc')
            ->orderBy('en', 'asc')
            ->get(['id', 'code', 'icon', 'hex_color', 'en', 'fr', 'ar']);

        // Get unique cities for filtering helper
        $cities = Business::where('status', 'published')
            ->whereNotNull('city')
            ->where('city', '!=', '')
            ->distinct()
            ->orderBy('city', 'asc')
            ->pluck('city');

        return Inertia::render('public/directory/page', [
            'businesses' => $businesses,
            'categories' => $categories,
            'cities' => $cities,
            'filters' => [
                'search' => $request->input('search', ''),
                'category' => $request->input('category', ''),
                'city' => $request->input('city', ''),
                'featured' => $request->boolean('featured'),
                'verified' => $request->boolean('verified'),
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug): Response
    {
        $business = Business::where('slug', $slug)
            ->where('status', 'published')
            ->with(['category', 'photos', 'tags', 'hours', 'reviews.user'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->firstOrFail();

        return Inertia::render('public/business-profile/page', [
            'business' => $business,
        ]);
    }
}
