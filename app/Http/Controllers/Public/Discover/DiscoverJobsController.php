<?php

namespace App\Http\Controllers\Public\Discover;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use App\Models\SavedList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DiscoverJobsController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $query = JobPost::query()
            ->where('is_active', true)
            ->with(['business']);

        $tab = $request->input('tab', 'all');
        if ($tab === 'saved' && Auth::check()) {
            $user = Auth::user();
            $savedList = SavedList::where('user_id', $user->id)
                ->where('type', 'job')
                ->first();

            if ($savedList) {
                $savedIds = $savedList->items()->where('listable_type', JobPost::class)->pluck('listable_id');
                $query->whereIn('id', $savedIds);
            } else {
                $query->whereRaw('1 = 0');
            }
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('business', function ($bq) use ($search) {
                        $bq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', "%{$request->input('location')}%");
        }

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('experience')) {
            $query->where('experience', $request->input('experience'));
        }

        $sort = $request->input('sort', 'newest');
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $jobs = $query->paginate(6)->withQueryString();

        $savedJobIds = [];
        if (Auth::check()) {
            $user = Auth::user();
            $savedList = SavedList::where('user_id', $user->id)
                ->where('type', 'job')
                ->first();
            if ($savedList) {
                $savedJobIds = $savedList->items()
                    ->where('listable_type', JobPost::class)
                    ->pluck('listable_id')
                    ->all();
            }
        }

        $locations = JobPost::where('is_active', true)
            ->whereNotNull('location')
            ->where('location', '!=', '')
            ->distinct()
            ->orderBy('location', 'asc')
            ->pluck('location')
            ->all();

        return Inertia::render('public/discover/jobs/page', [
            'jobs' => $jobs,
            'savedJobIds' => $savedJobIds,
            'locations' => $locations,
            'filters' => [
                'search' => $request->input('search', ''),
                'location' => $request->input('location', ''),
                'type' => $request->input('type', ''),
                'experience' => $request->input('experience', ''),
                'sort' => $sort,
                'tab' => $tab,
            ],
        ]);
    }
}
