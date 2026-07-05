<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'role_code', 'status', 'message', 'rejection_reason'])]
class UpgradeRequest extends Model
{
    /**
     * Get the user who requested the upgrade.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
