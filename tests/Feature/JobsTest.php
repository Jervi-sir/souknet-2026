<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\JobPost;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can access the jobs page', function () {
    $role = Role::create([
        'code' => 'user',
        'en' => 'Regular User',
    ]);

    $category = Category::create([
        'code' => 'tech',
        'en' => 'Technology',
        'sort_order' => 1,
    ]);

    $user = User::create([
        'name' => 'Owner User',
        'email' => 'owner@example.com',
        'password' => bcrypt('password'),
        'role_id' => $role->id,
    ]);

    $business = Business::create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $job = JobPost::create([
        'business_id' => $business->id,
        'title' => 'Software Engineer',
        'slug' => 'software-engineer',
        'location' => 'Algiers, Algeria',
        'type' => 'Full-time',
        'experience' => 'mid',
        'is_active' => true,
    ]);

    $response = $this->get(route('jobs.index'));

    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('public/jobs/page')
            ->has('jobs')
            ->has('savedJobIds')
            ->has('locations')
            ->has('filters')
    );
});

test('users can save and unsave jobs', function () {
    $role = Role::create([
        'code' => 'user',
        'en' => 'Regular User',
    ]);

    $user = User::create([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => bcrypt('password'),
        'role_id' => $role->id,
    ]);

    $category = Category::create([
        'code' => 'tech',
        'en' => 'Technology',
        'sort_order' => 1,
    ]);

    $business = Business::create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'name' => 'Company B',
        'slug' => 'company-b',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $job = JobPost::create([
        'business_id' => $business->id,
        'title' => 'Product Manager',
        'slug' => 'product-manager',
        'location' => 'Oran, Algeria',
        'type' => 'Full-time',
        'experience' => 'mid',
        'is_active' => true,
    ]);

    $response = $this->post(route('jobs.save', $job->id));
    $response->assertRedirect(route('login'));

    $this->actingAs($user);

    $response = $this->post(route('jobs.save', $job->id));
    $response->assertRedirect();
    $response->assertSessionHas('success', 'Job saved successfully.');

    $this->assertDatabaseHas('list_items', [
        'listable_type' => JobPost::class,
        'listable_id' => $job->id,
    ]);

    $response = $this->post(route('jobs.save', $job->id));
    $response->assertRedirect();
    $response->assertSessionHas('success', 'Job removed from your saved list.');

    $this->assertDatabaseMissing('list_items', [
        'listable_type' => JobPost::class,
        'listable_id' => $job->id,
    ]);
});
