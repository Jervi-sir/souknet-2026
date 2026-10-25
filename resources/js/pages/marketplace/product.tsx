import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Store,
    ShoppingBag,
    Star,
    Truck,
    ShieldCheck,
    PhoneCall,
    RotateCcw,
    Check,
    ArrowRight,
    Sparkles,
    Flame,
    Share2,
    Heart,
    Clock,
    ChevronRight,
    Minus,
    Plus,
    CheckCircle2,
    Building2,
    MapPin,
    PackageCheck,
    BadgeCheck,
    HelpCircle,
    MessageCircle,
    Tag,
} from 'lucide-react';
import MarketplaceLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductImage {
    id: string;
    url: string;
    alt: string;
}

interface ProductBundle {
    id: string;
    title: string;
    badge?: string;
    quantity: number;
    price: number;
    compare_price: number;
    discount_label: string;
    free_shipping: boolean;
}

const PRODUCT_IMAGES: ProductImage[] = [
    {
        id: '1',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
        alt: 'AirPulse Breathable Sport Running Shoes - Carmine Red Main View',
    },
    {
        id: '2',
        url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
        alt: 'AirPulse Running Shoes - Side Cushioning View',
    },
    {
        id: '3',
        url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
        alt: 'AirPulse Running Shoes - Outsole Grip View',
    },
];

const BUNDLE_OPTIONS: ProductBundle[] = [
    {
        id: 'bundle-1',
        title: 'Single Pair (1x)',
        quantity: 1,
        price: 5900,
        compare_price: 7500,
        discount_label: 'Save 1,600 DZD',
        free_shipping: false,
    },
    {
        id: 'bundle-2',
        title: 'Duo Pack (2x Pairs)',
        badge: 'Most Popular · Free Shipping',
        quantity: 2,
        price: 10800,
        compare_price: 15000,
        discount_label: 'Save 4,200 DZD + Free Delivery',
        free_shipping: true,
    },
    {
        id: 'bundle-3',
        title: 'Family Pack (3x Pairs)',
        badge: 'Best Value',
        quantity: 3,
        price: 15300,
        compare_price: 22500,
        discount_label: 'Save 7,200 DZD + Free Delivery',
        free_shipping: true,
    },
];

const AVAILABLE_SIZES = ['40', '41', '42', '43', '44', '45'];
const AVAILABLE_COLORS = [
    { name: 'Carmine Red', hex: '#dc2626' },
    { name: 'Triple Black', hex: '#0f172a' },
    { name: 'Navy Blue', hex: '#1e3a8a' },
    { name: 'Pure White', hex: '#f8fafc' },
];

const WILAYAS_LIST = [
    { code: '16', name: '16 - Alger (Algiers)', home_fee: 400, stopdesk_fee: 250 },
    { code: '31', name: '31 - Oran', home_fee: 650, stopdesk_fee: 350 },
    { code: '25', name: '25 - Constantine', home_fee: 650, stopdesk_fee: 350 },
    { code: '19', name: '19 - Sétif', home_fee: 600, stopdesk_fee: 350 },
    { code: '06', name: '06 - Béjaïa', home_fee: 650, stopdesk_fee: 350 },
    { code: '09', name: '09 - Blida', home_fee: 500, stopdesk_fee: 300 },
];

export default function MarketplaceProduct() {
    const [selectedImage, setSelectedImage] = useState(PRODUCT_IMAGES[0]);
    const [selectedBundle, setSelectedBundle] = useState<ProductBundle>(BUNDLE_OPTIONS[1]); // Default to Pack 2 (Free Shipping)
    const [selectedSize, setSelectedSize] = useState('42');
    const [selectedColor, setSelectedColor] = useState(AVAILABLE_COLORS[0]);

    // 1-Click Express COD Form
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [selectedWilaya, setSelectedWilaya] = useState('16');
    const [commune, setCommune] = useState('');
    const [deliveryType, setDeliveryType] = useState<'home' | 'stopdesk'>('home');
    const [orderSubmitted, setOrderSubmitted] = useState(false);

    const activeWilayaObj = WILAYAS_LIST.find((w) => w.code === selectedWilaya) || WILAYAS_LIST[0];
    const shippingFee = selectedBundle.free_shipping
        ? 0
        : deliveryType === 'home'
        ? activeWilayaObj.home_fee
        : activeWilayaObj.stopdesk_fee;

    const totalToPay = selectedBundle.price + shippingFee;

    const handleQuickOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderSubmitted(true);
    };

    return (
        <MarketplaceLayout title="AirPulse Breathable Sport Running Shoes - Souknet Marketplace">
            <Head title="AirPulse Running Shoes - DzAvenue Boutique | Souknet Marketplace" />

            <div className="space-y-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Link href="/marketplace" className="hover:text-foreground">
                        Marketplace
                    </Link>
                    <ChevronRight className="size-3" />
                    <Link href="/marketplace/explore" className="hover:text-foreground">
                        Footwear & Sneakers
                    </Link>
                    <ChevronRight className="size-3" />
                    <Link href="/storefront" className="hover:text-foreground font-medium text-foreground">
                        DzAvenue Boutique
                    </Link>
                    <ChevronRight className="size-3" />
                    <span className="truncate max-w-[200px] text-foreground font-semibold">
                        AirPulse Breathable Shoes
                    </span>
                </nav>

                {/* Main 2-Column Product Detail Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Image Gallery (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-muted/20 aspect-square flex items-center justify-center shadow-xs">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.alt}
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                            <Badge className="absolute top-3 left-3 bg-red-600 text-white font-bold text-xs uppercase shadow-sm">
                                Best Seller · COD Available
                            </Badge>
                            <button
                                className="absolute top-3 right-3 size-9 rounded-full bg-background/80 hover:bg-background text-foreground flex items-center justify-center shadow-xs transition-colors"
                                title="Add to Wishlist"
                            >
                                <Heart className="size-4" />
                            </button>
                        </div>

                        {/* Thumbnails Row */}
                        <div className="grid grid-cols-3 gap-3">
                            {PRODUCT_IMAGES.map((img) => (
                                <button
                                    key={img.id}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative rounded-xl overflow-hidden border-2 aspect-square transition-all ${
                                        selectedImage.id === img.id
                                            ? 'border-primary ring-2 ring-primary/20'
                                            : 'border-border/80 hover:border-muted-foreground/40'
                                    }`}
                                >
                                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Merchant Storefront Showcase Card */}
                        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                                            DZ
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5 font-bold text-sm text-foreground">
                                                <span>DzAvenue Boutique</span>
                                                <BadgeCheck className="size-4 text-blue-500" />
                                            </div>
                                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                                <MapPin className="size-3" />
                                                Alger (Cheraga Hub) · 1,420+ Orders
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                                        <Star className="size-3.5 fill-amber-500" />
                                        <span>4.9</span>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-muted-foreground">
                                        Ships with Yalidine Express within 24h
                                    </span>
                                    <Link
                                        href="/storefront"
                                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                                    >
                                        <span>Visit Store</span>
                                        <ArrowRight className="size-3" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Details, Pack Bundles & 1-Click COD Checkout (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Title & Reviews */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs font-semibold border-primary/30 text-primary">
                                    100% Paiement à la livraison
                                </Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="size-3" />
                                    In Stock · 18 Pairs Left in Algiers Warehouse
                                </span>
                            </div>

                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                                AirPulse Ultra-Breathable Running Shoes (2026 Edition)
                            </h1>

                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1 text-amber-500 font-bold">
                                    <Star className="size-3.5 fill-amber-500" />
                                    <span>4.9</span>
                                    <span className="text-muted-foreground font-normal">(84 verified Algerian reviews)</span>
                                </div>
                                <span>·</span>
                                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                    SKU: AP-42-RED
                                </span>
                            </div>
                        </div>

                        {/* Pricing Banner */}
                        <div className="p-4 rounded-xl border border-border/80 bg-muted/20 flex items-baseline justify-between">
                            <div>
                                <span className="text-xs text-muted-foreground block">Price (Prix Unitaire)</span>
                                <div className="flex items-baseline gap-2 mt-0.5">
                                    <span className="text-2xl font-extrabold font-mono text-foreground">
                                        {selectedBundle.price.toLocaleString()} DZD
                                    </span>
                                    <span className="text-sm line-through text-muted-foreground font-mono">
                                        {selectedBundle.compare_price.toLocaleString()} DZD
                                    </span>
                                </div>
                            </div>
                            <Badge className="bg-emerald-600 text-white font-semibold text-xs">
                                {selectedBundle.discount_label}
                            </Badge>
                        </div>

                        {/* Pack Deals Bundle Selector */}
                        <div className="space-y-2.5">
                            <Label className="text-xs font-semibold text-foreground uppercase tracking-wider block">
                                Choose Bundle Deal (Pack Promo)
                            </Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                {BUNDLE_OPTIONS.map((bundle) => {
                                    const isSelected = selectedBundle.id === bundle.id;
                                    return (
                                        <button
                                            key={bundle.id}
                                            type="button"
                                            onClick={() => setSelectedBundle(bundle)}
                                            className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                                                isSelected
                                                    ? 'border-primary bg-primary/5 shadow-xs'
                                                    : 'border-border/80 hover:border-muted-foreground/40 bg-card'
                                            }`}
                                        >
                                            {bundle.badge && (
                                                <span className="absolute -top-2.5 left-3 text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary text-primary-foreground uppercase shadow-xs">
                                                    {bundle.badge}
                                                </span>
                                            )}
                                            <div className="font-bold text-xs text-foreground mt-1">
                                                {bundle.title}
                                            </div>
                                            <div className="font-mono font-bold text-sm text-foreground mt-1">
                                                {bundle.price.toLocaleString()} DZD
                                            </div>
                                            <div className="text-[10px] text-muted-foreground mt-0.5">
                                                {bundle.free_shipping ? 'Free Delivery (Gratuit)' : '+ Shipping fee'}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Variants: Size & Color */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Size Selection */}
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center justify-between">
                                    <span>EU Size (Pointure)</span>
                                    <span className="text-[11px] font-normal text-primary">Size Chart Guide</span>
                                </Label>
                                <div className="grid grid-cols-6 gap-1.5">
                                    {AVAILABLE_SIZES.map((sz) => (
                                        <button
                                            key={sz}
                                            type="button"
                                            onClick={() => setSelectedSize(sz)}
                                            className={`h-9 rounded-lg border text-xs font-mono font-bold transition-all ${
                                                selectedSize === sz
                                                    ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                                                    : 'border-border bg-card text-foreground hover:bg-muted'
                                            }`}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-foreground uppercase tracking-wider block">
                                    Color: <span className="font-normal text-muted-foreground">{selectedColor.name}</span>
                                </Label>
                                <div className="flex items-center gap-2 pt-1">
                                    {AVAILABLE_COLORS.map((clr) => (
                                        <button
                                            key={clr.name}
                                            type="button"
                                            onClick={() => setSelectedColor(clr)}
                                            className={`size-7 rounded-full border-2 transition-all flex items-center justify-center ${
                                                selectedColor.name === clr.name
                                                    ? 'border-primary scale-110 ring-2 ring-primary/20'
                                                    : 'border-border'
                                            }`}
                                            style={{ backgroundColor: clr.hex }}
                                            title={clr.name}
                                        >
                                            {selectedColor.name === clr.name && (
                                                <Check className={`size-3.5 ${clr.name === 'Pure White' ? 'text-black' : 'text-white'}`} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* EMBEDDED 1-CLICK COD CHECKOUT FORM */}
                        <div className="p-5 rounded-2xl border-2 border-primary/30 bg-card shadow-lg space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-border">
                                <div>
                                    <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                                        <ShoppingBag className="size-4 text-primary" />
                                        1-Click Express Cash-on-Delivery Order
                                    </span>
                                    <span className="text-[11px] text-muted-foreground block">
                                        No credit card required. Pay upon delivery in your Wilaya.
                                    </span>
                                </div>
                                <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
                                    Fast Confirmation
                                </Badge>
                            </div>

                            {orderSubmitted ? (
                                <div className="p-6 text-center space-y-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                                    <div className="size-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="size-6" />
                                    </div>
                                    <h3 className="font-bold text-base text-foreground">
                                        Order Received Successfully!
                                    </h3>
                                    <p className="text-xs text-muted-foreground max-w-md mx-auto">
                                        Thank you <strong>{customerName || 'Customer'}</strong>! An operator from{' '}
                                        <strong>DzAvenue Boutique</strong> will call you at{' '}
                                        <strong className="text-foreground">{customerPhone || 'your phone number'}</strong> within 30 minutes to confirm size <strong>{selectedSize}</strong> and dispatch your parcel via Yalidine Express.
                                    </p>
                                    <Link href="/marketplace/track">
                                        <Button size="sm" className="mt-2 text-xs">
                                            Track Order Status
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <form onSubmit={handleQuickOrder} className="space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Full Name (Nom & Prénom)</Label>
                                            <Input
                                                required
                                                placeholder="e.g. Youcef Mahrez"
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                className="h-9 text-xs mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Phone Number (Numéro Téléphone)</Label>
                                            <Input
                                                required
                                                placeholder="0555 00 00 00"
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                className="h-9 text-xs font-mono mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Wilaya (Province)</Label>
                                            <select
                                                value={selectedWilaya}
                                                onChange={(e) => setSelectedWilaya(e.target.value)}
                                                className="h-9 w-full rounded-md border border-input bg-background px-3 text-xs text-foreground focus:outline-none mt-1"
                                            >
                                                {WILAYAS_LIST.map((w) => (
                                                    <option key={w.code} value={w.code}>
                                                        {w.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Commune / Municipality</Label>
                                            <Input
                                                required
                                                placeholder="e.g. Bab Ezzouar"
                                                value={commune}
                                                onChange={(e) => setCommune(e.target.value)}
                                                className="h-9 text-xs mt-1"
                                            />
                                        </div>
                                    </div>

                                    {/* Delivery Mode Toggle */}
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <button
                                            type="button"
                                            onClick={() => setDeliveryType('home')}
                                            className={`p-2 rounded-lg border text-left text-xs transition-colors ${
                                                deliveryType === 'home'
                                                    ? 'border-primary bg-primary/10 text-primary font-bold'
                                                    : 'border-border text-muted-foreground'
                                            }`}
                                        >
                                            <span className="block font-semibold">Home Delivery</span>
                                            <span className="text-[10px] opacity-75">
                                                {selectedBundle.free_shipping ? 'Free' : `${activeWilayaObj.home_fee} DZD`}
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDeliveryType('stopdesk')}
                                            className={`p-2 rounded-lg border text-left text-xs transition-colors ${
                                                deliveryType === 'stopdesk'
                                                    ? 'border-primary bg-primary/10 text-primary font-bold'
                                                    : 'border-border text-muted-foreground'
                                            }`}
                                        >
                                            <span className="block font-semibold">Stopdesk (Bureau)</span>
                                            <span className="text-[10px] opacity-75">
                                                {selectedBundle.free_shipping ? 'Free' : `${activeWilayaObj.stopdesk_fee} DZD`}
                                            </span>
                                        </button>
                                    </div>

                                    {/* Order Total & Submit */}
                                    <div className="pt-2 border-t border-border flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] text-muted-foreground block">
                                                Total to Pay upon Delivery (COD)
                                            </span>
                                            <span className="font-mono text-xl font-extrabold text-foreground">
                                                {totalToPay.toLocaleString()} DZD
                                            </span>
                                        </div>
                                        <Button
                                            type="submit"
                                            className="h-11 px-8 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
                                        >
                                            Confirm Order (Paiement COD)
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Guarantees Box */}
                        <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground pt-2">
                            <div className="p-2 rounded-lg border border-border bg-card/40 space-y-1">
                                <CheckCircle2 className="size-4 text-emerald-600 mx-auto" />
                                <span className="font-semibold text-foreground text-[11px] block">Doorstep Inspection</span>
                                <span className="text-[10px]">Inspect before cash payment</span>
                            </div>
                            <div className="p-2 rounded-lg border border-border bg-card/40 space-y-1">
                                <RotateCcw className="size-4 text-blue-600 mx-auto" />
                                <span className="font-semibold text-foreground text-[11px] block">Size Exchange</span>
                                <span className="text-[10px]">Free size swap within 48h</span>
                            </div>
                            <div className="p-2 rounded-lg border border-border bg-card/40 space-y-1">
                                <PhoneCall className="size-4 text-amber-600 mx-auto" />
                                <span className="font-semibold text-foreground text-[11px] block">Phone Confirmation</span>
                                <span className="text-[10px]">Call center order validation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MarketplaceLayout>
    );
}
