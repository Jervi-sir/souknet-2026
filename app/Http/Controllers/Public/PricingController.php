<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Inertia\Inertia;
use Inertia\Response;

class PricingController extends Controller
{
    /**
     * Display pricing plans page.
     */
    public function index(): Response
    {
        $plans = Plan::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return Inertia::render('public/pricing-plans/page', [
            'plans' => $plans,
        ]);
    }
}
