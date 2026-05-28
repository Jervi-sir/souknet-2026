import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import {
    Search,
    Trash2,
    Star,
    MessageSquare,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Business {
    id: number;
    name: string;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    user?: User;
    business?: Business;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedReviews {
    data: Review[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
}

interface ReviewModerationProps {
    reviews: PaginatedReviews;
    filters: {
        search: string;
        rating: string;
        sort: string;
    };
}

export default function ReviewModeration({
    reviews,
    filters,
}: ReviewModerationProps) {
    const [searchVal, setSearchVal] = useState(filters.search);
    const [ratingVal, setRatingVal] = useState(filters.rating);
    const [sortVal, setSortVal] = useState(filters.sort);

    const applyFilters = (newFilters: {
        search?: string;
        rating?: string;
        sort?: string;
    }) => {
        router.get(
            '/admin/reviews',
            {
                search:
                    newFilters.search !== undefined
                        ? newFilters.search
                        : searchVal,
                rating:
                    newFilters.rating !== undefined
                        ? newFilters.rating
                        : ratingVal,
                sort: newFilters.sort !== undefined ? newFilters.sort : sortVal,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search: searchVal });
    };

    const handleDelete = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this review? This action cannot be undone.',
            )
        ) {
            router.delete(`/admin/reviews/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Review deleted successfully from platform.');
                },
                onError: () => {
                    toast.error('Failed to delete review.');
                },
            });
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-[#262930]'}`}
                    />
                ))}
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <Head title="Review Moderation" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                {/* Header */}
                <div className="border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#4318FF] tracking-wider uppercase">System Administration</span>
                    </div>
                    <h1 className="text-xl font-extrabold text-white">
                        Review Moderation
                    </h1>
                    <p className="text-xs text-[#8f9bba] mt-0.5">
                        Monitor, filter, and delete inappropriate or spam user reviews.
                    </p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#262930] bg-[#0c0d12] p-4 md:flex-row md:items-center">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="relative max-w-md flex-1"
                    >
                        <div className="text-[#8f9bba] pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4" />
                        </div>
                        <input
                            type="text"
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            className="border-[#262930] w-full rounded-lg border bg-[#111111] py-2 pr-3 pl-10 text-xs text-white focus:border-[#4318FF] focus:ring-0 focus:outline-none"
                            placeholder="Search comments, reviewer, or business..."
                        />
                    </form>

                    <div className="flex flex-wrap items-center gap-4">
                        {/* Rating filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">
                                Rating:
                            </span>
                            <select
                                value={ratingVal}
                                onChange={(e) => {
                                    setRatingVal(e.target.value);
                                    applyFilters({ rating: e.target.value });
                                }}
                                className="border-[#262930] rounded-lg border bg-[#111111] px-3 py-1.5 text-xs text-white focus:border-[#4318FF] focus:ring-0 focus:outline-none"
                            >
                                <option value="all">All Ratings</option>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">
                                Sort:
                            </span>
                            <select
                                value={sortVal}
                                onChange={(e) => {
                                    setSortVal(e.target.value);
                                    applyFilters({ sort: e.target.value });
                                }}
                                className="border-[#262930] rounded-lg border bg-[#111111] px-3 py-1.5 text-xs text-white focus:border-[#4318FF] focus:ring-0 focus:outline-none"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="rating_desc">
                                    Highest Rating
                                </option>
                                <option value="rating_asc">
                                    Lowest Rating
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="overflow-hidden rounded-xl border border-[#262930] bg-[#0c0d12]">
                    {reviews.data.length === 0 ? (
                        <div className="space-y-2 py-16 text-center">
                            <MessageSquare className="text-zinc-650 mx-auto h-8 w-8" />
                            <p className="text-zinc-500 text-sm font-medium">
                                No reviews found matching filters.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#262930]/40">
                            {reviews.data.map((review) => (
                                <div
                                    key={review.id}
                                    className="flex flex-col justify-between gap-4 p-6 transition-colors hover:bg-[#15171e]/40 md:flex-row md:items-start"
                                >
                                    <div className="max-w-3xl space-y-2.5">
                                        <div className="flex items-center gap-3">
                                            {renderStars(review.rating)}
                                            <span className="text-xs text-zinc-650">
                                                •
                                            </span>
                                            <span className="text-xs font-semibold text-[#8f9bba]">
                                                Reviewing:{' '}
                                                <span className="cursor-pointer text-white hover:underline">
                                                    {review.business?.name ||
                                                        'Unknown Business'}
                                                </span>
                                            </span>
                                        </div>

                                        <p className="text-sm leading-relaxed font-medium text-zinc-200">
                                            "{review.comment}"
                                        </p>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#8f9bba]/80 font-medium">
                                            <span>
                                                By{' '}
                                                <strong className="font-bold text-zinc-300">
                                                    {review.user?.name ||
                                                        'Anonymous'}
                                                </strong>{' '}
                                                ({review.user?.email || 'N/A'})
                                            </span>
                                            <span>•</span>
                                            <span>
                                                Submitted on{' '}
                                                {formatDate(review.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 items-center self-end md:self-start">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(review.id)
                                            }
                                            className="text-rose-400 hover:text-rose-300 inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-bold transition-colors hover:bg-rose-500/20 cursor-pointer"
                                            title="Delete review"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete Review
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {reviews.total > 15 && (
                    <div className="flex items-center justify-between border-t border-[#262930] pt-4">
                        <div className="text-xs text-[#8f9bba]">
                            Showing{' '}
                            <span className="text-white font-semibold">
                                {reviews.data.length}
                            </span>{' '}
                            of{' '}
                            <span className="text-white font-semibold">
                                {reviews.total}
                            </span>{' '}
                            reviews
                        </div>
                        <div className="inline-flex gap-1.5">
                            {reviews.links.map((link, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                        if (link.url) router.get(link.url);
                                    }}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                                        link.active
                                            ? 'border-[#4318FF] bg-[#4318FF] text-white'
                                            : 'text-[#8f9bba] border-[#262930] bg-[#0c0d12] hover:bg-[#15171e]/40 disabled:pointer-events-none disabled:opacity-30'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

ReviewModeration.layout = (page: React.ReactNode) => (
    <AdminLayout
        breadcrumbs={[{ title: 'Review Moderation', href: '/admin/reviews' }]}
    >
        {page}
    </AdminLayout>
);
