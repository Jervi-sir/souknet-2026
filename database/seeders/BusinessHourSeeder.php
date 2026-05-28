<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\BusinessHour;
use Illuminate\Database\Seeder;

class BusinessHourSeeder extends Seeder
{
    public static int $count = 30;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();

        if ($businesses->isEmpty()) {
            Business::factory(5)->create();
            $businesses = Business::all();
        }

        $inserted = 0;
        $attempts = 0;
        $maxAttempts = static::$count * 10;

        while ($inserted < static::$count && $attempts < $maxAttempts) {
            $attempts++;
            $business = $businesses->random();
            $dayOfWeek = fake()->numberBetween(1, 7);

            // Check if day already exists for this business
            $exists = BusinessHour::where('business_id', $business->id)
                ->where('day_of_week', $dayOfWeek)
                ->exists();

            if (!$exists) {
                BusinessHour::create([
                    'business_id' => $business->id,
                    'day_of_week' => $dayOfWeek,
                    'open_time' => '09:00:00',
                    'close_time' => '17:00:00',
                    'is_closed' => fake()->boolean(15),
                ]);
                $inserted++;
            }
        }
    }
}
