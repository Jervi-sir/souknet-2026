<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Role>
 */
class RoleFactory extends Factory
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
            'en' => ucfirst($code) . ' (EN)',
            'fr' => ucfirst($code) . ' (FR)',
            'ar' => ucfirst($code) . ' (AR)',
        ];
    }
}
