<?php

namespace App\Models\Orders;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderTimeline extends Model
{
    // Timeline Types
    public const TYPE_CLIENT = 'client';

    public const TYPE_CONFIRMATION = 'confirmation';

    public const TYPE_SUIVI = 'suivi';

    public const TYPE_DELIVERY = 'delivery';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'type',
        'order_id',
        'user_id',
        'action',
        'from_status',
        'to_status',
        'comment',
        'description',
        'metadata',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'metadata' => 'array',
        ];
    }

    /**
     * Order this timeline event belongs to.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * User who triggered this event (nullable for system actions).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
