<?php

namespace Database\Seeders;

use App\Models\ContactPlatform;
use Illuminate\Database\Seeder;

class ContactPlatformSeeder extends Seeder
{
    public static int $count = 5;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $predefined = [
            ['code' => 'whatsapp', 'en' => 'WhatsApp', 'fr' => 'WhatsApp', 'ar' => 'واتساب', 'url' => 'https://wa.me/'],
            ['code' => 'messenger', 'en' => 'Messenger', 'fr' => 'Messenger', 'ar' => 'ماسينجر', 'url' => 'https://m.me/'],
            ['code' => 'viber', 'en' => 'Viber', 'fr' => 'Viber', 'ar' => 'فايبر', 'url' => 'viber://chat?number='],
            ['code' => 'telegram', 'en' => 'Telegram', 'fr' => 'Telegram', 'ar' => 'تيليجرام', 'url' => 'https://t.me/'],
            ['code' => 'instagram', 'en' => 'Instagram', 'fr' => 'Instagram', 'ar' => 'إنستغرام', 'url' => 'https://instagram.com/'],
        ];

        foreach (array_slice($predefined, 0, static::$count) as $platform) {
            ContactPlatform::firstOrCreate(['code' => $platform['code']], $platform);
        }

        if (static::$count > count($predefined)) {
            ContactPlatform::factory(static::$count - count($predefined))->create();
        }
    }
}
