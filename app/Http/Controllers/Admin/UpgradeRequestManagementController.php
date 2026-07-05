<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\UpgradeRequest;
use App\Models\UserRole;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UpgradeRequestManagementController extends Controller
{
    /**
     * Display a listing of upgrade requests.
     */
    public function index(Request $request): Response
    {
        $query = UpgradeRequest::with(['user', 'user.roles']);

        // Apply filters if needed
        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        $upgrades = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        return Inertia::render('admin/upgrades/page', [
            'upgrades' => $upgrades,
            'filters' => [
                'status' => $request->input('status', 'all'),
            ],
        ]);
    }

    /**
     * Approve the upgrade request.
     */
    public function approve(Request $request, int $id): RedirectResponse
    {
        $upgradeRequest = UpgradeRequest::findOrFail($id);

        if ($upgradeRequest->status !== 'pending') {
            return back()->withErrors(['error' => 'This request has already been processed.']);
        }

        $role = Role::where('code', $upgradeRequest->role_code)->first();

        if (! $role) {
            return back()->withErrors(['error' => "Target role '{$upgradeRequest->role_code}' does not exist in the system."]);
        }

        // Update request status
        $upgradeRequest->update([
            'status' => 'approved',
        ]);

        // Upgrade user's role
        $upgradeRequest->user->update([
            'role_id' => $role->id,
        ]);

        // Add role mapping to UserRole
        UserRole::updateOrCreate([
            'user_id' => $upgradeRequest->user_id,
            'role_id' => $role->id,
        ]);

        $upgradeRequest->user->roles()->sync([$role->id]);

        return back()->with('success', "Upgrade request for '{$upgradeRequest->user->name}' was approved. User role has been updated to {$role->en}.");
    }

    /**
     * Reject the upgrade request.
     */
    public function reject(Request $request, int $id): RedirectResponse
    {
        $upgradeRequest = UpgradeRequest::findOrFail($id);

        if ($upgradeRequest->status !== 'pending') {
            return back()->withErrors(['error' => 'This request has already been processed.']);
        }

        $validated = $request->validate([
            'rejection_reason' => 'required|string|max:1000',
        ]);

        $upgradeRequest->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['rejection_reason'],
        ]);

        return back()->with('success', "Upgrade request for '{$upgradeRequest->user->name}' was rejected.");
    }
}
