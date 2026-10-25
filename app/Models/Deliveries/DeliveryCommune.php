<?php

namespace App\Models\Deliveries;

use App\Models\Catalogs\Commune;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeliveryCommune extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'delivery_provider_code',
        'commune_id',
        'provider_commune_code',
        'is_deliverable',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_deliverable' => 'boolean',
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
     * Commune catalog reference.
     */
    public function commune(): BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }
}
