<?php

namespace App\Models\Deliveries;

use App\Models\Catalogs\Commune;
use App\Models\Catalogs\Wilaya;
use App\Models\Orders\Order;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DeliveryStopdesk extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'delivery_provider_code',
        'wilaya_id',
        'commune_id',
        'name',
        'code',
        'address',
        'phone',
        'latitude',
        'longitude',
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
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Delivery provider.
     */
    public function provider(): BelongsTo
    {
        return $this->belongsTo(DeliveryProvider::class, 'delivery_provider_code', 'code');
    }

    /**
     * Wilaya where the stopdesk is situated.
     */
    public function wilaya(): BelongsTo
    {
        return $this->belongsTo(Wilaya::class);
    }

    /**
     * Commune where the stopdesk is situated.
     */
    public function commune(): BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }

    /**
     * Orders directed to this stopdesk for pickup.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
