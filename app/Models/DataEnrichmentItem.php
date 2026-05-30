<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

#[Fillable([
    'data_enrichment_id',
    'input_query',
    'status',
    'matched_type',
    'matched_id',
    'enriched_payload',
])]
class DataEnrichmentItem extends Model
{
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'enriched_payload' => 'array',
        ];
    }

    /**
     * Get the parent data enrichment task.
     */
    public function enrichment(): BelongsTo
    {
        return $this->belongsTo(DataEnrichment::class, 'data_enrichment_id');
    }

    /**
     * Get the target model matched in the directory.
     */
    public function matched(): MorphTo
    {
        return $this->morphTo();
    }
}
