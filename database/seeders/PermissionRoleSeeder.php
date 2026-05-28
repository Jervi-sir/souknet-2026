<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionRoleSeeder extends Seeder
{
    public static int $count = 15;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = Role::all();
        $permissions = Permission::all();

        if ($roles->isEmpty()) {
            Role::factory(3)->create();
            $roles = Role::all();
        }

        if ($permissions->isEmpty()) {
            Permission::factory(5)->create();
            $permissions = Permission::all();
        }

        // Attach permissions to roles uniquely
        $pairs = [];
        $limit = min(static::$count, $roles->count() * $permissions->count());

        while (count($pairs) < $limit) {
            $role = $roles->random();
            $perm = $permissions->random();
            $key = "{$role->id}-{$perm->id}";

            if (!isset($pairs[$key])) {
                $pairs[$key] = [
                    'role_id' => $role->id,
                    'permission_id' => $perm->id,
                ];
            }
        }

        foreach ($pairs as $pair) {
            DB::table('permission_role')->insertOrIgnore($pair);
        }
    }
}
