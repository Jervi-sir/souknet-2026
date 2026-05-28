<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\Review;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected to the login page from reviews management', function () {
    $response = $this->get(route('owner.reviews'));
    $response->assertRedirect(route('login'));
});

test('owners can access reviews and see customer ratings list', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $plan = Plan::factory()->create();

    $business = Business::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'plan_id' => $plan->id,
        'status' => 'published',
    ]);

    // Create 3 reviews for the business from distinct users
    $users = User::factory(3)->create();
    foreach ($users as $u) {
        Review::factory()->create([
            'business_id' => $business->id,
            'user_id' => $u->id,
        ]);
    }

    $this->actingAs($user);

    $response = $this->get(route('owner.reviews'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/reviews-management/page')
        ->has('reviews.data', 3)
        ->has('filters')
    );
});

test('owners can reply to customer reviews', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $plan = Plan::factory()->create();

    $business = Business::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'plan_id' => $plan->id,
        'status' => 'published',
    ]);

    $review = Review::factory()->create([
        'business_id' => $business->id,
    ]);

    $this->actingAs($user);

    $response = $this->post(route('owner.reviews.reply', ['id' => $review->id]), [
        'body' => 'Thank you for your feedback!',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('review_replies', [
        'review_id' => $review->id,
        'body' => 'Thank you for your feedback!',
    ]);
});
