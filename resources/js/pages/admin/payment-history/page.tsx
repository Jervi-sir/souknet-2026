import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
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
    DollarSign,
    TrendingUp,
    Percent,
    Receipt,
    Calendar,
    User,
    Building2,
    CheckCircle2,
    XCircle,
    Download,
} from 'lucide-react';

interface Payment {
    id: string;
    user_name: string;
    user_email: string;
    business_name: string;
    plan_name: string;
    amount_cents: number;
    created_at: string;
    status: string;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedPayments {
    data: Payment[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface PaymentHistoryProps {
    payments: PaginatedPayments;
    stats: {
        total_volume_cents: number;
        success_rate: number;
        avg_value_cents: number;
        transactions_count: number;
    };
    filters: {
        search: string;
        status: string;
        sort: string;
    };
}

export default function PaymentHistory({
    payments,
    stats,
    filters,
}: PaymentHistoryProps) {
    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);
    const [sort, setSort] = useState(filters.sort);

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

        router.get('/admin/payments', params, {
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

    const formatCurrency = (cents: number) => {
        return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    };

    const getStatusBadge = (txStatus: string) => {
        switch (txStatus.toLowerCase()) {
            case 'succeeded':
                return (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="h-3 w-3" />
                        Succeeded
                    </Badge>
                );
            case 'failed':
                return (
                    <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1 w-fit">
                        <XCircle className="h-3 w-3" />
                        Failed
                    </Badge>
                );
            default:
                return (
                    <Badge className="bg-zinc-850 text-zinc-400 border border-zinc-700 flex items-center gap-1 w-fit">
                        {txStatus}
                    </Badge>
                );
        }
    };

    return (
        <>
            <Head title="Admin Payments ledger" />

            <div className="space-y-6 text-zinc-100 bg-[#0A0A0A] p-1 rounded-xl">
                {/* Header */}
                <div className="border-b border-[#1F1F1F] pb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">
                            Financial Operations & Transactions
                        </h1>
                        <p className="text-xs text-zinc-400 mt-1">
                            Review system transaction statements, subscription conversions, and aggregate volume metrics.
                        </p>
                    </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card 1: Total Volume */}
                    <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                            <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-extrabold text-white">
                                {formatCurrency(stats.total_volume_cents)}
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Total volume</div>
                        </div>
                    </Card>

                    {/* Card 2: Average Order Value */}
                    <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-extrabold text-white">
                                {formatCurrency(stats.avg_value_cents)}
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Average transaction</div>
                        </div>
                    </Card>

                    {/* Card 3: Success Rate */}
                    <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                            <Percent className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-extrabold text-white">
                                {stats.success_rate}%
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Succeeded conversion</div>
                        </div>
                    </Card>
                </div>

                {/* Filters Toolbar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-6">
                    {/* Status Toggle Tabs */}
                    <div className="flex items-center gap-1 bg-[#111111] p-1 rounded-lg border border-[#1F1F1F]">
                        {[
                            { code: 'all', label: 'All Transactions' },
                            { code: 'succeeded', label: 'Succeeded' },
                            { code: 'failed', label: 'Failed' },
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

                    {/* Search & Sort options */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
                        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:max-w-xs">
                            <div className="relative flex-1">
                                <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-500" />
                                <Input
                                    type="text"
                                    placeholder="Search ID, customer, business..."
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
                            <option value="amount_desc">Highest Amount</option>
                            <option value="amount_asc">Lowest Amount</option>
                        </select>
                    </div>
                </div>

                {/* Ledger Table */}
                {payments.data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#1F1F1F] bg-[#111111]/30 p-16 text-center">
                        <Receipt className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
                        <h3 className="font-semibold text-zinc-400 text-sm">No transactions logged</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                            No billing invoice entries match your selection filters.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Card className="border-[#1F1F1F] bg-[#111111]/60 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#1F1F1F] bg-[#111111]/80 text-zinc-400 uppercase tracking-wider font-bold">
                                            <th className="p-4">Transaction ID</th>
                                            <th className="p-4">Customer Info</th>
                                            <th className="p-4">Business Listing</th>
                                            <th className="p-4">Billing Plan</th>
                                            <th className="p-4">Timestamp</th>
                                            <th className="p-4">Amount</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-right">Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1F1F1F]/40 text-zinc-300">
                                        {payments.data.map((txn) => (
                                            <tr key={txn.id} className="hover:bg-[#161616]/40 transition-colors">
                                                {/* ID */}
                                                <td className="p-4 font-bold text-white uppercase">{txn.id}</td>

                                                {/* Customer */}
                                                <td className="p-4">
                                                    <div className="space-y-0.5">
                                                        <div className="font-semibold text-zinc-200 flex items-center gap-1">
                                                            <User className="h-3 w-3 text-zinc-500" />
                                                            {txn.user_name}
                                                        </div>
                                                        <div className="text-[10px] text-zinc-500">
                                                            {txn.user_email}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Business */}
                                                <td className="p-4">
                                                    <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                                                        <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                                                        {txn.business_name}
                                                    </div>
                                                </td>

                                                {/* Plan */}
                                                <td className="p-4">
                                                    <span className="font-medium bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded text-[10px]">
                                                        {txn.plan_name}
                                                    </span>
                                                </td>

                                                {/* Date */}
                                                <td className="p-4 text-zinc-400">
                                                    <div className="flex items-center gap-1 text-[11px]">
                                                        <Calendar className="h-3.5 w-3.5 text-zinc-600" />
                                                        <span>{new Date(txn.created_at).toLocaleString()}</span>
                                                    </div>
                                                </td>

                                                {/* Amount */}
                                                <td className="p-4 font-bold text-white">
                                                    {formatCurrency(txn.amount_cents)}
                                                </td>

                                                {/* Status */}
                                                <td className="p-4">
                                                    {getStatusBadge(txn.status)}
                                                </td>

                                                {/* PDF Download */}
                                                <td className="p-4 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 w-7 p-0 text-zinc-500 hover:text-indigo-400"
                                                        title="Download Invoice PDF"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* Pagination links */}
                        {payments.last_page > 1 && (
                            <Pagination className="mt-8">
                                <PaginationContent>
                                    {payments.links.map((link, idx) => {
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

                                        const queryParams = new URL(link.url).search;

                                        return (
                                            <PaginationItem key={idx}>
                                                {isPrev ? (
                                                    <PaginationPrevious
                                                        href={`/admin/payments${queryParams}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(`/admin/payments${queryParams}`);
                                                        }}
                                                    />
                                                ) : isNext ? (
                                                    <PaginationNext
                                                        href={`/admin/payments${queryParams}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(`/admin/payments${queryParams}`);
                                                        }}
                                                    />
                                                ) : (
                                                    <PaginationLink
                                                        href={`/admin/payments${queryParams}`}
                                                        isActive={link.active}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(`/admin/payments${queryParams}`);
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

// Layout wrapper mapping Admin Sidebar
PaymentHistory.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={[{ title: 'Payment History', href: '/admin/payments' }]}>
        {page}
    </AdminLayout>
);
