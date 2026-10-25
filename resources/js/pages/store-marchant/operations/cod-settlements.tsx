import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    DollarSign,
    ArrowUpRight,
    Download,
    CheckCircle2,
    Clock,
    AlertCircle,
    Building2,
    Calendar,
    FileSpreadsheet,
    FileText,
    Truck,
    Search,
    ChevronDown,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface SettlementBatch {
    id: string;
    courier: string;
    period: string;
    orders_count: number;
    gross_collected_dzd: number;
    courier_fees_dzd: number;
    net_payout_dzd: number;
    payout_method: 'BaridiMob' | 'CCP' | 'Cash at Stopdesk' | 'Bank Transfer (BNA/BEA)';
    status: 'transferred' | 'pending_verification' | 'ready_for_payout';
    transfer_date?: string;
    reference_code: string;
}

const SETTLEMENT_BATCHES: SettlementBatch[] = [
    {
        id: 'SET-YAL-2026-12',
        courier: 'Yalidine Express',
        period: '15 Oct – 21 Oct 2026',
        orders_count: 58,
        gross_collected_dzd: 384000,
        courier_fees_dzd: 26100,
        net_payout_dzd: 357900,
        payout_method: 'BaridiMob',
        status: 'transferred',
        transfer_date: '2026-10-22',
        reference_code: 'BM-9921402',
    },
    {
        id: 'SET-ZR-2026-08',
        courier: 'ZR Express',
        period: '10 Oct – 17 Oct 2026',
        orders_count: 32,
        gross_collected_dzd: 218500,
        courier_fees_dzd: 15400,
        net_payout_dzd: 203100,
        payout_method: 'Cash at Stopdesk',
        status: 'transferred',
        transfer_date: '2026-10-18',
        reference_code: 'ZR-CHQ-189',
    },
    {
        id: 'SET-YAL-2026-13',
        courier: 'Yalidine Express',
        period: '22 Oct – 24 Oct 2026 (Live)',
        orders_count: 41,
        gross_collected_dzd: 274000,
        courier_fees_dzd: 18200,
        net_payout_dzd: 255800,
        payout_method: 'BaridiMob',
        status: 'ready_for_payout',
        reference_code: 'PENDING-GEN',
    },
    {
        id: 'SET-ECO-2026-03',
        courier: 'EcoTrack',
        period: '01 Oct – 15 Oct 2026',
        orders_count: 14,
        gross_collected_dzd: 98000,
        courier_fees_dzd: 9100,
        net_payout_dzd: 88900,
        payout_method: 'CCP',
        status: 'transferred',
        transfer_date: '2026-10-16',
        reference_code: 'CCP-DZ-7411',
    },
];

export default function StoreMerchantCodSettlements() {
    const [selectedCourier, setSelectedCourier] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filtered = SETTLEMENT_BATCHES.filter((b) => {
        const matchesCourier = selectedCourier === 'all' || b.courier.toLowerCase().includes(selectedCourier.toLowerCase());
        const matchesSearch = b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              b.reference_code.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCourier && matchesSearch;
    });

    const totalPaidOut = SETTLEMENT_BATCHES
        .filter((b) => b.status === 'transferred')
        .reduce((acc, curr) => acc + curr.net_payout_dzd, 0);

    const pendingPayout = SETTLEMENT_BATCHES
        .filter((b) => b.status !== 'transferred')
        .reduce((acc, curr) => acc + curr.net_payout_dzd, 0);

    return (
        <StoreMerchantLayout activeNav="settlements" title="COD Settlements (Versements)">
            <Head title="COD Settlements - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            COD Settlements & Cash Remittance (Versements)
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Reconcile money collected in cash by courier companies (Yalidine, ZR Express) with automatic fee deduction.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                            <FileSpreadsheet className="size-3.5 text-emerald-600" />
                            <span>Export Statement (Excel)</span>
                        </Button>
                    </div>
                </div>

                {/* KPI Financial Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-5 space-y-1.5">
                            <span className="text-xs font-medium text-muted-foreground">Total Cashed In (Paid Out)</span>
                            <div className="text-2xl font-extrabold text-foreground tracking-tight">
                                {totalPaidOut.toLocaleString()} DZD
                            </div>
                            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="size-3" /> Transferred to your BaridiMob / CCP
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-5 space-y-1.5">
                            <span className="text-xs font-medium text-muted-foreground">Pending Remittance (In Delivery)</span>
                            <div className="text-2xl font-extrabold text-primary tracking-tight">
                                {pendingPayout.toLocaleString()} DZD
                            </div>
                            <span className="text-[11px] text-muted-foreground">
                                Ready for next courier payout cycle
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-5 space-y-1.5">
                            <span className="text-xs font-medium text-muted-foreground">Active Couriers Connected</span>
                            <div className="text-2xl font-extrabold text-foreground tracking-tight">
                                3 Couriers
                            </div>
                            <span className="text-[11px] text-muted-foreground">
                                Yalidine, ZR Express, EcoTrack
                            </span>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {['all', 'yalidine', 'zr express', 'ecotrack'].map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setSelectedCourier(c)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                                    selectedCourier === c
                                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                                        : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {c === 'all' ? 'All Couriers' : c}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                        <Input
                            placeholder="Search batch ref or transfer..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-xs"
                        />
                    </div>
                </div>

                {/* Settlement Batches Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">
                            Remittance Batches History (Bordereaux de Versement)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Batch Reference</th>
                                    <th className="p-3.5 font-semibold">Courier</th>
                                    <th className="p-3.5 font-semibold">Cycle Period</th>
                                    <th className="p-3.5 font-semibold">Orders</th>
                                    <th className="p-3.5 font-semibold">Gross Collected</th>
                                    <th className="p-3.5 font-semibold">Shipping Deductions</th>
                                    <th className="p-3.5 font-semibold">Net Payout</th>
                                    <th className="p-3.5 font-semibold">Status</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Proof</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filtered.map((batch) => (
                                    <tr key={batch.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-mono font-bold text-foreground">
                                            {batch.id}
                                            <span className="block text-[10px] font-sans font-normal text-muted-foreground">
                                                Ref: {batch.reference_code}
                                            </span>
                                        </td>
                                        <td className="p-3.5 font-semibold text-foreground">
                                            {batch.courier}
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">{batch.period}</td>
                                        <td className="p-3.5 font-mono">{batch.orders_count} colis</td>
                                        <td className="p-3.5 font-medium text-foreground">
                                            {batch.gross_collected_dzd.toLocaleString()} DZD
                                        </td>
                                        <td className="p-3.5 font-mono text-red-500">
                                            -{batch.courier_fees_dzd.toLocaleString()} DZD
                                        </td>
                                        <td className="p-3.5 font-extrabold text-foreground text-sm">
                                            {batch.net_payout_dzd.toLocaleString()} DZD
                                        </td>
                                        <td className="p-3.5">
                                            {batch.status === 'transferred' ? (
                                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                                    Paid ({batch.payout_method})
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-primary border-primary/30 text-[10px]">
                                                    Ready for Payout
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 text-xs px-2 gap-1 text-primary"
                                            >
                                                <Download className="size-3" />
                                                <span>Receipt</span>
                                            </Button>
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
