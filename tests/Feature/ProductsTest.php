<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can access the products page', function () {
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

    $product = Product::create([
        'business_id' => $business->id,
        'category_id' => $category->id,
        'name' => 'Tech Gadget',
        'slug' => 'tech-gadget',
        'price_cents' => 1000,
        'type' => 'small',
        'is_active' => true,
    ]);

    $response = $this->get(route('products.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/products/page')
        ->has('products')
        ->has('categories')
        ->has('filters')
        ->has('savedProductIds')
    );
});

test('users can save and unsave products', function () {
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

    $product = Product::create([
        'business_id' => $business->id,
        'category_id' => $category->id,
        'name' => 'Other Gadget',
        'slug' => 'other-gadget',
        'price_cents' => 2000,
        'type' => 'small',
        'is_active' => true,
    ]);

    $response = $this->post(route('products.save', $product->id));
    $response->assertRedirect(route('login'));

    $this->actingAs($user);

    $response = $this->post(route('products.save', $product->id));
    $response->assertRedirect();
    $response->assertSessionHas('success', 'Product saved successfully.');

    $this->assertDatabaseHas('list_items', [
        'listable_type' => Product::class,
        'listable_id' => $product->id,
    ]);

    $response = $this->post(route('products.save', $product->id));
    $response->assertRedirect();
    $response->assertSessionHas('success', 'Product removed from your saved list.');

    $this->assertDatabaseMissing('list_items', [
        'listable_type' => Product::class,
        'listable_id' => $product->id,
    ]);
});
