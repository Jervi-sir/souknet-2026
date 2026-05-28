<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'code',
    'en',
    'fr',
    'ar',
    'stripe_price_id_monthly',
    'stripe_price_id_yearly',
    'price_monthly_cents',
    'price_yearly_cents',
    'max_photos',
    'has_analytics',
    'has_featured',
    'has_verified_badge',
    'is_active',
    'sort_order',
])]
class Plan extends Model
{
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price_monthly_cents' => 'integer',
            'price_yearly_cents' => 'integer',
            'max_photos' => 'integer',
            'has_analytics' => 'boolean',
            'has_featured' => 'boolean',
            'has_verified_badge' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Get the businesses subscribed to this plan.
     */
    public function businesses(): HasMany
    {
        return $this->hasMany(Business::class);
    }
}
