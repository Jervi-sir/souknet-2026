import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    PhoneCall,
    CheckCircle2,
    Truck,
    RotateCcw,
    BarChart3,
    DollarSign,
    ShieldAlert,
    Sun,
    Moon,
    ArrowLeft,
    Headphones,
    Users,
    Menu,
    X,
    Bell,
    Clock,
    Search,
    Flame,
    Building2,
    SlidersHorizontal,
    PhoneForwarded,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface CallCenterLayoutProps {
    children: React.ReactNode;
    title?: string;
    activeNav?: 'desk' | 'confirmation' | 'suivi' | 'audit' | 'analytics' | 'finance';
    agent?: {
        name: string;
        role: string;
        queue_count: number;
        suivi_count: number;
        calls_today: number;
        confirmed_today: number;
    };
}

export default function CallCenterLayout({
    children,
    title = 'Call Center Desk',
    activeNav = 'confirmation',
    agent = {
        name: 'Khadija Merad',
        role: 'Senior Confirmation Operator',
        queue_count: 18,
        suivi_count: 7,
        calls_today: 42,
        confirmed_today: 36,
    },
}: CallCenterLayoutProps) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const NAV_SECTIONS = [
        {
            label: 'Dialer Desks',
            items: [
                {
                    key: 'desk',
                    label: 'Unified Call Desk',
                    href: '/call-center/desk',
                    icon: Headphones,
                    badge: 'Split Screen',
                    badgeVariant: 'outline' as const,
                },
                {
                    key: 'confirmation',
                    label: 'Order Confirmation Desk',
                    href: '/call-center/order-confirmation',
                    icon: PhoneCall,
                    badge: `${agent.queue_count} Pending`,
                    badgeVariant: 'default' as const,
                },
                {
                    key: 'suivi',
                    label: 'Suivi & Return Mitigation',
                    href: '/call-center/order-suivi',
                    icon: Truck,
                    badge: `${agent.suivi_count} Relances`,
                    badgeVariant: 'secondary' as const,
                },
                {
                    key: 'audit',
                    label: 'Audit Tentatives',
                    href: '/call-center/audit-tentatives',
                    icon: ShieldAlert,
                },
            ],
        },
        {
            label: 'Performance & Operations',
            items: [
                {
                    key: 'analytics',
                    label: 'Agent Call Analytics',
                    href: '/call-center/analytics',
                    icon: BarChart3,
                },
                {
                    key: 'finance',
                    label: 'COD Reconciliation Desk',
                    href: '/call-center/finance/cod-reconciliation',
                    icon: DollarSign,
                },
            ],
        },
    ];

    const confirmationRate =
        agent.calls_today > 0 ? Math.round((agent.confirmed_today / agent.calls_today) * 100) : 0;

    return (
        <div className="min-h-screen flex bg-background text-foreground antialiased font-sans selection:bg-primary selection:text-primary-foreground">
            {/* Desktop Left Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-border/80 bg-card/60 backdrop-blur-md">
                {/* Operator Identity Header */}
                <div className="p-4 border-b border-border/80 space-y-3">
                    <div className="flex items-center gap-2.5">
                        <div className="size-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-600/20">
                            <Headphones className="size-5" />
                        </div>
                        <div>
                            <span className="font-bold text-sm tracking-tight block">
                                Souknet Call Center
                            </span>
                            <span className="text-[10px] text-muted-foreground block">
                                58 Wilayas COD Operations
                            </span>
                        </div>
                    </div>

                    {/* Agent Performance Pill */}
                    <div className="p-3 rounded-xl border border-border/80 bg-background/90 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground truncate">{agent.name}</span>
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" title="Online & Ready to Dial" />
                        </div>
                        <span className="text-[10px] text-muted-foreground block truncate">
                            {agent.role}
                        </span>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-center">
                            <div>
                                <span className="text-[10px] text-muted-foreground block">Calls Made</span>
                                <span className="font-bold font-mono text-foreground text-sm">
                                    {agent.calls_today}
                                </span>
                            </div>
                            <div>
                                <span className="text-[10px] text-muted-foreground block">Confirm Rate</span>
                                <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                                    {confirmationRate}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-y-auto p-3 space-y-5 scrollbar-thin">
                    {NAV_SECTIONS.map((section) => (
                        <div key={section.label} className="space-y-1">
                            <div className="px-3 text-[10px] font-semibold text-muted-foreground/80 uppercase tracking-wider">
                                {section.label}
                            </div>
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeNav === item.key;
                                return (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
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
                                                variant={isActive ? 'secondary' : item.badgeVariant}
                                                className="text-[9px] px-1.5 py-0 h-4 rounded-md"
                                            >
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Switch back to Merchant Portal */}
                <div className="p-3 border-t border-border/80 bg-muted/20 space-y-2">
                    <Link
                        href="/store-merchant/dashboard"
                        className="flex items-center justify-between p-2 rounded-lg border border-border/80 bg-background text-xs font-medium hover:border-primary transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <span className="flex items-center gap-2">
                            <ArrowLeft className="size-3.5" />
                            <span>Return to Merchant Hub</span>
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
                            <h2 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
                                <span>{title}</span>
                                <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-600 hidden sm:inline-flex">
                                    Queue Live
                                </Badge>
                            </h2>
                            <span className="text-[11px] text-muted-foreground hidden sm:block">
                                Algerian COD Order Validation & Courier Follow-up
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground pr-2 border-r border-border">
                            <span className="flex items-center gap-1.5 font-medium">
                                <PhoneForwarded className="size-3.5 text-emerald-600" />
                                Active Store: <strong>DzAvenue Boutique</strong>
                            </span>
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
                                <span className="font-bold text-sm tracking-tight">Call Center Desk</span>
                                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="h-8 w-8">
                                    <X className="size-4" />
                                </Button>
                            </div>

                            <div className="p-3 rounded-xl border border-border bg-background text-xs space-y-1">
                                <span className="font-bold text-foreground block">{agent.name}</span>
                                <span className="text-muted-foreground text-[11px]">{agent.role}</span>
                            </div>

                            <div className="flex-1 space-y-3">
                                {NAV_SECTIONS.map((section) => (
                                    <div key={section.label} className="space-y-1">
                                        <div className="px-2 text-[10px] font-semibold text-muted-foreground uppercase">
                                            {section.label}
                                        </div>
                                        {section.items.map((item) => (
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
                                ))}
                            </div>

                            <div className="pt-2 border-t border-border">
                                <Link
                                    href="/store-merchant/dashboard"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center gap-2 text-xs text-primary font-medium"
                                >
                                    <ArrowLeft className="size-3.5" />
                                    <span>Return to Merchant Hub</span>
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
