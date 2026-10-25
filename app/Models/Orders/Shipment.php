<?php

namespace App\Models\Orders;

use App\Models\Deliveries\DeliveryProvider;
use App\Models\Stores\StoreDeliveryAccount;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shipment extends Model
{
    // Shipment Statuses
    public const STATUS_CREATED = 'created';

    public const STATUS_PICKED_UP = 'picked_up';

    public const STATUS_IN_TRANSIT = 'in_transit';

    public const STATUS_AT_HUB = 'at_hub';

    public const STATUS_OUT_FOR_DELIVERY = 'out_for_delivery';

    public const STATUS_DELIVERED = 'delivered';

    public const STATUS_RETURNED = 'returned';

    public const STATUS_LOST = 'lost';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'order_id',
        'store_delivery_account_id',
        'delivery_provider_code',
        'tracking_number',
        'provider_parcel_id',
        'barcode',
        'label_url',
        'cod_amount',
        'shipping_cost',
        'status',
        'current_location',
        'last_tracking_event',
        'shipped_at',
        'delivered_at',
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
            'cod_amount' => 'decimal:2',
            'shipping_cost' => 'decimal:2',
            'shipped_at' => 'datetime',
            'delivered_at' => 'datetime',
            'returned_at' => 'datetime',
        ];
    }

    /**
     * Order this parcel is shipping.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Merchant's carrier delivery account used to ship.
     */
    public function storeDeliveryAccount(): BelongsTo
    {
        return $this->belongsTo(StoreDeliveryAccount::class);
    }

    /**
     * Delivery provider/carrier.
     */
    public function deliveryProvider(): BelongsTo
    {
        return $this->belongsTo(DeliveryProvider::class, 'delivery_provider_code', 'code');
    }
}
