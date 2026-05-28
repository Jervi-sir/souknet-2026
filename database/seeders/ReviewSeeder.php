<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public static int $count = 20;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();
        $users = User::all();

        if ($businesses->isEmpty()) {
            Business::factory(5)->create();
            $businesses = Business::all();
        }

        if ($users->isEmpty()) {
            User::factory(5)->create();
            $users = User::all();
        }

        // Generate reviews with unique user-business combinations
        $inserted = 0;
        $attempts = 0;
        $maxAttempts = static::$count * 10;

        while ($inserted < static::$count && $attempts < $maxAttempts) {
            $attempts++;
            $business = $businesses->random();
            $user = $users->random();

            $exists = Review::where('business_id', $business->id)
                ->where('user_id', $user->id)
                ->exists();

            if (!$exists) {
                Review::create([
                    'business_id' => $business->id,
                    'user_id' => $user->id,
                    'rating' => fake()->numberBetween(1, 5),
                    'body' => fake()->paragraph(),
                    'is_flagged' => fake()->boolean(5),
                ]);
                $inserted++;
            }
        }
    }
}
