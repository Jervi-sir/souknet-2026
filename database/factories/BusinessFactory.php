<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Category;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Business>
 */
class BusinessFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->company();
        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),
            'plan_id' => Plan::inRandomOrder()->first()?->id ?? Plan::factory(),
            'name' => $name,
            'slug' => fake()->unique()->slug(),
            'tagline' => fake()->sentence(6),
            'description' => fake()->paragraphs(3, true),
            'founded_year' => fake()->numberBetween(1900, 2026),
            'address' => fake()->address(),
            'city' => fake()->city(),
            'country' => 'DZ',
            'lat' => fake()->latitude(35.0, 37.0),
            'lng' => fake()->longitude(2.0, 4.0),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->safeEmail(),
            'website' => fake()->url(),
            'twitter_url' => 'https://twitter.com/' . fake()->userName(),
            'linkedin_url' => 'https://linkedin.com/in/' . fake()->userName(),
            'github_url' => 'https://github.com/' . fake()->userName(),
            'facebook_url' => 'https://facebook.com/' . fake()->userName(),
            'status' => fake()->randomElement(['draft', 'pending', 'published', 'rejected']),
            'is_featured' => fake()->boolean(20),
            'is_verified' => fake()->boolean(40),
            'is_claimed' => fake()->boolean(50),
            'rejection_reason' => null,
            'plan_expires_at' => fake()->dateTimeBetween('now', '+1 year'),
            'meta_title' => $name,
            'meta_description' => fake()->sentence(12),
        ];
    }
}
