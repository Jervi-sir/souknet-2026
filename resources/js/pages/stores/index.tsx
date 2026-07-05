import { Head, Link } from '@inertiajs/react';
import { Plus, ExternalLink, ShoppingBag, Eye, Settings, HelpCircle } from 'lucide-react';
import React from 'react';
import StoreLayout from '@/layouts/store-layout';
import StoreController from '@/actions/App/Http/Controllers/Owner/StoreController';

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
    products_count: number;
    created_at: string;
}

interface StoresIndexProps {
    stores: Store[];
}

export default function StoresIndex({ stores }: StoresIndexProps) {
    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return (
                    <span className="inline-flex items-center gap-1 bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25 px-2 py-0.5 rounded text-[10px] font-bold">
                        Active
                    </span>
                );
            case 'draft':
            default:
                return (
                    <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded text-[10px] font-bold">
                        Draft
                    </span>
                );
        }
    };

    return (
        <>
            <Head title="My Shopify-like Stores" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen p-6 space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 border-b border-[#262930] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#6AD2FF] tracking-wider uppercase">Store Builder</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight">
                            My Stores
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Manage your Shopify-like digital storefronts, catalog catalogs, and styling configurations.
                        </p>
                    </div>
                    <Link
                        href={StoreController.create.url()}
                        className="inline-flex items-center gap-1.5 bg-[#4318FF] hover:bg-[#3b15e6] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-900/20"
                    >
                        <Plus className="h-4 w-4" />
                        Create New Store
                    </Link>
                </div>

                {/* Stores Grid */}
                <div className="space-y-4">
                    {stores.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#262930] bg-[#0c0d12]/50 p-12 text-center">
                            <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-zinc-600" />
                            <h3 className="text-sm font-semibold text-zinc-400">No stores created yet</h3>
                            <p className="mx-auto mt-1 max-w-xs text-xs text-[#8f9bba]">
                                Launch your first Shopify-like store builder profile to list products and start selling online.
                            </p>
                            <Link
                                href={StoreController.create.url()}
                                className="inline-flex items-center gap-1.5 bg-[#4318FF] hover:bg-[#3b15e6] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg mt-4"
                            >
                                <Plus className="h-4 w-4" />
                                Create Your First Store
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {stores.map((store) => {
                                const primaryColor = store.theme_settings?.primary_color || '#4318FF';
                                return (
                                    <div
                                        key={store.id}
                                        className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] rounded-xl flex flex-col justify-between transition-all group"
                                    >
                                        <div className="space-y-4 p-5">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-black text-xs shrink-0" style={{ backgroundColor: primaryColor }}>
                                                        {store.name.substring(0, 1).toUpperCase()}
                                                    </span>
                                                    <div>
                                                        <h3 className="line-clamp-1 text-sm font-bold text-white group-hover:text-[#4318FF] transition-colors">
                                                            <Link href={StoreController.show({ id: store.id })}>
                                                                {store.name}
                                                            </Link>
                                                        </h3>
                                                        <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">
                                                            /store/{store.slug}
                                                        </span>
                                                    </div>
                                                </div>
                                                {getStatusBadge(store.status)}
                                            </div>

                                            {store.description && (
                                                <p className="line-clamp-2 text-xs text-[#8f9bba] leading-relaxed">
                                                    {store.description}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-zinc-400">
                                                <span className="bg-[#15171e] border border-[#262930] px-2 py-0.5 rounded">
                                                    {store.products_count} Products
                                                </span>
                                                {store.domain && (
                                                    <span className="bg-[#4318FF]/15 text-[#6AD2FF] border border-[#4318FF]/25 px-2 py-0.5 rounded font-bold">
                                                        {store.domain}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-between border-t border-[#262930]/40 px-5 py-3 text-xs bg-[#15171e]/20">
                                            <a
                                                href={`/store/${store.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#8f9bba] transition-colors hover:text-white font-medium inline-flex items-center gap-1"
                                            >
                                                View Live
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                            <Link
                                                href={StoreController.show({ id: store.id })}
                                                className="font-bold text-[#4318FF] hover:underline"
                                            >
                                                Manage Store
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

StoresIndex.layout = (page: React.ReactNode) => (
    <StoreLayout breadcrumbs={[{ title: 'Stores', href: '/stores' }]}>
        {page}
    </StoreLayout>
);
