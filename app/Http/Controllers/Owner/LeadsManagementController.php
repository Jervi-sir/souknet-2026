<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\BusinessContact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeadsManagementController extends Controller
{
    /**
     * Display a listing of the leads.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get owned business IDs
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $query = BusinessContact::whereIn('business_id', $businessIds)
            ->with('business');

        // Apply filters
        $status = $request->input('status', 'all');
        if ($status === 'unread') {
            $query->where('is_read', false);
        } elseif ($status === 'read') {
            $query->where('is_read', true);
        }

        // Apply search keyword filter
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $leads = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('owner/leads-management/page', [
            'leads' => $leads,
            'filters' => [
                'status' => $status,
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    /**
     * Mark the specified lead as read.
     */
    public function markAsRead(Request $request, int $id): RedirectResponse
    {
        $user = $request->user();
        $businessIds = Business::where('user_id', $user->id)->pluck('id');

        $lead = BusinessContact::where('id', $id)
            ->whereIn('business_id', $businessIds)
            ->firstOrFail();

        $lead->update(['is_read' => true]);

        return back();
    }
}
