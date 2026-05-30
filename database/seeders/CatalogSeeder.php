<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\ContactPlatform;
use App\Models\Plan;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    /**
     * Number of items to generate for each catalog type.
     */
    public int $count = 10;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Categories
        $coreCategories = [
            'restaurants' => ['icon' => 'utensils', 'hex' => '#EF4444', 'en' => 'Restaurants', 'fr' => 'Restaurants', 'ar' => 'مطاعم'],
            'hotels' => ['icon' => 'hotel', 'hex' => '#3B82F6', 'en' => 'Hotels', 'fr' => 'Hôtels', 'ar' => 'فنادق'],
            'automotive' => ['icon' => 'car', 'hex' => '#10B981', 'en' => 'Automotive', 'fr' => 'Automobile', 'ar' => 'سيارات'],
            'shopping' => ['icon' => 'shopping-bag', 'hex' => '#F59E0B', 'en' => 'Shopping', 'fr' => 'Shopping', 'ar' => 'تسوق'],
            'health' => ['icon' => 'heartbeat', 'hex' => '#EC4899', 'en' => 'Health & Medical', 'fr' => 'Santé & Médical', 'ar' => 'صحة وطب'],
        ];

        foreach ($coreCategories as $code => $data) {
            Category::firstOrCreate(['code' => $code], [
                'icon' => $data['icon'],
                'hex_color' => $data['hex'],
                'sort_order' => rand(1, 100),
                'en' => $data['en'],
                'fr' => $data['fr'],
                'ar' => $data['ar'],
            ]);
        }

        // Additional random categories up to $count
        $existingCatCount = Category::count();
        if ($existingCatCount < $this->count) {
            for ($i = $existingCatCount; $i < $this->count; $i++) {
                $code = 'category_'.$i.'_'.fake()->unique()->word();
                Category::create([
                    'code' => $code,
                    'icon' => fake()->randomElement(['star', 'home', 'cog', 'user', 'laptop']),
                    'hex_color' => fake()->safeHexColor(),
                    'sort_order' => $i,
                    'en' => 'Category '.$i,
                    'fr' => 'Catégorie '.$i,
                    'ar' => 'تصنيف '.$i,
                ]);
            }
        }

        // 2. Seed Plans
        $corePlans = [
            'free' => ['en' => 'Free Plan', 'fr' => 'Offre Gratuite', 'ar' => 'خطة مجانية', 'monthly' => 0, 'yearly' => 0, 'photos' => 3, 'analytics' => false, 'featured' => false, 'verified' => false],
            'premium' => ['en' => 'Premium Plan', 'fr' => 'Offre Premium', 'ar' => 'خطة مميزة', 'monthly' => 1900, 'yearly' => 19000, 'photos' => 10, 'analytics' => true, 'featured' => true, 'verified' => true],
        ];

        foreach ($corePlans as $code => $data) {
            Plan::firstOrCreate(['code' => $code], [
                'en' => $data['en'],
                'fr' => $data['fr'],
                'ar' => $data['ar'],
                'stripe_price_id_monthly' => 'price_monthly_'.$code,
                'stripe_price_id_yearly' => 'price_yearly_'.$code,
                'price_monthly_cents' => $data['monthly'],
                'price_yearly_cents' => $data['yearly'],
                'max_photos' => $data['photos'],
                'has_analytics' => $data['analytics'],
                'has_featured' => $data['featured'],
                'has_verified_badge' => $data['verified'],
                'is_active' => true,
                'sort_order' => rand(1, 10),
            ]);
        }

        // 3. Seed Tags
        $coreTags = ['Food', 'Free Wifi', 'Parking', 'Delivered', 'Cash Only', 'Card Accepted', 'Open Late'];
        foreach ($coreTags as $tagName) {
            Tag::firstOrCreate(['code' => strtolower($tagName)], [
                'en' => $tagName,
                'fr' => $tagName,
                'ar' => $tagName,
            ]);
        }

        $existingTagCount = Tag::count();
        if ($existingTagCount < $this->count) {
            for ($i = $existingTagCount; $i < $this->count; $i++) {
                $code = 'tag_'.$i.'_'.fake()->unique()->word();
                Tag::create([
                    'code' => $code,
                    'en' => 'Tag '.$i,
                    'fr' => 'Tag '.$i,
                    'ar' => 'وسم '.$i,
                ]);
            }
        }

        // 4. Seed Contact Platforms
        $platforms = [
            'whatsapp' => ['name' => 'WhatsApp', 'url' => 'https://wa.me/'],
            'viber' => ['name' => 'Viber', 'url' => 'viber://chat?number='],
            'telegram' => ['name' => 'Telegram', 'url' => 'https://t.me/'],
        ];

        foreach ($platforms as $code => $data) {
            ContactPlatform::firstOrCreate(['code' => $code], [
                'en' => $data['name'],
                'fr' => $data['name'],
                'ar' => $data['name'],
                'url' => $data['url'],
            ]);
        }
    }
}
