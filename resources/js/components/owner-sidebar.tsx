import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Inbox,
    Star,
    CreditCard,
    Settings,
    PlusCircle,
    Home,
    Sparkles,
    ChevronDown,
    ChevronUp,
    Briefcase,
    Users
} from 'lucide-react';
import React, { useState } from 'react';

import { NavUser } from '@/components/nav-user';
import ownerRoute from '@/routes/owner';

export function OwnerSidebar() {
    const { auth } = usePage().props as any;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        manage: true,
        account: true
    });

    const isActive = (href: string) => {
        if (href === '#' || !href) {
return false;
}

        return currentPath.startsWith(href);
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="w-60 border-r border-[#262930] bg-[#0c0d12] flex flex-col justify-between shrink-0 h-screen select-none font-['Inter',_sans-serif]">
            {/* Header / Brand Logo */}
            <div className="flex h-12 items-center px-4 border-b border-[#262930] justify-between">
                <Link
                    href={ownerRoute.dashboard.url()}
                    className="flex items-center gap-2 text-sm font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
                >
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[#4318FF] text-xs font-black text-white shadow-md shadow-indigo-500/20">
                        S
                    </span>
                    <span className="text-white font-extrabold tracking-wide">Console</span>
                </Link>
                <Settings className="h-4 w-4 text-[#8f9bba] hover:text-white cursor-pointer transition-colors" />
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 overflow-y-auto py-3 space-y-3 px-2 custom-scrollbar">
                {/* Home link */}
                <div className="space-y-0.5">
                    <Link
                        href={ownerRoute.dashboard.url()}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isActive(ownerRoute.dashboard.url())
                                ? 'bg-[#22252e] text-white font-bold'
                                : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <Home className="h-4 w-4" />
                            <span>Dashboard</span>
                        </div>
                    </Link>
                </div>

                {/* Section 1: Listings Management */}
                <div className="space-y-1">
                    <button
                        onClick={() => toggleSection('manage')}
                        className="flex items-center justify-between w-full px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-zinc-300 transition-colors"
                    >
                        <span>Manage Listings</span>
                        {expandedSections.manage ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>

                    {expandedSections.manage && (
                        <div className="space-y-0.5 pl-1.5">
                            <Link
                                href={ownerRoute.listings.index.url()}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive(ownerRoute.listings.index.url())
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }}`}
                            >
                                <Briefcase className="h-4 w-4" />
                                <span>My Listings</span>
                            </Link>

                            <Link
                                href={ownerRoute.leads.index.url()}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive(ownerRoute.leads.index.url())
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }}`}
                            >
                                <Inbox className="h-4 w-4" />
                                <span>Leads & Messages</span>
                            </Link>

                            <Link
                                href={ownerRoute.reviews.index.url()}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive(ownerRoute.reviews.index.url())
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }}`}
                            >
                                <Star className="h-4 w-4" />
                                <span>Customer Reviews</span>
                            </Link>

                            <Link
                                href={ownerRoute.jobs.index.url()}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive(ownerRoute.jobs.index.url())
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }}`}
                            >
                                <Briefcase className="h-4 w-4 text-purple-400" />
                                <span>Job Postings</span>
                            </Link>

                            <Link
                                href={ownerRoute.people.index.url()}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive(ownerRoute.people.index.url())
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }}`}
                            >
                                <Users className="h-4 w-4 text-[#6AD2FF]" />
                                <span>Team & Professionals</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Section 2: Account & Settings */}
                <div className="space-y-1">
                    <button
                        onClick={() => toggleSection('account')}
                        className="flex items-center justify-between w-full px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-zinc-300 transition-colors"
                    >
                        <span>Account & Billing</span>
                        {expandedSections.account ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>

                    {expandedSections.account && (
                        <div className="space-y-0.5 pl-1.5">
                            <Link
                                href={ownerRoute.subscriptionBilling.index.url()}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive(ownerRoute.subscriptionBilling.index.url())
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }}`}
                            >
                                <CreditCard className="h-4 w-4" />
                                <span>Subscription</span>
                            </Link>

                            <Link
                                href={ownerRoute.settings.index.url()}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive(ownerRoute.settings.index.url())
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }}`}
                            >
                                <Settings className="h-4 w-4" />
                                <span>Console Settings</span>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Sidebar Footer with Upgrade & Onboarding */}
            <div className="p-3 border-t border-[#262930] bg-[#0c0d12] space-y-3">
                {/* Onboarding hub progress */}
                <div className="bg-[#15171e] p-2.5 rounded-xl border border-[#262930] space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-bold text-[#8f9bba]">
                        <span>Console Setup</span>
                        <span className="text-white">100% Done</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#262930] rounded-full overflow-hidden">
                        <div className="h-full bg-[#10b981] w-[100%]" />
                    </div>
                </div>

                {/* Upgrade Button */}
                <Link
                    href="/owner/subscription-billing"
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#c6f052] hover:bg-[#b5dc43] text-black py-2 text-xs font-black transition-colors shadow-lg"
                >
                    Upgrade Plan
                </Link>

                {/* User Nav */}
                {auth?.user && (
                    <div className="pt-2 border-t border-[#262930]">
                        <NavUser />
                    </div>
                )}
            </div>
        </div>
    );
}

