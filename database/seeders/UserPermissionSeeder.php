<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserPermissionSeeder extends Seeder
{
    public static int $count = 15;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $permissions = Permission::all();

        if ($users->isEmpty()) {
            User::factory(5)->create();
            $users = User::all();
        }

        if ($permissions->isEmpty()) {
            Permission::factory(5)->create();
            $permissions = Permission::all();
        }

        $pairs = [];
        $limit = min(static::$count, $users->count() * $permissions->count());

        while (count($pairs) < $limit) {
            $user = $users->random();
            $perm = $permissions->random();
            $key = "{$user->id}-{$perm->id}";

            if (!isset($pairs[$key])) {
                $pairs[$key] = [
                    'user_id' => $user->id,
                    'permission_id' => $perm->id,
                ];
            }
        }

        foreach ($pairs as $pair) {
            DB::table('user_permissions')->insertOrIgnore($pair);
        }
    }
}
