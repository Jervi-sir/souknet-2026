<?php

use App\Models\UpgradeRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected to login from business and store upgrade pages', function () {
    $response = $this->get(route('upgrade.business'));
    $response->assertRedirect(route('login'));

    $response = $this->get(route('upgrade.store'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can access both upgrade pages', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('upgrade.business'));
    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('public/upgrades/business')
            ->has('userRole')
            ->has('latestRequest')
    );

    $response = $this->get(route('upgrade.store'));
    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('public/upgrades/store')
            ->has('userRole')
            ->has('latestRequest')
    );
});

test('users can submit a business upgrade request', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post(route('upgrade.business.store'), [
        'message' => 'I want to claim my business Cevital and update details.',
    ]);

    $response->assertRedirect(route('upgrade.business'));
    $this->assertDatabaseHas('upgrade_requests', [
        'user_id' => $user->id,
        'role_code' => 'business_owner',
        'status' => 'pending',
        'message' => 'I want to claim my business Cevital and update details.',
    ]);
});

test('users can submit a store upgrade request', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post(route('upgrade.store.store'), [
        'message' => 'Setting up a local store for delivery.',
    ]);

    $response->assertRedirect(route('upgrade.store'));
    $this->assertDatabaseHas('upgrade_requests', [
        'user_id' => $user->id,
        'role_code' => 'store_owner',
        'status' => 'pending',
        'message' => 'Setting up a local store for delivery.',
    ]);
});

test('users cannot submit multiple pending requests for the same role', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    // Create existing pending request
    UpgradeRequest::create([
        'user_id' => $user->id,
        'role_code' => 'business_owner',
        'status' => 'pending',
        'message' => 'First message',
    ]);

    $response = $this->post(route('upgrade.business.store'), [
        'message' => 'Another request.',
    ]);

    $response->assertSessionHasErrors();
    expect(UpgradeRequest::where('user_id', $user->id)->where('role_code', 'business_owner')->count())->toBe(1);
});
