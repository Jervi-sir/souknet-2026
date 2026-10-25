<?php

namespace App\Models\Catalogs;

use App\Models\Deliveries\DeliveryCommune;
use App\Models\Deliveries\DeliveryStopdesk;
use App\Models\Orders\Order;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Commune extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'wilaya_id',
        'code',
        'name_ar',
        'name_fr',
        'name_en',
        'post_code',
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
     * Wilaya this commune belongs to.
     */
    public function wilaya(): BelongsTo
    {
        return $this->belongsTo(Wilaya::class);
    }

    /**
     * Delivery stopdesks located in this commune.
     */
    public function stopdesks(): HasMany
    {
        return $this->hasMany(DeliveryStopdesk::class);
    }

    /**
     * Delivery commune provider mappings.
     */
    public function deliveryCommunes(): HasMany
    {
        return $this->hasMany(DeliveryCommune::class);
    }

    /**
     * Orders placed in this commune.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
