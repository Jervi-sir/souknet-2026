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
        // Delivery Providers / Carriers (Yalidine, ZR Express, Maystro, Echrak, Procolis, Self)
        Schema::create('delivery_providers', function (Blueprint $table) {
            $table->string('code', 50)->primary(); // yalidine, zr_express, maystro, echrak, self
            $table->string('name');
            $table->string('logo_url')->nullable();
            $table->string('api_base_url')->nullable();
            $table->string('driver_class')->nullable(); // \App\Services\Delivery\YalidineDriver
            $table->boolean('supports_stopdesk')->default(true);
            $table->boolean('supports_home_delivery')->default(true);
            $table->boolean('supports_tracking')->default(true);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Delivery Companies / Tenants registered by organizations or delivery hubs
        Schema::create('delivery_companies', function (Blueprint $table) {
            $table->string('code', 50)->primary();
            $table->string('name');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Delivery Wilayas: Provider-specific mapping and pricing per Wilaya
        Schema::create('delivery_wilayas', function (Blueprint $table) {
            $table->id();
            $table->string('delivery_provider_code', 50);
            $table->foreignId('wilaya_id')->constrained('wilayas')->nullOnDelete();
            $table->string('provider_wilaya_code', 20)->nullable(); // e.g. provider's internal ID for Alger
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->foreign('delivery_provider_code')->references('code')->on('delivery_providers')->cascadeOnDelete();
        });

        // Delivery Communes: Provider-specific mapping per Baladiya
        Schema::create('delivery_communes', function (Blueprint $table) {
            $table->id();
            $table->string('delivery_provider_code', 50);
            $table->foreign('delivery_provider_code')->references('code')->on('delivery_providers')->cascadeOnDelete();
            $table->foreignId('commune_id')->constrained('communes')->cascadeOnDelete();
            $table->string('provider_commune_code', 30)->nullable();
            $table->boolean('is_deliverable')->default(true);
            $table->timestamps();

            $table->unique(['delivery_provider_code', 'commune_id']);
        });

        // Delivery Stopdesks / Agency Hubs in Algeria (bureau/hub to pickup parcels)
        Schema::create('delivery_stopdesks', function (Blueprint $table) {
            $table->id();
            $table->string('delivery_provider_code', 50);
            $table->foreignId('wilaya_id')->constrained('wilayas')->cascadeOnDelete();
            $table->foreignId('commune_id')->nullable()->constrained('communes')->nullOnDelete();
            $table->string('name'); // e.g. "Yalidine Alger Centre"
            $table->string('code', 50)->nullable();
            $table->text('address');
            $table->string('phone', 20)->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('delivery_provider_code')->references('code')->on('delivery_providers')->cascadeOnDelete();
            $table->index(['delivery_provider_code', 'wilaya_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_stopdesks');
        Schema::dropIfExists('delivery_communes');
        Schema::dropIfExists('delivery_wilayas');
        Schema::dropIfExists('delivery_companies');
        Schema::dropIfExists('delivery_providers');
    }
};
