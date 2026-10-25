<?php

namespace App\Actions\Catalogs;

use App\Models\Catalogs\Commune;

class FormatCommune
{
    /**
     * Format a Commune model into an array.
     *
     * @return array<string, mixed>
     */
    public static function format(Commune $commune): array
    {
        return [
            'id' => (string) $commune->id,
            'wilaya_id' => (string) $commune->wilaya_id,
            'code' => $commune->code,
            'name_ar' => $commune->name_ar,
            'name_fr' => $commune->name_fr,
            'name_en' => $commune->name_en,
            'post_code' => $commune->post_code,
            'is_active' => (bool) $commune->is_active,
            'wilaya' => $commune->relationLoaded('wilaya') && $commune->wilaya
                ? FormatWilaya::format($commune->wilaya)
                : null,
        ];
    }
}
