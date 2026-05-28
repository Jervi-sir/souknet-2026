<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public static int $count = 10;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = \App\Models\Role::where('code', 'business_owner')->first() ?? \App\Models\Role::first() ?? \App\Models\Role::factory()->create();

        $user = User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'role_id' => $role->id,
            'name' => 'Test User',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);

        if ($user->wasRecentlyCreated) {
            $user->permissions()->sync($role->permissions->pluck('id'));
        }

        $createCount = max(0, static::$count - 1);
        if ($createCount > 0) {
            User::factory($createCount)->create();
        }
    }
}
