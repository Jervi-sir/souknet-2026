<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

#[Fillable([
    'saved_list_id',
    'listable_type',
    'listable_id',
])]
class ListItem extends Model
{
    use HasFactory;

    /**
     * Get the list that contains this item.
     */
    public function savedList(): BelongsTo
    {
        return $this->belongsTo(SavedList::class);
    }

    /**
     * Get the parent listable model (People, Business, Product, Job, etc.).
     */
    public function listable(): MorphTo
    {
        return $this->morphTo();
    }
}
