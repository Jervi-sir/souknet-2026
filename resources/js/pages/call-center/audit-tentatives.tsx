import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    ShieldAlert,
    Clock,
    PhoneCall,
    Search,
    AlertCircle,
    Building2,
    Calendar,
    ChevronRight,
    Users,
    MapPin,
    RotateCcw,
} from 'lucide-react';
import CallCenterLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface AttemptRecord {
    id: string;
    order_ref: string;
    customer_name: string;
    customer_phone: string;
    wilaya: string;
    store_name: string;
    attempt_stage: '1st_attempt' | '2nd_attempt' | '3rd_attempt' | 'exhausted';
    last_called_at: string;
    next_scheduled_call: string;
    assigned_agent: string;
    notes: string;
}

const AUDIT_RECORDS: AttemptRecord[] = [
    {
        id: 'ATT-101',
        order_ref: 'DZ-91040',
        customer_name: 'Walid Mansour',
        customer_phone: '0555 11 22 33',
        wilaya: '16 - Alger (Cheraga)',
        store_name: 'DzAvenue Boutique',
        attempt_stage: '1st_attempt',
        last_called_at: '2h ago (No answer)',
        next_scheduled_call: 'Today at 16:00',
        assigned_agent: 'Khadija Merad',
        notes: 'Rang 5 times, voicemail reached.',
    },
    {
        id: 'ATT-102',
        order_ref: 'DZ-91041',
        customer_name: 'Nassima Brahimi',
        customer_phone: '0661 44 99 88',
        wilaya: '31 - Oran (Es Senia)',
        store_name: 'Algeria Sneaker Lab',
        attempt_stage: '2nd_attempt',
        last_called_at: 'Yesterday 17:30',
        next_scheduled_call: 'Today at 11:30',
        assigned_agent: 'Yacine Bensalem',
        notes: 'Phone switched off during 1st attempt.',
    },
    {
        id: 'ATT-103',
        order_ref: 'DZ-91042',
        customer_name: 'Farouk Benaissa',
        customer_phone: '0770 88 12 34',
        wilaya: '25 - Constantine (Ali Mendjeli)',
        store_name: 'Dar El Caftan Premium',
        attempt_stage: '3rd_attempt',
        last_called_at: 'Oct 23 14:00',
        next_scheduled_call: 'Final Attempt Today',
        assigned_agent: 'Khadija Merad',
        notes: 'WhatsApp reminder sent, awaiting response.',
    },
];

export default function CallCenterAuditTentatives() {
    const [records, setRecords] = useState<AttemptRecord[]>(AUDIT_RECORDS);
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = records.filter(
        (r) =>
            r.order_ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.customer_phone.includes(searchQuery),
    );

    return (
        <CallCenterLayout activeNav="audit" title="Audit Call Tentatives">
            <Head title="Audit Tentatives - Souknet Call Center" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Audit Call Tentatives (Gestion des Appels Injoignables)
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Track multi-attempt call progressions (1st, 2nd, 3rd attempts) to maximize confirmation rates across all stores.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-mono">
                            3-Attempt Max Protocol Active
                        </Badge>
                    </div>
                </div>

                {/* Audit Stages Funnel */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">1st Attempt Pending</span>
                            <div className="text-xl font-bold text-amber-600">14 Orders</div>
                            <span className="text-[10px] text-muted-foreground">Called once, retry today</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">2nd Attempt Pending</span>
                            <div className="text-xl font-bold text-indigo-600">6 Orders</div>
                            <span className="text-[10px] text-muted-foreground">Second retry scheduled</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">3rd Final Attempt</span>
                            <div className="text-xl font-bold text-red-500">3 Orders</div>
                            <span className="text-[10px] text-red-500">Final call before cancel</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">Recovered from Retry</span>
                            <div className="text-xl font-bold text-emerald-600">28 Confirmed</div>
                            <span className="text-[10px] text-emerald-600">Rescued by 2nd/3rd call</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Audit Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Active Retry Queues</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Order Ref</th>
                                    <th className="p-3.5 font-semibold">Customer & Phone</th>
                                    <th className="p-3.5 font-semibold">Store & Wilaya</th>
                                    <th className="p-3.5 font-semibold">Attempt Stage</th>
                                    <th className="p-3.5 font-semibold">Last Result</th>
                                    <th className="p-3.5 font-semibold">Assigned Agent</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-mono font-bold text-foreground">
                                            {item.order_ref}
                                        </td>
                                        <td className="p-3.5">
                                            <span className="font-semibold text-foreground block">
                                                {item.customer_name}
                                            </span>
                                            <span className="text-[11px] font-mono text-muted-foreground">
                                                {item.customer_phone}
                                            </span>
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">
                                            <span className="text-foreground font-medium block">
                                                {item.store_name}
                                            </span>
                                            <span>{item.wilaya}</span>
                                        </td>
                                        <td className="p-3.5">
                                            {item.attempt_stage === '1st_attempt' && (
                                                <Badge variant="outline" className="text-amber-600 border-amber-500/30 text-[10px]">
                                                    1st Attempt
                                                </Badge>
                                            )}
                                            {item.attempt_stage === '2nd_attempt' && (
                                                <Badge className="bg-indigo-600 text-white text-[10px]">
                                                    2nd Attempt
                                                </Badge>
                                            )}
                                            {item.attempt_stage === '3rd_attempt' && (
                                                <Badge className="bg-red-600 text-white text-[10px]">
                                                    3rd (Final)
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">
                                            <span className="text-foreground block">{item.last_called_at}</span>
                                            <span className="text-[10px]">{item.notes}</span>
                                        </td>
                                        <td className="p-3.5 font-medium text-foreground">
                                            {item.assigned_agent}
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            <a href={`tel:${item.customer_phone}`}>
                                                <Button size="sm" variant="outline" className="h-7 text-xs px-2 gap-1 text-emerald-600 border-emerald-500/30">
                                                    <PhoneCall className="size-3" />
                                                    <span>Call Now</span>
                                                </Button>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </CallCenterLayout>
    );
}
