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
        // Subscription plans for Souknet (Starter, Pro, Enterprise, Call-Center addon)
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique(); // starter, pro, scale, enterprise
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price_monthly', 12, 2)->default(0);
            $table->decimal('price_yearly', 12, 2)->default(0);
            $table->string('currency', 10)->default('DZD');
            $table->integer('max_stores')->default(1);
            $table->integer('max_products')->default(50);
            $table->integer('max_orders_per_month')->default(500);
            $table->integer('max_team_members')->default(2);
            $table->boolean('has_call_center')->default(false);
            $table->boolean('has_delivery_integrations')->default(true);
            $table->boolean('has_custom_domain')->default(false);
            $table->json('features')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Organization subscriptions to plans
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained('organizations')->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained('plans')->restrictOnDelete();
            $table->string('status', 30)->default('active'); // active, trialing, past_due, canceled, expired
            $table->string('billing_cycle', 20)->default('monthly'); // monthly, yearly, lifetime
            $table->timestamp('trial_ends_at')->nullable();
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->timestamp('cancels_at')->nullable();
            $table->timestamp('canceled_at')->nullable();
            $table->timestamps();

            $table->index(['organization_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
        Schema::dropIfExists('plans');
    }
};
