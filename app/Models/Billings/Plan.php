<?php

namespace App\Models\Billings;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    // Plan codes
    public const CODE_STARTER = 'starter';

    public const CODE_PRO = 'pro';

    public const CODE_SCALE = 'scale';

    public const CODE_ENTERPRISE = 'enterprise';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'name',
        'description',
        'price_monthly',
        'price_yearly',
        'currency',
        'max_stores',
        'max_products',
        'max_orders_per_month',
        'max_team_members',
        'has_call_center',
        'has_delivery_integrations',
        'has_custom_domain',
        'features',
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
            'price_monthly' => 'decimal:2',
            'price_yearly' => 'decimal:2',
            'max_stores' => 'integer',
            'max_products' => 'integer',
            'max_orders_per_month' => 'integer',
            'max_team_members' => 'integer',
            'has_call_center' => 'boolean',
            'has_delivery_integrations' => 'boolean',
            'has_custom_domain' => 'boolean',
            'features' => 'array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Subscriptions under this plan.
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }
}
