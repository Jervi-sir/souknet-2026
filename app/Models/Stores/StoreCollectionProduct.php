<?php

namespace App\Models\Stores;

use App\Models\Products\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreCollectionProduct extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'store_collection_products';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'store_collection_id',
        'product_id',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }

    /**
     * Collection reference.
     */
    public function collection(): BelongsTo
    {
        return $this->belongsTo(StoreCollection::class, 'store_collection_id');
    }

    /**
     * Product reference.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
