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
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        System Administration
                    </h1>
                    <p className="mt-1 text-sm text-zinc-400">
                        Real-time stats, listing approvals, and transactions.
                    </p>
                </div>

                {/* STAT CARDS ROW (6 cards, 3-col grid x 2 rows) */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Card 1: Total Businesses */}
                    <div className="flex items-center justify-between rounded-lg border border-[#1F1F1F] bg-[#111111] p-5 transition-all hover:border-[#6366F1]/50">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                Total Businesses
                            </span>
                            <h3 className="mt-1 text-2xl font-extrabold text-white">
                                {stats.total_businesses.toLocaleString()}
                            </h3>
                        </div>
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-zinc-400">
                            <Briefcase className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Card 2: Pending Review */}
                    <div className="flex items-center justify-between rounded-lg border border-[#1F1F1F] bg-[#111111] p-5 transition-all hover:border-[#6366F1]/50">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                Pending Review
                            </span>
                            <div className="mt-1 flex items-center gap-2">
                                <h3 className="text-2xl font-extrabold text-white">
                                    {stats.pending_businesses.toLocaleString()}
                                </h3>
                                {stats.pending_businesses > 0 && (
                                    <span className="border-amber-550/20 rounded border bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-500">
                                        Action Required
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-zinc-400">
                            <Clock className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Card 3: Total Users */}
                    <div className="flex items-center justify-between rounded-lg border border-[#1F1F1F] bg-[#111111] p-5 transition-all hover:border-[#6366F1]/50">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                Total Users
                            </span>
                            <h3 className="mt-1 text-2xl font-extrabold text-white">
                                {stats.total_users.toLocaleString()}
                            </h3>
                        </div>
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-zinc-400">
                            <Users className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Card 4: MRR (Total Revenue) */}
                    <div className="flex items-center justify-between rounded-lg border border-[#1F1F1F] bg-[#111111] p-5 transition-all hover:border-[#6366F1]/50">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                Monthly Revenue (MRR)
                            </span>
                            <h3 className="mt-1 text-2xl font-extrabold text-[#6366F1]">
                                {formatCurrency(stats.total_revenue_cents)}
                            </h3>
                        </div>
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-zinc-400">
                            <DollarSign className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Card 5: New Signups (month) */}
                    <div className="flex items-center justify-between rounded-lg border border-[#1F1F1F] bg-[#111111] p-5 transition-all hover:border-[#6366F1]/50">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                New Signups (Month)
                            </span>
                            <h3 className="mt-1 text-2xl font-extrabold text-white">
                                +{stats.new_signups_this_month.toLocaleString()}
                            </h3>
                        </div>
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-zinc-400">
                            <UserPlus className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Card 6: Active Subs */}
                    <div className="flex items-center justify-between rounded-lg border border-[#1F1F1F] bg-[#111111] p-5 transition-all hover:border-[#6366F1]/50">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                Active Subscriptions
                            </span>
                            <h3 className="mt-1 text-2xl font-extrabold text-white">
                                {stats.active_subscriptions.toLocaleString()}
                            </h3>
                        </div>
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-zinc-400">
                            <ShieldAlert className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Tables Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* PENDING APPROVALS */}
                    <div className="flex flex-col justify-between rounded-lg border border-[#1F1F1F] bg-[#111111] p-6">
                        <div>
                            <div className="mb-4 flex items-center justify-between border-b border-[#1F1F1F] pb-4">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-base font-bold text-white">
                                        Pending Review
                                    </h2>
                                    <span className="rounded-full border border-[#6366F1]/20 bg-[#6366F1]/10 px-2 py-0.5 text-[10px] font-bold text-[#6366F1]">
                                        {pendingBusinesses.length}
                                    </span>
                                </div>
                            </div>

                            {pendingBusinesses.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-sm text-zinc-500">
                                        No pending listings to review.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-[#1F1F1F] text-xs tracking-wider text-zinc-500 uppercase">
                                                <th className="pb-3 font-semibold">
                                                    Business Name
                                                </th>
                                                <th className="pb-3 font-semibold">
                                                    Owner
                                                </th>
                                                <th className="pb-3 font-semibold">
                                                    Category
                                                </th>
                                                <th className="pb-3 font-semibold">
                                                    Submitted
                                                </th>
                                                <th className="pb-3 text-right font-semibold">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#1F1F1F]">
                                            {pendingBusinesses.map((biz) => (
                                                <tr
                                                    key={biz.id}
                                                    className="transition-colors hover:bg-zinc-800/40"
                                                >
                                                    <td className="max-w-[140px] truncate py-3.5 font-semibold text-white">
                                                        {biz.name}
                                                    </td>
                                                    <td className="py-3.5 text-xs text-zinc-400">
                                                        {biz.owner?.name ||
                                                            biz.user?.name ||
                                                            'N/A'}
                                                    </td>
                                                    <td className="py-3.5 text-xs text-zinc-400">
                                                        {biz.category?.en ||
                                                            'N/A'}
                                                    </td>
                                                    <td className="py-3.5 text-xs text-zinc-500">
                                                        {formatDate(
                                                            biz.created_at,
                                                        )}
                                                    </td>
                                                    <td className="py-3.5 text-right">
                                                        <div className="inline-flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleApprove(
                                                                        biz.id,
                                                                    )
                                                                }
                                                                className="text-emerald-450 rounded border border-emerald-500/20 bg-emerald-500/10 p-1.5 transition-colors hover:bg-emerald-500/20 hover:text-emerald-400"
                                                                title="Approve"
                                                            >
                                                                <Check className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleReject(
                                                                        biz.id,
                                                                    )
                                                                }
                                                                className="text-rose-450 rounded border border-rose-500/20 bg-rose-500/10 p-1.5 transition-colors hover:bg-rose-500/20 hover:text-rose-400"
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

                    {/* RECENT PAYMENTS */}
                    <div className="flex flex-col justify-between rounded-lg border border-[#1F1F1F] bg-[#111111] p-6">
                        <div>
                            <div className="mb-4 flex items-center justify-between border-b border-[#1F1F1F] pb-4">
                                <h2 className="text-base font-bold text-white">
                                    Recent Transactions
                                </h2>
                            </div>

                            {recentPayments.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-sm text-zinc-500">
                                        No recent transactions recorded.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-[#1F1F1F] text-xs tracking-wider text-zinc-500 uppercase">
                                                <th className="pb-3 font-semibold">
                                                    User
                                                </th>
                                                <th className="pb-3 font-semibold">
                                                    Plan
                                                </th>
                                                <th className="pb-3 font-semibold">
                                                    Amount
                                                </th>
                                                <th className="pb-3 font-semibold">
                                                    Date
                                                </th>
                                                <th className="pb-3 text-right font-semibold">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#1F1F1F]">
                                            {recentPayments.map((payment) => (
                                                <tr
                                                    key={payment.id}
                                                    className="transition-colors hover:bg-zinc-800/40"
                                                >
                                                    <td className="py-3.5 text-xs font-semibold text-white">
                                                        {payment.user?.name ||
                                                            'N/A'}
                                                    </td>
                                                    <td className="py-3.5 text-xs text-zinc-400">
                                                        <span className="capitalize">
                                                            {payment.plan?.en ||
                                                                'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 text-xs font-bold text-white">
                                                        {formatCurrency(
                                                            payment.amount_cents,
                                                        )}
                                                    </td>
                                                    <td className="py-3.5 text-xs text-zinc-500">
                                                        {formatDate(
                                                            payment.created_at,
                                                        )}
                                                    </td>
                                                    <td className="py-3.5 text-right">
                                                        <span
                                                            className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-bold capitalize ${payment.status === 'succeeded' ? 'text-emerald-450 border-emerald-500/20 bg-emerald-500/10' : ''} ${payment.status === 'failed' ? 'text-rose-450 border-rose-500/20 bg-rose-500/10' : ''} ${payment.status === 'refunded' ? 'text-amber-450 border-amber-500/20 bg-amber-500/10' : ''} `}
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
    <AdminLayout breadcrumbs={[{ title: 'Admin Dashboard', href: '/admin' }]}>
        {page}
    </AdminLayout>
);
