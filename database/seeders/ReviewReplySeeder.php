<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\ReviewReply;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewReplySeeder extends Seeder
{
    public static int $count = 10;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reviews = Review::whereDoesntHave('reply')->get();
        $users = User::all();

        if ($reviews->isEmpty()) {
            // Seeding reviews will trigger User and Business creation
            $this->call(ReviewSeeder::class);
            $reviews = Review::whereDoesntHave('reply')->get();
        }

        if ($users->isEmpty()) {
            User::factory(5)->create();
            $users = User::all();
        }

        $limit = min(static::$count, $reviews->count());

        if ($limit > 0) {
            foreach ($reviews->random($limit) as $review) {
                ReviewReply::create([
                    'review_id' => $review->id,
                    'user_id' => $users->random()->id,
                    'body' => fake()->paragraph(),
                ]);
            }
        }
    }
}
