import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, PlusCircle, Package } from 'lucide-react';
import React from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import StoreLayout from '@/layouts/store-layout';
import StoreProductController from '@/actions/App/Http/Controllers/Owner/StoreProductController';

interface Store {
    id: number;
    name: string;
    slug: string;
}

interface CreateProductProps {
    store: Store;
}

export default function CreateProduct({ store }: CreateProductProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        compare_at_price: '',
        sku: '',
        barcode: '',
        inventory_quantity: '0',
        track_inventory: true,
        status: 'active',
        image_path: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(StoreProductController.store.url({ storeId: store.id }));
    };

    return (
        <>
            <Head title={`Add Product - ${store.name}`} />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                <div>
                    <Link
                        href={`/stores/${store.id}`}
                        className="inline-flex items-center gap-1.5 text-xs text-[#8f9bba] hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Store Overview
                    </Link>
                </div>

                <div className="border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#4318FF] tracking-wider uppercase">Catalog Administration</span>
                    </div>
                    <h1 className="text-xl font-extrabold text-white">Add Product to {store.name}</h1>
                    <p className="text-xs text-[#8f9bba] mt-0.5">
                        Add a new inventory item with pricing details, SKU reference, and stock levels.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto w-full">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card className="border-[#262930] bg-[#0c0d12] backdrop-blur-sm">
                            <CardHeader className="border-b border-[#262930] pb-4">
                                <CardTitle className="text-white text-sm font-bold flex items-center gap-2">
                                    <Package className="h-4.5 w-4.5 text-[#4318FF]" />
                                    Product Specification
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Product Name *</label>
                                    <Input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF]"
                                        placeholder="e.g. Wireless Noise-Cancelling Headphones"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Description</label>
                                    <Textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF] min-h-[100px]"
                                        placeholder="Product specification, highlights, or description..."
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Price ($ USD) *</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF]"
                                            placeholder="e.g. 19.99"
                                        />
                                        <InputError message={errors.price} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Compare At Price ($ USD)</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={data.compare_at_price}
                                            onChange={(e) => setData('compare_at_price', e.target.value)}
                                            className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF]"
                                            placeholder="e.g. 29.99"
                                        />
                                        <InputError message={errors.compare_at_price} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">SKU</label>
                                        <Input
                                            type="text"
                                            value={data.sku}
                                            onChange={(e) => setData('sku', e.target.value)}
                                            className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF]"
                                            placeholder="e.g. SKU-12345"
                                        />
                                        <InputError message={errors.sku} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Barcode</label>
                                        <Input
                                            type="text"
                                            value={data.barcode}
                                            onChange={(e) => setData('barcode', e.target.value)}
                                            className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF]"
                                            placeholder="e.g. 1234567890"
                                        />
                                        <InputError message={errors.barcode} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Inventory Quantity</label>
                                        <Input
                                            type="number"
                                            required
                                            value={data.inventory_quantity}
                                            onChange={(e) => setData('inventory_quantity', e.target.value)}
                                            className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF]"
                                        />
                                        <InputError message={errors.inventory_quantity} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Status</label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none focus:ring-1 focus:ring-[#4318FF]"
                                        >
                                            <option value="active">Active</option>
                                            <option value="draft">Draft</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        <InputError message={errors.status} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="track_inventory"
                                        checked={data.track_inventory}
                                        onChange={(e) => setData('track_inventory', e.target.checked)}
                                        className="h-4 w-4 bg-[#111111] border-[#262930] text-[#4318FF] rounded focus:ring-0"
                                    />
                                    <label htmlFor="track_inventory" className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba] cursor-pointer">
                                        Track stock level inventory
                                    </label>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Product Image URL</label>
                                    <Input
                                        type="text"
                                        value={data.image_path}
                                        onChange={(e) => setData('image_path', e.target.value)}
                                        className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF]"
                                        placeholder="e.g. https://images.unsplash.com/... (optional)"
                                    />
                                    <InputError message={errors.image_path} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href={`/stores/${store.id}`}
                                className="inline-flex items-center justify-center rounded-lg bg-[#111111] border border-[#262930] px-5 py-2.5 text-xs font-semibold text-[#8f9bba] hover:bg-zinc-800 transition-colors"
                            >
                                Cancel
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-[#4318FF] hover:bg-[#3b15e6] text-white font-semibold px-6 py-2.5 rounded-lg text-xs flex items-center gap-1.5"
                            >
                                <Save className="h-4 w-4" />
                                Add Product
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

CreateProduct.layout = (page: React.ReactNode) => (
    <StoreLayout breadcrumbs={[{ title: 'Add Product', href: '#' }]}>
        {page}
    </StoreLayout>
);
