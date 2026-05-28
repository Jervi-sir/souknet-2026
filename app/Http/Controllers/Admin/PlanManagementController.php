<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlanManagementController extends Controller
{
    /**
     * Display a listing of the plans.
     */
    public function index(): Response
    {
        $plans = Plan::orderBy('sort_order')->orderBy('id')->get();

        return Inertia::render('admin/plans/page', [
            'plans' => $plans,
        ]);
    }

    /**
     * Store a newly created plan.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:plans,code|max:100',
            'en' => 'required|string|max:255',
            'fr' => 'nullable|string|max:255',
            'ar' => 'nullable|string|max:255',
            'stripe_price_id_monthly' => 'nullable|string|max:255',
            'stripe_price_id_yearly' => 'nullable|string|max:255',
            'price_monthly_cents' => 'required|integer|min:0',
            'price_yearly_cents' => 'required|integer|min:0',
            'max_photos' => 'required|integer|min:0',
            'has_analytics' => 'required|boolean',
            'has_featured' => 'required|boolean',
            'has_verified_badge' => 'required|boolean',
            'is_active' => 'required|boolean',
            'sort_order' => 'required|integer|min:0',
        ]);

        Plan::create($validated);

        return back()->with('success', 'Subscription plan created successfully.');
    }

    /**
     * Update the specified plan.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $plan = Plan::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|max:100|unique:plans,code,'.$id,
            'en' => 'required|string|max:255',
            'fr' => 'nullable|string|max:255',
            'ar' => 'nullable|string|max:255',
            'stripe_price_id_monthly' => 'nullable|string|max:255',
            'stripe_price_id_yearly' => 'nullable|string|max:255',
            'price_monthly_cents' => 'required|integer|min:0',
            'price_yearly_cents' => 'required|integer|min:0',
            'max_photos' => 'required|integer|min:0',
            'has_analytics' => 'required|boolean',
            'has_featured' => 'required|boolean',
            'has_verified_badge' => 'required|boolean',
            'is_active' => 'required|boolean',
            'sort_order' => 'required|integer|min:0',
        ]);

        $plan->update($validated);

        return back()->with('success', 'Subscription plan updated successfully.');
    }
}
