import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Users,
    Search,
    Plus,
    X,
    ExternalLink,
    Edit2,
    Trash2,
    Mail,
    Phone,
    MapPin,
    Building2,
    Linkedin,
    Github,
    CheckCircle2
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
    people: {
        data: Person[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    businesses: Business[];
    filters: {
        search?: string;
        business_id?: string;
    };
}

export default function ListedPeople({ people, businesses, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [businessId, setBusinessId] = useState(filters.business_id || '');
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    // Form for new professional
    const { data, setData, post, processing, errors, reset } = useForm({
        business_id: businesses[0]?.id || '',
        first_name: '',
        last_name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        linkedin_url: '',
        github_url: '',
        is_verified: false,
    });

    const applyFilters = () => {
        router.get(
            route('owner.people.index'),
            {
                search: search || undefined,
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
    }, [businessId]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const clearFilters = () => {
        setSearch('');
        setBusinessId('');
        router.get(route('owner.people.index'), {}, { preserveState: true, replace: true });
    };

    const handleCreatePerson = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('owner.people.store'), {
            onSuccess: () => {
                setCreateDialogOpen(false);
                reset();
            },
        });
    };

    const handleDeletePerson = (id: number) => {
        if (confirm('Are you sure you want to delete this professional listing?')) {
            router.delete(route('owner.people.destroy', { id }));
        }
    };

    return (
        <>
            <Head title="My Team & Professionals" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen p-6 space-y-6">
                
                {/* Header Title */}
                <div className="flex flex-col gap-4 border-b border-[#262930] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#6AD2FF] tracking-wider uppercase">Team Directory</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight">
                            My Team & Professionals
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Manage team profiles, verification badges, and public professional listings associated with your businesses.
                        </p>
                    </div>

                    {/* Dialog to Add a Professional */}
                    <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#4318FF] hover:bg-[#3b15e6] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-900/20 gap-1.5 h-9">
                                <Plus className="h-4 w-4" />
                                Add Professional
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#0c0d12] border-[#262930] text-white max-w-xl">
                            <form onSubmit={handleCreatePerson} className="space-y-4">
                                <DialogHeader>
                                    <DialogTitle className="text-sm font-bold uppercase text-[#8f9bba]">Add New Professional</DialogTitle>
                                    <DialogDescription className="text-xs text-zinc-400">
                                        Fill in the profile details to associate a professional or team member with one of your listings.
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
                                        {errors.business_id && <span className="text-red-550 text-[10px]">{errors.business_id}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="first_name" className="text-xs text-[#8f9bba] font-bold">First Name *</Label>
                                        <Input
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            placeholder="John"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                            required
                                        />
                                        {errors.first_name && <span className="text-red-550 text-[10px]">{errors.first_name}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="last_name" className="text-xs text-[#8f9bba] font-bold">Last Name *</Label>
                                        <Input
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            placeholder="Doe"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                            required
                                        />
                                        {errors.last_name && <span className="text-red-550 text-[10px]">{errors.last_name}</span>}
                                    </div>

                                    <div className="grid gap-1.5 col-span-2">
                                        <Label htmlFor="title" className="text-xs text-[#8f9bba] font-bold">Job Title / Role *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="e.g. Lead Software Architect"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                            required
                                        />
                                        {errors.title && <span className="text-red-550 text-[10px]">{errors.title}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="email" className="text-xs text-[#8f9bba] font-bold">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="john.doe@example.com"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.email && <span className="text-red-550 text-[10px]">{errors.email}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="phone" className="text-xs text-[#8f9bba] font-bold">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="e.g. +213 555 12 34 56"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.phone && <span className="text-red-550 text-[10px]">{errors.phone}</span>}
                                    </div>

                                    <div className="grid gap-1.5 col-span-2">
                                        <Label htmlFor="location" className="text-xs text-[#8f9bba] font-bold">Location</Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="e.g. Algiers, Algeria"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.location && <span className="text-red-550 text-[10px]">{errors.location}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="linkedin_url" className="text-xs text-[#8f9bba] font-bold">LinkedIn Profile URL</Label>
                                        <Input
                                            id="linkedin_url"
                                            value={data.linkedin_url}
                                            onChange={(e) => setData('linkedin_url', e.target.value)}
                                            placeholder="https://linkedin.com/in/username"
                                            className="bg-[#15171e] border-[#262930] text-xs"
                                        />
                                        {errors.linkedin_url && <span className="text-red-550 text-[10px]">{errors.linkedin_url}</span>}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="github_url" className="text-xs text-[#8f9bba] font-bold">GitHub Profile URL</Label>
                                        <Input
                                            id="github_url"
                                            value={data.github_url}
                                            onChange={(e) => setData('github_url', e.target.value)}
                                            placeholder="https://github.com/username"
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
                                            Mark as Verified Professional (adds verification badge on directory)
                                        </Label>
                                        {errors.is_verified && <span className="text-red-550 text-[10px]">{errors.is_verified}</span>}
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
                                        Save Professional
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filter Controls */}
                <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4">
                    <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 md:flex-row md:items-center">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8f9bba]" />
                            <input
                                type="text"
                                placeholder="Search by name or title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#15171e] border border-[#262930] rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF] transition-colors"
                            />
                        </div>

                        {/* Associated Business Dropdown */}
                        <div className="w-full md:w-56">
                            <select
                                value={businessId}
                                onChange={(e) => setBusinessId(e.target.value)}
                                className="w-full bg-[#15171e] border border-[#262930] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-[#4318FF] cursor-pointer appearance-none animate-none"
                            >
                                <option value="">All Businesses</option>
                                {businesses.map((biz) => (
                                    <option key={biz.id} value={biz.id}>{biz.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-[#22252e] hover:bg-[#262930] border border-[#262930] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                            >
                                Apply
                            </button>
                            {(filters.search || filters.business_id) && (
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

                {/* Professionals Grid list */}
                <div className="space-y-4">
                    {people.data.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#262930] bg-[#0c0d12] p-16 text-center">
                            <Users className="mx-auto mb-3 h-10 w-10 text-zinc-650" />
                            <h3 className="text-sm font-semibold text-zinc-400">No professionals found</h3>
                            <p className="mx-auto mt-1 max-w-xs text-xs text-[#8f9bba]">
                                Try clearing the filters or click 'Add Professional' to register your first team member.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {people.data.map((person) => (
                                <div
                                    key={person.id}
                                    className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] rounded-xl flex flex-col justify-between transition-all group"
                                >
                                    <div className="space-y-4 p-5">
                                        {/* Card Header info */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <h3 className="text-sm font-bold text-white group-hover:text-[#4318FF] transition-colors line-clamp-1">
                                                        <Link href={route('owner.people.show', { id: person.id })}>
                                                            {person.first_name} {person.last_name}
                                                        </Link>
                                                    </h3>
                                                    {person.is_verified && (
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981] shrink-0" fill="rgba(16,185,129,0.15)" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-[#6AD2FF] font-medium mt-0.5 line-clamp-1">
                                                    {person.title}
                                                </p>
                                            </div>

                                            {person.business && (
                                                <span className="inline-flex items-center gap-1 bg-[#4318FF]/15 text-[#6AD2FF] border border-[#4318FF]/25 px-2 py-0.5 rounded text-[10px] font-bold max-w-[120px] truncate">
                                                    {person.business.name}
                                                </span>
                                            )}
                                        </div>

                                        {/* Contact & Location details */}
                                        <div className="space-y-1.5 text-xs text-[#8f9bba] pt-2 border-t border-[#262930]/40">
                                            {person.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                                                    <span className="truncate">{person.location}</span>
                                                </div>
                                            )}
                                            {person.email && (
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                                                    <span className="truncate">{person.email}</span>
                                                </div>
                                            )}
                                            {person.phone && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                                                    <span>{person.phone}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Social media links if available */}
                                        {(person.linkedin_url || person.github_url) && (
                                            <div className="flex gap-2 pt-1.5">
                                                {person.linkedin_url && (
                                                    <a
                                                        href={person.linkedin_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-zinc-500 hover:text-[#0077b5] transition-colors p-1 bg-[#15171e] rounded border border-[#262930]"
                                                    >
                                                        <Linkedin className="h-3.5 w-3.5" />
                                                    </a>
                                                )}
                                                {person.github_url && (
                                                    <a
                                                        href={person.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-zinc-500 hover:text-white transition-colors p-1 bg-[#15171e] rounded border border-[#262930]"
                                                    >
                                                        <Github className="h-3.5 w-3.5" />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action footer */}
                                    <div className="flex items-center justify-between border-t border-[#262930]/40 px-5 py-3 text-xs bg-[#15171e]/20 rounded-b-xl">
                                        <button
                                            onClick={() => handleDeletePerson(person.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Delete Profile
                                        </button>
                                        <Link
                                            href={route('owner.people.show', { id: person.id })}
                                            className="font-bold text-[#4318FF] hover:underline flex items-center gap-1"
                                        >
                                            <Edit2 className="h-3.5 w-3.5" />
                                            Manage Profile
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination component */}
                    <SimplePagination links={people.links} />
                </div>
            </div>
        </>
    );
}

// Layout configuration
ListedPeople.layout = (page: React.ReactNode) => (
    <OwnerLayout
        breadcrumbs={[
            { title: 'Dashboard', href: route('owner.dashboard') },
            { title: 'Team & Professionals', href: route('owner.people.index') }
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            link.active
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
