import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Percent,
    Tag,
    Plus,
    Calendar,
    Check,
    Clock,
    Copy,
    Trash2,
    Edit2,
    Users,
    Package,
    Flame,
    Sparkles,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface DiscountCoupon {
    id: string;
    code: string;
    type: 'percentage' | 'fixed_dzd' | 'free_shipping';
    value: number;
    usage_count: number;
    usage_limit?: number;
    min_order_dzd?: number;
    status: 'active' | 'expired' | 'disabled';
    expires_at: string;
}

const INITIAL_COUPONS: DiscountCoupon[] = [
    {
        id: 'coup_1',
        code: 'SOUK10',
        type: 'percentage',
        value: 10,
        usage_count: 87,
        usage_limit: 500,
        min_order_dzd: 3000,
        status: 'active',
        expires_at: '2026-12-31',
    },
    {
        id: 'coup_2',
        code: 'RAMADAN500',
        type: 'fixed_dzd',
        value: 500,
        usage_count: 142,
        usage_limit: 200,
        min_order_dzd: 5000,
        status: 'active',
        expires_at: '2026-04-15',
    },
    {
        id: 'coup_3',
        code: 'FREEDZ',
        type: 'free_shipping',
        value: 400,
        usage_count: 64,
        status: 'active',
        expires_at: '2026-06-01',
    },
    {
        id: 'coup_4',
        code: 'WELCOME',
        type: 'percentage',
        value: 15,
        usage_count: 310,
        usage_limit: 300,
        status: 'expired',
        expires_at: '2026-02-01',
    },
];

export default function StoreMerchantDiscountPromotions() {
    const [coupons, setCoupons] = useState<DiscountCoupon[]>(INITIAL_COUPONS);
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // New Coupon State
    const [newCode, setNewCode] = useState('');
    const [newType, setNewType] = useState<'percentage' | 'fixed_dzd' | 'free_shipping'>('percentage');
    const [newValue, setNewValue] = useState('10');
    const [newMinOrder, setNewMinOrder] = useState('3000');

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 1800);
    };

    const handleCreateCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCode.trim()) return;

        const coupon: DiscountCoupon = {
            id: `coup_${Date.now()}`,
            code: newCode.trim().toUpperCase(),
            type: newType,
            value: Number(newValue),
            usage_count: 0,
            min_order_dzd: Number(newMinOrder),
            status: 'active',
            expires_at: '2026-12-31',
        };

        setCoupons([coupon, ...coupons]);
        setNewCode('');
        setIsCreateOpen(false);
    };

    const handleDelete = (id: string) => {
        setCoupons(coupons.filter((c) => c.id !== id));
    };

    return (
        <StoreMerchantLayout activeNav="discounts" title="Coupons & Promotions">
            <Head title="Discounts & Promos - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Discount Codes & Pack Promotions
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Create coupon codes, bundle incentives (Buy 2 Get Free Shipping), and flash sales.
                        </p>
                    </div>

                    <Button
                        onClick={() => setIsCreateOpen(!isCreateOpen)}
                        className="gap-2 h-9 text-xs font-semibold shadow-xs"
                    >
                        <Plus className="size-3.5" />
                        <span>Create Promo Code</span>
                    </Button>
                </div>

                {/* Create Coupon Drawer/Form */}
                {isCreateOpen && (
                    <Card className="border-2 border-primary/20 bg-card shadow-md animate-in slide-in-from-top-3 duration-150">
                        <CardHeader className="pb-3 border-b border-border/60">
                            <CardTitle className="text-sm font-semibold tracking-tight">New Promo Code</CardTitle>
                            <CardDescription className="text-xs">
                                Define discount type, value, and eligibility for 1-click COD checkout.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-5">
                            <form onSubmit={handleCreateCoupon} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">Coupon Code (Uppercase)</Label>
                                        <Input
                                            required
                                            placeholder="e.g. SUMMER26"
                                            value={newCode}
                                            onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                                            className="h-9 text-xs font-mono font-bold uppercase"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">Discount Type</Label>
                                        <select
                                            value={newType}
                                            onChange={(e) =>
                                                setNewType(
                                                    e.target.value as 'percentage' | 'fixed_dzd' | 'free_shipping',
                                                )
                                            }
                                            className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs cursor-pointer"
                                        >
                                            <option value="percentage">Percentage Off (%)</option>
                                            <option value="fixed_dzd">Fixed Amount (DZD)</option>
                                            <option value="free_shipping">Free Shipping</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">
                                            {newType === 'percentage' ? 'Percentage Value (%)' : 'Amount (DZD)'}
                                        </Label>
                                        <Input
                                            type="number"
                                            required
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)}
                                            className="h-9 text-xs font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsCreateOpen(false)}
                                        className="h-8 text-xs"
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" size="sm" className="h-8 text-xs font-semibold">
                                        Activate Code
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Algerian Multi-Pack Booster Banner */}
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Sparkles className="size-5" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-foreground">
                                High-Converting Pack Offers are Active on Storefront
                            </h4>
                            <p className="text-[11px] text-muted-foreground">
                                Customers ordering <strong>2+ pairs</strong> automatically receive free delivery in all 58 wilayas, increasing your basket average by <strong>42%</strong>.
                            </p>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-xs text-emerald-700 dark:text-emerald-300 border-emerald-500/30 font-semibold shrink-0">
                        Auto-Applied
                    </Badge>
                </div>

                {/* Coupons Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Active Promo Codes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Code</th>
                                    <th className="p-3.5 font-semibold">Discount</th>
                                    <th className="p-3.5 font-semibold">Min. Basket</th>
                                    <th className="p-3.5 font-semibold">Usage</th>
                                    <th className="p-3.5 font-semibold">Status</th>
                                    <th className="p-3.5 font-semibold">Expires</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {coupons.map((coupon) => (
                                    <tr key={coupon.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono font-bold text-sm text-foreground">
                                                    {coupon.code}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopy(coupon.code)}
                                                    className="text-muted-foreground hover:text-foreground"
                                                    title="Copy code"
                                                >
                                                    {copiedCode === coupon.code ? (
                                                        <Check className="size-3 text-emerald-500" />
                                                    ) : (
                                                        <Copy className="size-3" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-3.5 font-semibold text-foreground">
                                            {coupon.type === 'percentage' && `${coupon.value}% Off`}
                                            {coupon.type === 'fixed_dzd' && `${coupon.value.toLocaleString()} DZD Off`}
                                            {coupon.type === 'free_shipping' && 'Free Delivery'}
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">
                                            {coupon.min_order_dzd
                                                ? `${coupon.min_order_dzd.toLocaleString()} DZD`
                                                : 'No minimum'}
                                        </td>
                                        <td className="p-3.5 font-mono">
                                            {coupon.usage_count}
                                            {coupon.usage_limit && ` / ${coupon.usage_limit}`}
                                        </td>
                                        <td className="p-3.5">
                                            {coupon.status === 'active' && (
                                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                                    Active
                                                </Badge>
                                            )}
                                            {coupon.status === 'expired' && (
                                                <Badge variant="secondary" className="text-[10px] text-muted-foreground">
                                                    Expired
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 text-muted-foreground font-mono">
                                            {coupon.expires_at}
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(coupon.id)}
                                                className="text-muted-foreground hover:text-red-500 p-1"
                                                title="Delete coupon"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </StoreMerchantLayout>
    );
}
