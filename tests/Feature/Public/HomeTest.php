<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can access home page', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/home/page')
        ->has('categories')
        ->has('featuredBusinesses')
        ->has('stats')
    );
});

test('home page queries and displays active featured businesses', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create();
    $plan = Plan::factory()->create();

    // Create 1 featured, 1 not featured
    $featured = Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'is_featured' => true,
        'name' => 'Premium Spot',
    ]);

    $regular = Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'is_featured' => false,
        'name' => 'Regular Spot',
    ]);

    $response = $this->get(route('home'));

    $response->assertInertia(fn (Assert $page) => $page
        ->has('featuredBusinesses', 1)
        ->where('featuredBusinesses.0.name', 'Premium Spot')
    );
});
