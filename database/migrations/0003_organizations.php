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
        // Organizations: Business entities (wholesaler, factory, e-com company, brand)
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('users')->restrictOnDelete();
            $table->string('name');
            $table->string('business_type_code', 50)->default('merchant'); // merchant, wholesaler, factory, brand, agency
            $table->string('tax_number', 50)->nullable(); // NIF / RC / NIS
            $table->string('legal_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 20)->nullable();
            $table->foreignId('wilaya_id')->nullable()->constrained('wilayas')->nullOnDelete();
            $table->foreignId('commune_id')->nullable()->constrained('communes')->nullOnDelete();
            $table->text('address')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('status', 30)->default('active'); // active, suspended, pending_verification
            $table->timestamps();

            $table->index(['business_type_code', 'status']);
        });

        // Memberships: Teams, role access per organization
        Schema::create('organization_memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained('organizations')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('role', 30)->default('member'); // owner, admin, manager, member
            $table->json('permissions')->nullable();
            $table->string('status', 30)->default('active'); // active, invited, suspended
            $table->timestamps();

            $table->unique(['organization_id', 'user_id']);
            $table->index(['organization_id', 'role']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_memberships');
        Schema::dropIfExists('organizations');
    }
};
