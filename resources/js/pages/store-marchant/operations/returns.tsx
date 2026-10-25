import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    RotateCcw,
    AlertCircle,
    Package,
    Truck,
    PhoneCall,
    Search,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowRight,
    MapPin,
    Building2,
    RefreshCw,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ReturnOrder {
    id: string;
    tracking_code: string;
    customer_name: string;
    customer_phone: string;
    wilaya: string;
    items: string;
    total_dzd: number;
    courier: string;
    return_reason: string;
    status: 'in_transit_back' | 'received_at_hub' | 'relanced' | 'cancelled_restocked';
    return_date: string;
    suivi_attempts: number;
}

const RETURN_ORDERS: ReturnOrder[] = [
    {
        id: 'DZ-88102',
        tracking_code: 'YAL-RET-7410',
        customer_name: 'Farid Mansour',
        customer_phone: '0555 33 22 11',
        wilaya: '25 - Constantine (El Khroub)',
        items: 'AirPulse Shoes (Size 44)',
        total_dzd: 6300,
        courier: 'Yalidine',
        return_reason: 'Client unreachable after 3 attempts (Injoignable)',
        status: 'in_transit_back',
        return_date: '2026-10-23',
        suivi_attempts: 3,
    },
    {
        id: 'DZ-88103',
        tracking_code: 'ZR-RET-1290',
        customer_name: 'Imene Cherif',
        customer_phone: '0661 99 88 77',
        wilaya: '31 - Oran (Ain El Turk)',
        items: 'Vintage Bomber Jacket (Size M)',
        total_dzd: 12200,
        courier: 'ZR Express',
        return_reason: 'Size exchange requested (Demande d\'échange)',
        status: 'received_at_hub',
        return_date: '2026-10-22',
        suivi_attempts: 1,
    },
    {
        id: 'DZ-88104',
        tracking_code: 'YAL-RET-9011',
        customer_name: 'Walid Benaissa',
        customer_phone: '0770 12 34 56',
        wilaya: '19 - Sétif (Bougaa)',
        items: 'Smartwatch Ultra Series',
        total_dzd: 7150,
        courier: 'Yalidine',
        return_reason: 'Client absent at address (Client absent)',
        status: 'relanced',
        return_date: '2026-10-24',
        suivi_attempts: 2,
    },
    {
        id: 'DZ-88105',
        tracking_code: 'YAL-RET-6102',
        customer_name: 'Tarek Hamidi',
        customer_phone: '0560 44 55 66',
        wilaya: '09 - Blida (Larbaa)',
        items: 'Earbuds Pro Studio',
        total_dzd: 4800,
        courier: 'Yalidine',
        return_reason: 'Client refused parcel (Refus client)',
        status: 'cancelled_restocked',
        return_date: '2026-10-20',
        suivi_attempts: 3,
    },
];

export default function StoreMerchantReturns() {
    const [returns, setReturns] = useState<ReturnOrder[]>(RETURN_ORDERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = returns.filter((item) => {
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesSearch = item.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.tracking_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.customer_phone.includes(searchQuery);
        return matchesStatus && matchesSearch;
    });

    const handleRelance = (id: string) => {
        setReturns(
            returns.map((r) =>
                r.id === id ? { ...r, status: 'relanced', suivi_attempts: r.suivi_attempts + 1 } : r,
            ),
        );
        alert('Order relanced! Our Suivi desk has notified the courier to re-attempt home delivery.');
    };

    return (
        <StoreMerchantLayout activeNav="returns" title="Returns & Suivi (Gestion des Retours)">
            <Head title="Returns & Suivi - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Returns & Courier Exchanges (Gestion des Retours)
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Track packages returning from Yalidine & ZR Express, mitigate returns (Relance), and inspect received items for restocking.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Badge variant="outline" className="text-xs text-amber-600 border-amber-500/30">
                            Current Return Rate: 7.8% (Target &lt; 9%)
                        </Badge>
                    </div>
                </div>

                {/* Return Mitigation Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">In Transit Back</span>
                            <div className="text-xl font-bold text-foreground">8 colis</div>
                            <span className="text-[10px] text-muted-foreground">Returning from hubs</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">Size Exchanges</span>
                            <div className="text-xl font-bold text-indigo-600">3 colis</div>
                            <span className="text-[10px] text-muted-foreground">Exchanged via courier</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">Relanced Successfully</span>
                            <div className="text-xl font-bold text-emerald-600">12 colis</div>
                            <span className="text-[10px] text-emerald-600">Saved from return</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">Restocked to Inventory</span>
                            <div className="text-xl font-bold text-foreground">17 colis</div>
                            <span className="text-[10px] text-muted-foreground">Verified at warehouse</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                        {[
                            { key: 'all', label: 'All Retours' },
                            { key: 'in_transit_back', label: 'In Transit Back' },
                            { key: 'received_at_hub', label: 'Received' },
                            { key: 'relanced', label: 'Relanced' },
                        ].map((s) => (
                            <button
                                key={s.key}
                                type="button"
                                onClick={() => setStatusFilter(s.key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                                    statusFilter === s.key
                                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                                        : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                        <Input
                            placeholder="Search tracking or customer..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-xs"
                        />
                    </div>
                </div>

                {/* Returns Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Returns Master Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Tracking & Order</th>
                                    <th className="p-3.5 font-semibold">Customer & Wilaya</th>
                                    <th className="p-3.5 font-semibold">Product Items</th>
                                    <th className="p-3.5 font-semibold">Courier Motive (Motif)</th>
                                    <th className="p-3.5 font-semibold">Status</th>
                                    <th className="p-3.5 font-semibold">Amount</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Quick Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-mono font-bold text-foreground">
                                            {item.tracking_code}
                                            <span className="block text-[10px] font-sans font-normal text-muted-foreground">
                                                Order: {item.id}
                                            </span>
                                        </td>
                                        <td className="p-3.5">
                                            <span className="font-semibold text-foreground block">
                                                {item.customer_name}
                                            </span>
                                            <span className="text-[11px] font-mono text-muted-foreground">
                                                {item.customer_phone} ({item.wilaya})
                                            </span>
                                        </td>
                                        <td className="p-3.5 text-foreground">{item.items}</td>
                                        <td className="p-3.5">
                                            <span className="text-red-600 dark:text-red-400 font-medium text-[11px] block">
                                                {item.return_reason}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">
                                                Courier: {item.courier} • Date: {item.return_date}
                                            </span>
                                        </td>
                                        <td className="p-3.5">
                                            {item.status === 'in_transit_back' && (
                                                <Badge variant="outline" className="text-amber-600 border-amber-500/30 text-[10px]">
                                                    Returning
                                                </Badge>
                                            )}
                                            {item.status === 'received_at_hub' && (
                                                <Badge className="bg-indigo-600 text-white text-[10px]">
                                                    At Warehouse
                                                </Badge>
                                            )}
                                            {item.status === 'relanced' && (
                                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                                    Relanced
                                                </Badge>
                                            )}
                                            {item.status === 'cancelled_restocked' && (
                                                <Badge variant="secondary" className="text-[10px]">
                                                    Restocked
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 font-bold text-foreground">
                                            {item.total_dzd.toLocaleString()} DZD
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            {item.status !== 'cancelled_restocked' && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleRelance(item.id)}
                                                    className="h-7 text-xs px-2.5 gap-1 font-semibold text-primary"
                                                >
                                                    <RefreshCw className="size-3" />
                                                    <span>Relancer Colis</span>
                                                </Button>
                                            )}
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
