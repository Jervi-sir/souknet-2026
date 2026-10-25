import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Package,
    Truck,
    MapPin,
    CheckCircle2,
    Clock,
    PhoneCall,
    Building2,
    ArrowLeft,
    ShieldCheck,
    Calendar,
    Printer,
    HelpCircle,
} from 'lucide-react';
import CustomerLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const TIMELINE_EVENTS = [
    {
        title: 'Order Delivered & Cash Paid',
        time: 'Today at 14:15',
        location: 'Customer Doorstep (Hydra, Algiers)',
        done: true,
        note: '6,300 DZD handed in cash to Yalidine delivery driver.',
    },
    {
        title: 'Out for Delivery (En cours de livraison)',
        time: 'Today at 09:30',
        location: 'Yalidine Regional Hub Alger (Bab Ezzouar)',
        done: true,
        note: 'Courier assigned: Sofiane (Driver phone sent via SMS)',
    },
    {
        title: 'Package In Transit',
        time: 'Yesterday at 18:40',
        location: 'Central Sorting Center Oued Smar',
        done: true,
        note: 'Parcel scanned and sorted onto regional delivery truck.',
    },
    {
        title: 'Phone Confirmation Completed',
        time: 'Oct 22 at 15:10',
        location: 'DzAvenue Boutique Call Center',
        done: true,
        note: 'Agent confirmed shoe size 42 and street address.',
    },
    {
        title: 'Order Placed on Storefront',
        time: 'Oct 22 at 14:20',
        location: 'Web Storefront (1-Click COD)',
        done: true,
        note: 'Submitted with Cash on Delivery guarantee.',
    },
];

export default function CustomerOrderShow() {
    return (
        <CustomerLayout activeNav="orders" title="Order Tracking">
            <Head title="Track Order #DZ-91024 - Souknet" />

            <div className="space-y-6">
                {/* Back button */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/customer/orders"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>Back to All Orders</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => window.print()} className="h-8 text-xs gap-1">
                            <Printer className="size-3.5" />
                            <span>Print Delivery Receipt</span>
                        </Button>
                    </div>
                </div>

                {/* Hero Tracking Status Card */}
                <Card className="border border-border/80 shadow-xs overflow-hidden">
                    <div className="bg-primary/5 border-b border-border/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                    Delivered & Paid
                                </Badge>
                                <span className="font-mono text-xs font-bold text-foreground">
                                    Tracking: YAL-748921
                                </span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                                Package from DzAvenue Boutique
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Order reference: <strong>DZ-91024</strong> • Yalidine Express Home Delivery
                            </p>
                        </div>

                        <div className="text-left sm:text-right">
                            <span className="text-[11px] text-muted-foreground block">Cash Collected at Door</span>
                            <span className="text-xl font-black text-primary">6,300 DZD</span>
                        </div>
                    </div>

                    <CardContent className="p-6">
                        {/* Live Delivery Progress Timeline */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Delivery Journey Timeline (Yalidine Express)
                            </h3>

                            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                                {TIMELINE_EVENTS.map((event, idx) => (
                                    <div key={idx} className="relative">
                                        <div
                                            className={`absolute -left-6 top-0.5 size-4 rounded-full border-2 bg-background flex items-center justify-center ${
                                                event.done
                                                    ? 'border-emerald-600 bg-emerald-600 text-white'
                                                    : 'border-border'
                                            }`}
                                        >
                                            {event.done && <CheckCircle2 className="size-3 fill-current" />}
                                        </div>
                                        <div className="space-y-0.5 text-xs">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-bold text-foreground text-sm">
                                                    {event.title}
                                                </span>
                                                <span className="font-mono text-[11px] text-muted-foreground">
                                                    {event.time}
                                                </span>
                                            </div>
                                            <div className="text-muted-foreground flex items-center gap-1">
                                                <MapPin className="size-3 text-primary" />
                                                <span>{event.location}</span>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground/80 pt-1">
                                                {event.note}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Items & Address Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <Card className="border border-border/80 shadow-xs">
                        <CardHeader className="py-3 border-b border-border/60">
                            <CardTitle className="text-xs font-semibold">Ordered Items</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <span className="font-semibold text-foreground block">
                                        AirPulse Breathable Sport Shoes
                                    </span>
                                    <span className="text-muted-foreground">Size: 42 • Color: Carmine Red × 1</span>
                                </div>
                                <span className="font-bold">5,900 DZD</span>
                            </div>
                            <div className="pt-2 border-t border-border flex justify-between text-muted-foreground">
                                <span>Shipping (Alger Home Delivery)</span>
                                <span>400 DZD</span>
                            </div>
                            <div className="pt-2 border-t border-border flex justify-between font-bold text-sm text-foreground">
                                <span>Total Paid in Cash</span>
                                <span className="text-primary">6,300 DZD</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardHeader className="py-3 border-b border-border/60">
                            <CardTitle className="text-xs font-semibold">Delivery Coordinates</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            <div>
                                <span className="text-muted-foreground block text-[11px]">Recipient</span>
                                <span className="font-semibold text-foreground">Amine Khelil</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-[11px]">Phone Number</span>
                                <span className="font-mono font-medium">0661 22 33 44</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-[11px]">Destination</span>
                                <span className="font-medium text-foreground">
                                    Hydra, 16 - Alger (Rue Didouche Mourad)
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </CustomerLayout>
    );
}
