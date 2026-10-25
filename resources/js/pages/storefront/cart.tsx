import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBag,
    Trash2,
    Minus,
    Plus,
    ArrowRight,
    ArrowLeft,
    Truck,
    ShieldCheck,
    Tag,
    Clock,
    Sparkles,
    Check,
} from 'lucide-react';
import StorefrontLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartItem {
    id: string;
    title: string;
    category: string;
    price: number;
    compare_price: number;
    size: string;
    color: string;
    quantity: number;
    image_url: string;
}

const INITIAL_CART: CartItem[] = [
    {
        id: 'item_1',
        title: 'AirPulse Breathable Sport Running Shoes',
        category: 'Footwear',
        price: 5900,
        compare_price: 7800,
        size: '42',
        color: 'Carmine Red',
        quantity: 1,
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'item_2',
        title: 'Apex Fit Pro Smartwatch (AMOLED + Calls)',
        category: 'Electronics',
        price: 6800,
        compare_price: 9200,
        size: 'Standard',
        color: 'Titanium Grey',
        quantity: 1,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    },
];

export default function StorefrontCart() {
    const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
    const [couponCode, setCouponCode] = useState<string>('');
    const [couponApplied, setCouponApplied] = useState<boolean>(false);
    const [couponError, setCouponError] = useState<string>('');

    const updateQuantity = (id: string, delta: number) => {
        setItems((prev) =>
            prev
                .map((item) => {
                    if (item.id === id) {
                        const newQ = item.quantity + delta;
                        return newQ > 0 ? { ...item, quantity: newQ } : null;
                    }
                    return item;
                })
                .filter(Boolean) as CartItem[],
        );
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const applyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        if (couponCode.toUpperCase() === 'SOUK10' || couponCode.toUpperCase() === 'WELCOME') {
            setCouponApplied(true);
            setCouponError('');
        } else {
            setCouponError('Invalid promo code. Try "SOUK10"');
            setCouponApplied(false);
        }
    };

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
    const freeShippingThreshold = 6000;
    const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;
    const shippingEstimate = qualifiesForFreeShipping ? 0 : 400;
    const finalTotal = subtotal - discount + shippingEstimate;

    const totalCartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <StorefrontLayout cartCount={totalCartCount}>
            <Head title="Your Shopping Cart - DzAvenue Boutique" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            Shopping Cart ({totalCartCount})
                        </h1>
                        <p className="text-xs text-muted-foreground mt-1">
                            Review your items before proceeding to express Cash on Delivery.
                        </p>
                    </div>

                    <Link
                        href="/storefront"
                        className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

                {items.length === 0 ? (
                    <div className="p-12 text-center border border-dashed border-border rounded-2xl space-y-4 max-w-md mx-auto">
                        <div className="size-14 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                            <ShoppingBag className="size-6" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-semibold text-base">Your cart is empty</h3>
                            <p className="text-xs text-muted-foreground">
                                Looks like you haven't added any products yet.
                            </p>
                        </div>
                        <Link href="/storefront">
                            <Button className="mt-2 text-xs">Explore Trending Products</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left: Items List */}
                        <div className="lg:col-span-7 space-y-4">
                            {/* Free Shipping Progress Alert */}
                            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between gap-4 text-xs">
                                <div className="flex items-center gap-2.5">
                                    <Truck className="size-4 text-primary shrink-0" />
                                    <span>
                                        {qualifiesForFreeShipping ? (
                                            <strong className="text-emerald-600 dark:text-emerald-400">
                                                🎉 You unlocked Free Delivery across all 58 Wilayas!
                                            </strong>
                                        ) : (
                                            <span>
                                                Add{' '}
                                                <strong>
                                                    {(freeShippingThreshold - subtotal).toLocaleString()} DZD
                                                </strong>{' '}
                                                more to get Free Delivery!
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <span className="font-mono text-[11px] font-bold text-primary">
                                    {qualifiesForFreeShipping ? 'FREE' : '400 DZD'}
                                </span>
                            </div>

                            {/* Item Rows */}
                            <div className="border border-border/80 rounded-2xl divide-y divide-border/60 bg-card overflow-hidden shadow-xs">
                                {items.map((item) => (
                                    <div key={item.id} className="p-4 sm:p-5 flex gap-4 items-center">
                                        {/* Product Thumbnail */}
                                        <div className="size-20 sm:size-24 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/60">
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        {/* Info & Options */}
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-muted-foreground hover:text-red-500 p-1 transition-colors"
                                                    title="Remove item"
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span>Size: <strong>{item.size}</strong></span>
                                                <span className="size-1 rounded-full bg-border" />
                                                <span>Color: <strong>{item.color}</strong></span>
                                            </div>

                                            <div className="pt-2 flex items-center justify-between gap-2">
                                                {/* Quantity changer */}
                                                <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        <Minus className="size-3" />
                                                    </button>
                                                    <span className="w-7 text-center text-xs font-semibold">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        <Plus className="size-3" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <span className="text-sm font-bold text-foreground">
                                                        {(item.price * item.quantity).toLocaleString()} DZD
                                                    </span>
                                                    {item.compare_price > item.price && (
                                                        <span className="text-[10px] text-muted-foreground line-through block">
                                                            {(item.compare_price * item.quantity).toLocaleString()} DZD
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground pt-2">
                                <div className="p-3 rounded-xl border border-border/60 bg-muted/20 flex items-center gap-2.5">
                                    <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
                                    <span>No advance card payment needed</span>
                                </div>
                                <div className="p-3 rounded-xl border border-border/60 bg-muted/20 flex items-center gap-2.5">
                                    <Clock className="size-4 text-primary shrink-0" />
                                    <span>24-48h Algerian parcel delivery</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Order Summary & Checkout Action */}
                        <div className="lg:col-span-5 space-y-4">
                            <Card className="border border-border/80 shadow-xs">
                                <CardHeader className="pb-3 border-b border-border/60">
                                    <CardTitle className="text-base font-semibold">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="p-5 space-y-4">
                                    {/* Subtotal */}
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Subtotal ({totalCartCount} items)</span>
                                        <span className="font-medium text-foreground">{subtotal.toLocaleString()} DZD</span>
                                    </div>

                                    {/* Shipping */}
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Truck className="size-3.5 text-primary" />
                                            Estimated Delivery (Algeria)
                                        </span>
                                        <span className="font-medium text-foreground">
                                            {qualifiesForFreeShipping ? (
                                                <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                                            ) : (
                                                `+${shippingEstimate} DZD`
                                            )}
                                        </span>
                                    </div>

                                    {/* Discount if applied */}
                                    {couponApplied && (
                                        <div className="flex justify-between text-xs text-emerald-600 font-medium">
                                            <span>Promo Discount (10%)</span>
                                            <span>-{discount.toLocaleString()} DZD</span>
                                        </div>
                                    )}

                                    {/* Promo Code Input */}
                                    <form onSubmit={applyCoupon} className="pt-2 border-t border-border/60 space-y-2">
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                                                <Input
                                                    placeholder="Promo code (try SOUK10)"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                    className="pl-8 h-9 text-xs uppercase"
                                                />
                                            </div>
                                            <Button type="submit" variant="secondary" size="sm" className="h-9 text-xs">
                                                Apply
                                            </Button>
                                        </div>
                                        {couponApplied && (
                                            <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                                                <Check className="size-3" /> Coupon SOUK10 applied successfully!
                                            </p>
                                        )}
                                        {couponError && (
                                            <p className="text-[11px] text-red-500">{couponError}</p>
                                        )}
                                    </form>

                                    {/* Total Balance */}
                                    <div className="pt-3 border-t border-border flex justify-between items-baseline">
                                        <div>
                                            <span className="text-sm font-bold text-foreground">Estimated Total</span>
                                            <span className="block text-[10px] text-muted-foreground">
                                                To be paid in cash at door
                                            </span>
                                        </div>
                                        <span className="text-xl font-black text-primary">
                                            {finalTotal.toLocaleString()} DZD
                                        </span>
                                    </div>

                                    {/* CTA Button */}
                                    <Link href="/storefront/checkout" className="block pt-2">
                                        <Button size="lg" className="w-full h-11 text-sm font-semibold gap-2 shadow-md">
                                            <span>Proceed to 1-Click COD</span>
                                            <ArrowRight className="size-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </StorefrontLayout>
    );
}
