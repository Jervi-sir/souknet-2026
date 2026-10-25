import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    Radio,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    RefreshCw,
    Search,
    Filter,
    ArrowUpRight,
    Play,
    Pause,
    Code2,
    ChevronDown,
    ChevronRight,
    Terminal,
    Truck,
    Building2,
    Copy,
    Check,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface WebhookEvent {
    id: string;
    event_type: 'parcel.picked_up' | 'parcel.in_transit' | 'parcel.out_for_delivery' | 'parcel.delivered' | 'parcel.failed_attempt' | 'cod.remittance_settled';
    courier: 'Yalidine Express' | 'ZR Express' | 'EcoTrack';
    tracking_code: string;
    order_ref: string;
    status_code: 200 | 201 | 422 | 500;
    latency_ms: number;
    wilaya_destination: string;
    timestamp: string;
    payload_json: string;
}

const LIVE_EVENTS: WebhookEvent[] = [
    {
        id: 'evt-901',
        event_type: 'parcel.delivered',
        courier: 'Yalidine Express',
        tracking_code: 'YAL-74811029',
        order_ref: 'DZ-91031',
        status_code: 200,
        latency_ms: 124,
        wilaya_destination: '16 - Alger (Bab Ezzouar)',
        timestamp: '10s ago',
        payload_json: JSON.stringify(
            {
                event: 'parcel.delivered',
                courier: 'yalidine',
                tracking: 'YAL-74811029',
                order_id: 'DZ-91031',
                cash_collected_dzd: 6300,
                driver: 'Mourad (0661 88 77 66)',
                timestamp: '2026-10-25T06:30:12Z',
                status: 'livré',
            },
            null,
            2
        ),
    },
    {
        id: 'evt-902',
        event_type: 'parcel.failed_attempt',
        courier: 'ZR Express',
        tracking_code: 'ZR-89021488',
        order_ref: 'DZ-91033',
        status_code: 200,
        latency_ms: 88,
        wilaya_destination: '25 - Constantine (Ali Mendjeli)',
        timestamp: '1m ago',
        payload_json: JSON.stringify(
            {
                event: 'parcel.failed_attempt',
                courier: 'zr_express',
                tracking: 'ZR-89021488',
                order_id: 'DZ-91033',
                motive: 'injoignable',
                notes: 'Client phone unreachable, 2nd call scheduled',
                attempt_number: 1,
            },
            null,
            2
        ),
    },
    {
        id: 'evt-903',
        event_type: 'parcel.out_for_delivery',
        courier: 'Yalidine Express',
        tracking_code: 'YAL-74811030',
        order_ref: 'DZ-91032',
        status_code: 200,
        latency_ms: 95,
        wilaya_destination: '31 - Oran (Bir El Djir Stopdesk)',
        timestamp: '3m ago',
        payload_json: JSON.stringify(
            {
                event: 'parcel.out_for_delivery',
                courier: 'yalidine',
                tracking: 'YAL-74811030',
                order_id: 'DZ-91032',
                bureau: 'Stopdesk Bir El Djir',
                ready_for_pickup: true,
            },
            null,
            2
        ),
    },
    {
        id: 'evt-904',
        event_type: 'cod.remittance_settled',
        courier: 'Yalidine Express',
        tracking_code: 'YAL-74810011',
        order_ref: 'DZ-90980',
        status_code: 200,
        latency_ms: 142,
        wilaya_destination: '09 - Blida',
        timestamp: '8m ago',
        payload_json: JSON.stringify(
            {
                event: 'cod.remittance_settled',
                courier: 'yalidine',
                bordereau_versement: 'BDR-2026-W42',
                net_remittance_dzd: 45000,
                baridimob_proof: 'TRX-948102',
            },
            null,
            2
        ),
    },
    {
        id: 'evt-905',
        event_type: 'parcel.picked_up',
        courier: 'ZR Express',
        tracking_code: 'ZR-89021489',
        order_ref: 'DZ-91034',
        status_code: 200,
        latency_ms: 110,
        wilaya_destination: '06 - Béjaïa (Akbou)',
        timestamp: '14m ago',
        payload_json: JSON.stringify(
            {
                event: 'parcel.picked_up',
                courier: 'zr_express',
                tracking: 'ZR-89021489',
                pickup_warehouse: 'Cheraga Hub',
                scanned_by: 'Driver Karim',
            },
            null,
            2
        ),
    },
];

export default function CourierWebhookMonitor() {
    const [events, setEvents] = useState<WebhookEvent[]>(LIVE_EVENTS);
    const [selectedEventId, setSelectedEventId] = useState<string>(LIVE_EVENTS[0].id);
    const [isStreaming, setIsStreaming] = useState(true);
    const [filterCourier, setFilterCourier] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedPayload, setCopiedPayload] = useState(false);

    const activeEvent = events.find((e) => e.id === selectedEventId) || events[0];

    const filtered = events.filter((e) => {
        const matchesQuery =
            e.tracking_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.order_ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.event_type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourier = filterCourier === 'all' || e.courier === filterCourier;
        return matchesQuery && matchesCourier;
    });

    const copyPayload = () => {
        navigator.clipboard.writeText(activeEvent.payload_json);
        setCopiedPayload(true);
        setTimeout(() => setCopiedPayload(false), 2000);
    };

    return (
        <StoreMerchantLayout title="Courier API Webhook Monitor" activeNav="webhooks">
            <Head title="Courier Webhooks Live Stream - Souknet" />

            <div className="space-y-6 ">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <Activity className="size-5 text-emerald-500 animate-pulse" />
                            <span>Courier API Live Webhook Stream</span>
                            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/10 text-[10px] font-mono">
                                99.98% Deliverability
                            </Badge>
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Real-time JSON webhook receiver for Yalidine Express, ZR Express, and EcoTrack status events.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsStreaming(!isStreaming)}
                            className="h-8 text-xs gap-1.5"
                        >
                            {isStreaming ? (
                                <>
                                    <Pause className="size-3 text-amber-500" />
                                    <span>Pause Feed</span>
                                </>
                            ) : (
                                <>
                                    <Play className="size-3 text-emerald-500" />
                                    <span>Resume Stream</span>
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardContent className="p-3.5 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                                Events Received (Today)
                            </span>
                            <div className="text-xl font-mono font-bold text-foreground">
                                1,482
                            </div>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                                Across 3 Integrated Couriers
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardContent className="p-3.5 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                                Success Rate
                            </span>
                            <div className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                100%
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                                Zero 5xx dropped payloads
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardContent className="p-3.5 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                                Average Latency
                            </span>
                            <div className="text-xl font-mono font-bold text-foreground">
                                108ms
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                                Fast webhook processing
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardContent className="p-3.5 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                                Live Ingestion URL
                            </span>
                            <div className="text-xs font-mono truncate text-primary font-bold">
                                /api/v1/webhooks/courier
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                                Verified HMAC Signature
                            </span>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Filter tracking code, event type, or order ref..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-8 pl-8 text-xs"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            value={filterCourier}
                            onChange={(e) => setFilterCourier(e.target.value)}
                            className="h-8 rounded-md border border-input bg-card/60 px-3 text-xs text-foreground focus:outline-none"
                        >
                            <option value="all">All Couriers</option>
                            <option value="Yalidine Express">Yalidine Express</option>
                            <option value="ZR Express">ZR Express</option>
                            <option value="EcoTrack">EcoTrack</option>
                        </select>
                    </div>
                </div>

                {/* 2-Column Split: Event Log Stream | Event Payload JSON Inspector */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    {/* Events List (6 cols) */}
                    <div className="lg:col-span-6 space-y-2">
                        <Card className="border-border/80 bg-card/60 backdrop-blur-xs overflow-hidden">
                            <div className="divide-y divide-border/60 max-h-[580px] overflow-y-auto">
                                {filtered.map((evt) => {
                                    const isSelected = evt.id === activeEvent.id;
                                    return (
                                        <div
                                            key={evt.id}
                                            onClick={() => setSelectedEventId(evt.id)}
                                            className={`p-3.5 cursor-pointer transition-all ${isSelected
                                                    ? 'bg-primary/10 border-l-4 border-l-primary'
                                                    : 'hover:bg-muted/40'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-foreground">
                                                    <span>{evt.tracking_code}</span>
                                                    <span className="text-muted-foreground font-normal">
                                                        ({evt.order_ref})
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Badge className="bg-emerald-600 text-white font-mono text-[9px] px-1 py-0">
                                                        HTTP {evt.status_code}
                                                    </Badge>
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {evt.timestamp}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-semibold text-primary">
                                                    {evt.event_type}
                                                </span>
                                                <span className="text-muted-foreground text-[11px]">
                                                    {evt.courier}
                                                </span>
                                            </div>

                                            <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                                                {evt.wilaya_destination} · {evt.latency_ms}ms response
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* JSON Payload Inspector (6 cols) */}
                    <div className="lg:col-span-6 space-y-3">
                        <Card className="border-border/80 bg-card/60 backdrop-blur-xs overflow-hidden">
                            <CardHeader className="p-3.5 border-b border-border/80 bg-muted/20 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Terminal className="size-4 text-primary" />
                                    <span className="font-mono text-xs font-bold text-foreground">
                                        Payload: {activeEvent.id}
                                    </span>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={copyPayload}
                                    className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
                                >
                                    {copiedPayload ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                                    <span>{copiedPayload ? 'Copied' : 'Copy JSON'}</span>
                                </Button>
                            </CardHeader>

                            <div className="p-4 bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto rounded-b-xl max-h-[520px]">
                                <pre>{activeEvent.payload_json}</pre>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </StoreMerchantLayout>
    );
}
