import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Star,
    Search,
    Reply,
    Calendar,
    Building2,
    MessageSquare,
} from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import { Textarea } from '@/components/ui/textarea';
import OwnerLayout from '@/layouts/owner-layout';

interface ReviewReplyType {
    id: number;
    body: string;
    created_at: string;
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
    business: {
        id: number;
        name: string;
    } | null;
    reply: ReviewReplyType | null;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedReviews {
    data: Review[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface ReviewsManagementProps {
    reviews: PaginatedReviews;
    filters: {
        rating: string;
        search: string;
    };
}

export default function ReviewsManagement({
    reviews,
    filters,
}: ReviewsManagementProps) {
    const [search, setSearch] = useState(filters.search);
    const [rating, setRating] = useState(filters.rating);
    const [replyingToId, setReplyingToId] = useState<number | null>(null);

    const { data, setData, post, processing, reset } = useForm({
        body: '',
    });

    const applyFilters = (updatedParams?: Record<string, any>) => {
        const params = {
            search,
            rating,
            ...updatedParams,
        };

        // Remove empty values
        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        router.get('/owner/reviews', params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const handleRatingChange = (newRating: string) => {
        setRating(newRating);
        applyFilters({ rating: newRating });
    };

    const handleReplySubmit = (e: React.FormEvent, reviewId: number) => {
        e.preventDefault();
        post(`/owner/reviews/${reviewId}/reply`, {
            preserveScroll: true,
            onSuccess: () => {
                setReplyingToId(null);
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Reviews Management" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                {/* Header */}
                <div className="border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#4318FF] tracking-wider uppercase">System Feedback</span>
                    </div>
                    <h1 className="text-xl font-extrabold text-white">
                        Reviews & Feedback
                    </h1>
                    <p className="text-xs text-[#8f9bba] mt-0.5">
                        Monitor ratings left by customers on your business profile pages. Submit official responses to maintain client relationships.
                    </p>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#262930] bg-[#0c0d12] p-4 md:flex-row md:items-center">
                    {/* Rating Category tabs */}
                    <div className="flex items-center gap-1 bg-[#111111] p-1 rounded-lg border border-[#262930] self-start">
                        {[
                            { code: 'all', label: 'All' },
                            { code: 'good', label: 'Good (4-5★)' },
                            { code: 'average', label: 'Average (3★)' },
                            { code: 'critical', label: 'Critical (1-2★)' },
                        ].map((tab) => (
                            <button
                                key={tab.code}
                                onClick={() => handleRatingChange(tab.code)}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                                    rating === tab.code
                                        ? 'bg-[#4318FF] text-white shadow-sm'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search box */}
                    <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:max-w-xs">
                        <div className="relative flex-1">
                            <Search className="absolute top-2.5 left-3 h-4 w-4 text-[#8f9bba]" />
                            <Input
                                type="text"
                                placeholder="Search comments..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF] text-xs sm:text-sm"
                            />
                        </div>
                        <Button type="submit" size="sm" className="bg-[#4318FF] hover:bg-[#3b15e6] text-white text-xs px-4">
                            Search
                        </Button>
                    </form>
                </div>

                {/* Reviews Content list */}
                {reviews.data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#262930] bg-[#0c0d12] p-16 text-center">
                        <Star className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
                        <h3 className="font-semibold text-zinc-400 text-sm">No reviews found</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                            No customer comments match your current filter selections.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            {reviews.data.map((review) => (
                                <Card key={review.id} className="border-[#262930] bg-[#0c0d12] hover:border-zinc-700 transition-all duration-300">
                                    <CardContent className="p-6 space-y-4">
                                        {/* Metadata Row */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#262930]/40 pb-3">
                                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                                                <span className="font-bold text-white">{review.user?.name || 'Anonymous User'}</span>
                                                <span className="text-[#8f9bba]"> • </span>
                                                <div className="flex text-amber-400">
                                                    {Array.from({ length: 5 }).map((_, idx) => (
                                                        <Star
                                                            key={idx}
                                                            className={`h-3.5 w-3.5 ${
                                                                idx < review.rating ? 'fill-current' : 'text-[#262930]'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[#8f9bba] text-[10px] sm:text-xs">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{new Date(review.created_at).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {/* Review text */}
                                        <p className="text-[#8f9bba] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                                            {review.body || <em className="text-zinc-500">No review comments provided.</em>}
                                        </p>

                                        {/* Business name tracker */}
                                        <div className="text-xs text-[#8f9bba] flex items-center gap-1.5">
                                            <Building2 className="h-3.5 w-3.5 text-[#8f9bba]" />
                                            <span>On Business: <strong className="text-white">{review.business?.name}</strong></span>
                                        </div>

                                        {/* Reply section */}
                                        {review.reply ? (
                                            <div className="mt-4 p-4 rounded-xl border border-[#4318FF]/20 bg-[#4318FF]/5 space-y-2">
                                                <div className="flex items-center justify-between text-[11px] text-[#6AD2FF] font-semibold uppercase tracking-wider">
                                                    <span className="flex items-center gap-1.5">
                                                        <Reply className="h-3.5 w-3.5" />
                                                        Official Response
                                                    </span>
                                                    <span className="text-zinc-500 lowercase normal-case font-normal">
                                                        {new Date(review.reply.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-[#8f9bba] text-xs sm:text-sm leading-relaxed">
                                                    {review.reply.body}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setReplyingToId(review.id);
                                                        setData('body', review.reply!.body);
                                                    }}
                                                    className="text-xs text-[#6AD2FF] hover:text-[#4318FF] underline pt-1 block cursor-pointer"
                                                >
                                                    Edit Response
                                                </button>
                                            </div>
                                        ) : replyingToId !== review.id ? (
                                            <div className="pt-2">
                                                <Button
                                                    onClick={() => {
                                                        setReplyingToId(review.id);
                                                        reset();
                                                    }}
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 border-[#262930] bg-[#15171e] text-zinc-300 text-xs gap-1.5"
                                                >
                                                    <Reply className="h-3.5 w-3.5" />
                                                    Submit Response
                                                </Button>
                                            </div>
                                        ) : null}

                                        {/* Interactive reply form */}
                                        {replyingToId === review.id && (
                                            <form onSubmit={(e) => handleReplySubmit(e, review.id)} className="mt-4 space-y-3 p-4 border border-[#262930] bg-[#161616]/50 rounded-xl">
                                                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                                                    <Reply className="h-3.5 w-3.5 text-[#4318FF]" />
                                                    Drafting Official Response
                                                </div>
                                                <Textarea
                                                    required
                                                    value={data.body}
                                                    onChange={(e) => setData('body', e.target.value)}
                                                    className="bg-[#111111] border-[#262930] text-white text-xs sm:text-sm focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF] min-h-[80px]"
                                                    placeholder="Write your response message to the client here..."
                                                />
                                                <div className="flex gap-2 justify-end">
                                                    <Button
                                                        type="button"
                                                        onClick={() => setReplyingToId(null)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 text-xs text-[#8f9bba]"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        disabled={processing}
                                                        size="sm"
                                                        className="h-8 text-xs bg-[#4318FF] hover:bg-[#3b15e6] text-white"
                                                    >
                                                        Post Response
                                                    </Button>
                                                </div>
                                            </form>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {reviews.last_page > 1 && (
                            <Pagination className="mt-8">
                                <PaginationContent>
                                    {reviews.links.map((link, idx) => {
                                        const label = link.label
                                            .replace(/&laquo;/g, '«')
                                            .replace(/&raquo;/g, '»')
                                            .replace(/Previous/g, '')
                                            .replace(/Next/g, '');

                                        const isPrev = link.label.includes('Previous');
                                        const isNext = link.label.includes('Next');

                                        if (!link.url) {
                                            return (
                                                <PaginationItem key={idx} className="opacity-40 pointer-events-none">
                                                    {isPrev ? (
                                                        <PaginationPrevious href="#" />
                                                    ) : isNext ? (
                                                        <PaginationNext href="#" />
                                                    ) : (
                                                        <PaginationEllipsis />
                                                    )}
                                                </PaginationItem>
                                            );
                                        }

                                        return (
                                            <PaginationItem key={idx}>
                                                {isPrev ? (
                                                    <PaginationPrevious
                                                        href={link.url}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(link.url!);
                                                        }}
                                                    />
                                                ) : isNext ? (
                                                    <PaginationNext
                                                        href={link.url}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(link.url!);
                                                        }}
                                                    />
                                                ) : (
                                                    <PaginationLink
                                                        href={link.url}
                                                        isActive={link.active}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(link.url!);
                                                        }}
                                                    >
                                                        {label}
                                                    </PaginationLink>
                                                )}
                                            </PaginationItem>
                                        );
                                    })}
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

// Sidebar Layout Wrapper
ReviewsManagement.layout = (page: React.ReactNode) => (
    <OwnerLayout breadcrumbs={[{ title: 'Reviews', href: '/owner/reviews' }]}>
        {page}
    </OwnerLayout>
);
