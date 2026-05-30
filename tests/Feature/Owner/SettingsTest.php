<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->role = Role::create([
        'code' => 'owner',
        'en' => 'Business Owner',
    ]);

    $this->user = User::create([
        'name' => 'Owner User',
        'email' => 'owner@example.com',
        'password' => bcrypt('password'),
        'role_id' => $this->role->id,
        'email_verified_at' => now(),
    ]);
});

test('guests are redirected to the login page from owner settings page', function () {
    $response = $this->get(route('owner.settings'));
    $response->assertRedirect(route('login'));
});

test('owners can access settings page and view form values', function () {
    $this->actingAs($this->user);

    $response = $this->get(route('owner.settings'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/settings/page')
        ->has('settings')
    );
});

test('owners can update settings preferences', function () {
    $this->actingAs($this->user);

    $response = $this->post(route('owner.settings.update'), [
        'notification_new_review' => false,
        'notification_new_lead' => false,
        'notification_monthly_report' => true,
        'notification_marketing' => true,
        'default_city' => 'Oran',
        'default_email' => 'new-default@example.com',
        'default_phone' => '0555999999',
        'default_founded_year' => 2025,
    ]);

    $response->assertRedirect();

    // Assert settings are updated in session
    $savedSettings = session("owner_settings_{$this->user->id}");
    expect($savedSettings['default_city'])->toBe('Oran');
    expect($savedSettings['default_email'])->toBe('new-default@example.com');
    expect($savedSettings['notification_new_review'])->toBe(false);
    expect($savedSettings['notification_monthly_report'])->toBe(true);
});
