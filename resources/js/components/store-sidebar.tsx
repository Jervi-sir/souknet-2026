import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    ShoppingBag,
    Star,
    PlusCircle,
    Home,
    Sparkles,
    ChevronDown,
    ChevronUp,
    Briefcase,
    Settings,
    ArrowLeft,
    Paintbrush
} from 'lucide-react';
import React, { useState } from 'react';

import { NavUser } from '@/components/nav-user';

export function StoreSidebar() {
    const { auth } = usePage().props as any;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        manage: true,
        navigation: true
    });

    const isActive = (href: string) => {
        if (href === '#' || !href) {
            return false;
        }
        return currentPath === href || currentPath.startsWith(href + '/');
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Extract current store ID from pathname if managing a specific store (e.g. /stores/12)
    const match = currentPath.match(/^\/stores\/(\d+)/);
    const storeId = match ? match[1] : null;

    return (
        <div className="w-60 border-r border-[#262930] bg-[#0c0d12] flex flex-col justify-between shrink-0 h-screen select-none font-['Inter',_sans-serif]">
            {/* Header / Brand Logo */}
            <div className="flex h-12 items-center px-4 border-b border-[#262930] justify-between">
                <Link
                    href="/stores"
                    className="flex items-center gap-2 text-sm font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
                >
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[#4318FF] text-xs font-black text-white shadow-md shadow-indigo-500/20">
                        S
                    </span>
                    <span className="text-white font-extrabold tracking-wide">Store Builder</span>
                </Link>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 overflow-y-auto py-3 space-y-3 px-2 custom-scrollbar">
                {/* Back to Owner Dashboard */}
                <div className="space-y-0.5">
                    <Link
                        href="/owner/dashboard"
                        className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8f9bba] hover:text-white hover:bg-[#15171e] transition-all"
                    >
                        <div className="flex items-center gap-2.5">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Owner Console</span>
                        </div>
                    </Link>
                </div>

                {/* Section 1: Dashboard Home */}
                <div className="space-y-0.5">
                    <Link
                        href="/stores"
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isActive('/stores') && !storeId
                            ? 'bg-[#22252e] text-white font-bold'
                            : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                            }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <ShoppingBag className="h-4 w-4" />
                            <span>My Stores</span>
                        </div>
                    </Link>
                </div>

                {/* Section 2: Store Specific Management (only shown if managing a store) */}
                {storeId && (
                    <div className="space-y-1 pt-2 border-t border-[#262930]/40">
                        <button
                            onClick={() => toggleSection('manage')}
                            className="flex items-center justify-between w-full px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-zinc-300 transition-colors"
                        >
                            <span>Manage Store</span>
                            {expandedSections.manage ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>

                        {expandedSections.manage && (
                            <div className="space-y-0.5 pl-1.5">
                                <Link
                                    href={`/stores/${storeId}`}
                                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive(`/stores/${storeId}`) && !currentPath.includes('/customize') && !currentPath.includes('/products/create')
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                        }`}
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                    <span>Store Overview</span>
                                </Link>

                                <Link
                                    href={`/stores/${storeId}/customize`}
                                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive(`/stores/${storeId}/customize`)
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                        }`}
                                >
                                    <Paintbrush className="h-4 w-4 text-[#6AD2FF]" />
                                    <span>Theme Editor</span>
                                </Link>

                                <Link
                                    href={`/stores/${storeId}/products/create`}
                                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive(`/stores/${storeId}/products/create`)
                                        ? 'bg-[#22252e] text-white font-bold'
                                        : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                        }`}
                                >
                                    <PlusCircle className="h-4 w-4 text-purple-400" />
                                    <span>Add Product</span>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            {/* Sidebar Footer with User Info */}
            <div className="p-3 border-t border-[#262930] bg-[#0c0d12]">
                {auth?.user && (
                    <div className="pt-2">
                        <NavUser />
                    </div>
                )}
            </div>
        </div>
    );
}
