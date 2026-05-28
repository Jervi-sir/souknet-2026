import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Badge } from '@/components/ui/badge';
import {
    MapPin,
    Star,
    Sparkles,
    CheckCircle,
    Building2,
    Calendar,
    Phone,
    Globe,
    Mail,
    Facebook,
    Linkedin,
    Twitter,
    Github,
    Clock,
    Tag as TagIcon,
    ArrowLeft,
    ShieldAlert,
    BarChart3,
    ArrowUpRight,
    TrendingUp,
    MoreHorizontal,
    Plus,
    UserCheck,
    Briefcase,
    ChevronUp,
    ChevronDown,
    Lock,
    Users,
    Layers,
    FileText,
    HelpCircle
} from 'lucide-react';

interface BusinessHour {
    id: number;
    day_of_week: number;
    open_time: string | null;
    close_time: string | null;
    is_closed: boolean;
}

interface Review {
    id: number;
    rating: number;
    body: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
    } | null;
}

interface Tag {
    id: number;
    name: string;
    slug: string;
}

interface Business {
    id: number;
    name: string;
    slug: string;
    tagline: string | null;
    description: string | null;
    founded_year: number | null;
    address: string | null;
    city: string | null;
    country: string;
    phone: string | null;
    email: string | null;
    website: string | null;
    twitter_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    facebook_url: string | null;
    status: string;
    is_featured: boolean;
    is_verified: boolean;
    is_claimed: boolean;
    category: {
        id: number;
        code: string;
        en: string;
        hex_color: string | null;
    } | null;
    photos: Array<{
        id: number;
        path: string;
    }>;
    hours: BusinessHour[];
    tags: Tag[];
    reviews: Review[];
    reviews_avg_rating: number | null;
    reviews_count: number;
}

interface ProfileProps {
    business: Business;
}

export default function BusinessProfile({ business }: ProfileProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'tech' | 'funding' | 'jobs' | 'trends' | 'visitors'>('overview');
    const [contactCollapsed, setContactCollapsed] = useState(false);
    const [aboutCollapsed, setAboutCollapsed] = useState(false);
    const [insightsCollapsed, setInsightsCollapsed] = useState(false);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    return (
        <GuestLayout>
            <Head title={`${business.name} - Profile`} />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen p-4 space-y-4">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 text-xs text-[#8f9bba] px-1">
                    <Link href="/directory" className="hover:text-white transition-colors">People</Link>
                    <span>&gt;</span>
                    <span className="text-[#8f9bba]">{business.name}</span>
                </div>

                {/* Profile Header Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c0d12] border border-[#262930] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#374151] flex items-center justify-center font-bold text-sm text-zinc-100 select-none shrink-0 border border-[#4b5563]">
                            {getInitials(business.name)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-base font-bold text-white tracking-tight">{business.name}</h1>
                                <Briefcase className="h-3.5 w-3.5 text-[#8f9bba]" />
                            </div>
                            <p className="text-xs text-[#8f9bba] mt-0.5">
                                {business.category?.en || 'Laravel'} at <span className="text-[#6AD2FF] hover:underline cursor-pointer">{business.name}</span> • {business.city || 'Algiers'}, {business.country}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="px-3.5 py-1.5 bg-[#15171e] hover:bg-[#22252e] border border-[#262930] text-xs font-bold rounded-lg text-white transition-all flex items-center gap-1">
                            <Plus className="h-3.5 w-3.5 text-[#8f9bba]" />
                            Add to list
                        </button>
                        <button className="px-3.5 py-1.5 bg-[#c6f052] hover:bg-[#b5dc43] text-black text-xs font-black rounded-lg transition-all flex items-center gap-1">
                            <UserCheck className="h-3.5 w-3.5" />
                            Request Email Verification
                        </button>
                    </div>
                </div>

                {/* Columns Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                    
                    {/* Left Pane: Contact info & scores */}
                    <div className="space-y-4">
                        {/* Contact Information card */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#262930]">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">Contact Information</h2>
                                <button onClick={() => setContactCollapsed(!contactCollapsed)}>
                                    {contactCollapsed ? <ChevronDown className="h-4 w-4 text-[#8f9bba]" /> : <ChevronUp className="h-4 w-4 text-[#8f9bba]" />}
                                </button>
                            </div>

                            {!contactCollapsed && (
                                <div className="p-4 space-y-4">
                                    {/* Email Access */}
                                    <div className="flex items-center justify-between gap-3 text-xs">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-6 w-6 rounded-full bg-[#15171e] border border-[#262930] flex items-center justify-center text-zinc-400">
                                                <Mail className="h-3.5 w-3.5" />
                                            </div>
                                            <span className="font-semibold text-zinc-400">••••@••••.com</span>
                                        </div>
                                        <button className="px-3 py-1 bg-[#15171e] border border-[#262930] hover:border-white text-[10px] font-bold rounded-lg text-white flex items-center gap-1 transition-colors">
                                            <Plus className="h-3 w-3" />
                                            Access email
                                        </button>
                                    </div>

                                    {/* Mobile Access */}
                                    <div className="flex items-center justify-between gap-3 text-xs">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-6 w-6 rounded-full bg-[#15171e] border border-[#262930] flex items-center justify-center text-zinc-400">
                                                <Phone className="h-3.5 w-3.5" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-zinc-400 block">(***) ***-****</span>
                                                <span className="text-[9px] text-[#8f9bba]">Mobile • credits</span>
                                            </div>
                                        </div>
                                        <button className="px-3 py-1 bg-[#15171e] border border-[#262930] hover:border-white text-[10px] font-bold rounded-lg text-white flex items-center gap-1 transition-colors">
                                            <Phone className="h-3 w-3 text-[#8f9bba]" />
                                            Access mobile
                                        </button>
                                    </div>

                                    {/* Business Phone Access */}
                                    <div className="flex items-center justify-between gap-3 text-xs border-t border-[#262930]/40 pt-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-6 w-6 rounded-full bg-[#15171e] border border-[#262930] flex items-center justify-center text-zinc-400">
                                                <Building2 className="h-3.5 w-3.5" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-zinc-400 block">No phone number available</span>
                                                <span className="text-[9px] text-[#8f9bba]">Business</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Scores card */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 space-y-3">
                            <span className="text-[10px] text-[#8f9bba] font-bold uppercase tracking-wider block">Scores</span>
                            <div className="bg-[#15171e] p-4 rounded-lg border border-[#262930] flex flex-col items-center justify-center text-center">
                                {/* SVG/CSS Score Dial mock representation */}
                                <div className="relative h-16 w-16 mb-2 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#262930]" />
                                    <div className="absolute inset-2 rounded-full bg-[#0c0d12] border border-[#262930]" />
                                    <BarChart3 className="h-5 w-5 text-zinc-600 relative z-10" />
                                </div>
                                <span className="text-xs font-semibold text-zinc-400">No scores found</span>
                                <button className="mt-2.5 px-3 py-1 bg-[#22252e] hover:bg-[#2c303c] text-[10px] font-bold rounded-lg text-white transition-colors">
                                    Create score
                                </button>
                            </div>
                        </div>

                        {/* DNC Alert banner */}
                        <div className="bg-[#b45309]/10 border border-[#b45309]/30 rounded-xl p-3 flex items-start justify-between gap-2.5">
                            <div className="flex items-start gap-2.5">
                                <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                <div className="text-[10px] text-amber-500 leading-relaxed font-semibold">
                                    Do Not Call (DNC) is not enabled
                                </div>
                            </div>
                            <ChevronDown className="h-3.5 w-3.5 text-amber-500 cursor-pointer" />
                        </div>
                    </div>

                    {/* Right Pane: Company Insights & Detail Board */}
                    <div className="lg:col-span-2 space-y-4">
                        
                        {/* Company Insights panel */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#262930]">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">Company insights</h2>
                                <button onClick={() => setInsightsCollapsed(!insightsCollapsed)}>
                                    {insightsCollapsed ? <ChevronDown className="h-4 w-4 text-[#8f9bba]" /> : <ChevronUp className="h-4 w-4 text-[#8f9bba]" />}
                                </button>
                            </div>

                            {!insightsCollapsed && (
                                <div className="p-4 space-y-4">
                                    {/* Tabs */}
                                    <div className="flex flex-wrap border-b border-[#262930] text-xs gap-1.5">
                                        <button
                                            onClick={() => setActiveTab('overview')}
                                            className={`px-3 py-1.5 font-semibold transition-colors border-b-2 ${
                                                activeTab === 'overview' ? 'border-[#4318FF] text-white' : 'border-transparent text-[#8f9bba] hover:text-white'
                                            }`}
                                        >
                                            Overview
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('news')}
                                            className={`px-3 py-1.5 font-semibold transition-colors border-b-2 ${
                                                activeTab === 'news' ? 'border-[#4318FF] text-white' : 'border-transparent text-[#8f9bba] hover:text-white'
                                            }`}
                                        >
                                            News
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('tech')}
                                            className={`px-3 py-1.5 font-semibold transition-colors border-b-2 ${
                                                activeTab === 'tech' ? 'border-[#4318FF] text-white' : 'border-transparent text-[#8f9bba] hover:text-white'
                                            }`}
                                        >
                                            Technologies <span className="text-[10px] text-zinc-500 font-bold ml-0.5">109</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('funding')}
                                            className={`px-3 py-1.5 font-semibold transition-colors border-b-2 ${
                                                activeTab === 'funding' ? 'border-[#4318FF] text-white' : 'border-transparent text-[#8f9bba] hover:text-white'
                                            }`}
                                        >
                                            Funding <span className="text-[10px] text-zinc-500 font-bold ml-0.5">1</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('jobs')}
                                            className={`px-3 py-1.5 font-semibold transition-colors border-b-2 ${
                                                activeTab === 'jobs' ? 'border-[#4318FF] text-white' : 'border-transparent text-[#8f9bba] hover:text-white'
                                            }`}
                                        >
                                            Job postings
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('trends')}
                                            className={`px-3 py-1.5 font-semibold transition-colors border-b-2 ${
                                                activeTab === 'trends' ? 'border-[#4318FF] text-white' : 'border-transparent text-[#8f9bba] hover:text-white'
                                            }`}
                                        >
                                            Employee trends <span className="text-[10px] text-zinc-500 font-bold ml-0.5">24</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('visitors')}
                                            className={`px-3 py-1.5 font-semibold transition-colors border-b-2 ${
                                                activeTab === 'visitors' ? 'border-[#4318FF] text-white' : 'border-transparent text-[#8f9bba] hover:text-white'
                                            }`}
                                        >
                                            Website visitors
                                        </button>
                                    </div>

                                    {/* Tab Contents */}
                                    <div className="text-xs text-[#8f9bba] space-y-3 pt-1">
                                        {activeTab === 'overview' && (
                                            <>
                                                <div className="flex justify-between items-center py-2 border-b border-[#262930]/30">
                                                    <span>Relevant Jobs</span>
                                                    <span className="text-zinc-500 font-semibold">No relevant jobs</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-[#262930]/30">
                                                    <span>Relevant technology</span>
                                                    <span className="text-zinc-500 font-semibold">No relevant technologies</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span>Recent funding</span>
                                                    <span className="text-zinc-500 font-semibold">No relevant funding</span>
                                                </div>
                                            </>
                                        )}
                                        {activeTab !== 'overview' && (
                                            <div className="text-center py-6 text-zinc-650 border border-dashed border-[#262930] rounded-xl">
                                                No metadata profile record found for this category
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Company Card with Details (e.g. "Laravel") */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#262930]">
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 rounded bg-red-650 flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-sm">
                                        L
                                    </div>
                                    <span className="text-xs font-bold text-white">{business.name}</span>
                                    <span className="bg-[#15171e] text-[10px] text-zinc-500 font-bold px-1.5 py-0.5 rounded border border-[#262930] ml-1">N/A 0</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#8f9bba]">
                                    <MoreHorizontal className="h-4 w-4 hover:text-white cursor-pointer" />
                                    <button onClick={() => setAboutCollapsed(!aboutCollapsed)}>
                                        {aboutCollapsed ? <ChevronDown className="h-4 w-4 text-[#8f9bba]" /> : <ChevronUp className="h-4 w-4 text-[#8f9bba]" />}
                                    </button>
                                </div>
                            </div>

                            {!aboutCollapsed && (
                                <div className="p-4 space-y-4 text-xs">
                                    <div>
                                        <h3 className="font-bold text-white text-xs mb-2">About</h3>
                                        <p className="text-[#8f9bba] leading-relaxed">
                                            {business.description || `${business.name} is a leading organization in Algiers, Algeria. Explore verified profile contact logs and business directories.`}
                                        </p>
                                    </div>

                                    {/* Keywords */}
                                    <div className="space-y-1.5">
                                        <span className="text-[10px] text-[#8f9bba] font-bold uppercase tracking-wider block">Keywords</span>
                                        <div className="flex flex-wrap gap-1.5 items-center">
                                            <span className="bg-[#15171e] border border-[#262930] text-zinc-350 px-2 py-0.5 rounded">php</span>
                                            <span className="bg-[#15171e] border border-[#262930] text-zinc-350 px-2 py-0.5 rounded">php &amp; laravel</span>
                                            <span className="bg-[#15171e] border border-[#262930] text-zinc-350 px-2 py-0.5 rounded">software development</span>
                                            <span className="text-[#6AD2FF] font-bold hover:underline cursor-pointer text-[10px] ml-1">Show all 178 <ChevronDown className="h-3 w-3 inline-block" /></span>
                                        </div>
                                    </div>

                                    {/* Metadata Details Split Grid layout */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 pt-2 border-t border-[#262930]/40">
                                        <div className="space-y-3.5">
                                            <div className="flex items-center justify-between border-b border-[#262930]/20 pb-1.5">
                                                <span className="text-[#8f9bba]">Founded year</span>
                                                <span className="text-white font-bold">{business.founded_year || '2011'}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#262930]/20 pb-1.5">
                                                <span className="text-[#8f9bba]">Revenue</span>
                                                <span className="text-white font-bold">$5.7M</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#262930]/20 pb-1.5">
                                                <span className="text-[#8f9bba]">Industries</span>
                                                <span className="bg-[#15171e] border border-[#262930] text-[#8f9bba] px-2 py-0.5 rounded text-[10px] font-semibold line-clamp-1 max-w-[150px]">
                                                    information technology &amp; se...
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#262930]/20 pb-1.5">
                                                <span className="text-[#8f9bba]">Number of employees</span>
                                                <span className="text-white font-bold flex items-center gap-1.5">
                                                    <Users className="h-3.5 w-3.5 text-zinc-500" />
                                                    200 employees
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#8f9bba]">Annual revenue</span>
                                                <span className="text-white font-bold">$5.7M</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3.5">
                                            <div className="flex items-center justify-between border-b border-[#262930]/20 pb-1.5">
                                                <span className="text-[#8f9bba]">Stage</span>
                                                <span className="bg-[#15171e] border border-[#262930] text-zinc-500 px-2 py-0.5 rounded text-[10px]">No Stage</span>
                                            </div>
                                            <div className="flex items-start justify-between border-b border-[#262930]/20 pb-1.5">
                                                <span className="text-[#8f9bba] shrink-0 mt-0.5">Location</span>
                                                <span className="text-white text-right max-w-[150px] leading-relaxed">
                                                    {business.address || 'Van Buren, Arkansas 72956'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#262930]/20 pb-1.5">
                                                <span className="text-[#8f9bba]">Labels</span>
                                                <span className="text-zinc-500">Not present in any list.</span>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <span className="text-[#8f9bba]">Phone number</span>
                                                <div className="text-right">
                                                    <span className="text-zinc-500 block">No phone number</span>
                                                    <span className="text-[#6AD2FF] font-bold hover:underline cursor-pointer block mt-0.5">Add phone</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
