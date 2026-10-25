<?php

namespace App\Models\Stores;

use App\Models\Orders\Order;
use App\Models\Organizations\Organization;
use App\Models\Products\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Store extends Model
{
    // Statuses
    public const STATUS_ACTIVE = 'active';

    public const STATUS_MAINTENANCE = 'maintenance';

    public const STATUS_DRAFT = 'draft';

    public const STATUS_SUSPENDED = 'suspended';

    // Locales
    public const LOCALE_AR = 'ar';

    public const LOCALE_FR = 'fr';

    public const LOCALE_EN = 'en';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'organization_id',
        'name',
        'slug',
        'custom_domain',
        'currency',
        'email',
        'phone',
        'whatsapp_number',
        'logo_url',
        'favicon_url',
        'description',
        'default_locale',
        'theme_settings',
        'checkout_settings',
        'pixels_config',
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
            'theme_settings' => 'array',
            'checkout_settings' => 'array',
            'pixels_config' => 'array',
        ];
    }

    /**
     * Organization owning this store.
     */
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Staff memberships on this store.
     */
    public function memberships(): HasMany
    {
        return $this->hasMany(StoreMembership::class);
    }

    /**
     * Store collections.
     */
    public function collections(): HasMany
    {
        return $this->hasMany(StoreCollection::class);
    }

    /**
     * Products belonging to this store.
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Connected courier accounts for this store.
     */
    public function deliveryAccounts(): HasMany
    {
        return $this->hasMany(StoreDeliveryAccount::class);
    }

    /**
     * Orders placed in this store.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
