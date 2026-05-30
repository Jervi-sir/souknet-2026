<?php

namespace App\Http\Controllers\Public\SavedRecords;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\ListItem;
use App\Models\SavedList;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SavedCompaniesController extends Controller
{
    /**
     * Toggle saving a company.
     */
    public function toggleSave(Request $request, Business $business): RedirectResponse
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        $savedList = SavedList::firstOrCreate([
            'user_id' => $user->id,
            'type' => 'business',
        ], [
            'name' => 'My Saved Companies',
            'description' => 'A list of my saved companies.',
        ]);

        $listItem = ListItem::where('saved_list_id', $savedList->id)
            ->where('listable_type', Business::class)
            ->where('listable_id', $business->id)
            ->first();

        if ($listItem) {
            $listItem->delete();
            $message = 'Company removed from your saved list.';
        } else {
            ListItem::create([
                'saved_list_id' => $savedList->id,
                'listable_type' => Business::class,
                'listable_id' => $business->id,
            ]);
            $message = 'Company saved successfully.';
        }

        return back()->with('success', $message);
    }

    /**
     * Bulk toggle saving companies.
     */
    public function toggleSaveMultiple(Request $request): RedirectResponse
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return back()->with('error', 'No companies selected.');
        }

        $savedList = SavedList::firstOrCreate([
            'user_id' => $user->id,
            'type' => 'business',
        ], [
            'name' => 'My Saved Companies',
            'description' => 'A list of my saved companies.',
        ]);

        $savedCount = 0;
        $unsavedCount = 0;

        foreach ($ids as $id) {
            $listItem = ListItem::where('saved_list_id', $savedList->id)
                ->where('listable_type', Business::class)
                ->where('listable_id', $id)
                ->first();

            if ($listItem) {
                $listItem->delete();
                $unsavedCount++;
            } else {
                ListItem::create([
                    'saved_list_id' => $savedList->id,
                    'listable_type' => Business::class,
                    'listable_id' => $id,
                ]);
                $savedCount++;
            }
        }

        $message = "Successfully updated selections: saved {$savedCount}, unsaved {$unsavedCount}.";

        return back()->with('success', $message);
    }

    /**
     * Display a listing of saved companies.
     */
    public function saved(Request $request): Response
    {
        $user = Auth::user();
        $savedList = SavedList::where('user_id', $user->id)
            ->where('type', 'business')
            ->first();

        $query = Business::query()
            ->with(['category', 'photos'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews');

        if ($savedList) {
            $savedIds = $savedList->items()->where('listable_type', Business::class)->pluck('listable_id');
            $query->whereIn('id', $savedIds);
        } else {
            $query->whereRaw('1 = 0');
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('tagline', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            });
        }

        $businesses = $query->paginate(9)->withQueryString();

        $savedCompanyIds = $savedList ? $savedList->items()
            ->where('listable_type', Business::class)
            ->pluck('listable_id')
            ->all() : [];

        return Inertia::render('public/saved-records/saved-companies/page', [
            'businesses' => $businesses,
            'savedCompanyIds' => $savedCompanyIds,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }
}
