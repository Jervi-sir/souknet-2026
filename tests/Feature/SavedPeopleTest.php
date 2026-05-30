<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\ListItem;
use App\Models\People;
use App\Models\Role;
use App\Models\SavedList;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected to login when accessing saved people page', function () {
    $response = $this->get(route('people.saved'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can access the saved people page', function () {
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

    $person = People::create([
        'business_id' => $business->id,
        'first_name' => 'John',
        'last_name' => 'Doe',
        'title' => 'Developer',
        'email' => 'john.doe@example.com',
        'phone' => '123456789',
        'location' => 'Algiers, Algeria',
        'is_verified' => true,
    ]);

    $savedList = SavedList::create([
        'user_id' => $user->id,
        'name' => 'My Saved People',
        'type' => 'people',
    ]);

    ListItem::create([
        'saved_list_id' => $savedList->id,
        'listable_type' => People::class,
        'listable_id' => $person->id,
    ]);

    $response = $this->actingAs($user)->get(route('people.saved'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/saved-people/page')
        ->has('people.data', 1)
        ->where('people.data.0.first_name', 'John')
        ->has('savedPeopleIds')
        ->has('filters')
    );
});
