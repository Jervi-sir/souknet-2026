<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard with stats, pending approvals, and transactions.
     */
    public function index(Request $request): Response
    {
        $totalBusinesses = Business::count();
        $pendingCount = Business::where('status', 'pending')->count();
        $totalUsers = User::count();

        // Calculate simulated revenue from all active paid business listings
        $totalRevenueCents = Business::whereNotNull('plan_id')
            ->with('plan')
            ->get()
            ->sum(fn ($b) => $b->plan->price_monthly_cents ?? 0);

        $newSignups = User::where('created_at', '>=', now()->startOfMonth())->count();

        // Count businesses on paid plans (premium or enterprise)
        $activePaidSubscriptions = Business::whereHas('plan', function ($q) {
            $q->where('code', '!=', 'free');
        })->count();

        // Pending businesses to review
        $pendingBusinesses = Business::where('status', 'pending')
            ->with(['category', 'user'])
            ->latest()
            ->take(5)
            ->get();

        // Generate some realistic recent transactions using existing users and plans
        $recentPayments = [];
        $paidBusinesses = Business::whereHas('plan', function ($q) {
            $q->where('code', '!=', 'free');
        })->with(['user', 'plan'])->latest()->take(5)->get();

        $idIndex = 1;
        foreach ($paidBusinesses as $biz) {
            if ($biz->user && $biz->plan) {
                $recentPayments[] = [
                    'id' => $idIndex++,
                    'user' => [
                        'id' => $biz->user->id,
                        'name' => $biz->user->name,
                        'email' => $biz->user->email,
                    ],
                    'plan' => [
                        'id' => $biz->plan->id,
                        'code' => $biz->plan->code,
                        'en' => $biz->plan->en,
                    ],
                    'amount_cents' => $biz->plan->price_monthly_cents,
                    'created_at' => $biz->updated_at->toIso8601String(),
                    'status' => 'succeeded',
                ];
            }
        }

        // If not enough paid businesses to show, supplement with some generated defaults
        if (count($recentPayments) < 3) {
            $someUsers = User::latest()->take(3)->get();
            $paidPlans = Plan::where('code', '!=', 'free')->get();
            if ($paidPlans->isNotEmpty()) {
                foreach ($someUsers as $u) {
                    if (count($recentPayments) >= 5) {
                        break;
                    }
                    $plan = $paidPlans->random();
                    if ($plan) {
                        $recentPayments[] = [
                            'id' => $idIndex++,
                            'user' => [
                                'id' => $u->id,
                                'name' => $u->name,
                                'email' => $u->email,
                            ],
                            'plan' => [
                                'id' => $plan->id,
                                'code' => $plan->code,
                                'en' => $plan->en,
                            ],
                            'amount_cents' => $plan->price_monthly_cents,
                            'created_at' => now()->subDays(rand(1, 10))->toIso8601String(),
                            'status' => 'succeeded',
                        ];
                    }
                }
            }
        }

        return Inertia::render('admin/dashboard/page', [
            'stats' => [
                'total_businesses' => $totalBusinesses,
                'pending_businesses' => $pendingCount,
                'total_users' => $totalUsers,
                'total_revenue_cents' => $totalRevenueCents,
                'new_signups_this_month' => $newSignups,
                'active_subscriptions' => $activePaidSubscriptions,
            ],
            'pendingBusinesses' => $pendingBusinesses,
            'recentPayments' => $recentPayments,
        ]);
    }
}
