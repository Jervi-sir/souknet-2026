import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
                    <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit font-bold text-[10px] uppercase">
                        <CheckCircle2 className="h-3 w-3" />
                        Succeeded
                    </Badge>
                );
            case 'failed':
                return (
                    <Badge className="bg-red-500/20 text-red-450 border border-red-500/30 flex items-center gap-1 w-fit font-bold text-[10px] uppercase">
                        <XCircle className="h-3 w-3" />
                        Failed
                    </Badge>
                );
            default:
                return (
                    <Badge className="bg-zinc-800 text-zinc-400 border border-zinc-700 flex items-center gap-1 w-fit font-bold text-[10px] uppercase">
                        {txStatus}
                    </Badge>
                );
        }
    };

    return (
        <>
            <Head title="Admin Payments Ledger" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                {/* Header */}
                <div className="border-b border-[#262930] pb-5 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#4318FF] tracking-wider uppercase">System Administration</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white">
                            Financial Operations & Transactions
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Review system transaction statements, subscription conversions, and aggregate volume metrics.
                        </p>
                    </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card 1: Total Volume */}
                    <div className="border border-[#262930] bg-[#0c0d12] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#4318FF]/10 flex items-center justify-center text-[#4318FF] shrink-0">
                            <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-white">
                                {formatCurrency(stats.total_volume_cents)}
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-[#8f9bba]">Total Volume</div>
                        </div>
                    </div>

                    {/* Card 2: Average Order Value */}
                    <div className="border border-[#262930] bg-[#0c0d12] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-white">
                                {formatCurrency(stats.avg_value_cents)}
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-[#8f9bba]">Average Transaction</div>
                        </div>
                    </div>

                    {/* Card 3: Success Rate */}
                    <div className="border border-[#262930] bg-[#0c0d12] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                            <Percent className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-white">
                                {stats.success_rate}%
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-[#8f9bba]">Succeeded Conversion</div>
                        </div>
                    </div>
                </div>

                {/* Filters Toolbar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-6">
                    {/* Status Toggle Tabs */}
                    <div className="flex items-center gap-1 bg-[#0c0d12] p-1 rounded-lg border border-[#262930]">
                        {[
                            { code: 'all', label: 'All Transactions' },
                            { code: 'succeeded', label: 'Succeeded' },
                            { code: 'failed', label: 'Failed' },
                        ].map((tab) => (
                            <button
                                key={tab.code}
                                onClick={() => handleStatusChange(tab.code)}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                                    status === tab.code
                                        ? 'bg-[#4318FF] text-white shadow-sm'
                                        : 'text-[#8f9bba] hover:text-white'
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
                                <Search className="absolute top-2.5 left-3 h-4 w-4 text-[#8f9bba]" />
                                <Input
                                    type="text"
                                    placeholder="Search ID, customer, business..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 bg-[#111111] border-[#262930] text-zinc-150 focus-visible:ring-0 focus-visible:border-[#4318FF] text-xs h-9"
                                />
                            </div>
                            <Button type="submit" size="sm" className="bg-[#4318FF] hover:bg-[#3b15e6] text-white font-bold text-xs h-9 cursor-pointer">
                                Search
                            </Button>
                        </form>

                        <select
                            value={sort}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="bg-[#111111] border border-[#262930] text-white text-xs rounded-lg p-2 focus:ring-0 focus:border-[#4318FF] w-full sm:w-auto h-9 cursor-pointer focus:outline-none"
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
                    <div className="rounded-xl border border-dashed border-[#262930] bg-[#0c0d12]/30 p-16 text-center">
                        <Receipt className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
                        <h3 className="font-semibold text-zinc-400 text-sm">No transactions logged</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                            No billing invoice entries match your selection filters.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="border border-[#262930] bg-[#0c0d12] rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#262930] bg-[#0c0d12]/80 text-[#8f9bba] uppercase tracking-wider font-bold text-[10px]">
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
                                    <tbody className="divide-y divide-[#262930]/40 text-zinc-300">
                                        {payments.data.map((txn) => (
                                            <tr key={txn.id} className="hover:bg-[#15171e]/40 transition-colors">
                                                {/* ID */}
                                                <td className="p-4 font-bold text-white uppercase">{txn.id}</td>

                                                {/* Customer */}
                                                <td className="p-4">
                                                    <div className="space-y-0.5">
                                                        <div className="font-semibold text-zinc-200 flex items-center gap-1">
                                                            <User className="h-3 w-3 text-zinc-500" />
                                                            {txn.user_name}
                                                        </div>
                                                        <div className="text-[10px] text-[#8f9bba] font-medium">
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
                                                    <span className="font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded text-[10px] uppercase">
                                                        {txn.plan_name}
                                                    </span>
                                                </td>

                                                {/* Date */}
                                                <td className="p-4 text-[#8f9bba]">
                                                    <div className="flex items-center gap-1 text-[11px] font-medium">
                                                        <Calendar className="h-3.5 w-3.5 text-zinc-650" />
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
                                                        className="h-7 w-7 p-0 text-zinc-500 hover:text-[#6AD2FF] cursor-pointer"
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
                        </div>

                        {/* Pagination links */}
                        {payments.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-[#262930] pt-4">
                                <div className="text-xs text-[#8f9bba]">
                                    Showing{' '}
                                    <span className="text-white font-semibold">
                                        {payments.data.length}
                                    </span>{' '}
                                    of{' '}
                                    <span className="text-white font-semibold">
                                        {payments.total}
                                    </span>{' '}
                                    transactions
                                </div>
                                <div className="inline-flex gap-1.5">
                                    {payments.links.map((link, idx) => {
                                        const label = link.label
                                            .replace(/&laquo;/g, '«')
                                            .replace(/&raquo;/g, '»')
                                            .replace(/Previous/g, '')
                                            .replace(/Next/g, '');

                                        if (!link.url) return null;
                                        const queryParams = new URL(link.url).search;

                                        return (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => router.visit(`/admin/payments${queryParams}`)}
                                                className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                                                    link.active
                                                        ? 'border-[#4318FF] bg-[#4318FF] text-white'
                                                        : 'text-[#8f9bba] border-[#262930] bg-[#0c0d12] hover:bg-[#15171e]/40'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: label }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

PaymentHistory.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={[{ title: 'Payment History', href: '/admin/payments' }]}>
        {page}
    </AdminLayout>
);
