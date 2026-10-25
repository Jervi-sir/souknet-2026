<?php

namespace App\Actions\Catalogs;

use App\Models\Catalogs\Wilaya;

class FormatWilaya
{
    /**
     * Format a Wilaya model into an array.
     *
     * @return array<string, mixed>
     */
    public static function format(Wilaya $wilaya): array
    {
        return [
            'id' => (string) $wilaya->id,
            'code' => $wilaya->code,
            'name_ar' => $wilaya->name_ar,
            'name_fr' => $wilaya->name_fr,
            'name_en' => $wilaya->name_en,
            'is_active' => (bool) $wilaya->is_active,
        ];
    }
}
