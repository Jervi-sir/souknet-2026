import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Boxes,
    Search,
    Plus,
    Minus,
    AlertTriangle,
    CheckCircle2,
    Save,
    RotateCcw,
    Truck,
    Package,
    ArrowUpDown,
    Download,
    Check,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface InventoryItem {
    id: string;
    sku: string;
    title: string;
    variant: string; // e.g. "Size 42 / Carmine Red"
    warehouse: string;
    in_stock: number;
    committed: number; // In transit / pending call confirmation
    available: number;
    safety_threshold: number;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const INVENTORY_ITEMS: InventoryItem[] = [
    {
        id: 'inv_1',
        sku: 'SHOE-AIR-42-RED',
        title: 'AirPulse Breathable Sport Shoes',
        variant: 'Size 42 / Carmine Red',
        warehouse: 'Alger Centre Warehouse',
        in_stock: 38,
        committed: 12,
        available: 26,
        safety_threshold: 10,
        status: 'in_stock',
    },
    {
        id: 'inv_2',
        sku: 'SHOE-AIR-43-RED',
        title: 'AirPulse Breathable Sport Shoes',
        variant: 'Size 43 / Carmine Red',
        warehouse: 'Alger Centre Warehouse',
        in_stock: 14,
        committed: 8,
        available: 6,
        safety_threshold: 10,
        status: 'low_stock',
    },
    {
        id: 'inv_3',
        sku: 'WATCH-APEX-TI',
        title: 'Apex Fit Pro Smartwatch',
        variant: 'AMOLED / Titanium Grey',
        warehouse: 'Alger Centre Warehouse',
        in_stock: 19,
        committed: 6,
        available: 13,
        safety_threshold: 5,
        status: 'in_stock',
    },
    {
        id: 'inv_4',
        sku: 'JACKET-BOMB-M',
        title: 'Bomber Leather Jacket',
        variant: 'Size M / Vintage Brown',
        warehouse: 'Oran Regional Hub',
        in_stock: 8,
        committed: 4,
        available: 4,
        safety_threshold: 5,
        status: 'low_stock',
    },
    {
        id: 'inv_5',
        sku: 'BAG-URBAN-OXF',
        title: 'Urban Laptop Travel Backpack',
        variant: 'Standard / Oxford Black',
        warehouse: 'Alger Centre Warehouse',
        in_stock: 3,
        committed: 3,
        available: 0,
        safety_threshold: 5,
        status: 'out_of_stock',
    },
    {
        id: 'inv_6',
        sku: 'PERF-OUD-100',
        title: 'Royal Amber & Oud Intense Extract',
        variant: '100ml Bottle',
        warehouse: 'Alger Centre Warehouse',
        in_stock: 0,
        committed: 0,
        available: 0,
        safety_threshold: 10,
        status: 'out_of_stock',
    },
];

export default function StoreMerchantInventory() {
    const [items, setItems] = useState<InventoryItem[]>(INVENTORY_ITEMS);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [saved, setSaved] = useState(false);

    const handleAdjustStock = (id: string, delta: number) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    const newInStock = Math.max(0, item.in_stock + delta);
                    const newAvailable = Math.max(0, newInStock - item.committed);
                    const newStatus =
                        newAvailable === 0
                            ? 'out_of_stock'
                            : newAvailable <= item.safety_threshold
                              ? 'low_stock'
                              : 'in_stock';
                    return {
                        ...item,
                        in_stock: newInStock,
                        available: newAvailable,
                        status: newStatus,
                    };
                }
                return item;
            }),
        );
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const filtered = items.filter((item) => {
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.variant.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const totalStock = items.reduce((acc, curr) => acc + curr.in_stock, 0);
    const totalCommitted = items.reduce((acc, curr) => acc + curr.committed, 0);
    const lowStockCount = items.filter((i) => i.status === 'low_stock').length;
    const outOfStockCount = items.filter((i) => i.status === 'out_of_stock').length;

    return (
        <StoreMerchantLayout activeNav="inventory" title="Stock & Inventory">
            <Head title="Inventory Management - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Stock & Inventory Control
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Real-time warehouse stock balancing, reserved units for pending COD orders, and reorder alerts.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                            <Download className="size-3.5" />
                            <span>Export Stock Sheet</span>
                        </Button>
                        <Button onClick={handleSave} className="gap-2 h-9 text-xs font-semibold shadow-xs">
                            {saved ? <Check className="size-4 text-emerald-400" /> : <Save className="size-4" />}
                            <span>{saved ? 'Stock Updated!' : 'Save Adjustments'}</span>
                        </Button>
                    </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">Total Physical Units</span>
                            <div className="text-2xl font-extrabold text-foreground">{totalStock} units</div>
                            <span className="text-[10px] text-muted-foreground">In Algerian warehouses</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">Committed / Shipped (Colis)</span>
                            <div className="text-2xl font-extrabold text-primary">{totalCommitted} units</div>
                            <span className="text-[10px] text-muted-foreground">Reserved for active orders</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">Low Stock Alerts</span>
                            <div className="text-2xl font-extrabold text-amber-600">{lowStockCount} SKUs</div>
                            <span className="text-[10px] text-amber-600 font-medium">Below safety threshold</span>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 shadow-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-xs text-muted-foreground font-medium">Out of Stock (Rupture)</span>
                            <div className="text-2xl font-extrabold text-red-500">{outOfStockCount} SKUs</div>
                            <span className="text-[10px] text-red-500 font-medium">Restock needed</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                        {[
                            { key: 'all', label: 'All Inventory' },
                            { key: 'in_stock', label: 'In Stock' },
                            { key: 'low_stock', label: 'Low Stock (< Safety)' },
                            { key: 'out_of_stock', label: 'Rupture (0)' },
                        ].map((s) => (
                            <button
                                key={s.key}
                                type="button"
                                onClick={() => setStatusFilter(s.key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                                    statusFilter === s.key
                                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                                        : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                        <Input
                            placeholder="Search variant, SKU, item..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-xs"
                        />
                    </div>
                </div>

                {/* Inventory Master Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Variant Stock Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">SKU & Item</th>
                                    <th className="p-3.5 font-semibold">Variant Specification</th>
                                    <th className="p-3.5 font-semibold">Warehouse</th>
                                    <th className="p-3.5 font-semibold">Physical Stock</th>
                                    <th className="p-3.5 font-semibold">Committed (Orders)</th>
                                    <th className="p-3.5 font-semibold">Available to Sell</th>
                                    <th className="p-3.5 font-semibold">Status</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Quick Adjustment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-mono font-bold text-foreground">
                                            {item.sku}
                                            <span className="block text-[10px] font-sans font-normal text-muted-foreground">
                                                {item.title}
                                            </span>
                                        </td>
                                        <td className="p-3.5 font-semibold text-foreground">
                                            {item.variant}
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">
                                            {item.warehouse}
                                        </td>
                                        <td className="p-3.5 font-bold font-mono text-foreground">
                                            {item.in_stock}
                                        </td>
                                        <td className="p-3.5 font-mono text-muted-foreground">
                                            {item.committed} reserved
                                        </td>
                                        <td className="p-3.5 font-extrabold font-mono text-sm">
                                            {item.available > 0 ? (
                                                <span className="text-emerald-600 dark:text-emerald-400">
                                                    {item.available}
                                                </span>
                                            ) : (
                                                <span className="text-red-500">0</span>
                                            )}
                                        </td>
                                        <td className="p-3.5">
                                            {item.status === 'in_stock' && (
                                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                                    In Stock
                                                </Badge>
                                            )}
                                            {item.status === 'low_stock' && (
                                                <Badge variant="outline" className="text-amber-600 border-amber-500/30 text-[10px]">
                                                    Low Stock
                                                </Badge>
                                            )}
                                            {item.status === 'out_of_stock' && (
                                                <Badge variant="secondary" className="text-red-500 text-[10px]">
                                                    Rupture
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleAdjustStock(item.id, -1)}
                                                    className="size-7"
                                                    title="Decrease 1"
                                                >
                                                    <Minus className="size-3" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleAdjustStock(item.id, 1)}
                                                    className="size-7"
                                                    title="Increase 1"
                                                >
                                                    <Plus className="size-3" />
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
