<?php

namespace App\Models;

use App\Models\Organizations\Organization;
use App\Models\Organizations\OrganizationMembership;
use App\Models\Stores\StoreMembership;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $role
 * @property string|null $email
 * @property string|null $username
 * @property string|null $phone
 * @property Carbon|null $email_verified_at
 * @property Carbon|null $phone_verified_at
 * @property string $password
 * @property string|null $password_plaintext
 * @property string|null $avatar_url
 * @property string $preferred_locale
 * @property string $status
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    // Roles
    public const ROLE_USER = 'user';

    public const ROLE_BUSINESS = 'business';

    public const ROLE_ADMIN = 'admin';

    public const ROLE_AGENT = 'agent';

    // Statuses
    public const STATUS_ACTIVE = 'active';

    public const STATUS_SUSPENDED = 'suspended';

    public const STATUS_PENDING = 'pending';

    // Locales
    public const LOCALE_FR = 'fr';

    public const LOCALE_AR = 'ar';

    public const LOCALE_EN = 'en';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'role',
        'email',
        'username',
        'phone',
        'email_verified_at',
        'phone_verified_at',
        'password',
        'password_plaintext',
        'avatar_url',
        'preferred_locale',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'password_plaintext',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'two_factor_confirmed_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Organizations owned by the user.
     */
    public function ownedOrganizations(): HasMany
    {
        return $this->hasMany(Organization::class, 'owner_id');
    }

    /**
     * Organization memberships of the user.
     */
    public function organizationMemberships(): HasMany
    {
        return $this->hasMany(OrganizationMembership::class);
    }

    /**
     * Store memberships of the user.
     */
    public function storeMemberships(): HasMany
    {
        return $this->hasMany(StoreMembership::class);
    }

    /**
     * Agent profile if this user is a call-center agent.
     */
    public function agentProfile(): HasOne
    {
        return $this->hasOne(Agent::class);
    }
}
