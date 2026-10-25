import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Users,
    Search,
    PhoneCall,
    MapPin,
    ShoppingBag,
    Star,
    CheckCircle2,
    Calendar,
    Download,
    DollarSign,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface CustomerRecord {
    id: string;
    name: string;
    phone: string;
    wilaya: string;
    commune: string;
    total_orders: number;
    delivered_orders: number;
    returned_orders: number;
    total_spent_dzd: number;
    last_order_at: string;
    trust_score: 'VIP' | 'Reliable' | 'Risky';
}

const CUSTOMERS: CustomerRecord[] = [
    {
        id: 'cust_1',
        name: 'Amine Khelil',
        phone: '0661 22 33 44',
        wilaya: '16 - Alger',
        commune: 'Hydra',
        total_orders: 5,
        delivered_orders: 5,
        returned_orders: 0,
        total_spent_dzd: 31500,
        last_order_at: 'Today 14:20',
        trust_score: 'VIP',
    },
    {
        id: 'cust_2',
        name: 'Sara Bouzid',
        phone: '0550 11 99 88',
        wilaya: '31 - Oran',
        commune: 'Bir El Djir',
        total_orders: 2,
        delivered_orders: 2,
        returned_orders: 0,
        total_spent_dzd: 14300,
        last_order_at: 'Today 13:45',
        trust_score: 'Reliable',
    },
    {
        id: 'cust_3',
        name: 'Mohamed Brahimi',
        phone: '0770 45 67 89',
        wilaya: '25 - Constantine',
        commune: 'Ali Mendjeli',
        total_orders: 3,
        delivered_orders: 3,
        returned_orders: 0,
        total_spent_dzd: 26400,
        last_order_at: 'Today 12:10',
        trust_score: 'VIP',
    },
    {
        id: 'cust_4',
        name: 'Bilal Mansouri',
        phone: '0671 90 22 11',
        wilaya: '09 - Blida',
        commune: 'Boufarik',
        total_orders: 3,
        delivered_orders: 1,
        returned_orders: 2,
        total_spent_dzd: 5900,
        last_order_at: 'Today 09:15',
        trust_score: 'Risky',
    },
];

export default function StoreMerchantCustomers() {
    const [customers, setCustomers] = useState<CustomerRecord[]>(CUSTOMERS);
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = customers.filter(
        (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.phone.includes(searchQuery) ||
            c.wilaya.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <StoreMerchantLayout activeNav="customers" title="Customers Directory">
            <Head title="Customers - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Customers & COD Trust Directory
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Customer phone records captured across all 58 Wilayas with return history and trust scoring.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                            <Download className="size-3.5" />
                            <span>Export Customer List</span>
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <div className="flex justify-end">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                        <Input
                            placeholder="Search by name, phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-xs"
                        />
                    </div>
                </div>

                {/* Customers Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Customer Database</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Customer</th>
                                    <th className="p-3.5 font-semibold">Phone Number</th>
                                    <th className="p-3.5 font-semibold">Wilaya & Commune</th>
                                    <th className="p-3.5 font-semibold">Delivered vs Retours</th>
                                    <th className="p-3.5 font-semibold">Total Spent</th>
                                    <th className="p-3.5 font-semibold">COD Trust Score</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Last Order</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filtered.map((cust) => (
                                    <tr key={cust.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-semibold text-foreground">
                                            {cust.name}
                                        </td>
                                        <td className="p-3.5 font-mono text-muted-foreground">
                                            {cust.phone}
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">
                                            {cust.wilaya} ({cust.commune})
                                        </td>
                                        <td className="p-3.5 font-mono">
                                            <span className="text-emerald-600 font-bold">
                                                {cust.delivered_orders} livrés
                                            </span>
                                            {cust.returned_orders > 0 && (
                                                <span className="text-red-500 font-bold ml-1.5">
                                                    • {cust.returned_orders} retours
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3.5 font-bold text-foreground">
                                            {cust.total_spent_dzd.toLocaleString()} DZD
                                        </td>
                                        <td className="p-3.5">
                                            {cust.trust_score === 'VIP' && (
                                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                                    ★ VIP Shopper
                                                </Badge>
                                            )}
                                            {cust.trust_score === 'Reliable' && (
                                                <Badge variant="outline" className="text-primary border-primary/30 text-[10px]">
                                                    Reliable
                                                </Badge>
                                            )}
                                            {cust.trust_score === 'Risky' && (
                                                <Badge variant="outline" className="text-red-500 border-red-500/30 text-[10px]">
                                                    High Return Risk
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 pr-5 text-right font-mono text-muted-foreground">
                                            {cust.last_order_at}
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
