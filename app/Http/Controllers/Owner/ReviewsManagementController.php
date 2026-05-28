<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Review;
use App\Models\ReviewReply;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewsManagementController extends Controller
{
    /**
     * Display a listing of the reviews.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get owned business IDs
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $query = Review::whereIn('business_id', $businessIds)
            ->with(['business', 'user', 'reply']);

        // Apply filters
        $ratingFilter = $request->input('rating', 'all');
        if ($ratingFilter === 'good') {
            $query->whereIn('rating', [4, 5]);
        } elseif ($ratingFilter === 'average') {
            $query->where('rating', 3);
        } elseif ($ratingFilter === 'critical') {
            $query->whereIn('rating', [1, 2]);
        }

        // Apply search keyword filter
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('body', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $reviews = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('owner/reviews-management/page', [
            'reviews' => $reviews,
            'filters' => [
                'rating' => $ratingFilter,
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    /**
     * Store a reply to the specified review.
     */
    public function reply(Request $request, int $id): RedirectResponse
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $review = Review::where('id', $id)
            ->whereIn('business_id', $businessIds)
            ->firstOrFail();

        $validated = $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        // Check if reply already exists, update or create
        $reply = ReviewReply::where('review_id', $review->id)->first();
        if ($reply) {
            $reply->update([
                'body' => $validated['body'],
                'user_id' => $user->id,
            ]);
        } else {
            ReviewReply::create([
                'review_id' => $review->id,
                'user_id' => $user->id,
                'body' => $validated['body'],
            ]);
        }

        return back();
    }
}
