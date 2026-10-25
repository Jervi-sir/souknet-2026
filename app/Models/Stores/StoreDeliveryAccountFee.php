<?php

namespace App\Models\Stores;

use App\Models\Catalogs\Wilaya;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreDeliveryAccountFee extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'store_delivery_account_id',
        'wilaya_id',
        'home_delivery_fee',
        'stopdesk_delivery_fee',
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
            'home_delivery_fee' => 'decimal:2',
            'stopdesk_delivery_fee' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Parent store delivery account.
     */
    public function storeDeliveryAccount(): BelongsTo
    {
        return $this->belongsTo(StoreDeliveryAccount::class);
    }

    /**
     * Target wilaya for this fee rule.
     */
    public function wilaya(): BelongsTo
    {
        return $this->belongsTo(Wilaya::class);
    }
}
