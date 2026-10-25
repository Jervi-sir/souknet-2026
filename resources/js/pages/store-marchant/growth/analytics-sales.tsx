import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingCart,
    PhoneCall,
    RotateCcw,
    Truck,
    Calendar,
    Download,
    ArrowUpRight,
    MapPin,
    Users,
    Percent,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const WILAYA_PERFORMANCE = [
    { wilaya: '16 - Alger', orders: 124, revenue: '742,000 DZD', delivery_rate: '94.2%', return_rate: '4.8%' },
    { wilaya: '31 - Oran', orders: 62, revenue: '415,000 DZD', delivery_rate: '91.0%', return_rate: '6.5%' },
    { wilaya: '25 - Constantine', orders: 48, revenue: '312,000 DZD', delivery_rate: '89.5%', return_rate: '7.8%' },
    { wilaya: '19 - Sétif', orders: 38, revenue: '248,000 DZD', delivery_rate: '92.1%', return_rate: '6.0%' },
    { wilaya: '09 - Blida', orders: 31, revenue: '198,000 DZD', delivery_rate: '95.0%', return_rate: '4.2%' },
    { wilaya: '15 - Tizi Ouzou', orders: 24, revenue: '154,000 DZD', delivery_rate: '88.0%', return_rate: '9.2%' },
];

const DAILY_REVENUE = [
    { day: 'Mon', revenue: 142000, orders: 24 },
    { day: 'Tue', revenue: 185000, orders: 31 },
    { day: 'Wed', revenue: 210000, orders: 36 },
    { day: 'Thu', revenue: 245000, orders: 42 },
    { day: 'Fri', revenue: 160000, orders: 27 },
    { day: 'Sat', revenue: 290000, orders: 49 },
    { day: 'Sun', revenue: 253000, orders: 43 },
];

export default function StoreMerchantAnalyticsSales() {
    const [dateRange, setDateRange] = useState('Last 30 Days');

    return (
        <StoreMerchantLayout activeNav="analytics" title="Sales & Conversion Analytics">
            <Head title="Sales Analytics - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Sales & Delivery Analytics
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Real-time tracking of Algerian COD conversion, phone confirmation rates, and courier delivery efficiency.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="h-9 px-3 rounded-lg border border-input bg-background text-xs font-medium cursor-pointer"
                        >
                            <option value="Today">Today</option>
                            <option value="Last 7 Days">Last 7 Days</option>
                            <option value="Last 30 Days">Last 30 Days</option>
                            <option value="This Quarter">This Quarter</option>
                            <option value="Year to Date">Year to Date (2026)</option>
                        </select>

                        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                            <Download className="size-3.5" />
                            <span>Export CSV</span>
                        </Button>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-5 space-y-2">
                            <span className="text-xs font-medium text-muted-foreground">Net Cash Delivered</span>
                            <div className="text-2xl font-extrabold text-foreground">1,485,000 DZD</div>
                            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                                <TrendingUp className="size-3.5" />
                                <span>+18.4% vs previous period</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-5 space-y-2">
                            <span className="text-xs font-medium text-muted-foreground">Average Order Value (AOV)</span>
                            <div className="text-2xl font-extrabold text-foreground">6,420 DZD</div>
                            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                                <TrendingUp className="size-3.5" />
                                <span>+450 DZD (Pack bundles effect)</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-5 space-y-2">
                            <span className="text-xs font-medium text-muted-foreground">Call Center Confirmation</span>
                            <div className="text-2xl font-extrabold text-foreground">84.6%</div>
                            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                                <TrendingUp className="size-3.5" />
                                <span>264 of 312 orders confirmed</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-5 space-y-2">
                            <span className="text-xs font-medium text-muted-foreground">Courier Return Rate (Retour)</span>
                            <div className="text-2xl font-extrabold text-foreground">7.8%</div>
                            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                                <TrendingDown className="size-3.5" />
                                <span>-1.2% via Suivi Relance</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Revenue Bar Chart Visualization */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-sm font-semibold tracking-tight">Weekly COD Sales Velocity</CardTitle>
                            <CardDescription className="text-xs">
                                Confirmed order volume vs cash collected daily.
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs font-mono">
                            Top Day: Saturday (290k DZD)
                        </Badge>
                    </CardHeader>
                    <CardContent className="p-5">
                        <div className="space-y-4">
                            <div className="grid grid-cols-7 gap-3 items-end h-44 pt-6 pb-2 border-b border-border/60">
                                {DAILY_REVENUE.map((d) => {
                                    const maxRev = 300000;
                                    const heightPct = Math.round((d.revenue / maxRev) * 100);
                                    return (
                                        <div key={d.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                                            <span className="text-[10px] text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                                {d.orders} orders
                                            </span>
                                            <div
                                                className="w-full max-w-[48px] rounded-t-lg bg-primary/80 group-hover:bg-primary transition-all relative"
                                                style={{ height: `${heightPct}%` }}
                                            >
                                                <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] font-bold py-0.5 px-1.5 rounded whitespace-nowrap shadow-md pointer-events-none transition-opacity">
                                                    {(d.revenue / 1000).toFixed(0)}k DZD
                                                </div>
                                            </div>
                                            <span className="text-xs font-semibold text-muted-foreground">
                                                {d.day}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Algerian Wilayas Performance Breakdown Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Top Algerian Wilayas by Revenue</CardTitle>
                        <CardDescription className="text-xs">
                            Delivery success and return rate breakdown per province.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Wilaya</th>
                                    <th className="p-3.5 font-semibold">Orders Count</th>
                                    <th className="p-3.5 font-semibold">Gross Revenue</th>
                                    <th className="p-3.5 font-semibold">Delivery Rate</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Return Rate (Retour)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {WILAYA_PERFORMANCE.map((item) => (
                                    <tr key={item.wilaya} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-semibold text-foreground flex items-center gap-2">
                                            <MapPin className="size-3.5 text-primary" />
                                            <span>{item.wilaya}</span>
                                        </td>
                                        <td className="p-3.5 font-mono">{item.orders}</td>
                                        <td className="p-3.5 font-bold text-foreground">{item.revenue}</td>
                                        <td className="p-3.5">
                                            <Badge className="bg-emerald-600 text-white text-[10px]">
                                                {item.delivery_rate}
                                            </Badge>
                                        </td>
                                        <td className="p-3.5 pr-5 text-right font-mono font-medium text-amber-600">
                                            {item.return_rate}
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
