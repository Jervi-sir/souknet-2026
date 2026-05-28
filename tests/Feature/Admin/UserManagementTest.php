<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('non-admin users are aborted from user management route', function () {
    // Guest
    $response = $this->get(route('admin.users'));
    $response->assertRedirect(route('login'));

    // Authenticated non-admin
    $user = User::factory()->create();
    $this->actingAs($user);
    $response = $this->get(route('admin.users'));
    $response->assertStatus(403);
});

test('administrators can access the user management ledger and view users', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $user = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $this->actingAs($user);

    $response = $this->get(route('admin.users'));
    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/user-management/page')
        ->has('users.data')
        ->has('roles')
        ->has('filters')
    );
});

test('administrators can update user roles', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $ownerRole = Role::firstOrCreate(['code' => 'business_owner'], ['en' => 'Business Owner']);
    
    $adminUser = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $targetUser = User::factory()->create(); // defaults to some role

    $this->actingAs($adminUser);

    $response = $this->patch(route('admin.users.role', ['id' => $targetUser->id]), [
        'role_id' => $ownerRole->id,
    ]);

    $response->assertRedirect();
    
    $targetUser->refresh();
    expect($targetUser->role_id)->toBe($ownerRole->id);
});

test('administrators cannot reassign their own role', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $ownerRole = Role::firstOrCreate(['code' => 'business_owner'], ['en' => 'Business Owner']);
    
    $adminUser = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $this->actingAs($adminUser);

    $response = $this->patch(route('admin.users.role', ['id' => $adminUser->id]), [
        'role_id' => $ownerRole->id,
    ]);

    $response->assertSessionHasErrors();
    
    $adminUser->refresh();
    expect($adminUser->role_id)->toBe($adminRole->id);
});

test('administrators can delete users', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $adminUser = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $targetUser = User::factory()->create();

    $this->actingAs($adminUser);

    $response = $this->delete(route('admin.users.destroy', ['id' => $targetUser->id]));
    $response->assertRedirect();

    $this->assertDatabaseMissing('users', [
        'id' => $targetUser->id,
    ]);
});

test('administrators cannot delete themselves', function () {
    $adminRole = Role::firstOrCreate(['code' => 'admin'], ['en' => 'Administrator']);
    $adminUser = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    $this->actingAs($adminUser);

    $response = $this->delete(route('admin.users.destroy', ['id' => $adminUser->id]));
    $response->assertSessionHasErrors();

    $this->assertDatabaseHas('users', [
        'id' => $adminUser->id,
    ]);
});
