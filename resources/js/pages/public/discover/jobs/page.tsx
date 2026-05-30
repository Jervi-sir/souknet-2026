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
    Briefcase,
    Calendar,
    Clock,
    DollarSign,
    Layers,
    UserCheck,
    Check,
    Bookmark
} from 'lucide-react';
import React, { useState } from 'react';
import GuestLayout from '@/layouts/guest-layout';

interface JobPost {
    id: number;
    business_id: number;
    title: string;
    slug: string;
    location: string;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
    experience: 'entry' | 'mid' | 'senior';
    tags: string[] | null;
    description: string;
    is_active: boolean;
    business?: {
        id: number;
        name: string;
        slug: string;
    } | null;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedJobs {
    data: JobPost[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface JobsProps {
    jobs: PaginatedJobs;
    savedJobIds: number[];
    locations: string[];
    filters: {
        search: string;
        location: string;
        type: string;
        experience: string;
        sort: string;
        tab: string;
    };
}

export default function JobsDirectory({
    jobs,
    savedJobIds = [],
    locations,
    filters,
}: JobsProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [location, setLocation] = useState(filters.location || '');
    const [experience, setExperience] = useState(filters.experience || 'all');
    const [type, setType] = useState(filters.type || 'all');
    const [sort, setSort] = useState(filters.sort || 'newest');
    const [expandedFilter, setExpandedFilter] = useState('experience');

    const applyFilters = (updatedParams?: Record<string, any>) => {
        const params: Record<string, any> = {
            search,
            location,
            experience: experience === 'all' ? '' : experience,
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

        router.get('/jobs', params, {
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
        setLocation('');
        setExperience('all');
        setType('all');
        setSort('newest');
        router.get('/jobs', { tab: filters.tab || 'all' });
    };

    const handleToggleSave = (jobId: number) => {
        router.post(`/jobs/${jobId}/save`, {}, {
            preserveScroll: true,
        });
    };

    const formatSalary = (j: JobPost) => {
        if (j.salary_min && j.salary_max) {
            return `${j.salary_currency} ${j.salary_min.toLocaleString()} - ${j.salary_max.toLocaleString()} / year`;
        }

        if (j.salary_min) {
            return `From ${j.salary_currency} ${j.salary_min.toLocaleString()} / year`;
        }

        return 'Request Range';
    };

    return (
        <GuestLayout>
            <Head>
                <title>Jobs Directory - SoukNet</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-[calc(100vh-48px)]">
                {/* 1. Left Filters Panel Drawer */}
                <aside className="w-64 border-r border-[#262930] bg-[#0c0d12] flex flex-col justify-between shrink-0 select-none">
                    <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                        {/* Experience Level Selector */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'experience' ? '' : 'experience')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <Layers className="h-3.5 w-3.5" />
                                    Experience Level
                                </span>
                                {expandedFilter === 'experience' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'experience' && (
                                <div className="px-4 pb-4 space-y-2">
                                    <select
                                        value={experience}
                                        onChange={(e) => {
                                            setExperience(e.target.value);
                                            applyFilters({ experience: e.target.value });
                                        }}
                                        className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4318FF]"
                                    >
                                        <option value="all">All Experience Levels</option>
                                        <option value="entry">Entry Level</option>
                                        <option value="mid">Mid Level</option>
                                        <option value="senior">Senior Level</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Job Location Spec */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'location' ? '' : 'location')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5" />
                                    Job Location
                                </span>
                                {expandedFilter === 'location' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'location' && (
                                <div className="px-4 pb-4 space-y-2">
                                    <select
                                        value={location}
                                        onChange={(e) => {
                                            setLocation(e.target.value);
                                            applyFilters({ location: e.target.value });
                                        }}
                                        className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4318FF]"
                                    >
                                        <option value="">All Locations</option>
                                        {locations.map((loc) => (
                                            <option key={loc} value={loc}>{loc}</option>
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

                {/* 2. Main jobs explorer area */}
                <main className="flex-1 flex flex-col min-w-0 bg-[#15171e] p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#262930] pb-3">
                        <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-[#4318FF]" />
                            Explore Career Opportunities
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
                                        placeholder="Search jobs..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-[#0c0d12] border border-[#262930] rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF]"
                                    />
                                </form>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-900/20">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Research with AI
                                </button>
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
                                <span>Total Jobs</span>
                                <span className="bg-[#4318FF]/20 text-[#6AD2FF] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {jobs.total}
                                </span>
                            </button>
                            <button
                                onClick={() => {
 setType('Full-time'); applyFilters({ type: 'Full-time' }); 
}}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab !== 'saved' && type === 'Full-time' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Full-time</span>
                            </button>
                            <button
                                onClick={() => {
 setType('Part-time'); applyFilters({ type: 'Part-time' }); 
}}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab !== 'saved' && type === 'Part-time' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Part-time</span>
                            </button>
                            <button
                                onClick={() => {
 setType('Contract'); applyFilters({ type: 'Contract' }); 
}}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab !== 'saved' && type === 'Contract' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Contract</span>
                            </button>
                            <button
                                onClick={() => {
 setType('Remote'); applyFilters({ type: 'Remote' }); 
}}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab !== 'saved' && type === 'Remote' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Remote</span>
                            </button>
                            <button
                                onClick={() => applyFilters({ tab: 'saved' })}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    filters.tab === 'saved' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Saved</span>
                                <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {savedJobIds.length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Jobs Grid */}
                    {jobs.data.length === 0 ? (
                        <div className="flex-1 bg-[#0c0d12] border border-[#262930] rounded-xl p-12 text-center text-[#8f9bba] flex flex-col items-center justify-center">
                            <Briefcase className="h-10 w-10 text-zinc-655 mb-3" />
                            <h4 className="font-bold text-white text-sm">No Jobs Found</h4>
                            <p className="text-xs text-[#8f9bba] mt-1 max-w-xs mx-auto">
                                Reset the filters or expand your query keywords.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {jobs.data.map((j) => {
                                const isSaved = savedJobIds.includes(j.id);

                                return (
                                    <div key={j.id} className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] rounded-xl overflow-hidden p-5 flex flex-col justify-between transition-all group">
                                        <div className="space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <span className="bg-indigo-950 text-[#6AD2FF] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                        {j.type}
                                                    </span>
                                                    <h3 className="font-bold text-white group-hover:text-[#4318FF] transition-colors text-sm mt-2">
                                                        {j.title}
                                                    </h3>
                                                </div>
                                                <span className="text-[10px] text-[#8f9bba]">
                                                    {new Date(j.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>

                                            <div className="text-[#8f9bba] space-y-1.5 text-xs">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-4 w-4 shrink-0 text-[#8f9bba]" />
                                                    {j.business ? (
                                                        <span className="font-semibold text-zinc-300">
                                                            <Link href={`/directory/${j.business.slug}`} className="hover:underline">
                                                                {j.business.name}
                                                            </Link>
                                                        </span>
                                                    ) : (
                                                        <span className="font-semibold text-zinc-500 italic">Independent</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 shrink-0 text-[#8f9bba]" />
                                                    <span>{j.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4 shrink-0 text-[#8f9bba]" />
                                                    <span>{formatSalary(j)}</span>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            {j.tags && j.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 pt-2">
                                                    {j.tags.map((tag, idx) => (
                                                        <span key={idx} className="bg-[#15171e] text-[#a3aed0] text-[9px] px-2 py-0.5 rounded font-medium border border-[#262930]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Action Footer */}
                                        <div className="pt-4 border-t border-[#262930]/40 flex items-center justify-between text-xs mt-4">
                                            <button
                                                onClick={() => handleToggleSave(j.id)}
                                                className={`p-2 rounded-lg border transition-all ${
                                                    isSaved
                                                        ? 'bg-[#4318FF] border-[#4318FF] text-white'
                                                        : 'bg-[#15171e] border-[#262930] text-[#8f9bba] hover:text-white'
                                                }`}
                                            >
                                                <Bookmark className="h-4 w-4" />
                                            </button>
                                            <button className="px-3.5 py-1.5 bg-[#c6f052] hover:bg-[#b5dc43] text-black text-xs font-black rounded-lg transition-colors flex items-center gap-1">
                                                <UserCheck className="h-3.5 w-3.5" />
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination footer details */}
                    {jobs.data.length > 0 && (
                        <div className="border-t border-[#262930] bg-[#15171e]/30 px-4 py-3 flex items-center justify-between text-xs text-[#8f9bba]">
                            <div>
                                Showing {jobs.from || 0}-{jobs.to || 0} of {jobs.total}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    disabled={jobs.current_page === 1}
                                    onClick={() => {
                                        const prevLink = jobs.links.find(l => l.label.includes('Previous'));

                                        if (prevLink?.url) {
router.visit(prevLink.url);
}
                                    }}
                                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#15171e] border border-[#262930] text-[#8f9bba] disabled:opacity-30 enabled:hover:bg-[#22252e] transition-colors"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <span className="font-bold text-white">{jobs.current_page} / {jobs.last_page}</span>
                                <button
                                    disabled={jobs.current_page === jobs.last_page}
                                    onClick={() => {
                                        const nextLink = jobs.links.find(l => l.label.includes('Next'));

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
