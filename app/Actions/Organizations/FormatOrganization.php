<?php

namespace App\Actions\Organizations;

use App\Actions\Catalogs\FormatCommune;
use App\Actions\Catalogs\FormatWilaya;
use App\Models\Organizations\Organization;

class FormatOrganization
{
    /**
     * Format an Organization model into an array.
     *
     * @return array<string, mixed>
     */
    public static function format(Organization $organization): array
    {
        return [
            'id' => (string) $organization->id,
            'owner_id' => (string) $organization->owner_id,
            'name' => $organization->name,
            'business_type_code' => $organization->business_type_code,
            'tax_number' => $organization->tax_number,
            'legal_name' => $organization->legal_name,
            'email' => $organization->email,
            'phone' => $organization->phone,
            'wilaya_id' => $organization->wilaya_id ? (string) $organization->wilaya_id : null,
            'commune_id' => $organization->commune_id ? (string) $organization->commune_id : null,
            'address' => $organization->address,
            'logo_url' => $organization->logo_url,
            'status' => $organization->status,
            'created_at' => $organization->created_at?->toIso8601String(),
            'wilaya' => $organization->relationLoaded('wilaya') && $organization->wilaya
                ? FormatWilaya::format($organization->wilaya)
                : null,
            'commune' => $organization->relationLoaded('commune') && $organization->commune
                ? FormatCommune::format($organization->commune)
                : null,
        ];
    }
}
