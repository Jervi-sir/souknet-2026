import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    MapPin,
    Sparkles,
    SlidersHorizontal,
    Building2,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    Plus,
    Package,
    Settings,
    Tag,
    Cpu,
    Truck,
    Shield,
    DollarSign,
    Layers,
    ShoppingCart,
    Bookmark
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
    image_color: string | null;
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

interface Category {
    id: number;
    code: string;
    en: string;
    fr: string | null;
    ar: string | null;
    icon: string | null;
    hex_color: string | null;
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

interface ProductsProps {
    products: PaginatedProducts;
    categories: Category[];
    savedProductIds: number[];
    filters: {
        search: string;
        category: string;
        type: string;
        sort: string;
        tab: string;
    };
}

export default function ProductsDirectory({
    products,
    categories,
    savedProductIds = [],
    filters,
}: ProductsProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [type, setType] = useState(filters.type || 'all');
    const [sort, setSort] = useState(filters.sort || 'newest');
    const [expandedFilter, setExpandedFilter] = useState('categories');

    const applyFilters = (updatedParams?: Record<string, any>) => {
        const params: Record<string, any> = {
            search,
            category,
            type: type === 'all' ? '' : type,
            sort,
            tab: filters.tab || 'all',
            ...updatedParams,
        };

        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        router.get('/products', params, {
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
        setCategory('');
        setType('all');
        setSort('newest');
        router.get('/products', { tab: filters.tab || 'all' });
    };

    const handleToggleSave = (productId: number) => {
        router.post(`/products/${productId}/save`, {}, {
            preserveScroll: true,
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

    return (
        <GuestLayout>
            <Head>
                <title>Products Directory - SoukNet</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-[calc(100vh-48px)]">
                {/* 1. Left Filters Panel Drawer */}
                <aside className="w-64 border-r border-[#262930] bg-[#0c0d12] flex flex-col justify-between shrink-0 select-none">
                    <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                        {/* Category Selector */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'categories' ? '' : 'categories')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <Layers className="h-3.5 w-3.5" />
                                    Categories / Segment
                                </span>
                                {expandedFilter === 'categories' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'categories' && (
                                <div className="px-4 pb-4 space-y-2">
                                    <select
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                            applyFilters({ category: e.target.value });
                                        }}
                                        className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4318FF]"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.en}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 border-t border-[#262930] bg-[#0c0d12] flex items-center justify-between text-xs">
                        <button onClick={handleClearFilters} className="text-[#8f9bba] hover:text-white font-semibold">Reset filters</button>
                        <button className="bg-[#22252e] hover:bg-[#2c303c] px-3 py-1.5 rounded-lg font-bold text-white transition-colors">Clear all</button>
                    </div>
                </aside>

                {/* 2. Main products explorer area */}
                <main className="flex-1 flex flex-col min-w-0 bg-[#15171e] p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#262930] pb-3">
                        <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                            <Package className="h-5 w-5 text-[#4318FF]" />
                            Explore Products / Machinery
                        </h1>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c0d12] rounded-lg border border-[#262930] text-xs font-semibold text-white">
                                    <span>Browse Grid</span>
                                    <ChevronDown className="h-3 w-3" />
                                </div>
                                <form onSubmit={handleSearchSubmit} className="relative w-48 sm:w-64">
                                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#8f9bba]" />
                                    <input
                                        type="text"
                                        placeholder="Search machinery, parts, products..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-[#0c0d12] border border-[#262930] rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF]"
                                    />
                                </form>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-900/20">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    AI Spec Generator
                                </button>
                                <select
                                    value={sort}
                                    onChange={(e) => {
                                        setSort(e.target.value);
                                        applyFilters({ sort: e.target.value });
                                    }}
                                    className="bg-[#0c0d12] border border-[#262930] text-xs text-white rounded-lg p-1.5 font-semibold focus:outline-none"
                                >
                                    <option value="newest">Sort: Newest</option>
                                    <option value="oldest">Sort: Oldest</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Statistics Tabbing */}
                        <div className="flex border-b border-[#262930] mt-2">
                            <button
                                onClick={() => {
 setType('all'); applyFilters({ type: 'all' }); 
}}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab !== 'saved' && type === 'all' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Total Products</span>
                                <span className="bg-[#4318FF]/20 text-[#6AD2FF] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {products.total}
                                </span>
                            </button>
                            <button
                                onClick={() => {
 setType('machinery'); applyFilters({ type: 'machinery' }); 
}}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab !== 'saved' && type === 'machinery' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Machinery</span>
                            </button>
                            <button
                                onClick={() => {
 setType('manufacture'); applyFilters({ type: 'manufacture' }); 
}}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab !== 'saved' && type === 'manufacture' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Manufactured Goods</span>
                            </button>
                            <button
                                onClick={() => {
 setType('small'); applyFilters({ type: 'small' }); 
}}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab !== 'saved' && type === 'small' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Small / Consumer</span>
                            </button>
                            <button
                                onClick={() => applyFilters({ tab: 'saved' })}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab === 'saved' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Saved</span>
                                <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {savedProductIds.length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {products.data.length === 0 ? (
                        <div className="flex-1 bg-[#0c0d12] border border-[#262930] rounded-xl p-12 text-center text-[#8f9bba] flex flex-col items-center justify-center">
                            <Package className="h-10 w-10 text-zinc-650 mb-3" />
                            <h4 className="font-bold text-white text-sm">No Products Found</h4>
                            <p className="text-xs text-[#8f9bba] mt-1 max-w-xs mx-auto">
                                Reset the filters or expand your query keywords.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.data.map((p) => {
                                const isSaved = savedProductIds.includes(p.id);

                                return (
                                    <div key={p.id} className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] rounded-xl overflow-hidden flex flex-col justify-between transition-all group">
                                        <div>
                                            {/* Colored Gradient Top Box representing Product type */}
                                            <div className={`h-28 bg-gradient-to-br ${p.image_color || 'from-slate-700 to-slate-900'} relative p-3 flex flex-col justify-between border-b border-[#262930]`}>
                                                <span className="bg-black/60 backdrop-blur-md text-[#6AD2FF] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider self-start">
                                                    {p.category?.en || 'Standard Product'}
                                                </span>
                                                <div className="flex justify-between items-center w-full">
                                                    <button
                                                        onClick={() => handleToggleSave(p.id)}
                                                        className={`p-1.5 rounded-lg border transition-all ${
                                                            isSaved
                                                                ? 'bg-[#4318FF] border-[#4318FF] text-white'
                                                                : 'bg-black/40 border-black/40 text-zinc-300 hover:text-white'
                                                        }`}
                                                    >
                                                        <Bookmark className="h-3.5 w-3.5" />
                                                    </button>
                                                    <Package className="h-8 w-8 text-white/20 self-end" />
                                                </div>
                                            </div>

                                            <div className="p-4 space-y-2 text-xs">
                                                <h3 className="font-bold text-white group-hover:text-[#4318FF] transition-colors text-sm truncate">
                                                    {p.name}
                                                </h3>
                                                
                                                <div className="text-[#8f9bba] space-y-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <Building2 className="h-3.5 w-3.5 shrink-0" />
                                                        {p.business ? (
                                                            <span className="font-semibold text-zinc-300">
                                                                <Link href={`/directory/${p.business.slug}`} className="hover:underline">
                                                                    {p.business.name}
                                                                </Link>
                                                            </span>
                                                        ) : (
                                                            <span className="font-semibold text-zinc-500 italic">Independent</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Cpu className="h-3.5 w-3.5 shrink-0" />
                                                        <span className="truncate">{formatSpecs(p.specs)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Action Footer */}
                                        <div className="px-4 pb-4 pt-2.5 border-t border-[#262930]/40 flex items-center justify-between text-xs">
                                            <span className="font-bold text-white text-xs">{formatPrice(p)}</span>
                                            <button className="px-3.5 py-1.5 bg-[#c6f052] hover:bg-[#b5dc43] text-black font-black rounded-lg transition-colors flex items-center gap-1">
                                                <ShoppingCart className="h-3.5 w-3.5" />
                                                Request Quote
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

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
                </main>
            </div>
        </GuestLayout>
    );
}
