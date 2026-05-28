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
    Car,
    Utensils,
    Heart,
    Hotel,
    Home as HomeIcon,
    ShoppingBag,
    Wrench,
    Laptop,
    GraduationCap,
    Clapperboard,
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
    businesses_count?: number;
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

interface CategoryPageProps {
    category: Category;
    businesses: PaginatedBusinesses;
    categories: Category[];
    cities: string[];
    filters: {
        search: string;
        city: string;
        sort: string;
    };
}

const getCategoryIcon = (code: string) => {
    switch (code.toLowerCase()) {
        case 'automotive':
            return Car;
        case 'beauty':
            return Sparkles;
        case 'education':
            return GraduationCap;
        case 'entertainment':
            return Clapperboard;
        case 'food':
            return Utensils;
        case 'health':
            return Heart;
        case 'hotel':
            return Hotel;
        case 'real-estate':
            return HomeIcon;
        case 'retail':
            return ShoppingBag;
        case 'services':
            return Wrench;
        case 'technology':
        case 'tech':
            return Laptop;
        default:
            return Building2;
    }
};

export default function CategoryPage({
    category,
    businesses,
    categories,
    cities,
    filters,
}: CategoryPageProps) {
    const [search, setSearch] = useState(filters.search);
    const [city, setCity] = useState(filters.city);
    const [sort, setSort] = useState(filters.sort);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
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
            city,
            sort,
            ...updatedParams,
        };

        // Remove empty values
        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        router.get(`/category/${category.code}`, params, {
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
        setCity('');
        setSort('newest');
        router.get(`/category/${category.code}`, {});
    };

    const ActiveCategoryIcon = getCategoryIcon(category.code);

    return (
        <GuestLayout>
            <Head title={`${category.en} Listings`} />

            <div className="relative overflow-hidden bg-[#0A0A0A] py-12 text-zinc-100 min-h-screen">
                {/* Visual accents */}
                <div className="absolute top-[-10%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Category Hero Banner */}
                    <div
                        className="relative rounded-2xl overflow-hidden border border-[#1F1F1F] bg-[#111111]/80 p-8 sm:p-12 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 backdrop-blur-md"
                        style={{
                            borderLeftColor: category.hex_color || '#1F1F1F',
                            borderLeftWidth: category.hex_color ? '4px' : '1px',
                        }}
                    >
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div
                                className="h-16 w-16 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${category.hex_color || '#3F3F46'}20` }}
                            >
                                <ActiveCategoryIcon
                                    className="h-8 w-8"
                                    style={{ color: category.hex_color || '#A1A1AA' }}
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                                    {category.en}
                                </h1>
                                <p className="text-sm text-zinc-400 mt-1">
                                    Explore verified business profiles listing in this industry.
                                </p>
                            </div>
                        </div>

                        {/* Grid vs Row View Toggle Options */}
                        <div className="flex items-center gap-2 bg-[#0A0A0A] p-1 rounded-lg border border-[#1F1F1F] shrink-0 self-start md:self-auto">
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
                        {/* Sidebar Filters */}
                        <div className="hidden lg:block space-y-6">
                            {/* Inner-category filters */}
                            <div className="rounded-xl border border-[#1F1F1F] bg-[#111111]/80 p-6 backdrop-blur-md">
                                <h2 className="font-semibold text-white flex items-center gap-2 border-b border-[#1F1F1F] pb-4 mb-4 text-sm">
                                    <SlidersHorizontal className="h-4 w-4 text-indigo-400" />
                                    Filter Results
                                </h2>

                                <form onSubmit={handleSearchSubmit} className="space-y-4">
                                    {/* Search Query */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Search</label>
                                        <div className="relative">
                                            <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-500" />
                                            <Input
                                                type="text"
                                                placeholder="Name, keywords..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="pl-9 bg-[#161616] border-[#2E2E2E] text-zinc-100 placeholder-zinc-500 focus-visible:ring-indigo-500"
                                            />
                                        </div>
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

                                    {/* Sort Order */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Sort By</label>
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

                                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                                        Apply Filters
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={handleClearFilters}
                                        className="w-full text-center text-xs text-zinc-400 hover:text-white mt-2 block"
                                    >
                                        Reset Filters
                                    </button>
                                </form>
                            </div>

                            {/* Related Categories Navigation Menu */}
                            <div className="rounded-xl border border-[#1F1F1F] bg-[#111111]/80 p-6 backdrop-blur-md">
                                <h2 className="font-semibold text-white border-b border-[#1F1F1F] pb-4 mb-4 text-sm">
                                    Other Categories
                                </h2>
                                <div className="space-y-1.5">
                                    {categories.map((cat) => {
                                        const CatIcon = getCategoryIcon(cat.code);
                                        const isActive = cat.id === category.id;
                                        return (
                                            <Link
                                                key={cat.id}
                                                href={`/category/${cat.code}`}
                                                className={`flex items-center justify-between p-2 rounded-md transition-colors text-xs sm:text-sm ${
                                                    isActive
                                                        ? 'bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 font-medium'
                                                        : 'text-zinc-400 hover:text-zinc-200'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <CatIcon className="h-4 w-4" style={{ color: cat.hex_color || '#A1A1AA' }} />
                                                    <span>{cat.en}</span>
                                                </div>
                                                <span className="text-[10px] bg-[#161616] px-2 py-0.5 rounded text-zinc-500">
                                                    {cat.businesses_count || 0}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Category listings content */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Mobile Filters Header */}
                            <div className="lg:hidden flex gap-2">
                                <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                                    <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-500" />
                                    <Input
                                        type="text"
                                        placeholder="Search in category..."
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

                            {/* Mobile panel */}
                            {showMobileFilters && (
                                <div className="lg:hidden rounded-xl border border-[#1F1F1F] bg-[#111111] p-4 space-y-4">
                                    <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                                        <h3 className="font-semibold text-white text-sm">Active Filters</h3>
                                        <button onClick={handleClearFilters} className="text-xs text-indigo-400">
                                            Reset
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
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
                                    </div>
                                </div>
                            )}

                            {/* Info text stats */}
                            <div className="flex items-center justify-between text-xs text-zinc-400">
                                <div>
                                    Found <span className="text-zinc-200 font-semibold">{businesses.total}</span> listings in this category
                                </div>
                            </div>

                            {/* Grid / Row Listings */}
                            {businesses.data.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-[#2E2E2E] p-12 text-center">
                                    <Building2 className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                                    <h3 className="font-semibold text-white font-sans">No listings found</h3>
                                    <p className="mt-1 text-sm text-zinc-400 max-w-sm mx-auto">
                                        We couldn't find any businesses in this category matching your filters.
                                    </p>
                                    <Button onClick={handleClearFilters} variant="outline" className="mt-4 border-[#2E2E2E]">
                                        Reset Filters
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
                                                {/* Header image */}
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

                                                    {/* Featured Badge */}
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

                                            {/* Footer Details */}
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
