<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\Plan;
use App\Models\Review;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->role = Role::create([
        'code' => 'owner',
        'en' => 'Business Owner',
    ]);

    $this->userRole = Role::create([
        'code' => 'user',
        'en' => 'Regular User',
    ]);

    $this->category = Category::create([
        'code' => 'tech',
        'en' => 'Technology',
        'sort_order' => 1,
    ]);

    $this->plan = Plan::create([
        'code' => 'free',
        'en' => 'Free Plan',
        'price_monthly_cents' => 0,
        'is_active' => true,
        'sort_order' => 1,
    ]);

    $this->user = User::create([
        'name' => 'Owner User',
        'email' => 'owner@example.com',
        'password' => bcrypt('password'),
        'role_id' => $this->role->id,
        'email_verified_at' => now(),
    ]);
});

test('guests are redirected to the login page from reviews management', function () {
    $response = $this->get(route('owner.reviews'));
    $response->assertRedirect(route('login'));
});

test('owners can access reviews and see customer ratings list', function () {
    $business = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'plan_id' => $this->plan->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    // Create 3 reviews for the business from distinct users
    for ($i = 1; $i <= 3; $i++) {
        $reviewer = User::create([
            'name' => "Reviewer {$i}",
            'email' => "reviewer{$i}@example.com",
            'password' => bcrypt('password'),
            'role_id' => $this->userRole->id,
        ]);

        Review::create([
            'business_id' => $business->id,
            'user_id' => $reviewer->id,
            'rating' => 5,
            'body' => "Excellent service {$i}!",
        ]);
    }

    $this->actingAs($this->user);

    $response = $this->get(route('owner.reviews'));

    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('owner/reviews-management/page')
            ->has('reviews.data', 3)
            ->has('filters')
    );
});

test('owners can reply to customer reviews', function () {
    $business = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'plan_id' => $this->plan->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $reviewer = User::create([
        'name' => 'Reviewer One',
        'email' => 'reviewerone@example.com',
        'password' => bcrypt('password'),
        'role_id' => $this->userRole->id,
    ]);

    $review = Review::create([
        'business_id' => $business->id,
        'user_id' => $reviewer->id,
        'rating' => 4,
        'body' => 'Good service!',
    ]);

    $this->actingAs($this->user);

    $response = $this->post(route('owner.reviews.reply', ['id' => $review->id]), [
        'body' => 'Thank you for your feedback!',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('review_replies', [
        'review_id' => $review->id,
        'body' => 'Thank you for your feedback!',
    ]);
});
