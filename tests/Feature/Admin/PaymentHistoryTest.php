<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('non-admin users are aborted from payments ledger route', function () {
    // Guest
    $response = $this->get(route('admin.payments'));
    $response->assertRedirect(route('login'));

    // Authenticated non-admin
    $user = User::factory()->create();
    $this->actingAs($user);
    $response = $this->get(route('admin.payments'));
    $response->assertStatus(403);
});

test('administrators can access the payments ledger and view stats', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $user = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $this->actingAs($user);

    $response = $this->get(route('admin.payments'));
    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('admin/payment-history/page')
            ->has('payments')
            ->has('stats')
            ->has('filters')
    );
});
