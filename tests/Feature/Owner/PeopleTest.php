<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\People;
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

test('guests are redirected to the login page from owner people directory', function () {
    $response = $this->get(route('owner.people.index'));
    $response->assertRedirect(route('login'));
});

test('owners can access their team directory and filter the list', function () {
    $business = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $otherBusiness = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'name' => 'Company B',
        'slug' => 'company-b',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $person1 = People::create([
        'business_id' => $business->id,
        'first_name' => 'Alice',
        'last_name' => 'Smith',
        'title' => 'Product Manager',
        'email' => 'alice@example.com',
        'is_verified' => true,
    ]);

    $person2 = People::create([
        'business_id' => $otherBusiness->id,
        'first_name' => 'Bob',
        'last_name' => 'Jones',
        'title' => 'Software Engineer',
        'email' => 'bob@example.com',
        'is_verified' => false,
    ]);

    $this->actingAs($this->user);

    // List all
    $response = $this->get(route('owner.people.index'));
    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/people/listed-jobs/page')
        ->has('people.data', 2)
        ->has('businesses', 2)
        ->has('filters')
    );

    // Filter by search
    $response = $this->get(route('owner.people.index', ['search' => 'Alice']));
    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/people/listed-jobs/page')
        ->has('people.data', 1)
        ->where('people.data.0.first_name', 'Alice')
    );

    // Filter by business_id
    $response = $this->get(route('owner.people.index', ['business_id' => $otherBusiness->id]));
    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/people/listed-jobs/page')
        ->has('people.data', 1)
        ->where('people.data.0.first_name', 'Bob')
    );
});

test('owners can create a new team member', function () {
    $business = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $this->actingAs($this->user);

    $response = $this->post(route('owner.people.store'), [
        'business_id' => $business->id,
        'first_name' => 'John',
        'last_name' => 'Doe',
        'title' => 'Architect',
        'email' => 'john@example.com',
        'phone' => '123456789',
        'location' => 'Algiers',
        'linkedin_url' => 'https://linkedin.com/in/johndoe',
        'github_url' => 'https://github.com/johndoe',
        'is_verified' => true,
    ]);

    $response->assertRedirect(route('owner.people.index'));
    $this->assertDatabaseHas('peoples', [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'business_id' => $business->id,
        'is_verified' => true,
    ]);
});

test('owners can view and update team member details', function () {
    $business = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $person = People::create([
        'business_id' => $business->id,
        'first_name' => 'Jane',
        'last_name' => 'Miller',
        'title' => 'Designer',
        'is_verified' => false,
    ]);

    $this->actingAs($this->user);

    // View details page
    $response = $this->get(route('owner.people.show', ['id' => $person->id]));
    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/people/show-job/page')
        ->where('person.first_name', 'Jane')
    );

    // Update details
    $response = $this->put(route('owner.people.update', ['id' => $person->id]), [
        'business_id' => $business->id,
        'first_name' => 'Jane Updated',
        'last_name' => 'Miller',
        'title' => 'Senior Designer',
        'is_verified' => true,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('peoples', [
        'id' => $person->id,
        'first_name' => 'Jane Updated',
        'title' => 'Senior Designer',
        'is_verified' => true,
    ]);
});

test('owners can delete a team member', function () {
    $business = Business::create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'name' => 'Company A',
        'slug' => 'company-a',
        'status' => 'published',
        'country' => 'Algeria',
    ]);

    $person = People::create([
        'business_id' => $business->id,
        'first_name' => 'David',
        'last_name' => 'Clark',
        'title' => 'Intern',
        'is_verified' => false,
    ]);

    $this->actingAs($this->user);

    $response = $this->delete(route('owner.people.destroy', ['id' => $person->id]));

    $response->assertRedirect(route('owner.people.index'));
    $this->assertDatabaseMissing('peoples', [
        'id' => $person->id,
    ]);
});
