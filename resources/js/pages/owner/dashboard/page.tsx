import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Building2,
    Eye,
    MousePointer,
    MessageSquare,
    Star,
    Plus,
    CheckCircle,
    Sliders,
    Calendar,
    Sparkles,
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
                return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Active</Badge>;
            case 'pending':
                return <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30">Pending</Badge>;
            case 'rejected':
                return <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/30">Rejected</Badge>;
            case 'draft':
            default:
                return <Badge className="bg-zinc-800 text-zinc-400 border border-zinc-700">Draft</Badge>;
        }
    };

    return (
        <>
            <Head title="Owner Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 overflow-x-auto text-zinc-100 bg-[#0A0A0A] min-h-screen">
                {/* Header Title with quick business create button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#1F1F1F] pb-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">
                            Owner Dashboard
                        </h1>
                        <p className="text-xs text-zinc-400 mt-1">
                            Manage your listed companies, check user performance clicks, and review customer responses.
                        </p>
                    </div>
                    <Link
                        href="/settings/profile" // Or the add business endpoint
                        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shrink-0 self-start sm:self-auto"
                    >
                        <Plus className="h-4 w-4" />
                        Add New Business
                    </Link>
                </div>

                {/* Metrics Widgets */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">{metrics.businesses}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">My Listings</div>
                        </div>
                    </Card>

                    <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                            <Eye className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">{metrics.views}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Profile Views</div>
                        </div>
                    </Card>

                    <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                            <MousePointer className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">{metrics.clicks}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Link Clicks</div>
                        </div>
                    </Card>

                    <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                            <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">{metrics.contacts}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Leads Received</div>
                        </div>
                    </Card>
                </div>

                {/* Businesses Listings Grid */}
                <div className="space-y-4">
                    <h2 className="text-base font-bold text-white">My Businesses</h2>
                    {businesses.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#1F1F1F] bg-[#111111]/30 p-12 text-center">
                            <Building2 className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
                            <h3 className="font-semibold text-zinc-400 text-sm">No businesses listed</h3>
                            <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                                Register your first business to start tracking clicks, analytics, and reviews.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {businesses.map((business) => (
                                <Card
                                    key={business.id}
                                    className="border-[#1F1F1F] bg-[#111111]/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="p-5 space-y-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="font-bold text-white text-base line-clamp-1">{business.name}</h3>
                                                {business.tagline && (
                                                    <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{business.tagline}</p>
                                                )}
                                            </div>
                                            {getStatusBadge(business.status)}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                                            {business.category && (
                                                <Badge variant="outline" className="border-[#1F1F1F] bg-zinc-900 text-zinc-400 font-normal">
                                                    {business.category.en}
                                                </Badge>
                                            )}
                                            {business.plan && (
                                                <Badge variant="secondary" className="bg-indigo-950/30 border border-indigo-700/20 text-indigo-400 font-normal">
                                                    {business.plan.en}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 pt-2 text-xs text-zinc-500 border-t border-[#1F1F1F]/40">
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <Star className="h-3.5 w-3.5 fill-current" />
                                                <span className="text-zinc-300 font-semibold">
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
                                    <div className="px-5 pb-5 pt-3 border-t border-[#1F1F1F]/40 flex items-center justify-between text-xs">
                                        <Link
                                            href={`/directory/${business.slug}`}
                                            className="text-zinc-400 hover:text-white transition-colors"
                                        >
                                            View Public Page
                                        </Link>
                                        <Link
                                            href="/settings/profile" // Placeholder edit business page
                                            className="text-indigo-400 hover:text-indigo-300 font-semibold"
                                        >
                                            Edit Details
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contacts & Reviews Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Message Leads */}
                    <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                        <CardHeader className="border-b border-[#1F1F1F] pb-4">
                            <CardTitle className="text-white text-base">Recent Leads & Messages</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            {recentContacts.length === 0 ? (
                                <div className="py-6 text-center text-zinc-500 text-xs">
                                    No contact requests received yet.
                                </div>
                            ) : (
                                <div className="divide-y divide-[#1F1F1F] space-y-4">
                                    {recentContacts.map((contact) => (
                                        <div key={contact.id} className="pt-4 first:pt-0 space-y-1.5">
                                            <div className="flex items-center justify-between text-[11px] text-zinc-500">
                                                <span className="text-zinc-300 font-semibold">{contact.name} ({contact.email})</span>
                                                <span>{new Date(contact.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-zinc-400 text-xs line-clamp-2">
                                                {contact.message}
                                            </p>
                                            <div className="text-[10px] text-indigo-400 font-medium">
                                                Sent to: {contact.business?.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent reviews */}
                    <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                        <CardHeader className="border-b border-[#1F1F1F] pb-4">
                            <CardTitle className="text-white text-base">Recent Reviews</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            {recentReviews.length === 0 ? (
                                <div className="py-6 text-center text-zinc-500 text-xs">
                                    No reviews left by customers yet.
                                </div>
                            ) : (
                                <div className="divide-y divide-[#1F1F1F] space-y-4">
                                    {recentReviews.map((review) => (
                                        <div key={review.id} className="pt-4 first:pt-0 space-y-1.5">
                                            <div className="flex items-center justify-between text-[11px] text-zinc-500">
                                                <span className="text-zinc-300 font-semibold">{review.user?.name || 'Anonymous'}</span>
                                                <span>{new Date(review.created_at).toLocaleDateString()}</span>
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
                                            <p className="text-zinc-400 text-xs line-clamp-2">
                                                {review.body}
                                            </p>
                                            <div className="text-[10px] text-indigo-400 font-medium">
                                                On Business: {review.business?.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

// Wrap in sidebar layout template
OwnerDashboard.layout = (page: React.ReactNode) => page;
