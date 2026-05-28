<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected to the login page from subscription billing page', function () {
    $response = $this->get(route('owner.subscription-billing'));
    $response->assertRedirect(route('login'));
});

test('owners can access subscription billing page and see their listings', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $plan = Plan::factory()->create(['is_active' => true]);

    $business = Business::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'plan_id' => $plan->id,
        'status' => 'published',
    ]);

    $this->actingAs($user);

    $response = $this->get(route('owner.subscription-billing'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/subscription-billing/page')
        ->has('businesses', 1)
        ->has('plans')
        ->has('invoices')
    );
});

test('owners can upgrade or change the plan of a listing', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $oldPlan = Plan::factory()->create(['code' => 'free', 'is_active' => true]);
    $newPlan = Plan::factory()->create(['code' => 'premium', 'is_active' => true]);

    $business = Business::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'plan_id' => $oldPlan->id,
    ]);

    $this->actingAs($user);

    $response = $this->post(route('owner.subscription-billing.upgrade', ['businessId' => $business->id]), [
        'plan_id' => $newPlan->id,
        'interval' => 'yearly',
    ]);

    $response->assertRedirect();
    
    // Refresh business and assert plan and expiry updated
    $business->refresh();
    expect($business->plan_id)->toBe($newPlan->id);
    expect($business->plan_expires_at)->not->toBeNull();
});
