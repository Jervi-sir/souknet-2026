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
        Schema::create('saved_lists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('type', 50)->default('people');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index('user_id');
        });

        Schema::create('list_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('saved_list_id')->constrained('saved_lists')->cascadeOnDelete();
            $table->morphs('listable');
            $table->timestamps();

            $table->unique(['saved_list_id', 'listable_type', 'listable_id'], 'list_items_unique_reference');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saved_lists');
        Schema::dropIfExists('list_items');
    }
};
