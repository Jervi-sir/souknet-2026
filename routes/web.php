<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::prefix('storefront')->name('storefront.')->group(function () {
    Route::inertia('/', 'storefront/home')->name('home');
    Route::inertia('/product', 'storefront/product')->name('product');
    Route::inertia('/cart', 'storefront/cart')->name('cart');
    Route::inertia('/checkout', 'storefront/checkout')->name('checkout');
    Route::inertia('/order-success', 'storefront/order-success')->name('order-success');
});

Route::prefix('store-merchant')->name('store-merchant.')->group(function () {
    Route::inertia('/dashboard', 'store-marchant/store-management/dashboard')->name('dashboard');
    Route::inertia('/orders', 'store-marchant/store-management/orders')->name('orders');
    Route::inertia('/products', 'store-marchant/store-management/products')->name('products');
    Route::inertia('/inventory', 'store-marchant/store-management/inventory')->name('inventory');
    Route::inertia('/categories', 'store-marchant/store-management/categories-collections')->name('categories');
    Route::inertia('/customers', 'store-marchant/store-management/customers')->name('customers');
    Route::inertia('/settings', 'store-marchant/configuration/settings')->name('settings');
    Route::inertia('/domain', 'store-marchant/configuration/domain')->name('domain');
    Route::inertia('/theme', 'store-marchant/configuration/storefront-theme')->name('theme');
    Route::inertia('/billing', 'store-marchant/configuration/subscription-billing')->name('billing');
    Route::inertia('/invoices', 'store-marchant/configuration/fiscal-invoices')->name('invoices');
    Route::inertia('/analytics', 'store-marchant/growth/analytics-sales')->name('analytics');
    Route::inertia('/campaigns', 'store-marchant/growth/ads-campaigns')->name('campaigns');
    Route::inertia('/notifications', 'store-marchant/growth/whatsapp-automation')->name('notifications');
    Route::inertia('/apps', 'store-marchant/growth/apps-integrations')->name('apps');
    Route::inertia('/discounts', 'store-marchant/growth/discount-promotions')->name('discounts');
    Route::inertia('/settlements', 'store-marchant/operations/cod-settlements')->name('settlements');
    Route::inertia('/shipping', 'store-marchant/operations/delivery-shipping')->name('shipping');
    Route::inertia('/shipping-labels', 'store-marchant/operations/shipping-labels')->name('shipping-labels');
    Route::inertia('/dispatch-planner', 'store-marchant/operations/dispatch-planner')->name('dispatch-planner');
    Route::inertia('/webhooks', 'store-marchant/operations/courier-webhooks')->name('webhooks');
    Route::inertia('/returns', 'store-marchant/operations/returns')->name('returns');
    Route::inertia('/my-stores', 'store-marchant/workspace/my-stores')->name('my-stores');
    Route::inertia('/workspace-overview', 'store-marchant/workspace/overview')->name('workspace-overview');
    Route::inertia('/team', 'store-marchant/workspace/team-permissions')->name('team');
});

Route::prefix('organization')->name('organization.')->group(function () {
    Route::inertia('/select', 'organization/select')->name('select');
    Route::inertia('/create', 'organization/create')->name('create');
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::inertia('/general', 'organization/settings/general')->name('general');
        Route::inertia('/stores', 'organization/settings/stores')->name('stores');
        Route::inertia('/members', 'organization/settings/members')->name('members');
        Route::inertia('/billing', 'organization/settings/billing')->name('billing');
    });
});

Route::prefix('customer')->name('customer.')->group(function () {
    Route::inertia('/orders', 'customer/orders/index')->name('orders');
    Route::inertia('/orders/show', 'customer/orders/show')->name('orders.show');
    Route::inertia('/profile', 'customer/profile')->name('profile');
});

Route::prefix('call-center')->name('call-center.')->group(function () {
    Route::inertia('/desk', 'call-center/desk')->name('desk');
    Route::inertia('/order-confirmation', 'call-center/order-confirmation')->name('order-confirmation');
    Route::inertia('/order-suivi', 'call-center/order-suivi')->name('order-suivi');
    Route::inertia('/audit-tentatives', 'call-center/audit-tentatives')->name('audit-tentatives');
    Route::inertia('/analytics', 'call-center/analytics/index')->name('analytics');
    Route::inertia('/finance/cod-reconciliation', 'call-center/finance/cod-reconciliation')->name('cod-reconciliation');
});

Route::prefix('marketplace')->name('marketplace.')->group(function () {
    Route::inertia('/', 'marketplace/home')->name('home');
    Route::inertia('/explore', 'marketplace/explore')->name('explore');
    Route::inertia('/product', 'marketplace/product')->name('product');
    Route::inertia('/stores', 'marketplace/stores')->name('stores');
    Route::inertia('/track', 'marketplace/track')->name('track');
});

require __DIR__.'/settings.php';
