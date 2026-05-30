import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    MapPin,
    Sparkles,
    CheckCircle,
    SlidersHorizontal,
    Building2,
    Check,
    Bell,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    Play,
    UserCheck,
    Mail,
    Phone,
    Plus,
    MoreHorizontal,
    Briefcase,
    Bookmark
} from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/guest-layout';

interface Person {
    id: number;
    business_id: number | null;
    first_name: string;
    last_name: string;
    title: string | null;
    email: string | null;
    phone: string | null;
    location: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    is_verified: boolean;
    business?: {
        id: number;
        name: string;
        slug: string;
        category?: {
            id: number;
            code: string;
            en: string;
        } | null;
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

interface PaginatedPeople {
    data: Person[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface PeopleProps {
    people: PaginatedPeople;
    categories: Category[];
    cities: string[];
    savedPeopleIds: number[];
    filters: {
        search: string;
        category: string;
        city: string;
        verified: boolean;
        sort: string;
        tab: string;
    };
}

export default function PeopleDirectory({
    people,
    categories,
    cities,
    savedPeopleIds,
    filters,
}: PeopleProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [city, setCity] = useState(filters.city || '');
    const [verified, setVerified] = useState(filters.verified || false);
    const [sort, setSort] = useState(filters.sort || 'newest');
    const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
    const [expandedFilter, setExpandedFilter] = useState<string>('job-titles');

    const applyFilters = (updatedParams?: Record<string, any>) => {
        const params: Record<string, any> = {
            search,
            category,
            city,
            verified: verified ? '1' : '',
            sort,
            tab: filters.tab || 'all',
            ...updatedParams,
        };

        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        router.get('/people', params, {
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
        setVerified(false);
        setSort('newest');
        router.get('/people', { tab: filters.tab || 'all' });
    };

    const toggleVerified = () => {
        const nextVal = !verified;
        setVerified(nextVal);
        applyFilters({ verified: nextVal ? '1' : '' });
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
            people.data.forEach(p => {
                newSelected[p.id] = true;
            });
        }

        setSelectedRows(newSelected);
    };

    const handleToggleSave = (personId: number) => {
        router.post(`/people/${personId}/save`, {}, {
            preserveScroll: true,
        });
    };

    const handleBulkSave = () => {
        const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[Number(id)]);

        if (selectedIds.length === 0) {
return;
}

        router.post('/people/save-multiple', { ids: selectedIds.map(Number) }, {
            preserveScroll: true,
            onSuccess: () => setSelectedRows({}),
        });
    };

    const allSelected = people.data.length > 0 && people.data.every(p => selectedRows[p.id]);
    const anySelected = Object.values(selectedRows).some(Boolean);

    return (
        <GuestLayout>
            <Head>
                <title>Find People - SoukNet</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-[calc(100vh-48px)]">
                {/* 1. Left Filters Panel Drawer */}
                <aside className="w-64 border-r border-[#262930] bg-[#0c0d12] flex flex-col justify-between shrink-0 select-none">
                    <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                        {/* Job Titles Filter (Category filter mapping) */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'job-titles' ? '' : 'job-titles')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <Briefcase className="h-3.5 w-3.5" />
                                    Job Titles / Category
                                </span>
                                {expandedFilter === 'job-titles' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'job-titles' && (
                                <div className="px-4 pb-4 space-y-3">
                                    <div className="flex bg-[#15171e] p-0.5 rounded-lg border border-[#262930]">
                                        <button className="flex-1 text-[10px] font-bold py-1 rounded bg-[#22252e] text-white">Simple</button>
                                        <button className="flex-1 text-[10px] font-bold py-1 text-[#8f9bba]">Advanced</button>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#8f9bba] font-bold uppercase">Include Category</label>
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
                                </div>
                            )}
                        </div>

                        {/* Location Filter (City filter mapping) */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'location' ? '' : 'location')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5" />
                                    Location / City
                                </span>
                                {expandedFilter === 'location' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'location' && (
                                <div className="px-4 pb-4 space-y-2">
                                    <select
                                        value={city}
                                        onChange={(e) => {
                                            setCity(e.target.value);
                                            applyFilters({ city: e.target.value });
                                        }}
                                        className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4318FF]"
                                    >
                                        <option value="">All Cities</option>
                                        {cities.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Quick Status Filters (Verified mapping) */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'status' ? '' : 'status')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <CheckCircle className="h-3.5 w-3.5" />
                                    Listing Status
                                </span>
                                {expandedFilter === 'status' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'status' && (
                                <div className="px-4 pb-4 space-y-3">
                                    <label className="flex items-center gap-2.5 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={verified}
                                            onChange={toggleVerified}
                                            className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                                        />
                                        <span className="text-xs text-[#8f9bba] group-hover:text-white transition-colors">Verified Only</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Filter bottom footer */}
                    <div className="p-4 border-t border-[#262930] bg-[#0c0d12] flex items-center justify-between text-xs">
                        <button onClick={handleClearFilters} className="text-[#8f9bba] hover:text-white font-semibold">Clear all</button>
                        <button className="bg-[#22252e] hover:bg-[#2c303c] px-3 py-1.5 rounded-lg font-bold text-white transition-colors">View 60+ Filters</button>
                    </div>
                </aside>

                {/* 2. Main Directory Table area */}
                <main className="flex-1 flex flex-col min-w-0 bg-[#15171e] p-6 space-y-4">
                    {/* Header line */}
                    <div className="flex items-center justify-between border-b border-[#262930] pb-3">
                        <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                            Find people
                        </h1>
                        <div className="flex items-center gap-2">
                            {anySelected && (
                                <button
                                    onClick={handleBulkSave}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                                >
                                    <Bookmark className="h-3.5 w-3.5" />
                                    Save/Unsave Selected
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Toolbar with Stats Tabs */}
                    <div className="flex flex-col gap-3">
                        {/* Sub headers / tools */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c0d12] rounded-lg border border-[#262930] text-xs font-semibold text-white">
                                    <span>Default view</span>
                                    <ChevronDown className="h-3 w-3" />
                                </div>
                                <form onSubmit={handleSearchSubmit} className="relative w-48 sm:w-64">
                                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#8f9bba]" />
                                    <input
                                        type="text"
                                        placeholder="Search people..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-[#0c0d12] border border-[#262930] rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF]"
                                    />
                                </form>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-900/20">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Research with AI
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
                                    <option value="name">Sort: Alphabetical</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Stats tab-list */}
                        <div className="flex border-b border-[#262930] mt-2">
                            <button
                                onClick={() => applyFilters({ tab: 'all' })}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab !== 'saved' ? 'border-[#4318FF] text-white bg-[#0c0d12]/50 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Total</span>
                                <span className="bg-[#4318FF]/20 text-[#6AD2FF] text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    {people.total}
                                </span>
                            </button>
                            <button
                                onClick={() => applyFilters({ tab: 'saved' })}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab === 'saved' ? 'border-[#4318FF] text-white bg-[#0c0d12]/50 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Saved</span>
                                <span className="bg-[#262930] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    {savedPeopleIds.length}
                                </span>
                            </button>
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
                                        <th className="p-3 font-semibold">Job Title</th>
                                        <th className="p-3 font-semibold">Qualify Contact</th>
                                        <th className="p-3 font-semibold">Company</th>
                                        <th className="p-3 font-semibold">Emails</th>
                                        <th className="p-3 font-semibold">Phone numbers</th>
                                        <th className="p-3 w-20 text-center">Save</th>
                                        <th className="p-3 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#262930] text-zinc-100">
                                    {people.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={9} className="p-12 text-center text-[#8f9bba]">
                                                <Building2 className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                                                <h3 className="font-bold text-white text-sm">No People Found</h3>
                                                <p className="text-xs text-[#8f9bba] mt-1 max-w-xs mx-auto">
                                                    Adjust filter criteria or try searching for keywords.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        people.data.map((person) => {
                                            const isSelected = !!selectedRows[person.id];
                                            const isSaved = savedPeopleIds.includes(person.id);

                                            return (
                                                <tr key={person.id} className={`hover:bg-[#15171e]/40 transition-colors ${isSelected ? 'bg-[#4318FF]/5' : ''}`}>
                                                    <td className="p-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => toggleRow(person.id)}
                                                            className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                                                        />
                                                    </td>
                                                    <td className="p-3 font-bold text-white hover:text-[#6AD2FF] cursor-pointer">
                                                        {person.first_name} {person.last_name}
                                                    </td>
                                                    <td className="p-3 text-[#8f9bba]">
                                                        {person.title || 'Standard Member'}
                                                    </td>
                                                    <td className="p-3">
                                                        {person.is_verified ? (
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
                                                        {person.business ? (
                                                            <>
                                                                <div className="h-5 w-5 rounded bg-[#15171e] border border-[#262930] flex items-center justify-center shrink-0 text-[10px] font-bold text-[#8f9bba]">
                                                                    {person.business.name.substring(0, 1)}
                                                                </div>
                                                                <span className="font-semibold text-white line-clamp-1">
                                                                    <Link href={`/directory/${person.business.slug}`} className="hover:underline">
                                                                        {person.business.name}
                                                                    </Link>
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="text-zinc-650 italic">Independent</span>
                                                        )}
                                                    </td>
                                                    <td className="p-3">
                                                        {person.email ? (
                                                            <a href={`mailto:${person.email}`} className="flex items-center gap-1 px-3 py-1 bg-[#15171e] hover:bg-[#22252e] border border-[#262930] text-[11px] font-bold rounded-lg text-white transition-all">
                                                                <Mail className="h-3 w-3 text-[#8f9bba]" />
                                                                Email
                                                            </a>
                                                        ) : (
                                                            <span className="text-[#8f9bba] italic">Not available</span>
                                                        )}
                                                    </td>
                                                    <td className="p-3">
                                                        {person.phone ? (
                                                            <a href={`tel:${person.phone}`} className="flex items-center gap-1 px-3 py-1 bg-[#15171e] hover:bg-[#22252e] border border-[#262930] text-[11px] font-bold rounded-lg text-white transition-all">
                                                                <Phone className="h-3 w-3 text-[#8f9bba]" />
                                                                Mobile
                                                            </a>
                                                        ) : (
                                                            <span className="text-[#8f9bba] italic">Not available</span>
                                                        )}
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <button
                                                            onClick={() => handleToggleSave(person.id)}
                                                            className={`p-1.5 rounded-lg border transition-all ${
                                                                isSaved
                                                                    ? 'bg-[#4318FF] border-[#4318FF] text-white'
                                                                    : 'bg-[#15171e] border-[#262930] text-[#8f9bba] hover:text-white'
                                                            }`}
                                                            title={isSaved ? 'Unsave Person' : 'Save Person'}
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
                        {people.data.length > 0 && (
                            <div className="border-t border-[#262930] bg-[#15171e]/30 px-4 py-3 flex items-center justify-between text-xs text-[#8f9bba]">
                                <div>
                                    Showing {people.from || 0}-{people.to || 0} of {people.total}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        disabled={people.current_page === 1}
                                        onClick={() => {
                                            const prevLink = people.links.find(l => l.label.includes('Previous'));

                                            if (prevLink?.url) {
router.visit(prevLink.url);
}
                                        }}
                                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#15171e] border border-[#262930] text-[#8f9bba] disabled:opacity-30 enabled:hover:bg-[#22252e] transition-colors"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <span className="font-bold text-white">{people.current_page} / {people.last_page}</span>
                                    <button
                                        disabled={people.current_page === people.last_page}
                                        onClick={() => {
                                            const nextLink = people.links.find(l => l.label.includes('Next'));

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
                </main>
            </div>
        </GuestLayout>
    );
}
