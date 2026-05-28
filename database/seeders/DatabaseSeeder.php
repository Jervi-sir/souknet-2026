<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SettingSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            PermissionRoleSeeder::class,
            UserSeeder::class,
            UserPermissionSeeder::class,
            CategorySeeder::class,
            PlanSeeder::class,
            TagSeeder::class,
            ContactPlatformSeeder::class,
            BusinessSeeder::class,
            BusinessHourSeeder::class,
            BusinessTagSeeder::class,
            BusinessPhotoSeeder::class,
            BusinessContactSeeder::class,
            ReviewSeeder::class,
            ReviewReplySeeder::class,
            ProfileViewSeeder::class,
            ClickEventSeeder::class,
        ]);
    }
}
