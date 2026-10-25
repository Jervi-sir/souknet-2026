import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Search,
    MapPin,
    Star,
    CheckCircle2,
    ShieldCheck,
    ArrowRight,
    Store,
    Users,
    Package,
    Flame,
} from 'lucide-react';
import MarketplaceLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface VerifiedMerchant {
    id: string;
    name: string;
    slug: string;
    category: string;
    wilaya: string;
    rating: number;
    reviews_count: number;
    orders_delivered: number;
    active_products_count: number;
    couriers: string[];
    description: string;
    color: string;
    initials: string;
    verified_badge: boolean;
}

const STORES: VerifiedMerchant[] = [
    {
        id: 'st-01',
        name: 'DzAvenue Boutique',
        slug: 'dzavenue',
        category: 'Footwear & Streetwear',
        wilaya: '16 - Alger (Cheraga)',
        rating: 4.9,
        reviews_count: 312,
        orders_delivered: 1420,
        active_products_count: 24,
        couriers: ['Yalidine Express', 'ZR Express'],
        description: 'Authorized retailer of performance footwear, sportswear, and lifestyle sneakers in Algiers.',
        color: 'from-blue-600 to-indigo-700',
        initials: 'DZ',
        verified_badge: true,
    },
    {
        id: 'st-02',
        name: 'Algeria Sneaker Lab',
        slug: 'algeria-sneaker-lab',
        category: 'Sneaker Care & Streetwear',
        wilaya: '31 - Oran (Bir El Djir)',
        rating: 4.8,
        reviews_count: 184,
        orders_delivered: 980,
        active_products_count: 16,
        couriers: ['Yalidine Express'],
        description: 'Oran’s specialized sneaker boutique with custom drops, shields, and cleaning accessories.',
        color: 'from-emerald-600 to-teal-700',
        initials: 'AS',
        verified_badge: true,
    },
    {
        id: 'st-03',
        name: 'Moda Constantinoise',
        slug: 'moda-constantinoise',
        category: 'Modest Fashion & Traditional Caftans',
        wilaya: '25 - Constantine (Ali Mendjeli)',
        rating: 4.9,
        reviews_count: 420,
        orders_delivered: 1850,
        active_products_count: 38,
        couriers: ['Yalidine Express', 'EcoTrack'],
        description: 'Handcrafted traditional dresses, silk hijabs, and abayas with expedited shipping across all 58 Wilayas.',
        color: 'from-amber-600 to-orange-700',
        initials: 'MC',
        verified_badge: true,
    },
    {
        id: 'st-04',
        name: 'Setif Tech Express',
        slug: 'setif-tech',
        category: 'Electronics & Smart Wearables',
        wilaya: '19 - Sétif (El Eulma)',
        rating: 4.7,
        reviews_count: 105,
        orders_delivered: 640,
        active_products_count: 19,
        couriers: ['ZR Express'],
        description: 'Official consumer gadgets, high-capacity powerbanks, smartwatches with 1-year Algerian warranty.',
        color: 'from-purple-600 to-violet-700',
        initials: 'ST',
        verified_badge: true,
    },
    {
        id: 'st-05',
        name: 'El Bahia Cosmetics',
        slug: 'el-bahia-cosmetics',
        category: 'Beauty & Skincare',
        wilaya: '31 - Oran (Centre)',
        rating: 4.8,
        reviews_count: 145,
        orders_delivered: 790,
        active_products_count: 31,
        couriers: ['Yalidine Express'],
        description: 'Dermatologist-approved organic skincare serums, hair treatments, and fragrance collections.',
        color: 'from-rose-500 to-pink-600',
        initials: 'EB',
        verified_badge: true,
    },
    {
        id: 'st-06',
        name: 'Mitidja Hardware & Tools',
        slug: 'mitidja-tools',
        category: 'Home & Professional Tools',
        wilaya: '09 - Blida (Boufarik)',
        rating: 4.6,
        reviews_count: 82,
        orders_delivered: 510,
        active_products_count: 45,
        couriers: ['ZR Express'],
        description: 'Heavy duty DIY tools, cordless drills, and workshop machinery with doorstep testing on delivery.',
        color: 'from-slate-700 to-zinc-900',
        initials: 'MT',
        verified_badge: true,
    },
];

export default function MarketplaceStores() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filtered = STORES.filter((st) => {
        const matchesQuery =
            st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            st.wilaya.toLowerCase().includes(searchQuery.toLowerCase()) ||
            st.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === 'All' || st.category.includes(selectedCategory);
        return matchesQuery && matchesCategory;
    });

    return (
        <MarketplaceLayout title="Verified Algerian Stores - Souknet Marketplace" activeNav="stores">
            <Head title="Verified Algerian Stores & Boutiques - Souknet" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <Building2 className="size-6 text-primary" />
                            Verified Algerian Merchant Directory
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Browse legitimate Algerian stores registered on Souknet with verified trade records and courier accounts.
                        </p>
                    </div>

                    <Link href="/organization/create">
                        <Button size="sm" className="text-xs gap-1.5 shadow-xs">
                            <Store className="size-3.5" />
                            <span>Register Your Store</span>
                        </Button>
                    </Link>
                </div>

                {/* Filter and Search Bar */}
                <div className="p-4 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative w-full sm:w-80">
                        <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search store name, Wilaya, or specialty..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 pl-9 text-xs"
                        />
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Category:</span>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="h-9 rounded-md border border-input bg-background px-3 text-xs text-foreground focus:outline-none"
                        >
                            <option value="All">All Categories</option>
                            <option value="Footwear">Footwear & Sneakers</option>
                            <option value="Fashion">Fashion & Caftans</option>
                            <option value="Electronics">Electronics & Gadgets</option>
                            <option value="Beauty">Beauty & Cosmetics</option>
                        </select>
                    </div>
                </div>

                {/* Stores Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((store) => (
                        <Card
                            key={store.id}
                            className="border-border/80 hover:border-primary/50 transition-all hover:shadow-md bg-card/60 backdrop-blur-xs flex flex-col justify-between"
                        >
                            <CardContent className="p-5 space-y-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`size-12 rounded-xl bg-gradient-to-br ${store.color} text-white font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0`}
                                        >
                                            {store.initials}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h3 className="font-bold text-sm text-foreground">
                                                    {store.name}
                                                </h3>
                                                {store.verified_badge && (
                                                    <CheckCircle2 className="size-3.5 text-blue-500 shrink-0" title="Verified Merchant" />
                                                )}
                                            </div>
                                            <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                                <MapPin className="size-3" />
                                                {store.wilaya}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                                        <Star className="size-3.5 fill-amber-500" />
                                        <span>{store.rating}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {store.description}
                                </p>

                                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg border border-border bg-muted/20 text-[11px]">
                                    <div>
                                        <span className="text-muted-foreground block text-[10px]">Delivered Orders</span>
                                        <span className="font-mono font-bold text-foreground">
                                            {store.orders_delivered.toLocaleString()}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block text-[10px]">Catalog Items</span>
                                        <span className="font-mono font-bold text-foreground">
                                            {store.active_products_count} Products
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                                        Integrated Logistics
                                    </span>
                                    <div className="flex flex-wrap gap-1">
                                        {store.couriers.map((c) => (
                                            <Badge key={c} variant="outline" className="text-[9px] px-1.5 py-0 h-4">
                                                {c}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                                        <ShieldCheck className="size-3.5" />
                                        <span>COD Verified</span>
                                    </span>
                                    <Link href="/storefront">
                                        <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                                            <span>Visit Storefront</span>
                                            <ArrowRight className="size-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </MarketplaceLayout>
    );
}
