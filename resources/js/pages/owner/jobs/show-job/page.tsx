import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    Briefcase,
    Building2,
    MapPin,
    DollarSign,
    Calendar,
    ArrowLeft,
    Edit2,
    Save,
    X,
    Trash2,
    Clock,
    Tag
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import OwnerLayout from '@/layouts/owner-layout';

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
    business_id: number;
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
    job: JobPost;
    businesses: Business[];
}

export default function ShowJob({ job, businesses }: Props) {
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        business_id: job.business_id || '',
        title: job.title || '',
        location: job.location || '',
        type: job.type || 'Full-Time',
        experience: job.experience || '',
        salary_min: job.salary_min !== null ? job.salary_min : '',
        salary_max: job.salary_max !== null ? job.salary_max : '',
        salary_currency: job.salary_currency || 'DZD',
        description: job.description || '',
        is_active: job.is_active,
    });

    const handleSave = () => {
        put(route('owner.jobs.update', { id: job.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
            router.delete(route('owner.jobs.destroy', { id: job.id }));
        }
    };

    return (
        <>
            <Head title={`Manage Job: ${job.title}`} />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen p-6 space-y-6">
                
                {/* Back Link & Header */}
                <div className="flex flex-col gap-4 border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('owner.jobs.index')}
                            className="inline-flex items-center gap-1 text-xs text-[#8f9bba] hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Back to Job Postings
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                                    job.is_active
                                        ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25'
                                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                }`}>
                                    {job.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <h1 className="text-xl font-extrabold text-white tracking-tight">
                                {job.title}
                            </h1>
                            {job.business && (
                                <p className="text-xs text-[#8f9bba] mt-0.5 flex items-center gap-1">
                                    <Building2 className="h-3.5 w-3.5" />
                                    {job.business.name}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-3.5 py-2 rounded-lg text-xs font-bold transition-all"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Post
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="max-w-3xl w-full mx-auto bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center px-5 py-4 border-b border-[#262930]/40">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">Job Details</h3>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-[#4318FF] hover:text-indigo-400 text-xs font-bold flex items-center gap-1.5"
                            >
                                <Edit2 className="h-3.5 w-3.5" />
                                Instant Edit
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={processing}
                                    className="bg-[#4318FF] hover:bg-[#3b15e6] text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1"
                                >
                                    <Save className="h-3 w-3" />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 px-3 py-1 rounded text-xs font-bold flex items-center gap-1"
                                >
                                    <X className="h-3 w-3" />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="p-5 space-y-5">
                        {!isEditing ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><Building2 className="h-3 w-3" /> Associated Business</div>
                                        <div className="text-xs text-white mt-0.5">{job.business?.name || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><MapPin className="h-3 w-3" /> Location</div>
                                        <div className="text-xs text-white mt-0.5">{job.location}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><Clock className="h-3 w-3" /> Job Type</div>
                                        <div className="text-xs text-white mt-0.5">{job.type}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><Tag className="h-3 w-3" /> Experience Level</div>
                                        <div className="text-xs text-white mt-0.5">{job.experience || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><DollarSign className="h-3 w-3" /> Salary Package</div>
                                        <div className="text-xs text-[#10b981] font-bold mt-0.5">
                                            {job.salary_min && job.salary_max
                                                ? `${job.salary_min} - ${job.salary_max} ${job.salary_currency || 'DZD'}`
                                                : 'Salary N/A'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><Calendar className="h-3 w-3" /> Posted Date</div>
                                        <div className="text-xs text-white mt-0.5">{new Date(job.created_at).toLocaleDateString()}</div>
                                    </div>
                                </div>

                                <div className="border-t border-[#262930]/40 pt-5">
                                    <div className="text-[10px] text-[#8f9bba] font-bold uppercase mb-1.5">Job Description</div>
                                    <div className="text-xs text-[#8f9bba] leading-relaxed whitespace-pre-wrap">
                                        {job.description}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-1.5 col-span-2">
                                        <Label htmlFor="business_id" className="text-xs text-[#8f9bba] font-bold uppercase">Associated Business</Label>
                                        <select
                                            id="business_id"
                                            value={data.business_id}
                                            onChange={(e) => setData('business_id', Number(e.target.value))}
                                            className="w-full bg-[#15171e] border border-[#262930] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-[#4318FF] cursor-pointer"
                                        >
                                            {businesses.map((b) => (
                                                <option key={b.id} value={b.id}>{b.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid gap-1.5 col-span-2">
                                        <Label htmlFor="title" className="text-xs text-[#8f9bba] font-bold uppercase">Job Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="location" className="text-xs text-[#8f9bba] font-bold uppercase">Location</Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="type" className="text-xs text-[#8f9bba] font-bold uppercase">Job Type</Label>
                                        <select
                                            id="type"
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="w-full bg-[#15171e] border border-[#262930] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                                        >
                                            <option value="Full-Time">Full-Time</option>
                                            <option value="Part-Time">Part-Time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Remote">Remote</option>
                                        </select>
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="experience" className="text-xs text-[#8f9bba] font-bold uppercase">Experience Level</Label>
                                        <Input
                                            id="experience"
                                            value={data.experience}
                                            onChange={(e) => setData('experience', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="salary_currency" className="text-xs text-[#8f9bba] font-bold uppercase">Currency</Label>
                                        <Input
                                            id="salary_currency"
                                            value={data.salary_currency}
                                            onChange={(e) => setData('salary_currency', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="salary_min" className="text-xs text-[#8f9bba] font-bold uppercase">Min Salary</Label>
                                        <Input
                                            id="salary_min"
                                            type="number"
                                            value={data.salary_min}
                                            onChange={(e) => setData('salary_min', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="salary_max" className="text-xs text-[#8f9bba] font-bold uppercase">Max Salary</Label>
                                        <Input
                                            id="salary_max"
                                            type="number"
                                            value={data.salary_max}
                                            onChange={(e) => setData('salary_max', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                    </div>

                                    <div className="grid gap-1.5 col-span-2">
                                        <Label className="text-xs text-[#8f9bba] font-bold uppercase">Status</Label>
                                        <div className="flex items-center gap-4 mt-1">
                                            <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    checked={data.is_active === true}
                                                    onChange={() => setData('is_active', true)}
                                                    className="accent-[#4318FF]"
                                                />
                                                Active / Open
                                            </label>
                                            <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    checked={data.is_active === false}
                                                    onChange={() => setData('is_active', false)}
                                                    className="accent-[#4318FF]"
                                                />
                                                Inactive / Closed
                                            </label>
                                        </div>
                                    </div>

                                    <div className="grid gap-1.5 col-span-2">
                                        <Label htmlFor="description" className="text-xs text-[#8f9bba] font-bold uppercase">Job Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs min-h-36"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

ShowJob.layout = (page: React.ReactNode) => {
    const jobTitle = (page as any).props?.job?.title || 'Job Details';

    return (
        <OwnerLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('owner.dashboard') },
                { title: 'Job Postings', href: route('owner.jobs.index') },
                { title: jobTitle, href: '#' }
            ]}
        >
            {page}
        </OwnerLayout>
    );
};
