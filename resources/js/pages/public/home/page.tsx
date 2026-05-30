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
    FileText
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

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (searchQuery.trim()) {
            router.get('/search', { search: searchQuery });
        } else {
            router.get('/search');
        }
    };

    return (
        <GuestLayout>
            <Head title="Verified Local Business Directory" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="p-6 space-y-12 bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen">
                
                {/* 1. Hero & Central Search Console Section */}
                <div className="relative rounded-sm overflow-hidden border border-[#262930] bg-gradient-to-tr from-[#0c0d12] via-[#0c0d12] to-[#15171e] p-8 md:p-12">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4318FF]/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#6AD2FF]/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="max-w-3xl space-y-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#4318FF]/15 border border-[#4318FF]/30 text-[10px] font-bold text-[#6AD2FF] uppercase tracking-wider mb-2 animate-pulse">
                            <Sparkles className="h-3 w-3" /> Algeria's Premium Directory
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                            Discover & Connect with <span className="bg-gradient-to-r from-[#4318FF] to-[#6AD2FF] bg-clip-text text-transparent">Verified Businesses</span>
                        </h1>
                        
                        <p className="text-sm text-[#8f9bba] max-w-xl leading-relaxed">
                            Access the platform to find and engage directly with suppliers, manufacturers, contractors, and local businesses in Algeria.
                        </p>

                        {/* Search Console Input */}
                        <form onSubmit={handleSearchSubmit} className="pt-2">
                            <div className="flex flex-col sm:flex-row gap-2 bg-[#111111]/80 p-2 rounded-sm border border-[#262930] backdrop-blur-md">
                                <div className="flex-1 relative">
                                    <Search className="absolute top-3.5 left-3.5 h-4 w-4 text-[#8f9bba]" />
                                    <input
                                        type="text"
                                        placeholder="Search by company name, keywords, or tags..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 text-xs bg-transparent border-0 text-white placeholder-zinc-500 focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-[#4318FF] hover:bg-[#3b15e6] text-white text-xs font-bold rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                >
                                    <span>Search Console</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </form>

                        {/* Quick Suggestions tags */}
                        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                            <span className="text-[#8f9bba] text-[10px] uppercase font-bold tracking-wider">Suggested Searches:</span>
                            {categories.slice(0, 4).map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/search?category=${cat.id}`}
                                    className="px-2.5 py-1 rounded-sm bg-[#111111] border border-[#262930] text-[#8f9bba] hover:text-white hover:border-[#4318FF] transition-all text-[10px] font-semibold"
                                >
                                    {cat.en}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Platform Metrics Stat Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-sm p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-2xl font-black text-white">{stats.businesses.toLocaleString()}+</span>
                            <span className="block text-[10px] text-[#8f9bba] font-bold uppercase tracking-wider">Verified Companies</span>
                        </div>
                        <div className="h-10 w-10 rounded-sm bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center">
                            <Building2 className="h-5 w-5" />
                        </div>
                    </div>
                    
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-sm p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-2xl font-black text-[#6AD2FF]">{stats.reviews.toLocaleString()}+</span>
                            <span className="block text-[10px] text-[#8f9bba] font-bold uppercase tracking-wider">Authentic Reviews</span>
                        </div>
                        <div className="h-10 w-10 rounded-sm bg-[#6AD2FF]/10 text-[#6AD2FF] flex items-center justify-center">
                            <Star className="h-5 w-5 fill-[#6AD2FF]/20" />
                        </div>
                    </div>

                    <div className="bg-[#0c0d12] border border-[#262930] rounded-sm p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-2xl font-black text-[#10b981]">{stats.cities}</span>
                            <span className="block text-[10px] text-[#8f9bba] font-bold uppercase tracking-wider">Algerian Cities</span>
                        </div>
                        <div className="h-10 w-10 rounded-sm bg-[#10b981]/10 text-[#10b981] flex items-center justify-center">
                            <MapPin className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* 3. Core Features / Platform Benefits for Conversion */}
                <div className="space-y-6">
                    <div className="text-center max-w-xl mx-auto space-y-1.5">
                        <h2 className="text-xs font-bold text-[#4318FF] uppercase tracking-widest">Platform Core Benefits</h2>
                        <p className="text-xl font-extrabold text-white">Why Use SoukNet Console?</p>
                        <p className="text-xs text-[#8f9bba]">Designed to build trust between buyers and business providers in Algeria.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Benefit 1 */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-sm p-6 space-y-3 hover:border-zinc-700 transition-all">
                            <div className="h-8 w-8 rounded-sm bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-white">100% Moderated Directory</h3>
                            <p className="text-xs text-[#8f9bba] leading-relaxed">
                                Every registered profile undergoes manual verification by system admins. Look for the blue check verification badge.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-sm p-6 space-y-3 hover:border-zinc-700 transition-all">
                            <div className="h-8 w-8 rounded-sm bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                <MessageSquare className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-white">Direct Lead Channel</h3>
                            <p className="text-xs text-[#8f9bba] leading-relaxed">
                                Connect directly with page owners. Send instant messages or quotes directly from their public profile workspace.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-sm p-6 space-y-3 hover:border-zinc-700 transition-all">
                            <div className="h-8 w-8 rounded-sm bg-[#6AD2FF]/10 text-[#6AD2FF] flex items-center justify-center">
                                <Star className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-white">Genuine Client Feedback</h3>
                            <p className="text-xs text-[#8f9bba] leading-relaxed">
                                Reviews are backed by email validation. Build consumer relationships by replying officially to user reviews.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Browse by Segment Categories Grid */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#262930] pb-2">
                        <h2 className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider flex items-center gap-2">
                            <LayoutGrid className="h-4 w-4 text-[#4318FF]" />
                            Explore by Industry Category
                        </h2>
                        <Link
                            href="/directory"
                            className="text-xs font-bold text-[#4318FF] hover:underline flex items-center gap-1"
                        >
                            Explore Directory
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {categories.map((cat) => {
                            const IconComponent = getCategoryIcon(cat.code);

                            return (
                                <Link
                                    key={cat.id}
                                    href={`/search?category=${cat.id}`}
                                    className="group relative rounded-sm border border-[#262930] bg-[#0c0d12] p-3.5 hover:border-[#4318FF] transition-all flex flex-col justify-between h-24"
                                >
                                    <div
                                        className="h-7 w-7 rounded-sm flex items-center justify-center transition-colors"
                                        style={{ backgroundColor: `${cat.hex_color || '#4318FF'}15` }}
                                    >
                                        <IconComponent
                                            className="h-3.5 w-3.5 transition-transform group-hover:scale-110"
                                            style={{ color: cat.hex_color || '#4318FF' }}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-[#4318FF] transition-colors text-xs truncate">
                                            {cat.en}
                                        </h3>
                                        <span className="text-[9px] text-[#8f9bba] font-bold">
                                            {cat.businesses_count || 0} Listings
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* 5. Featured Listings Widget Panel */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#262930] pb-2">
                        <h2 className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#4318FF]" />
                            Featured & Verified Establishments
                        </h2>
                        <Link
                            href="/search?featured=1"
                            className="text-xs font-bold text-[#4318FF] hover:underline flex items-center gap-1"
                        >
                            View All Premium
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {featuredBusinesses.length === 0 ? (
                        <div className="rounded-sm border border-dashed border-[#262930] p-8 text-center bg-[#0c0d12]/50">
                            <Building2 className="h-8 w-8 text-zinc-650 mx-auto mb-2" />
                            <h3 className="text-xs font-bold text-white">No featured listings currently</h3>
                            <p className="text-[10px] text-[#8f9bba] max-w-xs mx-auto mt-0.5">
                                Featured businesses are pinned here and receive premium exposure badges.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {featuredBusinesses.map((business) => (
                                <div
                                    key={business.id}
                                    className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] rounded-sm overflow-hidden flex flex-col justify-between h-full transition-all group"
                                >
                                    <div>
                                        {/* Header Image */}
                                        <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 border-b border-[#262930]">
                                            {business.photos && business.photos.length > 0 ? (
                                                <img
                                                    src={business.photos[0].path}
                                                    alt={business.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-[#15171e] text-[#8f9bba]">
                                                    <Building2 className="h-6 w-6 opacity-30" />
                                                </div>
                                            )}

                                            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-[#4318FF] text-white text-[9px] font-bold px-2 py-0.5 rounded-xs shadow-sm">
                                                <Sparkles className="h-2 w-2" />
                                                FEATURED
                                            </span>
                                        </div>

                                        <div className="p-4 space-y-2">
                                            <div className="flex items-start justify-between gap-1.5">
                                                <h3 className="font-bold text-white group-hover:text-[#4318FF] transition-colors text-xs line-clamp-1">
                                                    {business.name}
                                                </h3>
                                                {business.is_verified && (
                                                    <CheckCircle className="h-4 w-4 text-[#10b981] shrink-0" />
                                                )}
                                            </div>
                                            {business.tagline && (
                                                <p className="text-[10px] text-[#8f9bba] line-clamp-1 italic">
                                                    {business.tagline}
                                                </p>
                                            )}
                                            {business.description && (
                                                <p className="text-[10px] text-[#8f9bba] line-clamp-2 leading-relaxed">
                                                    {business.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer details */}
                                    <div className="px-4 pb-4 pt-2.5 border-t border-[#262930] flex items-center justify-between text-[10px] text-[#8f9bba]">
                                        <div className="flex items-center gap-1 shrink-0">
                                            <MapPin className="h-3 w-3 text-[#8f9bba]" />
                                            <span>{business.city || 'Algeria'}</span>
                                        </div>
                                        <Link
                                            href={`/directory/${business.slug}`}
                                            className="font-bold text-[#4318FF] hover:underline"
                                        >
                                            Open Details →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 6. High-Converting Bottom Owner Conversion Banner */}
                <div className="relative rounded-sm border border-[#262930] bg-[#0c0d12] p-8 md:p-10 overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#4318FF]/5 rounded-full blur-[80px] pointer-events-none" />
                    
                    <div className="space-y-2 max-w-xl">
                        <div className="inline-flex items-center gap-1 bg-[#10b981]/10 text-[#10b981] text-[9px] font-bold px-2 py-0.5 rounded-xs border border-[#10b981]/25 uppercase tracking-wider">
                            For Business Owners
                        </div>
                        <h2 className="text-lg md:text-xl font-bold text-white">Own a business listing in Algeria?</h2>
                        <p className="text-xs text-[#8f9bba] leading-relaxed">
                            Register a new business or claim an existing page to respond to user comments, review messages from prospects, and track console search hits.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto text-center block px-6 py-3 bg-[#4318FF] hover:bg-[#3b15e6] text-white text-xs font-bold rounded-sm transition-all shadow-lg"
                        >
                            Register Company Profile
                        </Link>
                        <Link
                            href="/login"
                            className="w-full sm:w-auto text-center block px-6 py-3 bg-[#15171e] hover:bg-[#22252e] text-white border border-[#262930] rounded-sm text-xs font-bold transition-all"
                        >
                            Console Login
                        </Link>
                    </div>
                </div>

            </div>
        </GuestLayout>
    );
}
