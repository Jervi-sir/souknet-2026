import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
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
    ChevronDown,
} from 'lucide-react';
import StorefrontLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

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
        alt: 'Side profile sole cushion detail',
    },
    {
        id: '3',
        url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
        alt: 'Top down perspective and lacing system',
    },
    {
        id: '4',
        url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
        alt: 'Lifestyle outdoor wearing view',
    },
];

const SIZES = ['40', '41', '42', '43', '44', '45'];

const COLORS = [
    { name: 'Carmine Red', hex: '#dc2626' },
    { name: 'Obsidian Black', hex: '#0f172a' },
    { name: 'Titanium White', hex: '#e2e8f0' },
];

const BUNDLE_OPTIONS: ProductBundle[] = [
    {
        id: 'single',
        title: 'Buy 1 Pair',
        quantity: 1,
        price: 5900,
        compare_price: 7800,
        discount_label: 'Save 1,900 DZD',
        free_shipping: false,
    },
    {
        id: 'duo',
        title: 'Buy 2 Pairs (Most Popular)',
        badge: 'Recommended',
        quantity: 2,
        price: 9900,
        compare_price: 15600,
        discount_label: 'Save 5,700 DZD',
        free_shipping: true,
    },
    {
        id: 'family',
        title: 'Buy 3 Pairs (Family Pack)',
        badge: 'Best Value',
        quantity: 3,
        price: 13900,
        compare_price: 23400,
        discount_label: 'Save 9,500 DZD',
        free_shipping: true,
    },
];

export default function StorefrontProduct() {
    // Media Gallery State
    const [selectedImage, setSelectedImage] = useState<string>(PRODUCT_IMAGES[0].url);

    // Variant Selectors
    const [selectedSize, setSelectedSize] = useState<string>('42');
    const [selectedColor, setSelectedColor] = useState<string>('Carmine Red');
    const [selectedBundle, setSelectedBundle] = useState<ProductBundle>(BUNDLE_OPTIONS[1]);
    const [quantity, setQuantity] = useState<number>(1);

    // Inline Express COD Checkout Form State
    const [fullName, setFullName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [wilaya, setWilaya] = useState<string>('16 - Algiers');
    const [commune, setCommune] = useState<string>('Bab Ezzouar');
    const [deliveryType, setDeliveryType] = useState<'home' | 'stopdesk'>('home');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const shippingCost = selectedBundle.free_shipping
        ? 0
        : deliveryType === 'home'
          ? 400
          : 250;
    const finalTotal = selectedBundle.price + shippingCost;

    const handleQuickOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !phone.trim()) {
            alert('Please enter your full name and phone number to confirm your order.');
            return;
        }
        setIsSubmitted(true);
    };

    return (
        <StorefrontLayout cartCount={1}>
            <Head title="AirPulse Breathable Sport Running Shoes - DzAvenue Boutique" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                    <Link href="/storefront" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="size-3" />
                    <Link href="/storefront#featured" className="hover:text-foreground transition-colors">
                        Footwear & Sports
                    </Link>
                    <ChevronRight className="size-3" />
                    <span className="text-foreground font-medium truncate">
                        AirPulse Running Shoes
                    </span>
                </nav>

                {/* Main Product Layout: 2 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Column: Gallery */}
                    <div className="lg:col-span-6 space-y-4">
                        {/* Main Image Stage */}
                        <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-border/80 bg-muted shadow-sm">
                            <img
                                src={selectedImage}
                                alt="AirPulse Running Shoes"
                                className="h-full w-full object-cover object-center transition-all duration-300"
                            />
                            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                                <Badge className="bg-red-600 hover:bg-red-600 text-white font-semibold flex items-center gap-1 shadow-sm">
                                    <Flame className="size-3" /> Best Seller 2026
                                </Badge>
                                <Badge variant="secondary" className="backdrop-blur-md bg-background/80 font-medium">
                                    Cash On Delivery Guaranteed
                                </Badge>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-3">
                            {PRODUCT_IMAGES.map((img) => (
                                <button
                                    key={img.id}
                                    type="button"
                                    onClick={() => setSelectedImage(img.url)}
                                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                                        selectedImage === img.url
                                            ? 'border-primary ring-2 ring-primary/20 scale-98'
                                            : 'border-border/80 opacity-70 hover:opacity-100 hover:border-muted-foreground'
                                    }`}
                                >
                                    <img
                                        src={img.url}
                                        alt={img.alt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Visual Trust Guarantee Grid */}
                        <div className="p-4 rounded-xl border border-border/70 bg-muted/20 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-muted-foreground mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                                <span>Inspect before paying</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RotateCcw className="size-4 text-emerald-500 shrink-0" />
                                <span>Free size exchange</span>
                            </div>
                            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                                <Truck className="size-4 text-emerald-500 shrink-0" />
                                <span>24-48h Yalidine dispatch</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Title, Bundle Selector & Direct COD Order Form */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* Title & Reviews */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="size-3.5 fill-current" />
                                    ))}
                                </div>
                                <span className="text-xs font-semibold text-foreground">4.9 / 5.0</span>
                                <span className="text-xs text-muted-foreground">(142 verified Algerian buyers)</span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                                AirPulse Breathable Sport Running Shoes
                            </h1>

                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                Engineered with anti-slip aerodynamic shock-absorption soles. Ultra-light breathable mesh designed for everyday wear, long walks, and sport performance across Algerian terrain.
                            </p>
                        </div>

                        {/* Bundles / Pack Offers (Crucial for Algerian COD AOV boost) */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-foreground uppercase tracking-wider">
                                    Special Pack Deals (Save Extra)
                                </span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                    Free Delivery on 2+ Pairs
                                </span>
                            </div>

                            <div className="space-y-2">
                                {BUNDLE_OPTIONS.map((bundle) => {
                                    const isSelected = selectedBundle.id === bundle.id;
                                    return (
                                        <div
                                            key={bundle.id}
                                            onClick={() => setSelectedBundle(bundle)}
                                            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                                                isSelected
                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                                    : 'border-border/80 hover:border-foreground/40 bg-card'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`size-4 rounded-full border flex items-center justify-center ${
                                                        isSelected
                                                            ? 'border-primary bg-primary text-primary-foreground'
                                                            : 'border-muted-foreground'
                                                    }`}
                                                >
                                                    {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-foreground">
                                                            {bundle.title}
                                                        </span>
                                                        {bundle.badge && (
                                                            <Badge
                                                                variant="default"
                                                                className="text-[10px] px-1.5 py-0 bg-emerald-600"
                                                            >
                                                                {bundle.badge}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <span className="text-[11px] text-muted-foreground">
                                                        {bundle.discount_label}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-sm font-bold text-foreground">
                                                    {bundle.price.toLocaleString()} DZD
                                                </div>
                                                <div className="text-[10px] text-muted-foreground line-through">
                                                    {bundle.compare_price.toLocaleString()} DZD
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Variants: Color & Size */}
                        <div className="space-y-4 pt-2">
                            {/* Color Selection */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-foreground">Color: {selectedColor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {COLORS.map((color) => (
                                        <button
                                            key={color.name}
                                            type="button"
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-all ${
                                                selectedColor === color.name
                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary text-foreground'
                                                    : 'border-border hover:border-foreground/50 text-muted-foreground'
                                            }`}
                                        >
                                            <span
                                                className="size-3 rounded-full border border-black/20"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            <span>{color.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-foreground">Select Size (Pointure EU)</span>
                                    <span className="text-muted-foreground">True to size fit</span>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                    {SIZES.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setSelectedSize(size)}
                                            className={`h-10 rounded-xl text-xs font-bold border transition-all ${
                                                selectedSize === size
                                                    ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                                                    : 'border-border/80 bg-card text-muted-foreground hover:border-foreground'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 1-Click Embedded COD Form Directly on Product Page */}
                        <div className="pt-4 border-t border-border/80">
                            {isSubmitted ? (
                                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in zoom-in-95">
                                    <div className="size-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center">
                                        <Check className="size-6" />
                                    </div>
                                    <h3 className="text-base font-bold text-foreground">Order Successfully Registered!</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Thank you <strong>{fullName}</strong>. Our call center will ring you at <strong>{phone}</strong> to confirm your shoe size ({selectedSize}) and delivery address.
                                    </p>
                                    <div className="pt-2">
                                        <Link href="/storefront">
                                            <Button variant="outline" size="sm" className="text-xs">
                                                Continue Shopping
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleQuickOrder} className="p-5 rounded-2xl border-2 border-primary/20 bg-muted/20 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag className="size-4 text-primary" />
                                            <h3 className="font-bold text-sm tracking-tight text-foreground">
                                                Fast 1-Click Order (Cash on Delivery)
                                            </h3>
                                        </div>
                                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                            ⚡ No online payment required
                                        </span>
                                    </div>

                                    {/* Name & Phone */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <Label className="text-[11px] font-medium">Nom & Prénom *</Label>
                                            <Input
                                                required
                                                placeholder="e.g. Youcef Mahrez"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="h-9 text-xs bg-background"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[11px] font-medium">Numéro de Téléphone *</Label>
                                            <Input
                                                required
                                                type="tel"
                                                placeholder="05 / 06 / 07 XX XX XX"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="h-9 text-xs font-mono bg-background"
                                            />
                                        </div>
                                    </div>

                                    {/* Wilaya & Delivery Type */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <Label className="text-[11px] font-medium">Wilaya (58 Provinces) *</Label>
                                            <div className="relative">
                                                <select
                                                    value={wilaya}
                                                    onChange={(e) => setWilaya(e.target.value)}
                                                    className="w-full h-9 px-3 pr-8 rounded-md border border-input bg-background text-xs appearance-none"
                                                >
                                                    <option value="16 - Algiers">16 - Alger</option>
                                                    <option value="31 - Oran">31 - Oran</option>
                                                    <option value="25 - Constantine">25 - Constantine</option>
                                                    <option value="19 - Sétif">19 - Sétif</option>
                                                    <option value="09 - Blida">09 - Blida</option>
                                                    <option value="15 - Tizi Ouzou">15 - Tizi Ouzou</option>
                                                    <option value="35 - Boumerdès">35 - Boumerdès</option>
                                                    <option value="23 - Annaba">23 - Annaba</option>
                                                    <option value="13 - Tlemcen">13 - Tlemcen</option>
                                                </select>
                                                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-[11px] font-medium">Type de Livraison</Label>
                                            <div className="grid grid-cols-2 gap-2 h-9">
                                                <button
                                                    type="button"
                                                    onClick={() => setDeliveryType('home')}
                                                    className={`rounded-md border text-[11px] font-medium transition-all ${
                                                        deliveryType === 'home'
                                                            ? 'border-primary bg-primary text-primary-foreground'
                                                            : 'border-border bg-background text-muted-foreground'
                                                    }`}
                                                >
                                                    À Domicile
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeliveryType('stopdesk')}
                                                    className={`rounded-md border text-[11px] font-medium transition-all ${
                                                        deliveryType === 'stopdesk'
                                                            ? 'border-primary bg-primary text-primary-foreground'
                                                            : 'border-border bg-background text-muted-foreground'
                                                    }`}
                                                >
                                                    Bureau (Stopdesk)
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total and Order Button */}
                                    <div className="pt-2 border-t border-border/80 flex items-center justify-between">
                                        <div>
                                            <span className="text-[11px] text-muted-foreground block">
                                                Total to pay at delivery:
                                            </span>
                                            <span className="text-base font-extrabold text-primary">
                                                {finalTotal.toLocaleString()} DZD
                                            </span>
                                            {selectedBundle.free_shipping && (
                                                <span className="text-[10px] text-emerald-600 block font-medium">
                                                    (Free Shipping Applied)
                                                </span>
                                            )}
                                        </div>

                                        <Button type="submit" size="lg" className="h-11 px-6 font-semibold gap-2 shadow-md">
                                            <span>Order Now (COD)</span>
                                            <ArrowRight className="size-4" />
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </StorefrontLayout>
    );
}
