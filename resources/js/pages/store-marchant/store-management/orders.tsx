import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingCart,
    PhoneCall,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
    Download,
    Search,
    Filter,
    FileSpreadsheet,
    Printer,
    MapPin,
    AlertCircle,
    ChevronDown,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface OrderRecord {
    id: string;
    tracking_code?: string;
    customer_name: string;
    customer_phone: string;
    wilaya: string;
    commune: string;
    delivery_type: 'home' | 'stopdesk';
    items_summary: string;
    total_dzd: number;
    confirmation_status: 'pending' | 'confirmed' | 'attempt_1' | 'attempt_2' | 'cancelled';
    logistic_status: 'not_dispatched' | 'ready_to_ship' | 'in_transit' | 'delivered' | 'returned';
    courier: 'Yalidine' | 'ZR Express' | 'EcoTrack';
    created_at: string;
}

const ORDERS: OrderRecord[] = [
    {
        id: 'DZ-91024',
        tracking_code: 'YAL-748921',
        customer_name: 'Amine Khelil',
        customer_phone: '0661 22 33 44',
        wilaya: '16 - Alger',
        commune: 'Hydra',
        delivery_type: 'home',
        items_summary: 'AirPulse Shoes (42, Carmine Red) × 1',
        total_dzd: 6300,
        confirmation_status: 'confirmed',
        logistic_status: 'delivered',
        courier: 'Yalidine',
        created_at: 'Today 14:20',
    },
    {
        id: 'DZ-91025',
        customer_name: 'Sara Bouzid',
        customer_phone: '0550 11 99 88',
        wilaya: '31 - Oran',
        commune: 'Bir El Djir',
        delivery_type: 'stopdesk',
        items_summary: 'Apex Fit Smartwatch × 1',
        total_dzd: 7150,
        confirmation_status: 'pending',
        logistic_status: 'not_dispatched',
        courier: 'ZR Express',
        created_at: 'Today 13:45',
    },
    {
        id: 'DZ-91026',
        tracking_code: 'YAL-748922',
        customer_name: 'Mohamed Brahimi',
        customer_phone: '0770 45 67 89',
        wilaya: '25 - Constantine',
        commune: 'Ali Mendjeli',
        delivery_type: 'home',
        items_summary: 'Bomber Leather Jacket (L) × 1',
        total_dzd: 12200,
        confirmation_status: 'confirmed',
        logistic_status: 'in_transit',
        courier: 'Yalidine',
        created_at: 'Today 12:10',
    },
    {
        id: 'DZ-91027',
        customer_name: 'Fatima Zohra',
        customer_phone: '0555 88 12 34',
        wilaya: '19 - Sétif',
        commune: 'El Eulma',
        delivery_type: 'home',
        items_summary: 'Royal Amber & Oud × 2',
        total_dzd: 14400,
        confirmation_status: 'attempt_1',
        logistic_status: 'not_dispatched',
        courier: 'EcoTrack',
        created_at: 'Today 11:30',
    },
    {
        id: 'DZ-91028',
        customer_name: 'Bilal Mansouri',
        customer_phone: '0671 90 22 11',
        wilaya: '09 - Blida',
        commune: 'Boufarik',
        delivery_type: 'home',
        items_summary: 'AirPulse Shoes (43) × 2',
        total_dzd: 10400,
        confirmation_status: 'cancelled',
        logistic_status: 'not_dispatched',
        courier: 'Yalidine',
        created_at: 'Today 09:15',
    },
];

export default function StoreMerchantOrders() {
    const [orders, setOrders] = useState<OrderRecord[]>(ORDERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = orders.filter((o) => {
        const matchesStatus = statusFilter === 'all' || o.confirmation_status === statusFilter || o.logistic_status === statusFilter;
        const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              o.customer_phone.includes(searchQuery) ||
                              o.wilaya.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <StoreMerchantLayout activeNav="orders" title="Orders Management">
            <Head title="Orders (COD) - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Orders (Cash On Delivery)
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Real-time order pipeline from customer checkout to call center confirmation and courier dispatch.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                            <FileSpreadsheet className="size-3.5 text-emerald-600" />
                            <span>Export Yalidine CSV</span>
                        </Button>
                        <Link href="/call-center/order-confirmation">
                            <Button size="sm" className="h-9 gap-1.5 text-xs font-semibold shadow-xs">
                                <PhoneCall className="size-3.5 text-emerald-400" />
                                <span>Open Call Center Queue</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                        {[
                            { key: 'all', label: 'All Orders' },
                            { key: 'pending', label: 'Awaiting Call (18)' },
                            { key: 'confirmed', label: 'Confirmed (24)' },
                            { key: 'in_transit', label: 'In Transit (42)' },
                            { key: 'delivered', label: 'Delivered (218)' },
                            { key: 'cancelled', label: 'Cancelled' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setStatusFilter(tab.key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                                    statusFilter === tab.key
                                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                                        : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                        <Input
                            placeholder="Search by order ID, phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-xs"
                        />
                    </div>
                </div>

                {/* Orders Master Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Orders List</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Order Ref</th>
                                    <th className="p-3.5 font-semibold">Customer & Phone</th>
                                    <th className="p-3.5 font-semibold">Destination</th>
                                    <th className="p-3.5 font-semibold">Items</th>
                                    <th className="p-3.5 font-semibold">Call Status</th>
                                    <th className="p-3.5 font-semibold">Logistics</th>
                                    <th className="p-3.5 font-semibold">Total (COD)</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filtered.map((order) => (
                                    <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-mono font-bold text-foreground">
                                            {order.id}
                                            <span className="block text-[10px] font-sans font-normal text-muted-foreground">
                                                {order.created_at}
                                            </span>
                                        </td>
                                        <td className="p-3.5">
                                            <span className="font-semibold text-foreground block">
                                                {order.customer_name}
                                            </span>
                                            <span className="text-[11px] font-mono text-muted-foreground">
                                                {order.customer_phone}
                                            </span>
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">
                                            <div>{order.wilaya}</div>
                                            <span className="text-[10px] text-muted-foreground/80">
                                                {order.commune} ({order.delivery_type === 'home' ? 'Domicile' : 'Stopdesk'})
                                            </span>
                                        </td>
                                        <td className="p-3.5 text-foreground max-w-xs truncate">
                                            {order.items_summary}
                                        </td>
                                        <td className="p-3.5">
                                            {order.confirmation_status === 'confirmed' && (
                                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                                    Confirmed
                                                </Badge>
                                            )}
                                            {order.confirmation_status === 'pending' && (
                                                <Badge variant="outline" className="text-amber-600 border-amber-500/30 text-[10px]">
                                                    To Call
                                                </Badge>
                                            )}
                                            {order.confirmation_status === 'attempt_1' && (
                                                <Badge variant="secondary" className="text-[10px]">
                                                    1st Attempt
                                                </Badge>
                                            )}
                                            {order.confirmation_status === 'cancelled' && (
                                                <Badge variant="outline" className="text-red-500 border-red-500/30 text-[10px]">
                                                    Cancelled
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5">
                                            {order.logistic_status === 'delivered' && (
                                                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                                                    <CheckCircle2 className="size-3" /> Delivered
                                                </span>
                                            )}
                                            {order.logistic_status === 'in_transit' && (
                                                <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold text-[11px]">
                                                    <Truck className="size-3" /> Shipped ({order.courier})
                                                </span>
                                            )}
                                            {order.logistic_status === 'not_dispatched' && (
                                                <span className="text-muted-foreground text-[11px]">
                                                    Not Shipped
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3.5 font-bold text-foreground">
                                            {order.total_dzd.toLocaleString()} DZD
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="size-7" title="Print Bordereau">
                                                    <Printer className="size-3.5" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
                                                    Details
                                                </Button>
                                            </div>
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
