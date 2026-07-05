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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('domain')->unique()->nullable();
            $table->json('theme_settings')->nullable();
            $table->string('status', 20)->default('draft');
            $table->timestamps();

            $table->index('user_id');
            $table->index('status');
        });

        Schema::create('store_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->integer('price_cents');
            $table->integer('compare_at_price_cents')->nullable();
            $table->string('sku')->nullable();
            $table->string('barcode')->nullable();
            $table->integer('inventory_quantity')->default(0);
            $table->boolean('track_inventory')->default(true);
            $table->string('status', 20)->default('draft');
            $table->string('image_path', 500)->nullable();
            $table->timestamps();

            $table->unique(['store_id', 'slug']);
            $table->index('store_id');
            $table->index('status');
        });

        Schema::create('store_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone')->nullable();
            $table->text('shipping_address')->nullable();
            $table->text('billing_address')->nullable();
            $table->integer('subtotal_cents');
            $table->integer('shipping_cents')->default(0);
            $table->integer('total_cents');
            $table->string('payment_status', 20)->default('pending');
            $table->string('fulfillment_status', 20)->default('unfulfilled');
            $table->timestamps();

            $table->index('store_id');
            $table->index('payment_status');
            $table->index('fulfillment_status');
        });

        Schema::create('store_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('store_product_id')->nullable()->constrained()->nullOnDelete();
            $table->string('product_name');
            $table->integer('price_cents');
            $table->integer('quantity');
            $table->timestamps();

            $table->index('store_order_id');
            $table->index('store_product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_order_items');
        Schema::dropIfExists('store_orders');
        Schema::dropIfExists('store_products');
        Schema::dropIfExists('stores');
    }
};
