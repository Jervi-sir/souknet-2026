<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can access published business profile', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create();
    $plan = Plan::factory()->create();

    $business = Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'published',
        'slug' => 'test-solutions',
        'name' => 'Test Solutions Co',
    ]);

    $response = $this->get(route('directory.show', ['slug' => 'test-solutions']));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/business-profile/page')
        ->has('business')
        ->where('business.name', 'Test Solutions Co')
    );
});

test('guests get a 404 for draft business profile', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create();
    $plan = Plan::factory()->create();

    $business = Business::factory()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => 'draft',
        'slug' => 'draft-solutions',
    ]);

    $response = $this->get(route('directory.show', ['slug' => 'draft-solutions']));

    $response->assertStatus(404);
});
