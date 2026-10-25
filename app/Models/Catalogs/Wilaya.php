<?php

namespace App\Models\Catalogs;

use App\Models\Deliveries\DeliveryStopdesk;
use App\Models\Deliveries\DeliveryWilaya;
use App\Models\Orders\Order;
use App\Models\Stores\StoreDeliveryAccountFee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Wilaya extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'name_ar',
        'name_fr',
        'name_en',
        'is_active',
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
        ];
    }

    /**
     * Communes belonging to this wilaya.
     */
    public function communes(): HasMany
    {
        return $this->hasMany(Commune::class);
    }

    /**
     * Delivery stopdesks located in this wilaya.
     */
    public function stopdesks(): HasMany
    {
        return $this->hasMany(DeliveryStopdesk::class);
    }

    /**
     * Delivery wilaya provider mappings.
     */
    public function deliveryWilayas(): HasMany
    {
        return $this->hasMany(DeliveryWilaya::class);
    }

    /**
     * Store carrier account pricing rules for this wilaya.
     */
    public function storeDeliveryAccountFees(): HasMany
    {
        return $this->hasMany(StoreDeliveryAccountFee::class);
    }

    /**
     * Orders destined for this wilaya.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
