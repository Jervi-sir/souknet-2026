import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    PhoneCall,
    PhoneForwarded,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    User,
    MapPin,
    Truck,
    Building2,
    ShieldCheck,
    Calendar,
    ChevronRight,
    MessageCircle,
    Plus,
    Flame,
} from 'lucide-react';
import CallCenterLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface QueueOrder {
    id: string;
    customer_name: string;
    customer_phone: string;
    customer_phone_alt?: string;
    wilaya: string;
    commune: string;
    delivery_type: 'home' | 'stopdesk';
    items: string;
    product_price: number;
    shipping_fee: number;
    total_dzd: number;
    attempt_count: number;
    last_call_at?: string;
    notes?: string;
    created_at: string;
}

const CALL_QUEUE: QueueOrder[] = [
    {
        id: 'DZ-91031',
        customer_name: 'Youcef Mahrez',
        customer_phone: '0555 99 88 77',
        customer_phone_alt: '0770 11 22 33',
        wilaya: '16 - Alger',
        commune: 'Bab Ezzouar',
        delivery_type: 'home',
        items: 'AirPulse Breathable Shoes (Size 42 / Red) × 1',
        product_price: 5900,
        shipping_fee: 400,
        total_dzd: 6300,
        attempt_count: 0,
        created_at: '12m ago',
    },
    {
        id: 'DZ-91032',
        customer_name: 'Samira Belkacem',
        customer_phone: '0661 33 44 55',
        wilaya: '31 - Oran',
        commune: 'Bir El Djir (Stopdesk Yalidine)',
        delivery_type: 'stopdesk',
        items: 'Apex Fit Pro Smartwatch (AMOLED) × 1',
        product_price: 6800,
        shipping_fee: 350,
        total_dzd: 7150,
        attempt_count: 1,
        last_call_at: '25m ago (No answer)',
        created_at: '45m ago',
    },
    {
        id: 'DZ-91033',
        customer_name: 'Karim Boukhalfa',
        customer_phone: '0770 44 55 66',
        wilaya: '25 - Constantine',
        commune: 'Ali Mendjeli',
        delivery_type: 'home',
        items: 'Bomber Leather Jacket (Size L) × 1',
        product_price: 11500,
        shipping_fee: 700,
        total_dzd: 12200,
        attempt_count: 0,
        created_at: '1h ago',
    },
];

export default function CallCenterOrderConfirmation() {
    const [queue, setQueue] = useState<QueueOrder[]>(CALL_QUEUE);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [agentNotes, setAgentNotes] = useState('');
    const [callOutcome, setCallOutcome] = useState<string | null>(null);

    const currentOrder = queue[currentIndex] || null;

    const handleOutcome = (status: 'confirmed' | 'unreachable' | 'cancelled' | 'delayed') => {
        setCallOutcome(status);
        setTimeout(() => {
            setCallOutcome(null);
            setAgentNotes('');
            if (currentIndex < queue.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                alert('Great work! All pending orders in this batch have been processed.');
            }
        }, 600);
    };

    return (
        <CallCenterLayout activeNav="confirmation" title="Live Confirmation Queue">
            <Head title="Order Confirmation Desk - Souknet" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Order Confirmation Desk (Dialer)
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Verify client address, shoe size/color, and dispatch authorization for courier fulfillment.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-600 text-white text-xs px-2.5 py-1">
                            {queue.length} Orders in Queue
                        </Badge>
                    </div>
                </div>

                {currentOrder ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Active Order Under Treatment */}
                        <div className="lg:col-span-8 space-y-5">
                            {/* Call Banner */}
                            <Card className="border-2 border-primary/20 bg-card shadow-md">
                                <CardHeader className="p-5 pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="size-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                                            <PhoneCall className="size-4 animate-pulse" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-sm font-bold tracking-tight">
                                                Calling: {currentOrder.customer_name}
                                            </CardTitle>
                                            <span className="text-[10px] text-muted-foreground font-mono">
                                                Order ID: {currentOrder.id} • Registered {currentOrder.created_at}
                                            </span>
                                        </div>
                                    </div>

                                    <Badge variant="outline" className="text-xs font-mono">
                                        Attempt #{currentOrder.attempt_count + 1}
                                    </Badge>
                                </CardHeader>

                                <CardContent className="p-5 space-y-6">
                                    {/* Phone Numbers with Click to Dial Action */}
                                    <div className="p-4 rounded-xl border border-border/80 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                                                Primary Phone Number (Customer)
                                            </span>
                                            <div className="text-2xl font-black font-mono tracking-tight text-foreground">
                                                {currentOrder.customer_phone}
                                            </div>
                                            {currentOrder.customer_phone_alt && (
                                                <span className="text-xs font-mono text-muted-foreground block">
                                                    Secondary: {currentOrder.customer_phone_alt}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <a href={`tel:${currentOrder.customer_phone}`}>
                                                <Button size="lg" className="h-11 px-5 gap-2 font-bold shadow-md bg-emerald-600 hover:bg-emerald-700 text-white">
                                                    <PhoneCall className="size-4" />
                                                    <span>Click to Call</span>
                                                </Button>
                                            </a>
                                            <a
                                                href={`https://wa.me/213${currentOrder.customer_phone.replace(/\D/g, '')}?text=Bonjour%20${currentOrder.customer_name},%20nous%20vous%20contactons%20pour%20confirmer%20votre%20commande`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Button variant="outline" size="lg" className="h-11 px-3 text-emerald-600 border-emerald-500/30">
                                                    <MessageCircle className="size-4" />
                                                </Button>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Order Coordinates & Destination */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                        <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1.5">
                                            <span className="text-muted-foreground block font-medium">Destination Wilaya & Commune</span>
                                            <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                                                <MapPin className="size-4 text-primary" />
                                                <span>{currentOrder.wilaya} – {currentOrder.commune}</span>
                                            </div>
                                            <span className="text-[11px] text-muted-foreground block">
                                                Type: <strong>{currentOrder.delivery_type === 'home' ? 'Home Delivery' : 'Stopdesk Pickup'}</strong>
                                            </span>
                                        </div>

                                        <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1.5">
                                            <span className="text-muted-foreground block font-medium">Cash to Collect (COD)</span>
                                            <div className="font-extrabold text-base text-primary">
                                                {currentOrder.total_dzd.toLocaleString()} DZD
                                            </div>
                                            <span className="text-[11px] text-muted-foreground block">
                                                Product: {currentOrder.product_price.toLocaleString()} + Shipping: {currentOrder.shipping_fee} DZD
                                            </span>
                                        </div>
                                    </div>

                                    {/* Ordered Items Summary */}
                                    <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1">
                                        <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                                            Ordered Products & Variants
                                        </span>
                                        <p className="font-bold text-sm text-foreground">
                                            {currentOrder.items}
                                        </p>
                                    </div>

                                    {/* Agent Notes Input */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">
                                            Call Verification Notes (Address details, time preference)
                                        </Label>
                                        <Input
                                            placeholder="e.g. Confirmed size 42. Customer available after 3:00 PM."
                                            value={agentNotes}
                                            onChange={(e) => setAgentNotes(e.target.value)}
                                            className="h-9 text-xs"
                                        />
                                    </div>

                                    {/* Primary Call Outcome Action Buttons */}
                                    <div className="pt-2 border-t border-border/80 space-y-2">
                                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                                            Log Call Outcome
                                        </span>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                            <Button
                                                onClick={() => handleOutcome('confirmed')}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 text-xs gap-1.5 shadow-sm"
                                            >
                                                <CheckCircle2 className="size-4" />
                                                <span>Confirm & Dispatch</span>
                                            </Button>

                                            <Button
                                                variant="outline"
                                                onClick={() => handleOutcome('unreachable')}
                                                className="border-amber-500/40 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 font-semibold h-11 text-xs gap-1.5"
                                            >
                                                <Clock className="size-4" />
                                                <span>Injoignable (Attempt)</span>
                                            </Button>

                                            <Button
                                                variant="outline"
                                                onClick={() => handleOutcome('delayed')}
                                                className="border-blue-500/40 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 font-semibold h-11 text-xs gap-1.5"
                                            >
                                                <Calendar className="size-4" />
                                                <span>Reporté (Delayed)</span>
                                            </Button>

                                            <Button
                                                variant="outline"
                                                onClick={() => handleOutcome('cancelled')}
                                                className="border-red-500/40 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 font-semibold h-11 text-xs gap-1.5"
                                            >
                                                <XCircle className="size-4" />
                                                <span>Cancel Order</span>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Queue Sidebar */}
                        <div className="lg:col-span-4 space-y-4">
                            <Card className="border border-border/80 shadow-xs">
                                <CardHeader className="py-3 border-b border-border/60">
                                    <CardTitle className="text-xs font-semibold">Upcoming Calls</CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 divide-y divide-border/60">
                                    {queue.map((order, idx) => (
                                        <button
                                            key={order.id}
                                            type="button"
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`w-full p-2.5 rounded-lg text-left transition-all ${
                                                idx === currentIndex
                                                    ? 'bg-primary/10 border border-primary/20'
                                                    : 'hover:bg-muted/40'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between text-xs font-bold">
                                                <span className="truncate">{order.customer_name}</span>
                                                <span className="font-mono text-[10px] text-muted-foreground">{order.created_at}</span>
                                            </div>
                                            <span className="text-[11px] font-mono text-muted-foreground block">{order.customer_phone}</span>
                                            <span className="text-[10px] text-muted-foreground block">{order.wilaya} • {order.total_dzd.toLocaleString()} DZD</span>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 text-center border border-dashed border-border rounded-2xl space-y-3">
                        <CheckCircle2 className="size-12 text-emerald-500 mx-auto" />
                        <h3 className="font-bold text-base">No pending calls in queue</h3>
                        <p className="text-xs text-muted-foreground">All orders are currently validated.</p>
                    </div>
                )}
            </div>
        </CallCenterLayout>
    );
}
