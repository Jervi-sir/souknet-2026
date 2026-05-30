<?php

namespace Database\Seeders;

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
            RoleAndPermissionSeeder::class,
            UserSeeder::class,
            CatalogSeeder::class,
            BusinessSeeder::class,
            BusinessAttachmentSeeder::class,
            ReviewSeeder::class,
            StatSeeder::class,
            PeopleSeeder::class,
            ProductSeeder::class,
            JobPostSeeder::class,
            SavedListSeeder::class,
            DataEnrichmentSeeder::class,
        ]);
    }
}
