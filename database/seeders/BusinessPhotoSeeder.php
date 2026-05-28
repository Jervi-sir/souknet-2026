<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\BusinessPhoto;
use Illuminate\Database\Seeder;

class BusinessPhotoSeeder extends Seeder
{
    public static int $count = 20;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Business::count() === 0) {
            Business::factory(5)->create();
        }

        BusinessPhoto::factory(static::$count)->create();
    }
}
