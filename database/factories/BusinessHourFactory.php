<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\BusinessHour;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BusinessHour>
 */
class BusinessHourFactory extends Factory
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
            'day_of_week' => fake()->numberBetween(1, 7),
            'open_time' => '09:00:00',
            'close_time' => '17:00:00',
            'is_closed' => fake()->boolean(15),
        ];
    }
}
