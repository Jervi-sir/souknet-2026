<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Number of records to seed.
     */
    public int $count = 10;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < $this->count; $i++) {
            Setting::create([
                'key' => 'setting_'.$i.'_'.fake()->unique()->word(),
                'value' => fake()->sentence(),
            ]);
        }
    }
}
