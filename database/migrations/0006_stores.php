<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Stores: Each brand / e-commerce storefront
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained('organizations')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique(); // subdomain: mystore.souknet.dz or /s/mystore
            $table->string('custom_domain')->nullable()->unique(); // e.g. mystore.com
            $table->string('currency', 10)->default('DZD');
            $table->string('email')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('whatsapp_number', 20)->nullable();
            $table->string('logo_url')->nullable();
            $table->string('favicon_url')->nullable();
            $table->text('description')->nullable();
            $table->string('default_locale', 5)->default('ar'); // ar, fr, en
            $table->json('theme_settings')->nullable(); // primary_color, banner, fonts, header layout, etc.
            $table->json('checkout_settings')->nullable(); // auto_confirm, require_address, shipping_rates, etc.
            $table->json('pixels_config')->nullable(); // facebook_pixel_id, tiktok_pixel_id, gtm_id
            $table->string('status', 30)->default('active'); // active, maintenance, draft, suspended
            $table->timestamps();

            $table->index(['organization_id', 'status']);
        });

        // Store Team Access / Role permissions per store
        Schema::create('store_memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('role', 30)->default('staff'); // manager, staff, fulfillment, support
            $table->json('permissions')->nullable();
            $table->timestamps();

            $table->unique(['store_id', 'user_id']);
        });

        // Store Collections (featured collections, seasonal banners, landing lists)
        Schema::create('store_collections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['store_id', 'slug']);
        });

        // Bridge table between collections and products (created after products exist or standalone table)
        Schema::create('store_collection_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_collection_id')->constrained('store_collections')->cascadeOnDelete();
            $table->unsignedBigInteger('product_id'); // Foreign key constraint deferred/indexed
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['store_collection_id', 'product_id']);
            $table->index('product_id');
        });

        // Store Delivery Accounts: API keys / credentials for connected carriers per store
        Schema::create('store_delivery_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->string('delivery_company_code', 50);
            $table->string('account_name');
            $table->string('api_key')->nullable();
            $table->string('api_token')->nullable();
            $table->text('credentials_encrypted')->nullable(); // encrypted JSON credentials
            $table->boolean('is_active')->default(true);
            $table->boolean('is_valid')->default(true);
            $table->boolean('is_default')->default(false);
            $table->timestamps();

            $table->foreign('delivery_company_code')->references('code')->on('delivery_companies')->cascadeOnDelete();
            $table->index(['store_id', 'delivery_company_code', 'is_active']);
        });

        // Store Delivery Account Fees: Per-wilaya pricing for a store's carrier account
        Schema::create('store_delivery_account_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_delivery_account_id')->constrained('store_delivery_accounts')->cascadeOnDelete();
            $table->foreignId('wilaya_id')->constrained('wilayas')->cascadeOnDelete();
            $table->decimal('home_delivery_fee', 10, 2)->default(0);
            $table->decimal('stopdesk_delivery_fee', 10, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['store_delivery_account_id', 'wilaya_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_delivery_account_fees');
        Schema::dropIfExists('store_delivery_accounts');
        Schema::dropIfExists('store_collection_products');
        Schema::dropIfExists('store_collections');
        Schema::dropIfExists('store_memberships');
        Schema::dropIfExists('stores');
    }
};
