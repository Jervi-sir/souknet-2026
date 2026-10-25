import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Package,
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    Eye,
    Copy,
    ArrowUpDown,
    Check,
    Star,
    Sparkles,
    Flame,
    Tag,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ProductItem {
    id: string;
    sku: string;
    title: string;
    category: string;
    price: number;
    compare_price?: number;
    cost_price: number;
    stock: number;
    status: 'active' | 'draft' | 'low_stock';
    orders_count: number;
    image_url: string;
    is_featured: boolean;
}

const PRODUCTS: ProductItem[] = [
    {
        id: 'prod_1',
        sku: 'SHOE-AIR-01',
        title: 'AirPulse Breathable Sport Running Shoes',
        category: 'Footwear & Sports',
        price: 5900,
        compare_price: 7800,
        cost_price: 2600,
        stock: 38,
        status: 'active',
        orders_count: 142,
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80',
        is_featured: true,
    },
    {
        id: 'prod_2',
        sku: 'WATCH-APEX-02',
        title: 'Apex Fit Pro Smartwatch (AMOLED + Calls)',
        category: 'Electronics',
        price: 6800,
        compare_price: 9200,
        cost_price: 3100,
        stock: 14,
        status: 'low_stock',
        orders_count: 98,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80',
        is_featured: true,
    },
    {
        id: 'prod_3',
        sku: 'JACKET-BOMB-03',
        title: 'Handcrafted Bomber Leather Jacket - Autumn Edition',
        category: 'Men Fashion',
        price: 11500,
        compare_price: 14900,
        cost_price: 5200,
        stock: 22,
        status: 'active',
        orders_count: 67,
        image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80',
        is_featured: false,
    },
    {
        id: 'prod_4',
        sku: 'AUDIO-ECHO-04',
        title: 'EchoPod Studio Active Noise-Cancelling Earbuds',
        category: 'Audio & Gadgets',
        price: 4400,
        compare_price: 5900,
        cost_price: 1800,
        stock: 65,
        status: 'active',
        orders_count: 189,
        image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80',
        is_featured: false,
    },
    {
        id: 'prod_5',
        sku: 'BAG-URBAN-05',
        title: 'Urban Oxford Minimalist Laptop Travel Backpack',
        category: 'Bags & Accessories',
        price: 4900,
        compare_price: 6500,
        cost_price: 2100,
        stock: 5,
        status: 'low_stock',
        orders_count: 53,
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80',
        is_featured: false,
    },
    {
        id: 'prod_6',
        sku: 'PERF-OUD-06',
        title: 'Royal Amber & Oud Intense Extract 100ml',
        category: 'Fragrances',
        price: 7200,
        compare_price: 8900,
        cost_price: 3300,
        stock: 0,
        status: 'draft',
        orders_count: 114,
        image_url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=200&q=80',
        is_featured: true,
    },
];

export default function StoreMerchantProducts() {
    const [products, setProducts] = useState<ProductItem[]>(PRODUCTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = products.filter((p) => {
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleDelete = (id: string) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    return (
        <StoreMerchantLayout activeNav="products" title="Products Catalog">
            <Head title="Products Catalog - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Products & Inventory
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Manage items, variants (sizes, colors), cost prices, and Algerian pack pricing.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Button className="h-9 gap-1.5 text-xs font-semibold shadow-xs">
                            <Plus className="size-3.5" />
                            <span>Add New Product</span>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                        {[
                            { key: 'all', label: 'All Products' },
                            { key: 'active', label: 'Active in Store' },
                            { key: 'low_stock', label: 'Low Stock (< 15)' },
                            { key: 'draft', label: 'Draft / Out of Stock' },
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
                            placeholder="Search by title, SKU..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-xs"
                        />
                    </div>
                </div>

                {/* Products Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Active Catalog</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Product</th>
                                    <th className="p-3.5 font-semibold">Category</th>
                                    <th className="p-3.5 font-semibold">Selling Price</th>
                                    <th className="p-3.5 font-semibold">Cost Price (Coût)</th>
                                    <th className="p-3.5 font-semibold">Stock</th>
                                    <th className="p-3.5 font-semibold">Orders</th>
                                    <th className="p-3.5 font-semibold">Status</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filtered.map((product) => {
                                    const margin = product.price - product.cost_price;
                                    const marginPercent = Math.round((margin / product.price) * 100);

                                    return (
                                        <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                                            <td className="p-3.5 pl-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-11 rounded-lg overflow-hidden bg-muted shrink-0 border border-border/60">
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-foreground block max-w-xs truncate">
                                                            {product.title}
                                                        </span>
                                                        <span className="text-[10px] font-mono text-muted-foreground">
                                                            SKU: {product.sku}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3.5 text-muted-foreground">
                                                {product.category}
                                            </td>
                                            <td className="p-3.5">
                                                <span className="font-bold text-foreground block">
                                                    {product.price.toLocaleString()} DZD
                                                </span>
                                                {product.compare_price && (
                                                    <span className="text-[10px] text-muted-foreground line-through">
                                                        {product.compare_price.toLocaleString()} DZD
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-3.5">
                                                <span className="text-muted-foreground block font-mono">
                                                    {product.cost_price.toLocaleString()} DZD
                                                </span>
                                                <span className="text-[10px] text-emerald-600 font-semibold">
                                                    +{marginPercent}% margin
                                                </span>
                                            </td>
                                            <td className="p-3.5 font-mono">
                                                {product.stock > 0 ? (
                                                    <span
                                                        className={
                                                            product.stock < 15
                                                                ? 'text-amber-600 font-bold'
                                                                : 'text-foreground font-semibold'
                                                        }
                                                    >
                                                        {product.stock} units
                                                    </span>
                                                ) : (
                                                    <span className="text-red-500 font-bold">0 (Rupture)</span>
                                                )}
                                            </td>
                                            <td className="p-3.5 font-mono">{product.orders_count} sold</td>
                                            <td className="p-3.5">
                                                {product.status === 'active' && (
                                                    <Badge className="bg-emerald-600 text-white text-[10px]">
                                                        Active
                                                    </Badge>
                                                )}
                                                {product.status === 'low_stock' && (
                                                    <Badge variant="outline" className="text-amber-600 border-amber-500/30 text-[10px]">
                                                        Low Stock
                                                    </Badge>
                                                )}
                                                {product.status === 'draft' && (
                                                    <Badge variant="secondary" className="text-[10px]">
                                                        Draft
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="p-3.5 pr-5 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="size-7" title="Edit">
                                                        <Edit3 className="size-3.5" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(product.id)}
                                                        className="size-7 text-muted-foreground hover:text-red-500"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </StoreMerchantLayout>
    );
}
