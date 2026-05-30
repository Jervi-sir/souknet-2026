<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\JobPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class OwnerJobController extends Controller
{
    /**
     * Display a listing of the owner's jobs.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $query = JobPost::whereIn('business_id', $businessIds)
            ->with('business');

        // Apply filters
        if ($request->filled('search')) {
            $query->where('title', 'like', '%'.$request->search.'%');
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('business_id')) {
            $query->where('business_id', $request->business_id);
        }

        $jobs = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        $businesses = Business::where('user_id', $user->id)->get(['id', 'name']);

        return Inertia::render('owner/jobs/listed-jobs/page', [
            'jobs' => $jobs,
            'businesses' => $businesses,
            'filters' => $request->only(['search', 'type', 'business_id']),
        ]);
    }

    /**
     * Show a specific job post details.
     */
    public function show(int $id, Request $request): Response
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $job = JobPost::whereIn('business_id', $businessIds)
            ->where('id', $id)
            ->with('business')
            ->firstOrFail();

        $businesses = Business::where('user_id', $user->id)->get(['id', 'name']);

        return Inertia::render('owner/jobs/show-job/page', [
            'job' => $job,
            'businesses' => $businesses,
        ]);
    }

    /**
     * Store a newly created job post in database.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $validated = $request->validate([
            'business_id' => 'required|in:'.implode(',', $businessIds->toArray()),
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'experience' => 'nullable|string|max:100',
            'salary_min' => 'nullable|integer',
            'salary_max' => 'nullable|integer',
            'salary_currency' => 'nullable|string|max:10',
            'description' => 'required|string',
            'is_active' => 'required|boolean',
            'tags' => 'nullable|array',
        ]);

        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (JobPost::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        $job = new JobPost;
        $job->fill(array_merge($validated, ['slug' => $slug]));
        $job->save();

        return redirect()->route('owner.jobs.index')->with('success', 'Job posting created successfully!');
    }

    /**
     * Update the specified job post.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $job = JobPost::whereIn('business_id', $businessIds)
            ->where('id', $id)
            ->firstOrFail();

        $validated = $request->validate([
            'business_id' => 'required|in:'.implode(',', $businessIds->toArray()),
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'experience' => 'nullable|string|max:100',
            'salary_min' => 'nullable|integer',
            'salary_max' => 'nullable|integer',
            'salary_currency' => 'nullable|string|max:10',
            'description' => 'required|string',
            'is_active' => 'required|boolean',
            'tags' => 'nullable|array',
        ]);

        if ($job->title !== $validated['title']) {
            $slug = Str::slug($validated['title']);
            $originalSlug = $slug;
            $count = 1;
            while (JobPost::where('slug', $slug)->where('id', '!=', $job->id)->exists()) {
                $slug = "{$originalSlug}-{$count}";
                $count++;
            }
            $job->slug = $slug;
        }

        $job->fill($validated);
        $job->save();

        return redirect()->back()->with('success', 'Job posting updated successfully!');
    }

    /**
     * Remove the specified job post.
     */
    public function destroy(int $id, Request $request): RedirectResponse
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $job = JobPost::whereIn('business_id', $businessIds)
            ->where('id', $id)
            ->firstOrFail();

        $job->delete();

        return redirect()->route('owner.jobs.index')->with('success', 'Job posting deleted successfully!');
    }
}
