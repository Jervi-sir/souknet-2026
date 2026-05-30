import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    MapPin,
    Building2,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    Briefcase,
    DollarSign,
    MoreHorizontal
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

interface SavedJobsProps {
    jobs: PaginatedJobs;
    savedJobIds: number[];
    filters: {
        search: string;
    };
}

export default function SavedJobs({
    jobs,
    savedJobIds = [],
    filters,
}: SavedJobsProps) {
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

        router.get('/saved-jobs', params, {
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
        router.get('/saved-jobs', {});
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
            jobs.data.forEach(j => {
                newSelected[j.id] = true;
            });
        }

        setSelectedRows(newSelected);
    };

    const handleToggleSave = (jobId: number) => {
        router.post(`/jobs/${jobId}/save`, {}, {
            preserveScroll: true,
        });
    };

    const handleBulkSave = () => {
        const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[Number(id)]);

        if (selectedIds.length === 0) {
return;
}

        router.post('/jobs/save-multiple', { ids: selectedIds.map(Number) }, {
            preserveScroll: true,
            onSuccess: () => setSelectedRows({}),
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

    const allSelected = jobs.data.length > 0 && jobs.data.every(j => selectedRows[j.id]);
    const anySelected = Object.values(selectedRows).some(Boolean);

    return (
        <GuestLayout>
            <Head>
                <title>Saved Jobs - SoukNet</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex-1 flex flex-col min-w-0 bg-[#15171e] p-6 space-y-4">
                {/* Header line */}
                <div className="flex items-center justify-between border-b border-[#262930] pb-3">
                    <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-[#4318FF]" />
                        Saved Jobs ({jobs.total})
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
                                    placeholder="Search saved jobs..."
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
                                    <th className="p-3 font-semibold">Job Title</th>
                                    <th className="p-3 font-semibold">Company</th>
                                    <th className="p-3 font-semibold">Job Type</th>
                                    <th className="p-3 font-semibold">Location</th>
                                    <th className="p-3 font-semibold">Salary Range</th>
                                    <th className="p-3 font-semibold">Experience</th>
                                    <th className="p-3 w-20 text-center">Unsave</th>
                                    <th className="p-3 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262930] text-zinc-100">
                                {jobs.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="p-12 text-center text-[#8f9bba]">
                                            <Briefcase className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                                            <h3 className="font-bold text-white text-sm">No Saved Jobs Found</h3>
                                            <p className="text-xs text-[#8f9bba] mt-1 max-w-xs mx-auto">
                                                Save jobs from the Jobs Directory to build your list.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    jobs.data.map((job) => {
                                        const isSelected = !!selectedRows[job.id];

                                        return (
                                            <tr key={job.id} className={`hover:bg-[#15171e]/40 transition-colors ${isSelected ? 'bg-[#4318FF]/5' : ''}`}>
                                                <td className="p-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleRow(job.id)}
                                                        className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                                                    />
                                                </td>
                                                <td className="p-3 font-bold text-white hover:text-[#6AD2FF] cursor-pointer">
                                                    {job.title}
                                                </td>
                                                <td className="p-3">
                                                    {job.business ? (
                                                        <Link href={`/directory/${job.business.slug}`} className="font-semibold text-white hover:underline">
                                                            {job.business.name}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-zinc-505 italic">Independent</span>
                                                    )}
                                                </td>
                                                <td className="p-3">
                                                    <span className="bg-indigo-950 text-[#6AD2FF] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                        {job.type}
                                                    </span>
                                                </td>
                                                <td className="p-3 flex items-center gap-2">
                                                    <MapPin className="h-3.5 w-3.5 text-[#8f9bba] shrink-0" />
                                                    <span className="text-[#8f9bba]">{job.location}</span>
                                                </td>
                                                <td className="p-3 flex items-center gap-1.5 font-semibold text-white">
                                                    <DollarSign className="h-3.5 w-3.5 text-[#8f9bba]" />
                                                    {formatSalary(job)}
                                                </td>
                                                <td className="p-3 text-[#8f9bba] capitalize">
                                                    {job.experience} level
                                                </td>
                                                <td className="p-3 text-center">
                                                    <button
                                                        onClick={() => handleToggleSave(job.id)}
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
                </div>
            </div>
        </GuestLayout>
    );
}
