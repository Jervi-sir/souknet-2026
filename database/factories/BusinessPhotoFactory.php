<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\BusinessPhoto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BusinessPhoto>
 */
class BusinessPhotoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_id' => Business::inRandomOrder()->first()?->id ?? Business::factory(),
            'path' => 'photos/'.fake()->uuid().'.jpg',
            'disk' => 'public',
            'size' => fake()->numberBetween(10240, 1048576),
            'mime_type' => 'image/jpeg',
            'sort_order' => fake()->numberBetween(0, 5),
        ];
    }
}
