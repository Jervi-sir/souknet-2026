<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
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
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'rating' => fake()->numberBetween(1, 5),
            'body' => fake()->paragraph(),
            'is_flagged' => fake()->boolean(5),
        ];
    }
}
