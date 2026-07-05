import { Head, Link, router } from '@inertiajs/react';
import {
    Building2,
    Search,
    Star,
    Plus,
    Filter,
    Edit2,
    ExternalLink,
    RefreshCw,
    X
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import OwnerLayout from '@/layouts/owner-layout';
import OwnerDashboard from '../../dashboard/page';
import BusinessController from '@/actions/App/Http/Controllers/Owner/BusinessController';
import OwnerDashboardController from '@/actions/App/Http/Controllers/Owner/OwnerDashboardController';

interface Business {
    id: number;
    name: string;
    slug: string;
    tagline: string | null;
    status: string;
    is_featured: boolean;
    is_verified: boolean;
    created_at: string;
    category: {
        id: number;
        en: string;
    } | null;
    plan: {
        id: number;
        en: string;
    } | null;
    reviews_avg_rating: number | null;
    reviews_count: number;
}

interface Category {
    id: number;
    en: string;
}

interface Props {
    businesses: {
        data: Business[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta?: any;
    };
    categories: Category[];
    filters: {
        search?: string;
        category_id?: string;
        status?: string;
    };
}

export default function ListedBusinesses({ businesses, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category_id || '');
    const [status, setStatus] = useState(filters.status || '');

    // Submit filters
    const applyFilters = () => {
        router.get(
            BusinessController.index.url(),
            {
                search: search || undefined,
                category_id: category || undefined,
                status: status || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    // Trigger filters on selection changes
    useEffect(() => {
        applyFilters();
    }, [category, status]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const clearFilters = () => {
        setSearch('');
        setCategory('');
        setStatus('');
        router.get(BusinessController.index.url(), {}, { preserveState: true, replace: true });
    };

    const getStatusBadge = (statusStr: string) => {
        switch (statusStr.toLowerCase()) {
            case 'published':
                return (
                    <span className="inline-flex items-center gap-1 bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25 px-2 py-0.5 rounded text-[10px] font-bold">
                        Active
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded text-[10px] font-bold">
                        Pending
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 bg-red-500/15 text-red-400 border border-red-500/25 px-2 py-0.5 rounded text-[10px] font-bold">
                        Rejected
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
            <Head title="My Listed Businesses" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen p-6 space-y-6">

                {/* Header Title */}
                <div className="flex flex-col gap-4 border-b border-[#262930] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#6AD2FF] tracking-wider uppercase">Listings Management</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight">
                            My Listed Businesses
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            View, filter, and manage all the business listings you have posted to the directory.
                        </p>
                    </div>
                    <Link
                        href={BusinessController.create.url()}
                        className="inline-flex items-center gap-1.5 bg-[#4318FF] hover:bg-[#3b15e6] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-900/20"
                    >
                        <Plus className="h-4 w-4" />
                        Add New Business
                    </Link>
                </div>

                {/* Filter Controls */}
                <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4">
                    <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 md:flex-row md:items-center">
                        {/* Search Query */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8f9bba]" />
                            <input
                                type="text"
                                placeholder="Search by name or tagline..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#15171e] border border-[#262930] rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF] transition-colors"
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="w-full md:w-48">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-[#15171e] border border-[#262930] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-[#4318FF] transition-colors appearance-none cursor-pointer"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.en}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Dropdown */}
                        <div className="w-full md:w-40">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-[#15171e] border border-[#262930] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-[#4318FF] transition-colors appearance-none cursor-pointer"
                            >
                                <option value="">All Statuses</option>
                                <option value="published">Active</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        {/* Search & Reset Buttons */}
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-[#22252e] hover:bg-[#262930] border border-[#262930] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                            >
                                Apply
                            </button>
                            {(filters.search || filters.category_id || filters.status) && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/20 hover:border-red-500/30 px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                                >
                                    <X className="h-3 w-3" />
                                    Clear
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Businesses Grid list */}
                <div className="space-y-4">
                    {businesses.data.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#262930] bg-[#0c0d12] p-16 text-center">
                            <Building2 className="mx-auto mb-3 h-10 w-10 text-zinc-650" />
                            <h3 className="text-sm font-semibold text-zinc-400">No listed businesses found</h3>
                            <p className="mx-auto mt-1 max-w-xs text-xs text-[#8f9bba]">
                                Try clearing the filters or click 'Add New Business' to register a new listing.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {businesses.data.map((business) => (
                                <div
                                    key={business.id}
                                    className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] rounded-xl flex flex-col justify-between transition-all group"
                                >
                                    <div className="space-y-4 p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="line-clamp-1 text-sm font-bold text-white group-hover:text-[#4318FF] transition-colors">
                                                    <Link href={BusinessController.show.url({ id: business.id })}>
                                                        {business.name}
                                                    </Link>
                                                </h3>
                                                {business.tagline && (
                                                    <p className="mt-0.5 line-clamp-1 text-[11px] text-[#8f9bba] italic">
                                                        {business.tagline}
                                                    </p>
                                                )}
                                            </div>
                                            {getStatusBadge(business.status)}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
                                            {business.category && (
                                                <span className="bg-[#15171e] border border-[#262930] text-zinc-300 px-2 py-0.5 rounded">
                                                    {business.category.en}
                                                </span>
                                            )}
                                            {business.plan && (
                                                <span className="bg-[#4318FF]/15 text-[#6AD2FF] border border-[#4318FF]/25 px-2 py-0.5 rounded font-bold">
                                                    {business.plan.en}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 border-t border-[#262930]/40 pt-3 text-xs text-[#8f9bba]">
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <Star className="h-3.5 w-3.5 fill-current" />
                                                <span className="font-bold text-white">
                                                    {business.reviews_avg_rating
                                                        ? parseFloat(String(business.reviews_avg_rating)).toFixed(1)
                                                        : 'N/A'}
                                                </span>
                                            </div>
                                            <span>•</span>
                                            <span>{business.reviews_count} reviews</span>
                                        </div>
                                    </div>

                                    {/* Action items footer */}
                                    <div className="flex items-center justify-between border-t border-[#262930]/40 px-5 py-3 text-xs bg-[#15171e]/20 rounded-b-xl">
                                        <Link
                                            href={`/directory/${business.slug}`}
                                            className="text-[#8f9bba] transition-colors hover:text-white font-medium flex items-center gap-1"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            View Public
                                        </Link>
                                        <Link
                                            href={BusinessController.show.url({ id: business.id })}
                                            className="font-bold text-[#4318FF] hover:underline flex items-center gap-1"
                                        >
                                            <Edit2 className="h-3.5 w-3.5" />
                                            Manage Listing
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination component */}
                    <SimplePagination links={businesses.links} />
                </div>
            </div>
        </>
    );
}

// Layout configuration
ListedBusinesses.layout = (page: React.ReactNode) => (
    <OwnerLayout
        breadcrumbs={[
            { title: 'Dashboard', href: OwnerDashboardController.index.url() },
            { title: 'My Listings', href: BusinessController.index.url() }
        ]}
    >
        {page}
    </OwnerLayout>
);

interface PaginationProps {
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

function SimplePagination({ links }: PaginationProps) {
    if (links.length <= 3) {
        return null;
    } // Don't show if only 1 page

    return (
        <div className="flex justify-center items-center gap-1.5 mt-8">
            {links.map((link, idx) => {
                const label = link.label
                    .replace('&laquo;', '«')
                    .replace('&raquo;', '»')
                    .replace('Previous', '«')
                    .replace('Next', '»');

                if (!link.url) {
                    return (
                        <span
                            key={idx}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 bg-[#0c0d12] border border-[#262930] cursor-not-allowed select-none"
                        >
                            {label}
                        </span>
                    );
                }

                return (
                    <Link
                        key={idx}
                        href={link.url}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${link.active
                            ? 'bg-[#4318FF] text-white border-[#4318FF]'
                            : 'bg-[#0c0d12] text-[#8f9bba] border-[#262930] hover:text-white hover:bg-[#15171e]'
                            }`}
                        preserveScroll
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
}
