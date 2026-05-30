<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\BusinessContact;
use App\Models\Category;
use App\Models\ClickEvent;
use App\Models\Plan;
use App\Models\ProfileView;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    /**
     * Display a listing of the owner's businesses with pagination and filters.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $query = Business::where('user_id', $user->id)
            ->with(['category', 'plan'])
            ->withCount('reviews')
            ->withAvg('reviews', 'rating');

        // Search filter
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%'.$request->search.'%')
                    ->orWhere('tagline', 'like', '%'.$request->search.'%');
            });
        }

        // Category filter
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $businesses = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        $categories = Category::orderBy('en', 'asc')->get(['id', 'en']);

        return Inertia::render('owner/businesses/listed-businesses/page', [
            'businesses' => $businesses,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new business.
     */
    public function create(): Response
    {
        $categories = Category::orderBy('sort_order', 'asc')
            ->orderBy('en', 'asc')
            ->get(['id', 'en']);

        $plans = Plan::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get(['id', 'en']);

        return Inertia::render('owner/listing-form/page', [
            'categories' => $categories,
            'plans' => $plans,
            'business' => null,
        ]);
    }

    /**
     * Store a newly created business listing in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tagline' => 'nullable|string|max:160',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'plan_id' => 'nullable|exists:plans,id',
            'founded_year' => 'nullable|integer|min:1800|max:'.date('Y'),
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
        ]);

        $user = $request->user();

        // Generate unique slug
        $slug = Str::slug($validated['name']);
        $originalSlug = $slug;
        $count = 1;
        while (Business::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        $business = new Business;
        $business->fill(array_merge($validated, [
            'slug' => $slug,
            'user_id' => $user->id,
            'status' => 'pending', // Pending admin approval
            'country' => $validated['country'] ?? 'DZ',
        ]));
        $business->save();

        return redirect()->route('owner.dashboard')->with('success', 'Business listing submitted successfully for review!');
    }

    /**
     * Show the detailed view of a specific business listing.
     */
    public function show(int $id, Request $request): Response
    {
        $user = $request->user();
        $business = Business::where('id', $id)
            ->where('user_id', $user->id)
            ->with(['category', 'plan'])
            ->firstOrFail();

        // Compile metrics for this specific business
        $totalViews = ProfileView::where('business_id', $business->id)->count();
        $totalClicks = ClickEvent::where('business_id', $business->id)->count();
        $totalReviews = Review::where('business_id', $business->id)->count();
        $totalContacts = BusinessContact::where('business_id', $business->id)->count();

        // Get reviews for this business
        $reviews = Review::where('business_id', $business->id)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(5, ['*'], 'reviews_page')
            ->withQueryString();

        $categories = Category::orderBy('en', 'asc')->get(['id', 'en']);
        $plans = Plan::where('is_active', true)->orderBy('sort_order', 'asc')->get(['id', 'en']);

        return Inertia::render('owner/businesses/show-business/page', [
            'business' => $business,
            'categories' => $categories,
            'plans' => $plans,
            'metrics' => [
                'views' => $totalViews,
                'clicks' => $totalClicks,
                'reviews' => $totalReviews,
                'contacts' => $totalContacts,
            ],
            'reviews' => $reviews,
        ]);
    }

    /**
     * Show the form for editing the specified business.
     */
    public function edit(int $id, Request $request): Response
    {
        $user = $request->user();
        $business = Business::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $categories = Category::orderBy('sort_order', 'asc')
            ->orderBy('en', 'asc')
            ->get(['id', 'en']);

        $plans = Plan::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get(['id', 'en']);

        return Inertia::render('owner/listing-form/page', [
            'business' => $business,
            'categories' => $categories,
            'plans' => $plans,
        ]);
    }

    /**
     * Update the specified business listing in storage.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $user = $request->user();
        $business = Business::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tagline' => 'nullable|string|max:160',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'plan_id' => 'nullable|exists:plans,id',
            'founded_year' => 'nullable|integer|min:1800|max:'.date('Y'),
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
        ]);

        // Generate unique slug only if the name changed
        if ($business->name !== $validated['name']) {
            $slug = Str::slug($validated['name']);
            $originalSlug = $slug;
            $count = 1;
            while (Business::where('slug', $slug)->where('id', '!=', $business->id)->exists()) {
                $slug = "{$originalSlug}-{$count}";
                $count++;
            }
            $business->slug = $slug;
        }

        $business->fill(array_merge($validated, [
            'country' => $validated['country'] ?? 'DZ',
        ]));
        $business->save();

        return redirect()->back()->with('success', 'Business listing updated successfully!');
    }

    /**
     * Delete the specified business listing.
     */
    public function destroy(int $id, Request $request): RedirectResponse
    {
        $user = $request->user();
        $business = Business::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $business->delete();

        return redirect()->route('owner.listings.index')->with('success', 'Business listing deleted successfully!');
    }
}
