<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public static int $count = 5;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $predefined = [
            ['code' => 'restaurants', 'icon' => 'heroicon-o-utensils', 'hex_color' => '#EF4444', 'sort_order' => 1, 'en' => 'Restaurants', 'fr' => 'Restaurants', 'ar' => 'مطاعم'],
            ['code' => 'shopping', 'icon' => 'heroicon-o-shopping-bag', 'hex_color' => '#3B82F6', 'sort_order' => 2, 'en' => 'Shopping', 'fr' => 'Boutiques', 'ar' => 'تسوق'],
            ['code' => 'automotive', 'icon' => 'heroicon-o-truck', 'hex_color' => '#10B981', 'sort_order' => 3, 'en' => 'Automotive', 'fr' => 'Automobile', 'ar' => 'سيارات'],
            ['code' => 'services', 'icon' => 'heroicon-o-wrench', 'hex_color' => '#F59E0B', 'sort_order' => 4, 'en' => 'Services', 'fr' => 'Services', 'ar' => 'خدمات'],
            ['code' => 'health', 'icon' => 'heroicon-o-heart', 'hex_color' => '#EC4899', 'sort_order' => 5, 'en' => 'Health & Medical', 'fr' => 'Santé & Médical', 'ar' => 'صحة وطب'],
        ];

        foreach (array_slice($predefined, 0, static::$count) as $cat) {
            Category::firstOrCreate(['code' => $cat['code']], $cat);
        }

        if (static::$count > count($predefined)) {
            Category::factory(static::$count - count($predefined))->create();
        }
    }
}
