import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import {
    Search,
    MapPin,
    Star,
    Sparkles,
    CheckCircle,
    SlidersHorizontal,
    Building2,
    Calendar,
    Phone,
    Globe,
    ArrowUpDown,
    LayoutGrid,
    List,
} from 'lucide-react';

interface Business {
    id: number;
    name: string;
    slug: string;
    tagline: string | null;
    description: string | null;
    founded_year: number | null;
    address: string | null;
    city: string | null;
    country: string;
    phone: string | null;
    email: string | null;
    website: string | null;
    status: string;
    is_featured: boolean;
    is_verified: boolean;
    is_claimed: boolean;
    category: {
        id: number;
        code: string;
        en: string;
        fr: string | null;
        ar: string | null;
        icon: string | null;
        hex_color: string | null;
    } | null;
    photos: Array<{
        id: number;
        path: string;
    }>;
    reviews_avg_rating: number | null;
    reviews_count: number;
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

interface PaginatedBusinesses {
    data: Business[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface SearchProps {
    businesses: PaginatedBusinesses;
    categories: Category[];
    cities: string[];
    filters: {
        search: string;
        category: string;
        city: string;
        featured: boolean;
        verified: boolean;
        sort: string;
    };
}

export default function SearchResult({
    businesses,
    categories,
    cities,
    filters,
}: SearchProps) {
    const [search, setSearch] = useState(filters.search);
    const [category, setCategory] = useState(filters.category);
    const [city, setCity] = useState(filters.city);
    const [featured, setFeatured] = useState(filters.featured);
    const [verified, setVerified] = useState(filters.verified);
    const [sort, setSort] = useState(filters.sort);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    
    // View mode: 'grid' or 'row' (list)
    const [viewMode, setViewMode] = useState<'grid' | 'row'>('grid');

    // Retrieve saved view mode preference
    useEffect(() => {
        const savedViewMode = localStorage.getItem('search_view_mode') as 'grid' | 'row';
        if (savedViewMode === 'grid' || savedViewMode === 'row') {
            setViewMode(savedViewMode);
        }
    }, []);

    const toggleViewMode = (mode: 'grid' | 'row') => {
        setViewMode(mode);
        localStorage.setItem('search_view_mode', mode);
    };

    const applyFilters = (updatedParams?: Record<string, any>) => {
        const params = {
            search,
            category,
            city,
            featured: featured ? '1' : '',
            verified: verified ? '1' : '',
            sort,
            ...updatedParams,
        };

        // Remove empty values
        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        router.get('/search', params, {
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
        setCity('');
        setFeatured(false);
        setVerified(false);
        setSort('newest');
        router.get('/search', {});
    };

    return (
        <GuestLayout>
            <Head title="Search Results" />

            <div className="relative overflow-hidden bg-[#0A0A0A] py-12 text-zinc-100">
                {/* Visual accents */}
                <div className="absolute top-[-10%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-10 text-center md:text-left md:flex md:items-center md:justify-between border-b border-[#1F1F1F] pb-6">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                Search Results
                            </h1>
                            <p className="mt-2 text-zinc-400 max-w-2xl">
                                {filters.search ? (
                                    <>Results for "<span className="text-indigo-400 font-semibold">{filters.search}</span>"</>
                                ) : (
                                    'Discover & filter companies listed in our directory.'
                                )}
                            </p>
                        </div>

                        {/* Grid vs Row View Toggle Options */}
                        <div className="mt-4 md:mt-0 flex items-center justify-center gap-2 bg-[#111111] p-1 rounded-lg border border-[#1F1F1F]">
                            <button
                                onClick={() => toggleViewMode('grid')}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                                    viewMode === 'grid'
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                                title="Grid View"
                            >
                                <LayoutGrid className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Grid</span>
                            </button>
                            <button
                                onClick={() => toggleViewMode('row')}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                                    viewMode === 'row'
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                                title="Row List View"
                            >
                                <List className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Rows</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Advanced Filters Sidebar */}
                        <div className="hidden lg:block space-y-6">
                            <div className="rounded-xl border border-[#1F1F1F] bg-[#111111]/80 p-6 backdrop-blur-md">
                                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4 mb-4">
                                    <h2 className="font-semibold text-white flex items-center gap-2">
                                        <SlidersHorizontal className="h-4 w-4 text-indigo-400" />
                                        Advanced Filters
                                    </h2>
                                    <button
                                        onClick={handleClearFilters}
                                        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                <form onSubmit={handleSearchSubmit} className="space-y-4">
                                    {/* Keyword */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Search keyword</label>
                                        <div className="relative">
                                            <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-500" />
                                            <Input
                                                type="text"
                                                placeholder="Company name, tag, etc."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="pl-9 bg-[#161616] border-[#2E2E2E] text-zinc-100 placeholder-zinc-500 focus-visible:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Category Select */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Category</label>
                                        <select
                                            value={category}
                                            onChange={(e) => {
                                                setCategory(e.target.value);
                                                applyFilters({ category: e.target.value });
                                            }}
                                            className="w-full rounded-md border border-[#2E2E2E] bg-[#161616] px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.en}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* City Select */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">City</label>
                                        <select
                                            value={city}
                                            onChange={(e) => {
                                                setCity(e.target.value);
                                                applyFilters({ city: e.target.value });
                                            }}
                                            className="w-full rounded-md border border-[#2E2E2E] bg-[#161616] px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        >
                                            <option value="">All Cities</option>
                                            {cities.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Sort dropdown */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Sort results</label>
                                        <select
                                            value={sort}
                                            onChange={(e) => {
                                                setSort(e.target.value);
                                                applyFilters({ sort: e.target.value });
                                            }}
                                            className="w-full rounded-md border border-[#2E2E2E] bg-[#161616] px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        >
                                            <option value="newest">Newest Listed</option>
                                            <option value="oldest">Oldest Listed</option>
                                            <option value="rating">Highest Rated</option>
                                            <option value="name">Alphabetical (A-Z)</option>
                                        </select>
                                    </div>

                                    {/* Checkboxes */}
                                    <div className="pt-4 border-t border-[#1F1F1F] space-y-3">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={featured}
                                                onChange={(e) => {
                                                    setFeatured(e.target.checked);
                                                    applyFilters({ featured: e.target.checked ? '1' : '' });
                                                }}
                                                className="rounded border-[#2E2E2E] bg-[#161616] text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                                Featured Premium Only
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={verified}
                                                onChange={(e) => {
                                                    setVerified(e.target.checked);
                                                    applyFilters({ verified: e.target.checked ? '1' : '' });
                                                }}
                                                className="rounded border-[#2E2E2E] bg-[#161616] text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                                Verified Identity Only
                                            </span>
                                        </label>
                                    </div>

                                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                                        Apply Filters
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Search Results Content */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Mobile Search and Filters toggle */}
                            <div className="lg:hidden flex gap-2">
                                <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                                    <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-500" />
                                    <Input
                                        type="text"
                                        placeholder="Search directories..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-9 bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500"
                                    />
                                </form>
                                <Button
                                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                                    variant="outline"
                                    className="border-[#1F1F1F] bg-[#111111] text-zinc-300 hover:text-white"
                                >
                                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                                    Filters
                                </Button>
                            </div>

                            {/* Mobile Filters panel */}
                            {showMobileFilters && (
                                <div className="lg:hidden rounded-xl border border-[#1F1F1F] bg-[#111111] p-4 space-y-4">
                                    <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                                        <h3 className="font-semibold text-white text-sm">Active Filters</h3>
                                        <button onClick={handleClearFilters} className="text-xs text-indigo-400">
                                            Clear All
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] font-semibold text-zinc-500">Category</label>
                                            <select
                                                value={category}
                                                onChange={(e) => {
                                                    setCategory(e.target.value);
                                                    applyFilters({ category: e.target.value });
                                                }}
                                                className="w-full rounded-md border border-[#2E2E2E] bg-[#161616] p-1.5 text-xs text-zinc-100"
                                            >
                                                <option value="">All</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.en}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-semibold text-zinc-500">City</label>
                                            <select
                                                value={city}
                                                onChange={(e) => {
                                                    setCity(e.target.value);
                                                    applyFilters({ city: e.target.value });
                                                }}
                                                className="w-full rounded-md border border-[#2E2E2E] bg-[#161616] p-1.5 text-xs text-zinc-100"
                                            >
                                                <option value="">All</option>
                                                {cities.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-semibold text-zinc-500">Sort By</label>
                                            <select
                                                value={sort}
                                                onChange={(e) => {
                                                    setSort(e.target.value);
                                                    applyFilters({ sort: e.target.value });
                                                }}
                                                className="w-full rounded-md border border-[#2E2E2E] bg-[#161616] p-1.5 text-xs text-zinc-100"
                                            >
                                                <option value="newest">Newest</option>
                                                <option value="oldest">Oldest</option>
                                                <option value="rating">Rating</option>
                                                <option value="name">Name</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-1 justify-center pt-2">
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={featured}
                                                    onChange={(e) => {
                                                        setFeatured(e.target.checked);
                                                        applyFilters({ featured: e.target.checked ? '1' : '' });
                                                    }}
                                                    className="rounded border-[#2E2E2E] bg-[#161616] text-indigo-600 text-xs scale-75"
                                                />
                                                <span className="text-[10px] text-zinc-400">Featured</span>
                                            </label>
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={verified}
                                                    onChange={(e) => {
                                                        setVerified(e.target.checked);
                                                        applyFilters({ verified: e.target.checked ? '1' : '' });
                                                    }}
                                                    className="rounded border-[#2E2E2E] bg-[#161616] text-indigo-600 text-xs scale-75"
                                                />
                                                <span className="text-[10px] text-zinc-400">Verified</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Active filter badges */}
                            {(filters.search || filters.category || filters.city || filters.featured || filters.verified) && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs text-zinc-400">Active filters:</span>
                                    {filters.search && (
                                        <Badge variant="secondary" className="bg-[#1C1C1C] border-[#2E2E2E] text-zinc-300">
                                            Query: {filters.search}
                                        </Badge>
                                    )}
                                    {filters.category && (
                                        <Badge variant="secondary" className="bg-[#1C1C1C] border-[#2E2E2E] text-zinc-300">
                                            Category: {categories.find((c) => c.id === parseInt(filters.category))?.en || 'Selected'}
                                        </Badge>
                                    )}
                                    {filters.city && (
                                        <Badge variant="secondary" className="bg-[#1C1C1C] border-[#2E2E2E] text-zinc-300">
                                            City: {filters.city}
                                        </Badge>
                                    )}
                                    {filters.featured && (
                                        <Badge variant="secondary" className="bg-indigo-900/40 border-indigo-700/50 text-indigo-300">
                                            Featured
                                        </Badge>
                                    )}
                                    {filters.verified && (
                                        <Badge variant="secondary" className="bg-emerald-900/40 border-emerald-700/50 text-emerald-300">
                                            Verified
                                        </Badge>
                                    )}
                                    <button
                                        onClick={handleClearFilters}
                                        className="text-xs text-zinc-400 hover:text-zinc-200 underline"
                                    >
                                        Reset
                                    </button>
                                </div>
                            )}

                            {/* Search statistics */}
                            <div className="flex items-center justify-between text-xs text-zinc-400">
                                <div>
                                    Found <span className="text-zinc-200 font-semibold">{businesses.total}</span> listings matching your criteria
                                </div>
                            </div>

                            {/* Business List Grid or Row View */}
                            {businesses.data.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-[#2E2E2E] p-12 text-center">
                                    <Building2 className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                                    <h3 className="font-semibold text-white">No search results</h3>
                                    <p className="mt-1 text-sm text-zinc-400 max-w-sm mx-auto">
                                        We couldn't find any businesses matching your search options. Try relaxing filters or correcting spelling.
                                    </p>
                                    <Button onClick={handleClearFilters} variant="outline" className="mt-4 border-[#2E2E2E]">
                                        Clear Search
                                    </Button>
                                </div>
                            ) : viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {businesses.data.map((business) => (
                                        <Card
                                            key={business.id}
                                            className={`relative group h-full flex flex-col justify-between overflow-hidden border-[#1F1F1F] bg-[#111111]/80 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-0.5 ${
                                                business.is_featured
                                                    ? 'shadow-[0_0_15px_rgba(99,102,241,0.08)] ring-1 ring-indigo-500/20'
                                                    : ''
                                            }`}
                                        >
                                            <div>
                                                {/* Header Image */}
                                                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 border-b border-[#1F1F1F]">
                                                    {business.photos && business.photos.length > 0 ? (
                                                        <img
                                                            src={business.photos[0].path}
                                                            alt={business.name}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-[#161616] to-[#0A0A0A] text-zinc-600">
                                                            <Building2 className="h-8 w-8 opacity-40" />
                                                        </div>
                                                    )}

                                                    {/* Category */}
                                                    {business.category && (
                                                        <span
                                                            style={{
                                                                backgroundColor: business.category.hex_color || '#3E3E3E',
                                                                color: '#FFFFFF',
                                                            }}
                                                            className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm opacity-90"
                                                        >
                                                            {business.category.en}
                                                        </span>
                                                    )}

                                                    {/* Featured */}
                                                    {business.is_featured && (
                                                        <span className="absolute top-3 right-3 flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
                                                            <Sparkles className="h-2.5 w-2.5" />
                                                            FEATURED
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="p-5 space-y-3">
                                                    <div>
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors text-base line-clamp-1">
                                                                {business.name}
                                                            </h3>
                                                            {business.is_verified && (
                                                                <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                                                            )}
                                                        </div>
                                                        {business.tagline && (
                                                            <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 italic">
                                                                {business.tagline}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Rating */}
                                                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                                        <div className="flex items-center text-amber-400">
                                                            <Star className="h-3.5 w-3.5 fill-current" />
                                                            <span className="ml-1 text-zinc-200 font-medium">
                                                                {business.reviews_avg_rating
                                                                    ? parseFloat(String(business.reviews_avg_rating)).toFixed(1)
                                                                    : 'N/A'}
                                                            </span>
                                                        </div>
                                                        <span>•</span>
                                                        <span>{business.reviews_count} reviews</span>
                                                    </div>

                                                    {/* Description */}
                                                    {business.description && (
                                                        <p className="text-xs text-zinc-400 line-clamp-2">
                                                            {business.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Footer details */}
                                            <div className="px-5 pb-5 pt-3 border-t border-[#1F1F1F]/40 flex items-center justify-between text-xs text-zinc-500">
                                                <div className="flex items-center gap-1 shrink-0">
                                                    <MapPin className="h-3 w-3 text-zinc-400" />
                                                    <span className="line-clamp-1">{business.city || 'Algeria'}</span>
                                                </div>
                                                <Link
                                                    href={`/directory/${business.slug}`}
                                                    className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-0.5"
                                                >
                                                    View Details
                                                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                                </Link>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                /* List View (Rows) */
                                <div className="space-y-4">
                                    {businesses.data.map((business) => (
                                        <Card
                                            key={business.id}
                                            className={`relative group overflow-hidden border-[#1F1F1F] bg-[#111111]/80 hover:border-zinc-700 transition-all duration-300 flex flex-col md:flex-row md:items-stretch ${
                                                business.is_featured
                                                    ? 'shadow-[0_0_15px_rgba(99,102,241,0.08)] ring-1 ring-indigo-500/20'
                                                    : ''
                                            }`}
                                        >
                                            {/* Left side Image */}
                                            <div className="relative w-full md:w-64 shrink-0 overflow-hidden bg-zinc-900 border-b md:border-b-0 md:border-r border-[#1F1F1F]">
                                                {business.photos && business.photos.length > 0 ? (
                                                    <img
                                                        src={business.photos[0].path}
                                                        alt={business.name}
                                                        className="h-48 md:h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-48 md:h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-[#161616] to-[#0A0A0A] text-zinc-600">
                                                        <Building2 className="h-8 w-8 opacity-40" />
                                                    </div>
                                                )}

                                                {/* Category Badge */}
                                                {business.category && (
                                                    <span
                                                        style={{
                                                            backgroundColor: business.category.hex_color || '#3E3E3E',
                                                            color: '#FFFFFF',
                                                        }}
                                                        className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm opacity-90"
                                                    >
                                                        {business.category.en}
                                                    </span>
                                                )}

                                                {/* Featured Badge */}
                                                {business.is_featured && (
                                                    <span className="absolute top-3 right-3 flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
                                                        <Sparkles className="h-2.5 w-2.5" />
                                                        FEATURED
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content details */}
                                            <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                                                                {business.name}
                                                            </h3>
                                                            {business.is_verified && (
                                                                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {business.tagline && (
                                                        <p className="text-sm text-zinc-400 italic font-medium">
                                                            {business.tagline}
                                                        </p>
                                                    )}

                                                    {/* Rating */}
                                                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                                        <div className="flex items-center text-amber-400">
                                                            <Star className="h-3.5 w-3.5 fill-current" />
                                                            <span className="ml-1 text-zinc-200 font-medium">
                                                                {business.reviews_avg_rating
                                                                    ? parseFloat(String(business.reviews_avg_rating)).toFixed(1)
                                                                    : 'N/A'}
                                                            </span>
                                                        </div>
                                                        <span>•</span>
                                                        <span>{business.reviews_count} reviews</span>
                                                    </div>

                                                    {/* Description */}
                                                    {business.description && (
                                                        <p className="text-sm text-zinc-400 line-clamp-3">
                                                            {business.description}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Footer details */}
                                                <div className="pt-4 border-t border-[#1F1F1F]/40 flex items-center justify-between text-xs text-zinc-500">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                                                        <span>{business.address || 'Algeria'}, {business.city || ''}</span>
                                                    </div>
                                                    <Link
                                                        href={`/directory/${business.slug}`}
                                                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-all"
                                                    >
                                                        View Full Profile
                                                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {businesses.data.length > 0 && businesses.last_page > 1 && (
                                <Pagination className="mt-8">
                                    <PaginationContent>
                                        {businesses.links.map((link, idx) => {
                                            const label = link.label
                                                .replace(/&laquo;/g, '«')
                                                .replace(/&raquo;/g, '»')
                                                .replace(/Previous/g, '')
                                                .replace(/Next/g, '');

                                            const isPrev = link.label.includes('Previous');
                                            const isNext = link.label.includes('Next');

                                            if (!link.url) {
                                                return (
                                                    <PaginationItem key={idx} className="opacity-40 pointer-events-none">
                                                        {isPrev ? (
                                                            <PaginationPrevious href="#" />
                                                        ) : isNext ? (
                                                            <PaginationNext href="#" />
                                                        ) : (
                                                            <PaginationEllipsis />
                                                        )}
                                                    </PaginationItem>
                                                );
                                            }

                                            return (
                                                <PaginationItem key={idx}>
                                                    {isPrev ? (
                                                        <PaginationPrevious
                                                            href={link.url}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                router.visit(link.url!);
                                                            }}
                                                        />
                                                    ) : isNext ? (
                                                        <PaginationNext
                                                            href={link.url}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                router.visit(link.url!);
                                                            }}
                                                        />
                                                    ) : (
                                                        <PaginationLink
                                                            href={link.url}
                                                            isActive={link.active}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                router.visit(link.url!);
                                                            }}
                                                        >
                                                            {label}
                                                        </PaginationLink>
                                                    )}
                                                </PaginationItem>
                                            );
                                        })}
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
