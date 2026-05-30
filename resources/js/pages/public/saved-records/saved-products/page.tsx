import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    MapPin,
    Building2,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    Package,
    Cpu,
    MoreHorizontal
} from 'lucide-react';
import React, { useState } from 'react';
import GuestLayout from '@/layouts/guest-layout';

interface Product {
    id: number;
    business_id: number;
    category_id: number | null;
    name: string;
    slug: string;
    price_monthly_cents: number;
    price_cents: number | null;
    specs: Record<string, any> | string[] | string | null;
    type: 'machinery' | 'manufacture' | 'small';
    is_active: boolean;
    business?: {
        id: number;
        name: string;
        slug: string;
    } | null;
    category?: {
        id: number;
        en: string;
    } | null;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface SavedProductsProps {
    products: PaginatedProducts;
    savedProductIds: number[];
    filters: {
        search: string;
    };
}

export default function SavedProducts({
    products,
    savedProductIds = [],
    filters,
}: SavedProductsProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});

    const applyFilters = (updatedParams?: Record<string, any>) => {
        const params: Record<string, any> = {
            search,
            ...updatedParams,
        };

        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        router.get('/saved-products', params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const handleClearFilters = () => {
        setSearch('');
        router.get('/saved-products', {});
    };

    const toggleRow = (id: number) => {
        setSelectedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const selectAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const newSelected: Record<number, boolean> = {};

        if (checked) {
            products.data.forEach(p => {
                newSelected[p.id] = true;
            });
        }

        setSelectedRows(newSelected);
    };

    const handleToggleSave = (productId: number) => {
        router.post(`/products/${productId}/save`, {}, {
            preserveScroll: true,
        });
    };

    const handleBulkSave = () => {
        const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[Number(id)]);

        if (selectedIds.length === 0) {
return;
}

        router.post('/products/save-multiple', { ids: selectedIds.map(Number) }, {
            preserveScroll: true,
            onSuccess: () => setSelectedRows({}),
        });
    };

    const formatSpecs = (specs: any) => {
        if (!specs) {
return 'No specifications';
}

        if (typeof specs === 'string') {
return specs;
}

        if (Array.isArray(specs)) {
return specs.join(' • ');
}

        if (typeof specs === 'object') {
            return Object.entries(specs).map(([k, v]) => `${k}: ${v}`).join(' • ');
        }

        return String(specs);
    };

    const formatPrice = (p: Product) => {
        if (p.price_cents) {
            return `$${(p.price_cents / 100).toFixed(2)}`;
        }

        if (p.price_monthly_cents) {
            return `$${(p.price_monthly_cents / 100).toFixed(2)}/mo`;
        }

        return 'Request Quote';
    };

    const allSelected = products.data.length > 0 && products.data.every(p => selectedRows[p.id]);
    const anySelected = Object.values(selectedRows).some(Boolean);

    return (
        <GuestLayout>
            <Head>
                <title>Saved Products - SoukNet</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex-1 flex flex-col min-w-0 bg-[#15171e] p-6 space-y-4">
                {/* Header line */}
                <div className="flex items-center justify-between border-b border-[#262930] pb-3">
                    <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <Package className="h-5 w-5 text-[#4318FF]" />
                        Saved Products ({products.total})
                    </h1>
                    <div className="flex items-center gap-2">
                        {anySelected && (
                            <button
                                onClick={handleBulkSave}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                            >
                                <Bookmark className="h-3.5 w-3.5" />
                                Unsave Selected
                            </button>
                        )}
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <form onSubmit={handleSearchSubmit} className="relative w-48 sm:w-64">
                                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#8f9bba]" />
                                <input
                                    type="text"
                                    placeholder="Search saved products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-[#0c0d12] border border-[#262930] rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF]"
                                />
                            </form>
                            {search && (
                                <button onClick={handleClearFilters} className="text-xs text-[#8f9bba] hover:text-white font-semibold">
                                    Clear Search
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="flex-1 bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden flex flex-col justify-between">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs select-none">
                            <thead>
                                <tr className="border-b border-[#262930] bg-[#15171e]/50 text-[#8f9bba]">
                                    <th className="p-3 w-10">
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            onChange={selectAllRows}
                                            className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                                        />
                                    </th>
                                    <th className="p-3 font-semibold">Product Name</th>
                                    <th className="p-3 font-semibold">Company / Seller</th>
                                    <th className="p-3 font-semibold">Category</th>
                                    <th className="p-3 font-semibold">Specifications</th>
                                    <th className="p-3 font-semibold">Price</th>
                                    <th className="p-3 w-20 text-center">Unsave</th>
                                    <th className="p-3 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262930] text-zinc-100">
                                {products.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="p-12 text-center text-[#8f9bba]">
                                            <Package className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                                            <h3 className="font-bold text-white text-sm">No Saved Products Found</h3>
                                            <p className="text-xs text-[#8f9bba] mt-1 max-w-xs mx-auto">
                                                Save products from the Products Directory to build your list.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    products.data.map((product) => {
                                        const isSelected = !!selectedRows[product.id];

                                        return (
                                            <tr key={product.id} className={`hover:bg-[#15171e]/40 transition-colors ${isSelected ? 'bg-[#4318FF]/5' : ''}`}>
                                                <td className="p-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleRow(product.id)}
                                                        className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                                                    />
                                                </td>
                                                <td className="p-3 font-bold text-white hover:text-[#6AD2FF] cursor-pointer">
                                                    {product.name}
                                                </td>
                                                <td className="p-3">
                                                    {product.business ? (
                                                        <Link href={`/directory/${product.business.slug}`} className="font-semibold text-white hover:underline">
                                                            {product.business.name}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-zinc-500 italic">Independent</span>
                                                    )}
                                                </td>
                                                <td className="p-3 text-[#8f9bba]">
                                                    {product.category?.en || 'General'}
                                                </td>
                                                <td className="p-3 flex items-center gap-2 max-w-xs">
                                                    <Cpu className="h-3.5 w-3.5 text-[#8f9bba] shrink-0" />
                                                    <span className="truncate text-[#8f9bba]">{formatSpecs(product.specs)}</span>
                                                </td>
                                                <td className="p-3 font-semibold text-white">
                                                    {formatPrice(product)}
                                                </td>
                                                <td className="p-3 text-center">
                                                    <button
                                                        onClick={() => handleToggleSave(product.id)}
                                                        className="p-1.5 rounded-lg border bg-[#4318FF] border-[#4318FF] text-white hover:bg-[#3b15e6] transition-all"
                                                        title="Remove from saved list"
                                                    >
                                                        <Bookmark className="h-3.5 w-3.5" />
                                                    </button>
                                                </td>
                                                <td className="p-3 text-right">
                                                    <MoreHorizontal className="h-4 w-4 text-[#8f9bba] hover:text-white cursor-pointer transition-colors" />
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination footer details */}
                    {products.data.length > 0 && (
                        <div className="border-t border-[#262930] bg-[#15171e]/30 px-4 py-3 flex items-center justify-between text-xs text-[#8f9bba]">
                            <div>
                                Showing {products.from || 0}-{products.to || 0} of {products.total}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    disabled={products.current_page === 1}
                                    onClick={() => {
                                        const prevLink = products.links.find(l => l.label.includes('Previous'));

                                        if (prevLink?.url) {
router.visit(prevLink.url);
}
                                    }}
                                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#15171e] border border-[#262930] text-[#8f9bba] disabled:opacity-30 enabled:hover:bg-[#22252e] transition-colors"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <span className="font-bold text-white">{products.current_page} / {products.last_page}</span>
                                <button
                                    disabled={products.current_page === products.last_page}
                                    onClick={() => {
                                        const nextLink = products.links.find(l => l.label.includes('Next'));

                                        if (nextLink?.url) {
router.visit(nextLink.url);
}
                                    }}
                                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#15171e] border border-[#262930] text-[#8f9bba] disabled:opacity-30 enabled:hover:bg-[#22252e] transition-colors"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
