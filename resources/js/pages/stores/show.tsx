import { Head, Link } from '@inertiajs/react';
import { Plus, ExternalLink, Package, ArrowLeft, Paintbrush, ShoppingCart } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import StoreLayout from '@/layouts/store-layout';
import StoreProductController from '@/actions/App/Http/Controllers/Owner/StoreProductController';

interface StoreProduct {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price_cents: number;
    compare_at_price_cents: number | null;
    sku: string | null;
    barcode: string | null;
    inventory_quantity: number;
    track_inventory: boolean;
    status: string;
    image_path: string | null;
}

interface Store {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    domain: string | null;
    theme_settings: {
        primary_color?: string;
    } | null;
    status: string;
    products: StoreProduct[];
}

interface StoreShowProps {
    store: Store;
}

export default function StoreShow({ store }: StoreShowProps) {
    const primaryColor = store.theme_settings?.primary_color || '#4318FF';

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return <span className="inline-flex items-center gap-1 bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25 px-2 py-0.5 rounded text-[10px] font-bold">Active</span>;
            case 'draft':
                return <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded text-[10px] font-bold">Draft</span>;
            case 'archived':
                return <span className="inline-flex items-center gap-1 bg-red-500/15 text-red-400 border border-red-500/25 px-2 py-0.5 rounded text-[10px] font-bold">Archived</span>;
            default:
                return <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded text-[10px] font-bold">{status}</span>;
        }
    };

    return (
        <>
            <Head title={`Manage - ${store.name}`} />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen p-6 space-y-6">
                <div>
                    <Link
                        href="/stores"
                        className="inline-flex items-center gap-1.5 text-xs text-[#8f9bba] hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Stores
                    </Link>
                </div>

                <div className="flex flex-col gap-4 border-b border-[#262930] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                            <span className="text-[10px] font-bold tracking-wider uppercase text-[#8f9bba]">Store Console</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white">{store.name}</h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">{store.description || 'No description provided.'}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href={`/store/${store.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#22252e] hover:bg-zinc-800 text-white border border-[#262930] px-4 py-2 rounded-lg text-xs font-bold transition-all"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View Live Storefront
                        </a>
                        <Link
                            href={StoreProductController.create.url({ storeId: store.id })}
                            className="inline-flex items-center gap-1.5 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg"
                            style={{ backgroundColor: primaryColor }}
                        >
                            <Plus className="h-4 w-4" />
                            Add Store Product
                        </Link>
                    </div>
                </div>

                {/* Configurations Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-5 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                            <Paintbrush className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider">Branding Color</div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="h-3.5 w-3.5 rounded border border-white/20" style={{ backgroundColor: primaryColor }} />
                                <span className="text-sm font-black text-white">{primaryColor}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-5 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                            <ShoppingCart className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider">Active Domain</div>
                            <div className="text-sm font-black text-white mt-0.5">{store.domain || `/store/${store.slug}`}</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-5 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                            <Package className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider">Total Products</div>
                            <div className="text-sm font-black text-white mt-0.5">{store.products.length} cataloged</div>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="space-y-4 pt-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">Store Catalog ({store.products.length})</h2>
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden">
                        {store.products.length === 0 ? (
                            <div className="p-12 text-center">
                                <Package className="mx-auto mb-3 h-10 w-10 text-zinc-600" />
                                <h3 className="text-sm font-semibold text-zinc-400">No products cataloged</h3>
                                <p className="mx-auto mt-1 max-w-xs text-xs text-[#8f9bba]">
                                    Get started by adding your first product to this storefront.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#262930] text-[10px] font-bold uppercase tracking-wider text-[#8f9bba] bg-[#15171e]/30">
                                            <th className="py-3.5 px-5">Product Name</th>
                                            <th className="py-3.5 px-5">Price</th>
                                            <th className="py-3.5 px-5">SKU / Barcode</th>
                                            <th className="py-3.5 px-5">Stock Level</th>
                                            <th className="py-3.5 px-5">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#262930]/40 text-xs">
                                        {store.products.map((product) => (
                                            <tr key={product.id} className="hover:bg-[#15171e]/10 transition-colors">
                                                <td className="py-4 px-5">
                                                    <div className="flex items-center gap-3">
                                                        {product.image_path ? (
                                                            <img
                                                                src={product.image_path}
                                                                alt={product.name}
                                                                className="h-10 w-10 rounded border border-[#262930] object-cover bg-zinc-900"
                                                            />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded border border-[#262930] bg-[#15171e] flex items-center justify-center text-zinc-500 font-bold">
                                                                P
                                                            </div>
                                                        )}
                                                        <div>
                                                            <span className="font-bold text-white block">{product.name}</span>
                                                            {product.description && (
                                                                <span className="text-[10px] text-[#8f9bba] line-clamp-1 max-w-xs mt-0.5">{product.description}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-5 font-semibold">
                                                    ${(product.price_cents / 100).toFixed(2)}
                                                    {product.compare_at_price_cents && (
                                                        <span className="text-[10px] text-zinc-500 line-through ml-1.5">
                                                            ${(product.compare_at_price_cents / 100).toFixed(2)}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-5 text-zinc-400 font-mono">
                                                    {product.sku || 'N/A'} {product.barcode ? `| ${product.barcode}` : ''}
                                                </td>
                                                <td className="py-4 px-5">
                                                    {product.track_inventory ? (
                                                        <span className={product.inventory_quantity > 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                                                            {product.inventory_quantity} in stock
                                                        </span>
                                                    ) : (
                                                        <span className="text-zinc-500">Not tracked</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-5">{getStatusBadge(product.status)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

StoreShow.layout = (page: React.ReactNode) => {
    return (
        <StoreLayout breadcrumbs={[{ title: 'Manage Store', href: '#' }]}>
            {page}
        </StoreLayout>
    );
};
