<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use App\Models\Plan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
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
            'founded_year' => 'nullable|integer|min:1800|max:' . date('Y'),
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

        $business = new Business();
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
            'founded_year' => 'nullable|integer|min:1800|max:' . date('Y'),
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

        return redirect()->route('owner.dashboard')->with('success', 'Business listing updated successfully!');
    }
}
