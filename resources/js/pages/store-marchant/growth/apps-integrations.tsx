import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Puzzle,
    Truck,
    MessageCircle,
    BarChart3,
    Check,
    Settings,
    ExternalLink,
    Zap,
    Key,
    Lock,
    Search,
    ShieldCheck,
    ArrowUpRight,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface AppIntegration {
    id: string;
    name: string;
    category: 'courier' | 'marketing' | 'crm' | 'analytics';
    description: string;
    icon: string;
    is_connected: boolean;
    badge?: string;
    account_id?: string;
}

const APPS: AppIntegration[] = [
    {
        id: 'yalidine',
        name: 'Yalidine Express Direct API',
        category: 'courier',
        description: 'Auto-generate parcel tracking numbers and print official Algerian Yalidine thermal waybills (Bordereaux).',
        icon: '🚚',
        is_connected: true,
        badge: 'Recommended',
        account_id: 'YAL-DZ-4891',
    },
    {
        id: 'zr_express',
        name: 'ZR Express Logistics Hub',
        category: 'courier',
        description: 'Synchronize 58 wilayas dispatch status and trigger automatic stopdesk pickup SMS notifications.',
        icon: '📦',
        is_connected: true,
        account_id: 'ZR-MERCHANT-810',
    },
    {
        id: 'ecotrack',
        name: 'EcoTrack & Noest Courier',
        category: 'courier',
        description: 'Connect multi-carrier dispatch accounts for fast southern wilayas delivery.',
        icon: '⚡',
        is_connected: false,
    },
    {
        id: 'meta_pixel',
        name: 'Meta / Facebook Pixel & CAPI',
        category: 'marketing',
        description: 'Track Lead and Purchase conversion events with Conversions API to bypass iOS restrictions.',
        icon: '🎯',
        is_connected: true,
        account_id: 'Pixel ID: 81923019283',
    },
    {
        id: 'tiktok_pixel',
        name: 'TikTok Ads Pixel DZ',
        category: 'marketing',
        description: 'Track high-converting Algerian video ads and measure direct 1-click checkout submissions.',
        icon: '🎵',
        is_connected: false,
    },
    {
        id: 'whatsapp_cloud',
        name: 'WhatsApp Cloud Auto-Confirm',
        category: 'crm',
        description: 'Send automated WhatsApp interactive buttons to confirm customer orders before human agent calls.',
        icon: '💬',
        is_connected: true,
        badge: 'Popular',
        account_id: '+213 555 12 34 56',
    },
    {
        id: 'google_sheets',
        name: 'Google Sheets Live Sync',
        category: 'crm',
        description: 'Mirror all new orders into your private Google Sheet in real time for backup.',
        icon: '📊',
        is_connected: false,
    },
    {
        id: 'google_tag_manager',
        name: 'Google Tag Manager & GA4',
        category: 'analytics',
        description: 'Advanced ecommerce tracking, funnel drop-off analysis, and custom event listeners.',
        icon: '📈',
        is_connected: true,
        account_id: 'GTM-DZ59182',
    },
];

export default function StoreMerchantAppsIntegrations() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredApps = APPS.filter((app) => {
        const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              app.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <StoreMerchantLayout activeNav="apps" title="Apps & Integrations">
            <Head title="Integrations & Couriers - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Apps & Ecosystem Integrations
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Connect your Algerian couriers (Yalidine, ZR Express), ad pixels (Meta, TikTok), and WhatsApp automation.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                            <Input
                                placeholder="Search apps, couriers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 h-9 text-xs"
                            />
                        </div>
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {[
                        { key: 'all', label: 'All Integrations' },
                        { key: 'courier', label: 'Algerian Couriers (Livraison)' },
                        { key: 'marketing', label: 'Ad Pixels (Facebook / TikTok)' },
                        { key: 'crm', label: 'WhatsApp & CRM' },
                        { key: 'analytics', label: 'Analytics' },
                    ].map((cat) => (
                        <button
                            key={cat.key}
                            type="button"
                            onClick={() => setSelectedCategory(cat.key)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                                selectedCategory === cat.key
                                    ? 'bg-primary text-primary-foreground shadow-xs'
                                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Apps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredApps.map((app) => (
                        <Card
                            key={app.id}
                            className={`border transition-all flex flex-col justify-between ${
                                app.is_connected
                                    ? 'border-border/90 bg-card shadow-xs'
                                    : 'border-border/60 bg-card/60 opacity-90'
                            }`}
                        >
                            <CardHeader className="pb-3 border-b border-border/60">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="size-11 rounded-xl bg-muted/80 flex items-center justify-center text-xl shrink-0 shadow-inner">
                                            {app.icon}
                                        </div>
                                        <div>
                                            <CardTitle className="text-sm font-bold tracking-tight">
                                                {app.name}
                                            </CardTitle>
                                            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                                                {app.category}
                                            </span>
                                        </div>
                                    </div>
                                    {app.badge && (
                                        <Badge className="bg-emerald-600 text-white text-[9px] px-1.5 py-0">
                                            {app.badge}
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {app.description}
                                </p>

                                {app.is_connected && app.account_id && (
                                    <div className="p-2 rounded-lg bg-muted/40 border border-border/60 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                                        <span className="truncate">{app.account_id}</span>
                                        <Badge variant="outline" className="text-[9px] text-emerald-600 border-emerald-500/30">
                                            Active
                                        </Badge>
                                    </div>
                                )}

                                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                                    {app.is_connected ? (
                                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                                            <Check className="size-3.5" />
                                            <span>Connected</span>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">Not connected</span>
                                    )}

                                    <Button
                                        variant={app.is_connected ? 'outline' : 'default'}
                                        size="sm"
                                        className="h-8 text-xs font-semibold"
                                    >
                                        {app.is_connected ? 'Manage Settings' : 'Connect App'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </StoreMerchantLayout>
    );
}
