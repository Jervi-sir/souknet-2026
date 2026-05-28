import React from 'react';
import { Head, Link } from '@inertiajs/react';
import OwnerLayout from '@/layouts/owner-layout';
import { Badge } from '@/components/ui/badge';
import {
    Building2,
    Eye,
    MousePointer,
    MessageSquare,
    Star,
    Plus,
    CheckCircle,
    Calendar,
    Sparkles,
    ChevronRight,
    TrendingUp,
    MoreHorizontal
} from 'lucide-react';

interface Business {
    id: number;
    name: string;
    slug: string;
    tagline: string | null;
    status: string;
    is_featured: boolean;
    is_verified: boolean;
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

interface RecentContact {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
    business: {
        id: number;
        name: string;
    } | null;
}

interface RecentReview {
    id: number;
    rating: number;
    body: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
    } | null;
    business: {
        id: number;
        name: string;
    } | null;
}

interface OwnerDashboardProps {
    businesses: Business[];
    metrics: {
        businesses: number;
        views: number;
        clicks: number;
        reviews: number;
        contacts: number;
    };
    recentContacts: RecentContact[];
    recentReviews: RecentReview[];
}

export default function OwnerDashboard({
    businesses,
    metrics,
    recentContacts,
    recentReviews,
}: OwnerDashboardProps) {
    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
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
            <Head title="Owner Dashboard" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen p-6 space-y-6">
                
                {/* Header Title */}
                <div className="flex flex-col gap-4 border-b border-[#262930] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#6AD2FF] tracking-wider uppercase">Console Overview</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight">
                            Owner Dashboard
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Manage listed companies, audit profile analytics, and track leads received.
                        </p>
                    </div>
                    <Link
                        href="/settings/profile" // Or the add business endpoint
                        className="inline-flex items-center gap-1.5 bg-[#4318FF] hover:bg-[#3b15e6] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-900/20"
                    >
                        <Plus className="h-4 w-4" />
                        Add New Business
                    </Link>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center shrink-0">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{metrics.businesses}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">My Listings</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#10b981]/10 text-[#10b981] flex items-center justify-center shrink-0">
                            <Eye className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{metrics.views}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Profile Views</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                            <MousePointer className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{metrics.clicks}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Link Clicks</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                            <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{metrics.contacts}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Leads Received</div>
                        </div>
                    </div>
                </div>

                {/* Businesses Listings Grid */}
                <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">My Businesses</h2>
                    {businesses.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#262930] bg-[#0c0d12]/50 p-12 text-center">
                            <Building2 className="mx-auto mb-3 h-10 w-10 text-zinc-600" />
                            <h3 className="text-sm font-semibold text-zinc-400">No businesses listed</h3>
                            <p className="mx-auto mt-1 max-w-xs text-xs text-[#8f9bba]">
                                Register your first business to start tracking clicks, analytics, and reviews.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {businesses.map((business) => (
                                <div
                                    key={business.id}
                                    className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] rounded-xl flex flex-col justify-between transition-all group"
                                >
                                    <div className="space-y-4 p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="line-clamp-1 text-sm font-bold text-white group-hover:text-[#4318FF] transition-colors">
                                                    {business.name}
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
                                                <span className="bg-[#15171e] border border-[#262930] text-zinc-350 px-2 py-0.5 rounded">
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
                                    <div className="flex items-center justify-between border-t border-[#262930]/40 px-5 py-3 text-xs bg-[#15171e]/20">
                                        <Link
                                            href={`/directory/${business.slug}`}
                                            className="text-[#8f9bba] transition-colors hover:text-white font-medium"
                                        >
                                            View Public Page
                                        </Link>
                                        <Link
                                            href="/settings/profile" // Placeholder edit business page
                                            className="font-bold text-[#4318FF] hover:underline"
                                        >
                                            Edit Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contacts & Reviews Split Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Recent Message Leads */}
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-5 space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">
                            Recent Leads & Messages
                        </h2>
                        <div className="space-y-4">
                            {recentContacts.length === 0 ? (
                                <div className="py-6 text-center text-xs text-[#8f9bba]">
                                    No contact requests received yet.
                                </div>
                            ) : (
                                <div className="space-y-4 divide-y divide-[#262930]/50">
                                    {recentContacts.map((contact) => (
                                        <div
                                            key={contact.id}
                                            className="space-y-1.5 pt-4 first:pt-0 text-xs"
                                        >
                                            <div className="flex items-center justify-between text-[11px] text-[#8f9bba]">
                                                <span className="font-semibold text-zinc-300">
                                                    {contact.name} ({contact.email})
                                                </span>
                                                <span>
                                                    {new Date(contact.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="line-clamp-2 text-[#8f9bba] leading-relaxed">
                                                {contact.message}
                                            </p>
                                            <div className="text-[10px] font-bold text-[#4318FF]">
                                                Sent to: {contact.business?.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent reviews */}
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-5 space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">
                            Recent Reviews
                        </h2>
                        <div className="space-y-4">
                            {recentReviews.length === 0 ? (
                                <div className="py-6 text-center text-xs text-[#8f9bba]">
                                    No reviews left by customers yet.
                                </div>
                            ) : (
                                <div className="space-y-4 divide-y divide-[#262930]/50">
                                    {recentReviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="space-y-1.5 pt-4 first:pt-0 text-xs"
                                        >
                                            <div className="flex items-center justify-between text-[11px] text-[#8f9bba]">
                                                <span className="font-semibold text-zinc-300">
                                                    {review.user?.name || 'Anonymous'}
                                                </span>
                                                <span>
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {/* Stars */}
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
                                            <p className="line-clamp-2 text-[#8f9bba] leading-relaxed">
                                                {review.body}
                                            </p>
                                            <div className="text-[10px] font-bold text-[#4318FF]">
                                                On Business: {review.business?.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

OwnerDashboard.layout = (page: React.ReactNode) => (
    <OwnerLayout
        breadcrumbs={[{ title: 'Dashboard', href: '/owner/dashboard' }]}
    >
        {page}
    </OwnerLayout>
);
