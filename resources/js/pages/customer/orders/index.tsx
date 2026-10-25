import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Package,
    Search,
    Truck,
    Clock,
    CheckCircle2,
    RotateCcw,
    ChevronRight,
    MapPin,
    Building2,
    PhoneCall,
    ExternalLink,
} from 'lucide-react';
import CustomerLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface CustomerOrder {
    id: string;
    tracking_code: string;
    store_name: string;
    items_summary: string;
    total_dzd: number;
    delivery_type: 'home' | 'stopdesk';
    wilaya: string;
    commune: string;
    status: 'in_transit' | 'confirmed' | 'delivered' | 'pending_call';
    courier: string;
    order_date: string;
    estimated_arrival: string;
}

const MY_ORDERS: CustomerOrder[] = [
    {
        id: 'DZ-91024',
        tracking_code: 'YAL-748921',
        store_name: 'DzAvenue Boutique',
        items_summary: 'AirPulse Breathable Running Shoes (Size 42) × 1',
        total_dzd: 6300,
        delivery_type: 'home',
        wilaya: '16 - Alger',
        commune: 'Hydra',
        status: 'delivered',
        courier: 'Yalidine Express',
        order_date: '2026-10-22',
        estimated_arrival: 'Delivered on Oct 24',
    },
    {
        id: 'DZ-91030',
        tracking_code: 'YAL-749102',
        store_name: 'Algeria Sneaker Lab',
        items_summary: 'Apex Fit Pro Smartwatch × 1',
        total_dzd: 7150,
        delivery_type: 'stopdesk',
        wilaya: '16 - Alger',
        commune: 'Bab Ezzouar (Stopdesk Yalidine)',
        status: 'in_transit',
        courier: 'Yalidine Express',
        order_date: '2026-10-23',
        estimated_arrival: 'Tomorrow afternoon',
    },
    {
        id: 'DZ-91035',
        tracking_code: 'ZR-889104',
        store_name: 'Dar El Caftan Premium',
        items_summary: 'Embroidered Velvet Caftan (Gold Belt) × 1',
        total_dzd: 18500,
        delivery_type: 'home',
        wilaya: '16 - Alger',
        commune: 'El Biar',
        status: 'confirmed',
        courier: 'ZR Express',
        order_date: '2026-10-24',
        estimated_arrival: 'Dispatching in 24h',
    },
];

export default function CustomerOrdersIndex() {
    const [orders, setOrders] = useState<CustomerOrder[]>(MY_ORDERS);
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = orders.filter(
        (o) =>
            o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.tracking_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.store_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <CustomerLayout activeNav="orders" title="My Orders">
            <Head title="My COD Orders - Souknet Customer Portal" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            My Orders & Parcel Tracking
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Real-time tracking of packages sent to your phone across all Souknet partner merchants.
                        </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                        <Input
                            placeholder="Search tracking or store..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-xs"
                        />
                    </div>
                </div>

                {/* Orders Cards List */}
                <div className="space-y-4">
                    {filtered.map((order) => (
                        <Card
                            key={order.id}
                            className="border border-border/80 shadow-xs hover:border-primary/40 transition-colors overflow-hidden"
                        >
                            <CardHeader className="py-3 px-5 border-b border-border/60 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                        <Package className="size-4" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-xs text-foreground">
                                                {order.store_name}
                                            </span>
                                            <span className="text-[10px] font-mono text-muted-foreground">
                                                Order {order.id}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">
                                            Placed on {order.order_date}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    {order.status === 'delivered' && (
                                        <Badge className="bg-emerald-600 text-white text-[10px]">
                                            Delivered & Paid
                                        </Badge>
                                    )}
                                    {order.status === 'in_transit' && (
                                        <Badge className="bg-indigo-600 text-white text-[10px] flex items-center gap-1">
                                            <Truck className="size-3" /> In Transit ({order.courier})
                                        </Badge>
                                    )}
                                    {order.status === 'confirmed' && (
                                        <Badge variant="outline" className="text-primary border-primary/30 text-[10px]">
                                            Confirmed • Packing
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                <div className="space-y-2 flex-1">
                                    <h3 className="font-semibold text-sm text-foreground">
                                        {order.items_summary}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="size-3.5 text-primary" />
                                            <span>
                                                {order.wilaya} – {order.commune}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                                            <span>Tracking: <strong>{order.tracking_code}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60">
                                    <div className="text-left sm:text-right">
                                        <span className="text-[10px] text-muted-foreground block">Total to Pay (COD)</span>
                                        <span className="text-base font-extrabold text-primary">
                                            {order.total_dzd.toLocaleString()} DZD
                                        </span>
                                    </div>

                                    <Link href="/customer/orders/show">
                                        <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                                            <span>Track Package</span>
                                            <ChevronRight className="size-3.5" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </CustomerLayout>
    );
}
