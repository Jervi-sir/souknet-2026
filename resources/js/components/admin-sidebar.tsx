import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Briefcase,
    Users,
    FolderKanban,
    CreditCard,
    MessageSquare,
    DollarSign,
    Settings,
    Home,
    Sparkles,
    ChevronDown,
    ChevronUp,
    UserCheck
} from 'lucide-react';
import React, { useState } from 'react';

import { NavUser } from '@/components/nav-user';

export function AdminSidebar() {
    const { auth } = usePage().props as any;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        directory: true,
        monetize: true
    });

    const isActive = (href: string) => {
        if (href === '#') {
return false;
}

        if (href === '/admin') {
            return currentPath === '/admin';
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
                    href="/admin"
                    className="flex items-center gap-2 text-sm font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
                >
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[#4318FF] text-xs font-black text-white shadow-md shadow-indigo-500/20">
                        S
                    </span>
                    <span className="text-white font-extrabold tracking-wide">Admin Suite</span>
                </Link>
                <Settings className="h-4 w-4 text-[#8f9bba] hover:text-white cursor-pointer transition-colors" />
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 overflow-y-auto py-3 space-y-3 px-2 custom-scrollbar">
                {/* Home link */}
                <div className="space-y-0.5">
                    <Link
                        href="/admin"
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isActive('/admin')
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

                {/* Section 1: Directory Management */}
                <div className="space-y-1">
                    <button
                        onClick={() => toggleSection('directory')}
                        className="flex items-center justify-between w-full px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-zinc-300 transition-colors"
                    >
                        <span>System Directory</span>
                        {expandedSections.directory ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>

                    {expandedSections.directory && (
                        <div className="space-y-0.5 pl-1.5">
                            <Link
                                href="/admin/businesses"
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive('/admin/businesses')
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }`}
                            >
                                <Briefcase className="h-4 w-4" />
                                <span>Businesses</span>
                            </Link>

                            <Link
                                href="/admin/users"
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive('/admin/users')
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }`}
                            >
                                <Users className="h-4 w-4" />
                                <span>Users Directory</span>
                            </Link>

                            <Link
                                href="/admin/upgrades"
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive('/admin/upgrades')
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }`}
                            >
                                <UserCheck className="h-4 w-4" />
                                <span>Upgrade Requests</span>
                            </Link>

                            <Link
                                href="/admin/categories"
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive('/admin/categories')
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }`}
                            >
                                <FolderKanban className="h-4 w-4" />
                                <span>Categories</span>
                            </Link>

                            <Link
                                href="/admin/reviews"
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive('/admin/reviews')
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }`}
                            >
                                <MessageSquare className="h-4 w-4" />
                                <span>User Reviews</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Section 2: Monetize & Settings */}
                <div className="space-y-1">
                    <button
                        onClick={() => toggleSection('monetize')}
                        className="flex items-center justify-between w-full px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-zinc-300 transition-colors"
                    >
                        <span>Finance & Setup</span>
                        {expandedSections.monetize ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>

                    {expandedSections.monetize && (
                        <div className="space-y-0.5 pl-1.5">
                            <Link
                                href="/admin/plans"
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive('/admin/plans')
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }`}
                            >
                                <CreditCard className="h-4 w-4" />
                                <span>Payment Plans</span>
                            </Link>

                            <Link
                                href="/admin/payments"
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive('/admin/payments')
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }`}
                            >
                                <DollarSign className="h-4 w-4" />
                                <span>Transactions</span>
                            </Link>

                            <Link
                                href="/admin/settings"
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive('/admin/settings')
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }`}
                            >
                                <Settings className="h-4 w-4" />
                                <span>System Settings</span>
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
                        <span>System Health</span>
                        <span className="text-white">99.8% Online</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#262930] rounded-full overflow-hidden">
                        <div className="h-full bg-[#10b981] w-[99.8%]" />
                    </div>
                </div>

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
