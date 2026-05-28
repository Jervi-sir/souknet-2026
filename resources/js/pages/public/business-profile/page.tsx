import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
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
} from 'lucide-react';

interface BusinessHour {
    id: number;
    day_of_week: number; // 0 = Sunday, 1 = Monday, etc.
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

const DAYS_OF_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export default function BusinessProfile({ business }: ProfileProps) {
    const formattedRating = business.reviews_avg_rating
        ? parseFloat(String(business.reviews_avg_rating)).toFixed(1)
        : 'N/A';

    // Format times for display (remove seconds e.g. "08:00:00" -> "08:00")
    const formatTime = (time: string | null) => {
        if (!time) return '';
        const parts = time.split(':');
        return `${parts[0]}:${parts[1]}`;
    };

    return (
        <GuestLayout>
            <Head title={`${business.name} - Profile`} />

            <div className="relative min-h-screen bg-[#0A0A0A] pb-24 text-zinc-100">
                {/* Back to Directory Link */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
                    <Link
                        href="/directory"
                        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-3 w-3" />
                        Back to Directory
                    </Link>
                </div>

                {/* Hero Header Banner */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="relative rounded-2xl overflow-hidden border border-[#1F1F1F] bg-[#111111]/80 backdrop-blur-md">
                        {/* Cover Image/Pattern */}
                        <div className="h-48 sm:h-64 w-full bg-gradient-to-r from-indigo-950/40 via-zinc-900 to-[#161616] relative">
                            {business.photos && business.photos.length > 1 ? (
                                <img
                                    src={business.photos[1].path}
                                    alt="Cover Banner"
                                    className="h-full w-full object-cover opacity-35"
                                />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
                        </div>

                        {/* Profile Info Overlay */}
                        <div className="px-6 pb-6 relative -mt-16 sm:-mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
                                {/* Profile Logo Container */}
                                <div className="h-32 w-32 shrink-0 rounded-2xl border-2 border-[#1F1F1F] bg-[#161616] overflow-hidden flex items-center justify-center shadow-xl relative z-10">
                                    {business.photos && business.photos.length > 0 ? (
                                        <img
                                            src={business.photos[0].path}
                                            alt={business.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <Building2 className="h-12 w-12 text-zinc-600" />
                                    )}
                                </div>

                                {/* Text Details */}
                                <div className="space-y-2 pb-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                                            {business.name}
                                        </h1>
                                        {business.is_verified && (
                                            <CheckCircle className="h-5 w-5 text-emerald-400" title="Verified details" />
                                        )}
                                        {business.is_featured && (
                                            <Badge className="bg-indigo-600 hover:bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-sm">
                                                Featured
                                            </Badge>
                                        )}
                                    </div>

                                    {business.tagline && (
                                        <p className="text-zinc-400 text-sm italic">
                                            "{business.tagline}"
                                        </p>
                                    )}

                                    {/* Ratings Summary */}
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                                        <div className="flex items-center text-amber-400">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="ml-1 text-zinc-200 font-bold">{formattedRating}</span>
                                        </div>
                                        <span>•</span>
                                        <span>{business.reviews_count} Reviews</span>
                                        {business.category && (
                                            <>
                                                <span>•</span>
                                                <span
                                                    className="font-medium tracking-wide uppercase px-2 py-0.5 rounded text-[10px]"
                                                    style={{
                                                        backgroundColor: `${business.category.hex_color || '#3E3E3E'}20`,
                                                        color: business.category.hex_color || '#A1A1AA',
                                                    }}
                                                >
                                                    {business.category.en}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* CTA / Quick contact */}
                            <div className="flex flex-wrap gap-2 shrink-0 pb-2">
                                {business.phone && (
                                    <a
                                        href={`tel:${business.phone}`}
                                        className="inline-flex items-center gap-2 rounded-lg bg-[#1C1C1C] border border-[#2E2E2E] px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors"
                                    >
                                        <Phone className="h-3.5 w-3.5 text-zinc-400" />
                                        Call Business
                                    </a>
                                )}
                                {business.website && (
                                    <a
                                        href={business.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                                    >
                                        <Globe className="h-3.5 w-3.5" />
                                        Visit Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profile Grid content */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Left column: About, Photos, Tags, Reviews */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* About Description */}
                            <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                                <CardContent className="pt-6 space-y-3">
                                    <h2 className="text-lg font-bold text-white">About the Business</h2>
                                    <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                                        {business.description || 'No description provided.'}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Gallery */}
                            {business.photos && business.photos.length > 0 && (
                                <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                                    <CardContent className="pt-6 space-y-3">
                                        <h2 className="text-lg font-bold text-white">Photo Gallery</h2>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {business.photos.map((photo) => (
                                                <div
                                                    key={photo.id}
                                                    className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-[#1F1F1F] group cursor-zoom-in"
                                                >
                                                    <img
                                                        src={photo.path}
                                                        alt="Gallery Photo"
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Tags list */}
                            {business.tags && business.tags.length > 0 && (
                                <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                                    <CardContent className="pt-6 space-y-3">
                                        <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                                            <TagIcon className="h-4 w-4 text-indigo-400" />
                                            Business Tags
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {business.tags.map((tag) => (
                                                <Badge
                                                    key={tag.id}
                                                    variant="secondary"
                                                    className="bg-[#161616] border-[#2E2E2E] text-zinc-300 px-3 py-1 rounded-md text-xs font-normal"
                                                >
                                                    #{tag.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Customer Reviews */}
                            <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                                <CardContent className="pt-6 space-y-6">
                                    <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
                                        <h2 className="text-lg font-bold text-white">
                                            Customer Reviews ({business.reviews_count})
                                        </h2>
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <Star className="h-4 w-4 text-amber-400 fill-current" />
                                            <span className="text-white font-bold">{formattedRating}</span>
                                            <span className="text-zinc-500">out of 5</span>
                                        </div>
                                    </div>

                                    {business.reviews.length === 0 ? (
                                        <div className="py-6 text-center text-zinc-500 text-sm">
                                            No reviews yet. Be the first to leave a review!
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-[#1F1F1F] space-y-6">
                                            {business.reviews.map((review) => (
                                                <div key={review.id} className="pt-6 first:pt-0 space-y-2">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <div className="font-semibold text-white">
                                                            {review.user?.name || 'Anonymous User'}
                                                        </div>
                                                        <div className="text-zinc-500">
                                                            {new Date(review.created_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    {/* Stars */}
                                                    <div className="flex text-amber-400">
                                                        {Array.from({ length: 5 }).map((_, idx) => (
                                                            <Star
                                                                key={idx}
                                                                className={`h-3.5 w-3.5 ${
                                                                    idx < review.rating
                                                                        ? 'fill-current'
                                                                        : 'text-zinc-700'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                                        {review.body}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right column: Info sidebar & hours */}
                        <div className="space-y-6">
                            {/* Contact Details card */}
                            <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                                <CardHeader className="border-b border-[#1F1F1F] pb-4">
                                    <CardTitle className="text-white text-base">Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-4 text-xs sm:text-sm">
                                    {business.address && (
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-zinc-200">{business.address}</p>
                                                <p className="text-zinc-400">{business.city || ''}, {business.country}</p>
                                            </div>
                                        </div>
                                    )}

                                    {business.phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-zinc-500 shrink-0" />
                                            <a href={`tel:${business.phone}`} className="text-zinc-300 hover:text-white transition-colors">
                                                {business.phone}
                                            </a>
                                        </div>
                                    )}

                                    {business.email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-zinc-500 shrink-0" />
                                            <a href={`mailto:${business.email}`} className="text-zinc-300 hover:text-white transition-colors">
                                                {business.email}
                                            </a>
                                        </div>
                                    )}

                                    {business.website && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-4 w-4 text-zinc-500 shrink-0" />
                                            <a
                                                href={business.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-400 hover:text-indigo-300 transition-colors truncate block max-w-[180px] sm:max-w-xs"
                                            >
                                                {business.website}
                                            </a>
                                        </div>
                                    )}

                                    {business.founded_year && (
                                        <div className="flex items-center gap-3 border-t border-[#1F1F1F]/50 pt-3">
                                            <Calendar className="h-4 w-4 text-zinc-500 shrink-0" />
                                            <span className="text-zinc-400">
                                                Founded in <strong className="text-zinc-200">{business.founded_year}</strong>
                                            </span>
                                        </div>
                                    )}

                                    {/* Social platform profiles */}
                                    {(business.facebook_url || business.linkedin_url || business.twitter_url || business.github_url) && (
                                        <div className="flex gap-3 border-t border-[#1F1F1F]/50 pt-4">
                                            {business.facebook_url && (
                                                <a href={business.facebook_url} target="_blank" className="p-2 bg-[#161616] border border-[#2E2E2E] rounded-md text-zinc-400 hover:text-white transition-colors">
                                                    <Facebook className="h-4 w-4" />
                                                </a>
                                            )}
                                            {business.linkedin_url && (
                                                <a href={business.linkedin_url} target="_blank" className="p-2 bg-[#161616] border border-[#2E2E2E] rounded-md text-zinc-400 hover:text-white transition-colors">
                                                    <Linkedin className="h-4 w-4" />
                                                </a>
                                            )}
                                            {business.twitter_url && (
                                                <a href={business.twitter_url} target="_blank" className="p-2 bg-[#161616] border border-[#2E2E2E] rounded-md text-zinc-400 hover:text-white transition-colors">
                                                    <Twitter className="h-4 w-4" />
                                                </a>
                                            )}
                                            {business.github_url && (
                                                <a href={business.github_url} target="_blank" className="p-2 bg-[#161616] border border-[#2E2E2E] rounded-md text-zinc-400 hover:text-white transition-colors">
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Hours of Operation card */}
                            <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                                <CardHeader className="border-b border-[#1F1F1F] pb-4">
                                    <CardTitle className="text-white text-base flex items-center gap-1.5">
                                        <Clock className="h-4 w-4 text-indigo-400" />
                                        Hours of Operation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    {business.hours && business.hours.length > 0 ? (
                                        <div className="space-y-2 text-xs sm:text-sm">
                                            {/* Sort hours by day_of_week starting Monday */}
                                            {[1, 2, 3, 4, 5, 6, 0].map((dayIdx) => {
                                                const hour = business.hours.find((h) => h.day_of_week === dayIdx);
                                                const currentDayIdx = new Date().getDay();
                                                const isToday = currentDayIdx === dayIdx;

                                                return (
                                                    <div
                                                        key={dayIdx}
                                                        className={`flex items-center justify-between p-2 rounded-md ${
                                                            isToday
                                                                ? 'bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 font-medium'
                                                                : 'text-zinc-400'
                                                        }`}
                                                    >
                                                        <span>{DAYS_OF_WEEK[dayIdx]}</span>
                                                        <span>
                                                            {hour
                                                                ? hour.is_closed
                                                                    ? 'Closed'
                                                                    : `${formatTime(hour.open_time)} - ${formatTime(hour.close_time)}`
                                                                : 'Closed'}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-zinc-500 text-xs">
                                            No business hours specified.
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
