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
        // Call center & fulfillment agents profile & assignment desk
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('organization_id')->constrained('organizations')->cascadeOnDelete();
            $table->string('name');
            $table->string('phone', 20)->nullable();
            $table->string('agent_code', 30)->unique(); // e.g. "AGT-001"
            $table->string('status', 30)->default('active'); // active, on_call, paused, offline
            $table->integer('daily_call_limit')->default(150);
            $table->integer('total_calls_handled')->default(0);
            $table->integer('total_orders_confirmed')->default(0);
            $table->integer('total_orders_cancelled')->default(0);
            $table->decimal('commission_rate', 8, 2)->default(0); // per confirmed/delivered order
            $table->timestamps();

            $table->index(['organization_id', 'status']);
        });

        // Add call-center agent assignment directly to orders table
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('assigned_agent_id')->nullable()->after('store_id')->constrained('agents')->nullOnDelete();
            $table->integer('call_attempts_count')->default(0)->after('status');
            $table->timestamp('last_call_attempt_at')->nullable()->after('call_attempts_count');
            $table->string('call_outcome', 30)->nullable()->after('last_call_attempt_at'); // confirmed, cancelled, unreachable_1, unreachable_2, unreachable_3, busy, postponed, wrong_number
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['assigned_agent_id']);
            $table->dropColumn(['assigned_agent_id', 'call_attempts_count', 'last_call_attempt_at', 'call_outcome']);
        });

        Schema::dropIfExists('agents');
    }
};
