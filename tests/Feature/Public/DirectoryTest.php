<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guest users can access the directory page', function () {
    $response = $this->get(route('directory.index'));

    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('public/directory/page')
            ->has('businesses')
            ->has('categories')
            ->has('cities')
            ->has('filters')
    );
});

test('directory only displays published businesses', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create();
    $plan = Plan::factory()->create();

    // Create 1 published business and 1 draft business
    $published = Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Published Business',
    ]);

    $draft = Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'draft',
        'name' => 'Draft Business',
    ]);

    $response = $this->get(route('directory.index'));

    $response->assertInertia(
        fn (Assert $page) => $page
            ->has('businesses.data', 1)
            ->where('businesses.data.0.name', 'Published Business')
    );
});

test('directory can filter by search query', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create();
    $plan = Plan::factory()->create();

    Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Tech Solutions',
    ]);

    Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Pizza Palace',
    ]);

    $response = $this->get(route('directory.index', ['search' => 'Tech']));

    $response->assertInertia(
        fn (Assert $page) => $page
            ->has('businesses.data', 1)
            ->where('businesses.data.0.name', 'Tech Solutions')
    );
});

test('directory can filter by category', function () {
    $cat1 = Category::factory()->create();
    $cat2 = Category::factory()->create();
    $user = User::factory()->create();
    $plan = Plan::factory()->create();

    $b1 = Business::factory()->create([
        'category_id' => $cat1->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Business Category One',
    ]);

    $b2 = Business::factory()->create([
        'category_id' => $cat2->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Business Category Two',
    ]);

    $response = $this->get(route('directory.index', ['category' => $cat1->id]));

    $response->assertInertia(
        fn (Assert $page) => $page
            ->has('businesses.data', 1)
            ->where('businesses.data.0.name', 'Business Category One')
    );
});

test('directory can filter by city', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create();
    $plan = Plan::factory()->create();

    Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Algiers Tech',
        'city' => 'Algiers',
    ]);

    Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Oran Café',
        'city' => 'Oran',
    ]);

    $response = $this->get(route('directory.index', ['city' => 'Algiers']));

    $response->assertInertia(
        fn (Assert $page) => $page
            ->has('businesses.data', 1)
            ->where('businesses.data.0.name', 'Algiers Tech')
    );
});
