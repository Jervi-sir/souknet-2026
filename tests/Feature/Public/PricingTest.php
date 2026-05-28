<?php

use App\Models\Plan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can access pricing page', function () {
    Plan::factory()->create(['is_active' => true, 'en' => 'Starter Plan']);

    $response = $this->get(route('pricing.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/pricing-plans/page')
        ->has('plans')
        ->where('plans.0.en', 'Starter Plan')
    );
});

test('pricing page only displays active plans', function () {
    Plan::factory()->create(['is_active' => true, 'en' => 'Active Starter']);
    Plan::factory()->create(['is_active' => false, 'en' => 'Inactive Starter']);

    $response = $this->get(route('pricing.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->has('plans', 1)
        ->where('plans.0.en', 'Active Starter')
    );
});
