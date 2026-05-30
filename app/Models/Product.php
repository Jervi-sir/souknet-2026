<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

#[Fillable([
    'business_id',
    'category_id',
    'name',
    'slug',
    'price_monthly_cents',
    'price_cents',
    'specs',
    'image_color',
    'type',
    'is_active',
])]
class Product extends Model
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
            'price_monthly_cents' => 'integer',
            'price_cents' => 'integer',
            'specs' => 'array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the business that manufactures or provides the product.
     */
    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    /**
     * Get the category of the product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get all list items that reference this product.
     */
    public function listItems(): MorphMany
    {
        return $this->morphMany(ListItem::class, 'listable');
    }
}
