<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\BusinessContact;
use Illuminate\Database\Seeder;

class BusinessContactSeeder extends Seeder
{
    public static int $count = 15;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Business::count() === 0) {
            Business::factory(5)->create();
        }

        BusinessContact::factory(static::$count)->create();
    }
}
