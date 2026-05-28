import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import {
    Plus,
    Edit,
    Image as ImageIcon,
    CheckCircle,
    XCircle,
    Sparkles,
    Shield,
    BarChart,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface Plan {
    id: number;
    code: string;
    en: string;
    fr: string | null;
    ar: string | null;
    stripe_price_id_monthly: string | null;
    stripe_price_id_yearly: string | null;
    price_monthly_cents: number;
    price_yearly_cents: number;
    max_photos: number;
    has_analytics: boolean;
    has_featured: boolean;
    has_verified_badge: boolean;
    is_active: boolean;
    sort_order: number;
}

interface PlanProps {
    plans: Plan[];
}

export default function PlanManagement({ plans }: PlanProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

    const form = useForm({
        code: '',
        en: '',
        fr: '',
        ar: '',
        stripe_price_id_monthly: '',
        stripe_price_id_yearly: '',
        price_monthly_cents: 0,
        price_yearly_cents: 0,
        max_photos: 5,
        has_analytics: false,
        has_featured: false,
        has_verified_badge: false,
        is_active: true,
        sort_order: 0,
    });

    const openCreateModal = () => {
        setEditingPlan(null);
        form.reset();
        setIsModalOpen(true);
    };

    const openEditModal = (plan: Plan) => {
        setEditingPlan(plan);
        form.setData({
            code: plan.code,
            en: plan.en,
            fr: plan.fr || '',
            ar: plan.ar || '',
            stripe_price_id_monthly: plan.stripe_price_id_monthly || '',
            stripe_price_id_yearly: plan.stripe_price_id_yearly || '',
            price_monthly_cents: plan.price_monthly_cents,
            price_yearly_cents: plan.price_yearly_cents,
            max_photos: plan.max_photos,
            has_analytics: plan.has_analytics,
            has_featured: plan.has_featured,
            has_verified_badge: plan.has_verified_badge,
            is_active: plan.is_active,
            sort_order: plan.sort_order,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPlan) {
            form.patch(`/admin/plans/${editingPlan.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    toast.success('Subscription plan updated successfully!');
                },
                onError: () => {
                    toast.error('Failed to update subscription plan.');
                },
            });
        } else {
            form.post('/admin/plans', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    toast.success(
                        'New subscription plan created successfully!',
                    );
                },
                onError: () => {
                    toast.error('Failed to create subscription plan.');
                },
            });
        }
    };

    return (
        <>
            <Head title="Subscription Plans" />
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
                            Subscription Plans
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Configure pricing tiers, listing feature allowances, and payment API hooks.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-1.5 self-start rounded-lg bg-[#4318FF] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#3b15e6] sm:self-auto cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        Create New Plan
                    </button>
                </div>

                {/* Plans Table */}
                <div className="overflow-hidden rounded-xl border border-[#262930] bg-[#0c0d12]">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#262930] text-[10px] tracking-wider text-[#8f9bba] uppercase font-bold bg-[#0c0d12]/80">
                                    <th className="p-4 font-bold">
                                        Tier Name (Code)
                                    </th>
                                    <th className="p-4 font-bold">
                                        Pricing (Monthly / Yearly)
                                    </th>
                                    <th className="p-4 font-bold">
                                        Photo Limit
                                    </th>
                                    <th className="p-4 font-bold">
                                        Allowances
                                    </th>
                                    <th className="p-4 font-bold">
                                        Status
                                    </th>
                                    <th className="p-4 text-right font-bold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262930]/40 text-zinc-300">
                                {plans.map((plan) => (
                                    <tr
                                        key={plan.id}
                                        className="transition-colors hover:bg-[#15171e]/40"
                                    >
                                        <td className="p-4">
                                            <div className="font-bold text-white text-sm">
                                                {plan.en}
                                            </div>
                                            <div className="mt-0.5 text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                                {plan.code}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-white">
                                                $
                                                {(
                                                    plan.price_monthly_cents /
                                                    100
                                                ).toFixed(2)}{' '}
                                                <span className="text-xs text-[#8f9bba]">
                                                    /mo
                                                </span>
                                            </div>
                                            <div className="mt-0.5 text-xs text-zinc-400 font-medium">
                                                $
                                                {(
                                                    plan.price_yearly_cents /
                                                    100
                                                ).toFixed(2)}{' '}
                                                <span className="text-[10px] text-[#8f9bba]">
                                                    /yr
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 font-medium text-[#8f9bba]">
                                                <ImageIcon className="h-4 w-4 text-[#8f9bba]" />
                                                <span className="text-zinc-200">{plan.max_photos} photos</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-2">
                                                {plan.has_analytics && (
                                                    <span className="text-[#6AD2FF] border border-[#4318FF]/20 bg-[#4318FF]/10 px-1.5 py-0.5 text-[10px] font-bold rounded">
                                                        <BarChart className="h-3 w-3 inline mr-1" />
                                                        Analytics
                                                    </span>
                                                )}
                                                {plan.has_featured && (
                                                    <span className="inline-flex items-center gap-1 rounded border border-[#4318FF]/20 bg-[#4318FF]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#6AD2FF]">
                                                        <Sparkles className="h-3 w-3" />
                                                        Featured
                                                    </span>
                                                )}
                                                {plan.has_verified_badge && (
                                                    <span className="text-emerald-400 inline-flex items-center gap-1 rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold">
                                                        <Shield className="h-3 w-3" />
                                                        Verified Badge
                                                    </span>
                                                )}
                                                {!plan.has_analytics &&
                                                    !plan.has_featured &&
                                                    !plan.has_verified_badge && (
                                                        <span className="text-zinc-650 text-xs">
                                                            —
                                                        </span>
                                                    )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {plan.is_active ? (
                                                <span className="text-emerald-400 inline-flex items-center gap-1 text-xs font-bold">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8f9bba]">
                                                    <XCircle className="h-4 w-4" />
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openEditModal(plan)
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#262930] bg-[#111111] px-3 py-1.5 text-xs font-bold text-[#8f9bba] transition-colors hover:bg-[#15171e]/40 hover:text-white cursor-pointer"
                                            >
                                                <Edit className="h-3.5 w-3.5" />
                                                Edit Plan
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit/Create Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                        <div className="max-h-[90vh] w-full max-w-2xl space-y-4 overflow-y-auto rounded-xl border border-[#262930] bg-[#0c0d12] p-6">
                            <h3 className="border-b border-[#262930] pb-3 text-base font-bold text-white">
                                {editingPlan
                                    ? 'Modify Subscription Plan'
                                    : 'Create Subscription Plan'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                            Plan Name (En) *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.en}
                                            onChange={(e) =>
                                                form.setData(
                                                    'en',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                            placeholder="e.g. Professional Plan"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                            Unique Code Identifier *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.code}
                                            onChange={(e) =>
                                                form.setData(
                                                    'code',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                            placeholder="e.g. premium"
                                            required
                                        />
                                        {form.errors.code && (
                                            <p className="mt-1 text-xs text-rose-505">
                                                {form.errors.code}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                            Plan Name (Fr)
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.fr}
                                            onChange={(e) =>
                                                form.setData(
                                                    'fr',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                            Plan Name (Ar)
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.ar}
                                            onChange={(e) =>
                                                form.setData(
                                                    'ar',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                            Monthly Price (Cents) *
                                        </label>
                                        <input
                                            type="number"
                                            value={
                                                form.data.price_monthly_cents
                                            }
                                            onChange={(e) =>
                                                form.setData(
                                                    'price_monthly_cents',
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                            Yearly Price (Cents) *
                                        </label>
                                        <input
                                            type="number"
                                            value={form.data.price_yearly_cents}
                                            onChange={(e) =>
                                                form.setData(
                                                    'price_yearly_cents',
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                            Stripe Monthly Price ID
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                form.data
                                                    .stripe_price_id_monthly
                                            }
                                            onChange={(e) =>
                                                form.setData(
                                                    'stripe_price_id_monthly',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                            placeholder="price_..."
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                            Stripe Yearly Price ID
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                form.data.stripe_price_id_yearly
                                            }
                                            onChange={(e) =>
                                                form.setData(
                                                    'stripe_price_id_yearly',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                            placeholder="price_..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                            Maximum Business Photos *
                                        </label>
                                        <input
                                            type="number"
                                            value={form.data.max_photos}
                                            onChange={(e) =>
                                                form.setData(
                                                    'max_photos',
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                            Sort Order *
                                        </label>
                                        <input
                                            type="number"
                                            value={form.data.sort_order}
                                            onChange={(e) =>
                                                form.setData(
                                                    'sort_order',
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-3">
                                        <label className="flex cursor-pointer items-center gap-2.5">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    form.data.has_analytics
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        'has_analytics',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="rounded border-[#262930] bg-[#111111] text-[#4318FF] focus:ring-0 cursor-pointer"
                                            />
                                            <span className="text-xs font-bold text-zinc-300">
                                                Allow analytics
                                            </span>
                                        </label>

                                        <label className="flex cursor-pointer items-center gap-2.5">
                                            <input
                                                type="checkbox"
                                                checked={form.data.has_featured}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'has_featured',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="rounded border-[#262930] bg-[#111111] text-[#4318FF] focus:ring-0 cursor-pointer"
                                            />
                                            <span className="text-xs font-bold text-zinc-300">
                                                Allow featured status
                                            </span>
                                        </label>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="flex cursor-pointer items-center gap-2.5">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    form.data.has_verified_badge
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        'has_verified_badge',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="rounded border-[#262930] bg-[#111111] text-[#4318FF] focus:ring-0 cursor-pointer"
                                            />
                                            <span className="text-xs font-bold text-zinc-300">
                                                Verified Badge allowance
                                            </span>
                                        </label>

                                        <label className="flex cursor-pointer items-center gap-2.5">
                                            <input
                                                type="checkbox"
                                                checked={form.data.is_active}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'is_active',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="rounded border-[#262930] bg-[#111111] text-[#4318FF] focus:ring-0 cursor-pointer"
                                            />
                                            <span className="text-xs font-bold text-zinc-300">
                                                Active status
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 border-t border-[#262930] pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="rounded-lg border border-[#262930] bg-[#111111] px-4 py-2 text-xs font-bold text-[#8f9bba] transition-colors hover:bg-[#15171e]/40 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="rounded-lg bg-[#4318FF] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#3b15e6] disabled:opacity-50 cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

PlanManagement.layout = (page: React.ReactNode) => (
    <AdminLayout
        breadcrumbs={[{ title: 'Subscription Plans', href: '/admin/plans' }]}
    >
        {page}
    </AdminLayout>
);
