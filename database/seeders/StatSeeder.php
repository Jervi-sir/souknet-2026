<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\ClickEvent;
use App\Models\ProfileView;
use App\Models\User;
use Illuminate\Database\Seeder;

class StatSeeder extends Seeder
{
    /**
     * Total number of stat records to seed.
     */
    public int $count = 50;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();
        $users = User::all();

        if ($businesses->isEmpty()) {
            return;
        }

        // Seed profile views
        for ($i = 0; $i < $this->count; $i++) {
            ProfileView::create([
                'business_id' => $businesses->random()->id,
                'user_id' => fake()->boolean(60) && $users->isNotEmpty() ? $users->random()->id : null,
                'ip_address' => fake()->ipv4(),
                'user_agent' => fake()->userAgent(),
                'viewed_at' => fake()->dateTimeBetween('-1 month', 'now'),
            ]);
        }

        // Seed click events
        $clickTypes = ['phone', 'website', 'email', 'twitter', 'linkedin', 'github', 'facebook'];
        for ($i = 0; $i < $this->count; $i++) {
            ClickEvent::create([
                'business_id' => $businesses->random()->id,
                'type' => fake()->randomElement($clickTypes),
                'user_id' => fake()->boolean(60) && $users->isNotEmpty() ? $users->random()->id : null,
                'ip_address' => fake()->ipv4(),
                'clicked_at' => fake()->dateTimeBetween('-1 month', 'now'),
            ]);
        }
    }
}
