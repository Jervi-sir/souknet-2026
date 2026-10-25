import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Tags,
    Plus,
    Search,
    Edit2,
    Trash2,
    Package,
    Sparkles,
    Flame,
    ArrowRight,
    Check,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CategoryItem {
    id: string;
    name: string;
    slug: string;
    products_count: number;
    description: string;
    is_active: boolean;
}

const CATEGORIES: CategoryItem[] = [
    { id: 'cat_1', name: 'Footwear & Running Shoes', slug: 'footwear-sports', products_count: 16, description: 'Athletic, breathable sneakers & urban boots', is_active: true },
    { id: 'cat_2', name: 'Tech & Smart Gadgets', slug: 'electronics-smart', products_count: 12, description: 'Smartwatches, earbuds, wireless charging docks', is_active: true },
    { id: 'cat_3', name: 'Men Fashion & Apparel', slug: 'men-fashion', products_count: 14, description: 'Leather jackets, premium hoodies, streetwear', is_active: true },
    { id: 'cat_4', name: 'Fragrances & Beauty', slug: 'fragrances-luxury', products_count: 6, description: 'Royal amber, oriental oud extract, perfumes', is_active: true },
    { id: 'cat_5', name: 'Bags & Travel Accessories', slug: 'bags-accessories', products_count: 8, description: 'Laptop backpacks, leather wallets, commute gear', is_active: true },
];

export default function StoreMerchantCategories() {
    const [categories, setCategories] = useState<CategoryItem[]>(CATEGORIES);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const newCat: CategoryItem = {
            id: `cat_${Date.now()}`,
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            products_count: 0,
            description,
            is_active: true,
        };

        setCategories([...categories, newCat]);
        setName('');
        setDescription('');
        setIsCreateOpen(false);
    };

    const handleDelete = (id: string) => {
        setCategories(categories.filter((c) => c.id !== id));
    };

    return (
        <StoreMerchantLayout activeNav="categories" title="Categories & Collections">
            <Head title="Categories & Packs - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Categories & Collections
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Organize your products into collections and configure high-converting multi-packs.
                        </p>
                    </div>

                    <Button
                        onClick={() => setIsCreateOpen(!isCreateOpen)}
                        className="gap-2 h-9 text-xs font-semibold shadow-xs"
                    >
                        <Plus className="size-3.5" />
                        <span>Create Collection</span>
                    </Button>
                </div>

                {/* Create Form */}
                {isCreateOpen && (
                    <Card className="border-2 border-primary/20 bg-card shadow-md animate-in slide-in-from-top-3 duration-150">
                        <CardHeader className="pb-3 border-b border-border/60">
                            <CardTitle className="text-sm font-semibold tracking-tight">New Collection</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">Collection Name</Label>
                                        <Input
                                            required
                                            placeholder="e.g. Winter Essentials"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="h-9 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">Description</Label>
                                        <Input
                                            placeholder="Brief description for SEO"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="h-9 text-xs"
                                        />
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
                                        Save Collection
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Categories Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Store Collections</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Collection Name</th>
                                    <th className="p-3.5 font-semibold">Slug (URL)</th>
                                    <th className="p-3.5 font-semibold">Products</th>
                                    <th className="p-3.5 font-semibold">Description</th>
                                    <th className="p-3.5 font-semibold">Status</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {categories.map((cat) => (
                                    <tr key={cat.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-semibold text-foreground flex items-center gap-2">
                                            <Tags className="size-3.5 text-primary" />
                                            <span>{cat.name}</span>
                                        </td>
                                        <td className="p-3.5 font-mono text-muted-foreground">{cat.slug}</td>
                                        <td className="p-3.5 font-mono">{cat.products_count} items</td>
                                        <td className="p-3.5 text-muted-foreground max-w-xs truncate">{cat.description}</td>
                                        <td className="p-3.5">
                                            <Badge className="bg-emerald-600 text-white text-[10px]">Active</Badge>
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(cat.id)}
                                                className="size-7 text-muted-foreground hover:text-red-500"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </Button>
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
