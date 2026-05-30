<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

#[Fillable([
    'business_id',
    'title',
    'slug',
    'location',
    'salary_min',
    'salary_max',
    'salary_currency',
    'type',
    'experience',
    'tags',
    'description',
    'is_active',
])]
class JobPost extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'job_posts';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'salary_min' => 'integer',
            'salary_max' => 'integer',
            'tags' => 'array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the business that posted the job.
     */
    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    /**
     * Get all list items that reference this job post.
     */
    public function listItems(): MorphMany
    {
        return $this->morphMany(ListItem::class, 'listable');
    }
}
