<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\ProfileView;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProfileView>
 */
class ProfileViewFactory extends Factory
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
            'user_id' => User::inRandomOrder()->first()?->id,
            'ip_address' => fake()->ipv4(),
            'user_agent' => fake()->userAgent(),
            'viewed_at' => fake()->dateTimeThisYear(),
        ];
    }
}
