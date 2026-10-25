import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Package,
    User,
    ShoppingBag,
    Clock,
    PhoneCall,
    MapPin,
    ShieldCheck,
    Sun,
    Moon,
    ArrowLeft,
    LogOut,
    CheckCircle2,
    Truck,
    Menu,
    X,
    Heart,
    HelpCircle,
    Receipt,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CustomerLayoutProps {
    children: React.ReactNode;
    title?: string;
    activeNav?: 'orders' | 'profile';
    customer?: {
        name: string;
        phone: string;
        wilaya: string;
    };
}

export default function CustomerLayout({
    children,
    title = 'Customer Portal',
    activeNav = 'orders',
    customer = {
        name: 'Amine Khelil',
        phone: '0661 22 33 44',
        wilaya: '16 - Alger (Hydra)',
    },
}: CustomerLayoutProps) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const NAV_ITEMS = [
        {
            key: 'orders',
            label: 'My COD Orders',
            href: '/customer/orders',
            icon: Package,
            badge: '3 Colis',
        },
        {
            key: 'profile',
            label: 'Delivery Addresses & Phone',
            href: '/customer/profile',
            icon: User,
        },
    ];

    return (
        <div className="min-h-screen flex bg-background text-foreground antialiased font-sans selection:bg-primary selection:text-primary-foreground">
            {/* Desktop Left Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-border/80 bg-card/60 backdrop-blur-md">
                {/* Brand / Customer Profile Header */}
                <div className="p-4 border-b border-border/80 space-y-3">
                    <div className="flex items-center gap-2.5">
                        <div className="size-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-xs">
                            C
                        </div>
                        <div>
                            <span className="font-bold text-sm tracking-tight block">
                                Customer Portal
                            </span>
                            <span className="text-[10px] text-muted-foreground block">
                                Souknet Consumer Network
                            </span>
                        </div>
                    </div>

                    {/* Customer Account Pill */}
                    <div className="p-2.5 rounded-xl border border-border/80 bg-background/80 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground truncate">{customer.name}</span>
                            <Badge className="bg-emerald-600 text-white text-[9px] px-1.5 py-0">
                                Verified
                            </Badge>
                        </div>
                        <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                            <PhoneCall className="size-3 text-emerald-600" />
                            <span>{customer.phone}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-3 text-primary" />
                            <span>{customer.wilaya}</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Personal Account
                    </div>
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeNav === item.key;
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                                }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <Icon className="size-4" />
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <Badge
                                        variant={isActive ? 'secondary' : 'default'}
                                        className="text-[9px] px-1.5 py-0 h-4"
                                    >
                                        {item.badge}
                                    </Badge>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* COD Guarantee Badge & Return to Store */}
                <div className="p-4 border-t border-border/80 bg-muted/20 space-y-3">
                    <div className="p-3 rounded-xl border border-border/80 bg-card space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                            <ShieldCheck className="size-4 text-emerald-500" />
                            <span>Inspect Before Paying</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                            All Cash-on-Delivery orders allow checking the item with the courier before payment.
                        </p>
                    </div>

                    <Link
                        href="/storefront"
                        className="flex items-center justify-between p-2 rounded-lg border border-border/80 bg-background text-xs font-medium hover:border-primary transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <span className="flex items-center gap-2">
                            <ArrowLeft className="size-3.5" />
                            <span>Return to Store</span>
                        </span>
                    </Link>
                </div>
            </aside>

            {/* Main Application Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar Header */}
                <header className="h-16 border-b border-border/80 bg-background/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
                        >
                            <Menu className="size-5" />
                        </Button>
                        <div>
                            <h2 className="text-sm font-semibold tracking-tight text-foreground">
                                {title}
                            </h2>
                            <span className="text-[11px] text-muted-foreground hidden sm:block">
                                Algerian COD Order Tracking Portal
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground pr-2 border-r border-border">
                            <Truck className="size-3.5 text-emerald-600" />
                            <span>Dispatched via Yalidine & ZR Express</span>
                        </div>

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
                    </div>
                </header>

                {/* Mobile Drawer */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 flex">
                        <div
                            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="relative w-72 max-w-[85%] bg-card border-r border-border p-4 flex flex-col h-full z-10 space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-border">
                                <span className="font-bold text-sm tracking-tight">Customer Portal</span>
                                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="h-8 w-8">
                                    <X className="size-4" />
                                </Button>
                            </div>

                            <div className="p-3 rounded-xl border border-border bg-background text-xs space-y-1">
                                <span className="font-bold text-foreground block">{customer.name}</span>
                                <span className="font-mono text-muted-foreground">{customer.phone}</span>
                            </div>

                            <div className="flex-1 space-y-1">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
                                            activeNav === item.key
                                                ? 'bg-primary text-primary-foreground font-semibold'
                                                : 'text-muted-foreground hover:bg-muted'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                        {item.badge && <Badge variant="secondary" className="text-[9px]">{item.badge}</Badge>}
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-2 border-t border-border">
                                <Link
                                    href="/storefront"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center gap-2 text-xs text-primary font-medium"
                                >
                                    <ArrowLeft className="size-3.5" />
                                    <span>Return to Storefront</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
