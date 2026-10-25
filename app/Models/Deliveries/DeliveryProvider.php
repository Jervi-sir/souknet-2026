<?php

namespace App\Models\Deliveries;

use App\Models\Orders\Shipment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DeliveryProvider extends Model
{
    // Known Provider Codes
    public const CODE_YALIDINE = 'yalidine';

    public const CODE_ZR_EXPRESS = 'zr_express';

    public const CODE_ECOTRACK = 'ecotrack';

    public const CODE_NOEST = 'noest';

    public const CODE_ECOMDZ = 'ecomdz';

    public const CODE_SELF = 'self';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'code';

    /**
     * The "type" of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'name',
        'logo_url',
        'api_base_url',
        'driver_class',
        'supports_stopdesk',
        'supports_home_delivery',
        'supports_tracking',
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
            'supports_stopdesk' => 'boolean',
            'supports_home_delivery' => 'boolean',
            'supports_tracking' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Wilaya coverage / mapping for this provider.
     */
    public function deliveryWilayas(): HasMany
    {
        return $this->hasMany(DeliveryWilaya::class, 'delivery_provider_code', 'code');
    }

    /**
     * Commune coverage / mapping for this provider.
     */
    public function deliveryCommunes(): HasMany
    {
        return $this->hasMany(DeliveryCommune::class, 'delivery_provider_code', 'code');
    }

    /**
     * Stopdesk pickup hubs for this provider.
     */
    public function stopdesks(): HasMany
    {
        return $this->hasMany(DeliveryStopdesk::class, 'delivery_provider_code', 'code');
    }

    /**
     * Shipments assigned to this provider.
     */
    public function shipments(): HasMany
    {
        return $this->hasMany(Shipment::class, 'delivery_provider_code', 'code');
    }
}
