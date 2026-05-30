<?php

namespace App\Http\Controllers\Public\SavedRecords;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use App\Models\ListItem;
use App\Models\SavedList;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SavedJobsController extends Controller
{
    /**
     * Toggle saving a job.
     */
    public function toggleSave(Request $request, JobPost $job): RedirectResponse
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        $savedList = SavedList::firstOrCreate([
            'user_id' => $user->id,
            'type' => 'job',
        ], [
            'name' => 'My Saved Jobs',
            'description' => 'A list of my saved jobs.',
        ]);

        $listItem = ListItem::where('saved_list_id', $savedList->id)
            ->where('listable_type', JobPost::class)
            ->where('listable_id', $job->id)
            ->first();

        if ($listItem) {
            $listItem->delete();
            $message = 'Job removed from your saved list.';
        } else {
            ListItem::create([
                'saved_list_id' => $savedList->id,
                'listable_type' => JobPost::class,
                'listable_id' => $job->id,
            ]);
            $message = 'Job saved successfully.';
        }

        return back()->with('success', $message);
    }

    /**
     * Bulk toggle saving jobs.
     */
    public function toggleSaveMultiple(Request $request): RedirectResponse
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return back()->with('error', 'No jobs selected.');
        }

        $savedList = SavedList::firstOrCreate([
            'user_id' => $user->id,
            'type' => 'job',
        ], [
            'name' => 'My Saved Jobs',
            'description' => 'A list of my saved jobs.',
        ]);

        $savedCount = 0;
        $unsavedCount = 0;

        foreach ($ids as $id) {
            $listItem = ListItem::where('saved_list_id', $savedList->id)
                ->where('listable_type', JobPost::class)
                ->where('listable_id', $id)
                ->first();

            if ($listItem) {
                $listItem->delete();
                $unsavedCount++;
            } else {
                ListItem::create([
                    'saved_list_id' => $savedList->id,
                    'listable_type' => JobPost::class,
                    'listable_id' => $id,
                ]);
                $savedCount++;
            }
        }

        $message = "Successfully updated selections: saved {$savedCount}, unsaved {$unsavedCount}.";

        return back()->with('success', $message);
    }

    /**
     * Display a listing of saved jobs.
     */
    public function saved(Request $request): Response
    {
        $user = Auth::user();
        $savedList = SavedList::where('user_id', $user->id)
            ->where('type', 'job')
            ->first();

        $query = JobPost::query()
            ->with(['business']);

        if ($savedList) {
            $savedIds = $savedList->items()->where('listable_type', JobPost::class)->pluck('listable_id');
            $query->whereIn('id', $savedIds);
        } else {
            $query->whereRaw('1 = 0');
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

        $jobs = $query->paginate(6)->withQueryString();

        $savedJobIds = $savedList ? $savedList->items()
            ->where('listable_type', JobPost::class)
            ->pluck('listable_id')
            ->all() : [];

        return Inertia::render('public/saved-records/saved-jobs/page', [
            'jobs' => $jobs,
            'savedJobIds' => $savedJobIds,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }
}
