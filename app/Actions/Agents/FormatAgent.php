<?php

namespace App\Actions\Agents;

use App\Models\Agent;

class FormatAgent
{
    /**
     * Format an Agent model into an array.
     *
     * @return array<string, mixed>
     */
    public static function format(Agent $agent): array
    {
        return [
            'id' => (string) $agent->id,
            'user_id' => (string) $agent->user_id,
            'organization_id' => (string) $agent->organization_id,
            'name' => $agent->name,
            'phone' => $agent->phone,
            'agent_code' => $agent->agent_code,
            'status' => $agent->status,
            'daily_call_limit' => (int) $agent->daily_call_limit,
            'total_calls_handled' => (int) $agent->total_calls_handled,
            'total_orders_confirmed' => (int) $agent->total_orders_confirmed,
            'total_orders_cancelled' => (int) $agent->total_orders_cancelled,
            'commission_rate' => (float) $agent->commission_rate,
            'created_at' => $agent->created_at?->toIso8601String(),
        ];
    }
}
