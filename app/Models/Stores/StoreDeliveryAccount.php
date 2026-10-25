<?php

namespace App\Models\Stores;

use App\Models\Deliveries\DeliveryCompany;
use App\Models\Orders\Shipment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StoreDeliveryAccount extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'store_id',
        'delivery_company_code',
        'account_name',
        'api_key',
        'api_token',
        'credentials_encrypted',
        'is_active',
        'is_valid',
        'is_default',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'is_valid' => 'boolean',
            'is_default' => 'boolean',
        ];
    }

    /**
     * Store that owns this account.
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * Delivery company configured on this account.
     */
    public function deliveryCompany(): BelongsTo
    {
        return $this->belongsTo(DeliveryCompany::class, 'delivery_company_code', 'code');
    }

    /**
     * Per-wilaya delivery pricing overrides for this account.
     */
    public function fees(): HasMany
    {
        return $this->hasMany(StoreDeliveryAccountFee::class);
    }

    /**
     * Shipments dispatched via this account.
     */
    public function shipments(): HasMany
    {
        return $this->hasMany(Shipment::class);
    }
}
