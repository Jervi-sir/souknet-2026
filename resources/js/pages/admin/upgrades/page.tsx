import { Head, router, useForm } from '@inertiajs/react';
import {
    Clock,
    CheckCircle,
    XCircle,
    Building2,
    Store,
    MessageSquare,
    AlertTriangle,
    ShieldAlert,
    Calendar,
    ArrowLeft,
    Check,
    X
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import AdminLayout from '@/layouts/admin-layout';
import UpgradeRequestManagementController from '@/actions/App/Http/Controllers/Admin/UpgradeRequestManagementController';

interface UserType {
    id: number;
    name: string;
    email: string;
}

interface UpgradeRequestType {
    id: number;
    user_id: number;
    role_code: string;
    status: string;
    message: string | null;
    rejection_reason: string | null;
    created_at: string;
    user: UserType;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedUpgrades {
    data: UpgradeRequestType[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    upgrades: PaginatedUpgrades;
    filters: {
        status: string;
    };
}

export default function UpgradeManagement({ upgrades, filters }: Props) {
    const [statusFilter, setStatusFilter] = useState(filters.status);
    const [rejectingRequest, setRejectingRequest] = useState<UpgradeRequestType | null>(null);

    const { data, setData, patch, processing, errors, reset } = useForm({
        rejection_reason: '',
    });

    const handleFilterChange = (newStatus: string) => {
        setStatusFilter(newStatus);
        router.get(UpgradeRequestManagementController.index.url({
            query: { status: newStatus }
        }), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleApprove = (request: UpgradeRequestType) => {
        if (confirm(`Are you sure you want to approve the request for ${request.user.name}?`)) {
            router.patch(UpgradeRequestManagementController.approve.url({ id: request.id }), {}, {
                onSuccess: () => {
                    toast.success('Upgrade request approved successfully!');
                },
                onError: () => {
                    toast.error('Failed to approve upgrade request.');
                }
            });
        }
    };

    const openRejectModal = (request: UpgradeRequestType) => {
        setRejectingRequest(request);
        reset('rejection_reason');
    };

    const handleRejectSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!rejectingRequest) {
            return;
        }

        patch(UpgradeRequestManagementController.reject.url({ id: rejectingRequest.id }), {
            onSuccess: () => {
                setRejectingRequest(null);
                reset('rejection_reason');
                toast.success('Upgrade request rejected.');
            },
            onError: () => {
                toast.error('Failed to reject upgrade request.');
            }
        });
    };

    return (
        <>
            <Head title="Upgrade Requests" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                {/* Header */}
                <div className="border-b border-[#262930] pb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#4318FF] tracking-wider uppercase">System Administration</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white">
                            Merchant Upgrade Requests
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Approve or reject requests from users seeking Business Owner or Store Owner roles.
                        </p>
                    </div>

                    {/* Filter Segment Control */}
                    <div className="flex bg-[#0c0d12] border border-[#262930] p-1 rounded-xl self-start sm:self-auto">
                        {['all', 'pending', 'approved', 'rejected'].map((status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => handleFilterChange(status)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                                    statusFilter === status
                                        ? 'bg-[#4318FF] text-white shadow-lg'
                                        : 'text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table / List */}
                <div className="overflow-hidden rounded-xl border border-[#262930] bg-[#0c0d12]">
                    {upgrades.data.length === 0 ? (
                        <div className="p-12 text-center space-y-4">
                            <div className="h-12 w-12 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto text-zinc-500">
                                <ShieldAlert className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-white">No requests found</h3>
                                <p className="text-xs text-[#8f9bba]">
                                    There are currently no upgrade requests matching the selected filter.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-xs">
                                <thead>
                                    <tr className="border-b border-[#262930] text-[10px] tracking-wider text-[#8f9bba] uppercase font-bold bg-[#0c0d12]/80">
                                        <th className="p-4 font-bold">User Information</th>
                                        <th className="p-4 font-bold">Requested Role</th>
                                        <th className="p-4 font-bold">Details / Message</th>
                                        <th className="p-4 font-bold">Submitted At</th>
                                        <th className="p-4 font-bold">Status</th>
                                        <th className="p-4 text-right font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#262930]/40 text-zinc-300">
                                    {upgrades.data.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="transition-colors hover:bg-[#15171e]/40 align-top"
                                        >
                                            <td className="p-4">
                                                <div className="font-bold text-white text-sm">
                                                    {request.user.name}
                                                </div>
                                                <div className="text-[11px] text-[#8f9bba]">
                                                    {request.user.email}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    {request.role_code === 'business_owner' ? (
                                                        <span className="text-[#6AD2FF] border border-[#4318FF]/20 bg-[#4318FF]/10 px-2 py-0.5 text-[10px] font-bold rounded flex items-center gap-1">
                                                            <Building2 className="h-3 w-3" />
                                                            Business Owner
                                                        </span>
                                                    ) : (
                                                        <span className="text-amber-400 border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold rounded flex items-center gap-1">
                                                            <Store className="h-3 w-3" />
                                                            Store Owner
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 max-w-sm">
                                                <div className="bg-[#15171e]/60 border border-[#262930]/60 rounded-xl p-3 space-y-2">
                                                    <p className="text-zinc-300 text-xs font-light leading-relaxed whitespace-pre-wrap">
                                                        {request.message}
                                                    </p>
                                                    {request.status === 'rejected' && request.rejection_reason && (
                                                        <div className="border-t border-[#262930]/40 pt-2 mt-2">
                                                            <div className="text-[9px] font-bold text-red-400 uppercase tracking-wider">
                                                                Rejection Reason
                                                            </div>
                                                            <p className="text-red-300/80 text-[11px] font-medium mt-0.5 italic">
                                                                "{request.rejection_reason}"
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 text-[#8f9bba] font-medium whitespace-nowrap">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {new Date(request.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {request.status === 'pending' && (
                                                    <span className="text-yellow-400 border border-yellow-500/20 bg-yellow-500/10 px-2 py-0.5 text-[10px] font-bold rounded flex items-center gap-1 w-max">
                                                        <Clock className="h-3 w-3" />
                                                        Pending
                                                    </span>
                                                )}
                                                {request.status === 'approved' && (
                                                    <span className="text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold rounded flex items-center gap-1 w-max">
                                                        <CheckCircle className="h-3 w-3" />
                                                        Approved
                                                    </span>
                                                )}
                                                {request.status === 'rejected' && (
                                                    <span className="text-red-400 border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold rounded flex items-center gap-1 w-max">
                                                        <XCircle className="h-3 w-3" />
                                                        Rejected
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                {request.status === 'pending' ? (
                                                    <div className="flex justify-end items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleApprove(request)}
                                                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
                                                        >
                                                            <Check className="h-3.5 w-3.5" />
                                                            Approve
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => openRejectModal(request)}
                                                            className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500 px-3 py-1.5 text-xs font-bold text-red-400 hover:text-white transition-all cursor-pointer"
                                                        >
                                                            <X className="h-3.5 w-3.5" />
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-zinc-650 text-xs">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {upgrades.last_page > 1 && (
                    <div className="flex items-center justify-between border-t border-[#262930]/40 pt-4 text-xs text-[#8f9bba]">
                        <div>
                            Showing <span className="font-bold text-white">{upgrades.from}</span> to{' '}
                            <span className="font-bold text-white">{upgrades.to}</span> of{' '}
                            <span className="font-bold text-white">{upgrades.total}</span> requests
                        </div>
                        <div className="flex gap-1.5">
                            {upgrades.links.map((link, idx) => {
                                // Skip prev/next helper logic if label hasn't changed or customize labels
                                const label = link.label
                                    .replace('&laquo; Previous', 'Prev')
                                    .replace('Next &raquo;', 'Next');

                                return link.url ? (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            router.get(link.url!, {}, {
                                                preserveState: true,
                                                preserveScroll: true,
                                            });
                                        }}
                                        className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                            link.active
                                                ? 'bg-[#4318FF] border-[#4318FF] text-white font-bold'
                                                : 'bg-[#111111] border-[#262930] text-[#8f9bba] hover:text-white'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: label }}
                                    />
                                ) : (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 rounded-lg border border-[#262930]/40 bg-[#0c0d12]/40 text-zinc-600 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: label }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Rejection Dialog Modal */}
                <Dialog open={!!rejectingRequest} onOpenChange={(open) => !open && setRejectingRequest(null)}>
                    <DialogContent className="border-[#262930] bg-[#0c0d12] text-white">
                        <DialogHeader>
                            <DialogTitle className="text-white text-base font-bold">Reject Upgrade Request</DialogTitle>
                            <DialogDescription className="text-xs text-[#8f9bba]">
                                Provide a reason for declining the upgrade request for{' '}
                                <strong className="text-white">{rejectingRequest?.user.name}</strong>. This message will be shown to the user on their dashboard.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleRejectSubmit} className="space-y-4 mt-2">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-[#8f9bba] uppercase tracking-wider">
                                    Rejection Reason *
                                </label>
                                <textarea
                                    required
                                    value={data.rejection_reason}
                                    onChange={(e) => setData('rejection_reason', e.target.value)}
                                    placeholder="e.g. Please provide your official business registry details or a copy of your merchant card."
                                    rows={4}
                                    maxLength={1000}
                                    className="w-full text-xs bg-[#15171e] border border-[#262930] rounded-xl p-3 text-zinc-100 placeholder-zinc-550 focus:outline-none focus:border-red-500 transition-colors"
                                />
                                {errors.rejection_reason && (
                                    <p className="text-xs text-red-500 mt-1">{errors.rejection_reason}</p>
                                )}
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-[#262930]/40">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setRejectingRequest(null)}
                                    className="bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-red-500 hover:bg-red-650 text-white font-bold"
                                >
                                    {processing ? 'Rejecting...' : 'Reject Request'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

UpgradeManagement.layout = (page: React.ReactNode) => (
    <AdminLayout
        breadcrumbs={[{ title: 'Upgrade Requests', href: '/admin/upgrades' }]}
    >
        {page}
    </AdminLayout>
);
