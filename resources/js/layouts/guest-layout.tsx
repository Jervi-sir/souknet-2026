import { Link, usePage } from '@inertiajs/react';
import { login, register } from '@/routes';
import React, { useState } from 'react';
import {
    Home,
    Sparkles,
    Users,
    Building2,
    List,
    Database,
    Repeat,
    Mail,
    Phone,
    CheckSquare,
    Calendar,
    MessageSquare,
    DollarSign,
    Share2,
    BarChart3,
    Globe,
    FileText,
    Save,
    Menu,
    X,
    Search,
    User,
    ArrowRight,
    Bell,
    Settings,
    ChevronDown,
    ChevronUp,
    Package,
    Briefcase
} from 'lucide-react';

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage().props as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        prospect: true,
        engage: false,
        win: false,
        tools: false,
        inbound: false,
        saved: true
    });

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const sidebarSections = [
        {
            id: 'prospect',
            title: 'Prospect and enrich',
            items: [
                { name: 'People (Directory)', href: '/directory', icon: Users },
                { name: 'Companies (Search)', href: '/search', icon: Building2 },
                { name: 'Products (Browse)', href: '/products', icon: Package },
                { name: 'Jobs (Postings)', href: '/jobs', icon: Briefcase },
                { name: 'Lists', href: '#', icon: List },
                { name: 'Data enrichment', href: '/data-enrichment', icon: Database },
            ]
        },
        {
            id: 'engage',
            title: 'Engage',
            items: [
                { name: 'Sequences', href: '#', icon: Repeat },
                { name: 'Emails', href: '/emails', icon: Mail },
                { name: 'Calls', href: '#', icon: Phone },
                { name: 'Tasks', href: '#', icon: CheckSquare },
            ]
        },
        {
            id: 'win',
            title: 'Win deals',
            items: [
                { name: 'Meetings', href: '#', icon: Calendar },
                { name: 'Conversations', href: '#', icon: MessageSquare },
                { name: 'Deals', href: '#', icon: DollarSign },
            ]
        },
        {
            id: 'tools',
            title: 'Tools and automation',
            items: [
                { name: 'Workflows', href: '#', icon: Share2 },
                { name: 'Analytics', href: '#', icon: BarChart3 },
            ]
        },
        {
            id: 'inbound',
            title: 'Inbound',
            items: [
                { name: 'Website visitors', href: '#', icon: Globe, badge: 'New' },
                { name: 'Forms', href: '#', icon: FileText },
            ]
        },
        {
            id: 'saved',
            title: 'Saved records',
            items: [
                { name: 'Saved People', href: '/search?verified=1', icon: Users },
                { name: 'Saved Companies', href: '/search?featured=1', icon: Building2 },
            ]
        }
    ];

    const isActive = (href: string) => {
        if (href === '#' || href === '') return false;
        if (href === '/') {
            return currentPath === '/';
        }
        return currentPath.startsWith(href.split('?')[0]);
    };

    return (
        <div className="min-h-screen bg-[#15171e] text-zinc-100 antialiased selection:bg-[#4318FF] selection:text-white flex flex-col md:flex-row">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-60 border-r border-[#262930] bg-[#0c0d12] shrink-0 sticky top-0 h-screen select-none">
                {/* Brand Logo */}
                <div className="flex h-12 items-center px-4 border-b border-[#262930] justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
                    >
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-[#4318FF] text-xs font-black text-white shadow-md shadow-indigo-500/20">
                            S
                        </span>
                        <span className="text-white font-extrabold tracking-wide">SoukNet</span>
                    </Link>
                    <Settings className="h-4 w-4 text-[#a3aed0] hover:text-white cursor-pointer transition-colors" />
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 overflow-y-auto py-3 space-y-3 px-2 custom-scrollbar">
                    {/* Home and AI Assistant always visible */}
                    <div className="space-y-0.5">
                        <Link
                            href="/"
                            className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isActive('/')
                                    ? 'bg-[#22252e] text-white font-bold'
                                    : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <Home className="h-4 w-4" />
                                <span>Home</span>
                            </div>
                        </Link>
                        <Link
                            href="#"
                            className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-[#8f9bba] hover:text-white hover:bg-[#15171e]`}
                        >
                            <div className="flex items-center gap-2.5">
                                <Sparkles className="h-4 w-4 text-purple-400" />
                                <span>AI Assistant</span>
                            </div>
                            <span className="bg-[#10b981] text-[#0c0d12] text-[9px] font-bold px-1.5 py-0.5 rounded">New</span>
                        </Link>
                    </div>

                    {/* Section Groups */}
                    {sidebarSections.map((group) => {
                        const isExpanded = expandedSections[group.id];
                        return (
                            <div key={group.id} className="space-y-1">
                                <button
                                    onClick={() => toggleSection(group.id)}
                                    className="flex items-center justify-between w-full px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-zinc-300 transition-colors"
                                >
                                    <span>{group.title}</span>
                                    {isExpanded ? (
                                        <ChevronUp className="h-3 w-3" />
                                    ) : (
                                        <ChevronDown className="h-3 w-3" />
                                    )}
                                </button>

                                {isExpanded && (
                                    <div className="space-y-0.5 pl-1.5">
                                        {group.items.map((item) => {
                                            const Icon = item.icon;
                                            const active = isActive(item.href);
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${active
                                                            ? 'bg-[#22252e] text-white font-bold'
                                                            : 'text-[#8f9bba] hover:text-white hover:bg-[#15171e]'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : 'text-[#8f9bba]'}`} />
                                                        <span>{item.name.split(' (')[0]}</span>
                                                    </div>
                                                    {item.badge && (
                                                        <span className="bg-[#10b981] text-[#0c0d12] text-[9px] font-bold px-1.5 py-0.5 rounded">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Sidebar Footer with Upgrade & Onboarding */}
                <div className="p-3 border-t border-[#262930] bg-[#0c0d12] space-y-3">
                    {/* Onboarding hub progress */}
                    <div className="bg-[#15171e] p-2.5 rounded-xl border border-[#262930] space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold text-[#8f9bba]">
                            <span>Onboarding hub</span>
                            <span className="text-white">4% Completed</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#262930] rounded-full overflow-hidden">
                            <div className="h-full bg-[#10b981] w-[4%]" />
                        </div>
                    </div>

                    {/* Upgrade button */}
                    <Link
                        href="/pricing-plans"
                        className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#c6f052] hover:bg-[#b5dc43] text-black py-2 text-xs font-black transition-colors shadow-lg"
                    >
                        Upgrade
                    </Link>
                </div>
            </aside>

            {/* Mobile Header / Sidebar Toggler */}
            <header className="md:hidden flex h-12 items-center justify-between px-4 border-b border-[#262930] bg-[#0c0d12] sticky top-0 z-40">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-bold text-white"
                >
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[#4318FF] text-xs font-black text-white">
                        S
                    </span>
                    <span>SoukNet</span>
                </Link>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="h-8 w-8 rounded-lg border border-[#262930] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </header>

            {/* Mobile Menu Panel */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-30 bg-[#0c0d12] pt-12 flex flex-col">
                    <nav className="flex-1 space-y-3 p-4 overflow-y-auto">
                        <div className="space-y-1">
                            {sidebarSections.map((group) => (
                                <div key={group.id} className="space-y-1">
                                    <div className="px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                        {group.title}
                                    </div>
                                    <div className="space-y-0.5">
                                        {group.items.map((item) => {
                                            const Icon = item.icon;
                                            const active = isActive(item.href);
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${active
                                                            ? 'bg-[#22252e] text-white font-bold'
                                                            : 'text-[#8f9bba] hover:text-white'
                                                        }`}
                                                >
                                                    <Icon className="h-5 w-5 shrink-0" />
                                                    <span>{item.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-[#262930] mt-6 space-y-3">
                            <Link
                                href="/pricing-plans"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#c6f052] py-3 text-sm font-black text-black shadow-md"
                            >
                                Upgrade
                            </Link>
                        </div>
                    </nav>
                </div>
            )}

            {/* Right side: Header + Main Content Dashboard Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#15171e]">
                {/* Topbar / Header (Search + Auth) */}
                <header className="h-12 border-b border-[#262930] bg-[#0c0d12] sticky top-0 z-30 flex items-center justify-between px-6">
                    {/* Header Search Field */}
                    <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative max-w-sm w-full">
                        <Search className="absolute left-3 h-4 w-4 text-[#8f9bba]" />
                        <input
                            type="text"
                            placeholder="Search across SoukNet..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#15171e] border border-[#262930] rounded-lg pl-9 pr-3 py-1 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF] transition-colors"
                        />
                    </form>
                    <div className="sm:hidden" />

                    {/* Auth links / user status */}
                    <div className="flex items-center gap-3">
                        {auth?.user ? (
                            <Link
                                href="/owner/dashboard"
                                className="flex items-center gap-2 rounded-lg border border-[#262930] bg-[#15171e] px-3.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
                            >
                                <User className="h-3.5 w-3.5 text-[#4318FF]" />
                                <span>Console</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-xs font-semibold text-[#8f9bba] transition-colors hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="rounded-lg bg-[#4318FF] px-3.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-[#3b15e6] shadow-md shadow-indigo-500/10"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        <Bell className="h-4 w-4 text-[#8f9bba] hover:text-white cursor-pointer transition-colors" />
                        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-[#4318FF] to-[#6AD2FF] text-white flex items-center justify-center font-bold text-[10px] shadow-sm select-none">
                            GA
                        </div>
                    </div>
                </header>

                {/* Main Workspace Canvas */}
                <main className="flex-1 relative overflow-y-auto bg-[#15171e]">
                    {children}
                </main>
            </div>
        </div>
    );
}
