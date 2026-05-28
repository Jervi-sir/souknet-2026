import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Check,
    X,
    Sparkles,
    HelpCircle,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

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

interface PricingProps {
    plans: Plan[];
}

interface FaqItem {
    question: string;
    answer: string;
}

const FAQS: FaqItem[] = [
    {
        question: 'Can I change my plan later?',
        answer: 'Yes! You can upgrade or downgrade your business subscription plan at any time from your dashboard billing settings. Any price differences will be prorated.',
    },
    {
        question: 'What is a verified badge?',
        answer: 'The verified badge is displayed on your business profile page after our support team verifies the legitimacy of your company license or official registry documents. It increases customer trust.',
    },
    {
        question: 'How do featured listings work?',
        answer: 'Featured listings are pinned near the top of category index grids and directory search results. They receive up to 5x more clicks and user engagement compared to standard listings.',
    },
    {
        question: 'Do you offer custom agency accounts?',
        answer: 'Yes! If you manage multiple store locations or brands, contact our sales support department to arrange bulk pricing discounts and custom white-label layouts.',
    },
];

export default function PricingPlans({ plans }: PricingProps) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setFaqOpenIndex(faqOpenIndex === index ? null : index);
    };

    const getPriceDisplay = (plan: Plan) => {
        const cents = billingCycle === 'monthly' ? plan.price_monthly_cents : plan.price_yearly_cents;
        const price = (cents / 100).toFixed(0);
        return {
            price,
            period: billingCycle === 'monthly' ? '/mo' : '/yr',
        };
    };

    return (
        <GuestLayout>
            <Head title="Simple, Transparent Pricing Plans" />

            <div className="relative overflow-hidden bg-[#0A0A0A] py-16 sm:py-24 text-zinc-100 min-h-screen">
                {/* Background accents */}
                <div className="absolute top-[-10%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <Badge
                            variant="secondary"
                            className="bg-indigo-950/40 border-indigo-700/30 text-indigo-300 gap-1.5 py-1 px-3 text-xs"
                        >
                            Plans & Subscriptions
                        </Badge>
                        <h1 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
                            Pricing built for businesses of all sizes
                        </h1>
                        <p className="text-base text-zinc-400">
                            Choose the plan that suits your growth. Unlock advanced analytics, premium exposure, and build trust with verification badges.
                        </p>

                        {/* Billing Switcher Toggle */}
                        <div className="pt-6 flex justify-center items-center gap-3">
                            <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>
                                Monthly Billing
                            </span>
                            <button
                                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                                className="w-12 h-6 bg-zinc-800 rounded-full p-0.5 relative transition-colors border border-[#2E2E2E]"
                            >
                                <div
                                    className={`w-5 h-5 bg-indigo-500 rounded-full transition-transform ${
                                        billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                            <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-white' : 'text-zinc-500'}`}>
                                Yearly Billing
                                <Badge className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] py-0 px-1.5 rounded-full font-bold">
                                    Save 20%
                                </Badge>
                            </span>
                        </div>
                    </div>

                    {/* Plans Comparison Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                        {plans.map((plan) => {
                            const { price, period } = getPriceDisplay(plan);
                            const isPremium = plan.code.toLowerCase() === 'premium' || plan.has_featured;

                            return (
                                <Card
                                    key={plan.id}
                                    className={`relative group h-full flex flex-col justify-between overflow-hidden border-[#1F1F1F] bg-[#111111]/80 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 ${
                                        isPremium
                                            ? 'shadow-[0_0_20px_rgba(99,102,241,0.12)] ring-1 ring-indigo-500/30'
                                            : ''
                                    }`}
                                >
                                    {isPremium && (
                                        <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5" />
                                    )}

                                    <div className="p-6 sm:p-8 space-y-6">
                                        {/* Plan Header */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                                                    {plan.en}
                                                </h3>
                                                {isPremium && (
                                                    <span className="flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                                        <Sparkles className="h-2.5 w-2.5" />
                                                        POPULAR
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-zinc-500 text-xs">
                                                Perfect for local brands and emerging agencies looking to build online visibility.
                                            </p>
                                        </div>

                                        {/* Pricing block */}
                                        <div className="pt-2 border-b border-[#1F1F1F] pb-6 flex items-baseline">
                                            <span className="text-4xl font-extrabold text-white">${price}</span>
                                            <span className="text-zinc-400 text-sm font-medium ml-1">{period}</span>
                                        </div>

                                        {/* Feature checklist */}
                                        <div className="space-y-4 pt-2">
                                            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                                Includes Features:
                                            </h4>
                                            <ul className="space-y-3 text-xs sm:text-sm">
                                                {/* Photos limit */}
                                                <li className="flex items-center gap-2.5 text-zinc-300">
                                                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                                    <span>Up to <strong>{plan.max_photos}</strong> photos gallery</span>
                                                </li>

                                                {/* Analytics */}
                                                <li className={`flex items-center gap-2.5 ${plan.has_analytics ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                                    {plan.has_analytics ? (
                                                        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-zinc-700 shrink-0" />
                                                    )}
                                                    <span>Detailed Profile Analytics</span>
                                                </li>

                                                {/* Featured Badge */}
                                                <li className={`flex items-center gap-2.5 ${plan.has_featured ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                                    {plan.has_featured ? (
                                                        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-zinc-700 shrink-0" />
                                                    )}
                                                    <span>Featured top-listing badge</span>
                                                </li>

                                                {/* Verified Badge */}
                                                <li className={`flex items-center gap-2.5 ${plan.has_verified_badge ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                                    {plan.has_verified_badge ? (
                                                        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-zinc-700 shrink-0" />
                                                    )}
                                                    <span>Verified Identity mark</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <div className="p-6 pt-0 border-t border-[#1F1F1F]/40">
                                        <Link
                                            href="/register"
                                            className={`w-full text-center block rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                                                isPremium
                                                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                                                    : 'bg-[#1C1C1C] border border-[#2E2E2E] hover:bg-zinc-800 text-zinc-200'
                                            }`}
                                        >
                                            Get Started with {plan.en}
                                        </Link>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {/* FAQ accordion section */}
                    <div className="mt-24 border-t border-[#1F1F1F] pt-16 max-w-3xl mx-auto space-y-6">
                        <div className="text-center space-y-2 mb-10">
                            <HelpCircle className="h-8 w-8 text-indigo-400 mx-auto" />
                            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                            <p className="text-xs sm:text-sm text-zinc-400">
                                Got questions about plans or billing? Find quick answers below.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {FAQS.map((faq, index) => {
                                const isOpen = faqOpenIndex === index;
                                return (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-[#1F1F1F] bg-[#111111]/40 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex items-center justify-between p-5 text-left font-semibold text-xs sm:text-sm text-white hover:text-indigo-400 transition-colors"
                                        >
                                            <span>{faq.question}</span>
                                            {isOpen ? (
                                                <ChevronUp className="h-4 w-4 text-zinc-500" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 text-zinc-500" />
                                            )}
                                        </button>
                                        {isOpen && (
                                            <div className="p-5 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-[#1F1F1F]/40">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
