<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Number of custom roles/permissions to generate.
     */
    public int $count = 5;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed core roles
        $coreRoles = [
            'admin' => ['en' => 'Administrator', 'fr' => 'Administrateur', 'ar' => 'مدير'],
            'moderator' => ['en' => 'Moderator', 'fr' => 'Modérateur', 'ar' => 'مشرف'],
            'business_owner' => ['en' => 'Business Owner', 'fr' => 'Propriétaire d\'entreprise', 'ar' => 'صاحب عمل'],
            'store_owner' => ['en' => 'Store Owner', 'fr' => 'Propriétaire de magasin', 'ar' => 'صاحب متجر'],
            'user' => ['en' => 'Regular User', 'fr' => 'Utilisateur régulier', 'ar' => 'مستخدم عادى'],
        ];

        $roles = [];
        foreach ($coreRoles as $code => $translations) {
            $roles[] = Role::firstOrCreate(['code' => $code], [
                'en' => $translations['en'],
                'fr' => $translations['fr'],
                'ar' => $translations['ar'],
            ]);
        }

        // Seed core permissions
        $corePermissions = [
            'manage_users' => ['en' => 'Manage Users', 'fr' => 'Gérer les utilisateurs', 'ar' => 'إدارة المستخدمين'],
            'manage_businesses' => ['en' => 'Manage Businesses', 'fr' => 'Gérer les entreprises', 'ar' => 'إدارة الشركات'],
            'manage_reviews' => ['en' => 'Manage Reviews', 'fr' => 'Gérer les avis', 'ar' => 'إدارة التقييمات'],
            'view_analytics' => ['en' => 'View Analytics', 'fr' => 'Voir les analyses', 'ar' => 'عرض التحليلات'],
        ];

        $permissions = [];
        foreach ($corePermissions as $code => $translations) {
            $permissions[] = Permission::firstOrCreate(['code' => $code], [
                'en' => $translations['en'],
                'fr' => $translations['fr'],
                'ar' => $translations['ar'],
            ]);
        }

        // Create additional random roles and permissions as specified by $count
        for ($i = 0; $i < $this->count; $i++) {
            $roleCode = 'custom_role_'.$i.'_'.fake()->unique()->word();
            $roles[] = Role::create([
                'code' => $roleCode,
                'en' => 'Custom Role '.$i,
                'fr' => 'Rôle personnalisé '.$i,
                'ar' => 'دور مخصص '.$i,
            ]);

            $permissionCode = 'custom_permission_'.$i.'_'.fake()->unique()->word();
            $permissions[] = Permission::create([
                'code' => $permissionCode,
                'en' => 'Custom Permission '.$i,
                'fr' => 'Permission personnalisée '.$i,
                'ar' => 'صلاحية مخصصة '.$i,
            ]);
        }

        // Link roles and permissions randomly
        foreach ($roles as $role) {
            // Assign 1 to 3 random permissions
            $randomPermissions = collect($permissions)->random(min(count($permissions), rand(1, 3)));
            $role->permissions()->syncWithoutDetaching($randomPermissions->pluck('id'));
        }
    }
}
