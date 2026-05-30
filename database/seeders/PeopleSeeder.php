<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\People;
use Illuminate\Database\Seeder;

class PeopleSeeder extends Seeder
{
    /**
     * Number of people to seed.
     */
    public int $count = 15;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();

        for ($i = 0; $i < $this->count; $i++) {
            $business = fake()->boolean(80) && $businesses->isNotEmpty() ? $businesses->random() : null;

            People::create([
                'business_id' => $business?->id,
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'title' => fake()->jobTitle(),
                'email' => fake()->unique()->safeEmail(),
                'phone' => fake()->phoneNumber(),
                'location' => fake()->city().', Algeria',
                'linkedin_url' => 'https://linkedin.com/in/'.fake()->userName(),
                'github_url' => 'https://github.com/'.fake()->userName(),
                'is_verified' => fake()->boolean(40),
            ]);
        }
    }
}
