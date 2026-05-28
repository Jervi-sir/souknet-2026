<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewManagementController extends Controller
{
    /**
     * Display a listing of all reviews for moderation.
     */
    public function index(Request $request): Response
    {
        $query = Review::with(['user', 'business']);

        // Apply Search (comment, user name, business name)
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('comment', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('business', function ($bq) use ($search) {
                        $bq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Apply Rating Filter
        if ($request->filled('rating') && $request->input('rating') !== 'all') {
            $query->where('rating', $request->input('rating'));
        }

        // Apply Sort
        $sort = $request->input('sort', 'newest');
        if ($sort === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } elseif ($sort === 'rating_desc') {
            $query->orderBy('rating', 'desc');
        } elseif ($sort === 'rating_asc') {
            $query->orderBy('rating', 'asc');
        } else {
            $query->orderBy('created_at', 'desc'); // newest
        }

        $reviews = $query->paginate(15)->withQueryString();

        return Inertia::render('admin/reviews/page', [
            'reviews' => $reviews,
            'filters' => [
                'search' => $request->input('search', ''),
                'rating' => $request->input('rating', 'all'),
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Delete/moderate a review.
     */
    public function destroy(int $id): RedirectResponse
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return back()->with('success', 'Review deleted successfully from platform.');
    }
}
