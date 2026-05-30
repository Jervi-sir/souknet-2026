<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\JobPost;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class JobPostSeeder extends Seeder
{
    /**
     * Number of job posts to seed.
     */
    public int $count = 15;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();

        if ($businesses->isEmpty()) {
            return;
        }

        for ($i = 0; $i < $this->count; $i++) {
            $business = $businesses->random();
            $title = fake()->jobTitle();

            JobPost::create([
                'business_id' => $business->id,
                'title' => $title,
                'slug' => Str::slug($title).'-'.rand(1000, 9999),
                'location' => fake()->city().', Algeria',
                'salary_min' => fake()->boolean(60) ? rand(300, 1000) * 100 : null,
                'salary_max' => fake()->boolean(60) ? rand(1000, 3000) * 100 : null,
                'salary_currency' => fake()->randomElement(['DZD', 'USD', 'EUR']),
                'type' => fake()->randomElement(['Full-time', 'Part-time', 'Contract', 'Internship']),
                'experience' => fake()->randomElement(['entry', 'mid', 'senior', 'lead']),
                'tags' => [fake()->word(), fake()->word()],
                'description' => fake()->paragraphs(3, true),
                'is_active' => fake()->boolean(90),
            ]);
        }
    }
}
