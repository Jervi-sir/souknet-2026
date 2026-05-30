<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'user_id',
    'category_id',
    'plan_id',
    'name',
    'slug',
    'tagline',
    'description',
    'founded_year',
    'address',
    'city',
    'country',
    'lat',
    'lng',
    'phone',
    'email',
    'website',
    'twitter_url',
    'linkedin_url',
    'github_url',
    'facebook_url',
    'status',
    'is_featured',
    'is_verified',
    'is_claimed',
    'rejection_reason',
    'plan_expires_at',
    'meta_title',
    'meta_description',
])]
class Business extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'lat' => 'float',
            'lng' => 'float',
            'is_featured' => 'boolean',
            'is_verified' => 'boolean',
            'is_claimed' => 'boolean',
            'plan_expires_at' => 'datetime',
            'founded_year' => 'integer',
        ];
    }

    /**
     * Get the user that owns the business.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category the business belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the plan associated with the business.
     */
    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    /**
     * Get the hours of operation for the business.
     */
    public function hours(): HasMany
    {
        return $this->hasMany(BusinessHour::class);
    }

    /**
     * Get the photos of the business.
     */
    public function photos(): HasMany
    {
        return $this->hasMany(BusinessPhoto::class);
    }

    /**
     * Get the contact requests sent to this business.
     */
    public function contacts(): HasMany
    {
        return $this->hasMany(BusinessContact::class);
    }

    /**
     * Get the tags associated with the business.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'business_tag');
    }

    /**
     * Get the reviews for the business.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the profile views for the business.
     */
    public function profileViews(): HasMany
    {
        return $this->hasMany(ProfileView::class);
    }

    /**
     * Get the click events triggered for the business.
     */
    public function clickEvents(): HasMany
    {
        return $this->hasMany(ClickEvent::class);
    }

    /**
     * Get the people associated with the business.
     */
    public function peoples(): HasMany
    {
        return $this->hasMany(People::class);
    }

    /**
     * Get the products manufactured/provided by the business.
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Get the jobs posted by the business.
     */
    public function jobs(): HasMany
    {
        return $this->hasMany(JobPost::class);
    }
}
