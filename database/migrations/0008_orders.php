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
        // Orders: Central to e-commerce and COD in Algeria
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->string('order_number', 50)->unique(); // e.g. "SK-2610-0012"
            $table->string('customer_name');
            $table->string('customer_phone', 20);
            $table->string('customer_phone_alt', 20)->nullable();
            $table->foreignId('wilaya_id')->constrained('wilayas')->restrictOnDelete();
            $table->foreignId('commune_id')->nullable()->constrained('communes')->nullOnDelete();
            $table->string('delivery_type', 20)->default('home'); // home, stopdesk
            $table->string('delivery_wilaya_name')->nullable();
            $table->string('delivery_commune_name')->nullable();
            $table->foreignId('delivery_stopdesk_id')->nullable()->constrained('delivery_stopdesks')->nullOnDelete();
            $table->text('delivery_address')->nullable();
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('discount_amount', 12, 2)->default(0);
            $table->decimal('shipping_fee', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2)->default(0); // Amount to collect COD
            $table->string('payment_method', 30)->default('cod'); // cod, card, baridimob
            $table->string('payment_status', 30)->default('pending'); // pending, collected, refunded, failed
            $table->string('status', 30)->default('pending'); // pending, confirmed, processing, shipped, delivered, cancelled, returned
            $table->string('logistic_status', 30)->nullable(); // unfulfilled, prepared, in_transit, at_hub, out_for_delivery, delivered, returned, delivery_failed
            $table->text('customer_note')->nullable();
            $table->text('internal_notes')->nullable();
            $table->string('source', 50)->default('storefront'); // storefront, landing_page, call_center, manual, api
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamp('returned_at')->nullable();
            $table->timestamps();

            $table->index(['store_id', 'status']);
            $table->index(['customer_phone', 'status']);
        });

        // Items included in the order
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->foreignId('product_variant_id')->nullable()->constrained('product_variants')->nullOnDelete();
            $table->string('product_name');
            $table->string('variant_title')->nullable();
            $table->string('sku')->nullable();
            $table->decimal('unit_price', 12, 2);
            $table->integer('quantity')->default(1);
            $table->decimal('total_price', 12, 2);
            $table->timestamps();
        });

        // Order Timeline (audit log of every status change and action)
        Schema::create('order_timelines', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // e.g. "client", "confirmation", "suivi", "delivery"
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action'); // e.g. "created", "status_changed", "shipped", "call_attempt"
            $table->string('from_status', 30)->nullable();
            $table->string('to_status', 30)->nullable();
            $table->text('comment')->nullable();
            $table->text('description')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['order_id', 'action']);
        });

        // Shipments: Parcels created with couriers or self-delivery
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('store_delivery_account_id')->nullable()->constrained('store_delivery_accounts')->nullOnDelete();

            $table->string('delivery_provider_code', 50)->nullable();
            $table->foreign('delivery_provider_code')->references('code')->on('delivery_providers')->nullOnDelete();
            $table->string('tracking_number')->nullable()->index();
            $table->string('provider_parcel_id')->nullable();
            $table->string('barcode')->nullable();
            $table->string('label_url')->nullable();
            $table->decimal('cod_amount', 12, 2); // Exact cash amount driver must collect
            $table->decimal('shipping_cost', 12, 2)->default(0); // Cost paid to courier
            $table->string('status', 30)->default('created'); // created, picked_up, in_transit, at_hub, out_for_delivery, delivered, returned, lost
            $table->string('current_location')->nullable();
            $table->text('last_tracking_event')->nullable();
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('returned_at')->nullable();
            $table->timestamps();

            $table->index(['order_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
        Schema::dropIfExists('order_timelines');
        Schema::dropIfExists('order_notes');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};
