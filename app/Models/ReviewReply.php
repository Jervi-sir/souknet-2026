<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['review_id', 'user_id', 'body'])]
class ReviewReply extends Model
{
    use HasFactory;

    /**
     * Get the review this reply is for.
     */
    public function review(): BelongsTo
    {
        return $this->belongsTo(Review::class);
    }

    /**
     * Get the user who replied to the review.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
