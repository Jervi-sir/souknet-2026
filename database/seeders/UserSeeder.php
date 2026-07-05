<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Number of users to seed.
     */
    public int $count = 20;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // First make sure we have at least one role
        if (Role::count() === 0) {
            $role = Role::create([
                'code' => 'user',
                'en' => 'Regular User',
            ]);
        }

        // We can create a default admin user for convenience
        $adminRole = Role::where('code', 'admin')->first() ?? Role::first();
        $adminUser = User::firstOrCreate([
            'email' => 'admin@souknet.com',
        ], [
            'name' => 'Admin User',
            'password' => Hash::make('password'),
            'password_plaintext' => 'password',
            'role_id' => $adminRole->id,
            'email_verified_at' => now(),
        ]);
        $adminUser->roles()->syncWithoutDetaching([$adminRole->id]);

        for ($i = 0; $i < $this->count; $i++) {
            $role = Role::inRandomOrder()->first();
            $user = User::create([
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'password_plaintext' => 'password',
                'role_id' => $role->id,
                'email_verified_at' => fake()->boolean(80) ? now() : null,
            ]);

            // Populate user_roles pivot
            $user->roles()->syncWithoutDetaching([$role->id]);

            // Also attach custom permissions to user randomly if permissions exist
            $permissions = Permission::all();
            if ($permissions->isNotEmpty()) {
                $randomPermissions = $permissions->random(rand(0, min(3, $permissions->count())));
                $user->permissions()->sync($randomPermissions->pluck('id'));
            }
        }
    }
}
