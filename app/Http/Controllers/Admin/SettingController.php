<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Display the administration settings page.
     */
    public function index(): Response
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();

        // Fallbacks for empty database configurations
        $settings = array_merge([
            'site_name' => 'SoukNet',
            'support_email' => 'support@souknet.com',
            'require_listing_verification' => '1',
            'allow_new_registrations' => '1',
            'maintenance_mode' => '0',
            'accent_color' => '#6366F1',
        ], $settings);

        return Inertia::render('admin/settings/page', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update configuration parameters.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'support_email' => 'required|email|max:255',
            'require_listing_verification' => 'required|boolean',
            'allow_new_registrations' => 'required|boolean',
            'maintenance_mode' => 'required|boolean',
            'accent_color' => 'required|string|regex:/^#[0-9A-F]{6}$/i',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => (string) $value]);
        }

        return back()->with('success', 'Admin settings updated successfully!');
    }
}
