import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2,
    PhoneCall,
    Truck,
    MapPin,
    ArrowRight,
    ArrowLeft,
    Clock,
    Package,
    ShieldCheck,
    HelpCircle,
    Calendar,
    Printer,
    Sparkles,
} from 'lucide-react';
import StorefrontLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderSuccessProps {
    order?: {
        tracking_code: string;
        customer_name: string;
        customer_phone: string;
        delivery_wilaya: string;
        delivery_commune: string;
        delivery_type: 'home' | 'stopdesk';
        courier_partner: string;
        estimated_delivery_time: string;
        items: Array<{
            id: string;
            title: string;
            size: string;
            color: string;
            quantity: number;
            price: number;
        }>;
        subtotal: number;
        delivery_fee: number;
        total: number;
    };
}

export default function StorefrontOrderSuccess({
    order = {
        tracking_code: 'DZ-748921',
        customer_name: 'Karim Benali',
        customer_phone: '0555 12 34 56',
        delivery_wilaya: '16 - Alger (Algiers)',
        delivery_commune: 'Bab Ezzouar',
        delivery_type: 'home',
        courier_partner: 'Yalidine Express',
        estimated_delivery_time: '24 to 48 Hours',
        items: [
            {
                id: '1',
                title: 'AirPulse Breathable Sport Running Shoes',
                size: '42',
                color: 'Carmine Red',
                quantity: 1,
                price: 5900,
            },
        ],
        subtotal: 5900,
        delivery_fee: 400,
        total: 6300,
    },
}: OrderSuccessProps) {
    return (
        <StorefrontLayout cartCount={0}>
            <Head title={`Order Confirmed (${order.tracking_code}) - DzAvenue Boutique`} />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
                {/* Hero Header Confirmation */}
                <div className="text-center space-y-3">
                    <div className="size-16 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-md animate-in zoom-in-75 duration-300">
                        <CheckCircle2 className="size-9" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                        <Sparkles className="size-3.5 text-emerald-500" />
                        <span>Order Received • Cash On Delivery (COD)</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                        Thank you for your order, {order.customer_name}!
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                        Your parcel tracking reference is{' '}
                        <strong className="text-foreground font-mono">{order.tracking_code}</strong>. You don’t need to pay online; pay our courier in cash upon arrival.
                    </p>
                </div>

                {/* Algerian Call Center Immediate Action Alert */}
                <div className="p-5 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/30 space-y-3">
                    <div className="flex items-start gap-3.5">
                        <div className="size-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <PhoneCall className="size-5" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                                📞 Verification Call Coming Soon
                            </h3>
                            <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
                                Our Algerian call center confirmation desk will phone you on{' '}
                                <strong className="font-mono">{order.customer_phone}</strong> to confirm your size choice, address details, and dispatch authorization before shipping.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Delivery & Courier Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1.5">
                            <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                                <Truck className="size-3.5 text-primary" />
                                Courier Partner
                            </span>
                            <span className="font-semibold text-sm text-foreground block">
                                {order.courier_partner}
                            </span>
                            <span className="text-[11px] text-muted-foreground">National Express Hub</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1.5">
                            <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                                <Clock className="size-3.5 text-primary" />
                                Delivery Delay
                            </span>
                            <span className="font-semibold text-sm text-foreground block">
                                {order.estimated_delivery_time}
                            </span>
                            <span className="text-[11px] text-muted-foreground">Dispatched daily</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1.5">
                            <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                                <MapPin className="size-3.5 text-primary" />
                                Destination
                            </span>
                            <span className="font-semibold text-sm text-foreground block">
                                {order.delivery_commune}
                            </span>
                            <span className="text-[11px] text-muted-foreground">{order.delivery_wilaya}</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Items & Payment Breakdown */}
                <Card className="border border-border/80 shadow-xs overflow-hidden">
                    <CardHeader className="py-4 border-b border-border/60 bg-muted/20 flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-semibold tracking-tight">
                            Order Items & COD Breakdown
                        </CardTitle>
                        <Badge variant="outline" className="text-[11px] font-mono">
                            Ref: {order.tracking_code}
                        </Badge>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                        <div className="divide-y divide-border/60">
                            {order.items.map((item) => (
                                <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                                    <div className="space-y-0.5">
                                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                                        <p className="text-muted-foreground">
                                            Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <span className="font-bold text-foreground">
                                        {(item.price * item.quantity).toLocaleString()} DZD
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Financial summary */}
                        <div className="pt-4 border-t border-border space-y-2 text-xs">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>{order.subtotal.toLocaleString()} DZD</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>
                                    Shipping Fee ({order.delivery_type === 'home' ? 'Home' : 'Stopdesk'})
                                </span>
                                <span>+{order.delivery_fee.toLocaleString()} DZD</span>
                            </div>
                            <div className="pt-2 border-t border-border flex justify-between items-baseline text-sm">
                                <span className="font-bold text-foreground">Total to Pay (Cash on Delivery)</span>
                                <span className="text-lg font-extrabold text-primary">
                                    {order.total.toLocaleString()} DZD
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <Link href="/storefront">
                        <Button variant="outline" className="w-full sm:w-auto gap-2 text-xs">
                            <ArrowLeft className="size-4" />
                            Return to Storefront
                        </Button>
                    </Link>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Button
                            variant="secondary"
                            onClick={() => window.print()}
                            className="w-full sm:w-auto gap-2 text-xs"
                        >
                            <Printer className="size-4" />
                            Print Receipt
                        </Button>
                        <Link href="/storefront/checkout" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto text-xs gap-2">
                                <span>Track Order Status</span>
                                <ArrowRight className="size-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </StorefrontLayout>
    );
}
