<?php

namespace App\Http\Controllers\Upgrade;

use App\Http\Controllers\Controller;
use App\Models\UpgradeRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UpgradeController extends Controller
{
    public function business(Request $request): Response
    {
        $user = $request->user();
        $userRole = $user->roles()->first();

        $latestRequest = UpgradeRequest::where('user_id', $user->id)
            ->where('role_code', 'business_owner')
            ->orderBy('created_at', 'desc')
            ->first();

        return Inertia::render('public/upgrades/business', [
            'userRole' => $userRole,
            'latestRequest' => $latestRequest,
        ]);
    }

    /**
     * Submit a request to become a Business Owner.
     */
    public function storeBusiness(Request $request): RedirectResponse
    {
        $user = $request->user();

        $hasPending = UpgradeRequest::where('user_id', $user->id)
            ->where('role_code', 'business_owner')
            ->where('status', 'pending')
            ->exists();

        if ($hasPending) {
            return back()->withErrors(['error' => 'You already have a pending business upgrade request.']);
        }

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        UpgradeRequest::create([
            'user_id' => $user->id,
            'role_code' => 'business_owner',
            'status' => 'pending',
            'message' => $validated['message'],
        ]);

        return redirect()->route('upgrade.business')->with('success', 'Your request to become a Business Owner has been submitted.');
    }

    /**
     * Display the Become a Store upgrade page.
     */
    public function storeView(Request $request): Response
    {
        $user = $request->user();
        $userRole = $user->roles()->first();

        $latestRequest = UpgradeRequest::where('user_id', $user->id)
            ->where('role_code', 'store_owner')
            ->orderBy('created_at', 'desc')
            ->first();

        return Inertia::render('public/upgrades/store', [
            'userRole' => $userRole,
            'latestRequest' => $latestRequest,
        ]);
    }

    /**
     * Submit a request to become a Store Owner.
     */
    public function storeStore(Request $request): RedirectResponse
    {
        $user = $request->user();

        $hasPending = UpgradeRequest::where('user_id', $user->id)
            ->where('role_code', 'store_owner')
            ->where('status', 'pending')
            ->exists();

        if ($hasPending) {
            return back()->withErrors(['error' => 'You already have a pending store upgrade request.']);
        }

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        UpgradeRequest::create([
            'user_id' => $user->id,
            'role_code' => 'store_owner',
            'status' => 'pending',
            'message' => $validated['message'],
        ]);

        return redirect()->route('upgrade.store')->with('success', 'Your request to become a Store Owner has been submitted.');
    }
}
