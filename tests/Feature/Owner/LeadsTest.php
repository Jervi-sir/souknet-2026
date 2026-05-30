<?php

use App\Models\Business;
use App\Models\BusinessContact;
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

test('guests are redirected to the login page from leads management', function () {
    $response = $this->get(route('owner.leads'));
    $response->assertRedirect(route('login'));
});

test('owners can access leads and see contact message logs', function () {
    $business = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'plan_id' => $this->plan->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    // Create 3 contacts for the business
    for ($i = 1; $i <= 3; $i++) {
        BusinessContact::create([
            'business_id' => $business->id,
            'name' => "Visitor {$i}",
            'email' => "visitor{$i}@example.com",
            'message' => "Message number {$i}",
            'is_read' => false,
        ]);
    }

    $this->actingAs($this->user);

    $response = $this->get(route('owner.leads'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/leads-management/page')
        ->has('leads.data', 3)
        ->has('filters')
    );
});

test('owners can mark unread contact requests as read', function () {
    $business = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'plan_id' => $this->plan->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $lead = BusinessContact::create([
        'business_id' => $business->id,
        'name' => 'Visitor John',
        'email' => 'john@example.com',
        'message' => 'Hello there!',
        'is_read' => false,
    ]);

    $this->actingAs($this->user);

    $response = $this->post(route('owner.leads.read', ['id' => $lead->id]));

    $response->assertRedirect();
    $this->assertTrue($lead->fresh()->is_read);
});
