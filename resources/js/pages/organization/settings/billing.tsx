import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    CreditCard,
    CheckCircle2,
    Check,
    Download,
    ArrowUpRight,
    Building2,
    Calendar,
    ShieldCheck,
    AlertCircle,
} from 'lucide-react';
import OrganizationLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const PLANS = [
    {
        id: 'starter',
        name: 'Starter COD',
        price: '3,500 DZD',
        period: 'month',
        stores_included: '1 Store',
        agents_included: '1 Agent',
        description: 'For solopreneurs testing their first product in Algeria.',
        is_current: false,
    },
    {
        id: 'pro',
        name: 'Pro Scale',
        price: '7,900 DZD',
        period: 'month',
        stores_included: 'Up to 5 Stores',
        agents_included: '5 Call Center Seats',
        description: 'Multi-store operations with automated Yalidine & ZR Express dispatch.',
        is_current: true,
        is_popular: true,
    },
    {
        id: 'enterprise',
        name: 'Empire Scale',
        price: '18,500 DZD',
        period: 'month',
        stores_included: 'Unlimited Stores',
        agents_included: 'Unlimited Seats',
        description: 'High-volume brands and logistics distributors.',
        is_current: false,
    },
];

const INVOICES = [
    { id: 'FAC-2026-03', date: '01 Mar 2026', amount: '7,900 DZD', method: 'Edahabia Card', status: 'paid' },
    { id: 'FAC-2026-02', date: '01 Feb 2026', amount: '7,900 DZD', method: 'Edahabia Card', status: 'paid' },
    { id: 'FAC-2026-01', date: '01 Jan 2026', amount: '7,900 DZD', method: 'BaridiMob Transfer', status: 'paid' },
];

export default function OrganizationSettingsBilling() {
    return (
        <OrganizationLayout activeNav="billing" title="Organization Subscription & Billing">
            <Head title="Billing & Invoices - Atlas Commerce Group" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Organization Subscription & Facturation
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Manage subscription across all 3 stores under <strong>Atlas Commerce Group</strong>, payment methods, and tax invoices.
                        </p>
                    </div>
                </div>

                {/* Active Plan Banner */}
                <Card className="border-2 border-primary/20 bg-primary/5 shadow-xs">
                    <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-primary text-primary-foreground text-xs font-semibold">
                                    Current Plan
                                </Badge>
                                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                                    <CheckCircle2 className="size-3" /> Next billing: 01 April 2026
                                </span>
                            </div>
                            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                                Pro Scale • 7,900 DZD / month
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Includes 5 online stores (3 used), 5 call center operators, and multi-courier accounts.
                            </p>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Button size="sm" className="h-9 text-xs font-semibold gap-1.5 shadow-xs">
                                <span>Upgrade Plan</span>
                                <ArrowUpRight className="size-3.5" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Plans Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {PLANS.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`border transition-all flex flex-col justify-between ${
                                plan.is_current
                                    ? 'border-primary ring-2 ring-primary/20 bg-card shadow-md'
                                    : 'border-border/80 bg-card/60'
                            }`}
                        >
                            <CardHeader className="pb-3 border-b border-border/60">
                                <div className="flex justify-between items-center mb-1">
                                    <CardTitle className="text-base font-bold tracking-tight">
                                        {plan.name}
                                    </CardTitle>
                                    {plan.is_popular && (
                                        <Badge className="bg-emerald-600 text-white text-[10px]">
                                            Popular
                                        </Badge>
                                    )}
                                </div>
                                <CardDescription className="text-xs">{plan.description}</CardDescription>
                                <div className="pt-2 text-2xl font-extrabold text-foreground">
                                    {plan.price}{' '}
                                    <span className="text-xs text-muted-foreground font-normal">/ month</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-1.5 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Check className="size-3.5 text-emerald-500" />
                                        <span>{plan.stores_included}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check className="size-3.5 text-emerald-500" />
                                        <span>{plan.agents_included}</span>
                                    </div>
                                </div>

                                <Button
                                    disabled={plan.is_current}
                                    variant={plan.is_current ? 'outline' : 'secondary'}
                                    className="w-full text-xs font-semibold"
                                >
                                    {plan.is_current ? 'Active Plan' : `Switch to ${plan.name}`}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Invoices History Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">
                            Fiscal Invoices (Factures DZD)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Facture N°</th>
                                    <th className="p-3.5 font-semibold">Date</th>
                                    <th className="p-3.5 font-semibold">Amount</th>
                                    <th className="p-3.5 font-semibold">Payment Method</th>
                                    <th className="p-3.5 font-semibold">Status</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Download</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {INVOICES.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-mono font-bold text-foreground">
                                            {inv.id}
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">{inv.date}</td>
                                        <td className="p-3.5 font-bold text-foreground">{inv.amount}</td>
                                        <td className="p-3.5 text-muted-foreground">{inv.method}</td>
                                        <td className="p-3.5">
                                            <Badge className="bg-emerald-600 text-white text-[10px]">
                                                Paid
                                            </Badge>
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
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
        </OrganizationLayout>
    );
}
