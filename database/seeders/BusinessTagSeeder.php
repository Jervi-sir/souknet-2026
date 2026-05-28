<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BusinessTagSeeder extends Seeder
{
    public static int $count = 20;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();
        $tags = Tag::all();

        if ($businesses->isEmpty()) {
            Business::factory(5)->create();
            $businesses = Business::all();
        }

        if ($tags->isEmpty()) {
            Tag::factory(5)->create();
            $tags = Tag::all();
        }

        $pairs = [];
        $limit = min(static::$count, $businesses->count() * $tags->count());

        while (count($pairs) < $limit) {
            $business = $businesses->random();
            $tag = $tags->random();
            $key = "{$business->id}-{$tag->id}";

            if (!isset($pairs[$key])) {
                $pairs[$key] = [
                    'business_id' => $business->id,
                    'tag_id' => $tag->id,
                ];
            }
        }

        foreach ($pairs as $pair) {
            DB::table('business_tag')->insertOrIgnore($pair);
        }
    }
}
