<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public static int $count = 3;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $predefined = [
            ['code' => 'admin', 'en' => 'Administrator', 'fr' => 'Administrateur', 'ar' => 'مدير'],
            ['code' => 'business_owner', 'en' => 'Business Owner', 'fr' => 'Propriétaire d\'entreprise', 'ar' => 'صاحب عمل'],
            ['code' => 'customer', 'en' => 'Customer', 'fr' => 'Client', 'ar' => 'عميل'],
        ];

        foreach (array_slice($predefined, 0, static::$count) as $role) {
            Role::firstOrCreate(['code' => $role['code']], $role);
        }

        if (static::$count > count($predefined)) {
            Role::factory(static::$count - count($predefined))->create();
        }
    }
}
