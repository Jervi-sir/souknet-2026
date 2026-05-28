<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected to the login page from owner dashboard', function () {
    $response = $this->get(route('owner.dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated owners can access their dashboard and see listings count', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $plan = Plan::factory()->create();

    // Create 2 businesses owned by user
    Business::factory(2)->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'plan_id' => $plan->id,
        'status' => 'published',
    ]);

    $this->actingAs($user);

    $response = $this->get(route('owner.dashboard'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/dashboard/page')
        ->has('businesses', 2)
        ->has('metrics')
        ->where('metrics.businesses', 2)
        ->has('recentContacts')
        ->has('recentReviews')
    );
});
