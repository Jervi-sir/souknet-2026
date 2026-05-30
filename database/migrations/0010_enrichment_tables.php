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
        Schema::create('data_enrichments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type', 50);
            $table->string('status', 20)->default('pending');
            $table->string('file_name')->nullable();
            $table->integer('credits_spent')->default(0);
            $table->timestamps();

            $table->index('user_id');
        });

        Schema::create('data_enrichment_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_enrichment_id')->constrained()->cascadeOnDelete();
            $table->string('input_query');
            $table->string('status', 20)->default('pending');
            $table->nullableMorphs('matched');
            $table->json('enriched_payload')->nullable();
            $table->timestamps();

            $table->index('data_enrichment_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_enrichments');
        Schema::dropIfExists('data_enrichment_items');
    }
};
