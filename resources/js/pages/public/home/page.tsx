import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    MapPin,
    Star,
    Sparkles,
    CheckCircle,
    Building2,
    Laptop,
    Car,
    Utensils,
    Heart,
    Hotel,
    Home as HomeIcon,
    ShoppingBag,
    Wrench,
    GraduationCap,
    Clapperboard,
    ArrowRight,
    TrendingUp,
    ShieldCheck,
    Users,
    LayoutGrid,
    Target,
    Zap,
    Briefcase,
    MessageSquare,
    Quote,
    Check,
    FileText,
    ChevronDown,
    ChevronUp,
    CheckCircle2
} from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/guest-layout';

interface Category {
    id: number;
    code: string;
    en: string;
    fr: string | null;
    ar: string | null;
    icon: string | null;
    hex_color: string | null;
    businesses_count?: number;
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
    reviews_avg_rating: number | null;
    reviews_count: number;
}

interface HomeProps {
    categories: Category[];
    featuredBusinesses: Business[];
    stats: {
        businesses: number;
        reviews: number;
        cities: number;
    };
}

const getCategoryIcon = (code: string) => {
    switch (code.toLowerCase()) {
        case 'automotive':
            return Car;
        case 'beauty':
            return Sparkles;
        case 'education':
            return GraduationCap;
        case 'entertainment':
            return Clapperboard;
        case 'food':
            return Utensils;
        case 'health':
            return Heart;
        case 'hotel':
            return Hotel;
        case 'real-estate':
            return HomeIcon;
        case 'retail':
            return ShoppingBag;
        case 'services':
            return Wrench;
        case 'technology':
        case 'tech':
            return Laptop;
        default:
            return Building2;
    }
};

export default function Home({ categories, featuredBusinesses, stats }: HomeProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
        0: true, // open first by default
    });

    const toggleFaq = (index: number) => {
        setFaqOpen(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/search', { search: searchQuery });
        } else {
            router.get('/search');
        }
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (emailInput.trim()) {
            router.get('/register', { email: emailInput });
        }
    };

    return (
        <GuestLayout>
            <Head title="Verified Local Business Directory" />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Outfit',_sans-serif] selection:bg-[#4318FF] selection:text-white">

                {/* 1. HERO SECTION (Iridescent Neon Dark Canvas) */}
                <div
                    className="relative overflow-hidden pt-20 pb-24 px-6 text-center border-b border-[#262930]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(67, 24, 255, 0.25), rgba(106, 210, 255, 0.08) 35%, rgba(21, 23, 30, 1) 75%)',
                        backgroundPosition: 'top center',
                        backgroundSize: '100% 100%'
                    }}
                >
                    {/* Dark ambient glows */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4318FF]/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#6AD2FF]/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4318FF]/15 border border-[#4318FF]/30 text-[10px] font-bold text-[#6AD2FF] uppercase tracking-widest">
                            <Sparkles className="h-3.5 w-3.5 text-[#6AD2FF]" /> Verified Algerian Directory
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
                            Your next 10 customers<br />are already in <span className="underline decoration-[#4318FF] decoration-wavy">SoukNet</span>
                        </h1>

                        <p className="text-[#8f9bba] text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
                            Search and target over 10,000+ verified Algerian manufacturers, suppliers, and distributors instantly. Start your pipeline today.
                        </p>

                        {/* Centered Search console */}
                        <form onSubmit={handleSearchSubmit} className="pt-2 max-w-lg mx-auto">
                            <div className="flex bg-[#0c0d12] p-1.5 rounded-full border border-[#262930] shadow-xl shadow-black/40 focus-within:border-zinc-550 focus-within:ring-4 focus-within:ring-[#4318FF]/30 transition-all">
                                <div className="flex-1 relative flex items-center pl-3">
                                    <Search className="h-4.5 w-4.5 text-zinc-500 mr-2 shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Enter company, category, or city..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full text-xs bg-transparent border-0 text-white placeholder-zinc-550 focus:outline-none focus:ring-0 py-2.5"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-full transition-colors flex items-center gap-1.5"
                                >
                                    <span>Search</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </form>

                        {/* Sign in OAuth Badges */}
                        <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
                            <Link
                                href="/register"
                                className="flex items-center gap-2 px-4 py-2 border border-[#262930] hover:border-zinc-700 bg-[#0c0d12] rounded-lg text-xs font-bold text-zinc-300 transition-all active:scale-98 shadow-sm"
                            >
                                <span className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center text-[9px] text-white font-black">G</span>
                                Sign up with Google
                            </Link>
                            <Link
                                href="/register"
                                className="flex items-center gap-2 px-4 py-2 border border-[#262930] hover:border-zinc-700 bg-[#0c0d12] rounded-lg text-xs font-bold text-zinc-300 transition-all active:scale-98 shadow-sm"
                            >
                                <span className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-[9px] text-white font-black">M</span>
                                Sign up with Microsoft
                            </Link>
                        </div>

                        {/* Certifications row */}
                        <div className="flex justify-center items-center gap-8 pt-8 text-[11px] font-bold text-[#8f9bba] tracking-wider uppercase">
                            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> TOP RATED</span>
                            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> SOC 2 CERTIFIED</span>
                            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> GDPR COMPLIANT</span>
                        </div>
                    </div>
                </div>

                {/* 3. FEATURES GRID ("In 60 seconds, you'll have access to") */}
                <div className="py-20 max-w-6xl mx-auto px-6 space-y-12">
                    <div className="text-center space-y-2">
                        <span className="text-xs font-bold text-[#4318FF] uppercase tracking-widest">INSTANT VALUE</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            In 60 seconds, you'll have access to:
                        </h2>
                        <p className="text-[#8f9bba] text-xs md:text-sm font-light">
                            Unlock verified insights and connect with companies inside our dynamic console database.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-[#262930] rounded-xl p-8 bg-[#0c0d12] hover:border-zinc-700 transition-all duration-300 space-y-4">
                            <div className="h-10 w-10 bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center rounded-lg">
                                <Building2 className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-white text-base">Largest B2B Directory</h3>
                            <p className="text-xs text-[#8f9bba] font-light leading-relaxed">
                                Access detailed business directories with industry classification tags, founded years, and physical addresses in Algeria.
                            </p>
                        </div>

                        <div className="border border-[#262930] rounded-xl p-8 bg-[#0c0d12] hover:border-zinc-700 transition-all duration-300 space-y-4">
                            <div className="h-10 w-10 bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center rounded-lg">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-white text-base">Direct Lead Engagement</h3>
                            <p className="text-xs text-[#8f9bba] font-light leading-relaxed">
                                Send direct inquiry forms, message requests, and schedule meetings with verified profile owners in a few clicks.
                            </p>
                        </div>

                        <div className="border border-[#262930] rounded-xl p-8 bg-[#0c0d12] hover:border-zinc-700 transition-all duration-300 space-y-4">
                            <div className="h-10 w-10 bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center rounded-lg">
                                <Zap className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-white text-base">Rich Data Enrichment</h3>
                            <p className="text-xs text-[#8f9bba] font-light leading-relaxed">
                                Instantly search emails, websites, phone contacts, and catalogs with dynamic filter options to qualify prospects.
                            </p>
                        </div>

                        <div className="border border-[#262930] rounded-xl p-8 bg-[#0c0d12] hover:border-zinc-700 transition-all duration-300 space-y-4">
                            <div className="h-10 w-10 bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center rounded-lg">
                                <Target className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-white text-base">Verified Badging</h3>
                            <p className="text-xs text-[#8f9bba] font-light leading-relaxed">
                                Identify safe organizations with verification seals. Rest easy knowing entries are verified by SoukNet admins.
                            </p>
                        </div>

                        <div className="border border-[#262930] rounded-xl p-8 bg-[#0c0d12] hover:border-zinc-700 transition-all duration-300 space-y-4">
                            <div className="h-10 w-10 bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center rounded-lg">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-white text-base">Real-Time Search</h3>
                            <p className="text-xs text-[#8f9bba] font-light leading-relaxed">
                                Run advanced search filters by category tags, locations, claims status, and reviews scores in real time.
                            </p>
                        </div>

                        <div className="border border-[#262930] rounded-xl p-8 bg-[#0c0d12] hover:border-zinc-700 transition-all duration-300 space-y-4">
                            <div className="h-10 w-10 bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center rounded-lg">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-white text-base">Security & Authentication</h3>
                            <p className="text-xs text-[#8f9bba] font-light leading-relaxed">
                                Complete password, two-factor, and email authentication systems keep directory claims fully secure.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. PRODUCT SHOWCASE SECTION WITH MOCKUP */}
                <div className="bg-[#0c0d12]/60 py-20 border-y border-[#262930]">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="text-xs font-bold text-[#4318FF] uppercase tracking-widest">ADVANCED CONSOLE QUERY</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                30 seconds from now, you'll be searching 10,000+ companies
                            </h2>
                            <p className="text-[#8f9bba] text-sm font-light leading-relaxed">
                                Filter businesses by category segments, location hubs, and claim status. Export target profiles and trigger immediate engagement campaigns.
                            </p>

                            <ul className="space-y-3 pt-2">
                                <li className="flex items-center gap-2.5 text-xs text-zinc-300">
                                    <span className="h-5.5 w-5.5 rounded-full bg-[#4318FF]/15 text-[#6AD2FF] flex items-center justify-center shrink-0">✓</span>
                                    <span>Target verified manufacturing facilities in Algiers & Oran.</span>
                                </li>
                                <li className="flex items-center gap-2.5 text-xs text-zinc-300">
                                    <span className="h-5.5 w-5.5 rounded-full bg-[#4318FF]/15 text-[#6AD2FF] flex items-center justify-center shrink-0">✓</span>
                                    <span>Export direct emails, phone numbers, and official websites.</span>
                                </li>
                                <li className="flex items-center gap-2.5 text-xs text-zinc-300">
                                    <span className="h-5.5 w-5.5 rounded-full bg-[#4318FF]/15 text-[#6AD2FF] flex items-center justify-center shrink-0">✓</span>
                                    <span>Track and reply to user reviews on your claimed business dashboard.</span>
                                </li>
                                <li className="flex items-center gap-2.5 text-xs text-zinc-300">
                                    <span className="h-5.5 w-5.5 rounded-full bg-[#4318FF]/15 text-[#6AD2FF] flex items-center justify-center shrink-0">✓</span>
                                    <span>Review metrics, search console impressions, and lead hits.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Interactive UI Mockup Card */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-2xl p-6 shadow-xl shadow-black/50 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#262930] pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                    <span className="text-[10px] text-zinc-500 font-mono ml-2">souknet.com/console</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-2 py-0.5 rounded bg-[#4318FF] text-white text-[9px] font-bold">Active Hub</span>
                                    <span className="px-2 py-0.5 rounded bg-[#6AD2FF]/10 text-[#6AD2FF] text-[9px] font-bold">10k+ Lists</span>
                                </div>
                            </div>

                            {/* Filters row mock */}
                            <div className="flex flex-wrap gap-2 text-[10px] text-zinc-400 font-semibold">
                                <span className="px-2.5 py-1 rounded bg-[#22252e] text-white cursor-pointer">✓ All Companies</span>
                                <span className="px-2.5 py-1 rounded border border-[#262930] bg-[#0c0d12] hover:border-zinc-700 cursor-pointer">Manufacturers</span>
                                <span className="px-2.5 py-1 rounded border border-[#262930] bg-[#0c0d12] hover:border-zinc-700 cursor-pointer">Tech Services</span>
                                <span className="px-2.5 py-1 rounded border border-[#262930] bg-[#0c0d12] hover:border-zinc-700 cursor-pointer">Verified Hub</span>
                            </div>

                            {/* Simulated Leads List */}
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between p-3 border border-[#262930] rounded-xl bg-[#15171e]/50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 bg-[#22252e] rounded-lg flex items-center justify-center text-xs font-bold text-[#8f9bba]">C</div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white flex items-center gap-1">
                                                Cevital Spa <CheckCircle className="h-3 w-3 text-emerald-500" />
                                            </h4>
                                            <p className="text-[10px] text-[#8f9bba]">Food & Agribusiness • Bejaia, Algeria</p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 bg-white hover:bg-zinc-200 text-black text-[10px] font-bold rounded-lg transition-colors">
                                        Engage
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-3 border border-[#262930] rounded-xl bg-[#15171e]/50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 bg-[#22252e] rounded-lg flex items-center justify-center text-xs font-bold text-[#8f9bba]">Y</div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white flex items-center gap-1">
                                                Yassir Technologies <CheckCircle className="h-3 w-3 text-emerald-500" />
                                            </h4>
                                            <p className="text-[10px] text-[#8f9bba]">Tech & Transport • Algiers, Algeria</p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 bg-white hover:bg-zinc-200 text-black text-[10px] font-bold rounded-lg transition-colors">
                                        Engage
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-3 border border-[#262930] rounded-xl bg-[#15171e]/50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 bg-[#22252e] rounded-lg flex items-center justify-center text-xs font-bold text-[#8f9bba]">C</div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">Condor Electronics</h4>
                                            <p className="text-[10px] text-[#8f9bba]">Consumer Goods • Bordj Bou Arreridj</p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 bg-white hover:bg-zinc-200 text-black text-[10px] font-bold rounded-lg transition-colors">
                                        Engage
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. CUSTOMER QUOTE & METRICS SECTION */}
                <div className="py-20 max-w-6xl mx-auto px-6 space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        <div className="lg:col-span-2 space-y-4">
                            <Quote className="h-10 w-10 text-[#4318FF]/20" />
                            <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                                "Every procurement rep is more productive with SoukNet. We booked 75% more supplier meetings while cutting manual sourcing search time in half."
                            </p>
                        </div>
                        <div className="pt-6 lg:pt-12 border-t lg:border-t-0 lg:border-l border-[#262930] lg:pl-10 space-y-1">
                            <h4 className="font-extrabold text-white text-sm">Amine Bensmail</h4>
                            <p className="text-xs text-[#8f9bba]">Director of Sourcing, Cevital Logistics</p>
                            <span className="inline-block mt-2 font-black text-[#6AD2FF] text-xs tracking-widest">CEVITAL GROUP</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#262930]">
                        <div className="space-y-1">
                            <span className="block text-4xl md:text-5xl font-black text-[#4318FF] tracking-tight">70%</span>
                            <h4 className="font-bold text-white text-sm">More Meetings booked</h4>
                            <p className="text-xs text-[#8f9bba] font-light">Sales teams scale outreach inside verified company circles.</p>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-4xl md:text-5xl font-black text-[#6AD2FF] tracking-tight">4x</span>
                            <h4 className="font-bold text-white text-sm">Pipeline growth rate</h4>
                            <p className="text-xs text-[#8f9bba] font-light">Higher conversion with double-opt-in validated channels.</p>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-4xl md:text-5xl font-black text-emerald-500 tracking-tight">64%</span>
                            <h4 className="font-bold text-white text-sm">Manual work cut in half</h4>
                            <p className="text-xs text-[#8f9bba] font-light">Verified profiles mean no cold directory search dead ends.</p>
                        </div>
                    </div>
                </div>

                {/* 6. FREQUENTLY ASKED QUESTIONS SECTION */}
                <div className="py-20 bg-[#0c0d12]/40 border-t border-[#262930]">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-extrabold text-white tracking-tight">Frequently asked questions</h2>
                            <p className="text-[#8f9bba] text-xs md:text-sm font-light">
                                Have questions about listings, verification or lead generation packages? We have answers.
                            </p>
                        </div>

                        <div className="lg:col-span-2 space-y-3">
                            {[
                                {
                                    q: "Is the directory directory actually free to use?",
                                    a: "Yes, you can search public verified companies, categories, and locations completely for free. Advanced lead filtering, direct messaging credits, and business claiming require subscribing to a premium plan."
                                },
                                {
                                    q: "How accurate is the contact details data?",
                                    a: "Our data operations team manually reviews every registered corporate profile. Verification checks verify the domain registry, active commercial registration number, and primary phone contacts."
                                },
                                {
                                    q: "Do I need to submit an active trade registry?",
                                    a: "To claim a business listing and obtain the verified green badge, you must upload a digital copy of your trade registry document ('Registre du Commerce') inside the owner dashboard."
                                },
                                {
                                    q: "How long does verification take?",
                                    a: "Manual reviews are usually resolved within 24 to 48 business hours. You'll receive a system notification and an official email confirmation."
                                },
                                {
                                    q: "Is SoukNet compliant with GDPR regulations?",
                                    a: "Absolutely. All public records, review moderation, and database emails align with privacy laws and compliance frameworks."
                                }
                            ].map((item, idx) => {
                                const isOpen = !!faqOpen[idx];
                                return (
                                    <div key={idx} className="border-b border-[#262930] pb-3">
                                        <button
                                            onClick={() => toggleFaq(idx)}
                                            className="w-full flex items-center justify-between text-left py-3 text-sm font-bold text-white focus:outline-none"
                                        >
                                            <span>{item.q}</span>
                                            {isOpen ? <ChevronUp className="h-4 w-4 text-[#8f9bba]" /> : <ChevronDown className="h-4 w-4 text-[#8f9bba]" />}
                                        </button>
                                        {isOpen && (
                                            <p className="text-xs text-[#8f9bba] font-light leading-relaxed pb-3 pt-1">
                                                {item.a}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 7. BOTTOM CTA SECTION (Conserving Theme, Glowing Dark Banner) */}
                <div className="relative py-20 text-center overflow-hidden border-t border-[#262930] bg-[#0c0d12]">
                    {/* Wavy iridescent shapes in BG */}
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#4318FF]/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#6AD2FF]/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="max-w-3xl mx-auto space-y-6 relative z-10 px-6">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white animate-pulse">
                            Your pipeline is one free<br />signup away.
                        </h2>

                        <form onSubmit={handleEmailSubmit} className="pt-4 max-w-md mx-auto">
                            <div className="flex bg-[#15171e] p-1 rounded-lg border border-[#262930] shadow-lg">
                                <input
                                    type="email"
                                    placeholder="Enter your work email..."
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    className="flex-1 text-xs bg-transparent border-0 text-white placeholder-zinc-550 focus:outline-none focus:ring-0 py-2.5 px-3"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-md transition-colors"
                                >
                                    Start for free
                                </button>
                            </div>
                        </form>

                        <div className="flex justify-center items-center gap-6 pt-4 text-xs font-bold text-[#8f9bba]">
                            <span className="cursor-pointer hover:text-white transition-colors">Google Signup</span>
                            <span>•</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Microsoft Signup</span>
                        </div>
                    </div>
                </div>

                {/* 8. FOOTER */}
                <footer className="bg-[#0c0d12] text-[#8f9bba] py-16 text-xs border-t border-[#262930]">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
                        {/* Logo column */}
                        <div className="col-span-2 space-y-4">
                            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
                                <span className="flex h-8 w-8 items-center justify-center rounded bg-[#4318FF] text-white text-sm font-black">S</span>
                                <span>SoukNet</span>
                            </div>
                            <p className="text-[#8f9bba]/80 leading-relaxed font-light max-w-xs">
                                The trusted business-to-business registry in Algeria. Connecting validated suppliers, manufacturers, and buyers.
                            </p>
                            <div className="flex gap-3 text-zinc-400 font-bold pt-2">
                                <span className="cursor-pointer hover:text-white transition-colors">LinkedIn</span>
                                <span className="cursor-pointer hover:text-white transition-colors">Twitter</span>
                                <span className="cursor-pointer hover:text-white transition-colors">Facebook</span>
                            </div>
                        </div>

                        {/* Col 2 */}
                        <div className="space-y-3">
                            <h4 className="text-white font-bold uppercase tracking-wider text-[10px]">Product</h4>
                            <ul className="space-y-2 font-light">
                                <li><Link href="/directory" className="hover:text-white transition-colors">Business Search</Link></li>
                                <li><Link href="/pricing-plans" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                                <li><Link href="/register" className="hover:text-white transition-colors">Claim Listing</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">API access</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Release Notes</Link></li>
                            </ul>
                        </div>

                        {/* Col 3 */}
                        <div className="space-y-3">
                            <h4 className="text-white font-bold uppercase tracking-wider text-[10px]">Industries</h4>
                            <ul className="space-y-2 font-light">
                                <li><Link href="/search?category=1" className="hover:text-white transition-colors">Manufacturing</Link></li>
                                <li><Link href="/search?category=2" className="hover:text-white transition-colors">Agribusiness</Link></li>
                                <li><Link href="/search?category=3" className="hover:text-white transition-colors">Retail & Trade</Link></li>
                                <li><Link href="/search?category=4" className="hover:text-white transition-colors">Construction</Link></li>
                                <li><Link href="/search?category=5" className="hover:text-white transition-colors">Tech Services</Link></li>
                            </ul>
                        </div>

                        {/* Col 4 */}
                        <div className="space-y-3">
                            <h4 className="text-white font-bold uppercase tracking-wider text-[10px]">Support</h4>
                            <ul className="space-y-2 font-light">
                                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Data Compliance</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Contact Sales</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 border-t border-[#262930] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-550">
                        <span>© {new Date().getFullYear()} SoukNet, Inc. All rights reserved.</span>
                        <div className="flex gap-4">
                            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Cookies</span>
                        </div>
                    </div>
                </footer>

            </div>
        </GuestLayout>
    );
}
