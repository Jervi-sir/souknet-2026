<?php

namespace App\Models\Organizations;

use App\Models\Agent;
use App\Models\Billings\Subscription;
use App\Models\Catalogs\Commune;
use App\Models\Catalogs\Wilaya;
use App\Models\Stores\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    // Business Types
    public const BUSINESS_TYPE_MERCHANT = 'merchant';

    public const BUSINESS_TYPE_WHOLESALER = 'wholesaler';

    public const BUSINESS_TYPE_FACTORY = 'factory';

    public const BUSINESS_TYPE_BRAND = 'brand';

    public const BUSINESS_TYPE_AGENCY = 'agency';

    // Statuses
    public const STATUS_ACTIVE = 'active';

    public const STATUS_SUSPENDED = 'suspended';

    public const STATUS_PENDING_VERIFICATION = 'pending_verification';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'owner_id',
        'name',
        'business_type_code',
        'tax_number',
        'legal_name',
        'email',
        'phone',
        'wilaya_id',
        'commune_id',
        'address',
        'logo_url',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            //
        ];
    }

    /**
     * Owner user of the organization.
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Headquarters wilaya.
     */
    public function wilaya(): BelongsTo
    {
        return $this->belongsTo(Wilaya::class);
    }

    /**
     * Headquarters commune.
     */
    public function commune(): BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }

    /**
     * Team memberships for this organization.
     */
    public function memberships(): HasMany
    {
        return $this->hasMany(OrganizationMembership::class);
    }

    /**
     * Stores owned by this organization.
     */
    public function stores(): HasMany
    {
        return $this->hasMany(Store::class);
    }

    /**
     * Subscriptions for this organization.
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    /**
     * Call-center agents employed by this organization.
     */
    public function agents(): HasMany
    {
        return $this->hasMany(Agent::class);
    }
}
