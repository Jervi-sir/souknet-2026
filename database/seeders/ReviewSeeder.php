<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Review;
use App\Models\ReviewReply;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Total number of reviews to seed.
     */
    public int $count = 20;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $businesses = Business::all();

        if ($users->isEmpty() || $businesses->isEmpty()) {
            return;
        }

        $seededCount = 0;
        $attempts = 0;
        $maxAttempts = $this->count * 5; // Avoid infinite loop if counts are small

        while ($seededCount < $this->count && $attempts < $maxAttempts) {
            $attempts++;
            $user = $users->random();
            $business = $businesses->random();

            // Check if review already exists for this pair
            $exists = Review::where('user_id', $user->id)
                ->where('business_id', $business->id)
                ->exists();

            if (! $exists) {
                $review = Review::create([
                    'business_id' => $business->id,
                    'user_id' => $user->id,
                    'rating' => rand(1, 5),
                    'body' => fake()->paragraph(),
                    'is_flagged' => fake()->boolean(5),
                ]);

                $seededCount++;

                // Seed a reply sometimes (e.g. 30% chance)
                if (fake()->boolean(30)) {
                    // Usually the business owner replies, or another user
                    $replyUser = $users->random();
                    ReviewReply::create([
                        'review_id' => $review->id,
                        'user_id' => $replyUser->id,
                        'body' => fake()->paragraph(),
                    ]);
                }
            }
        }
    }
}
