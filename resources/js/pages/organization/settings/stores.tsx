import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Store,
    Plus,
    ExternalLink,
    Check,
    Settings,
    MapPin,
    DollarSign,
    ShoppingCart,
    Trash2,
} from 'lucide-react';
import OrganizationLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OrgStore {
    id: string;
    name: string;
    slug: string;
    domain: string;
    wilaya: string;
    monthly_revenue: string;
    orders_count: number;
    status: 'active' | 'draft';
}

const ORG_STORES: OrgStore[] = [
    {
        id: 'store_1',
        name: 'DzAvenue Boutique',
        slug: 'dzavenue',
        domain: 'dzavenue.dz',
        wilaya: '16 - Alger',
        monthly_revenue: '1,485,000 DZD',
        orders_count: 312,
        status: 'active',
    },
    {
        id: 'store_2',
        name: 'Algeria Sneaker Lab',
        slug: 'sneakerlab',
        domain: 'sneakerlab.souknet.dz',
        wilaya: '31 - Oran',
        monthly_revenue: '620,000 DZD',
        orders_count: 86,
        status: 'active',
    },
    {
        id: 'store_3',
        name: 'Dar El Caftan Premium',
        slug: 'caftan-dz',
        domain: 'caftan.souknet.dz',
        wilaya: '25 - Constantine',
        monthly_revenue: '340,000 DZD',
        orders_count: 38,
        status: 'active',
    },
];

export default function OrganizationSettingsStores() {
    const [stores, setStores] = useState<OrgStore[]>(ORG_STORES);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [name, setName] = useState('');
    const [wilaya, setWilaya] = useState('16 - Algiers');

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const newStore: OrgStore = {
            id: `store_${Date.now()}`,
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            domain: `${name.toLowerCase().replace(/\s+/g, '-')}.souknet.dz`,
            wilaya,
            monthly_revenue: '0 DZD',
            orders_count: 0,
            status: 'active',
        };

        setStores([...stores, newStore]);
        setName('');
        setIsCreateOpen(false);
    };

    return (
        <OrganizationLayout activeNav="stores" title="Stores under Organization">
            <Head title="Stores & Brands - Atlas Commerce Group" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Stores & Brands ({stores.length}/5 Used)
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Each store gets its own customizable storefront, product catalog, and delivery accounts while sharing centralized call center operators.
                        </p>
                    </div>

                    <Button
                        onClick={() => setIsCreateOpen(!isCreateOpen)}
                        className="gap-2 h-9 text-xs font-semibold shadow-xs"
                    >
                        <Plus className="size-3.5" />
                        <span>Add New Storefront</span>
                    </Button>
                </div>

                {/* Create Modal */}
                {isCreateOpen && (
                    <Card className="border-2 border-primary/20 bg-card shadow-md animate-in slide-in-from-top-3 duration-150">
                        <CardHeader className="pb-3 border-b border-border/60">
                            <CardTitle className="text-sm font-semibold tracking-tight">Add New Store</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">Store Name</Label>
                                        <Input
                                            required
                                            placeholder="e.g. Oran Watches Collection"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="h-9 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">Warehouse Origin Wilaya</Label>
                                        <select
                                            value={wilaya}
                                            onChange={(e) => setWilaya(e.target.value)}
                                            className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs cursor-pointer"
                                        >
                                            <option value="16 - Algiers">16 - Alger</option>
                                            <option value="31 - Oran">31 - Oran</option>
                                            <option value="25 - Constantine">25 - Constantine</option>
                                            <option value="19 - Sétif">19 - Sétif</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsCreateOpen(false)}
                                        className="h-8 text-xs"
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" size="sm" className="h-8 text-xs font-semibold">
                                        Create Store
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Stores Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Active Online Shops</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Store Brand</th>
                                    <th className="p-3.5 font-semibold">Domain / URL</th>
                                    <th className="p-3.5 font-semibold">Origin Wilaya</th>
                                    <th className="p-3.5 font-semibold">Monthly Orders</th>
                                    <th className="p-3.5 font-semibold">Gross Revenue</th>
                                    <th className="p-3.5 font-semibold">Status</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {stores.map((store) => (
                                    <tr key={store.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-bold text-foreground flex items-center gap-2">
                                            <div className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                                {store.name.charAt(0)}
                                            </div>
                                            <span>{store.name}</span>
                                        </td>
                                        <td className="p-3.5 font-mono text-muted-foreground">{store.domain}</td>
                                        <td className="p-3.5 text-muted-foreground">{store.wilaya}</td>
                                        <td className="p-3.5 font-mono">{store.orders_count} orders</td>
                                        <td className="p-3.5 font-bold text-foreground">{store.monthly_revenue}</td>
                                        <td className="p-3.5">
                                            <Badge className="bg-emerald-600 text-white text-[10px]">Active</Badge>
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href="/store-merchant/dashboard">
                                                    <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-primary">
                                                        Manage
                                                    </Button>
                                                </Link>
                                                <a
                                                    href="/storefront"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-1 text-muted-foreground hover:text-foreground"
                                                >
                                                    <ExternalLink className="size-3.5" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </OrganizationLayout>
    );
}
