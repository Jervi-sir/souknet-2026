import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    Users,
    Building2,
    MapPin,
    Mail,
    Phone,
    ArrowLeft,
    Edit2,
    Save,
    X,
    Trash2,
    Linkedin,
    Github,
    CheckCircle2
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OwnerLayout from '@/layouts/owner-layout';

interface Person {
    id: number;
    business_id: number;
    first_name: string;
    last_name: string;
    title: string;
    email: string | null;
    phone: string | null;
    location: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    is_verified: boolean;
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
    person: Person;
    businesses: Business[];
}

export default function ShowPerson({ person, businesses }: Props) {
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        business_id: person.business_id || '',
        first_name: person.first_name || '',
        last_name: person.last_name || '',
        title: person.title || '',
        email: person.email || '',
        phone: person.phone || '',
        location: person.location || '',
        linkedin_url: person.linkedin_url || '',
        github_url: person.github_url || '',
        is_verified: person.is_verified,
    });

    const handleSave = () => {
        put(route('owner.people.update', { id: person.id }), {
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
        if (confirm('Are you sure you want to delete this professional profile? This action cannot be undone.')) {
            router.delete(route('owner.people.destroy', { id: person.id }));
        }
    };

    return (
        <>
            <Head title={`Manage Professional: ${person.first_name} ${person.last_name}`} />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen p-6 space-y-6">
                
                {/* Back Link & Header */}
                <div className="flex flex-col gap-4 border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('owner.people.index')}
                            className="inline-flex items-center gap-1 text-xs text-[#8f9bba] hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Back to Team Directory
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                {person.is_verified ? (
                                    <span className="inline-flex items-center gap-1 bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25 px-2.5 py-0.5 rounded text-[10px] font-bold">
                                        <CheckCircle2 className="h-3 w-3" /> Verified Professional
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-400 border border-zinc-700 px-2.5 py-0.5 rounded text-[10px] font-bold">
                                        Standard Listing
                                    </span>
                                )}
                            </div>
                            <h1 className="text-xl font-extrabold text-white tracking-tight">
                                {person.first_name} {person.last_name}
                            </h1>
                            <p className="text-xs text-[#6AD2FF] font-medium mt-0.5">
                                {person.title}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="max-w-3xl w-full mx-auto bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center px-5 py-4 border-b border-[#262930]/40">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">Profile Details</h3>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-[#4318FF] hover:text-indigo-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                                <Edit2 className="h-3.5 w-3.5" />
                                Instant Edit
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={processing}
                                    className="bg-[#4318FF] hover:bg-[#3b15e6] text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                                >
                                    <Save className="h-3 w-3" />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 px-3 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
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
                                        <div className="text-xs text-white mt-0.5">{person.business?.name || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><MapPin className="h-3 w-3" /> Location</div>
                                        <div className="text-xs text-white mt-0.5">{person.location || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><Mail className="h-3 w-3" /> Email Address</div>
                                        <div className="text-xs text-white mt-0.5">{person.email || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><Phone className="h-3 w-3" /> Phone Number</div>
                                        <div className="text-xs text-white mt-0.5">{person.phone || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><Linkedin className="h-3 w-3" /> LinkedIn Profile</div>
                                        <div className="text-xs text-[#6AD2FF] mt-0.5 truncate">
                                            {person.linkedin_url ? (
                                                <a href={person.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                                                    {person.linkedin_url}
                                                </a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#8f9bba] font-bold uppercase flex items-center gap-1"><Github className="h-3 w-3" /> GitHub Profile</div>
                                        <div className="text-xs text-[#6AD2FF] mt-0.5 truncate">
                                            {person.github_url ? (
                                                <a href={person.github_url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                                                    {person.github_url}
                                                </a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </div>
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
                                        {errors.business_id && <span className="text-red-550 text-[10px]">{errors.business_id}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="first_name" className="text-xs text-[#8f9bba] font-bold uppercase">First Name</Label>
                                        <Input
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.first_name && <span className="text-red-550 text-[10px]">{errors.first_name}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="last_name" className="text-xs text-[#8f9bba] font-bold uppercase">Last Name</Label>
                                        <Input
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.last_name && <span className="text-red-550 text-[10px]">{errors.last_name}</span>}
                                    </div>

                                    <div className="grid gap-1.5 col-span-2">
                                        <Label htmlFor="title" className="text-xs text-[#8f9bba] font-bold uppercase">Job Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.title && <span className="text-red-550 text-[10px]">{errors.title}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="email" className="text-xs text-[#8f9bba] font-bold uppercase">Email Address</Label>
                                        <Input
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.email && <span className="text-red-550 text-[10px]">{errors.email}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="phone" className="text-xs text-[#8f9bba] font-bold uppercase">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.phone && <span className="text-red-550 text-[10px]">{errors.phone}</span>}
                                    </div>

                                    <div className="grid gap-1.5 col-span-2">
                                        <Label htmlFor="location" className="text-xs text-[#8f9bba] font-bold uppercase">Location</Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.location && <span className="text-red-550 text-[10px]">{errors.location}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="linkedin_url" className="text-xs text-[#8f9bba] font-bold uppercase">LinkedIn Profile URL</Label>
                                        <Input
                                            id="linkedin_url"
                                            value={data.linkedin_url}
                                            onChange={(e) => setData('linkedin_url', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.linkedin_url && <span className="text-red-550 text-[10px]">{errors.linkedin_url}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="github_url" className="text-xs text-[#8f9bba] font-bold uppercase">GitHub Profile URL</Label>
                                        <Input
                                            id="github_url"
                                            value={data.github_url}
                                            onChange={(e) => setData('github_url', e.target.value)}
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.github_url && <span className="text-red-550 text-[10px]">{errors.github_url}</span>}
                                    </div>

                                    <div className="flex items-center gap-2 col-span-2 pt-2">
                                        <input
                                            type="checkbox"
                                            id="is_verified"
                                            checked={data.is_verified}
                                            onChange={(e) => setData('is_verified', e.target.checked)}
                                            className="h-4 w-4 bg-[#15171e] border-[#262930] rounded accent-[#4318FF] focus:outline-none"
                                        />
                                        <Label htmlFor="is_verified" className="text-xs text-zinc-300 cursor-pointer">
                                            Mark as Verified Professional
                                        </Label>
                                        {errors.is_verified && <span className="text-red-550 text-[10px]">{errors.is_verified}</span>}
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

ShowPerson.layout = (page: React.ReactNode) => {
    const personName = (page as any).props?.person
        ? `${(page as any).props.person.first_name} ${(page as any).props.person.last_name}`
        : 'Professional Profile';

    return (
        <OwnerLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('owner.dashboard') },
                { title: 'Team & Professionals', href: route('owner.people.index') },
                { title: personName, href: '#' }
            ]}
        >
            {page}
        </OwnerLayout>
    );
};
