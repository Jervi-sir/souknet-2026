import React, { useState, useRef, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Store,
    Search,
    Compass,
    Truck,
    ShoppingBag,
    ShieldCheck,
    Sun,
    Moon,
    Menu,
    X,
    MapPin,
    ArrowRight,
    Headphones,
    Building2,
    CheckCircle2,
    Phone,
    SlidersHorizontal,
    Grid,
    Flame,
    Sparkles,
    Tag,
    ChevronDown,
    ChevronRight,
    Clock,
    Zap,
    Heart,
    Percent,
    Calculator,
    PackageCheck,
    Layers,
    BadgeCheck,
    HelpCircle,
    ArrowUpRight,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface MarketplaceLayoutProps {
    children: React.ReactNode;
    title?: string;
    activeCategory?: string;
    onSelectCategory?: (category: string) => void;
}

// Major Category Tree with Icons and Item Counts across Algeria
export const MARKETPLACE_CATEGORIES = [
    { id: 'all', label: 'All Categories', icon: Grid, count: '1,420+' },
    { id: 'footwear', label: 'Footwear & Sneakers', icon: Flame, count: '380 items', badge: 'Hot' },
    { id: 'clothing', label: 'Modest Fashion & Caftans', icon: Sparkles, count: '420 items', badge: 'Trending' },
    { id: 'electronics', label: 'Phones, Smartwatches & Tech', icon: Zap, count: '290 items' },
    { id: 'accessories', label: 'Bags, Insoles & Shoe Care', icon: Tag, count: '185 items' },
    { id: 'cosmetics', label: 'Perfumes, Oils & Skincare', icon: Heart, count: '145 items' },
    { id: 'tools', label: 'Hardware & Home Tools', icon: Layers, count: '90 items' },
];

export const POPULAR_SUGGESTIONS = [
    { text: 'AirPulse Sneakers 42', category: 'Footwear', count: '18 stores' },
    { text: 'Medina Silk Hijab 3x Pack', category: 'Clothing', count: '12 stores' },
    { text: 'Titan Smartwatch Waterproof', category: 'Electronics', count: '9 stores' },
    { text: 'Sneaker Shield Crease Protector', category: 'Accessories', count: '14 stores' },
    { text: 'Karakou Algérois Moderne', category: 'Clothing', count: '8 stores' },
];

export const REGIONAL_HUBS = [
    { code: '16', name: 'Alger (Algiers)', stores: '48 stores' },
    { code: '31', name: 'Oran', stores: '29 stores' },
    { code: '25', name: 'Constantine', stores: '22 stores' },
    { code: '19', name: 'Sétif', stores: '18 stores' },
    { code: '06', name: 'Béjaïa', stores: '14 stores' },
    { code: '09', name: 'Blida', stores: '16 stores' },
    { code: '13', name: 'Tlemcen', stores: '11 stores' },
    { code: '23', name: 'Annaba', stores: '13 stores' },
];

export default function MarketplaceLayout({
    children,
    title = 'Souknet Marketplace - Huge Algerian E-Commerce Network',
    activeCategory = 'all',
    onSelectCategory,
}: MarketplaceLayoutProps) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [selectedWilayaHeader, setSelectedWilayaHeader] = useState('all');
    const [feeEstimatorOpen, setFeeEstimatorOpen] = useState(false);
    const [estimatorWilaya, setEstimatorWilaya] = useState('16');
    const [estimatorMode, setEstimatorMode] = useState<'home' | 'stopdesk'>('home');
    const searchDropdownRef = useRef<HTMLDivElement>(null);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    // Close search dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                searchDropdownRef.current &&
                !searchDropdownRef.current.contains(e.target as Node)
            ) {
                setSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Estimated delivery cost
    const getEstimatedFee = () => {
        if (estimatorWilaya === '16') return estimatorMode === 'home' ? '400 DZD' : '250 DZD';
        if (['09', '35', '42'].includes(estimatorWilaya)) return estimatorMode === 'home' ? '500 DZD' : '300 DZD';
        if (['31', '25', '19', '06'].includes(estimatorWilaya)) return estimatorMode === 'home' ? '650 DZD' : '350 DZD';
        return estimatorMode === 'home' ? '850 DZD' : '500 DZD';
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans selection:bg-primary selection:text-primary-foreground">
            {/* Top Mega Utility Bar */}
            <div className="bg-primary text-primary-foreground text-xs py-1.5 px-4 font-medium border-b border-primary/20">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 font-semibold">
                            <ShieldCheck className="size-3.5" />
                            <span>100% Cash on Delivery Across All 58 Wilayas (Paiement à la livraison)</span>
                        </span>
                        <span className="hidden md:inline-block opacity-40">|</span>
                        <span className="hidden md:inline-flex items-center gap-1 opacity-90">
                            <Truck className="size-3" />
                            <span>Official Courier Integrations: Yalidine & ZR Express</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setFeeEstimatorOpen(true)}
                            className="hidden sm:inline-flex items-center gap-1 text-[11px] underline opacity-90 hover:opacity-100"
                        >
                            <Calculator className="size-3" />
                            <span>Shipping Calculator</span>
                        </button>
                        <Link href="/marketplace/track" className="underline opacity-90 hover:opacity-100">
                            Track Parcel
                        </Link>
                        <Link href="/customer/orders" className="hidden sm:inline-block underline opacity-90 hover:opacity-100">
                            My Orders
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Header with Huge Search & Suggestion Engine */}
            <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
                    {/* Brand & Mobile Sidebar Toggle */}
                    <div className="flex items-center gap-3 shrink-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
                        >
                            <Menu className="size-5" />
                        </Button>

                        <Link href="/marketplace" className="flex items-center gap-2.5">
                            <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md shadow-primary/20">
                                <Store className="size-5" />
                            </div>
                            <div>
                                <span className="font-extrabold text-lg tracking-tight block leading-tight">
                                    Souknet<span className="text-primary font-mono text-xs ml-1 bg-primary/10 px-1.5 py-0.5 rounded">MALL</span>
                                </span>
                                <span className="text-[10px] text-muted-foreground block -mt-0.5">
                                    Algeria’s Mega COD Marketplace
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Central Huge Search Engine with Suggestions and Scope Dropdown */}
                    <div className="flex-1 max-w-2xl relative" ref={searchDropdownRef}>
                        <div className="flex items-center rounded-xl border-2 border-border/80 bg-card hover:border-primary/50 focus-within:border-primary transition-all shadow-xs overflow-hidden">
                            {/* Wilaya Filter Dropdown within Search Bar */}
                            <div className="hidden sm:flex items-center border-r border-border bg-muted/40 px-2.5 py-1 text-xs">
                                <MapPin className="size-3.5 text-muted-foreground mr-1 shrink-0" />
                                <select
                                    value={selectedWilayaHeader}
                                    onChange={(e) => setSelectedWilayaHeader(e.target.value)}
                                    className="bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer pr-1"
                                >
                                    <option value="all">58 Wilayas</option>
                                    <option value="16">16 - Alger</option>
                                    <option value="31">31 - Oran</option>
                                    <option value="25">25 - Constantine</option>
                                    <option value="19">19 - Sétif</option>
                                    <option value="06">06 - Béjaïa</option>
                                </select>
                            </div>

                            <Search className="size-4 text-muted-foreground ml-3 shrink-0" />
                            <Input
                                placeholder="Search products, brands, sneakers, hijabs, stores across Algeria..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                className="border-0 shadow-none focus-visible:ring-0 text-xs sm:text-sm h-11 bg-transparent px-3"
                            />

                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-muted-foreground hover:text-foreground p-1 mr-1"
                                >
                                    <X className="size-3.5" />
                                </button>
                            )}

                            <Link href={`/marketplace/explore?q=${encodeURIComponent(searchQuery)}`}>
                                <Button className="h-11 px-5 rounded-none font-semibold text-xs shadow-none gap-1.5">
                                    <span>Search</span>
                                </Button>
                            </Link>
                        </div>

                        {/* Interactive Suggestion Dropdown */}
                        {searchFocused && (
                            <div className="absolute top-full left-0 right-0 mt-1.5 bg-card border border-border rounded-xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 space-y-3">
                                <div>
                                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                                        Popular Searches in Algeria
                                    </span>
                                    <div className="space-y-1">
                                        {POPULAR_SUGGESTIONS.map((item, idx) => (
                                            <Link
                                                key={idx}
                                                href={`/marketplace/explore?q=${encodeURIComponent(item.text)}`}
                                                onClick={() => setSearchFocused(false)}
                                                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted text-xs transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Search className="size-3.5 text-muted-foreground" />
                                                    <span className="font-medium text-foreground">{item.text}</span>
                                                    <Badge variant="outline" className="text-[9px] px-1 py-0 h-4">
                                                        {item.category}
                                                    </Badge>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground">{item.count}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                                    <span className="text-[11px] flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                        <Truck className="size-3.5" />
                                        Fast Yalidine & ZR Stopdesk Deliveries
                                    </span>
                                    <Link
                                        href="/marketplace/explore"
                                        onClick={() => setSearchFocused(false)}
                                        className="text-primary hover:underline font-semibold"
                                    >
                                        Browse full catalog →
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Utility Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Sell On Souknet Portal Link */}
                        <Link
                            href="/store-merchant/dashboard"
                            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-foreground"
                        >
                            <Store className="size-3.5 text-primary" />
                            <span>Merchant Hub</span>
                        </Link>

                        {/* Customer Orders Portal */}
                        <Link
                            href="/customer/orders"
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-muted/60 hover:bg-muted text-foreground transition-colors"
                        >
                            <ShoppingBag className="size-3.5" />
                            <span>My Orders</span>
                        </Link>

                        {/* Appearance Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                            title="Toggle Appearance"
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="size-4 text-amber-400" />
                            ) : (
                                <Moon className="size-4 text-slate-700" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Horizontal Mega Category Navigation Ribbon */}
                <div className="border-t border-border/60 bg-muted/30 px-4 sm:px-6 overflow-x-auto scrollbar-none">
                    <div className="max-w-7xl mx-auto flex items-center gap-1 py-1.5 text-xs font-medium whitespace-nowrap">
                        <Link
                            href="/marketplace"
                            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-foreground hover:bg-card transition-colors font-semibold"
                        >
                            <Grid className="size-3.5 text-primary" />
                            <span>All Categories</span>
                        </Link>
                        <span className="text-border">|</span>
                        <Link
                            href="/marketplace/explore"
                            className="flex items-center gap-1 px-3 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                        >
                            <Flame className="size-3.5 text-amber-500" />
                            <span>Hot Deals</span>
                        </Link>
                        <Link
                            href="/marketplace/stores"
                            className="flex items-center gap-1 px-3 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                        >
                            <Building2 className="size-3.5 text-blue-500" />
                            <span>Official Stores</span>
                        </Link>
                        <Link
                            href="/marketplace/track"
                            className="flex items-center gap-1 px-3 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                        >
                            <Truck className="size-3.5 text-emerald-500" />
                            <span>58 Wilayas Tracking</span>
                        </Link>
                        <button
                            onClick={() => setFeeEstimatorOpen(true)}
                            className="flex items-center gap-1 px-3 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-card transition-colors ml-auto"
                        >
                            <Calculator className="size-3.5 text-purple-500" />
                            <span>Shipping Fee Matrix</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* MAIN APP SHELL: Left Categories Sidebar (260px) + Main Catalog Workspace */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex gap-6 items-start">
                {/* Desktop Left Sticky Mega Sidebar (260px) */}
                <aside className="hidden lg:block w-64 shrink-0 space-y-5 sticky top-36">
                    {/* Categories Tree */}
                    <div className="p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-border/60">
                            <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <Layers className="size-3.5 text-primary" />
                                Browse Categories
                            </span>
                            <span className="text-[10px] text-muted-foreground">1,420 Items</span>
                        </div>

                        <div className="space-y-1 pt-1">
                            {MARKETPLACE_CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                const isSelected = activeCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => onSelectCategory?.(cat.id)}
                                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all text-left ${
                                            isSelected
                                                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Icon className="size-3.5 shrink-0" />
                                            <span className="truncate">{cat.label}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {cat.badge && (
                                                <Badge
                                                    variant={isSelected ? 'secondary' : 'default'}
                                                    className="text-[9px] px-1 py-0 h-4 rounded"
                                                >
                                                    {cat.badge}
                                                </Badge>
                                            )}
                                            <span className="text-[10px] opacity-75">{cat.count}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Regional Algerian Wilaya Hubs */}
                    <div className="p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-border/60">
                            <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <MapPin className="size-3.5 text-primary" />
                                Regional Store Hubs
                            </span>
                            <span className="text-[10px] text-muted-foreground">58 Wilayas</span>
                        </div>

                        <div className="space-y-1 pt-1 max-h-48 overflow-y-auto scrollbar-thin">
                            {REGIONAL_HUBS.map((hub) => (
                                <Link
                                    key={hub.code}
                                    href={`/marketplace/stores?wilaya=${hub.code}`}
                                    className="flex items-center justify-between p-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px] font-bold px-1 py-0.5 rounded bg-muted text-foreground">
                                            {hub.code}
                                        </span>
                                        <span className="truncate">{hub.name}</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">{hub.stores}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Buyer Guarantees Card */}
                    <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-xs space-y-2.5">
                        <span className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                            <ShieldCheck className="size-4 text-emerald-600" />
                            Algerian Buyer Protection
                        </span>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Open and verify your parcel upon arrival with the delivery driver before handing over cash payment.
                        </p>
                        <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                            <span>100% COD Guarantee</span>
                            <CheckCircle2 className="size-3.5" />
                        </div>
                    </div>
                </aside>

                {/* Mobile Drawer Sidebar */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 flex">
                        <div
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="relative w-80 max-w-[85%] bg-card border-r border-border p-4 flex flex-col h-full z-10 space-y-4 overflow-y-auto">
                            <div className="flex items-center justify-between pb-2 border-b border-border">
                                <span className="font-bold text-sm tracking-tight">Marketplace Navigation</span>
                                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="h-8 w-8">
                                    <X className="size-4" />
                                </Button>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Categories</span>
                                {MARKETPLACE_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            onSelectCategory?.(cat.id);
                                            setSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium text-left ${
                                            activeCategory === cat.id
                                                ? 'bg-primary text-primary-foreground font-semibold'
                                                : 'text-muted-foreground hover:bg-muted'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <cat.icon className="size-3.5" />
                                            <span>{cat.label}</span>
                                        </div>
                                        <span className="text-[10px]">{cat.count}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="pt-2 border-t border-border space-y-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Tools & Hubs</span>
                                <Link
                                    href="/marketplace/explore"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center gap-2 p-2 rounded-lg text-xs text-muted-foreground hover:bg-muted"
                                >
                                    <Compass className="size-3.5" />
                                    <span>Explore Catalog</span>
                                </Link>
                                <Link
                                    href="/marketplace/stores"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center gap-2 p-2 rounded-lg text-xs text-muted-foreground hover:bg-muted"
                                >
                                    <Building2 className="size-3.5" />
                                    <span>Verified Stores</span>
                                </Link>
                                <Link
                                    href="/marketplace/track"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center gap-2 p-2 rounded-lg text-xs text-muted-foreground hover:bg-muted"
                                >
                                    <Truck className="size-3.5" />
                                    <span>Track Parcel</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 min-w-0">{children}</main>
            </div>

            {/* MODAL: Algerian Shipping Fee Calculator Tool */}
            {feeEstimatorOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                            <div className="flex items-center gap-2">
                                <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                                    <Calculator className="size-4" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-foreground">
                                        Algerian Courier Fee Estimator
                                    </h3>
                                    <span className="text-[10px] text-muted-foreground block">
                                        Yalidine & ZR Express standard rates across 58 Wilayas
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setFeeEstimatorOpen(false)}
                                className="h-8 w-8 text-muted-foreground"
                            >
                                ✕
                            </Button>
                        </div>

                        <div className="p-5 space-y-4 text-xs">
                            <div>
                                <label className="text-muted-foreground font-semibold block mb-1">
                                    Destination Wilaya (Province)
                                </label>
                                <select
                                    value={estimatorWilaya}
                                    onChange={(e) => setEstimatorWilaya(e.target.value)}
                                    className="h-9 w-full rounded-lg border border-input bg-background px-3 text-xs text-foreground focus:outline-none"
                                >
                                    <option value="16">16 - Alger (Algiers)</option>
                                    <option value="09">09 - Blida</option>
                                    <option value="31">31 - Oran</option>
                                    <option value="25">25 - Constantine</option>
                                    <option value="19">19 - Sétif</option>
                                    <option value="06">06 - Béjaïa</option>
                                    <option value="30">30 - Ouargla / Sud</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-muted-foreground font-semibold block mb-1">
                                    Delivery Mode
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setEstimatorMode('home')}
                                        className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                                            estimatorMode === 'home'
                                                ? 'border-primary bg-primary/10 text-primary font-bold'
                                                : 'border-border bg-card text-muted-foreground'
                                        }`}
                                    >
                                        <span className="block text-xs">Home Delivery</span>
                                        <span className="text-[10px] opacity-75">À domicile</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEstimatorMode('stopdesk')}
                                        className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                                            estimatorMode === 'stopdesk'
                                                ? 'border-primary bg-primary/10 text-primary font-bold'
                                                : 'border-border bg-card text-muted-foreground'
                                        }`}
                                    >
                                        <span className="block text-xs">Stopdesk Pickup</span>
                                        <span className="text-[10px] opacity-75">Bureau Yalidine/ZR</span>
                                    </button>
                                </div>
                            </div>

                            {/* Estimated Result Pill */}
                            <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
                                        Estimated Shipping Fee
                                    </span>
                                    <span className="font-mono text-xl font-bold text-foreground">
                                        {getEstimatedFee()}
                                    </span>
                                </div>
                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                    Paiement COD
                                </Badge>
                            </div>
                        </div>

                        <div className="p-3 border-t border-border bg-muted/20 flex justify-end">
                            <Button
                                size="sm"
                                onClick={() => setFeeEstimatorOpen(false)}
                                className="h-8 text-xs"
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="border-t border-border/80 bg-card/60 mt-16 text-xs text-muted-foreground">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                                <Store className="size-4" />
                            </div>
                            <span className="font-bold text-sm text-foreground">Souknet Mega Mall</span>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            Connecting Algerian shoppers with verified local brands, artisan merchants, and fast Yalidine/ZR delivery across all 58 Wilayas.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-3">
                            Marketplace Sections
                        </h4>
                        <ul className="space-y-2">
                            <li><Link href="/marketplace/explore" className="hover:text-foreground">Explore Products Catalog</Link></li>
                            <li><Link href="/marketplace/stores" className="hover:text-foreground">Directory of Verified Stores</Link></li>
                            <li><Link href="/marketplace/track" className="hover:text-foreground">National Parcel Tracking</Link></li>
                            <li><Link href="/storefront" className="hover:text-foreground">Souknet Official Flagship</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-3">
                            Customer Tools
                        </h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => setFeeEstimatorOpen(true)} className="hover:text-foreground text-left">Shipping Fee Matrix (58 Wilayas)</button></li>
                            <li><Link href="/customer/orders" className="hover:text-foreground">Multi-Merchant Order History</Link></li>
                            <li><Link href="/customer/profile" className="hover:text-foreground">Saved Delivery Coordinates</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-3">
                            For Merchants & Hubs
                        </h4>
                        <ul className="space-y-2">
                            <li><Link href="/store-merchant/dashboard" className="hover:text-foreground">Store Merchant Hub</Link></li>
                            <li><Link href="/organization/select" className="hover:text-foreground">Multi-Store Organizations</Link></li>
                            <li><Link href="/call-center/desk" className="hover:text-foreground">Call Center Operator Desk</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/80 py-4 text-center text-[11px] text-muted-foreground">
                    © 2026 Souknet Mega E-Commerce Ecosystem · 58 Wilayas Algeria
                </div>
            </footer>
        </div>
    );
}
