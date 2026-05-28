import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
            <Head title="Premium Business Directory" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-32 text-zinc-100 border-b border-[#1F1F1F]">
                {/* Visual accents */}
                <div className="absolute top-[-20%] left-[-20%] h-[40rem] w-[40rem] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-20%] h-[40rem] w-[40rem] rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <Badge
                            variant="secondary"
                            className="bg-indigo-950/40 border-indigo-700/30 text-indigo-300 gap-1.5 py-1 px-3 text-xs"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            Discover Trusted Companies in Algeria
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
                            Find Verified Businesses <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300">
                                You Can Trust
                            </span>
                        </h1>
                        <p className="text-lg text-zinc-400">
                            Search thousands of verified ratings, local addresses, and professional contact platforms across dozens of categories.
                        </p>

                        {/* Hero Search Box */}
                        <form
                            onSubmit={handleSearchSubmit}
                            className="mt-8 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto bg-[#111111]/90 p-2 rounded-xl border border-[#2E2E2E] backdrop-blur-md shadow-2xl"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute top-3 left-3 h-5 w-5 text-zinc-500" />
                                <Input
                                    type="text"
                                    placeholder="Search by company name, tagline, or keywords..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-11 bg-transparent border-0 text-zinc-100 placeholder-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                className="h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 shrink-0"
                            >
                                Search Now
                            </Button>
                        </form>

                        {/* Quick category keywords links */}
                        <div className="pt-4 flex flex-wrap justify-center gap-2 text-xs text-zinc-500">
                            <span>Popular:</span>
                            {categories.slice(0, 4).map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/search?category=${cat.id}`}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    {cat.en}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Counters */}
            <section className="bg-[#111111]/40 border-b border-[#1F1F1F] py-8 text-zinc-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4 border-b md:border-b-0 md:border-r border-[#1F1F1F]">
                            <div className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
                                <Building2 className="h-6 w-6 text-indigo-400" />
                                {stats.businesses}+
                            </div>
                            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
                                Listed Companies
                            </div>
                        </div>

                        <div className="p-4 border-b md:border-b-0 md:border-r border-[#1F1F1F]">
                            <div className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
                                <Star className="h-6 w-6 text-indigo-400" />
                                {stats.reviews}+
                            </div>
                            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
                                Trusted Ratings
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
                                <MapPin className="h-6 w-6 text-indigo-400" />
                                {stats.cities}
                            </div>
                            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
                                Covered Cities
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Browse by Categories */}
            <section className="bg-[#0A0A0A] py-20 text-zinc-100 border-b border-[#1F1F1F]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                Browse by Category
                            </h2>
                            <p className="mt-2 text-zinc-400 max-w-2xl">
                                Find verified service providers and agencies segmented across diverse business industries.
                            </p>
                        </div>
                        <Link
                            href="/directory"
                            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                        >
                            View Directory
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {categories.map((cat) => {
                            const IconComponent = getCategoryIcon(cat.code);
                            return (
                                <Link
                                    key={cat.id}
                                    href={`/search?category=${cat.id}`}
                                    className="group relative rounded-xl border border-[#1F1F1F] bg-[#111111]/60 p-5 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between h-36"
                                    style={{
                                        borderLeftColor: cat.hex_color || '#1F1F1F',
                                        borderLeftWidth: cat.hex_color ? '3px' : '1px',
                                    }}
                                >
                                    <div
                                        className="h-10 w-10 rounded-lg flex items-center justify-center transition-colors"
                                        style={{ backgroundColor: `${cat.hex_color || '#3F3F46'}20` }}
                                    >
                                        <IconComponent
                                            className="h-5 w-5 transition-transform group-hover:scale-110 duration-300"
                                            style={{ color: cat.hex_color || '#A1A1AA' }}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors text-xs sm:text-sm truncate">
                                            {cat.en}
                                        </h3>
                                        <p className="text-[10px] text-zinc-500 mt-0.5">
                                            {cat.businesses_count || 0} listings
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Listings */}
            <section className="bg-[#0A0A0A] py-20 text-zinc-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                Featured Businesses
                            </h2>
                            <p className="mt-2 text-zinc-400 max-w-2xl">
                                Discover outstanding premium listings, handpicked and trusted by the community.
                            </p>
                        </div>
                        <Link
                            href="/search?featured=1"
                            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                        >
                            View All Featured
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {featuredBusinesses.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#2E2E2E] p-12 text-center">
                            <Building2 className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                            <h3 className="font-semibold text-white">No featured listings</h3>
                            <p className="mt-1 text-sm text-zinc-400 max-w-xs mx-auto">
                                Check back later or browse all businesses in our directory database.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredBusinesses.map((business) => (
                                <Card
                                    key={business.id}
                                    className="relative group h-full flex flex-col justify-between overflow-hidden border-[#1F1F1F] bg-[#111111]/80 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <div>
                                        {/* Header Image */}
                                        <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 border-b border-[#1F1F1F]">
                                            {business.photos && business.photos.length > 0 ? (
                                                <img
                                                    src={business.photos[0].path}
                                                    alt={business.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-[#161616] to-[#0A0A0A] text-zinc-600">
                                                    <Building2 className="h-8 w-8 opacity-40" />
                                                </div>
                                            )}

                                            {/* Category */}
                                            {business.category && (
                                                <span
                                                    style={{
                                                        backgroundColor: business.category.hex_color || '#3E3E3E',
                                                        color: '#FFFFFF',
                                                    }}
                                                    className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm opacity-90"
                                                >
                                                    {business.category.en}
                                                </span>
                                            )}

                                            {/* Premium Sparkle badge */}
                                            <span className="absolute top-3 right-3 flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
                                                <Sparkles className="h-2.5 w-2.5" />
                                                FEATURED
                                            </span>
                                        </div>

                                        <div className="p-5 space-y-3">
                                            <div>
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors text-base line-clamp-1">
                                                        {business.name}
                                                    </h3>
                                                    {business.is_verified && (
                                                        <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                                                    )}
                                                </div>
                                                {business.tagline && (
                                                    <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 italic">
                                                        {business.tagline}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                                <div className="flex items-center text-amber-400">
                                                    <Star className="h-3.5 w-3.5 fill-current" />
                                                    <span className="ml-1 text-zinc-200 font-medium">
                                                        {business.reviews_avg_rating
                                                            ? parseFloat(String(business.reviews_avg_rating)).toFixed(1)
                                                            : 'N/A'}
                                                    </span>
                                                </div>
                                                <span>•</span>
                                                <span>{business.reviews_count} reviews</span>
                                            </div>

                                            {/* Description */}
                                            {business.description && (
                                                <p className="text-xs text-zinc-400 line-clamp-2">
                                                    {business.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer details */}
                                    <div className="px-5 pb-5 pt-3 border-t border-[#1F1F1F]/40 flex items-center justify-between text-xs text-zinc-500">
                                        <div className="flex items-center gap-1 shrink-0">
                                            <MapPin className="h-3 w-3 text-zinc-400" />
                                            <span className="line-clamp-1">{business.city || 'Algeria'}</span>
                                        </div>
                                        <Link
                                            href={`/directory/${business.slug}`}
                                            className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-0.5"
                                        >
                                            View Details
                                            <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#111111]/60 py-20 text-zinc-100 border-t border-[#1F1F1F]">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Are you a business owner?
                    </h2>
                    <p className="text-base text-zinc-400 max-w-2xl mx-auto">
                        Grow your online presence and build credibility. Claim or register your business page on SoukNet to publish verified profiles and collect ratings.
                    </p>
                    <div className="flex justify-center gap-4 pt-2">
                        <Link
                            href="/register"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all"
                        >
                            Claim Your Business
                        </Link>
                        <Link
                            href="/directory"
                            className="bg-[#1C1C1C] border border-[#2E2E2E] hover:bg-zinc-800 text-zinc-200 font-semibold px-6 py-2.5 rounded-lg text-sm transition-all"
                        >
                            Explore Directory
                        </Link>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
