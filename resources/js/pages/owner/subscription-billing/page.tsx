import { Head, router, useForm } from '@inertiajs/react';
import {
    CreditCard,
    Sparkles,
    Check,
    Building2,
    Calendar,
    ArrowRight,
    History,
    AlertCircle,
    Info,
    Receipt,
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import OwnerLayout from '@/layouts/owner-layout';

interface Plan {
    id: number;
    code: string;
    en: string;
    price_monthly_cents: number;
    price_yearly_cents: number;
    max_photos: number;
    has_analytics: boolean;
    has_featured: boolean;
    has_verified_badge: boolean;
}

interface Business {
    id: number;
    name: string;
    plan_id: number | null;
    plan_expires_at: string | null;
    plan: Plan | null;
}

interface Invoice {
    id: string;
    business_name: string;
    plan_name: string;
    amount: string;
    date: string;
    status: string;
    pdf_url: string;
}

interface SubscriptionBillingProps {
    businesses: Business[];
    plans: Plan[];
    invoices: Invoice[];
}

export default function SubscriptionBilling({
    businesses,
    plans,
    invoices,
}: SubscriptionBillingProps) {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

    const { data, setData, post, processing } = useForm({
        plan_id: '',
        interval: 'monthly',
    });

    const openUpgradeModal = (business: Business, targetPlan?: Plan) => {
        setSelectedBusiness(business);
        const currentTargetPlan = targetPlan || plans.find(p => p.code !== 'free') || null;
        setSelectedPlan(currentTargetPlan);
        setData({
            plan_id: currentTargetPlan?.id.toString() || '',
            interval: billingPeriod,
        });
        setIsUpgradeOpen(true);
    };

    const handleUpgradeSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedBusiness) {
return;
}

        post(`/owner/subscription-billing/${selectedBusiness.id}/upgrade`, {
            onSuccess: () => {
                setIsUpgradeOpen(false);
            },
        });
    };

    return (
        <>
            <Head title="Subscription & Billing" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                {/* Header */}
                <div className="border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#4318FF] tracking-wider uppercase">Console Billing</span>
                    </div>
                    <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-[#4318FF]" />
                        Subscription & Billing
                    </h1>
                    <p className="text-xs text-[#8f9bba] mt-0.5">
                        Upgrade your businesses' visibility, check current billing tiers, and manage your active plans.
                    </p>
                </div>

                {/* Businesses Plans Grid */}
                <div className="space-y-3">
                    <h2 className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider">My Listings & Tiers</h2>
                    {businesses.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#262930] bg-[#0c0d12] p-12 text-center">
                            <Building2 className="h-10 w-10 text-zinc-750 mx-auto mb-3" />
                            <h3 className="font-semibold text-[#8f9bba] text-sm">No businesses registered</h3>
                            <p className="text-xs text-zinc-500 mt-1">
                                Create a listing first to manage its subscription settings.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {businesses.map((business) => {
                                const activePlanName = business.plan?.en || 'Free';
                                const activePlanCode = business.plan?.code || 'free';
                                const isPremium = activePlanCode === 'premium';
                                const isEnterprise = activePlanCode === 'enterprise';

                                return (
                                    <Card key={business.id} className="border-[#262930] bg-[#0c0d12] hover:border-zinc-700 transition-all duration-300">
                                        <CardContent className="p-5 flex flex-col justify-between h-full min-h-[180px]">
                                            <div className="space-y-3">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1">
                                                        {business.name}
                                                    </h3>
                                                    <Badge className={`uppercase tracking-wider text-[10px] ${
                                                        isEnterprise
                                                            ? 'bg-purple-500/20 text-[#6AD2FF] border border-purple-500/30'
                                                            : isPremium
                                                            ? 'bg-[#4318FF]/20 text-[#6AD2FF] border border-[#4318FF]/30'
                                                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                                    }`}>
                                                        {activePlanName}
                                                    </Badge>
                                                </div>

                                                <div className="space-y-1.5 text-xs text-[#8f9bba]">
                                                    <div className="flex items-center gap-1.5">
                                                        <Sparkles className="h-3.5 w-3.5 text-zinc-500" />
                                                        <span>Photos Limit: <strong>{business.plan?.max_photos ?? 3} photos</strong></span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                                                        <span>
                                                            Expires: {business.plan_expires_at
                                                                ? new Date(business.plan_expires_at).toLocaleDateString()
                                                                : 'Never (Free Tier)'
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-[#262930]/40 flex gap-2">
                                                {activePlanCode !== 'enterprise' ? (
                                                    <Button
                                                        onClick={() => openUpgradeModal(business)}
                                                        className="w-full bg-[#4318FF] hover:bg-[#3b15e6] text-white text-xs h-9 font-semibold"
                                                    >
                                                        Upgrade Listing
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => openUpgradeModal(business)}
                                                        className="w-full border-[#262930] bg-[#111111] text-zinc-300 text-xs h-9 font-semibold hover:bg-zinc-800"
                                                    >
                                                        Manage Subscription
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Plan Comparison Grid */}
                <div className="space-y-4 mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#262930]">
                        <div>
                            <h2 className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider">Plan Options & Pricing</h2>
                            <p className="text-xs text-[#8f9bba]">Compare tiers and check visibility features</p>
                        </div>

                        {/* Monthly/Yearly Toggle */}
                        <div className="flex items-center gap-1 bg-[#111111] p-1 rounded-lg border border-[#262930] self-start sm:self-auto">
                            <button
                                onClick={() => setBillingPeriod('monthly')}
                                className={`px-3 py-1 rounded-md text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                                    billingPeriod === 'monthly'
                                        ? 'bg-[#4318FF] text-white shadow-sm'
                                        : 'text-[#8f9bba] hover:text-zinc-200'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingPeriod('yearly')}
                                className={`px-3 py-1 rounded-md text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                                    billingPeriod === 'yearly'
                                        ? 'bg-[#4318FF] text-white shadow-sm'
                                        : 'text-[#8f9bba] hover:text-zinc-200'
                                }`}
                            >
                                Yearly <span className="text-[9px] text-[#6AD2FF] font-bold ml-0.5">Save 16%</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => {
                            const isFree = plan.code === 'free';
                            const isEnterprise = plan.code === 'enterprise';
                            const isPremium = plan.code === 'premium';

                            const price = billingPeriod === 'yearly'
                                ? plan.price_yearly_cents
                                : plan.price_monthly_cents;

                            const formattedPrice = isFree ? '$0' : `$${(price / 100).toFixed(2)}`;
                            const periodText = isFree ? '' : (billingPeriod === 'yearly' ? '/year' : '/month');

                            return (
                                <Card key={plan.id} className={`border-[#262930] bg-[#0c0d12] flex flex-col justify-between hover:border-zinc-700 transition-all ${
                                    isPremium ? 'ring-1 ring-[#4318FF]/30 shadow-indigo-950/20 shadow-md' : ''
                                }`}>
                                    <div className="p-6 space-y-6">
                                        {/* Plan Name & Pricing */}
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold text-white text-lg">{plan.en}</h3>
                                                {isPremium && (
                                                    <span className="bg-[#4318FF]/20 text-[#6AD2FF] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#4318FF]/30">
                                                        Popular
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-baseline gap-1 mt-2">
                                                <span className="text-2xl font-extrabold text-white">{formattedPrice}</span>
                                                <span className="text-zinc-500 text-xs">{periodText}</span>
                                            </div>
                                        </div>

                                        {/* Core Features */}
                                        <ul className="space-y-2.5 text-xs text-[#8f9bba]">
                                            <li className="flex items-center gap-2">
                                                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                                <span>Up to {plan.max_photos} photos allowed</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                {plan.has_verified_badge ? (
                                                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                                ) : (
                                                    <Check className="h-4 w-4 text-zinc-700 shrink-0" />
                                                )}
                                                <span className={plan.has_verified_badge ? '' : 'text-zinc-500'}>
                                                    Verified Check Badge
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                {plan.has_analytics ? (
                                                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                                ) : (
                                                    <Check className="h-4 w-4 text-zinc-700 shrink-0" />
                                                )}
                                                <span className={plan.has_analytics ? '' : 'text-zinc-500'}>
                                                    Performance Analytics
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                {plan.has_featured ? (
                                                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                                ) : (
                                                    <Check className="h-4 w-4 text-zinc-700 shrink-0" />
                                                )}
                                                <span className={plan.has_featured ? '' : 'text-zinc-500'}>
                                                    Featured Listing Placement
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="p-6 pt-0">
                                        {!isFree && businesses.length > 0 && (
                                            <Button
                                                onClick={() => {
                                                    openUpgradeModal(businesses[0], plan);
                                                }}
                                                className={`w-full text-xs font-semibold h-9 ${
                                                    isPremium
                                                        ? 'bg-[#4318FF] hover:bg-[#3b15e6] text-white'
                                                        : 'bg-[#111111] border border-[#262930] hover:bg-zinc-800 text-zinc-300'
                                                }`}
                                            >
                                                Choose {plan.en} Plan
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Billing Ledger History */}
                <div className="space-y-4 mt-6">
                    <div className="border-b border-[#262930] pb-2 flex items-center gap-2">
                        <History className="h-4 w-4 text-zinc-400" />
                        <h2 className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider">Billing History</h2>
                    </div>

                    {invoices.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#262930] bg-[#0c0d12] p-8 text-center text-xs text-zinc-500">
                            No billing logs found. Subscription transactions will display here.
                        </div>
                    ) : (
                        <Card className="border-[#262930] bg-[#0c0d12] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#262930] bg-[#111111]/80 text-[#8f9bba] uppercase tracking-wider font-bold">
                                            <th className="p-4">Invoice ID</th>
                                            <th className="p-4">Business</th>
                                            <th className="p-4">Plan Description</th>
                                            <th className="p-4">Billing Date</th>
                                            <th className="p-4">Amount</th>
                                            <th className="p-4 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#262930]/40 text-zinc-350">
                                        {invoices.map((inv) => (
                                            <tr key={inv.id} className="hover:bg-[#15171e]/40 transition-colors">
                                                <td className="p-4 font-semibold text-white">{inv.id}</td>
                                                <td className="p-4">{inv.business_name}</td>
                                                <td className="p-4">{inv.plan_name}</td>
                                                <td className="p-4">{inv.date}</td>
                                                <td className="p-4">{inv.amount}</td>
                                                <td className="p-4 text-right">
                                                    <Badge className="bg-emerald-500/25 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px]">
                                                        {inv.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            {/* Upgrade/Change Plan Interactive Modal */}
            <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
                <DialogContent className="sm:max-w-md bg-[#0c0d12] border-[#262930] text-white font-['Inter',_sans-serif]">
                    <DialogHeader>
                        <DialogTitle className="text-white text-base sm:text-lg font-bold flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-[#4318FF]" />
                            Manage Listing Subscription
                        </DialogTitle>
                        <DialogDescription className="text-[#8f9bba] text-xs mt-1">
                            Choose the plan and billing cycle for your company listing.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedBusiness && (
                        <form onSubmit={handleUpgradeSubmit} className="space-y-4 pt-2">
                            {/* Business Selector */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8f9bba]">Business Listing</label>
                                <div className="p-3 bg-[#111111] rounded-lg border border-[#262930] text-xs font-semibold text-white">
                                    {selectedBusiness.name}
                                </div>
                            </div>

                            {/* Plan Selection dropdown/radio */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8f9bba]">Target Subscription Tier</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {plans.filter(p => p.code !== 'free').map((p) => {
                                        const isSelected = selectedPlan?.id === p.id;

                                        return (
                                            <button
                                                key={p.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedPlan(p);
                                                    setData('plan_id', p.id.toString());
                                                }}
                                                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                                                    isSelected
                                                        ? 'border-[#4318FF] bg-[#4318FF]/10 text-white'
                                                        : 'border-[#262930] bg-[#111111] text-[#8f9bba] hover:text-zinc-200'
                                                }`}
                                            >
                                                <div className="font-bold text-xs">{p.en}</div>
                                                <div className="text-[10px] mt-1 text-[#8f9bba]">
                                                    ${((data.interval === 'yearly' ? p.price_yearly_cents : p.price_monthly_cents) / 100).toFixed(2)}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Interval Selector */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8f9bba]">Billing Cycle</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { code: 'monthly', label: 'Monthly' },
                                        { code: 'yearly', label: 'Yearly' },
                                    ].map((cycle) => {
                                        const isSelected = data.interval === cycle.code;

                                        return (
                                            <button
                                                key={cycle.code}
                                                type="button"
                                                onClick={() => setData('interval', cycle.code)}
                                                className={`p-2.5 rounded-lg border text-center text-xs font-semibold transition-all cursor-pointer ${
                                                    isSelected
                                                        ? 'border-[#4318FF] bg-[#4318FF]/10 text-white'
                                                        : 'border-[#262930] bg-[#111111] text-[#8f9bba] hover:text-zinc-200'
                                                }`}
                                            >
                                                {cycle.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Premium Perks summary */}
                            {selectedPlan && (
                                <div className="p-3 bg-[#4318FF]/5 border border-[#4318FF]/20 rounded-lg space-y-1.5">
                                    <div className="text-[10px] font-bold text-[#6AD2FF] uppercase tracking-wider flex items-center gap-1.5">
                                        <Info className="h-3.5 w-3.5" />
                                        Plan Highlights:
                                    </div>
                                    <ul className="text-[11px] text-[#8f9bba] space-y-1 list-disc list-inside">
                                        <li>Allows up to {selectedPlan.max_photos} photos</li>
                                        {selectedPlan.has_verified_badge && <li>Verified badge</li>}
                                        {selectedPlan.has_analytics && <li>Performance statistics</li>}
                                        {selectedPlan.has_featured && <li>Featured listing search positioning</li>}
                                    </ul>
                                </div>
                            )}

                            <DialogFooter className="mt-4 gap-2 sm:gap-0">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setIsUpgradeOpen(false)}
                                    className="text-xs text-[#8f9bba]"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#4318FF] hover:bg-[#3b15e6] text-white text-xs font-semibold px-4"
                                >
                                    Confirm Upgrade
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

// Sidebar Layout Wrapper
SubscriptionBilling.layout = (page: React.ReactNode) => (
    <OwnerLayout breadcrumbs={[{ title: 'Subscription & Billing', href: '/owner/subscription-billing' }]}>
        {page}
    </OwnerLayout>
);
