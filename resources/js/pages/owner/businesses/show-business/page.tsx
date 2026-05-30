import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    Building2,
    Eye,
    MousePointer,
    MessageSquare,
    Star,
    Edit2,
    Save,
    X,
    ExternalLink,
    MapPin,
    Phone,
    Mail,
    Globe,
    Calendar,
    ArrowLeft,
    Trash2
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import OwnerLayout from '@/layouts/owner-layout';

interface Business {
    id: number;
    name: string;
    slug: string;
    tagline: string | null;
    description: string | null;
    status: string;
    is_featured: boolean;
    is_verified: boolean;
    founded_year: number | null;
    address: string | null;
    city: string | null;
    country: string | null;
    phone: string | null;
    email: string | null;
    website: string | null;
    category_id: number;
    plan_id: number | null;
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

interface Plan {
    id: number;
    en: string;
}

interface Review {
    id: number;
    rating: number;
    body: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
    } | null;
}

interface Props {
    business: Business;
    categories: Category[];
    plans: Plan[];
    metrics: {
        views: number;
        clicks: number;
        reviews: number;
        contacts: number;
    };
    reviews: {
        data: Review[];
        links: any[];
    };
}

type EditingSection = 'general' | 'contact' | 'location' | null;

export default function ShowBusiness({ business, categories, plans, metrics, reviews }: Props) {
    const [editingSection, setEditingSection] = useState<EditingSection>(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: business.name || '',
        tagline: business.tagline || '',
        description: business.description || '',
        category_id: business.category_id || '',
        plan_id: business.plan_id || '',
        founded_year: business.founded_year || '',
        address: business.address || '',
        city: business.city || '',
        country: business.country || '',
        phone: business.phone || '',
        email: business.email || '',
        website: business.website || '',
    });

    const handleSave = (section: EditingSection) => {
        put(route('owner.listings.update', { id: business.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setEditingSection(null);
            },
        });
    };

    const handleCancel = () => {
        reset();
        setEditingSection(null);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to permanently delete this business listing? This action cannot be undone.')) {
            router.delete(route('owner.listings.destroy', { id: business.id }));
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'published':
                return (
                    <span className="inline-flex items-center gap-1 bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25 px-2.5 py-0.5 rounded text-xs font-bold">
                        Active / Published
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2.5 py-0.5 rounded text-xs font-bold">
                        Pending Approval
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 bg-red-500/15 text-red-400 border border-red-500/25 px-2.5 py-0.5 rounded text-xs font-bold">
                        Rejected
                    </span>
                );
            case 'draft':
            default:
                return (
                    <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-400 border border-zinc-700 px-2.5 py-0.5 rounded text-xs font-bold">
                        Draft
                    </span>
                );
        }
    };

    return (
        <>
            <Head title={`Manage: ${business.name}`} />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen p-6 space-y-6">
                
                {/* Back Link & Header Title */}
                <div className="flex flex-col gap-4 border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('owner.listings.index')}
                            className="inline-flex items-center gap-1 text-xs text-[#8f9bba] hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Back to Listings
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                {getStatusBadge(business.status)}
                                {business.is_featured && (
                                    <span className="bg-[#4318FF]/15 text-[#6AD2FF] border border-[#4318FF]/25 px-2.5 py-0.5 rounded text-[10px] font-bold">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-xl font-extrabold text-white tracking-tight">
                                {business.name}
                            </h1>
                            {business.tagline && (
                                <p className="text-xs text-[#8f9bba] mt-0.5 italic">
                                    "{business.tagline}"
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href={`/directory/${business.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all border border-zinc-750"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Public Page
                            </a>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-3.5 py-2 rounded-lg text-xs font-bold transition-all"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Listing
                            </button>
                        </div>
                    </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center shrink-0">
                            <Eye className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{metrics.views}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Total Views</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#10b981]/10 text-[#10b981] flex items-center justify-center shrink-0">
                            <MousePointer className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{metrics.clicks}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Link Clicks</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                            <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{metrics.contacts}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Leads Received</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                            <Star className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{metrics.reviews}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">User Reviews</div>
                        </div>
                    </div>
                </div>

                {/* Main Workspace Canvas Split */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* General / Details Card */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Details Card */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden">
                            <div className="flex justify-between items-center px-5 py-4 border-b border-[#262930]/40">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">General Information</h3>
                                {editingSection !== 'general' ? (
                                    <button
                                        onClick={() => setEditingSection('general')}
                                        className="text-[#4318FF] hover:text-indigo-400 text-xs font-bold flex items-center gap-1.5"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                        Instant Edit
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleSave('general')}
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
                                {editingSection !== 'general' ? (
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-[10px] text-[#8f9bba] font-bold uppercase">Name</div>
                                            <div className="text-sm font-semibold text-white mt-0.5">{business.name}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-[#8f9bba] font-bold uppercase">Tagline</div>
                                            <div className="text-sm text-white mt-0.5">{business.tagline || 'N/A'}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-[#8f9bba] font-bold uppercase">Description</div>
                                            <div className="text-xs text-[#8f9bba] leading-relaxed mt-0.5 whitespace-pre-wrap">
                                                {business.description || 'No description provided.'}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-[10px] text-[#8f9bba] font-bold uppercase">Category</div>
                                                <div className="text-xs text-white mt-0.5">{business.category?.en || 'N/A'}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-[#8f9bba] font-bold uppercase">Founded Year</div>
                                                <div className="text-xs text-white mt-0.5">{business.founded_year || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="name" className="text-xs text-[#8f9bba] font-bold uppercase">Business Name</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="bg-[#15171e] border-[#262930] text-xs"
                                            />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="tagline" className="text-xs text-[#8f9bba] font-bold uppercase">Tagline</Label>
                                            <Input
                                                id="tagline"
                                                value={data.tagline}
                                                onChange={(e) => setData('tagline', e.target.value)}
                                                className="bg-[#15171e] border-[#262930] text-xs"
                                            />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="description" className="text-xs text-[#8f9bba] font-bold uppercase">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                className="bg-[#15171e] border-[#262930] text-xs min-h-24"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-1.5">
                                                <Label htmlFor="category_id" className="text-xs text-[#8f9bba] font-bold uppercase">Category</Label>
                                                <select
                                                    id="category_id"
                                                    value={data.category_id}
                                                    onChange={(e) => setData('category_id', Number(e.target.value))}
                                                    className="w-full bg-[#15171e] border border-[#262930] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-[#4318FF] transition-colors appearance-none cursor-pointer"
                                                >
                                                    {categories.map((cat) => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.en}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="grid gap-1.5">
                                                <Label htmlFor="founded_year" className="text-xs text-[#8f9bba] font-bold uppercase">Founded Year</Label>
                                                <Input
                                                    id="founded_year"
                                                    type="number"
                                                    value={data.founded_year}
                                                    onChange={(e) => setData('founded_year', e.target.value)}
                                                    className="bg-[#15171e] border-[#262930] text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Location Details Card */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden">
                            <div className="flex justify-between items-center px-5 py-4 border-b border-[#262930]/40">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">Location & Address</h3>
                                {editingSection !== 'location' ? (
                                    <button
                                        onClick={() => setEditingSection('location')}
                                        className="text-[#4318FF] hover:text-indigo-400 text-xs font-bold flex items-center gap-1.5"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                        Instant Edit
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleSave('location')}
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

                            <div className="p-5">
                                {editingSection !== 'location' ? (
                                    <div className="space-y-4 text-xs">
                                        <div className="flex items-center gap-2.5">
                                            <MapPin className="h-4 w-4 text-[#4318FF]" />
                                            <div>
                                                <div className="text-[10px] text-[#8f9bba] font-bold uppercase">Address</div>
                                                <div className="text-white mt-0.5">
                                                    {business.address ? `${business.address}, ${business.city || ''}, ${business.country || ''}` : 'No address registered'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="address" className="text-xs text-[#8f9bba] font-bold uppercase">Address</Label>
                                            <Input
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                className="bg-[#15171e] border-[#262930] text-xs"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-1.5">
                                                <Label htmlFor="city" className="text-xs text-[#8f9bba] font-bold uppercase">City</Label>
                                                <Input
                                                    id="city"
                                                    value={data.city}
                                                    onChange={(e) => setData('city', e.target.value)}
                                                    className="bg-[#15171e] border-[#262930] text-xs"
                                                />
                                            </div>
                                            <div className="grid gap-1.5">
                                                <Label htmlFor="country" className="text-xs text-[#8f9bba] font-bold uppercase">Country (2-Letter Code)</Label>
                                                <Input
                                                    id="country"
                                                    value={data.country}
                                                    onChange={(e) => setData('country', e.target.value)}
                                                    className="bg-[#15171e] border-[#262930] text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right column: Contact & Reviews Feed */}
                    <div className="space-y-6">
                        {/* Contact Details Card */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden">
                            <div className="flex justify-between items-center px-5 py-4 border-b border-[#262930]/40">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">Contact Info</h3>
                                {editingSection !== 'contact' ? (
                                    <button
                                        onClick={() => setEditingSection('contact')}
                                        className="text-[#4318FF] hover:text-indigo-400 text-xs font-bold flex items-center gap-1.5"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                        Instant Edit
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleSave('contact')}
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

                            <div className="p-5">
                                {editingSection !== 'contact' ? (
                                    <div className="space-y-4 text-xs">
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-[#4318FF]" />
                                            <div>
                                                <div className="text-[10px] text-[#8f9bba] font-bold uppercase">Phone Number</div>
                                                <div className="text-white mt-0.5">{business.phone || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-[#4318FF]" />
                                            <div>
                                                <div className="text-[10px] text-[#8f9bba] font-bold uppercase">Email Address</div>
                                                <div className="text-white mt-0.5">{business.email || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-4 w-4 text-[#4318FF]" />
                                            <div>
                                                <div className="text-[10px] text-[#8f9bba] font-bold uppercase">Website</div>
                                                <div className="text-white mt-0.5">{business.website || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="phone" className="text-xs text-[#8f9bba] font-bold uppercase">Phone</Label>
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="bg-[#15171e] border-[#262930] text-xs"
                                            />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="email" className="text-xs text-[#8f9bba] font-bold uppercase">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="bg-[#15171e] border-[#262930] text-xs"
                                            />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="website" className="text-xs text-[#8f9bba] font-bold uppercase">Website URL</Label>
                                            <Input
                                                id="website"
                                                value={data.website}
                                                onChange={(e) => setData('website', e.target.value)}
                                                className="bg-[#15171e] border-[#262930] text-xs"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Reviews Feed */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-5 space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">
                                Reviews Feed
                            </h2>
                            <div className="space-y-4">
                                {reviews.data.length === 0 ? (
                                    <div className="py-6 text-center text-xs text-[#8f9bba]">
                                        No reviews received for this business yet.
                                    </div>
                                ) : (
                                    <div className="space-y-4 divide-y divide-[#262930]/50">
                                        {reviews.data.map((review) => (
                                            <div key={review.id} className="space-y-1.5 pt-4 first:pt-0 text-xs">
                                                <div className="flex items-center justify-between text-[11px] text-[#8f9bba]">
                                                    <span className="font-semibold text-zinc-300">
                                                        {review.user?.name || 'Anonymous'}
                                                    </span>
                                                    <span>
                                                        {new Date(review.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex text-amber-400">
                                                    {Array.from({ length: 5 }).map((_, idx) => (
                                                        <Star
                                                            key={idx}
                                                            className={`h-3 w-3 ${
                                                                idx < review.rating ? 'fill-current' : 'text-zinc-700'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                {review.body && (
                                                    <p className="text-[#8f9bba] leading-relaxed">
                                                        {review.body}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Layout wrapper
ShowBusiness.layout = (page: React.ReactNode) => {
    // Attempt to access business title dynamically from page props
    const businessName = (page as any).props?.business?.name || 'Business Details';

    return (
        <OwnerLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('owner.dashboard') },
                { title: 'My Listings', href: route('owner.listings.index') },
                { title: businessName, href: '#' }
            ]}
        >
            {page}
        </OwnerLayout>
    );
};
