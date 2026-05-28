<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
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
            'icon' => 'heroicon-o-' . $code,
            'hex_color' => fake()->hexColor(),
            'sort_order' => fake()->numberBetween(0, 100),
            'en' => ucfirst($code) . ' (EN)',
            'fr' => ucfirst($code) . ' (FR)',
            'ar' => ucfirst($code) . ' (AR)',
        ];
    }
}
