<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\BusinessHour;
use App\Models\Category;
use App\Models\Plan;
use App\Models\Role;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BusinessSeeder extends Seeder
{
    /**
     * Number of businesses to seed.
     */
    public int $count = 15;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fallbacks if parents don't exist
        if (User::count() === 0) {
            $role = Role::first() ?? Role::create(['code' => 'user', 'en' => 'User']);
            User::create([
                'name' => 'Default Owner',
                'email' => 'owner@souknet.com',
                'password' => bcrypt('password'),
                'role_id' => $role->id,
            ]);
        }

        if (Category::count() === 0) {
            Category::create(['code' => 'default', 'en' => 'Default Category']);
        }

        $tags = Tag::all();

        for ($i = 0; $i < $this->count; $i++) {
            $user = User::inRandomOrder()->first();
            $category = Category::inRandomOrder()->first();
            $plan = fake()->boolean(80) ? Plan::inRandomOrder()->first() : null;

            $name = fake()->company();
            $slug = Str::slug($name).'-'.rand(1000, 9999);

            $status = fake()->randomElement(['draft', 'published', 'rejected', 'pending']);
            $rejectionReason = ($status === 'rejected') ? fake()->sentence() : null;

            $business = Business::create([
                'user_id' => $user->id,
                'category_id' => $category->id,
                'plan_id' => $plan?->id,
                'name' => $name,
                'slug' => $slug,
                'tagline' => fake()->sentence(6),
                'description' => fake()->paragraphs(3, true),
                'founded_year' => fake()->numberBetween(1990, 2026),
                'address' => fake()->address(),
                'city' => fake()->city(),
                'country' => 'DZ',
                'lat' => fake()->latitude(35.0, 37.0),
                'lng' => fake()->longitude(2.0, 8.0),
                'phone' => fake()->phoneNumber(),
                'email' => fake()->companyEmail(),
                'website' => fake()->url(),
                'twitter_url' => 'https://twitter.com/'.fake()->userName(),
                'linkedin_url' => 'https://linkedin.com/company/'.fake()->userName(),
                'github_url' => 'https://github.com/'.fake()->userName(),
                'facebook_url' => 'https://facebook.com/'.fake()->userName(),
                'status' => $status,
                'is_featured' => fake()->boolean(20),
                'is_verified' => fake()->boolean(50),
                'is_claimed' => fake()->boolean(30),
                'rejection_reason' => $rejectionReason,
                'plan_expires_at' => $plan ? now()->addMonths(rand(1, 12)) : null,
                'meta_title' => $name.' - Business in Algeria',
                'meta_description' => fake()->sentence(12),
            ]);

            // Seed business hours for 5 days of the week (1 to 5)
            for ($day = 1; $day <= 5; $day++) {
                BusinessHour::create([
                    'business_id' => $business->id,
                    'day_of_week' => $day,
                    'open_time' => '08:00:00',
                    'close_time' => '17:00:00',
                    'is_closed' => false,
                ]);
            }

            // Seed weekend days (6 and 7) as closed
            for ($day = 6; $day <= 7; $day++) {
                BusinessHour::create([
                    'business_id' => $business->id,
                    'day_of_week' => $day,
                    'open_time' => null,
                    'close_time' => null,
                    'is_closed' => true,
                ]);
            }

            // Sync random tags (1 to 3 tags)
            if ($tags->isNotEmpty()) {
                $randomTags = $tags->random(rand(1, min(3, $tags->count())));
                $business->tags()->sync($randomTags->pluck('id'));
            }
        }
    }
}
