<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\JobPost;
use App\Models\ListItem;
use App\Models\Role;
use App\Models\SavedList;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected to login when accessing saved jobs page', function () {
    $response = $this->get(route('jobs.saved'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can access the saved jobs page', function () {
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
        'name' => 'Test User',
        'email' => 'test@example.com',
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
        'salary_min' => 50000,
        'salary_max' => 80000,
        'salary_currency' => 'USD',
        'type' => 'Full-time',
        'experience' => 'mid',
        'description' => 'Great role.',
        'is_active' => true,
    ]);

    $savedList = SavedList::create([
        'user_id' => $user->id,
        'name' => 'My Saved Jobs',
        'type' => 'job',
    ]);

    ListItem::create([
        'saved_list_id' => $savedList->id,
        'listable_type' => JobPost::class,
        'listable_id' => $job->id,
    ]);

    $response = $this->actingAs($user)->get(route('jobs.saved'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/saved-jobs/page')
        ->has('jobs.data', 1)
        ->where('jobs.data.0.title', 'Software Engineer')
        ->has('savedJobIds')
        ->has('filters')
    );
});
