<?php

namespace Database\Seeders;

use App\Models\Billings\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'code' => Plan::CODE_STARTER,
                'name' => 'Starter',
                'description' => 'Parfait pour les débutants et vendeurs individuels lançant leur première boutique COD.',
                'price_monthly' => 3500.00,
                'price_yearly' => 35000.00,
                'currency' => 'DZD',
                'max_stores' => 1,
                'max_products' => 30,
                'max_orders_per_month' => 300,
                'max_team_members' => 2,
                'has_call_center' => false,
                'has_delivery_integrations' => true,
                'has_custom_domain' => false,
                'features' => [
                    'Boutique e-commerce rapide',
                    'Page produit optimisée conversion COD',
                    'Intégration Yalidine & ZR Express',
                    'Gestion des commandes basique',
                    'Support par email & WhatsApp',
                ],
                'is_active' => true,
            ],
            [
                'code' => Plan::CODE_PRO,
                'name' => 'Pro Merchant',
                'description' => 'Idéal pour les marques en croissance avec call-center et gros volumes d\'expéditions.',
                'price_monthly' => 7500.00,
                'price_yearly' => 75000.00,
                'currency' => 'DZD',
                'max_stores' => 3,
                'max_products' => 200,
                'max_orders_per_month' => 2000,
                'max_team_members' => 6,
                'has_call_center' => true,
                'has_delivery_integrations' => true,
                'has_custom_domain' => true,
                'features' => [
                    'Jusqu\'à 3 boutiques distinctes',
                    'Module Call Center & confirmation d\'appels',
                    'Domaine personnalisé (.com, .dz)',
                    'Multi-transporteurs automatiques',
                    'Statistiques et taux de confirmation en direct',
                    'Exportation & impression bordereaux en masse',
                ],
                'is_active' => true,
            ],
            [
                'code' => Plan::CODE_SCALE,
                'name' => 'Scale & Agency',
                'description' => 'Pour les grossistes, importateurs et agences gérant de gros catalogues et plusieurs équipes.',
                'price_monthly' => 14000.00,
                'price_yearly' => 140000.00,
                'currency' => 'DZD',
                'max_stores' => 10,
                'max_products' => 1000,
                'max_orders_per_month' => 10000,
                'max_team_members' => 20,
                'has_call_center' => true,
                'has_delivery_integrations' => true,
                'has_custom_domain' => true,
                'features' => [
                    'Jusqu\'à 10 boutiques & landing pages',
                    'Call Center avancé avec attribution intelligente',
                    'Suivi des livreurs & retours automatisé',
                    'Webhooks et API Rest complète',
                    'Gestionnaire de compte dédié 7j/7',
                ],
                'is_active' => true,
            ],
            [
                'code' => Plan::CODE_ENTERPRISE,
                'name' => 'Enterprise Custom',
                'description' => 'Infrastructure sur mesure, volume illimité et intégration ERP dédiée.',
                'price_monthly' => 30000.00,
                'price_yearly' => 300000.00,
                'currency' => 'DZD',
                'max_stores' => 50,
                'max_products' => 10000,
                'max_orders_per_month' => 50000,
                'max_team_members' => 100,
                'has_call_center' => true,
                'has_delivery_integrations' => true,
                'has_custom_domain' => true,
                'features' => [
                    'Boutiques et commandes illimitées',
                    'Intégration ERP sur mesure (Odoo, Sage)',
                    'Serveur dédié & SLA 99.9%',
                    'Support prioritaire VIP',
                ],
                'is_active' => true,
            ],
        ];

        foreach ($plans as $plan) {
            Plan::updateOrCreate(['code' => $plan['code']], $plan);
        }
    }
}
