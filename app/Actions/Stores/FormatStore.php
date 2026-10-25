<?php

namespace App\Actions\Stores;

use App\Actions\Organizations\FormatOrganization;
use App\Models\Stores\Store;

class FormatStore
{
    /**
     * Format a Store model into an array.
     *
     * @return array<string, mixed>
     */
    public static function format(Store $store): array
    {
        return [
            'id' => (string) $store->id,
            'organization_id' => (string) $store->organization_id,
            'name' => $store->name,
            'slug' => $store->slug,
            'custom_domain' => $store->custom_domain,
            'currency' => $store->currency,
            'email' => $store->email,
            'phone' => $store->phone,
            'whatsapp_number' => $store->whatsapp_number,
            'logo_url' => $store->logo_url,
            'favicon_url' => $store->favicon_url,
            'description' => $store->description,
            'default_locale' => $store->default_locale,
            'theme_settings' => $store->theme_settings,
            'checkout_settings' => $store->checkout_settings,
            'pixels_config' => $store->pixels_config,
            'status' => $store->status,
            'created_at' => $store->created_at?->toIso8601String(),
            'organization' => $store->relationLoaded('organization') && $store->organization
                ? FormatOrganization::format($store->organization)
                : null,
        ];
    }
}
