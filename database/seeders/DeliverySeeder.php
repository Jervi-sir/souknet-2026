<?php

namespace Database\Seeders;

use App\Models\Deliveries\DeliveryCompany;
use App\Models\Deliveries\DeliveryProvider;
use Illuminate\Database\Seeder;

class DeliverySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Delivery Providers (API drivers & core national platforms)
        $providers = [
            [
                'code' => DeliveryProvider::CODE_YALIDINE,
                'name' => 'Yalidine Fast Logistics',
                'logo_url' => 'https://assets.souknet.dz/carriers/yalidine.png',
                'api_base_url' => 'https://api.yalidine.app/v1',
                'driver_class' => 'App\\Services\\Delivery\\Drivers\\YalidineDriver',
                'supports_stopdesk' => true,
                'supports_home_delivery' => true,
                'supports_tracking' => true,
                'is_active' => true,
            ],
            [
                'code' => DeliveryProvider::CODE_ZR_EXPRESS,
                'name' => 'ZR Express',
                'logo_url' => 'https://assets.souknet.dz/carriers/zr_express.png',
                'api_base_url' => 'https://api.zrexpress.dz/v1',
                'driver_class' => 'App\\Services\\Delivery\\Drivers\\ZrExpressDriver',
                'supports_stopdesk' => true,
                'supports_home_delivery' => true,
                'supports_tracking' => true,
                'is_active' => true,
            ],
            [
                'code' => DeliveryProvider::CODE_ECOTRACK,
                'name' => 'EcoTrack',
                'logo_url' => 'https://assets.souknet.dz/carriers/ecotrack.png',
                'api_base_url' => 'https://api.ecotrack.dz/v1',
                'driver_class' => 'App\\Services\\Delivery\\Drivers\\EcoTrackDriver',
                'supports_stopdesk' => true,
                'supports_home_delivery' => true,
                'supports_tracking' => true,
                'is_active' => true,
            ],
            [
                'code' => DeliveryProvider::CODE_NOEST,
                'name' => 'Nord & Est Express',
                'logo_url' => 'https://assets.souknet.dz/carriers/noest.png',
                'api_base_url' => 'https://api.noest.dz/v1',
                'driver_class' => 'App\\Services\\Delivery\\Drivers\\NoestDriver',
                'supports_stopdesk' => true,
                'supports_home_delivery' => true,
                'supports_tracking' => true,
                'is_active' => true,
            ],
            [
                'code' => DeliveryProvider::CODE_ECOMDZ,
                'name' => 'EcomDZ Delivery',
                'logo_url' => 'https://assets.souknet.dz/carriers/ecomdz.png',
                'api_base_url' => 'https://api.ecomdz.dz/v1',
                'driver_class' => 'App\\Services\\Delivery\\Drivers\\EcomDzDriver',
                'supports_stopdesk' => true,
                'supports_home_delivery' => true,
                'supports_tracking' => true,
                'is_active' => true,
            ],
            [
                'code' => DeliveryProvider::CODE_SELF,
                'name' => 'Livraison Interne (Flotte propre)',
                'logo_url' => null,
                'api_base_url' => null,
                'driver_class' => 'App\\Services\\Delivery\\Drivers\\SelfDeliveryDriver',
                'supports_stopdesk' => false,
                'supports_home_delivery' => true,
                'supports_tracking' => true,
                'is_active' => true,
            ],
        ];

        foreach ($providers as $provider) {
            DeliveryProvider::updateOrCreate(['code' => $provider['code']], $provider);
        }

        // 2. Delivery Companies (Carriers available for merchant store accounts)
        $companies = [
            ['code' => 'yalidine', 'name' => 'Yalidine Express', 'is_active' => true],
            ['code' => 'zr_express', 'name' => 'ZR Express', 'is_active' => true],
            ['code' => 'ecotrack', 'name' => 'EcoTrack Express', 'is_active' => true],
            ['code' => 'noest', 'name' => 'Nord & Est Express (Noest)', 'is_active' => true],
            ['code' => 'ecomdz', 'name' => 'EcomDZ Logistics', 'is_active' => true],
            ['code' => 'maystro', 'name' => 'Maystro Delivery', 'is_active' => true],
            ['code' => 'echrak', 'name' => 'Echrak Express', 'is_active' => true],
            ['code' => 'procolis', 'name' => 'Procolis Algérie', 'is_active' => true],
            ['code' => 'kazi_tour', 'name' => 'Kazi Tour Express', 'is_active' => true],
            ['code' => 'self_delivery', 'name' => 'Livraison Propre (Livreur interne)', 'is_active' => true],
        ];

        foreach ($companies as $company) {
            DeliveryCompany::updateOrCreate(['code' => $company['code']], $company);
        }
    }
}
