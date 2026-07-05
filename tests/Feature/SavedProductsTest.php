<?php

use App\Models\Business;
use App\Models\Category;
use App\Models\ListItem;
use App\Models\Product;
use App\Models\Role;
use App\Models\SavedList;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests are redirected to login when accessing saved products page', function () {
    $response = $this->get(route('products.saved'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can access the saved products page', function () {
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

    $product = Product::create([
        'business_id' => $business->id,
        'category_id' => $category->id,
        'name' => 'Widget Pro',
        'slug' => 'widget-pro',
        'price_cents' => 9999,
        'price_monthly_cents' => 0,
        'type' => 'small',
        'is_active' => true,
    ]);

    $savedList = SavedList::create([
        'user_id' => $user->id,
        'name' => 'My Saved Products',
        'type' => 'product',
    ]);

    ListItem::create([
        'saved_list_id' => $savedList->id,
        'listable_type' => Product::class,
        'listable_id' => $product->id,
    ]);

    $response = $this->actingAs($user)->get(route('products.saved'));

    $response->assertOk();
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('public/saved-products/page')
            ->has('products.data', 1)
            ->where('products.data.0.name', 'Widget Pro')
            ->has('savedProductIds')
            ->has('filters')
    );
});
