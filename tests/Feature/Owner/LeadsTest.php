<?php

use App\Models\Business;
use App\Models\BusinessContact;
use App\Models\Category;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected to the login page from leads management', function () {
    $response = $this->get(route('owner.leads'));
    $response->assertRedirect(route('login'));
});

test('owners can access leads and see contact message logs', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $plan = Plan::factory()->create();

    $business = Business::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'plan_id' => $plan->id,
        'status' => 'published',
    ]);

    // Create 3 contacts for the business
    BusinessContact::factory(3)->create([
        'business_id' => $business->id,
    ]);

    $this->actingAs($user);

    $response = $this->get(route('owner.leads'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/leads-management/page')
        ->has('leads.data', 3)
        ->has('filters')
    );
});

test('owners can mark unread contact requests as read', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $plan = Plan::factory()->create();

    $business = Business::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'plan_id' => $plan->id,
        'status' => 'published',
    ]);

    $lead = BusinessContact::factory()->create([
        'business_id' => $business->id,
        'is_read' => false,
    ]);

    $this->actingAs($user);

    $response = $this->post(route('owner.leads.read', ['id' => $lead->id]));

    $response->assertRedirect();
    $this->assertTrue($lead->fresh()->is_read);
});
