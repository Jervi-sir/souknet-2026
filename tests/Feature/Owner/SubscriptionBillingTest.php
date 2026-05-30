<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\Plan;
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

    $this->category = Category::create([
        'code' => 'tech',
        'en' => 'Technology',
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

test('guests are redirected to the login page from subscription billing page', function () {
    $response = $this->get(route('owner.subscription-billing.index'));
    $response->assertRedirect(route('login'));
});

test('owners can access subscription billing page and see their listings', function () {
    $plan = Plan::create([
        'code' => 'premium',
        'en' => 'Premium Plan',
        'price_monthly_cents' => 2900,
        'is_active' => true,
        'sort_order' => 1,
    ]);

    $business = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
        'plan_id' => $plan->id,
    ]);

    $this->actingAs($this->user);

    $response = $this->get(route('owner.subscription-billing.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/subscription-billing/page')
        ->has('businesses', 1)
        ->has('plans')
        ->has('invoices')
    );
});

test('owners can upgrade or change the plan of a listing', function () {
    $oldPlan = Plan::create([
        'code' => 'free',
        'en' => 'Free Plan',
        'price_monthly_cents' => 0,
        'is_active' => true,
        'sort_order' => 1,
    ]);

    $newPlan = Plan::create([
        'code' => 'premium',
        'en' => 'Premium Plan',
        'price_monthly_cents' => 2900,
        'is_active' => true,
        'sort_order' => 2,
    ]);

    $business = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
        'plan_id' => $oldPlan->id,
    ]);

    $this->actingAs($this->user);

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
