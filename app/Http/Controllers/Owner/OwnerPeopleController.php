<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\People;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OwnerPeopleController extends Controller
{
    /**
     * Display a listing of the owner's team/professionals.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $query = People::whereIn('business_id', $businessIds)
            ->with('business');

        // Apply filters
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('first_name', 'like', '%'.$request->search.'%')
                    ->orWhere('last_name', 'like', '%'.$request->search.'%')
                    ->orWhere('title', 'like', '%'.$request->search.'%');
            });
        }

        if ($request->filled('business_id')) {
            $query->where('business_id', $request->business_id);
        }

        $people = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        $businesses = Business::where('user_id', $user->id)->get(['id', 'name']);

        return Inertia::render('owner/people/listed-jobs/page', [
            'people' => $people,
            'businesses' => $businesses,
            'filters' => $request->only(['search', 'business_id']),
        ]);
    }

    /**
     * Show details of a specific professional.
     */
    public function show(int $id, Request $request): Response
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $person = People::whereIn('business_id', $businessIds)
            ->where('id', $id)
            ->with('business')
            ->firstOrFail();

        $businesses = Business::where('user_id', $user->id)->get(['id', 'name']);

        return Inertia::render('owner/people/show-job/page', [
            'person' => $person,
            'businesses' => $businesses,
        ]);
    }

    /**
     * Store a newly created professional/team member.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $validated = $request->validate([
            'business_id' => 'required|in:'.implode(',', $businessIds->toArray()),
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'is_verified' => 'required|boolean',
        ]);

        $person = new People;
        $person->fill($validated);
        $person->save();

        return redirect()->route('owner.people.index')->with('success', 'Professional listing created successfully!');
    }

    /**
     * Update the specified professional.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $person = People::whereIn('business_id', $businessIds)
            ->where('id', $id)
            ->firstOrFail();

        $validated = $request->validate([
            'business_id' => 'required|in:'.implode(',', $businessIds->toArray()),
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'is_verified' => 'required|boolean',
        ]);

        $person->fill($validated);
        $person->save();

        return redirect()->back()->with('success', 'Professional details updated successfully!');
    }

    /**
     * Delete the specified professional.
     */
    public function destroy(int $id, Request $request): RedirectResponse
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $person = People::whereIn('business_id', $businessIds)
            ->where('id', $id)
            ->firstOrFail();

        $person->delete();

        return redirect()->route('owner.people.index')->with('success', 'Professional listing deleted successfully!');
    }
}
