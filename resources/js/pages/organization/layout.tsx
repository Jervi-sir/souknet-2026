import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Store,
    Users,
    CreditCard,
    Settings,
    ShieldCheck,
    LogOut,
    Sun,
    Moon,
    Bell,
    ChevronDown,
    Plus,
    ExternalLink,
    LayoutDashboard,
    ArrowLeft,
    Check,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OrganizationLayoutProps {
    children: React.ReactNode;
    title?: string;
    activeNav?: 'general' | 'members' | 'billing' | 'stores';
    currentOrgName?: string;
    currentPlan?: string;
}

const USER_ORGANIZATIONS = [
    { id: 'org_1', name: 'Atlas Commerce Group', role: 'Owner', plan: 'Pro Scale (DZD)', stores_count: 3 },
    { id: 'org_2', name: 'El Bahdja Retail SARL', role: 'Admin', plan: 'Starter COD', stores_count: 1 },
];

export default function OrganizationLayout({
    children,
    title = 'Organization Settings',
    activeNav = 'general',
    currentOrgName = 'Atlas Commerce Group',
    currentPlan = 'Pro Scale (7,900 DZD/mo)',
}: OrganizationLayoutProps) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState(currentOrgName);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const NAV_ITEMS = [
        {
            key: 'general',
            label: 'General & Legal Entity',
            href: '/organization/settings/general',
            icon: Building2,
            desc: 'Company RC, NIF, NIS & Algerian headquarters',
        },
        {
            key: 'stores',
            label: 'Stores & Brands',
            href: '/organization/settings/stores',
            icon: Store,
            desc: 'Manage multiple online shopfronts',
            badge: '3 Active',
        },
        {
            key: 'members',
            label: 'Team & Role Permissions',
            href: '/organization/settings/members',
            icon: Users,
            desc: 'Staff operators & call center agents',
        },
        {
            key: 'billing',
            label: 'Subscription & Invoices',
            href: '/organization/settings/billing',
            icon: CreditCard,
            desc: 'Edahabia, BaridiMob & DZD tax bills',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans selection:bg-primary selection:text-primary-foreground">
            {/* Top Workspace Header */}
            <header className="h-16 border-b border-border/80 bg-background/85 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
                {/* Left: Organization Switcher & Return to Store */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/store-merchant/dashboard"
                        className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors pr-2 border-r border-border"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span className="hidden sm:inline">Back to Merchant Dashboard</span>
                    </Link>

                    {/* Organization Picker Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                            className="flex items-center gap-2.5 p-1.5 px-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted/60 transition-colors text-left"
                        >
                            <div className="size-6 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">
                                {selectedOrg.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-xs tracking-tight text-foreground leading-tight">
                                    {selectedOrg}
                                </span>
                                <span className="text-[10px] text-muted-foreground font-mono leading-tight">
                                    {currentPlan}
                                </span>
                            </div>
                            <ChevronDown className="size-3.5 text-muted-foreground ml-1" />
                        </button>

                        {orgDropdownOpen && (
                            <div className="absolute top-12 left-0 z-50 w-72 rounded-xl border border-border bg-card shadow-xl p-2 space-y-1 animate-in zoom-in-95 duration-100">
                                <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                    My Organizations
                                </div>
                                {USER_ORGANIZATIONS.map((org) => (
                                    <button
                                        key={org.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedOrg(org.name);
                                            setOrgDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs hover:bg-muted text-left transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                                {org.name.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="font-semibold text-foreground block">{org.name}</span>
                                                <span className="text-[10px] text-muted-foreground">{org.stores_count} Stores • {org.role}</span>
                                            </div>
                                        </div>
                                        {selectedOrg === org.name && <Check className="size-3.5 text-primary" />}
                                    </button>
                                ))}
                                <div className="pt-1 border-t border-border mt-1">
                                    <Link
                                        href="/organization/create"
                                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-primary font-medium hover:bg-primary/10 transition-colors"
                                    >
                                        <Plus className="size-3.5" />
                                        <span>Create New Organization</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Quick actions & Appearance */}
                <div className="flex items-center gap-3">
                    <Link href="/store-merchant/my-stores">
                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-medium">
                            <Store className="size-3.5 text-primary" />
                            <span className="hidden sm:inline">Stores Overview</span>
                        </Button>
                    </Link>

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

            {/* Sub-Header Navigation Tabs */}
            <div className="border-b border-border/80 bg-card/40 backdrop-blur-xs px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeNav === item.key;
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                                }`}
                            >
                                <Icon className="size-3.5" />
                                <span>{item.label}</span>
                                {item.badge && (
                                    <Badge
                                        variant={isActive ? 'secondary' : 'default'}
                                        className="text-[9px] px-1.5 py-0 h-4 rounded-md"
                                    >
                                        {item.badge}
                                    </Badge>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Main Page Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
