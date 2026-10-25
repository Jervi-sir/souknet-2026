import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingCart,
    PhoneCall,
    Truck,
    RotateCcw,
    AlertCircle,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Plus,
    ExternalLink,
    Building2,
    Calendar,
    ChevronRight,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Mock KPI metrics for Algerian COD Merchant
const METRICS = [
    {
        title: 'Gross Revenue (Livré)',
        value: '1,485,000 DZD',
        change: '+14.2%',
        trend: 'up',
        note: 'Delivered & Cashed In',
        icon: DollarSign,
    },
    {
        title: 'Total COD Orders',
        value: '312',
        change: '+28 orders',
        trend: 'up',
        note: 'This month',
        icon: ShoppingCart,
    },
    {
        title: 'Confirmation Rate',
        value: '84.6%',
        change: '+3.1%',
        trend: 'up',
        note: 'Via Call Center Desk',
        icon: PhoneCall,
    },
    {
        title: 'Return Rate (Retour)',
        value: '7.8%',
        change: '-1.4%',
        trend: 'down',
        note: 'Lower is better',
        icon: RotateCcw,
    },
];

// Mock Recent Orders with Real Algerian COD Workflow
const RECENT_ORDERS = [
    {
        id: 'DZ-91024',
        customer: 'Amine Khelil',
        phone: '0661 22 33 44',
        wilaya: '16 - Alger (Hydra)',
        items: 'AirPulse Shoes × 1',
        total: 6300,
        confirmation_status: 'confirmed',
        logistic_status: 'delivered',
        courier: 'Yalidine',
        time: '12m ago',
    },
    {
        id: 'DZ-91025',
        customer: 'Sara Bouzid',
        phone: '0550 11 99 88',
        wilaya: '31 - Oran (Bir El Djir)',
        items: 'Smartwatch Ultra × 1',
        total: 7150,
        confirmation_status: 'pending',
        logistic_status: null,
        courier: 'ZR Express',
        time: '34m ago',
    },
    {
        id: 'DZ-91026',
        customer: 'Mohamed Brahimi',
        phone: '0770 45 67 89',
        wilaya: '25 - Constantine (Ali Mendjeli)',
        items: 'Leather Jacket × 1',
        total: 12200,
        confirmation_status: 'confirmed',
        logistic_status: 'in_transit',
        courier: 'Yalidine',
        time: '1h ago',
    },
    {
        id: 'DZ-91027',
        customer: 'Fatima Zohra',
        phone: '0555 88 12 34',
        wilaya: '19 - Sétif (El Eulma)',
        items: 'Oud Wood Parfum × 2',
        total: 14400,
        confirmation_status: 'attempt_1',
        logistic_status: null,
        courier: 'EcoTrack',
        time: '2h ago',
    },
    {
        id: 'DZ-91028',
        customer: 'Bilal Mansouri',
        phone: '0671 90 22 11',
        wilaya: '09 - Blida (Boufarik)',
        items: 'Running Shoes × 2',
        total: 10400,
        confirmation_status: 'cancelled',
        logistic_status: null,
        courier: 'Yalidine',
        time: '3h ago',
    },
];

export default function StoreMerchantDashboard() {
    return (
        <StoreMerchantLayout activeNav="dashboard" title="Dashboard Overview">
            <Head title="Merchant Dashboard - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Top Welcome & Actions Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Welcome back, DzAvenue Boutique 👋
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Here is the performance pulse of your store across all 58 Wilayas today.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link href="/store-merchant/products">
                            <Button size="sm" className="h-9 gap-1.5 text-xs font-semibold shadow-xs">
                                <Plus className="size-3.5" />
                                <span>Add New Product</span>
                            </Button>
                        </Link>
                        <a href="/storefront" target="_blank" rel="noreferrer">
                            <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                                <span>Preview Store</span>
                                <ExternalLink className="size-3" />
                            </Button>
                        </a>
                    </div>
                </div>

                {/* 4 Primary KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {METRICS.map((metric) => {
                        const Icon = metric.icon;
                        return (
                            <Card key={metric.title} className="border border-border/80 shadow-xs">
                                <CardContent className="p-5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {metric.title}
                                        </span>
                                        <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                            <Icon className="size-4" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-2xl font-extrabold text-foreground tracking-tight">
                                            {metric.value}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px]">
                                            <span
                                                className={`font-semibold flex items-center ${
                                                    metric.trend === 'up'
                                                        ? 'text-emerald-600 dark:text-emerald-400'
                                                        : 'text-emerald-600 dark:text-emerald-400'
                                                }`}
                                            >
                                                {metric.change}
                                            </span>
                                            <span className="text-muted-foreground">vs last month</span>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-border/60 text-[10px] text-muted-foreground">
                                        {metric.note}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Algerian COD Pipeline Stages (Visual Funnel) */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-semibold tracking-tight">
                                    Algerian COD Fulfillment Pipeline
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Live order flow from call center confirmation to cash remittance.
                                </CardDescription>
                            </div>
                            <Link href="/call-center/order-confirmation">
                                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary">
                                    Open Call Center
                                    <ChevronRight className="size-3" />
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-5">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-amber-700 dark:text-amber-400">1. To Confirm</span>
                                    <Badge variant="outline" className="text-[10px] bg-background">18</Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">Awaiting agent call</div>
                            </div>

                            <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-blue-700 dark:text-blue-400">2. Confirmed</span>
                                    <Badge variant="outline" className="text-[10px] bg-background">24</Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">Packing & Ready</div>
                            </div>

                            <div className="p-3.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-indigo-700 dark:text-indigo-400">3. In Transit</span>
                                    <Badge variant="outline" className="text-[10px] bg-background">42</Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">Shipped via Yalidine</div>
                            </div>

                            <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">4. Delivered</span>
                                    <Badge variant="outline" className="text-[10px] bg-background">218</Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">Money collected</div>
                            </div>

                            <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-red-700 dark:text-red-400">5. Retours</span>
                                    <Badge variant="outline" className="text-[10px] bg-background">17</Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">Returned to store</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Orders Master Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-sm font-semibold tracking-tight">Recent COD Orders</CardTitle>
                            <CardDescription className="text-xs">
                                Latest orders received across all 58 wilayas.
                            </CardDescription>
                        </div>
                        <Link href="/store-merchant/orders">
                            <Button variant="outline" size="sm" className="h-8 text-xs">
                                View All Orders
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Order ID</th>
                                    <th className="p-3.5 font-semibold">Customer</th>
                                    <th className="p-3.5 font-semibold">Wilaya & Commune</th>
                                    <th className="p-3.5 font-semibold">Items</th>
                                    <th className="p-3.5 font-semibold">Confirmation</th>
                                    <th className="p-3.5 font-semibold">Logistic Status</th>
                                    <th className="p-3.5 font-semibold">Total (COD)</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {RECENT_ORDERS.map((order) => (
                                    <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-mono font-bold text-foreground">
                                            {order.id}
                                            <span className="block text-[10px] font-sans font-normal text-muted-foreground">
                                                {order.time}
                                            </span>
                                        </td>
                                        <td className="p-3.5">
                                            <span className="font-semibold text-foreground block">
                                                {order.customer}
                                            </span>
                                            <span className="text-[11px] font-mono text-muted-foreground">
                                                {order.phone}
                                            </span>
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">
                                            {order.wilaya}
                                        </td>
                                        <td className="p-3.5 text-foreground font-medium">
                                            {order.items}
                                        </td>
                                        <td className="p-3.5">
                                            {order.confirmation_status === 'confirmed' && (
                                                <Badge className="bg-emerald-600 hover:bg-emerald-600 text-[10px] text-white">
                                                    Confirmed
                                                </Badge>
                                            )}
                                            {order.confirmation_status === 'pending' && (
                                                <Badge variant="outline" className="text-amber-600 border-amber-500/30 text-[10px]">
                                                    To Call
                                                </Badge>
                                            )}
                                            {order.confirmation_status === 'attempt_1' && (
                                                <Badge variant="secondary" className="text-[10px]">
                                                    1st Attempt
                                                </Badge>
                                            )}
                                            {order.confirmation_status === 'cancelled' && (
                                                <Badge variant="outline" className="text-red-500 border-red-500/30 text-[10px]">
                                                    Cancelled
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5">
                                            {order.logistic_status === 'delivered' && (
                                                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                                                    <CheckCircle2 className="size-3" /> Delivered
                                                </span>
                                            )}
                                            {order.logistic_status === 'in_transit' && (
                                                <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold text-[11px]">
                                                    <Truck className="size-3" /> Shipped ({order.courier})
                                                </span>
                                            )}
                                            {!order.logistic_status && (
                                                <span className="text-muted-foreground text-[11px]">
                                                    Not Dispatched
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3.5 font-bold text-foreground">
                                            {order.total.toLocaleString()} DZD
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            <Link href="/store-merchant/orders">
                                                <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
                                                    Manage
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
