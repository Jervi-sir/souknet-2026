<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Plan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionBillingController extends Controller
{
    /**
     * Display the owner's subscription and billing dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get owned businesses with their plans
        $businesses = Business::where('user_id', $user->id)
            ->with('plan')
            ->orderBy('name')
            ->get();

        // Get all active plans
        $plans = Plan::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        // Generate some realistic mock invoices for a polished UI feel
        $mockInvoices = [];
        $invoiceIndex = 1;

        foreach ($businesses as $business) {
            if ($business->plan && $business->plan->code !== 'free') {
                $priceCents = $business->plan->price_monthly_cents;
                $mockInvoices[] = [
                    'id' => 'INV-2026-' . str_pad($invoiceIndex++, 4, '0', STR_PAD_LEFT),
                    'business_name' => $business->name,
                    'plan_name' => $business->plan->en,
                    'amount' => '$' . number_format($priceCents / 100, 2),
                    'date' => now()->subDays(rand(1, 28))->format('Y-m-d'),
                    'status' => 'Paid',
                    'pdf_url' => '#',
                ];
            }
        }

        return Inertia::render('owner/subscription-billing/page', [
            'businesses' => $businesses,
            'plans' => $plans,
            'invoices' => $mockInvoices,
        ]);
    }

    /**
     * Upgrade/Change the plan for a specific business.
     */
    public function upgrade(Request $request, int $businessId): RedirectResponse
    {
        $user = $request->user();

        // Find business and confirm ownership
        $business = Business::where('id', $businessId)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'interval' => 'required|in:monthly,yearly',
        ]);

        $plan = Plan::findOrFail($validated['plan_id']);

        // Calculate expires at date
        $expiresAt = $validated['interval'] === 'yearly'
            ? now()->addYear()
            : now()->addMonth();

        // Update plan
        $business->update([
            'plan_id' => $plan->id,
            'plan_expires_at' => $expiresAt,
        ]);

        return back()->with('success', "Successfully upgraded {$business->name} to the {$plan->en} plan!");
    }
}
