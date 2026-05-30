<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\DataEnrichment;
use App\Models\DataEnrichmentItem;
use App\Models\People;
use App\Models\User;
use Illuminate\Database\Seeder;

class DataEnrichmentSeeder extends Seeder
{
    /**
     * Number of data enrichment tasks to seed.
     */
    public int $count = 10;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $businesses = Business::all();
        $peoples = People::all();

        if ($users->isEmpty()) {
            return;
        }

        for ($i = 0; $i < $this->count; $i++) {
            $user = $users->random();
            $status = fake()->randomElement(['pending', 'processing', 'completed', 'failed']);

            $enrichment = DataEnrichment::create([
                'user_id' => $user->id,
                'type' => fake()->randomElement(['business_search', 'people_search', 'csv_upload']),
                'status' => $status,
                'file_name' => fake()->boolean(50) ? fake()->word().'.csv' : null,
                'credits_spent' => rand(1, 50),
            ]);

            // Add 1 to 5 items to this task
            $itemCount = rand(1, 5);
            for ($j = 0; $j < $itemCount; $j++) {
                $matchedModel = null;
                if ($status === 'completed' && fake()->boolean(80)) {
                    // Match a random business or person
                    if (fake()->boolean(50) && $businesses->isNotEmpty()) {
                        $matchedModel = $businesses->random();
                    } elseif ($peoples->isNotEmpty()) {
                        $matchedModel = $peoples->random();
                    }
                }

                DataEnrichmentItem::create([
                    'data_enrichment_id' => $enrichment->id,
                    'input_query' => fake()->company().' or '.fake()->name(),
                    'status' => $status,
                    'matched_type' => $matchedModel ? get_class($matchedModel) : null,
                    'matched_id' => $matchedModel ? $matchedModel->id : null,
                    'enriched_payload' => ($status === 'completed') ? [
                        'phone_verified' => fake()->boolean(),
                        'email_status' => 'valid',
                        'linkedin_found' => fake()->boolean(),
                    ] : null,
                ]);
            }
        }
    }
}
