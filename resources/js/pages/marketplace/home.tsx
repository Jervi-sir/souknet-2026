import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Store,
    Search,
    Compass,
    Truck,
    ShoppingBag,
    ShieldCheck,
    Star,
    Sparkles,
    ArrowRight,
    Flame,
    MapPin,
    CheckCircle2,
    Building2,
    ChevronRight,
    Tag,
    Zap,
    Percent,
    SlidersHorizontal,
    ArrowUpRight,
    BadgeCheck,
    Clock,
} from 'lucide-react';
import MarketplaceLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface FeaturedStore {
    id: string;
    name: string;
    category: string;
    wilaya: string;
    rating: number;
    sales_count: number;
    logo_letter: string;
    color: string;
    verified: boolean;
    banner_text: string;
    delivery_courier: string;
}

interface MegaProduct {
    id: string;
    category_id: string;
    store_name: string;
    title: string;
    price: number;
    original_price?: number;
    badge: string;
    wilaya_origin: string;
    delivery_note: string;
    rating: number;
    reviews_count: number;
    free_delivery?: boolean;
}

const FEATURED_STORES: FeaturedStore[] = [
    {
        id: 'st-01',
        name: 'DzAvenue Boutique',
        category: 'Footwear & Streetwear',
        wilaya: '16 - Alger',
        rating: 4.9,
        sales_count: 1420,
        logo_letter: 'DZ',
        color: 'from-blue-600 to-indigo-700',
        verified: true,
        banner_text: 'Official Algerian Authorized Reseller · Free Delivery on 2+ Pairs',
        delivery_courier: 'Yalidine Express',
    },
    {
        id: 'st-02',
        name: 'Algeria Sneaker Lab',
        category: 'Sports & Sneakers',
        wilaya: '31 - Oran',
        rating: 4.8,
        sales_count: 980,
        logo_letter: 'AS',
        color: 'from-emerald-600 to-teal-700',
        verified: true,
        banner_text: 'Premium Sneaker Care & Exclusive Streetwear Drops',
        delivery_courier: 'Yalidine Express',
    },
    {
        id: 'st-03',
        name: 'Moda Constantinoise',
        category: 'Modest Fashion & Caftans',
        wilaya: '25 - Constantine',
        rating: 4.9,
        sales_count: 1850,
        logo_letter: 'MC',
        color: 'from-amber-600 to-orange-700',
        verified: true,
        banner_text: 'Authentic Turkish Silk & Traditional Modern Modest Attire',
        delivery_courier: 'EcoTrack Delivery',
    },
    {
        id: 'st-04',
        name: 'Setif Tech Express',
        category: 'Smart Gadgets & Electronics',
        wilaya: '19 - Sétif',
        rating: 4.7,
        sales_count: 640,
        logo_letter: 'ST',
        color: 'from-purple-600 to-violet-700',
        verified: true,
        banner_text: '12 Months Warranty · Express Delivery via ZR Express',
        delivery_courier: 'ZR Express',
    },
];

const MEGA_DEALS: MegaProduct[] = [
    {
        id: 'prd-01',
        category_id: 'footwear',
        store_name: 'DzAvenue Boutique',
        title: 'AirPulse Ultra-Breathable Running Shoes (Limited Series)',
        price: 5900,
        original_price: 7500,
        badge: 'Best Seller',
        wilaya_origin: 'Algiers Hub',
        delivery_note: 'Home 400 DZD · Stopdesk 250 DZD',
        rating: 4.9,
        reviews_count: 84,
        free_delivery: true,
    },
    {
        id: 'prd-02',
        category_id: 'clothing',
        store_name: 'Moda Constantinoise',
        title: 'Premium Medina Silk Touch Hijab (Pack of 3 Essential Colors)',
        price: 2900,
        original_price: 3600,
        badge: 'Bundle Deal',
        wilaya_origin: 'Constantine Hub',
        delivery_note: 'Free delivery above 6,000 DZD',
        rating: 4.8,
        reviews_count: 142,
    },
    {
        id: 'prd-03',
        category_id: 'electronics',
        store_name: 'Setif Tech Express',
        title: 'Titan Pro Ultra Smartwatch (IP68 Waterproof, Arabic UI)',
        price: 8900,
        original_price: 11500,
        badge: 'Flash Deal -22%',
        wilaya_origin: 'Sétif Hub',
        delivery_note: 'Yalidine Express 48h Nationwide',
        rating: 4.7,
        reviews_count: 53,
        free_delivery: true,
    },
    {
        id: 'prd-04',
        category_id: 'accessories',
        store_name: 'Algeria Sneaker Lab',
        title: 'Crease Guard Shield + Sneaker Cleaning Kit',
        price: 2200,
        original_price: 2800,
        badge: 'Trending',
        wilaya_origin: 'Oran Hub',
        delivery_note: 'Cash on Delivery Available',
        rating: 4.9,
        reviews_count: 96,
    },
    {
        id: 'prd-05',
        category_id: 'footwear',
        store_name: 'Algeria Sneaker Lab',
        title: 'Titan Street Runner (Triple White EU Edition)',
        price: 7400,
        original_price: 8900,
        badge: 'New Release',
        wilaya_origin: 'Oran Hub',
        delivery_note: 'Stopdesk pickup available',
        rating: 4.8,
        reviews_count: 112,
    },
    {
        id: 'prd-06',
        category_id: 'clothing',
        store_name: 'Moda Constantinoise',
        title: 'Classic Karakou Embroidered Evening Caftan',
        price: 18500,
        original_price: 22000,
        badge: 'Artisan Made',
        wilaya_origin: 'Constantine Hub',
        delivery_note: 'Express doorstep delivery',
        rating: 5.0,
        reviews_count: 62,
        free_delivery: true,
    },
];

export default function MarketplaceHome() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts =
        selectedCategory === 'all'
            ? MEGA_DEALS
            : MEGA_DEALS.filter((p) => p.category_id === selectedCategory);

    return (
        <MarketplaceLayout
            title="Souknet Mega Mall - Discover Algerian Stores & COD Products"
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
        >
            <Head title="Souknet Mega Mall - Algeria's Huge E-Commerce Marketplace" />

            <div className="space-y-8">
                {/* Mega Hero Promotional Billboard */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-6 sm:p-10 shadow-xl shadow-primary/10">
                    <div className="relative z-10 max-w-2xl space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-white text-xs font-semibold backdrop-blur-xs">
                            <Sparkles className="size-3.5" />
                            <span>National 58 Wilayas Shopping Festival</span>
                        </div>

                        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                            Algeria’s Largest Network of Verified Independent Boutiques
                        </h1>

                        <p className="text-xs sm:text-sm text-primary-foreground/90 leading-relaxed max-w-xl">
                            Shop directly from local merchants in Algiers, Oran, Constantine, and Sétif. Fast delivery via Yalidine & ZR Express with zero advance payment.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link href="/marketplace/explore">
                                <Button className="bg-background text-foreground hover:bg-muted font-bold text-xs h-10 px-5 rounded-xl shadow-md">
                                    Explore 1,420+ Deals
                                    <ArrowRight className="size-3.5 ml-1.5" />
                                </Button>
                            </Link>

                            <Link href="/marketplace/stores">
                                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-medium text-xs h-10 px-4 rounded-xl">
                                    <Building2 className="size-3.5 mr-1.5" />
                                    Browse Stores Directory
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute right-[-40px] bottom-[-40px] size-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                </div>

                {/* 4 Quick Value Props Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                            <ShieldCheck className="size-5" />
                        </div>
                        <div>
                            <span className="font-bold text-xs text-foreground block">Paiement à la livraison</span>
                            <span className="text-[10px] text-muted-foreground">100% Cash on Delivery</span>
                        </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                            <Truck className="size-5" />
                        </div>
                        <div>
                            <span className="font-bold text-xs text-foreground block">Yalidine & ZR Express</span>
                            <span className="text-[10px] text-muted-foreground">24h-48h national shipping</span>
                        </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                            <BadgeCheck className="size-5" />
                        </div>
                        <div>
                            <span className="font-bold text-xs text-foreground block">Verified Stores</span>
                            <span className="text-[10px] text-muted-foreground">Authentic Algerian brands</span>
                        </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                            <MapPin className="size-5" />
                        </div>
                        <div>
                            <span className="font-bold text-xs text-foreground block">58 Wilayas Stopdesk</span>
                            <span className="text-[10px] text-muted-foreground">Discounted bureau pickup</span>
                        </div>
                    </div>
                </div>

                {/* SECTION 1: Catalog Products Grid (Active Category filtered) */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border/80">
                        <div className="flex items-center gap-2">
                            <Flame className="size-5 text-amber-500" />
                            <div>
                                <h2 className="text-base font-bold text-foreground">
                                    Trending Products & Flash Deals
                                </h2>
                                <span className="text-xs text-muted-foreground">
                                    Showing items from verified Algerian stores with direct COD checkout
                                </span>
                            </div>
                        </div>

                        <Link
                            href="/marketplace/explore"
                            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                        >
                            <span>View All ({filteredProducts.length})</span>
                            <ChevronRight className="size-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredProducts.map((deal) => (
                            <Card
                                key={deal.id}
                                className="border-border/80 hover:border-primary/50 transition-all hover:shadow-md bg-card/60 backdrop-blur-xs flex flex-col justify-between group"
                            >
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="secondary" className="text-[10px] font-medium">
                                            {deal.badge}
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                            <MapPin className="size-3" />
                                            {deal.wilaya_origin}
                                        </span>
                                    </div>

                                    {/* Mock Product Thumbnail */}
                                    <div className="w-full h-40 rounded-xl bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center p-3 relative group overflow-hidden">
                                        <ShoppingBag className="size-12 text-muted-foreground/30 group-hover:scale-110 transition-transform" />
                                        <span className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-md bg-background/90 text-foreground border border-border">
                                            {deal.store_name}
                                        </span>
                                        {deal.free_delivery && (
                                            <Badge className="absolute top-2 right-2 text-[9px] bg-emerald-600 text-white">
                                                Free Delivery
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">
                                            {deal.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-[11px] text-amber-500">
                                            <Star className="size-3 fill-amber-500" />
                                            <span className="font-bold">{deal.rating}</span>
                                            <span className="text-muted-foreground">({deal.reviews_count} reviews)</span>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-border/60">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-base font-bold font-mono text-foreground">
                                                {deal.price.toLocaleString()} DZD
                                            </span>
                                            {deal.original_price && (
                                                <span className="text-xs line-through text-muted-foreground font-mono">
                                                    {deal.original_price.toLocaleString()} DZD
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                                            {deal.delivery_note}
                                        </span>
                                    </div>

                                    <Link href="/storefront/product" className="block pt-1">
                                        <Button className="w-full text-xs h-8 font-semibold shadow-xs">
                                            Order with COD
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* SECTION 2: Top Verified Stores Carousel Cards */}
                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border/80">
                        <div className="flex items-center gap-2">
                            <Building2 className="size-5 text-primary" />
                            <div>
                                <h2 className="text-base font-bold text-foreground">
                                    Official Algerian Merchant Stores
                                </h2>
                                <span className="text-xs text-muted-foreground">
                                    Verified sellers with direct shipping accounts & phone support
                                </span>
                            </div>
                        </div>

                        <Link
                            href="/marketplace/stores"
                            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                        >
                            <span>View All Stores</span>
                            <ChevronRight className="size-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FEATURED_STORES.map((store) => (
                            <Card
                                key={store.id}
                                className="border-border/80 hover:border-primary/50 transition-all hover:shadow-md bg-card/60 backdrop-blur-xs group"
                            >
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`size-11 rounded-xl bg-gradient-to-br ${store.color} text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0`}
                                            >
                                                {store.logo_letter}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5 font-bold text-sm text-foreground">
                                                    <span>{store.name}</span>
                                                    {store.verified && (
                                                        <CheckCircle2 className="size-3.5 text-blue-500 shrink-0" />
                                                    )}
                                                </div>
                                                <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                                                    <span>{store.category}</span>
                                                    <span>·</span>
                                                    <span className="flex items-center gap-0.5">
                                                        <MapPin className="size-3" />
                                                        {store.wilaya}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                                            <Star className="size-3.5 fill-amber-500" />
                                            <span>{store.rating}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-muted-foreground leading-relaxed bg-muted/30 p-2.5 rounded-lg">
                                        {store.banner_text}
                                    </p>

                                    <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                            <Truck className="size-3 text-emerald-600" />
                                            <span>{store.delivery_courier}</span>
                                        </span>
                                        <Link
                                            href="/storefront"
                                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                                        >
                                            <span>Visit Storefront</span>
                                            <ArrowRight className="size-3" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </MarketplaceLayout>
    );
}
