<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public static int $count = 8;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $predefined = [
            ['code' => 'manage_settings', 'en' => 'Manage Settings', 'fr' => 'Gérer les paramètres', 'ar' => 'إدارة الإعدادات'],
            ['code' => 'manage_roles', 'en' => 'Manage Roles', 'fr' => 'Gérer les rôles', 'ar' => 'إدارة الأدوار'],
            ['code' => 'manage_users', 'en' => 'Manage Users', 'fr' => 'Gérer les utilisateurs', 'ar' => 'إدارة المستخدمين'],
            ['code' => 'create_business', 'en' => 'Create Business', 'fr' => 'Créer une entreprise', 'ar' => 'إنشاء عمل'],
            ['code' => 'edit_business', 'en' => 'Edit Business', 'fr' => 'Modifier une entreprise', 'ar' => 'تعديل عمل'],
            ['code' => 'delete_business', 'en' => 'Delete Business', 'fr' => 'Supprimer une entreprise', 'ar' => 'حذف عمل'],
            ['code' => 'create_review', 'en' => 'Create Review', 'fr' => 'Créer un avis', 'ar' => 'إنشاء تقييم'],
            ['code' => 'manage_reviews', 'en' => 'Manage Reviews', 'fr' => 'Gérer les avis', 'ar' => 'إدارة التقييمات'],
        ];

        foreach (array_slice($predefined, 0, static::$count) as $perm) {
            Permission::firstOrCreate(['code' => $perm['code']], $perm);
        }

        if (static::$count > count($predefined)) {
            Permission::factory(static::$count - count($predefined))->create();
        }
    }
}
