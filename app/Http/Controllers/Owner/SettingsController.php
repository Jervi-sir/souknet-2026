<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Display the owner-specific settings form.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Retrieve settings from session (simulating persistent user settings storage)
        $settings = $request->session()->get("owner_settings_{$user->id}", [
            'notification_new_review' => true,
            'notification_new_lead' => true,
            'notification_monthly_report' => false,
            'notification_marketing' => false,
            'default_city' => 'Algiers',
            'default_email' => $user->email,
            'default_phone' => '',
            'default_founded_year' => (int) date('Y'),
        ]);

        return Inertia::render('owner/settings/page', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the owner settings preferences.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'notification_new_review' => 'required|boolean',
            'notification_new_lead' => 'required|boolean',
            'notification_monthly_report' => 'required|boolean',
            'notification_marketing' => 'required|boolean',
            'default_city' => 'nullable|string|max:100',
            'default_email' => 'nullable|email|max:255',
            'default_phone' => 'nullable|string|max:50',
            'default_founded_year' => 'nullable|integer|min:1800|max:' . (date('Y') + 1),
        ]);

        // Save settings to session (simulating persistent user settings storage)
        $request->session()->put("owner_settings_{$user->id}", $validated);

        return back()->with('success', 'Owner settings updated successfully!');
    }
}
