<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Category;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Database\Seeder;

class BusinessSeeder extends Seeder
{
    public static int $count = 10;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure dependencies exist
        if (User::count() === 0) {
            User::factory(5)->create();
        }
        if (Category::count() === 0) {
            Category::factory(3)->create();
        }
        if (Plan::count() === 0) {
            Plan::factory(3)->create();
        }

        Business::factory(static::$count)->create();
    }
}
