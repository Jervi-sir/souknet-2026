<?php

namespace App\Actions\Deliveries;

use App\Actions\Catalogs\FormatCommune;
use App\Actions\Catalogs\FormatWilaya;
use App\Models\Deliveries\DeliveryStopdesk;

class FormatDeliveryStopdesk
{
    /**
     * Format a DeliveryStopdesk model into an array.
     *
     * @return array<string, mixed>
     */
    public static function format(DeliveryStopdesk $stopdesk): array
    {
        return [
            'id' => (string) $stopdesk->id,
            'delivery_provider_code' => $stopdesk->delivery_provider_code,
            'wilaya_id' => (string) $stopdesk->wilaya_id,
            'commune_id' => $stopdesk->commune_id ? (string) $stopdesk->commune_id : null,
            'name' => $stopdesk->name,
            'code' => $stopdesk->code,
            'address' => $stopdesk->address,
            'phone' => $stopdesk->phone,
            'latitude' => $stopdesk->latitude !== null ? (float) $stopdesk->latitude : null,
            'longitude' => $stopdesk->longitude !== null ? (float) $stopdesk->longitude : null,
            'is_active' => (bool) $stopdesk->is_active,
            'wilaya' => $stopdesk->relationLoaded('wilaya') && $stopdesk->wilaya
                ? FormatWilaya::format($stopdesk->wilaya)
                : null,
            'commune' => $stopdesk->relationLoaded('commune') && $stopdesk->commune
                ? FormatCommune::format($stopdesk->commune)
                : null,
        ];
    }
}
