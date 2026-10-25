import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Store,
    Users,
    CreditCard,
    DollarSign,
    ShoppingCart,
    PhoneCall,
    Truck,
    ArrowUpRight,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    Layers,
    ChevronRight,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ORG_STORES = [
    { name: 'DzAvenue Boutique', category: 'Footwear & Apparel', orders: 312, revenue: '1,485,000 DZD', delivery_rate: '92.4%', status: 'active' },
    { name: 'Algeria Sneaker Lab', category: 'Sneakers & Streetwear', orders: 86, revenue: '620,000 DZD', delivery_rate: '89.0%', status: 'active' },
    { name: 'Dar El Caftan Premium', category: 'Traditional Algerian Dresses', orders: 38, revenue: '340,000 DZD', delivery_rate: '94.5%', status: 'active' },
];

export default function StoreMerchantWorkspaceOverview() {
    return (
        <StoreMerchantLayout activeNav="workspace" title="Organization Workspace">
            <Head title="Organization Overview - Atlas Commerce Group" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
                            <span>Organization Multi-Store Umbrella</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Atlas Commerce Group
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Combined executive view of all 3 online storefronts, call center agents, and centralized COD accounts.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link href="/store-merchant/my-stores">
                            <Button size="sm" className="h-9 gap-1.5 text-xs font-semibold shadow-xs">
                                <Store className="size-3.5" />
                                <span>Manage Stores</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Combined Aggregate Financials */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-5 space-y-2">
                            <span className="text-xs font-medium text-muted-foreground">Combined Gross Revenue</span>
                            <div className="text-2xl font-extrabold text-foreground tracking-tight">
                                2,445,000 DZD
                            </div>
                            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                                <ArrowUpRight className="size-3.5" /> All 3 active stores
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-5 space-y-2">
                            <span className="text-xs font-medium text-muted-foreground">Total Combined Orders</span>
                            <div className="text-2xl font-extrabold text-foreground tracking-tight">
                                436 orders
                            </div>
                            <span className="text-[11px] text-muted-foreground">Across 58 Wilayas this month</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-5 space-y-2">
                            <span className="text-xs font-medium text-muted-foreground">Call Center Agents</span>
                            <div className="text-2xl font-extrabold text-primary tracking-tight">
                                5 Agents Active
                            </div>
                            <span className="text-[11px] text-muted-foreground">Shared confirmation desk</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Stores Overview List */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">
                            Stores under Atlas Commerce Group
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Store Brand</th>
                                    <th className="p-3.5 font-semibold">Niche Category</th>
                                    <th className="p-3.5 font-semibold">Orders (30d)</th>
                                    <th className="p-3.5 font-semibold">Monthly Revenue</th>
                                    <th className="p-3.5 font-semibold">Delivery Success</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {ORG_STORES.map((s) => (
                                    <tr key={s.name} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-bold text-foreground">
                                            {s.name}
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">{s.category}</td>
                                        <td className="p-3.5 font-mono">{s.orders}</td>
                                        <td className="p-3.5 font-bold text-foreground">{s.revenue}</td>
                                        <td className="p-3.5">
                                            <Badge className="bg-emerald-600 text-white text-[10px]">
                                                {s.delivery_rate}
                                            </Badge>
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            <Link href="/store-merchant/dashboard">
                                                <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-primary">
                                                    <span>Open Store</span>
                                                    <ChevronRight className="size-3" />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </StoreMerchantLayout>
    );
}
