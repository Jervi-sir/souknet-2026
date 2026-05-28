<?php

namespace Database\Factories;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Plan>
 */
class PlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $code = fake()->unique()->word();
        return [
            'code' => $code,
            'en' => ucfirst($code) . ' Plan (EN)',
            'fr' => 'Plan ' . ucfirst($code) . ' (FR)',
            'ar' => 'خطة ' . ucfirst($code) . ' (AR)',
            'stripe_price_id_monthly' => 'price_' . fake()->slug(1),
            'stripe_price_id_yearly' => 'price_' . fake()->slug(1),
            'price_monthly_cents' => fake()->numberBetween(900, 4900),
            'price_yearly_cents' => fake()->numberBetween(9900, 49900),
            'max_photos' => fake()->numberBetween(3, 20),
            'has_analytics' => fake()->boolean(),
            'has_featured' => fake()->boolean(),
            'has_verified_badge' => fake()->boolean(),
            'is_active' => true,
            'sort_order' => fake()->numberBetween(0, 10),
        ];
    }
}
