import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBag,
    Search,
    Sun,
    Moon,
    PhoneCall,
    Truck,
    ShieldCheck,
    RotateCcw,
    Menu,
    X,
    Heart,
    MessageCircle,
    ArrowRight,
    MapPin,
    CheckCircle2,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export interface StorefrontLayoutProps {
    children: React.ReactNode;
    store?: {
        name: string;
        tagline?: string;
        phone?: string;
        whatsapp?: string;
        wilaya?: string;
        logo_url?: string | null;
        announcement?: string;
        free_shipping_threshold?: number;
    };
    cartCount?: number;
}

export default function StorefrontLayout({
    children,
    store = {
        name: 'DzAvenue Boutique',
        tagline: 'Curated premium fashion & lifestyle directly delivered to your door across 58 wilayas',
        phone: '+213 (0) 555 12 34 56',
        whatsapp: '213555123456',
        wilaya: 'Algiers (Alger)',
        announcement: '⚡ Free Express Home Delivery in Algiers on all orders above 6,000 DZD • Cash On Delivery Available',
        free_shipping_threshold: 6000,
    },
    cartCount = 2,
}: StorefrontLayoutProps) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans selection:bg-primary selection:text-primary-foreground">
            {/* Top Announcement Bar */}
            {store.announcement && (
                <aside aria-label="Announcement" className="bg-primary text-primary-foreground text-xs py-2 px-4 transition-colors">
                    <div className="max-w-7xl mx-auto flex items-center justify-between text-center gap-2">
                        <div className="flex-1 flex items-center justify-center gap-2 font-medium tracking-tight">
                            <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{store.announcement}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-4 text-xs opacity-80">
                            <span className="flex items-center gap-1">
                                <Truck className="size-3.5" /> 58 Wilayas Coverage
                            </span>
                            <span className="flex items-center gap-1">
                                <ShieldCheck className="size-3.5" /> 100% Guaranteed Cash on Delivery
                            </span>
                        </div>
                    </div>
                </aside>
            )}

            {/* Main Navigation Header */}
            <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 gap-4">
                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                            >
                                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                            </Button>
                        </div>

                        {/* Store Brand / Logo */}
                        <div className="flex items-center gap-3">
                            <Link href="/storefront" className="flex items-center gap-2.5 group">
                                <div className="size-9 rounded-xl bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold text-lg shadow-sm shadow-primary/20 group-hover:scale-105 transition-transform">
                                    {store.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-base tracking-tight group-hover:text-primary transition-colors">
                                        {store.name}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground hidden sm:block uppercase tracking-wider font-medium">
                                        Verified COD Merchant
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Center Search Bar (Minimalist Input) */}
                        <div className="hidden md:flex flex-1 max-w-md mx-6">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    type="search"
                                    placeholder="Search sneakers, fragrances, smart watches..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 h-9 bg-muted/50 border-border/60 text-sm focus-visible:bg-background focus-visible:ring-1"
                                />
                            </div>
                        </div>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                            <Link href="/storefront" className="text-foreground hover:text-primary transition-colors">
                                Home
                            </Link>
                            <Link href="#featured" className="hover:text-foreground transition-colors">
                                Best Sellers
                            </Link>
                            <Link href="#categories" className="hover:text-foreground transition-colors">
                                Collections
                            </Link>
                            <Link href="#guarantees" className="hover:text-foreground transition-colors">
                                Delivery & FAQ
                            </Link>
                        </nav>

                        {/* Right Utility Actions */}
                        <div className="flex items-center gap-2">
                            {/* Theme Toggle Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-full"
                                title={`Switch to ${resolvedAppearance === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                {resolvedAppearance === 'dark' ? (
                                    <Sun className="size-4 text-amber-400" />
                                ) : (
                                    <Moon className="size-4 text-slate-700" />
                                )}
                            </Button>

                            {/* Wishlist Link (visual only) */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden sm:inline-flex h-9 w-9 text-muted-foreground hover:text-foreground rounded-full"
                                title="Saved items"
                            >
                                <Heart className="size-4" />
                            </Button>

                            {/* Cart / Fast Checkout Bag */}
                            <Link href="/storefront/checkout">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="relative h-9 px-3 gap-2 border-border/70 hover:bg-muted font-medium"
                                >
                                    <ShoppingBag className="size-4" />
                                    <span className="hidden sm:inline text-xs">Order</span>
                                    {cartCount > 0 && (
                                        <Badge
                                            variant="default"
                                            className="px-1.5 py-0 text-[10px] h-4.5 rounded-full bg-primary text-primary-foreground font-semibold"
                                        >
                                            {cartCount}
                                        </Badge>
                                    )}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border bg-background px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-150">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 h-9 text-sm"
                            />
                        </div>
                        <div className="flex flex-col space-y-2 text-sm font-medium pt-1">
                            <Link
                                href="/storefront"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-2 py-1.5 rounded-md text-foreground hover:bg-muted"
                            >
                                Home
                            </Link>
                            <Link
                                href="#featured"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                                Best Sellers
                            </Link>
                            <Link
                                href="#categories"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                                Collections
                            </Link>
                            <Link
                                href="#guarantees"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                                Delivery Info & Returns
                            </Link>
                        </div>
                        <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <PhoneCall className="size-3.5 text-emerald-600" />
                                {store.phone}
                            </span>
                            <span className="font-mono">{store.wilaya}</span>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="flex-1">{children}</main>

            {/* Trust & Guarantee Banner */}
            <section id="guarantees" className="border-t border-border/60 bg-muted/20 py-8 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-start gap-3.5">
                            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <Truck className="size-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold tracking-tight">Express Delivery</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Direct to home or stopdesk pickup in 58 Algerian wilayas in 24-48h.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5">
                            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <ShieldCheck className="size-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold tracking-tight">Pay on Delivery (COD)</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Inspect your package with the courier before paying in cash. No risk.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5">
                            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <PhoneCall className="size-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold tracking-tight">Phone Confirmation</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Our dedicated call center team calls you immediately to confirm address & size.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5">
                            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <RotateCcw className="size-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold tracking-tight">Hassle-Free Exchange</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Size doesn't fit? We replace it swiftly with our courier partner.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border bg-background text-foreground transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                        {/* Store Info */}
                        <div className="md:col-span-1 space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="size-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                    {store.name.charAt(0)}
                                </div>
                                <span className="font-semibold text-base tracking-tight">{store.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {store.tagline}
                            </p>
                            <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                                <MapPin className="size-3.5 text-primary" />
                                <span>Based in {store.wilaya}, Algeria</span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-3 text-xs">
                            <p className="font-semibold uppercase tracking-wider text-foreground text-[11px]">
                                Store Navigation
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <Link href="/storefront" className="hover:text-foreground transition-colors">
                                        All Products
                                    </Link>
                                </li>
                                <li>
                                    <a href="#featured" className="hover:text-foreground transition-colors">
                                        New Arrivals & Offers
                                    </a>
                                </li>
                                <li>
                                    <a href="#categories" className="hover:text-foreground transition-colors">
                                        Trending Collections
                                    </a>
                                </li>
                                <li>
                                    <Link href="/storefront/checkout" className="hover:text-foreground transition-colors">
                                        Express Checkout (COD)
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Customer Care */}
                        <div className="space-y-3 text-xs">
                            <p className="font-semibold uppercase tracking-wider text-foreground text-[11px]">
                                Customer Support
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <PhoneCall className="size-3 text-emerald-600" />
                                    <span>{store.phone}</span>
                                </li>
                                <li>Sunday – Thursday: 09:00 to 18:00</li>
                                <li>Friday – Saturday: 14:00 to 20:00</li>
                                <li className="pt-1 text-[11px] text-muted-foreground/80">
                                    Orders dispatched via Yalidine & ZR Express daily.
                                </li>
                            </ul>
                        </div>

                        {/* Order Safety & Souknet Badge */}
                        <div className="space-y-3">
                            <p className="font-semibold uppercase tracking-wider text-foreground text-[11px]">
                                Trust & Security
                            </p>
                            <div className="p-3.5 rounded-xl border border-border/80 bg-muted/40 space-y-2">
                                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                                    <CheckCircle2 className="size-4 text-emerald-500" />
                                    <span>Souknet Verified Store</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-snug">
                                    Powered by the Algerian COD Commerce Network. Real-time courier dispatch and phone confirmation guarantee.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <p>© {new Date().getFullYear()} {store.name}. All rights reserved.</p>
                        <div className="flex items-center gap-4 text-xs">
                            <span className="text-muted-foreground/80">Currency: <strong>DZD (Algerian Dinar)</strong></span>
                            <span className="size-1 rounded-full bg-border" />
                            <span>Powered by <strong>Souknet</strong></span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Quick Contact Button (Algerian E-Commerce Standard) */}
            {store.whatsapp && (
                <aside aria-label="Customer Support Chat" className="fixed bottom-5 right-5 z-40 group">
                    <a
                        href={`https://wa.me/${store.whatsapp}?text=Hello!%20I%20have%20a%20question%20about%20an%20order`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all transform hover:-translate-y-0.5 text-xs font-medium"
                    >
                        <MessageCircle className="size-4.5" />
                        <span className="hidden sm:inline font-semibold">Chat with Us</span>
                    </a>
                </aside>
            )}
        </div>
    );
}
