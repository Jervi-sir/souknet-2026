import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBag,
    Star,
    Truck,
    ShieldCheck,
    Check,
    ArrowRight,
    Sparkles,
    Flame,
    Eye,
    Filter,
    ChevronRight,
    MapPin,
    PackageCheck,
    Heart,
} from 'lucide-react';
import StorefrontLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Mock Data for Algeria COD Boutique
interface Product {
    id: string;
    slug: string;
    title: string;
    category: string;
    price: number;
    compare_at_price?: number;
    rating: number;
    reviews_count: number;
    image_url: string;
    is_hot?: boolean;
    is_new?: boolean;
    free_delivery?: boolean;
    stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const FEATURED_PRODUCTS: Product[] = [
    {
        id: 'prod_1',
        slug: 'sneakers-pro-running-ultra-algiers',
        title: 'AirPulse Breathable Sport Running Shoes',
        category: 'Footwear & Sports',
        price: 5900,
        compare_at_price: 7800,
        rating: 4.9,
        reviews_count: 142,
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        is_hot: true,
        free_delivery: true,
        stock_status: 'low_stock',
    },
    {
        id: 'prod_2',
        slug: 'smart-watch-ultra-series-titanium',
        title: 'Apex Fit Pro Smartwatch (Bluetooth Calls & AMOLED)',
        category: 'Electronics',
        price: 6800,
        compare_at_price: 9200,
        rating: 4.8,
        reviews_count: 98,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        is_hot: true,
        free_delivery: false,
        stock_status: 'in_stock',
    },
    {
        id: 'prod_3',
        slug: 'leather-jacket-vintage-casual-dz',
        title: 'Handcrafted Bomber Leather Jacket - Autumn Edition',
        category: 'Men Fashion',
        price: 11500,
        compare_at_price: 14900,
        rating: 4.9,
        reviews_count: 67,
        image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
        is_new: true,
        free_delivery: true,
        stock_status: 'in_stock',
    },
    {
        id: 'prod_4',
        slug: 'wireless-earbuds-anc-pro-audio',
        title: 'EchoPod Studio Active Noise-Cancelling Earbuds',
        category: 'Audio & Gadgets',
        price: 4400,
        compare_at_price: 5900,
        rating: 4.7,
        reviews_count: 189,
        image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
        free_delivery: false,
        stock_status: 'in_stock',
    },
    {
        id: 'prod_5',
        slug: 'minimalist-leather-backpack-commute',
        title: 'Urban Oxford Minimalist Laptop Travel Backpack',
        category: 'Bags & Accessories',
        price: 4900,
        compare_at_price: 6500,
        rating: 4.8,
        reviews_count: 53,
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        is_new: true,
        free_delivery: false,
        stock_status: 'in_stock',
    },
    {
        id: 'prod_6',
        slug: 'oud-wood-parfum-luxury-oriental',
        title: 'Royal Amber & Oud Intense Extract 100ml',
        category: 'Fragrances & Beauty',
        price: 7200,
        compare_at_price: 8900,
        rating: 5.0,
        reviews_count: 114,
        image_url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
        is_hot: true,
        free_delivery: true,
        stock_status: 'low_stock',
    },
];

const CATEGORIES = [
    { name: 'All Collections', count: 48, active: true },
    { name: 'Footwear & Shoes', count: 16 },
    { name: 'Tech & Smart Gadgets', count: 12 },
    { name: 'Fashion & Apparel', count: 14 },
    { name: 'Fragrances', count: 6 },
];

export default function StorefrontHome() {
    const [selectedCategory, setSelectedCategory] = useState('All Collections');

    return (
        <StorefrontLayout>
            <Head title="DzAvenue Boutique - Premium Cash on Delivery Store in Algeria" />

            {/* Hero Section: Minimalist, Crisp, High-Converting */}
            <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-muted/30 via-background to-background py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Hero Text */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                                <Sparkles className="size-3.5 text-primary" />
                                <span>New 2026 Collection • Pay on Delivery</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                                Premium essentials delivered straight to your door in Algeria.
                            </h1>

                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mx-auto lg:mx-0">
                                Shop genuine electronics, footwear, and apparel across all 58 wilayas. Inspect your package before paying with our 100% safe Cash-on-Delivery guarantee.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                                <a href="#featured">
                                    <Button size="lg" className="h-11 px-6 gap-2 w-full sm:w-auto font-medium">
                                        Shop Best Sellers
                                        <ArrowRight className="size-4" />
                                    </Button>
                                </a>
                                <Link href="/storefront/checkout">
                                    <Button variant="outline" size="lg" className="h-11 px-6 w-full sm:w-auto">
                                        Quick 1-Click Order
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust Metrics */}
                            <div className="pt-6 border-t border-border/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-emerald-500" />
                                    <span><strong>48h</strong> Average Delivery</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-emerald-500" />
                                    <span><strong>58</strong> Wilayas Covered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-emerald-500" />
                                    <span><strong>Zero</strong> Advance Payment</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Featured Card with Quick Buy Badge */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative mx-auto max-w-sm rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm p-4 shadow-xl shadow-black/5 dark:shadow-black/20">
                                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-muted">
                                    <img
                                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
                                        alt="Featured Product"
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <Badge className="absolute top-3 left-3 bg-red-600 hover:bg-red-600 text-white border-0 text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                                        <Flame className="size-3" /> Top Seller
                                    </Badge>
                                    <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold shadow-xs">
                                        5,900 DZD
                                    </div>
                                </div>

                                <div className="pt-4 space-y-2">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>Footwear & Sports</span>
                                        <div className="flex items-center gap-1 text-amber-500 font-medium">
                                            <Star className="size-3.5 fill-current" />
                                            <span>4.9 (142 reviews)</span>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-base tracking-tight text-foreground">
                                        AirPulse Breathable Sport Running Shoes
                                    </h3>
                                    <p className="text-xs text-muted-foreground line-clamp-1">
                                        Ergonomic shock absorption cushion with high grip rubber sole.
                                    </p>

                                    <div className="pt-2 flex items-center gap-2">
                                        <Link href="/storefront/checkout" className="flex-1">
                                            <Button size="sm" className="w-full gap-2 font-medium">
                                                <ShoppingBag className="size-3.5" />
                                                Order Now (Pay at Door)
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Catalog Section */}
            <section id="featured" className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                            <span>Available in Stock</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            Trending Products with Fast Dispatch
                        </h2>
                    </div>

                    {/* Filter categories pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                                    selectedCategory === cat.name
                                        ? 'bg-primary text-primary-foreground shadow-xs'
                                        : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid: Responsive 3-4 column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURED_PRODUCTS.map((product) => {
                        const discount = product.compare_at_price
                            ? Math.round(
                                  ((product.compare_at_price - product.price) / product.compare_at_price) * 100,
                              )
                            : 0;

                        return (
                            <Card
                                key={product.id}
                                className="group overflow-hidden border border-border/80 bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Image with badges */}
                                    <div className="relative aspect-4/3 overflow-hidden bg-muted">
                                        <img
                                            src={product.image_url}
                                            alt={product.title}
                                            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />

                                        {/* Status Badges */}
                                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
                                            {product.is_hot && (
                                                <Badge className="bg-red-500/90 hover:bg-red-500 text-white text-[10px] px-2 py-0.5 font-semibold">
                                                    Hot Deal
                                                </Badge>
                                            )}
                                            {product.is_new && (
                                                <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-[10px] px-2 py-0.5 font-semibold">
                                                    New
                                                </Badge>
                                            )}
                                            {discount > 0 && (
                                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-medium">
                                                    -{discount}%
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Free delivery badge bottom left */}
                                        {product.free_delivery && (
                                            <div className="absolute bottom-2.5 left-2.5 bg-background/95 backdrop-blur-xs text-[10px] font-medium px-2 py-0.5 rounded-md border border-border/60 flex items-center gap-1 shadow-xs">
                                                <Truck className="size-3 text-emerald-600" />
                                                <span>Free Delivery</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <CardContent className="p-4 space-y-2">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{product.category}</span>
                                            <div className="flex items-center gap-1 text-amber-500 font-medium">
                                                <Star className="size-3 fill-current" />
                                                <span>{product.rating}</span>
                                                <span className="text-muted-foreground/60">({product.reviews_count})</span>
                                            </div>
                                        </div>

                                        <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                                            {product.title}
                                        </h3>

                                        {/* Pricing Block */}
                                        <div className="pt-2 flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-foreground">
                                                {product.price.toLocaleString()} DZD
                                            </span>
                                            {product.compare_at_price && (
                                                <span className="text-xs text-muted-foreground line-through">
                                                    {product.compare_at_price.toLocaleString()} DZD
                                                </span>
                                            )}
                                        </div>
                                    </CardContent>
                                </div>

                                {/* Order / Quick Checkout Button */}
                                <div className="p-4 pt-0">
                                    <Link href="/storefront/checkout" className="w-full">
                                        <Button
                                            variant="default"
                                            className="w-full gap-2 h-9 text-xs font-semibold shadow-xs"
                                        >
                                            <ShoppingBag className="size-3.5" />
                                            Order Now (Cash on Delivery)
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* How COD Works Section (Essential for Algerian Shopper Confidence) */}
            <section className="border-t border-border/60 bg-muted/30 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                        <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
                            Simple 3-Step Process
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            How ordering on our store works
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            No credit card or online payment required. Pay safely at your doorstep.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="p-6 rounded-2xl bg-card border border-border/80 text-center space-y-3 shadow-xs">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center font-bold text-lg">
                                1
                            </div>
                            <h3 className="font-semibold text-base text-foreground">1. Fill the Form</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Enter your name, phone number, and wilaya/commune. It takes less than 30 seconds.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-card border border-border/80 text-center space-y-3 shadow-xs">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center font-bold text-lg">
                                2
                            </div>
                            <h3 className="font-semibold text-base text-foreground">2. Phone Confirmation</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Our agent calls you to verify your size, address, and confirm your delivery timing.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-card border border-border/80 text-center space-y-3 shadow-xs">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center font-bold text-lg">
                                3
                            </div>
                            <h3 className="font-semibold text-base text-foreground">3. Receive & Pay</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                The courier (Yalidine/ZR Express) arrives at your door. Inspect the item and pay in cash.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </StorefrontLayout>
    );
}
