<?php

namespace App\Models;

use App\Models\Orders\Order;
use App\Models\Organizations\Organization;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Agent extends Model
{
    // Statuses
    public const STATUS_ACTIVE = 'active';

    public const STATUS_ON_CALL = 'on_call';

    public const STATUS_PAUSED = 'paused';

    public const STATUS_OFFLINE = 'offline';

    // Call Outcomes (recorded on assigned orders)
    public const OUTCOME_CONFIRMED = 'confirmed';

    public const OUTCOME_CANCELLED = 'cancelled';

    public const OUTCOME_UNREACHABLE_1 = 'unreachable_1';

    public const OUTCOME_UNREACHABLE_2 = 'unreachable_2';

    public const OUTCOME_UNREACHABLE_3 = 'unreachable_3';

    public const OUTCOME_BUSY = 'busy';

    public const OUTCOME_POSTPONED = 'postponed';

    public const OUTCOME_WRONG_NUMBER = 'wrong_number';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'organization_id',
        'name',
        'phone',
        'agent_code',
        'status',
        'daily_call_limit',
        'total_calls_handled',
        'total_orders_confirmed',
        'total_orders_cancelled',
        'commission_rate',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'daily_call_limit' => 'integer',
            'total_calls_handled' => 'integer',
            'total_orders_confirmed' => 'integer',
            'total_orders_cancelled' => 'integer',
            'commission_rate' => 'decimal:2',
        ];
    }

    /**
     * User account associated with this agent.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Organization this agent belongs to.
     */
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Orders currently assigned to this agent.
     */
    public function assignedOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'assigned_agent_id');
    }
}
