<?php

namespace App\Actions\Stores;

use App\Actions\Catalogs\FormatWilaya;
use App\Models\Stores\StoreDeliveryAccount;
use App\Models\Stores\StoreDeliveryAccountFee;

class FormatDeliveryAccount
{
    /**
     * Format a StoreDeliveryAccount model into an array.
     *
     * @return array<string, mixed>
     */
    public static function format(StoreDeliveryAccount $account): array
    {
        return [
            'id' => (string) $account->id,
            'store_id' => (string) $account->store_id,
            'delivery_company_code' => $account->delivery_company_code,
            'account_name' => $account->account_name,
            'api_key' => $account->api_key,
            'is_active' => (bool) $account->is_active,
            'is_valid' => (bool) $account->is_valid,
            'is_default' => (bool) $account->is_default,
            'created_at' => $account->created_at?->toIso8601String(),
            'company' => $account->relationLoaded('deliveryCompany') && $account->deliveryCompany
                ? [
                    'code' => $account->deliveryCompany->code,
                    'name' => $account->deliveryCompany->name,
                    'is_active' => (bool) $account->deliveryCompany->is_active,
                ]
                : null,
            'fees' => $account->relationLoaded('fees')
                ? $account->fees->map(fn (StoreDeliveryAccountFee $fee) => [
                    'id' => (string) $fee->id,
                    'wilaya_id' => (string) $fee->wilaya_id,
                    'home_delivery_fee' => (float) $fee->home_delivery_fee,
                    'stopdesk_delivery_fee' => (float) $fee->stopdesk_delivery_fee,
                    'is_active' => (bool) $fee->is_active,
                    'wilaya' => $fee->relationLoaded('wilaya') && $fee->wilaya
                        ? FormatWilaya::format($fee->wilaya)
                        : null,
                ])->values()->all()
                : null,
        ];
    }
}
