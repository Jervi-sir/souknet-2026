<?php

namespace Database\Seeders;

use App\Models\Products\Category;
use App\Models\Products\GlobalCategory;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Global Category Taxonomy (Master classification)
        $globalCategories = [
            [
                'code' => 'electronics',
                'name' => 'Électronique & High-Tech',
                'icon' => 'smartphone',
                'children' => [
                    ['code' => 'smartphones-tablets', 'name' => 'Smartphones & Tablettes', 'icon' => 'smartphone'],
                    ['code' => 'audio-sound', 'name' => 'Écouteurs & Audio', 'icon' => 'headphones'],
                    ['code' => 'smartwatches', 'name' => 'Montres connectées & Bracelets', 'icon' => 'watch'],
                    ['code' => 'chargers-cables', 'name' => 'Chargeurs & Câbles', 'icon' => 'zap'],
                    ['code' => 'car-accessories', 'name' => 'Accessoires Auto & High-tech', 'icon' => 'car'],
                ],
            ],
            [
                'code' => 'fashion',
                'name' => 'Mode & Vêtements',
                'icon' => 'shirt',
                'children' => [
                    ['code' => 'men-fashion', 'name' => 'Mode Homme', 'icon' => 'user'],
                    ['code' => 'women-fashion', 'name' => 'Mode Femme', 'icon' => 'user-check'],
                    ['code' => 'shoes', 'name' => 'Chaussures & Baskets', 'icon' => 'footprints'],
                    ['code' => 'bags-luggage', 'name' => 'Sacs & Maroquinerie', 'icon' => 'briefcase'],
                ],
            ],
            [
                'code' => 'beauty-care',
                'name' => 'Beauté & Soins',
                'icon' => 'sparkles',
                'children' => [
                    ['code' => 'skincare', 'name' => 'Soins du Visage & Corps', 'icon' => 'heart'],
                    ['code' => 'haircare', 'name' => 'Soins des Cheveux & Lisseurs', 'icon' => 'scissors'],
                    ['code' => 'perfumes', 'name' => 'Parfums & Senteurs', 'icon' => 'droplet'],
                    ['code' => 'cosmetics', 'name' => 'Maquillage & Accessoires', 'icon' => 'eye'],
                ],
            ],
            [
                'code' => 'home-kitchen',
                'name' => 'Maison & Cuisine',
                'icon' => 'home',
                'children' => [
                    ['code' => 'kitchen-tools', 'name' => 'Ustensiles & Robots de Cuisine', 'icon' => 'utensils'],
                    ['code' => 'cleaning-organization', 'name' => 'Rangement & Nettoyage', 'icon' => 'archive'],
                    ['code' => 'home-decor', 'name' => 'Décoration & Éclairage', 'icon' => 'lamp'],
                    ['code' => 'bedding', 'name' => 'Literie & Linge de Maison', 'icon' => 'bed'],
                ],
            ],
            [
                'code' => 'sports-fitness',
                'name' => 'Sports & Fitness',
                'icon' => 'dumbbell',
                'children' => [
                    ['code' => 'fitness-gear', 'name' => 'Équipements & Musculation', 'icon' => 'activity'],
                    ['code' => 'sportswear', 'name' => 'Tenues de Sport', 'icon' => 'shield'],
                ],
            ],
            [
                'code' => 'baby-kids',
                'name' => 'Bébé & Enfants',
                'icon' => 'smile',
                'children' => [
                    ['code' => 'toys-games', 'name' => 'Jeux & Jouets Éducatifs', 'icon' => 'gift'],
                    ['code' => 'baby-care', 'name' => 'Puériculture & Éveil', 'icon' => 'heart'],
                ],
            ],
        ];

        foreach ($globalCategories as $cat) {
            $parent = GlobalCategory::updateOrCreate(
                ['code' => $cat['code']],
                [
                    'name' => $cat['name'],
                    'icon' => $cat['icon'],
                    'is_active' => true,
                    'parent_id' => null,
                ]
            );

            if (! empty($cat['children'])) {
                foreach ($cat['children'] as $child) {
                    GlobalCategory::updateOrCreate(
                        ['code' => $child['code']],
                        [
                            'parent_id' => $parent->id,
                            'name' => $child['name'],
                            'icon' => $child['icon'],
                            'is_active' => true,
                        ]
                    );
                }
            }
        }

        // 2. Seed Default Store Categories Template
        $storeCategories = [
            ['code' => 'best-sellers', 'name' => 'Meilleures Ventes', 'sort_order' => 1],
            ['code' => 'nouveautes', 'name' => 'Nouveautés', 'sort_order' => 2],
            ['code' => 'promotions', 'name' => 'Promotions & Packs', 'sort_order' => 3],
            ['code' => 'electronique', 'name' => 'Électronique & Accessoires', 'sort_order' => 4],
            ['code' => 'maison', 'name' => 'Maison & Cuisine', 'sort_order' => 5],
            ['code' => 'beaute-sante', 'name' => 'Beauté & Bien-être', 'sort_order' => 6],
            ['code' => 'mode-accessoires', 'name' => 'Mode & Accessoires', 'sort_order' => 7],
        ];

        foreach ($storeCategories as $category) {
            Category::updateOrCreate(
                ['code' => $category['code']],
                [
                    'name' => $category['name'],
                    'sort_order' => $category['sort_order'],
                    'is_active' => true,
                    'parent_id' => null,
                ]
            );
        }
    }
}
