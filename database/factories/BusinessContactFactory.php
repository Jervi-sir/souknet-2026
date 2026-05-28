<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\BusinessContact;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BusinessContact>
 */
class BusinessContactFactory extends Factory
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
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'message' => fake()->paragraph(),
            'is_read' => fake()->boolean(30),
            'ip_address' => fake()->ipv4(),
        ];
    }
}
