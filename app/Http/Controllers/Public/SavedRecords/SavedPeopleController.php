<?php

namespace App\Http\Controllers\Public\SavedRecords;

use App\Http\Controllers\Controller;
use App\Models\ListItem;
use App\Models\People;
use App\Models\SavedList;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SavedPeopleController extends Controller
{
    /**
     * Toggle saving a person.
     */
    public function toggleSave(Request $request, People $person): RedirectResponse
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        $savedList = SavedList::firstOrCreate([
            'user_id' => $user->id,
            'type' => 'people',
        ], [
            'name' => 'My Saved People',
            'description' => 'A list of my saved people.',
        ]);

        $listItem = ListItem::where('saved_list_id', $savedList->id)
            ->where('listable_type', People::class)
            ->where('listable_id', $person->id)
            ->first();

        if ($listItem) {
            $listItem->delete();
            $message = 'Person removed from your saved list.';
        } else {
            ListItem::create([
                'saved_list_id' => $savedList->id,
                'listable_type' => People::class,
                'listable_id' => $person->id,
            ]);
            $message = 'Person saved successfully.';
        }

        return back()->with('success', $message);
    }

    /**
     * Bulk toggle saving people.
     */
    public function toggleSaveMultiple(Request $request): RedirectResponse
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return back()->with('error', 'No people selected.');
        }

        $savedList = SavedList::firstOrCreate([
            'user_id' => $user->id,
            'type' => 'people',
        ], [
            'name' => 'My Saved People',
            'description' => 'A list of my saved people.',
        ]);

        $savedCount = 0;
        $unsavedCount = 0;

        foreach ($ids as $id) {
            $listItem = ListItem::where('saved_list_id', $savedList->id)
                ->where('listable_type', People::class)
                ->where('listable_id', $id)
                ->first();

            if ($listItem) {
                $listItem->delete();
                $unsavedCount++;
            } else {
                ListItem::create([
                    'saved_list_id' => $savedList->id,
                    'listable_type' => People::class,
                    'listable_id' => $id,
                ]);
                $savedCount++;
            }
        }

        $message = "Successfully updated selections: saved {$savedCount}, unsaved {$unsavedCount}.";

        return back()->with('success', $message);
    }

    /**
     * Display a listing of saved people.
     */
    public function saved(Request $request): Response
    {
        $user = Auth::user();
        $savedList = SavedList::where('user_id', $user->id)
            ->where('type', 'people')
            ->first();

        $query = People::query()
            ->with(['business.category']);

        if ($savedList) {
            $savedIds = $savedList->items()->where('listable_type', People::class)->pluck('listable_id');
            $query->whereIn('id', $savedIds);
        } else {
            $query->whereRaw('1 = 0');
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhereHas('business', function ($bq) use ($search) {
                        $bq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $people = $query->paginate(10)->withQueryString();

        $savedPeopleIds = $savedList ? $savedList->items()
            ->where('listable_type', People::class)
            ->pluck('listable_id')
            ->all() : [];

        return Inertia::render('public/saved-records/saved-people/page', [
            'people' => $people,
            'savedPeopleIds' => $savedPeopleIds,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }
}
