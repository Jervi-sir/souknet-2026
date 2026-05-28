import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    Briefcase
} from 'lucide-react';

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
            <Head title="Search & Verify Directory Dashboard" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="p-6 space-y-6 bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen">
                {/* Header Welcome and Monitor */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262930] pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#10b981] tracking-wider uppercase">Live Directory Monitor</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight">
                            Apollo Search Console
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Query, filter, and verify 348K+ local businesses, companies and professionals in Algeria.
                        </p>
                    </div>

                    {/* Stats Panel */}
                    <div className="flex items-center gap-3">
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl px-4 py-2 text-center min-w-[80px]">
                            <span className="block text-base font-black text-white">{stats.businesses}+</span>
                            <span className="text-[9px] text-[#8f9bba] font-bold uppercase">Listed</span>
                        </div>
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl px-4 py-2 text-center min-w-[80px]">
                            <span className="block text-base font-black text-[#4318FF]">{stats.reviews}+</span>
                            <span className="text-[9px] text-[#8f9bba] font-bold uppercase">Reviews</span>
                        </div>
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl px-4 py-2 text-center min-w-[80px]">
                            <span className="block text-base font-black text-[#10b981]">{stats.cities}</span>
                            <span className="text-[9px] text-[#8f9bba] font-bold uppercase">Cities</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard modules */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Module 1: Search Console Widget */}
                    <div className="lg:col-span-2 bg-[#0c0d12] border border-[#262930] rounded-xl p-5 flex flex-col justify-between space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1 text-sm font-bold text-white">
                                <Search className="h-4 w-4 text-[#4318FF]" />
                                Search database
                            </div>
                            <p className="text-xs text-[#8f9bba]">
                                Enter name, keywords, city, or categories to search verified stores or professionals.
                            </p>
                        </div>
                        <form onSubmit={handleSearchSubmit} className="space-y-3">
                            <div className="relative">
                                <Search className="absolute top-3 left-3.5 h-4 w-4 text-[#8f9bba]" />
                                <input
                                    type="text"
                                    placeholder="Type company profile name, tagline or service keyword..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 text-xs bg-[#15171e] border border-[#262930] rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-[#4318FF]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-[#4318FF] hover:bg-[#3b15e6] text-white text-xs font-bold rounded-lg transition-colors"
                            >
                                Query Directory Database
                            </button>
                        </form>

                        {/* Suggested searches */}
                        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                            <span className="text-[#8f9bba]">Suggested:</span>
                            {categories.slice(0, 4).map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/search?category=${cat.id}`}
                                    className="px-2.5 py-1 rounded bg-[#15171e] border border-[#262930] text-[#8f9bba] hover:text-white hover:border-[#4318FF] transition-all text-[10px] font-semibold"
                                >
                                    {cat.en}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Module 2: Claims/Actions widget */}
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-5 flex flex-col justify-between space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1 text-sm font-bold text-white">
                                <Target className="h-4 w-4 text-[#10b981]" />
                                Claim Your Page
                            </div>
                            <p className="text-xs text-[#8f9bba]">
                                Verify ownership of a business to track messages and reviews.
                            </p>
                        </div>
                        <div className="space-y-2 text-xs text-[#8f9bba]">
                            <div className="flex items-center gap-2 font-medium">
                                <CheckCircle className="h-4 w-4 text-[#10b981]" />
                                <span>Get a Verified Identity Tag</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                                <CheckCircle className="h-4 w-4 text-[#10b981]" />
                                <span>Publish active hours & contacts</span>
                            </div>
                        </div>
                        <Link
                            href="/register"
                            className="w-full text-center block py-2 bg-[#15171e] hover:bg-[#22252e] text-white border border-[#262930] rounded-lg text-xs font-bold transition-all"
                        >
                            Register Company Profile
                        </Link>
                    </div>
                </div>

                {/* Categories Widget Panel */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#262930] pb-2">
                        <h2 className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider flex items-center gap-2">
                            <LayoutGrid className="h-4 w-4 text-[#4318FF]" />
                            Browse by Segment Category
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
                                    className="group relative rounded-xl border border-[#262930] bg-[#0c0d12] p-3.5 hover:border-[#4318FF] transition-all flex flex-col justify-between h-24"
                                >
                                    <div
                                        className="h-7 w-7 rounded-lg flex items-center justify-center transition-colors"
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

                {/* Featured Listings Widget Panel */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#262930] pb-2">
                        <h2 className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#4318FF]" />
                            Featured & Verified Agencies
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
                        <div className="rounded-xl border border-dashed border-[#262930] p-8 text-center bg-[#0c0d12]/50">
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
                                    className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] rounded-xl overflow-hidden flex flex-col justify-between h-full transition-all group"
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

                                            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-[#4318FF] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
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
            </div>
        </GuestLayout>
    );
}
