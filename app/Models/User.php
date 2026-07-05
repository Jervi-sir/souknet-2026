<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'email', 'password', 'password_plaintext', 'role_id'])]
#[Hidden(['password', 'password_plaintext', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Get the roles associated with the user.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    /**
     * Get the permissions associated with the user.
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'user_permissions');
    }

    /**
     * Get the upgrade requests submitted by the user.
     */
    public function upgradeRequests(): HasMany
    {
        return $this->hasMany(UpgradeRequest::class);
    }

    /**
     * Get the businesses owned by the user.
     */
    public function businesses(): HasMany
    {
        return $this->hasMany(Business::class);
    }

    /**
     * Get the reviews written by the user.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the review replies written by the user.
     */
    public function reviewReplies(): HasMany
    {
        return $this->hasMany(ReviewReply::class);
    }

    /**
     * Get the click events triggered by the user.
     */
    public function clickEvents(): HasMany
    {
        return $this->hasMany(ClickEvent::class);
    }

    /**
     * Get the profile views recorded by the user.
     */
    public function profileViews(): HasMany
    {
        return $this->hasMany(ProfileView::class);
    }

    /**
     * Get the saved lists owned by the user.
     */
    public function savedLists(): HasMany
    {
        return $this->hasMany(SavedList::class);
    }

    /**
     * Get the data enrichments run by the user.
     */
    public function dataEnrichments(): HasMany
    {
        return $this->hasMany(DataEnrichment::class);
    }
}
