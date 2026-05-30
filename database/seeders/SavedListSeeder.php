<?php

namespace Database\Seeders;

use App\Models\JobPost;
use App\Models\ListItem;
use App\Models\People;
use App\Models\Product;
use App\Models\SavedList;
use App\Models\User;
use Illuminate\Database\Seeder;

class SavedListSeeder extends Seeder
{
    /**
     * Number of saved lists to seed.
     */
    public int $count = 10;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            return;
        }

        // Potential listable classes
        $types = [
            People::class => 'people',
            Product::class => 'product',
            JobPost::class => 'job',
        ];

        for ($i = 0; $i < $this->count; $i++) {
            $user = $users->random();
            $typeClass = fake()->randomElement(array_keys($types));
            $typeName = $types[$typeClass];

            $savedList = SavedList::create([
                'user_id' => $user->id,
                'name' => fake()->words(2, true).' List',
                'type' => $typeName,
                'description' => fake()->sentence(),
            ]);

            // Add some items of that type if any exist
            $records = $typeClass::all();
            if ($records->isNotEmpty()) {
                $itemCount = rand(1, min(5, $records->count()));
                $randomRecords = $records->random($itemCount);

                foreach ($randomRecords as $record) {
                    ListItem::firstOrCreate([
                        'saved_list_id' => $savedList->id,
                        'listable_type' => $typeClass,
                        'listable_id' => $record->id,
                    ]);
                }
            }
        }
    }
}
