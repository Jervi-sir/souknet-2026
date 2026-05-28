<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\ProfileView;
use Illuminate\Database\Seeder;

class ProfileViewSeeder extends Seeder
{
    public static int $count = 50;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Business::count() === 0) {
            Business::factory(5)->create();
        }

        ProfileView::factory(static::$count)->create();
    }
}
