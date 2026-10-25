import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Truck,
    RotateCcw,
    PhoneCall,
    Search,
    CheckCircle2,
    Clock,
    AlertCircle,
    Building2,
    Calendar,
    MessageCircle,
    ArrowRight,
    MapPin,
    RefreshCw,
} from 'lucide-react';
import CallCenterLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface SuiviParcel {
    id: string;
    tracking_code: string;
    store_name: string;
    customer_name: string;
    customer_phone: string;
    wilaya: string;
    commune: string;
    courier: string;
    driver_name?: string;
    driver_phone?: string;
    total_dzd: number;
    logistic_status: 'out_for_delivery' | 'client_unreachable' | 'at_hub' | 'rescheduled';
    courier_note: string;
    relance_count: number;
    last_update: string;
}

const SUIVI_QUEUE: SuiviParcel[] = [
    {
        id: 'DZ-91012',
        tracking_code: 'YAL-748110',
        store_name: 'DzAvenue Boutique',
        customer_name: 'Khaled Benali',
        customer_phone: '0555 44 33 22',
        wilaya: '25 - Constantine',
        commune: 'El Khroub',
        courier: 'Yalidine Express',
        driver_name: 'Mourad (Livreur)',
        driver_phone: '0661 88 77 66',
        total_dzd: 6300,
        logistic_status: 'client_unreachable',
        courier_note: 'Driver called 2 times, customer phone switched off (Injoignable)',
        relance_count: 1,
        last_update: '45m ago',
    },
    {
        id: 'DZ-91018',
        tracking_code: 'ZR-559102',
        store_name: 'Algeria Sneaker Lab',
        customer_name: 'Nadia Touati',
        customer_phone: '0770 12 99 88',
        wilaya: '31 - Oran',
        commune: 'Ain El Turk',
        courier: 'ZR Express',
        total_dzd: 7150,
        logistic_status: 'at_hub',
        courier_note: 'Stopdesk package waiting for pickup (Bureau Oran)',
        relance_count: 0,
        last_update: '2h ago',
    },
    {
        id: 'DZ-91021',
        tracking_code: 'YAL-749301',
        store_name: 'DzAvenue Boutique',
        customer_name: 'Rachid Mebarki',
        customer_phone: '0560 77 88 99',
        wilaya: '19 - Sétif',
        commune: 'El Eulma',
        courier: 'Yalidine Express',
        driver_name: 'Billal (Livreur)',
        driver_phone: '0550 99 11 22',
        total_dzd: 12200,
        logistic_status: 'out_for_delivery',
        courier_note: 'Driver currently on route in El Eulma',
        relance_count: 0,
        last_update: '30m ago',
    },
];

export default function CallCenterOrderSuivi() {
    const [parcels, setParcels] = useState<SuiviParcel[]>(SUIVI_QUEUE);
    const [searchQuery, setSearchQuery] = useState('');

    const handleRelance = (id: string) => {
        setParcels(
            parcels.map((p) =>
                p.id === id ? { ...p, relance_count: p.relance_count + 1, logistic_status: 'rescheduled' } : p,
            ),
        );
        alert('Relance logged! Customer notified and courier instructed to re-attempt delivery.');
    };

    return (
        <CallCenterLayout activeNav="suivi" title="Suivi & Return Mitigation">
            <Head title="Suivi & Return Mitigation - Souknet" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Suivi & Return Mitigation Desk (Sauvetage des Colis)
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Proactively call unreachable customers, connect with couriers on the ground, and rescue parcels from turning into returns (*Retours*).
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge className="bg-primary text-primary-foreground text-xs">
                            {parcels.length} Parcels Need Action
                        </Badge>
                    </div>
                </div>

                {/* Suivi Cards */}
                <div className="space-y-4">
                    {parcels.map((parcel) => (
                        <Card key={parcel.id} className="border border-border/80 shadow-xs overflow-hidden">
                            <CardHeader className="p-4 px-5 border-b border-border/60 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                        <Truck className="size-4" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm text-foreground">
                                                {parcel.tracking_code}
                                            </span>
                                            <Badge variant="outline" className="text-[10px] font-mono">
                                                {parcel.courier}
                                            </Badge>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">
                                            Store: <strong>{parcel.store_name}</strong> • Order {parcel.id}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    {parcel.logistic_status === 'client_unreachable' && (
                                        <Badge className="bg-red-600 text-white text-[10px]">
                                            Client Injoignable (Urgent)
                                        </Badge>
                                    )}
                                    {parcel.logistic_status === 'at_hub' && (
                                        <Badge className="bg-amber-600 text-white text-[10px]">
                                            Stopdesk Awaiting Pickup
                                        </Badge>
                                    )}
                                    {parcel.logistic_status === 'out_for_delivery' && (
                                        <Badge className="bg-indigo-600 text-white text-[10px]">
                                            En cours de livraison
                                        </Badge>
                                    )}
                                    {parcel.logistic_status === 'rescheduled' && (
                                        <Badge className="bg-emerald-600 text-white text-[10px]">
                                            Relance Scheduled
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                <div className="space-y-2 flex-1">
                                    <div className="flex flex-wrap items-center gap-4 text-xs">
                                        <span className="font-bold text-sm text-foreground">
                                            {parcel.customer_name}
                                        </span>
                                        <span className="font-mono text-muted-foreground font-semibold">
                                            {parcel.customer_phone}
                                        </span>
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <MapPin className="size-3 text-primary" />
                                            {parcel.wilaya} – {parcel.commune}
                                        </span>
                                    </div>

                                    {/* Courier Driver Motive Note */}
                                    <div className="p-3 rounded-lg bg-muted/40 border border-border/60 text-xs space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                                            Live Courier Report
                                        </span>
                                        <p className="text-foreground font-medium">{parcel.courier_note}</p>
                                        {parcel.driver_phone && (
                                            <span className="text-[11px] text-muted-foreground block">
                                                Driver Contact: <strong>{parcel.driver_name}</strong> ({parcel.driver_phone})
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60">
                                    <div className="text-left sm:text-right">
                                        <span className="text-[10px] text-muted-foreground block">COD to Collect</span>
                                        <span className="text-lg font-black text-primary">
                                            {parcel.total_dzd.toLocaleString()} DZD
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <a href={`tel:${parcel.customer_phone}`}>
                                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 text-emerald-600 border-emerald-500/30">
                                                <PhoneCall className="size-3.5" />
                                                <span>Call Client</span>
                                            </Button>
                                        </a>

                                        <Button
                                            size="sm"
                                            onClick={() => handleRelance(parcel.id)}
                                            className="h-8 text-xs font-semibold gap-1.5 shadow-xs"
                                        >
                                            <RefreshCw className="size-3.5" />
                                            <span>Relancer Colis</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </CallCenterLayout>
    );
}
