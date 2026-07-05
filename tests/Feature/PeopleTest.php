<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\People;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can access the people directory page', function () {
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

    $response = $this->get(route('people.index'));

    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('public/discover/people/page')
            ->has('people')
            ->has('categories')
            ->has('cities')
            ->has('filters')
            ->has('savedPeopleIds')
    );
});

test('users can save and unsave people', function () {
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

    $person = People::create([
        'first_name' => 'Jane',
        'last_name' => 'Smith',
        'email' => 'jane.smith@example.com',
        'is_verified' => true,
    ]);

    $response = $this->post(route('people.save', $person->id));
    $response->assertRedirect(route('login'));

    $this->actingAs($user);

    $response = $this->post(route('people.save', $person->id));
    $response->assertRedirect();
    $response->assertSessionHas('success', 'Person saved successfully.');

    $this->assertDatabaseHas('list_items', [
        'listable_type' => People::class,
        'listable_id' => $person->id,
    ]);

    $response = $this->post(route('people.save', $person->id));
    $response->assertRedirect();
    $response->assertSessionHas('success', 'Person removed from your saved list.');

    $this->assertDatabaseMissing('list_items', [
        'listable_type' => People::class,
        'listable_id' => $person->id,
    ]);
});
