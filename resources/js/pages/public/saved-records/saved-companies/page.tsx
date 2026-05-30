import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    MapPin,
    Building2,
    Check,
    Mail,
    Phone,
    MoreHorizontal,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    Building
} from 'lucide-react';
import React, { useState } from 'react';
import GuestLayout from '@/layouts/guest-layout';

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
    } | null;
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

interface SavedCompaniesProps {
    businesses: PaginatedBusinesses;
    savedCompanyIds: number[];
    filters: {
        search: string;
    };
}

export default function SavedCompanies({
    businesses,
    savedCompanyIds = [],
    filters,
}: SavedCompaniesProps) {
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

        router.get('/saved-companies', params, {
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
        router.get('/saved-companies', {});
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
            businesses.data.forEach(b => {
                newSelected[b.id] = true;
            });
        }

        setSelectedRows(newSelected);
    };

    const handleToggleSave = (businessId: number) => {
        router.post(`/companies/${businessId}/save`, {}, {
            preserveScroll: true,
        });
    };

    const handleBulkSave = () => {
        const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[Number(id)]);

        if (selectedIds.length === 0) {
return;
}

        router.post('/companies/save-multiple', { ids: selectedIds.map(Number) }, {
            preserveScroll: true,
            onSuccess: () => setSelectedRows({}),
        });
    };

    const allSelected = businesses.data.length > 0 && businesses.data.every(b => selectedRows[b.id]);
    const anySelected = Object.values(selectedRows).some(Boolean);

    return (
        <GuestLayout>
            <Head>
                <title>Saved Companies - SoukNet</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex-1 flex flex-col min-w-0 bg-[#15171e] p-6 space-y-4">
                {/* Header line */}
                <div className="flex items-center justify-between border-b border-[#262930] pb-3">
                    <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <Building className="h-5 w-5 text-[#4318FF]" />
                        Saved Companies ({businesses.total})
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
                                    placeholder="Search saved companies..."
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
                                    <th className="p-3 font-semibold">Name</th>
                                    <th className="p-3 font-semibold">Category</th>
                                    <th className="p-3 font-semibold">Listing Status</th>
                                    <th className="p-3 font-semibold">Location</th>
                                    <th className="p-3 font-semibold">Emails</th>
                                    <th className="p-3 font-semibold">Phone numbers</th>
                                    <th className="p-3 w-20 text-center">Unsave</th>
                                    <th className="p-3 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262930] text-zinc-100">
                                {businesses.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="p-12 text-center text-[#8f9bba]">
                                            <Building2 className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                                            <h3 className="font-bold text-white text-sm">No Saved Companies Found</h3>
                                            <p className="text-xs text-[#8f9bba] mt-1 max-w-xs mx-auto">
                                                Save companies from the Companies Directory to build your list.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    businesses.data.map((business) => {
                                        const isSelected = !!selectedRows[business.id];

                                        return (
                                            <tr key={business.id} className={`hover:bg-[#15171e]/40 transition-colors ${isSelected ? 'bg-[#4318FF]/5' : ''}`}>
                                                <td className="p-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleRow(business.id)}
                                                        className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                                                    />
                                                </td>
                                                <td className="p-3 font-bold text-white hover:text-[#6AD2FF] cursor-pointer">
                                                    <Link href={`/directory/${business.slug}`}>
                                                        {business.name}
                                                    </Link>
                                                </td>
                                                <td className="p-3 text-[#8f9bba]">
                                                    {business.category?.en || 'General'}
                                                </td>
                                                <td className="p-3">
                                                    {business.is_verified ? (
                                                        <div className="flex items-center gap-1.5 text-[#10b981]">
                                                            <Check className="h-3.5 w-3.5" />
                                                            <span className="font-semibold text-[11px]">Verified</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 text-[#8f9bba]">
                                                            <span className="text-[11px]">Not Verified</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-3 flex items-center gap-2">
                                                    <MapPin className="h-3.5 w-3.5 text-[#8f9bba]" />
                                                    <span className="font-semibold text-white line-clamp-1">{business.city || business.country}</span>
                                                </td>
                                                <td className="p-3">
                                                    {business.email ? (
                                                        <a href={`mailto:${business.email}`} className="flex items-center gap-1 px-3 py-1 bg-[#15171e] hover:bg-[#22252e] border border-[#262930] text-[11px] font-bold rounded-lg text-white transition-all">
                                                            <Mail className="h-3 w-3 text-[#8f9bba]" />
                                                            Email
                                                        </a>
                                                    ) : (
                                                        <span className="text-[#8f9bba] italic">Not available</span>
                                                    )}
                                                </td>
                                                <td className="p-3">
                                                    {business.phone ? (
                                                        <a href={`tel:${business.phone}`} className="flex items-center gap-1 px-3 py-1 bg-[#15171e] hover:bg-[#22252e] border border-[#262930] text-[11px] font-bold rounded-lg text-white transition-all">
                                                            <Phone className="h-3 w-3 text-[#8f9bba]" />
                                                            Mobile
                                                        </a>
                                                    ) : (
                                                        <span className="text-[#8f9bba] italic">Not available</span>
                                                    )}
                                                </td>
                                                <td className="p-3 text-center">
                                                    <button
                                                        onClick={() => handleToggleSave(business.id)}
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
                    {businesses.data.length > 0 && (
                        <div className="border-t border-[#262930] bg-[#15171e]/30 px-4 py-3 flex items-center justify-between text-xs text-[#8f9bba]">
                            <div>
                                Showing {businesses.from || 0}-{businesses.to || 0} of {businesses.total}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    disabled={businesses.current_page === 1}
                                    onClick={() => {
                                        const prevLink = businesses.links.find(l => l.label.includes('Previous'));

                                        if (prevLink?.url) {
router.visit(prevLink.url);
}
                                    }}
                                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#15171e] border border-[#262930] text-[#8f9bba] disabled:opacity-30 enabled:hover:bg-[#22252e] transition-colors"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <span className="font-bold text-white">{businesses.current_page} / {businesses.last_page}</span>
                                <button
                                    disabled={businesses.current_page === businesses.last_page}
                                    onClick={() => {
                                        const nextLink = businesses.links.find(l => l.label.includes('Next'));

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
