<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can access search page', function () {
    $response = $this->get(route('search.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/search-result/page')
        ->has('businesses')
        ->has('categories')
        ->has('cities')
        ->has('filters')
    );
});

test('search result only displays published businesses', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create();
    $plan = Plan::factory()->create();

    Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Active Business Match',
    ]);

    Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'draft',
        'name' => 'Draft Business Match',
    ]);

    $response = $this->get(route('search.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->has('businesses.data', 1)
        ->where('businesses.data.0.name', 'Active Business Match')
    );
});

test('search result can filter by search query', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create();
    $plan = Plan::factory()->create();

    Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Sidi M\'Hamed Tech',
    ]);

    Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Bab El Oued Pizza',
    ]);

    $response = $this->get(route('search.index', ['search' => 'Sidi']));

    $response->assertInertia(fn (Assert $page) => $page
        ->has('businesses.data', 1)
        ->where('businesses.data.0.name', 'Sidi M\'Hamed Tech')
    );
});
