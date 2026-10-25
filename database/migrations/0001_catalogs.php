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
        // 58 Wilayas of Algeria (e.g. 16: Alger, 31: Oran, 25: Constantine)
        Schema::create('wilayas', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique(); // "01", "16", "58"
            $table->string('name_ar')->nullable();
            $table->string('name_fr')->nullable();
            $table->string('name_en')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Communes / Baladiyas in each wilaya
        Schema::create('communes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wilaya_id')->constrained('wilayas')->cascadeOnDelete();
            $table->string('code', 20)->nullable();
            $table->string('name_ar')->nullable();
            $table->string('name_fr')->nullable();
            $table->string('name_en')->nullable();
            $table->string('post_code', 10)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['wilaya_id', 'is_active']);
        });

        // Global system category taxonomy (e.g. Electronics, Clothing, Beauty, etc.)
        Schema::create('global_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('global_categories')->nullOnDelete();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('icon')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Store-specific product categories
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->foreignId('parent_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
        Schema::dropIfExists('global_categories');
        Schema::dropIfExists('communes');
        Schema::dropIfExists('wilayas');
    }
};
