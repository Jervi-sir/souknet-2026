<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can access the companies search page', function () {
    $role = Role::create([
        'code' => 'user',
        'en' => 'Regular User',
    ]);

    $category = Category::create([
        'code' => 'tech',
        'en' => 'Technology',
        'sort_order' => 1,
    ]);

    $user = User::create([
        'name' => 'Owner User',
        'email' => 'owner@example.com',
        'password' => bcrypt('password'),
        'role_id' => $role->id,
    ]);

    $business = Business::create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $response = $this->get(route('companies.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/search-result/page')
        ->has('businesses')
        ->has('categories')
        ->has('cities')
        ->has('filters')
        ->has('savedCompanyIds')
    );
});

test('users can save and unsave companies', function () {
    $role = Role::create([
        'code' => 'user',
        'en' => 'Regular User',
    ]);

    $user = User::create([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => bcrypt('password'),
        'role_id' => $role->id,
    ]);

    $category = Category::create([
        'code' => 'tech',
        'en' => 'Technology',
        'sort_order' => 1,
    ]);

    $business = Business::create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'name' => 'Company B',
        'slug' => 'company-b',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $response = $this->post(route('companies.save', $business->id));
    $response->assertRedirect(route('login'));

    $this->actingAs($user);

    $response = $this->post(route('companies.save', $business->id));
    $response->assertRedirect();
    $response->assertSessionHas('success', 'Company saved successfully.');

    $this->assertDatabaseHas('list_items', [
        'listable_type' => Business::class,
        'listable_id' => $business->id,
    ]);

    $response = $this->post(route('companies.save', $business->id));
    $response->assertRedirect();
    $response->assertSessionHas('success', 'Company removed from your saved list.');

    $this->assertDatabaseMissing('list_items', [
        'listable_type' => Business::class,
        'listable_id' => $business->id,
    ]);
});
