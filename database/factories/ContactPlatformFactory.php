<?php

namespace App\Models;

namespace Database\Factories;

use App\Models\ContactPlatform;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactPlatform>
 */
class ContactPlatformFactory extends Factory
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
            'en' => ucfirst($code).' (EN)',
            'fr' => ucfirst($code).' (FR)',
            'ar' => ucfirst($code).' (AR)',
            'url' => fake()->url(),
        ];
    }
}
