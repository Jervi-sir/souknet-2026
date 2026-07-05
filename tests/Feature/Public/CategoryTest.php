<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can access published category page', function () {
    $category = Category::factory()->create(['code' => 'technology', 'en' => 'Technology']);

    $response = $this->get(route('category.show', ['code' => 'technology']));

    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('public/category/page')
            ->has('category')
            ->has('businesses')
            ->has('categories')
            ->has('cities')
            ->has('filters')
    );
});

test('category page only displays published businesses in that category', function () {
    $category = Category::factory()->create(['code' => 'tech']);
    $otherCategory = Category::factory()->create(['code' => 'food']);
    $user = User::factory()->create();
    $plan = Plan::factory()->create();

    // Published business in category
    Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Published Tech',
    ]);

    // Draft business in category
    Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'draft',
        'name' => 'Draft Tech',
    ]);

    // Published business in other category
    Business::factory()->create([
        'category_id' => $otherCategory->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'name' => 'Published Food',
    ]);

    $response = $this->get(route('category.show', ['code' => 'tech']));

    $response->assertInertia(
        fn (Assert $page) => $page
            ->has('businesses.data', 1)
            ->where('businesses.data.0.name', 'Published Tech')
    );
});

test('category page gives a 404 for invalid category code', function () {
    $response = $this->get(route('category.show', ['code' => 'non-existent-code']));
    $response->assertStatus(404);
});
