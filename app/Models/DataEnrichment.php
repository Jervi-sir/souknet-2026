<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'user_id',
    'type',
    'status',
    'file_name',
    'credits_spent',
])]
class DataEnrichment extends Model
{
    use HasFactory;

    /**
     * Get the user who executed the data enrichment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the individual items/records in this enrichment task.
     */
    public function items(): HasMany
    {
        return $this->hasMany(DataEnrichmentItem::class);
    }
}
