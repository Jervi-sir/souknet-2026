import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    CreditCard,
    Check,
    Sparkles,
    ShieldCheck,
    Zap,
    Download,
    Building2,
    Calendar,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    AlertCircle,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Plan {
    id: string;
    name: string;
    price: number;
    period: string;
    description: string;
    is_current?: boolean;
    is_popular?: boolean;
    features: string[];
}

const PLANS: Plan[] = [
    {
        id: 'starter',
        name: 'Starter COD',
        price: 3500,
        period: 'month',
        description: 'Perfect for launching your first Algerian store with courier tracking.',
        features: [
            '1 Online Storefront',
            'Up to 300 Orders / month',
            'Yalidine & ZR Express Integration',
            'Call Center Basic Desk (1 Agent)',
            'Standard Support',
        ],
    },
    {
        id: 'pro',
        name: 'Pro Scale (DZD)',
        price: 7900,
        period: 'month',
        is_current: true,
        is_popular: true,
        description: 'For growing e-commerce businesses needing advanced call confirmation.',
        features: [
            'Up to 5 Stores under 1 Organization',
            'Unlimited COD Orders',
            'Multi-Courier Accounts (Yalidine, ZR, EcoTrack, Noest)',
            'Dedicated Call Center Desk (5 Agents)',
            'Automated Return Mitigation (Suivi)',
            'Custom Domain (.dz or .com)',
            'Priority WhatsApp Support',
        ],
    },
    {
        id: 'enterprise',
        name: 'Empire Scale',
        price: 18500,
        period: 'month',
        description: 'For major Algerian distributors & high-volume COD brands.',
        features: [
            'Unlimited Stores & Team Members',
            'Unlimited Call Center Seats',
            'Direct API Webhooks & Barcode Automation',
            'Automated Cash Reconciliation (Versements)',
            'Dedicated Account Manager in Algiers',
        ],
    },
];

const INVOICES = [
    {
        id: 'INV-2026-03',
        date: 'March 01, 2026',
        plan: 'Pro Scale (DZD)',
        amount: '7,900 DZD',
        method: 'BaridiMob / Edahabia',
        status: 'paid',
    },
    {
        id: 'INV-2026-02',
        date: 'February 01, 2026',
        plan: 'Pro Scale (DZD)',
        amount: '7,900 DZD',
        method: 'BaridiMob / Edahabia',
        status: 'paid',
    },
    {
        id: 'INV-2026-01',
        date: 'January 01, 2026',
        plan: 'Starter COD',
        amount: '3,500 DZD',
        method: 'Cash Deposit / Virement',
        status: 'paid',
    },
];

export default function StoreMerchantSubscriptionBilling() {
    const [selectedBillingCycle, setSelectedBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    return (
        <StoreMerchantLayout activeNav="billing" title="Plan & Billing">
            <Head title="Subscription & Billing - DzAvenue Boutique" />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Subscription & Billing (Dinar Algérien)
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Manage your plan, payment methods (Edahabia, BaridiMob, Virement), and download tax invoices.
                        </p>
                    </div>

                    {/* Cycle Switcher */}
                    <div className="flex items-center p-1 rounded-xl border border-border bg-muted/40 text-xs">
                        <button
                            type="button"
                            onClick={() => setSelectedBillingCycle('monthly')}
                            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${selectedBillingCycle === 'monthly'
                                    ? 'bg-background text-foreground shadow-xs'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Monthly Billing
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedBillingCycle('annual')}
                            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${selectedBillingCycle === 'annual'
                                    ? 'bg-background text-foreground shadow-xs'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <span>Annual Billing</span>
                            <Badge className="bg-emerald-600 text-white text-[9px] px-1 py-0">
                                2 Months Free
                            </Badge>
                        </button>
                    </div>
                </div>

                {/* Current Plan Overview Card */}
                <Card className="border-2 border-primary/20 bg-primary/5 shadow-xs">
                    <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-primary text-primary-foreground text-xs font-semibold">
                                    Current Active Plan
                                </Badge>
                                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                    <CheckCircle2 className="size-3.5" /> Renews on April 01, 2026
                                </span>
                            </div>
                            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                                Pro Scale • 7,900 DZD / month
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Active for organization <strong>Atlas Commerce Group</strong> (Includes 3 Stores & 5 Call Center seats).
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" className="h-9 text-xs">
                                Change Payment Method
                            </Button>
                            <Button size="sm" className="h-9 text-xs font-semibold gap-1.5 shadow-xs">
                                <span>Upgrade Plan</span>
                                <ArrowUpRight className="size-3.5" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Available Plans Grid */}
                <div className="space-y-4">
                    <h3 className="font-bold text-base tracking-tight text-foreground">
                        Select a Plan tailored to your business scale
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PLANS.map((plan) => (
                            <Card
                                key={plan.id}
                                className={`flex flex-col justify-between border transition-all ${plan.is_current
                                        ? 'border-primary ring-2 ring-primary/20 bg-card shadow-md'
                                        : 'border-border/80 bg-card/60 hover:border-primary/40'
                                    }`}
                            >
                                <CardHeader className="pb-4 border-b border-border/60">
                                    <div className="flex justify-between items-center mb-1">
                                        <CardTitle className="text-base font-bold tracking-tight">
                                            {plan.name}
                                        </CardTitle>
                                        {plan.is_popular && (
                                            <Badge className="bg-emerald-600 text-white text-[10px]">
                                                Most Popular
                                            </Badge>
                                        )}
                                        {plan.is_current && (
                                            <Badge variant="outline" className="text-[10px]">
                                                Active
                                            </Badge>
                                        )}
                                    </div>
                                    <CardDescription className="text-xs min-h-[32px]">
                                        {plan.description}
                                    </CardDescription>
                                    <div className="pt-3 flex items-baseline gap-1">
                                        <span className="text-3xl font-extrabold text-foreground">
                                            {plan.price.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-semibold">
                                            DZD / {plan.period}
                                        </span>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-6">
                                    <ul className="space-y-2.5 text-xs text-muted-foreground">
                                        {plan.features.map((feat, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <Check className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div>
                                        {plan.is_current ? (
                                            <Button disabled variant="outline" className="w-full text-xs">
                                                Current Plan
                                            </Button>
                                        ) : (
                                            <Button
                                                variant={plan.is_popular ? 'default' : 'secondary'}
                                                className="w-full text-xs font-semibold"
                                            >
                                                Switch to {plan.name}
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Algerian Payment Methods & Invoices History */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Payment methods */}
                    <div className="md:col-span-5 space-y-4">
                        <Card className="border border-border/80 shadow-xs">
                            <CardHeader className="pb-3 border-b border-border/60">
                                <CardTitle className="text-sm font-semibold tracking-tight">
                                    Supported Algerian Payments
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-3 text-xs">
                                <div className="p-3 rounded-xl border border-border/80 bg-muted/20 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">
                                            💳
                                        </div>
                                        <div>
                                            <span className="font-bold text-foreground block">Edahabia & CIB</span>
                                            <span className="text-[10px] text-muted-foreground">Instant online activation</span>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] text-emerald-600">
                                        Active
                                    </Badge>
                                </div>

                                <div className="p-3 rounded-xl border border-border/80 bg-muted/20 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                                            📱
                                        </div>
                                        <div>
                                            <span className="font-bold text-foreground block">BaridiMob Transfer</span>
                                            <span className="text-[10px] text-muted-foreground">RIP: 00799999000123456789</span>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="text-[10px]">
                                        Ready
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Past Invoices */}
                    <div className="md:col-span-7 space-y-4">
                        <Card className="border border-border/80 shadow-xs">
                            <CardHeader className="pb-3 border-b border-border/60">
                                <CardTitle className="text-sm font-semibold tracking-tight">
                                    Billing Invoices History
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 overflow-x-auto">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                        <tr>
                                            <th className="p-3 pl-4 font-semibold">Invoice</th>
                                            <th className="p-3 font-semibold">Date</th>
                                            <th className="p-3 font-semibold">Amount</th>
                                            <th className="p-3 font-semibold">Status</th>
                                            <th className="p-3 pr-4 text-right font-semibold">Receipt</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/60">
                                        {INVOICES.map((inv) => (
                                            <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                                                <td className="p-3 pl-4 font-mono font-bold text-foreground">
                                                    {inv.id}
                                                </td>
                                                <td className="p-3 text-muted-foreground">{inv.date}</td>
                                                <td className="p-3 font-bold text-foreground">{inv.amount}</td>
                                                <td className="p-3">
                                                    <Badge className="bg-emerald-600 text-white text-[10px] py-0">
                                                        Paid
                                                    </Badge>
                                                </td>
                                                <td className="p-3 pr-4 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 text-xs px-2 gap-1 text-primary"
                                                    >
                                                        <Download className="size-3" />
                                                        <span>PDF</span>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </StoreMerchantLayout>
    );
}
