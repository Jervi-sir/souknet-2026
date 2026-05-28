<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\BusinessContact;
use App\Models\ClickEvent;
use App\Models\ProfileView;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OwnerDashboardController extends Controller
{
    /**
     * Display the owner dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get all businesses owned by this user
        $businesses = Business::where('user_id', $user->id)
            ->with(['category', 'plan'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->get();

        $businessIds = $businesses->pluck('id');

        // Compile metrics
        $totalBusinesses = $businesses->count();
        $totalViews = ProfileView::whereIn('business_id', $businessIds)->count();
        $totalClicks = ClickEvent::whereIn('business_id', $businessIds)->count();
        $totalReviews = Review::whereIn('business_id', $businessIds)->count();
        $totalContacts = BusinessContact::whereIn('business_id', $businessIds)->count();

        // Get recent contact/lead messages
        $recentContacts = BusinessContact::whereIn('business_id', $businessIds)
            ->with('business')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Get recent reviews
        $recentReviews = Review::whereIn('business_id', $businessIds)
            ->with(['business', 'user'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('owner/dashboard/page', [
            'businesses' => $businesses,
            'metrics' => [
                'businesses' => $totalBusinesses,
                'views' => $totalViews,
                'clicks' => $totalClicks,
                'reviews' => $totalReviews,
                'contacts' => $totalContacts,
            ],
            'recentContacts' => $recentContacts,
            'recentReviews' => $recentReviews,
        ]);
    }
}
