<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('non-admin users are aborted from admin routes', function () {
    // Guest
    $response = $this->get(route('admin.dashboard'));
    $response->assertRedirect(route('login'));

    // Authenticated non-admin
    $user = User::factory()->create();
    $this->actingAs($user);
    $response = $this->get(route('admin.dashboard'));
    $response->assertStatus(403);
});

test('administrators can access the admin dashboard', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $user = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $this->actingAs($user);

    $response = $this->get(route('admin.dashboard'));
    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('admin/dashboard/page')
            ->has('stats')
            ->has('pendingBusinesses')
            ->has('recentPayments')
    );
});

test('administrators can access business management and view listings', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $user = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $category = Category::factory()->create();
    $business = Business::factory()->create([
        'category_id' => $category->id,
        'status' => 'pending',
    ]);

    $this->actingAs($user);

    $response = $this->get(route('admin.businesses'));
    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('admin/business-management/page')
            ->has('businesses.data', 1)
            ->has('filters')
    );
});

test('administrators can approve listings', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $user = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $category = Category::factory()->create();
    $business = Business::factory()->create([
        'category_id' => $category->id,
        'status' => 'pending',
    ]);

    $this->actingAs($user);

    $response = $this->patch(route('admin.businesses.approve', ['id' => $business->id]));
    $response->assertRedirect();

    $business->refresh();
    expect($business->status)->toBe('published');
});

test('administrators can reject listings with a reason', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $user = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $category = Category::factory()->create();
    $business = Business::factory()->create([
        'category_id' => $category->id,
        'status' => 'pending',
    ]);

    $this->actingAs($user);

    $response = $this->patch(route('admin.businesses.reject', ['id' => $business->id]), [
        'reason' => 'Invalid telephone details',
    ]);
    $response->assertRedirect();

    $business->refresh();
    expect($business->status)->toBe('rejected');
    expect($business->rejection_reason)->toBe('Invalid telephone details');
});

test('administrators can delete listings', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $user = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $category = Category::factory()->create();
    $business = Business::factory()->create([
        'category_id' => $category->id,
    ]);

    $this->actingAs($user);

    $response = $this->delete(route('admin.businesses.destroy', ['id' => $business->id]));
    $response->assertRedirect();

    $this->assertSoftDeleted('businesses', [
        'id' => $business->id,
    ]);
});
