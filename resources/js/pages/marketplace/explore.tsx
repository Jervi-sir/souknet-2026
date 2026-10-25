import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Compass,
    Search,
    Filter,
    ShoppingBag,
    Star,
    Truck,
    MapPin,
    Building2,
    SlidersHorizontal,
    Tag,
    ChevronDown,
} from 'lucide-react';
import MarketplaceLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ExploreProduct {
    id: string;
    store_name: string;
    title: string;
    category: string;
    price: number;
    original_price?: number;
    wilaya_code: string;
    wilaya_name: string;
    free_delivery: boolean;
    rating: number;
    sales_count: number;
}

const CATALOG: ExploreProduct[] = [
    {
        id: 'ex-01',
        store_name: 'DzAvenue Boutique',
        title: 'AirPulse Breathable Sport Sneaker (Red/White)',
        category: 'Footwear',
        price: 5900,
        original_price: 7200,
        wilaya_code: '16',
        wilaya_name: 'Alger',
        free_delivery: true,
        rating: 4.9,
        sales_count: 240,
    },
    {
        id: 'ex-02',
        store_name: 'DzAvenue Boutique',
        title: 'Comfort Performance Orthopedic Insole Gel',
        category: 'Accessories',
        price: 1200,
        original_price: 1600,
        wilaya_code: '16',
        wilaya_name: 'Alger',
        free_delivery: false,
        rating: 4.7,
        sales_count: 180,
    },
    {
        id: 'ex-03',
        store_name: 'Algeria Sneaker Lab',
        title: 'Titan Street Runner (Triple White EU Edition)',
        category: 'Footwear',
        price: 7400,
        original_price: 8900,
        wilaya_code: '31',
        wilaya_name: 'Oran',
        free_delivery: true,
        rating: 4.8,
        sales_count: 145,
    },
    {
        id: 'ex-04',
        store_name: 'Algeria Sneaker Lab',
        title: 'Universal Crease Protector + Waterproofing Spray',
        category: 'Accessories',
        price: 1500,
        wilaya_code: '31',
        wilaya_name: 'Oran',
        free_delivery: false,
        rating: 4.9,
        sales_count: 310,
    },
    {
        id: 'ex-05',
        store_name: 'Moda Constantinoise',
        title: 'Silk Touch Medina Hijab (Pack of 2 Colors)',
        category: 'Clothing',
        price: 2100,
        original_price: 2600,
        wilaya_code: '25',
        wilaya_name: 'Constantine',
        free_delivery: false,
        rating: 4.9,
        sales_count: 420,
    },
    {
        id: 'ex-06',
        store_name: 'Moda Constantinoise',
        title: 'Classic Karakou Embroidered Evening Caftan',
        category: 'Clothing',
        price: 18500,
        original_price: 22000,
        wilaya_code: '25',
        wilaya_name: 'Constantine',
        free_delivery: true,
        rating: 5.0,
        sales_count: 62,
    },
    {
        id: 'ex-07',
        store_name: 'Setif Tech Express',
        title: 'Titan Pro Ultra Smartwatch (AMOLED / Bluetooth Call)',
        category: 'Electronics',
        price: 8900,
        original_price: 11000,
        wilaya_code: '19',
        wilaya_name: 'Sétif',
        free_delivery: true,
        rating: 4.7,
        sales_count: 98,
    },
    {
        id: 'ex-08',
        store_name: 'Setif Tech Express',
        title: 'Magnetic Wireless Powerbank 10,000mAh with Fast Charge',
        category: 'Electronics',
        price: 3600,
        original_price: 4500,
        wilaya_code: '19',
        wilaya_name: 'Sétif',
        free_delivery: false,
        rating: 4.6,
        sales_count: 112,
    },
];

const CATEGORIES = ['All Categories', 'Footwear', 'Clothing', 'Electronics', 'Accessories'];

export default function MarketplaceExplore() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedWilaya, setSelectedWilaya] = useState('all');
    const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);

    const filtered = CATALOG.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.store_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === 'All Categories' || item.category === selectedCategory;
        const matchesWilaya =
            selectedWilaya === 'all' || item.wilaya_code === selectedWilaya;
        const matchesFreeShipping = !freeDeliveryOnly || item.free_delivery;

        return matchesSearch && matchesCategory && matchesWilaya && matchesFreeShipping;
    });

    return (
        <MarketplaceLayout title="Explore Algerian Products - Souknet" activeNav="explore">
            <Head title="Explore Products & Deals - Souknet Marketplace" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <Compass className="size-6 text-primary" />
                            Explore Algerian Marketplace Products
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Browse verified items across Algerian boutique stores with Cash on Delivery (COD).
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Showing:</span>
                        <Badge variant="secondary" className="font-mono">
                            {filtered.length} Results
                        </Badge>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="p-4 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-5 relative">
                            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search by product name, brand or merchant..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 pl-9 text-xs"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="h-9 w-full rounded-md border border-input bg-background px-3 text-xs text-foreground focus:outline-none"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <select
                                value={selectedWilaya}
                                onChange={(e) => setSelectedWilaya(e.target.value)}
                                className="h-9 w-full rounded-md border border-input bg-background px-3 text-xs text-foreground focus:outline-none"
                            >
                                <option value="all">All Wilayas</option>
                                <option value="16">16 - Alger</option>
                                <option value="31">31 - Oran</option>
                                <option value="25">25 - Constantine</option>
                                <option value="19">19 - Sétif</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2 flex items-center justify-end">
                            <label className="flex items-center gap-2 text-xs cursor-pointer select-none text-muted-foreground hover:text-foreground">
                                <input
                                    type="checkbox"
                                    checked={freeDeliveryOnly}
                                    onChange={(e) => setFreeDeliveryOnly(e.target.checked)}
                                    className="rounded border-border text-primary focus:ring-0"
                                />
                                <span>Free Delivery</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map((item) => (
                        <Card
                            key={item.id}
                            className="border-border/80 hover:border-primary/50 transition-all hover:shadow-md bg-card/60 backdrop-blur-xs flex flex-col justify-between group"
                        >
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-[10px]">
                                        {item.category}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <MapPin className="size-3" />
                                        {item.wilaya_name}
                                    </span>
                                </div>

                                <div className="w-full h-36 rounded-xl bg-muted/40 flex items-center justify-center relative">
                                    <ShoppingBag className="size-10 text-muted-foreground/30 group-hover:scale-105 transition-transform" />
                                    {item.free_delivery && (
                                        <Badge className="absolute top-2 left-2 text-[9px] bg-emerald-600 text-white">
                                            Free Delivery
                                        </Badge>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <div className="text-[10px] font-semibold text-primary">
                                        {item.store_name}
                                    </div>
                                    <h3 className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-[11px] text-amber-500">
                                        <Star className="size-3 fill-amber-500" />
                                        <span className="font-bold">{item.rating}</span>
                                        <span className="text-muted-foreground">({item.sales_count} sold)</span>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-border/60">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-base font-bold font-mono text-foreground">
                                            {item.price.toLocaleString()} DZD
                                        </span>
                                        {item.original_price && (
                                            <span className="text-xs line-through text-muted-foreground font-mono">
                                                {item.original_price.toLocaleString()} DZD
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <Link href="/storefront/product" className="block pt-1">
                                    <Button className="w-full text-xs h-8 font-semibold shadow-xs">
                                        Buy with 1-Click COD
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}

                    {filtered.length === 0 && (
                        <div className="col-span-full p-12 text-center rounded-xl border border-dashed border-border text-muted-foreground text-xs space-y-2">
                            <ShoppingBag className="size-8 mx-auto opacity-40" />
                            <p className="font-semibold text-foreground">No products match your criteria</p>
                            <p>Try resetting your keyword or selecting "All Wilayas".</p>
                        </div>
                    )}
                </div>
            </div>
        </MarketplaceLayout>
    );
}
