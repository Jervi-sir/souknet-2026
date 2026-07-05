import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Briefcase,
    Search,
    Plus,
    X,
    ExternalLink,
    Edit2,
    Trash2,
    DollarSign,
    MapPin,
    Building2,
    Calendar,
    Save
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import OwnerLayout from '@/layouts/owner-layout';
import OwnerDashboardController from '@/actions/App/Http/Controllers/Owner/OwnerDashboardController';
import OwnerJobController from '@/actions/App/Http/Controllers/Owner/OwnerJobController';

interface JobPost {
    id: number;
    title: string;
    slug: string;
    location: string;
    type: string;
    experience: string | null;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string | null;
    description: string;
    is_active: boolean;
    created_at: string;
    business: {
        id: number;
        name: string;
        slug: string;
    } | null;
}

interface Business {
    id: number;
    name: string;
}

interface Props {
    jobs: {
        data: JobPost[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    businesses: Business[];
    filters: {
        search?: string;
        type?: string;
        business_id?: string;
    };
}

export default function ListedJobs({ jobs, businesses, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [businessId, setBusinessId] = useState(filters.business_id || '');
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    // Form for new job post
    const { data, setData, post, processing, errors, reset } = useForm({
        business_id: businesses[0]?.id || '',
        title: '',
        location: '',
        type: 'Full-Time',
        experience: 'Mid-Level',
        salary_min: '',
        salary_max: '',
        salary_currency: 'DZD',
        description: '',
        is_active: true,
    });

    const applyFilters = () => {
        router.get(
            OwnerJobController.index.url(),
            {
                search: search || undefined,
                type: type || undefined,
                business_id: businessId || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    useEffect(() => {
        applyFilters();
    }, [type, businessId]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const clearFilters = () => {
        setSearch('');
        setType('');
        setBusinessId('');
        router.get(OwnerJobController.index.url(), {}, { preserveState: true, replace: true });
    };

    const handleCreateJob = (e: React.FormEvent) => {
        e.preventDefault();
        post(OwnerJobController.store().url, {
            onSuccess: () => {
                setCreateDialogOpen(false);
                reset();
            },
        });
    };

    const handleDeleteJob = (id: number) => {
        if (confirm('Are you sure you want to delete this job posting?')) {
            router.delete(OwnerJobController.destroy({ id: id }));
        }
    };

    return (
        <>
            <Head title="My Job Postings" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen p-6 space-y-6">

                {/* Header Title */}
                <div className="flex flex-col gap-4 border-b border-[#262930] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#6AD2FF] tracking-wider uppercase">Recruitment Hub</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight">
                            My Job Postings
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Post, manage, and track career opportunities across your registered business profiles.
                        </p>
                    </div>

                    {/* Dialog to Post a Job */}
                    <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#4318FF] hover:bg-[#3b15e6] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-900/20 gap-1.5 h-9">
                                <Plus className="h-4 w-4" />
                                Post a Job
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#0c0d12] border-[#262930] text-white max-w-xl">
                            <form onSubmit={handleCreateJob} className="space-y-4">
                                <DialogHeader>
                                    <DialogTitle className="text-sm font-bold uppercase text-[#8f9bba]">Post New Job Opportunity</DialogTitle>
                                    <DialogDescription className="text-xs text-zinc-400">
                                        Fill in the fields below to list a new job opening under one of your directory businesses.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-1.5 col-span-2">
                                        <Label htmlFor="business_id" className="text-xs text-[#8f9bba] font-bold">Associated Business *</Label>
                                        <select
                                            id="business_id"
                                            value={data.business_id}
                                            onChange={(e) => setData('business_id', e.target.value)}
                                            className="w-full bg-[#15171e] border border-[#262930] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-[#4318FF] cursor-pointer"
                                            required
                                        >
                                            <option value="">Select Business</option>
                                            {businesses.map((biz) => (
                                                <option key={biz.id} value={biz.id}>{biz.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid gap-1.5 col-span-2">
                                        <Label htmlFor="title" className="text-xs text-[#8f9bba] font-bold">Job Title *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="e.g. Senior Frontend Developer"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="location" className="text-xs text-[#8f9bba] font-bold">Location *</Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="e.g. Algiers (Hybrid)"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="type" className="text-xs text-[#8f9bba] font-bold">Job Type</Label>
                                        <select
                                            id="type"
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="w-full bg-[#15171e] border border-[#262930] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-[#4318FF]"
                                        >
                                            <option value="Full-Time">Full-Time</option>
                                            <option value="Part-Time">Part-Time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Remote">Remote</option>
                                        </select>
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="experience" className="text-xs text-[#8f9bba] font-bold">Experience Level</Label>
                                        <Input
                                            id="experience"
                                            value={data.experience}
                                            onChange={(e) => setData('experience', e.target.value)}
                                            placeholder="e.g. 3+ Years"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="salary_currency" className="text-xs text-[#8f9bba] font-bold">Salary Currency</Label>
                                        <Input
                                            id="salary_currency"
                                            value={data.salary_currency}
                                            onChange={(e) => setData('salary_currency', e.target.value)}
                                            placeholder="e.g. DZD"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="salary_min" className="text-xs text-[#8f9bba] font-bold">Min Salary</Label>
                                        <Input
                                            id="salary_min"
                                            type="number"
                                            value={data.salary_min}
                                            onChange={(e) => setData('salary_min', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="salary_max" className="text-xs text-[#8f9bba] font-bold">Max Salary</Label>
                                        <Input
                                            id="salary_max"
                                            type="number"
                                            value={data.salary_max}
                                            onChange={(e) => setData('salary_max', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                    </div>

                                    <div className="grid gap-1.5 col-span-2">
                                        <Label htmlFor="description" className="text-xs text-[#8f9bba] font-bold">Job Description *</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Describe responsibilities, requirements, benefits..."
                                            className="bg-[#15171e] border-[#262930] text-xs min-h-24"
                                            required
                                        />
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setCreateDialogOpen(false)}
                                        className="text-zinc-400 hover:text-white"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-[#4318FF] hover:bg-[#3b15e6] text-white font-bold"
                                    >
                                        Post Job Listing
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filter Controls */}
                <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4">
                    <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 md:flex-row md:items-center">
                        {/* Search Title */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8f9bba]" />
                            <input
                                type="text"
                                placeholder="Search by job title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#15171e] border border-[#262930] rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF] transition-colors"
                            />
                        </div>

                        {/* Associated Business selector */}
                        <div className="w-full md:w-48">
                            <select
                                value={businessId}
                                onChange={(e) => setBusinessId(e.target.value)}
                                className="w-full bg-[#15171e] border border-[#262930] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-[#4318FF] cursor-pointer appearance-none"
                            >
                                <option value="">All Businesses</option>
                                {businesses.map((b) => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Job Type Dropdown */}
                        <div className="w-full md:w-40">
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-[#15171e] border border-[#262930] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-[#4318FF] cursor-pointer appearance-none"
                            >
                                <option value="">All Job Types</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-[#22252e] hover:bg-[#262930] border border-[#262930] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                            >
                                Apply
                            </button>
                            {(filters.search || filters.type || filters.business_id) && (
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

                {/* Job Postings Grid list */}
                <div className="space-y-4">
                    {jobs.data.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#262930] bg-[#0c0d12] p-16 text-center">
                            <Briefcase className="mx-auto mb-3 h-10 w-10 text-zinc-650" />
                            <h3 className="text-sm font-semibold text-zinc-400">No job postings found</h3>
                            <p className="mx-auto mt-1 max-w-xs text-xs text-[#8f9bba]">
                                Try clearing the filters or click 'Post a Job' to create a new recruitment listing.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {jobs.data.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] rounded-xl flex flex-col justify-between transition-all group"
                                >
                                    <div className="space-y-4 p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="line-clamp-1 text-sm font-bold text-white group-hover:text-[#4318FF] transition-colors">
                                                    <Link href={OwnerJobController.show({ id: job.id })}>
                                                        {job.title}
                                                    </Link>
                                                </h3>
                                                {job.business && (
                                                    <div className="flex items-center gap-1 mt-0.5 text-[11px] text-[#8f9bba]">
                                                        <Building2 className="h-3.5 w-3.5" />
                                                        <span>{job.business.name}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${job.is_active
                                                ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25'
                                                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                                }`}>
                                                {job.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-zinc-300">
                                            <span className="bg-[#15171e] border border-[#262930] px-2 py-0.5 rounded">
                                                {job.type}
                                            </span>
                                            {job.experience && (
                                                <span className="bg-[#15171e] border border-[#262930] px-2 py-0.5 rounded">
                                                    {job.experience}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 border-t border-[#262930]/40 pt-3 text-xs text-[#8f9bba]">
                                            <div className="flex items-center gap-1 text-[#10b981]">
                                                <DollarSign className="h-3.5 w-3.5" />
                                                <span className="font-bold text-white">
                                                    {job.salary_min && job.salary_max
                                                        ? `${job.salary_min} - ${job.salary_max} ${job.salary_currency || 'DZD'}`
                                                        : 'Salary N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action items footer */}
                                    <div className="flex items-center justify-between border-t border-[#262930]/40 px-5 py-3 text-xs bg-[#15171e]/20 rounded-b-xl">
                                        <button
                                            onClick={() => handleDeleteJob(job.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors font-medium flex items-center gap-1"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Delete Post
                                        </button>
                                        <Link
                                            href={OwnerJobController.show({ id: job.id })}
                                            className="font-bold text-[#4318FF] hover:underline flex items-center gap-1"
                                        >
                                            <Edit2 className="h-3.5 w-3.5" />
                                            Manage Job
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <SimplePagination links={jobs.links} />
                </div>
            </div>
        </>
    );
}

ListedJobs.layout = (page: React.ReactNode) => (
    <OwnerLayout
        breadcrumbs={[
            { title: 'Dashboard', href: OwnerDashboardController.index.url() },
            { title: 'Job Postings', href: OwnerJobController.index.url() }
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
