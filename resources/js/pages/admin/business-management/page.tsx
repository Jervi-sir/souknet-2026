import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import {
    Search,
    Check,
    X,
    Trash2,
    Calendar,
    User,
    Building2,
    AlertTriangle,
    Eye,
    TrendingUp,
} from 'lucide-react';

interface Category {
    id: number;
    en: string;
}

interface Plan {
    id: number;
    en: string;
    code: string;
}

interface UserType {
    id: number;
    name: string;
    email: string;
}

interface Business {
    id: number;
    name: string;
    slug: string;
    tagline: string | null;
    status: string;
    created_at: string;
    rejection_reason: string | null;
    category: Category | null;
    plan: Plan | null;
    user: UserType | null;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedBusinesses {
    data: Business[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface BusinessManagementProps {
    businesses: PaginatedBusinesses;
    filters: {
        status: string;
        search: string;
        sort: string;
    };
}

export default function BusinessManagement({
    businesses,
    filters,
}: BusinessManagementProps) {
    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);
    const [sort, setSort] = useState(filters.sort);
    
    // Rejection state
    const [rejectingBusiness, setRejectingBusiness] = useState<Business | null>(null);
    const { data: rejectData, setData: setRejectData, post: postReject, processing: rejectProcessing, reset: resetReject } = useForm({
        reason: '',
    });

    // Delete state
    const [deletingBusiness, setDeletingBusiness] = useState<Business | null>(null);

    const applyFilters = (updatedParams?: Record<string, any>) => {
        const params = {
            search,
            status,
            sort,
            ...updatedParams,
        };

        // Clean up empty params
        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        router.get('/admin/businesses', params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ page: 1 });
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        applyFilters({ status: newStatus, page: 1 });
    };

    const handleSortChange = (newSort: string) => {
        setSort(newSort);
        applyFilters({ sort: newSort, page: 1 });
    };

    const handleApprove = (id: number) => {
        router.patch(`/admin/businesses/${id}/approve`, {}, {
            preserveScroll: true,
        });
    };

    const openRejectModal = (business: Business) => {
        setRejectingBusiness(business);
        setRejectData('reason', '');
    };

    const handleRejectSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!rejectingBusiness) return;

        // Custom router request mapping patch request
        router.post(`/admin/businesses/${rejectingBusiness.id}/reject`, {
            _method: 'PATCH',
            reason: rejectData.reason,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setRejectingBusiness(null);
                resetReject();
            },
        });
    };

    const openDeleteModal = (business: Business) => {
        setDeletingBusiness(business);
    };

    const handleDeleteSubmit = () => {
        if (!deletingBusiness) return;

        router.delete(`/admin/businesses/${deletingBusiness.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingBusiness(null);
            },
        });
    };

    const getStatusBadge = (bStatus: string) => {
        switch (bStatus.toLowerCase()) {
            case 'published':
                return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Published</Badge>;
            case 'pending':
                return <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30">Pending Review</Badge>;
            case 'rejected':
                return <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/30">Rejected</Badge>;
            case 'draft':
            default:
                return <Badge className="bg-zinc-800 text-zinc-400 border border-zinc-700">Draft</Badge>;
        }
    };

    return (
        <>
            <Head title="Admin Business Management" />

            <div className="space-y-6 text-zinc-100 bg-[#0A0A0A] p-1 rounded-xl">
                {/* Header */}
                <div className="border-b border-[#1F1F1F] pb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">
                            Business Listings Management
                        </h1>
                        <p className="text-xs text-zinc-400 mt-1">
                            Review, approve, decline, or delete user-registered directories and company submissions.
                        </p>
                    </div>
                </div>

                {/* Search & Filters Toolbar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    {/* Status Tabs */}
                    <div className="flex items-center gap-1 bg-[#111111] p-1 rounded-lg border border-[#1F1F1F] overflow-x-auto max-w-full">
                        {[
                            { code: 'all', label: 'All' },
                            { code: 'pending', label: 'Pending' },
                            { code: 'published', label: 'Published' },
                            { code: 'rejected', label: 'Rejected' },
                            { code: 'draft', label: 'Draft' },
                        ].map((tab) => (
                            <button
                                key={tab.code}
                                onClick={() => handleStatusChange(tab.code)}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                                    status === tab.code
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search & Sort combo */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
                        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:max-w-xs">
                            <div className="relative flex-1">
                                <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-500" />
                                <Input
                                    type="text"
                                    placeholder="Search name, tagline, owner..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500 text-xs sm:text-sm"
                                />
                            </div>
                            <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white">
                                Search
                            </Button>
                        </form>

                        <select
                            value={sort}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="bg-[#111111] border border-[#1F1F1F] text-zinc-300 text-xs rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="name_asc">Name (A-Z)</option>
                            <option value="name_desc">Name (Z-A)</option>
                        </select>
                    </div>
                </div>

                {/* Listings Main Content */}
                {businesses.data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#1F1F1F] bg-[#111111]/30 p-16 text-center">
                        <Building2 className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
                        <h3 className="font-semibold text-zinc-400 text-sm">No businesses found</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                            No registered directories match your search keyword or selected tab.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Card className="border-[#1F1F1F] bg-[#111111]/60 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#1F1F1F] bg-[#111111]/80 text-zinc-400 uppercase tracking-wider font-bold">
                                            <th className="p-4">Business Info</th>
                                            <th className="p-4">Owner Contact</th>
                                            <th className="p-4">Category / Plan</th>
                                            <th className="p-4">Submitted Date</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1F1F1F]/40 text-zinc-300">
                                        {businesses.data.map((biz) => {
                                            const isPending = biz.status.toLowerCase() === 'pending';
                                            const isPublished = biz.status.toLowerCase() === 'published';
                                            const isRejected = biz.status.toLowerCase() === 'rejected';

                                            return (
                                                <tr key={biz.id} className="hover:bg-[#161616]/40 transition-colors">
                                                    {/* Info */}
                                                    <td className="p-4">
                                                        <div>
                                                            <div className="font-bold text-white text-sm flex items-center gap-1.5">
                                                                {biz.name}
                                                                <Link
                                                                    href={`/directory/${biz.slug}`}
                                                                    target="_blank"
                                                                    className="text-zinc-500 hover:text-indigo-400"
                                                                    title="View Listing Page"
                                                                >
                                                                    <Eye className="h-3.5 w-3.5" />
                                                                </Link>
                                                            </div>
                                                            <div className="text-[11px] text-zinc-500 max-w-[200px] truncate mt-0.5">
                                                                {biz.tagline || 'No tagline description'}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Owner */}
                                                    <td className="p-4">
                                                        <div className="space-y-0.5">
                                                            <div className="font-semibold text-zinc-200 flex items-center gap-1">
                                                                <User className="h-3 w-3 text-zinc-500" />
                                                                {biz.user?.name || 'Anonymous Owner'}
                                                            </div>
                                                            <div className="text-[10px] text-zinc-500">
                                                                {biz.user?.email || 'N/A'}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Category / Plan */}
                                                    <td className="p-4">
                                                        <div className="space-y-1">
                                                            <div className="text-zinc-300 font-medium">
                                                                {biz.category?.en || 'Uncategorized'}
                                                            </div>
                                                            <Badge className="bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 text-[9px] uppercase tracking-wider font-semibold py-0">
                                                                {biz.plan?.en || 'Free Plan'}
                                                            </Badge>
                                                        </div>
                                                    </td>

                                                    {/* Date */}
                                                    <td className="p-4 text-zinc-400">
                                                        <div className="flex items-center gap-1 text-[11px]">
                                                            <Calendar className="h-3.5 w-3.5 text-zinc-600" />
                                                            <span>{new Date(biz.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </td>

                                                    {/* Status */}
                                                    <td className="p-4">
                                                        <div>
                                                            {getStatusBadge(biz.status)}
                                                            {isRejected && biz.rejection_reason && (
                                                                <div className="text-[9px] text-rose-500/80 italic mt-1 max-w-[150px] truncate" title={biz.rejection_reason}>
                                                                    Reason: {biz.rejection_reason}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="p-4 text-right">
                                                        <div className="inline-flex gap-1.5">
                                                            {/* Approve */}
                                                            {!isPublished && (
                                                                <Button
                                                                    onClick={() => handleApprove(biz.id)}
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                                                                    title="Approve Listing"
                                                                >
                                                                    <Check className="h-4 w-4" />
                                                                </Button>
                                                            )}

                                                            {/* Reject */}
                                                            {!isRejected && (
                                                                <Button
                                                                    onClick={() => openRejectModal(biz)}
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                                                                    title="Reject Listing"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            )}

                                                            {/* Delete */}
                                                            <Button
                                                                onClick={() => openDeleteModal(biz)}
                                                                size="sm"
                                                                className="h-8 w-8 p-0 bg-zinc-900 border border-[#2E2E2E] hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                                                title="Delete Listing"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* Pagination links wrapper */}
                        {businesses.last_page > 1 && (
                            <Pagination className="mt-8">
                                <PaginationContent>
                                    {businesses.links.map((link, idx) => {
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

                                        // Ensure parameter filters are preserved on pagination visit
                                        const queryParams = new URL(link.url).search;

                                        return (
                                            <PaginationItem key={idx}>
                                                {isPrev ? (
                                                    <PaginationPrevious
                                                        href={`/admin/businesses${queryParams}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(`/admin/businesses${queryParams}`);
                                                        }}
                                                    />
                                                ) : isNext ? (
                                                    <PaginationNext
                                                        href={`/admin/businesses${queryParams}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(`/admin/businesses${queryParams}`);
                                                        }}
                                                    />
                                                ) : (
                                                    <PaginationLink
                                                        href={`/admin/businesses${queryParams}`}
                                                        isActive={link.active}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(`/admin/businesses${queryParams}`);
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

            {/* Rejection Modal Dialog */}
            <Dialog open={rejectingBusiness !== null} onOpenChange={(open) => !open && setRejectingBusiness(null)}>
                <DialogContent className="sm:max-w-md bg-[#0F0F0F] border-[#1F1F1F] text-zinc-100">
                    <DialogHeader>
                        <DialogTitle className="text-white text-base sm:text-lg font-bold flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-rose-450" />
                            Reject Business Listing
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 text-xs mt-1">
                            Specify the reasons why this listing doesn't qualify for directory publication. The user will review it.
                        </DialogDescription>
                    </DialogHeader>

                    {rejectingBusiness && (
                        <form onSubmit={handleRejectSubmit} className="space-y-4 pt-2">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Business Target</label>
                                <div className="p-3 bg-[#161616] rounded-lg border border-[#1F1F1F] text-xs font-semibold text-white">
                                    {rejectingBusiness.name}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="rejection_reason_input" className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Rejection Reason</label>
                                <Textarea
                                    id="rejection_reason_input"
                                    required
                                    value={rejectData.reason}
                                    onChange={(e) => setRejectData('reason', e.target.value)}
                                    placeholder="e.g. Invalid telephone details, low resolution catalog photos..."
                                    className="bg-[#111111] border-[#2E2E2E] text-zinc-100 text-xs sm:text-sm focus-visible:ring-indigo-500 min-h-[100px]"
                                />
                            </div>

                            <DialogFooter className="mt-4 gap-2 sm:gap-0">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setRejectingBusiness(null)}
                                    className="text-xs text-zinc-400"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={rejectProcessing}
                                    className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4"
                                >
                                    Decline Listing
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Deletion Confirmation Modal Dialog */}
            <Dialog open={deletingBusiness !== null} onOpenChange={(open) => !open && setDeletingBusiness(null)}>
                <DialogContent className="sm:max-w-md bg-[#0F0F0F] border-[#1F1F1F] text-zinc-100">
                    <DialogHeader>
                        <DialogTitle className="text-white text-base sm:text-lg font-bold flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-zinc-400" />
                            Delete Business Listing
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 text-xs mt-1">
                            Are you absolutely sure you want to permanently delete this listing? All hours and catalog photos will be deleted.
                        </DialogDescription>
                    </DialogHeader>

                    {deletingBusiness && (
                        <div className="space-y-4 pt-2">
                            <div className="p-3 bg-rose-950/10 border border-rose-900/30 rounded-lg text-xs text-rose-400 font-semibold flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                                Action cannot be undone. Permanent database removal.
                            </div>

                            <DialogFooter className="mt-4 gap-2 sm:gap-0">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setDeletingBusiness(null)}
                                    className="text-xs text-zinc-400"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDeleteSubmit}
                                    className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4"
                                >
                                    Yes, Delete
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

// Admin Layout Wrapper
BusinessManagement.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={[{ title: 'Business Management', href: '/admin/businesses' }]}>
        {page}
    </AdminLayout>
);
