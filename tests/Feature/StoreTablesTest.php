<?php

use App\Models\Role;
use App\Models\Store;
use App\Models\StoreOrder;
use App\Models\StoreOrderItem;
use App\Models\StoreProduct;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('stores and related models can be created and their relationships work correctly', function () {
    $role = Role::create([
        'code' => 'user',
        'en' => 'Regular User',
    ]);

    $user = User::create([
        'name' => 'Store Owner',
        'email' => 'owner@example.com',
        'password' => bcrypt('password'),
        'role_id' => $role->id,
    ]);

    // 1. Create a store
    $store = Store::create([
        'user_id' => $user->id,
        'name' => 'My Shopify Store',
        'slug' => 'my-shopify-store',
        'description' => 'A wonderful test store',
        'domain' => 'my-store.example.com',
        'theme_settings' => ['primary_color' => '#ff0000', 'layout' => 'compact'],
        'status' => 'active',
    ]);

    $this->assertModelExists($store);
    expect($store->user->id)->toBe($user->id);
    expect($store->theme_settings)->toBe(['primary_color' => '#ff0000', 'layout' => 'compact']);

    // 2. Create products for the store
    $product1 = StoreProduct::create([
        'store_id' => $store->id,
        'name' => 'Awesome Product',
        'slug' => 'awesome-product',
        'description' => 'Best product ever',
        'price_cents' => 2999,
        'compare_at_price_cents' => 3999,
        'sku' => 'AW-001',
        'barcode' => '123456789012',
        'inventory_quantity' => 10,
        'track_inventory' => true,
        'status' => 'active',
    ]);

    $product2 = StoreProduct::create([
        'store_id' => $store->id,
        'name' => 'Another Product',
        'slug' => 'another-product',
        'description' => 'Also pretty cool',
        'price_cents' => 4999,
        'inventory_quantity' => 0,
        'track_inventory' => false,
        'status' => 'draft',
    ]);

    $this->assertModelExists($product1);
    $this->assertModelExists($product2);

    expect($product1->store->id)->toBe($store->id);
    expect($store->products)->toHaveCount(2);

    // 3. Create a store order
    $order = StoreOrder::create([
        'store_id' => $store->id,
        'customer_name' => 'Jane Doe',
        'customer_email' => 'jane@example.com',
        'customer_phone' => '+1234567890',
        'shipping_address' => '123 Main St, Anytown, US',
        'billing_address' => '123 Main St, Anytown, US',
        'subtotal_cents' => 7998,
        'shipping_cents' => 500,
        'total_cents' => 8498,
        'payment_status' => 'paid',
        'fulfillment_status' => 'unfulfilled',
    ]);

    $this->assertModelExists($order);
    expect($order->store->id)->toBe($store->id);
    expect($store->orders)->toHaveCount(1);

    // 4. Create store order items
    $orderItem1 = StoreOrderItem::create([
        'store_order_id' => $order->id,
        'store_product_id' => $product1->id,
        'product_name' => $product1->name,
        'price_cents' => $product1->price_cents,
        'quantity' => 1,
    ]);

    $orderItem2 = StoreOrderItem::create([
        'store_order_id' => $order->id,
        'store_product_id' => $product2->id,
        'product_name' => $product2->name,
        'price_cents' => $product2->price_cents,
        'quantity' => 1,
    ]);

    $this->assertModelExists($orderItem1);
    $this->assertModelExists($orderItem2);

    expect($orderItem1->order->id)->toBe($order->id);
    expect($orderItem1->product->id)->toBe($product1->id);

    expect($order->items)->toHaveCount(2);
});

test('owners can access store pages and manage products, and guests can view storefronts', function () {
    $role = Role::create([
        'code' => 'user',
        'en' => 'Regular User',
    ]);

    $user = User::create([
        'name' => 'Store Owner',
        'email' => 'owner@example.com',
        'password' => bcrypt('password'),
        'role_id' => $role->id,
    ]);

    // Guest cannot view store administration
    $this->get('/stores/create')->assertRedirect('/login');

    // Authenticate the owner
    $this->actingAs($user);

    // Can access create page
    $this->get('/stores/create')->assertOk();

    // Can submit store creation
    $response = $this->post('/stores', [
        'name' => 'My New Shop',
        'description' => 'A wonderful online boutique.',
        'theme_color' => '#ff5500',
    ]);

    $store = Store::where('name', 'My New Shop')->first();
    expect($store)->not->toBeNull();
    $response->assertRedirect(route('stores.show', $store->id));

    // Can access show page
    $this->get(route('stores.show', $store->id))->assertOk();

    // Can access product creation page
    $this->get(route('stores.products.create', $store->id))->assertOk();

    // Can submit product creation
    $productResponse = $this->post(route('stores.products.store', $store->id), [
        'name' => 'New Magic Widget',
        'description' => 'Unbelievably good gadget.',
        'price' => '24.99',
        'compare_at_price' => '39.99',
        'sku' => 'MW-001',
        'barcode' => '8888888888',
        'inventory_quantity' => 50,
        'track_inventory' => true,
        'status' => 'active',
    ]);

    $product = StoreProduct::where('name', 'New Magic Widget')->first();
    expect($product)->not->toBeNull();
    expect($product->price_cents)->toBe(2499);
    $productResponse->assertRedirect(route('stores.show', $store->id));

    // Can access customization editor page
    $this->get(route('stores.customize', $store->id))->assertOk();

    // Can save blocks configuration and product page configuration
    $customizerResponse = $this->post(route('stores.save-customize', $store->id), [
        'blocks' => [
            ['id' => 'hero-1', 'type' => 'hero', 'settings' => ['title' => 'Shop Now']],
            ['id' => 'products-1', 'type' => 'featured_products', 'settings' => ['limit' => 2]],
        ],
        'theme_color' => '#10b981',
        'product_page' => [
            'layout' => 'stacked',
            'show_inventory' => false,
            'show_sku' => true,
            'show_barcode' => false,
            'buy_button_text' => 'Inquire Today',
        ],
    ]);
    $customizerResponse->assertRedirect();

    $store->refresh();
    expect($store->theme_settings['primary_color'])->toBe('#10b981');
    expect($store->theme_settings['blocks'])->toHaveCount(2);
    expect($store->theme_settings['product_page']['layout'])->toBe('stacked');
    expect($store->theme_settings['product_page']['buy_button_text'])->toBe('Inquire Today');

    // Guest can access public storefront which now has blocks config
    $this->be(new User); // Logout / become guest

    $this->get("/store/{$store->slug}")->assertOk();
    $this->get("/store/{$store->slug}/products/{$product->slug}")->assertOk();
});
