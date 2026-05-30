<?php

namespace App\Http\Controllers\Public\Discover;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\People;
use App\Models\SavedList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DiscoverPeopleController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $query = People::query()
            ->with(['business.category']);

        $tab = $request->input('tab', 'all');
        if ($tab === 'saved' && Auth::check()) {
            $user = Auth::user();
            $savedList = SavedList::where('user_id', $user->id)
                ->where('type', 'people')
                ->first();

            if ($savedList) {
                $savedIds = $savedList->items()->where('listable_type', People::class)->pluck('listable_id');
                $query->whereIn('id', $savedIds);
            } else {
                $query->whereRaw('1 = 0');
            }
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhereHas('business', function ($bq) use ($search) {
                        $bq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('category')) {
            $query->whereHas('business', function ($q) use ($request) {
                $q->where('category_id', $request->input('category'));
            });
        }

        if ($request->filled('city')) {
            $city = $request->input('city');
            $query->where('location', 'like', "%{$city}%");
        }

        if ($request->boolean('verified')) {
            $query->where('is_verified', true);
        }

        $sort = $request->input('sort', 'newest');
        switch ($sort) {
            case 'name':
                $query->orderBy('first_name', 'asc')->orderBy('last_name', 'asc');
                break;
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $people = $query->paginate(10)->withQueryString();

        $categories = Category::orderBy('sort_order', 'asc')
            ->orderBy('en', 'asc')
            ->get(['id', 'code', 'icon', 'hex_color', 'en', 'fr', 'ar']);

        $cities = People::whereNotNull('location')
            ->where('location', '!=', '')
            ->distinct()
            ->orderBy('location', 'asc')
            ->pluck('location')
            ->map(function (string $location) {
                return trim(explode(',', $location)[0]);
            })
            ->unique()
            ->values()
            ->all();

        $savedPeopleIds = [];
        if (Auth::check()) {
            $user = Auth::user();
            $savedList = SavedList::where('user_id', $user->id)
                ->where('type', 'people')
                ->first();
            if ($savedList) {
                $savedPeopleIds = $savedList->items()
                    ->where('listable_type', People::class)
                    ->pluck('listable_id')
                    ->all();
            }
        }

        return Inertia::render('public/discover/people/page', [
            'people' => $people,
            'categories' => $categories,
            'cities' => $cities,
            'savedPeopleIds' => $savedPeopleIds,
            'filters' => [
                'search' => $request->input('search', ''),
                'category' => $request->input('category', ''),
                'city' => $request->input('city', ''),
                'verified' => $request->boolean('verified'),
                'sort' => $sort,
                'tab' => $tab,
            ],
        ]);
    }
}
