<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected from business create form', function () {
    $response = $this->get(route('owner.businesses.create'));
    $response->assertRedirect(route('login'));
});

test('owners can access business create page', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('owner.businesses.create'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/listing-form/page')
        ->has('categories')
        ->has('plans')
        ->where('business', null)
    );
});

test('owners can submit a new business listing', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $plan = Plan::factory()->create();

    $this->actingAs($user);

    $response = $this->post(route('owner.businesses.store'), [
        'name' => 'Brand New Solutions',
        'category_id' => $category->id,
        'plan_id' => $plan->id,
        'tagline' => 'A tagline here',
        'city' => 'Algiers',
        'address' => '123 Street Algiers',
    ]);

    $response->assertRedirect(route('owner.dashboard'));
    $this->assertDatabaseHas('businesses', [
        'name' => 'Brand New Solutions',
        'slug' => 'brand-new-solutions',
        'user_id' => $user->id,
        'status' => 'pending',
    ]);
});

test('owners can edit their own business', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $plan = Plan::factory()->create();

    $business = Business::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Original Name',
    ]);

    $this->actingAs($user);

    $response = $this->get(route('owner.businesses.edit', ['id' => $business->id]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/listing-form/page')
        ->has('business')
        ->where('business.name', 'Original Name')
    );
});

test('owners cannot edit other users\' businesses', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $category = Category::factory()->create();
    $plan = Plan::factory()->create();

    $business = Business::factory()->create([
        'user_id' => $user1->id,
        'category_id' => $category->id,
        'plan_id' => $plan->id,
        'status' => 'published',
    ]);

    $this->actingAs($user2);

    $response = $this->get(route('owner.businesses.edit', ['id' => $business->id]));

    $response->assertStatus(404);
});
