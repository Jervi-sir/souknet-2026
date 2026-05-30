<?php

namespace App\Http\Controllers\Public\Discover;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use App\Models\SavedList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DiscoverCompaniesController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $query = Business::query()
            ->where('status', 'published')
            ->with(['category', 'photos'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews');

        $tab = $request->input('tab', 'all');
        if ($tab === 'saved' && Auth::check()) {
            $user = Auth::user();
            $savedList = SavedList::where('user_id', $user->id)
                ->where('type', 'business')
                ->first();

            if ($savedList) {
                $savedIds = $savedList->items()->where('listable_type', Business::class)->pluck('listable_id');
                $query->whereIn('id', $savedIds);
            } else {
                $query->whereRaw('1 = 0');
            }
        }

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

        $businesses = $query->paginate(9)->withQueryString();

        $categories = Category::orderBy('sort_order', 'asc')
            ->orderBy('en', 'asc')
            ->get(['id', 'code', 'icon', 'hex_color', 'en', 'fr', 'ar']);

        $cities = Business::where('status', 'published')
            ->whereNotNull('city')
            ->where('city', '!=', '')
            ->distinct()
            ->orderBy('city', 'asc')
            ->pluck('city');

        $savedCompanyIds = [];
        if (Auth::check()) {
            $user = Auth::user();
            $savedList = SavedList::where('user_id', $user->id)
                ->where('type', 'business')
                ->first();
            if ($savedList) {
                $savedCompanyIds = $savedList->items()
                    ->where('listable_type', Business::class)
                    ->pluck('listable_id')
                    ->all();
            }
        }

        return Inertia::render('public/discover/companies/page', [
            'businesses' => $businesses,
            'categories' => $categories,
            'cities' => $cities,
            'savedCompanyIds' => $savedCompanyIds,
            'filters' => [
                'search' => $request->input('search', ''),
                'category' => $request->input('category', ''),
                'city' => $request->input('city', ''),
                'featured' => $request->boolean('featured'),
                'verified' => $request->boolean('verified'),
                'sort' => $sort,
                'tab' => $tab,
            ],
        ]);
    }
}
