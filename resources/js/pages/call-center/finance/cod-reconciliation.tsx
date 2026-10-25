import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    DollarSign,
    Receipt,
    CheckCircle2,
    Clock,
    FileSpreadsheet,
    Download,
    Building2,
    Calendar,
    ArrowUpRight,
    Search,
    Filter,
    Percent,
} from 'lucide-react';
import CallCenterLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface CommissionStatement {
    id: string;
    statement_ref: string;
    store_name: string;
    period: string;
    orders_confirmed: number;
    fee_per_order_dzd: number;
    delivered_orders: number;
    delivery_bonus_dzd: number;
    total_commission_dzd: number;
    status: 'paid' | 'pending' | 'processing';
    paid_via?: string;
    created_at: string;
}

const STATEMENTS: CommissionStatement[] = [
    {
        id: 'STM-001',
        statement_ref: 'CC-DZA-2026-W42',
        store_name: 'DzAvenue Boutique',
        period: 'Oct 14 - Oct 20, 2026',
        orders_confirmed: 240,
        fee_per_order_dzd: 150,
        delivered_orders: 198,
        delivery_bonus_dzd: 50,
        total_commission_dzd: 45900,
        status: 'paid',
        paid_via: 'BaridiMob (CCP: 0021948123 45)',
        created_at: 'Oct 21, 2026',
    },
    {
        id: 'STM-002',
        statement_ref: 'CC-SNEAK-2026-W42',
        store_name: 'Algeria Sneaker Lab',
        period: 'Oct 14 - Oct 20, 2026',
        orders_confirmed: 180,
        fee_per_order_dzd: 150,
        delivered_orders: 142,
        delivery_bonus_dzd: 50,
        total_commission_dzd: 34100,
        status: 'pending',
        created_at: 'Oct 21, 2026',
    },
    {
        id: 'STM-003',
        statement_ref: 'CC-MODA-2026-W42',
        store_name: 'Moda Constantinoise',
        period: 'Oct 14 - Oct 20, 2026',
        orders_confirmed: 110,
        fee_per_order_dzd: 150,
        delivered_orders: 88,
        delivery_bonus_dzd: 50,
        total_commission_dzd: 20900,
        status: 'processing',
        created_at: 'Oct 22, 2026',
    },
];

export default function CallCenterCodReconciliation() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending'>('all');

    const filtered = STATEMENTS.filter((s) => {
        const matchesSearch =
            s.statement_ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.store_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalEarnedDzd = STATEMENTS.reduce((acc, s) => acc + s.total_commission_dzd, 0);
    const totalOrdersConfirmed = STATEMENTS.reduce((acc, s) => acc + s.orders_confirmed, 0);

    return (
        <CallCenterLayout title="Call Center COD Reconciliation & Merchant Billing" activeNav="finance">
            <Head title="COD Commission Reconciliation - Souknet" />

            <div className="space-y-6 ">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <span>Call Center Revenue & Billing Reconciliation</span>
                            <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10 text-xs">
                                Per-Order Fees
                            </Badge>
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Reconcile confirmation commissions and successful delivery bonuses owed by stores.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                            <Download className="size-3.5" />
                            <span>Export CSV</span>
                        </Button>
                    </div>
                </div>

                {/* Financial Summary KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardHeader className="p-4 pb-2">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                                Total Fees Billed (Oct 2026)
                                <DollarSign className="size-4 text-primary" />
                            </span>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold font-mono tracking-tight text-foreground">
                                {totalEarnedDzd.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">DZD</span>
                            </div>
                            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                                <ArrowUpRight className="size-3.5" />
                                <span>+18.4% vs September</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardHeader className="p-4 pb-2">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                                Confirmed Orders Processed
                                <CheckCircle2 className="size-4 text-emerald-600" />
                            </span>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold font-mono tracking-tight text-foreground">
                                {totalOrdersConfirmed}
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-1">
                                Across 3 Partner Stores
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardHeader className="p-4 pb-2">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                                Standard Rate Model
                                <Receipt className="size-4 text-blue-500" />
                            </span>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-sm font-semibold text-foreground">
                                150 DZD <span className="font-normal text-muted-foreground">/ confirmation</span>
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-1">
                                + 50 DZD bonus on successful COD delivery
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Statements Table */}
                <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                    <CardHeader className="p-4 pb-3 border-b border-border/80">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <FileSpreadsheet className="size-4 text-primary" />
                                    Weekly Billing Statements by Merchant
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Track payment status and invoice clearance from store merchants.
                                </CardDescription>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative w-48 sm:w-64">
                                    <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search statement or store..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="h-8 pl-8 text-xs"
                                    />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as any)}
                                    className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground focus:outline-none"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </CardHeader>

                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="border-b border-border bg-muted/30 text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="p-3 pl-4">Statement Ref</th>
                                    <th className="p-3">Store Merchant</th>
                                    <th className="p-3">Billing Cycle</th>
                                    <th className="p-3 text-right">Confirmed Orders</th>
                                    <th className="p-3 text-right">Delivered (+Bonus)</th>
                                    <th className="p-3 text-right">Total Commission</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-right pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/40 transition-colors">
                                        <td className="p-3 pl-4 font-mono font-medium text-foreground">
                                            {item.statement_ref}
                                        </td>
                                        <td className="p-3 font-semibold text-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Building2 className="size-3.5 text-muted-foreground" />
                                                <span>{item.store_name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-muted-foreground">
                                            {item.period}
                                        </td>
                                        <td className="p-3 text-right font-mono font-medium text-foreground">
                                            {item.orders_confirmed} <span className="text-[10px] text-muted-foreground">× 150 DZD</span>
                                        </td>
                                        <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                                            {item.delivered_orders} <span className="text-[10px] text-muted-foreground">× 50 DZD</span>
                                        </td>
                                        <td className="p-3 text-right font-mono font-bold text-foreground">
                                            {item.total_commission_dzd.toLocaleString()} DZD
                                        </td>
                                        <td className="p-3 text-center">
                                            {item.status === 'paid' && (
                                                <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-600 bg-emerald-500/10">
                                                    Paid via BaridiMob
                                                </Badge>
                                            )}
                                            {item.status === 'pending' && (
                                                <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-600 bg-amber-500/10">
                                                    Payment Pending
                                                </Badge>
                                            )}
                                            {item.status === 'processing' && (
                                                <Badge variant="outline" className="text-[10px] border-blue-500/40 text-blue-600 bg-blue-500/10">
                                                    In Verification
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3 text-right pr-4">
                                            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary">
                                                <Download className="size-3" />
                                                <span>PDF</span>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </CallCenterLayout>
    );
}
