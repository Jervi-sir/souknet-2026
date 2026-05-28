<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use App\Models\Review;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the homepage.
     */
    public function index(): Response
    {
        // Get categories with active businesses count
        $categories = Category::orderBy('sort_order', 'asc')
            ->orderBy('en', 'asc')
            ->withCount(['businesses' => function ($query) {
                $query->where('status', 'published');
            }])
            ->get(['id', 'code', 'icon', 'hex_color', 'en', 'fr', 'ar']);

        // Get up to 6 featured published businesses
        $featuredBusinesses = Business::where('status', 'published')
            ->where('is_featured', true)
            ->with(['category', 'photos'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->limit(6)
            ->get();

        // Calculate statistics
        $totalBusinesses = Business::where('status', 'published')->count();
        $totalReviews = Review::count();
        $totalCities = Business::where('status', 'published')
            ->whereNotNull('city')
            ->where('city', '!=', '')
            ->distinct('city')
            ->count('city');

        return Inertia::render('public/home/page', [
            'categories' => $categories,
            'featuredBusinesses' => $featuredBusinesses,
            'stats' => [
                'businesses' => $totalBusinesses,
                'reviews' => $totalReviews,
                'cities' => $totalCities ?: 1, // Avoid displaying 0 for covered cities
            ],
        ]);
    }
}
