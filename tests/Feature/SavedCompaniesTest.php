<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\ListItem;
use App\Models\Role;
use App\Models\SavedList;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected to login when accessing saved companies page', function () {
    $response = $this->get(route('companies.saved'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can access the saved companies page', function () {
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
        'city' => 'Algiers',
        'is_verified' => true,
    ]);

    $savedList = SavedList::create([
        'user_id' => $user->id,
        'name' => 'My Saved Companies',
        'type' => 'business',
    ]);

    ListItem::create([
        'saved_list_id' => $savedList->id,
        'listable_type' => Business::class,
        'listable_id' => $business->id,
    ]);

    $response = $this->actingAs($user)->get(route('companies.saved'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/saved-companies/page')
        ->has('businesses.data', 1)
        ->where('businesses.data.0.name', 'Company A')
        ->has('savedCompanyIds')
        ->has('filters')
    );
});
