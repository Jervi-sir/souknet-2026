<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Number of products to seed.
     */
    public int $count = 20;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();
        $categories = Category::all();

        if ($businesses->isEmpty()) {
            return;
        }

        for ($i = 0; $i < $this->count; $i++) {
            $business = $businesses->random();
            $category = $categories->isNotEmpty() ? $categories->random() : null;
            $name = fake()->words(3, true);

            Product::create([
                'business_id' => $business->id,
                'category_id' => $category?->id,
                'name' => $name,
                'slug' => Str::slug($name).'-'.rand(1000, 9999),
                'price_monthly_cents' => fake()->boolean(30) ? rand(500, 5000) * 100 : 0,
                'price_cents' => fake()->boolean(70) ? rand(100, 2000) * 100 : null,
                'specs' => [
                    'weight' => rand(1, 10).'kg',
                    'color' => fake()->colorName(),
                    'dimensions' => rand(10, 100).'x'.rand(10, 100).'x'.rand(10, 100).' cm',
                ],
                'image_color' => fake()->safeHexColor(),
                'type' => fake()->randomElement(['small', 'medium', 'large', 'digital', 'service']),
                'is_active' => fake()->boolean(90),
            ]);
        }
    }
}
