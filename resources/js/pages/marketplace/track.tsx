import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Truck,
    Search,
    MapPin,
    CheckCircle2,
    Clock,
    ShieldAlert,
    PhoneCall,
    Package,
    Building2,
    ArrowRight,
    HelpCircle,
    RotateCcw,
} from 'lucide-react';
import MarketplaceLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ParcelCheckpoint {
    time: string;
    location: string;
    title: string;
    description: string;
    completed: boolean;
    current?: boolean;
}

interface TrackedParcel {
    tracking_number: string;
    order_ref: string;
    store_name: string;
    courier_name: string;
    customer_name: string;
    destination_wilaya: string;
    destination_commune: string;
    delivery_mode: 'home' | 'stopdesk';
    total_cod_dzd: number;
    status: 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed_attempt';
    driver_name?: string;
    driver_phone?: string;
    timeline: ParcelCheckpoint[];
}

const MOCK_PARCELS: Record<string, TrackedParcel> = {
    'YAL-748110': {
        tracking_number: 'YAL-748110',
        order_ref: 'DZ-91012',
        store_name: 'DzAvenue Boutique',
        courier_name: 'Yalidine Express',
        customer_name: 'Khaled Benali',
        destination_wilaya: '25 - Constantine',
        destination_commune: 'El Khroub',
        delivery_mode: 'home',
        total_cod_dzd: 6300,
        status: 'out_for_delivery',
        driver_name: 'Mourad (Livreur Constantine)',
        driver_phone: '0661 88 77 66',
        timeline: [
            {
                time: 'Oct 24, 08:30',
                location: 'Centre de Tri Constantine (El Khroub)',
                title: 'En cours de livraison (Out for delivery)',
                description: 'Driver assigned for delivery today with COD collection of 6,300 DZD.',
                completed: true,
                current: true,
            },
            {
                time: 'Oct 23, 21:15',
                location: 'Hub National Yalidine (Oued Smar, Alger)',
                title: 'Colis expédié vers wilaya de destination',
                description: 'Dispatched on long-haul truck to Constantine regional distribution hub.',
                completed: true,
            },
            {
                time: 'Oct 23, 14:00',
                location: 'DzAvenue Boutique Warehouse (Cheraga, Alger)',
                title: 'Colis Ramassé par le transporteur',
                description: 'Bordereau scanned and picked up by courier.',
                completed: true,
            },
            {
                time: 'Oct 23, 10:20',
                location: 'Souknet Call Center Desk',
                title: 'Commande Confirmée par téléphone',
                description: 'Operator confirmed customer EU shoe size 42 and delivery address.',
                completed: true,
            },
        ],
    },
    'ZR-890214': {
        tracking_number: 'ZR-890214',
        order_ref: 'DZ-91024',
        store_name: 'Algeria Sneaker Lab',
        courier_name: 'ZR Express',
        customer_name: 'Amine Kaci',
        destination_wilaya: '31 - Oran',
        destination_commune: 'Bir El Djir (Stopdesk Bureau)',
        delivery_mode: 'stopdesk',
        total_cod_dzd: 7400,
        status: 'in_transit',
        timeline: [
            {
                time: 'Oct 24, 06:00',
                location: 'Hub Régional ZR Express Oran',
                title: 'Arrivé au hub régional',
                description: 'Transferred to Stopdesk Bir El Djir for pickup notification.',
                completed: true,
                current: true,
            },
            {
                time: 'Oct 23, 19:30',
                location: 'Hub Central Alger',
                title: 'En transit inter-wilayas',
                description: 'Parcel travelling on highway transit.',
                completed: true,
            },
            {
                time: 'Oct 23, 12:00',
                location: 'Algeria Sneaker Lab Oran',
                title: 'Colis préparé & étiqueté',
                description: 'Bordereau generated and parcel sealed.',
                completed: true,
            },
        ],
    },
};

export default function MarketplaceTrack() {
    const [trackingCodeInput, setTrackingCodeInput] = useState('YAL-748110');
    const [searchedCode, setSearchedCode] = useState<string>('YAL-748110');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchedCode(trackingCodeInput.trim().toUpperCase());
    };

    const parcel = MOCK_PARCELS[searchedCode] || null;

    return (
        <MarketplaceLayout title="Track Courier Parcel across 58 Wilayas - Souknet" activeNav="track">
            <Head title="Track Parcel (58 Wilayas COD) - Souknet Marketplace" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10 text-xs">
                        <Truck className="size-3.5 mr-1 inline" />
                        National Logistics Tracking
                    </Badge>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        Track Your Cash-on-Delivery Parcel
                    </h1>
                    <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                        Enter your tracking number (from Yalidine Express, ZR Express, or EcoTrack) or order reference (e.g. DZ-XXXXX).
                    </p>
                </div>

                {/* Tracking Search Input */}
                <Card className="border-border/80 bg-card/60 backdrop-blur-xs p-3">
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Enter tracking code (e.g. YAL-748110, ZR-890214)..."
                                value={trackingCodeInput}
                                onChange={(e) => setTrackingCodeInput(e.target.value)}
                                className="h-10 pl-9 font-mono text-xs uppercase"
                            />
                        </div>
                        <Button type="submit" className="h-10 px-5 text-xs font-semibold shadow-xs">
                            Track Parcel
                        </Button>
                    </form>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
                        <span>Try sample numbers:</span>
                        <button
                            type="button"
                            onClick={() => {
                                setTrackingCodeInput('YAL-748110');
                                setSearchedCode('YAL-748110');
                            }}
                            className="font-mono text-primary underline"
                        >
                            YAL-748110
                        </button>
                        <span>·</span>
                        <button
                            type="button"
                            onClick={() => {
                                setTrackingCodeInput('ZR-890214');
                                setSearchedCode('ZR-890214');
                            }}
                            className="font-mono text-primary underline"
                        >
                            ZR-890214
                        </button>
                    </div>
                </Card>

                {/* Tracking Results Card */}
                {parcel ? (
                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs overflow-hidden">
                        {/* Status Ribbon */}
                        <div className="bg-primary/10 border-b border-primary/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                                <div className="size-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    <Truck className="size-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono font-bold text-sm text-foreground">
                                            {parcel.tracking_number}
                                        </span>
                                        <Badge className="text-[10px] bg-emerald-600 text-white">
                                            Out for Delivery
                                        </Badge>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        Shipped via {parcel.courier_name} · Order {parcel.order_ref}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right">
                                <span className="text-[10px] text-muted-foreground block">Cash to Pay upon Delivery</span>
                                <span className="font-mono font-bold text-base text-emerald-600 dark:text-emerald-400">
                                    {parcel.total_cod_dzd.toLocaleString()} DZD
                                </span>
                            </div>
                        </div>

                        <CardContent className="p-5 space-y-6">
                            {/* Destination & Driver Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-border bg-background/80 text-xs">
                                <div className="space-y-1">
                                    <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
                                        Destination Address
                                    </span>
                                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                                        <MapPin className="size-3.5 text-primary" />
                                        <span>{parcel.destination_wilaya} ({parcel.destination_commune})</span>
                                    </div>
                                    <div className="text-[11px] text-muted-foreground">
                                        Mode: {parcel.delivery_mode === 'home' ? 'Home Delivery (À domicile)' : 'Stopdesk (Bureau)'}
                                    </div>
                                </div>

                                {parcel.driver_name && (
                                    <div className="space-y-1 sm:border-l sm:border-border sm:pl-4">
                                        <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
                                            Assigned Delivery Driver
                                        </span>
                                        <div className="font-semibold text-foreground">
                                            {parcel.driver_name}
                                        </div>
                                        {parcel.driver_phone && (
                                            <a
                                                href={`tel:${parcel.driver_phone}`}
                                                className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-mono"
                                            >
                                                <PhoneCall className="size-3" />
                                                <span>{parcel.driver_phone}</span>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Timeline Stepper */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    <Clock className="size-3.5 text-primary" />
                                    Courier Tracking History
                                </h3>

                                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                                    {parcel.timeline.map((event, idx) => (
                                        <div key={idx} className="relative group">
                                            {/* Dot */}
                                            <div
                                                className={`absolute -left-6 top-1 size-3 rounded-full border-2 ${
                                                    event.current
                                                        ? 'bg-emerald-500 border-white ring-4 ring-emerald-500/20'
                                                        : event.completed
                                                        ? 'bg-primary border-background'
                                                        : 'bg-muted border-border'
                                                }`}
                                            />

                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-xs text-foreground">
                                                        {event.title}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-muted-foreground">
                                                        {event.time}
                                                    </span>
                                                </div>
                                                <div className="text-[11px] font-medium text-primary">
                                                    {event.location}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="p-12 text-center rounded-xl border border-dashed border-border text-muted-foreground text-xs space-y-2">
                        <Truck className="size-10 mx-auto opacity-30" />
                        <p className="font-bold text-foreground">No tracking record found for "{searchedCode}"</p>
                        <p>Please double-check the tracking number provided via SMS or WhatsApp.</p>
                    </div>
                )}
            </div>
        </MarketplaceLayout>
    );
}
