<?php

namespace App\Models\Orders;

use App\Models\Agent;
use App\Models\Catalogs\Commune;
use App\Models\Catalogs\Wilaya;
use App\Models\Deliveries\DeliveryStopdesk;
use App\Models\Stores\Store;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    // Order Statuses
    public const STATUS_PENDING = 'pending';

    public const STATUS_CONFIRMED = 'confirmed';

    public const STATUS_PROCESSING = 'processing';

    public const STATUS_SHIPPED = 'shipped';

    public const STATUS_DELIVERED = 'delivered';

    public const STATUS_CANCELLED = 'cancelled';

    public const STATUS_RETURNED = 'returned';

    // Logistic Statuses
    public const LOGISTIC_STATUS_UNFULFILLED = 'unfulfilled';

    public const LOGISTIC_STATUS_PREPARED = 'prepared';

    public const LOGISTIC_STATUS_IN_TRANSIT = 'in_transit';

    public const LOGISTIC_STATUS_AT_HUB = 'at_hub';

    public const LOGISTIC_STATUS_OUT_FOR_DELIVERY = 'out_for_delivery';

    public const LOGISTIC_STATUS_DELIVERED = 'delivered';

    public const LOGISTIC_STATUS_RETURNED = 'returned';

    public const LOGISTIC_STATUS_FAILED = 'delivery_failed';

    // Delivery Types
    public const DELIVERY_TYPE_HOME = 'home';

    public const DELIVERY_TYPE_STOPDESK = 'stopdesk';

    // Payment Methods & Statuses
    public const PAYMENT_METHOD_COD = 'cod';

    public const PAYMENT_METHOD_CARD = 'card';

    public const PAYMENT_METHOD_BARIDIMOB = 'baridimob';

    public const PAYMENT_STATUS_PENDING = 'pending';

    public const PAYMENT_STATUS_COLLECTED = 'collected';

    public const PAYMENT_STATUS_REFUNDED = 'refunded';

    public const PAYMENT_STATUS_FAILED = 'failed';

    // Sources
    public const SOURCE_STOREFRONT = 'storefront';

    public const SOURCE_LANDING_PAGE = 'landing_page';

    public const SOURCE_CALL_CENTER = 'call_center';

    public const SOURCE_MANUAL = 'manual';

    public const SOURCE_API = 'api';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'store_id',
        'assigned_agent_id',
        'order_number',
        'customer_name',
        'customer_phone',
        'customer_phone_alt',
        'wilaya_id',
        'commune_id',
        'delivery_type',
        'delivery_wilaya_name',
        'delivery_commune_name',
        'delivery_stopdesk_id',
        'delivery_address',
        'subtotal',
        'discount_amount',
        'shipping_fee',
        'total_amount',
        'payment_method',
        'payment_status',
        'status',
        'logistic_status',
        'call_attempts_count',
        'last_call_attempt_at',
        'call_outcome',
        'customer_note',
        'internal_notes',
        'source',
        'ip_address',
        'user_agent',
        'confirmed_at',
        'shipped_at',
        'delivered_at',
        'cancelled_at',
        'returned_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'subtotal' => 'decimal:2',
            'discount_amount' => 'decimal:2',
            'shipping_fee' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'call_attempts_count' => 'integer',
            'last_call_attempt_at' => 'datetime',
            'confirmed_at' => 'datetime',
            'shipped_at' => 'datetime',
            'delivered_at' => 'datetime',
            'cancelled_at' => 'datetime',
            'returned_at' => 'datetime',
        ];
    }

    /**
     * Store this order was placed in.
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * Call-center agent assigned to confirm or handle this order.
     */
    public function assignedAgent(): BelongsTo
    {
        return $this->belongsTo(Agent::class, 'assigned_agent_id');
    }

    /**
     * Destination wilaya.
     */
    public function wilaya(): BelongsTo
    {
        return $this->belongsTo(Wilaya::class);
    }

    /**
     * Destination commune.
     */
    public function commune(): BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }

    /**
     * Stopdesk hub if delivery_type is 'stopdesk'.
     */
    public function stopdesk(): BelongsTo
    {
        return $this->belongsTo(DeliveryStopdesk::class, 'delivery_stopdesk_id');
    }

    /**
     * Items in this order.
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Audit timeline events for this order.
     */
    public function timelines(): HasMany
    {
        return $this->hasMany(OrderTimeline::class);
    }

    /**
     * Active shipment record (parcel) dispatched for this order.
     */
    public function shipment(): HasOne
    {
        return $this->hasOne(Shipment::class);
    }
}
