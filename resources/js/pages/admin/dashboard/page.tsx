import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import {
    Briefcase,
    Clock,
    Users,
    DollarSign,
    UserPlus,
    ShieldAlert,
    Check,
    X,
    TrendingUp
} from 'lucide-react';
import React from 'react';

interface Category {
    id: number;
    code: string;
    en: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Plan {
    id: number;
    code: string;
    en: string;
}

interface Business {
    id: number;
    name: string;
    status: string;
    created_at: string;
    category?: Category;
    owner?: User;
    user?: User;
}

interface Payment {
    id: number;
    user?: User;
    plan?: Plan;
    amount_cents: number;
    created_at: string;
    status: 'succeeded' | 'failed' | 'refunded' | string;
}

interface AdminDashboardProps {
    stats: {
        total_businesses: number;
        pending_businesses: number;
        total_users: number;
        total_revenue_cents: number;
        new_signups_this_month: number;
        active_subscriptions: number;
    };
    pendingBusinesses: Business[];
    recentPayments: Payment[];
}

export default function Dashboard({
    stats,
    pendingBusinesses,
    recentPayments,
}: AdminDashboardProps) {
    const handleApprove = (id: number) => {
        router.patch(
            `/admin/businesses/${id}/approve`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const handleReject = (id: number) => {
        router.patch(
            `/admin/businesses/${id}/reject`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const formatCurrency = (cents: number) => {
        return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <>
            <Head title="System Administration" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                
                {/* Header */}
                <div className="border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-red-400 tracking-wider uppercase">System Administration</span>
                    </div>
                    <h1 className="text-xl font-extrabold text-white">
                        Admin Dashboard
                    </h1>
                    <p className="text-xs text-[#8f9bba] mt-0.5">
                        Manage global platform metrics, review submissions, and track payment transactions.
                    </p>
                </div>

                {/* STAT CARDS ROW */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center shrink-0">
                            <Briefcase className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{stats.total_businesses.toLocaleString()}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Businesses</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                            <Clock className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{stats.pending_businesses.toLocaleString()}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Pending</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#10b981]/10 text-[#10b981] flex items-center justify-center shrink-0">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{stats.total_users.toLocaleString()}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Users</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                            <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-purple-400">{formatCurrency(stats.total_revenue_cents)}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Revenue (MRR)</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                            <UserPlus className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">+{stats.new_signups_this_month.toLocaleString()}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Signups</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                            <ShieldAlert className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-white">{stats.active_subscriptions.toLocaleString()}</div>
                            <div className="text-[9px] font-bold tracking-wider text-[#8f9bba] uppercase">Active Subs</div>
                        </div>
                    </div>
                </div>

                {/* Tables Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* PENDING APPROVALS */}
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-5 space-y-4 flex flex-col justify-between min-h-[300px]">
                        <div>
                            <div className="flex items-center justify-between border-b border-[#262930] pb-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">
                                        Pending Reviews
                                    </h2>
                                    <span className="bg-[#4318FF]/20 text-[#6AD2FF] text-[10px] px-2 py-0.5 rounded-full font-bold">
                                        {pendingBusinesses.length}
                                    </span>
                                </div>
                            </div>

                            {pendingBusinesses.length === 0 ? (
                                <div className="py-12 text-center text-xs text-[#8f9bba]">
                                    No pending listings to review.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse text-left text-xs select-none">
                                        <thead>
                                            <tr className="border-b border-[#262930] text-[#8f9bba] uppercase font-bold tracking-wider text-[10px]">
                                                <th className="pb-3">Business Name</th>
                                                <th className="pb-3">Owner</th>
                                                <th className="pb-3">Category</th>
                                                <th className="pb-3">Submitted</th>
                                                <th className="pb-3 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#262930]/40 text-zinc-200">
                                            {pendingBusinesses.map((biz) => (
                                                <tr key={biz.id} className="hover:bg-[#15171e]/40 transition-colors">
                                                    <td className="max-w-[140px] truncate py-3 font-semibold text-white">
                                                        {biz.name}
                                                    </td>
                                                    <td className="py-3 text-zinc-400">
                                                        {biz.owner?.name || biz.user?.name || 'N/A'}
                                                    </td>
                                                    <td className="py-3 text-zinc-400">
                                                        {biz.category?.en || 'N/A'}
                                                    </td>
                                                    <td className="py-3 text-zinc-500">
                                                        {formatDate(biz.created_at)}
                                                    </td>
                                                    <td className="py-3 text-right">
                                                        <div className="inline-flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleApprove(biz.id)}
                                                                className="text-[#10b981] rounded border border-[#10b981]/20 bg-[#10b981]/10 p-1 transition-colors hover:bg-[#10b981]/25"
                                                                title="Approve"
                                                            >
                                                                <Check className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleReject(biz.id)}
                                                                className="text-red-400 rounded border border-red-500/20 bg-red-500/10 p-1 transition-colors hover:bg-red-500/25"
                                                                title="Reject"
                                                            >
                                                                <X className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RECENT TRANSACTIONS */}
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-5 space-y-4 flex flex-col justify-between min-h-[300px]">
                        <div>
                            <div className="flex items-center justify-between border-b border-[#262930] pb-3 mb-4">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">
                                    Recent Transactions
                                </h2>
                            </div>

                            {recentPayments.length === 0 ? (
                                <div className="py-12 text-center text-xs text-[#8f9bba]">
                                    No recent transactions recorded.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse text-left text-xs select-none">
                                        <thead>
                                            <tr className="border-b border-[#262930] text-[#8f9bba] uppercase font-bold tracking-wider text-[10px]">
                                                <th className="pb-3">User</th>
                                                <th className="pb-3">Plan</th>
                                                <th className="pb-3">Amount</th>
                                                <th className="pb-3">Date</th>
                                                <th className="pb-3 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#262930]/40 text-zinc-200">
                                            {recentPayments.map((payment) => (
                                                <tr key={payment.id} className="hover:bg-[#15171e]/40 transition-colors">
                                                    <td className="py-3 font-semibold text-white">
                                                        {payment.user?.name || 'N/A'}
                                                    </td>
                                                    <td className="py-3 text-zinc-400">
                                                        <span className="capitalize">
                                                            {payment.plan?.en || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 font-bold text-white">
                                                        {formatCurrency(payment.amount_cents)}
                                                    </td>
                                                    <td className="py-3 text-zinc-500">
                                                        {formatDate(payment.created_at)}
                                                    </td>
                                                    <td className="py-3 text-right">
                                                        <span
                                                            className={`inline-flex items-center rounded border px-2 py-0.5 text-[9px] font-bold capitalize ${
                                                                payment.status === 'succeeded'
                                                                    ? 'text-[#10b981] border-[#10b981]/20 bg-[#10b981]/10'
                                                                    : payment.status === 'failed'
                                                                    ? 'text-red-400 border-red-500/20 bg-red-500/10'
                                                                    : 'text-amber-400 border-amber-500/20 bg-amber-500/10'
                                                            }`}
                                                        >
                                                            {payment.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={[{ title: 'Dashboard', href: '/admin' }]}>
        {page}
    </AdminLayout>
);
