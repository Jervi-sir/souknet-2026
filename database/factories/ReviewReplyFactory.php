<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\ReviewReply;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ReviewReply>
 */
class ReviewReplyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'review_id' => Review::inRandomOrder()->first()?->id ?? Review::factory(),
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'body' => fake()->paragraph(),
        ];
    }
}
