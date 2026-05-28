<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessManagementController extends Controller
{
    /**
     * Display a listing of all business listings.
     */
    public function index(Request $request): Response
    {
        $query = Business::with(['category', 'plan', 'user']);

        // Apply Search Filter
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('tagline', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        // Apply Status Filter
        $status = $request->input('status', 'all');
        if ($status !== 'all') {
            $query->where('status', $status);
        }

        // Apply Sorting
        $sort = $request->input('sort', 'newest');
        if ($sort === 'name_asc') {
            $query->orderBy('name', 'asc');
        } elseif ($sort === 'name_desc') {
            $query->orderBy('name', 'desc');
        } elseif ($sort === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc'); // Default newest
        }

        $businesses = $query->paginate(15)->withQueryString();

        return Inertia::render('admin/business-management/page', [
            'businesses' => $businesses,
            'filters' => [
                'status' => $status,
                'search' => $request->input('search', ''),
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Approve the specified business listing.
     */
    public function approve(Request $request, int $id): RedirectResponse
    {
        $business = Business::findOrFail($id);
        
        $business->update([
            'status' => 'published',
            'rejection_reason' => null,
        ]);

        return back()->with('success', "Listing '{$business->name}' approved successfully!");
    }

    /**
     * Reject the specified business listing.
     */
    public function reject(Request $request, int $id): RedirectResponse
    {
        $business = Business::findOrFail($id);

        $validated = $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        $business->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['reason'],
        ]);

        return back()->with('success', "Listing '{$business->name}' rejected.");
    }

    /**
     * Delete the specified business listing.
     */
    public function destroy(Request $request, int $id): RedirectResponse
    {
        $business = Business::findOrFail($id);
        $business->delete();

        return back()->with('success', "Listing '{$business->name}' deleted.");
    }
}
