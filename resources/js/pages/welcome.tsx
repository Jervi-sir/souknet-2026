import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Store,
    ArrowRight,
    ArrowUpRight,
    Sparkles,
    ShieldCheck,
    Truck,
    Building2,
    Users,
    TrendingUp,
    PhoneCall,
    PackageCheck,
    Layers,
    Sun,
    Moon,
    CheckCircle2,
    Play,
    Zap,
    ExternalLink,
    ChevronRight,
    Globe,
    CreditCard,
    DollarSign,
    Lock,
    Send,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface PlatformModelBadge {
    name: string;
    description: string;
    icon: any;
    color: string;
    tag: string;
}

const PLATFORM_SOLUTIONS: PlatformModelBadge[] = [
    {
        name: 'Storefront CMS',
        description: 'Instant 1-click COD checkout with 58 Wilayas cascading fees',
        icon: Store,
        color: 'from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400',
        tag: 'Conversion Engine',
    },
    {
        name: 'Merchant Hub',
        description: 'Multi-store operations, inventory safety, DZD subscriptions',
        icon: Building2,
        color: 'from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400',
        tag: 'Back-Office ERP',
    },
    {
        name: 'Call Center Desk',
        description: 'Built-in dialer desk, 3-attempt audit, return mitigation',
        icon: PhoneCall,
        color: 'from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400',
        tag: 'Phone Validation',
    },
    {
        name: 'National Logistics',
        description: 'Yalidine & ZR Express live API sync & cash settlements',
        icon: Truck,
        color: 'from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400',
        tag: '58 Wilayas COD',
    },
    {
        name: 'Public Marketplace',
        description: 'Algerian mall discovery engine with regional store directories',
        icon: Globe,
        color: 'from-rose-500/20 to-red-500/20 text-rose-600 dark:text-rose-400',
        tag: 'Decentralized Mall',
    },
];

const METRICS_STATS = [
    { value: '58', label: 'Algerian Wilayas', sub: 'Home & Stopdesk COD' },
    { value: '84%+', label: 'Confirmation Rate', sub: 'Via Integrated Call Desk' },
    { value: '24h - 48h', label: 'Courier Dispatch', sub: 'Yalidine & ZR Express' },
    { value: '0% Risk', label: 'Cash on Delivery', sub: 'Pay on Doorstep Inspection' },
];

const LOGO_PARTNERS = [
    { name: 'Yalidine Express', tag: 'Official National Courier' },
    { name: 'ZR Express', tag: 'Fast Regional Logistics' },
    { name: 'EcoTrack Delivery', tag: 'Stopdesk Network' },
    { name: 'BaridiMob & CCP', tag: 'DZD Merchant Settlements' },
    { name: 'Edahabia Card', tag: 'Subscription Clearing' },
];

export default function Welcome() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [demoPrompt, setDemoPrompt] = useState('Create my Algerian COD store in Algiers...');
    const [demoSubmitted, setDemoSubmitted] = useState(false);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="min-h-screen bg-background text-foreground antialiased font-sans selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden">
            <Head title="Souknet - The Complete Algerian Cash-on-Delivery E-Commerce Ecosystem" />

            {/* TOP NAVIGATION BAR (Clean, Floating & Minimalist) */}
            <header className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 pt-5">
                <nav className="flex items-center justify-between h-14 px-4 sm:px-6 rounded-2xl border border-border/60 bg-background/60 backdrop-blur-md shadow-xs">
                    {/* Brand */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="size-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-extrabold text-sm shadow-xs">
                                S
                            </div>
                            <span className="font-extrabold text-base tracking-tight text-foreground">
                                souknet<span className="text-primary font-mono text-xs">.dz</span>
                            </span>
                        </Link>

                        {/* Center Nav Links */}
                        <div className="hidden md:flex items-center gap-5 text-xs font-medium text-muted-foreground">
                            <Link href="/videos" className="text-purple-600 dark:text-purple-400 font-semibold hover:text-foreground transition-colors flex items-center gap-1">
                                Journal de Bord
                            </Link>
                            <Link href="/storefront" className="hover:text-foreground transition-colors">
                                Storefront Demo
                            </Link>
                            <Link href="/store-merchant/dashboard" className="hover:text-foreground transition-colors">
                                Merchant Back-Office
                            </Link>
                            <Link href="/call-center/desk" className="hover:text-foreground transition-colors">
                                Call Center Desk
                            </Link>
                            <Link href="/marketplace" className="hover:text-foreground transition-colors">
                                Mega Marketplace
                            </Link>
                            <Link href="/marketplace/track" className="hover:text-foreground transition-colors">
                                58 Wilayas Tracking
                            </Link>
                        </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                            title="Toggle Appearance"
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="size-4 text-amber-400" />
                            ) : (
                                <Moon className="size-4 text-slate-700" />
                            )}
                        </Button>

                        <Link
                            href="/login"
                            className="hidden sm:inline-block text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                        >
                            Log in
                        </Link>

                        <Link href="/organization/create">
                            <Button className="h-8 px-4 rounded-full text-xs font-semibold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-xs">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </nav>
            </header>

            {/* HERO SECTION WITH ENCLOSED FLUID ANIMATED AURORA CANVAS */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-12">
                <div className="relative rounded-[2.5rem] overflow-hidden border border-border/80 shadow-2xl bg-black text-white min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-6 sm:p-12 lg:p-16">
                    {/* FLUID ANIMATED AURORA BACKGROUND GRADIENT BLURS */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {/* Orb 1: Vibrant Purple / Indigo Wave */}
                        <div
                            className="animate-aurora-1 absolute -top-1/4 -left-1/4 w-[650px] h-[650px] rounded-full blur-[110px] opacity-75 mix-blend-screen"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(147, 51, 234, 0.75) 0%, rgba(79, 70, 229, 0.45) 50%, transparent 75%)',
                            }}
                        />

                        {/* Orb 2: Electric Cyan / Blue / Magenta Swirl */}
                        <div
                            className="animate-aurora-2 absolute top-1/4 right-[-10%] w-[750px] h-[600px] rounded-full blur-[120px] opacity-70 mix-blend-screen"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(236, 72, 153, 0.65) 0%, rgba(59, 130, 246, 0.5) 45%, transparent 75%)',
                            }}
                        />

                        {/* Orb 3: Radiant Warm Peach / Sunset Amber Core */}
                        <div
                            className="animate-aurora-3 absolute -bottom-1/4 left-1/3 w-[600px] h-[550px] rounded-full blur-[100px] opacity-60 mix-blend-screen"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(249, 115, 22, 0.6) 0%, rgba(217, 70, 239, 0.35) 50%, transparent 80%)',
                            }}
                        />

                        {/* Center Glowing Accent Orb */}
                        <div
                            className="animate-aurora-1 absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[350px] rounded-full blur-[90px] opacity-40 mix-blend-screen pointer-events-none"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 75%)',
                                animationDuration: '13s',
                            }}
                        />

                        {/* Subtle Grid Pattern Overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
                    </div>

                    {/* Pill Badge */}
                    <div className="relative z-10 flex justify-center pt-2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-medium shadow-lg hover:bg-white/15 transition-colors cursor-pointer">
                            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                                Introducing
                            </span>
                            <span>The Algerian Cash-on-Delivery E-Commerce Platform</span>
                            <ArrowRight className="size-3.5 opacity-80" />
                        </div>
                    </div>

                    {/* Main Headline & Subtitle */}
                    <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 my-auto py-6 sm:py-10">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                            Make commerce feel <br className="hidden sm:inline" />
                            impossible to ignore.
                        </h1>

                        <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-normal">
                            Everything you need to launch, scale, and deliver remarkable cash-on-delivery stores across all 58 Algerian Wilayas — with phone verification, courier sync, and automated cash remittance.
                        </p>

                        {/* Action CTA Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <Link href="/organization/create">
                                <Button className="h-12 px-7 rounded-full font-bold text-xs bg-white text-black hover:bg-white/90 shadow-xl gap-2">
                                    <span>Start Selling Free</span>
                                    <ArrowUpRight className="size-4" />
                                </Button>
                            </Link>

                            <Link href="/store-merchant/dashboard">
                                <Button
                                    variant="outline"
                                    className="h-12 px-6 rounded-full font-medium text-xs border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
                                >
                                    Explore Merchant Desk
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Integrated Bottom Key Performance Metrics */}
                    <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/15">
                        {METRICS_STATS.map((stat, i) => (
                            <div key={i} className="text-center sm:text-left space-y-0.5">
                                <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-semibold text-white/90">
                                    {stat.label}
                                </div>
                                <div className="text-[11px] text-white/60">
                                    {stat.sub}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PARTNER ECOSYSTEM BAR */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-b border-border/60">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                        Trusted by Algerian merchants & courier networks:
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-foreground/80">
                        {LOGO_PARTNERS.map((partner, idx) => (
                            <div key={idx} className="flex items-center gap-2 group cursor-default">
                                <CheckCircle2 className="size-3.5 text-emerald-600" />
                                <span>{partner.name}</span>
                                <span className="text-[10px] text-muted-foreground hidden lg:inline">({partner.tag})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTERACTIVE PROMPT/DISCOVERY BOX (Second Concept Reference) */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center space-y-6">
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs px-3 py-1 rounded-full">
                    <Zap className="size-3 mr-1 inline" />
                    Built for Algerian High-Conversion Commerce
                </Badge>

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                    Choose your favorite tools. <br />
                    We have them on the same line.
                </h2>

                <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    Plug in the couriers and payment methods you already use in Algeria. Yalidine, ZR Express, BaridiMob, and WhatsApp Call Confirmation.
                </p>

                {/* Interactive Simulated Prompt Input */}
                <div className="pt-4 max-w-2xl mx-auto">
                    <div className="p-2 sm:p-3 rounded-3xl border border-border bg-card shadow-xl shadow-black/5 space-y-3">
                        <div className="flex items-center gap-3 px-3 pt-2">
                            <Store className="size-5 text-primary shrink-0" />
                            <Input
                                value={demoPrompt}
                                onChange={(e) => setDemoPrompt(e.target.value)}
                                className="border-0 shadow-none focus-visible:ring-0 text-sm h-10 bg-transparent px-0 text-foreground font-medium"
                                placeholder="Describe your store or product catalog..."
                            />
                            <Link href="/organization/create">
                                <Button size="sm" className="h-9 px-4 rounded-xl text-xs font-semibold shadow-xs">
                                    Launch Now
                                </Button>
                            </Link>
                        </div>

                        {/* Connected Tools Ribbon */}
                        <div className="pt-2 border-t border-border/60 flex items-center justify-between px-3 text-[11px] text-muted-foreground">
                            <span>Connect 58 Wilayas courier memory & call desk</span>
                            <div className="flex items-center gap-2 font-mono font-semibold text-foreground">
                                <span className="px-1.5 py-0.5 rounded bg-muted">Yalidine</span>
                                <span className="px-1.5 py-0.5 rounded bg-muted">ZR Express</span>
                                <span className="px-1.5 py-0.5 rounded bg-muted">BaridiMob</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HANGING MODULE CARDS (Concept 2 Bottom Row) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20">
                <div className="text-center mb-10 space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                        Everything in One Unified Architecture
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Seamlessly switch between Storefront, Merchant Back-Office, Call Center, and Public Marketplace.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {PLATFORM_SOLUTIONS.map((item, idx) => (
                        <Card
                            key={idx}
                            className="border-border/80 hover:border-primary/50 transition-all hover:shadow-lg bg-card/60 backdrop-blur-xs flex flex-col justify-between group"
                        >
                            <CardContent className="p-5 space-y-3">
                                <div className={`size-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center font-bold text-sm shadow-xs`}>
                                    <item.icon className="size-5" />
                                </div>

                                <div className="space-y-1">
                                    <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                                        {item.tag}
                                    </Badge>
                                    <h4 className="font-bold text-sm text-foreground">
                                        {item.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-primary font-medium group-hover:underline flex items-center gap-1">
                                        <span>Explore View</span>
                                        <ArrowRight className="size-3" />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-border/80 bg-card/40 py-10 text-xs text-muted-foreground">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="size-6 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-extrabold text-xs">
                            S
                        </div>
                        <span className="font-bold text-foreground">Souknet Commerce Network</span>
                        <span>· 58 Algerian Wilayas COD Operating System</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/store-merchant/dashboard" className="hover:text-foreground">
                            Merchant Portal
                        </Link>
                        <Link href="/marketplace" className="hover:text-foreground">
                            Public Mall
                        </Link>
                        <Link href="/call-center/desk" className="hover:text-foreground">
                            Call Center
                        </Link>
                        <Link href="/marketplace/track" className="hover:text-foreground">
                            Track Courier
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
