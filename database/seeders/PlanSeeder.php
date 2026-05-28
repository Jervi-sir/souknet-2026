<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    public static int $count = 3;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $predefined = [
            [
                'code' => 'free',
                'en' => 'Free',
                'fr' => 'Gratuit',
                'ar' => 'مجاني',
                'price_monthly_cents' => 0,
                'price_yearly_cents' => 0,
                'max_photos' => 3,
                'has_analytics' => false,
                'has_featured' => false,
                'has_verified_badge' => false,
                'sort_order' => 1,
            ],
            [
                'code' => 'premium',
                'en' => 'Premium',
                'fr' => 'Premium',
                'ar' => 'ممتاز',
                'price_monthly_cents' => 1900,
                'price_yearly_cents' => 19000,
                'max_photos' => 10,
                'has_analytics' => true,
                'has_featured' => false,
                'has_verified_badge' => true,
                'sort_order' => 2,
            ],
            [
                'code' => 'enterprise',
                'en' => 'Enterprise',
                'fr' => 'Entreprise',
                'ar' => 'مؤسسات',
                'price_monthly_cents' => 4900,
                'price_yearly_cents' => 49000,
                'max_photos' => 30,
                'has_analytics' => true,
                'has_featured' => true,
                'has_verified_badge' => true,
                'sort_order' => 3,
            ]
        ];

        foreach (array_slice($predefined, 0, static::$count) as $plan) {
            Plan::firstOrCreate(['code' => $plan['code']], $plan);
        }

        if (static::$count > count($predefined)) {
            Plan::factory(static::$count - count($predefined))->create();
        }
    }
}
