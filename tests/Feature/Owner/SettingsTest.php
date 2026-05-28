<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected to the login page from owner settings page', function () {
    $response = $this->get(route('owner.settings'));
    $response->assertRedirect(route('login'));
});

test('owners can access settings page and view form values', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('owner.settings'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/settings/page')
        ->has('settings')
    );
});

test('owners can update settings preferences', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

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
    $savedSettings = session("owner_settings_{$user->id}");
    expect($savedSettings['default_city'])->toBe('Oran');
    expect($savedSettings['default_email'])->toBe('new-default@example.com');
    expect($savedSettings['notification_new_review'])->toBe(false);
    expect($savedSettings['notification_monthly_report'])->toBe(true);
});
