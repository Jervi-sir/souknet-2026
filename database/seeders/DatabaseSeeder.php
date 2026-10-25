<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            WilayaCommuneSeeder::class,
            DeliverySeeder::class,
            PlanSeeder::class,
            ProductSeeder::class,
        ]);

        User::firstOrCreate(
            ['email' => 'admin@souknet.dz'],
            [
                'name' => 'Souknet Admin',
                'username' => 'admin',
                'role' => User::ROLE_ADMIN,
                'status' => User::STATUS_ACTIVE,
                'password' => bcrypt('password'),
            ]
        );
    }
}
