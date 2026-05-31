<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\ClickEvent;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ClickEvent>
 */
class ClickEventFactory extends Factory
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
            'type' => fake()->randomElement(['website', 'phone', 'email', 'social_twitter', 'social_facebook']),
            'user_id' => User::inRandomOrder()->first()?->id,
            'ip_address' => fake()->ipv4(),
            'clicked_at' => fake()->dateTimeThisYear(),
        ];
    }
}
