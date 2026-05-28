<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public static int $count = 10;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $predefined = [
            ['code' => 'wifi', 'en' => 'Free Wi-Fi', 'fr' => 'Wi-Fi Gratuit', 'ar' => 'واي فاي مجاني'],
            ['code' => 'parking', 'en' => 'Parking Available', 'fr' => 'Parking Disponible', 'ar' => 'موقف سيارات متاح'],
            ['code' => 'delivery', 'en' => 'Delivery', 'fr' => 'Livraison', 'ar' => 'توصيل'],
            ['code' => 'cards', 'en' => 'Accepts Cards', 'fr' => 'Accepte les Cartes', 'ar' => 'يقبل بطاقات الدفع'],
            ['code' => 'outdoor', 'en' => 'Outdoor Seating', 'fr' => 'Terrasse', 'ar' => 'جلسات خارجية'],
        ];

        foreach (array_slice($predefined, 0, static::$count) as $tag) {
            Tag::firstOrCreate(['code' => $tag['code']], $tag);
        }

        if (static::$count > count($predefined)) {
            Tag::factory(static::$count - count($predefined))->create();
        }
    }
}
