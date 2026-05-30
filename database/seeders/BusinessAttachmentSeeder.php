<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\BusinessContact;
use App\Models\BusinessPhoto;
use Illuminate\Database\Seeder;

class BusinessAttachmentSeeder extends Seeder
{
    /**
     * Maximum number of photos/contacts per business.
     */
    public int $count = 3;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();

        if ($businesses->isEmpty()) {
            return;
        }

        foreach ($businesses as $business) {
            // Seed photos
            $photoCount = rand(0, $this->count);
            for ($i = 0; $i < $photoCount; $i++) {
                BusinessPhoto::create([
                    'business_id' => $business->id,
                    'path' => 'photos/business_'.$business->id.'_photo_'.$i.'.jpg',
                    'disk' => 'public',
                    'size' => rand(100000, 5000000),
                    'mime_type' => 'image/jpeg',
                    'sort_order' => $i,
                ]);
            }

            // Seed contact messages
            $contactCount = rand(0, $this->count);
            for ($i = 0; $i < $contactCount; $i++) {
                BusinessContact::create([
                    'business_id' => $business->id,
                    'name' => fake()->name(),
                    'email' => fake()->safeEmail(),
                    'message' => fake()->paragraph(),
                    'is_read' => fake()->boolean(40),
                    'ip_address' => fake()->ipv4(),
                ]);
            }
        }
    }
}
