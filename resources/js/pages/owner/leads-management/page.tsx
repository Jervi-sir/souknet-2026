import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import {
    Mail,
    Search,
    Check,
    Calendar,
    Building2,
    SlidersHorizontal,
    MessageSquare,
    Eye,
} from 'lucide-react';

interface Lead {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
    business: {
        id: number;
        name: string;
    } | null;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedLeads {
    data: Lead[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface LeadsManagementProps {
    leads: PaginatedLeads;
    filters: {
        status: string;
        search: string;
    };
}

export default function LeadsManagement({ leads, filters }: LeadsManagementProps) {
    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);

    const applyFilters = (updatedParams?: Record<string, any>) => {
        const params = {
            search,
            status,
            ...updatedParams,
        };

        // Remove empty values
        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        router.get('/owner/leads', params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        applyFilters({ status: newStatus });
    };

    const handleMarkAsRead = (id: number) => {
        router.post(`/owner/leads/${id}/read`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Leads Management" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 overflow-x-auto text-zinc-100 bg-[#0A0A0A] min-h-screen">
                {/* Header */}
                <div className="border-b border-[#1F1F1F] pb-4">
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">
                        Leads & Messages
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        View contact requests, queries, and direct message leads sent by visitors to your business profile pages.
                    </p>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Status Tabs */}
                    <div className="flex items-center gap-1 bg-[#111111] p-1 rounded-lg border border-[#1F1F1F] self-start">
                        {['all', 'unread', 'read'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleStatusChange(tab)}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                                    status === tab
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:max-w-xs">
                        <div className="relative flex-1">
                            <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-500" />
                            <Input
                                type="text"
                                placeholder="Search leads..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500 text-xs sm:text-sm"
                            />
                        </div>
                        <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white">
                            Search
                        </Button>
                    </form>
                </div>

                {/* Leads list layout */}
                {leads.data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#1F1F1F] bg-[#111111]/30 p-16 text-center">
                        <MessageSquare className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
                        <h3 className="font-semibold text-zinc-400 text-sm">No leads found</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                            No matching messages were found. Try changing your status filters or adjusting search queries.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            {leads.data.map((lead) => (
                                <Card
                                    key={lead.id}
                                    className={`border-[#1F1F1F] bg-[#111111]/80 hover:border-zinc-800 transition-all duration-300 ${
                                        !lead.is_read ? 'ring-1 ring-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.05)]' : ''
                                    }`}
                                >
                                    <CardContent className="p-6 space-y-4">
                                        {/* Lead Meta details */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#1F1F1F]/40 pb-3">
                                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                                                <span className="font-bold text-white">{lead.name}</span>
                                                <span className="text-zinc-500">({lead.email})</span>
                                                {!lead.is_read ? (
                                                    <Badge className="bg-indigo-600 text-white text-[9px] uppercase font-bold py-0 px-1.5 rounded">
                                                        New Lead
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-500 text-[9px] uppercase py-0 px-1.5 rounded">
                                                        Read
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] sm:text-xs">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{new Date(lead.created_at).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {/* Message text */}
                                        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                                            {lead.message}
                                        </p>

                                        {/* Lead Footer action tools */}
                                        <div className="flex items-center justify-between border-t border-[#1F1F1F]/40 pt-3 text-xs text-zinc-500">
                                            <div className="flex items-center gap-1.5">
                                                <Building2 className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>Sent to: <strong className="text-zinc-300">{lead.business?.name}</strong></span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* Mark read button */}
                                                {!lead.is_read && (
                                                    <Button
                                                        onClick={() => handleMarkAsRead(lead.id)}
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8 border-[#2E2E2E] bg-zinc-900 text-zinc-300 hover:text-white text-xs gap-1.5"
                                                    >
                                                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                                                        Mark as Read
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {leads.last_page > 1 && (
                            <Pagination className="mt-8">
                                <PaginationContent>
                                    {leads.links.map((link, idx) => {
                                        const label = link.label
                                            .replace(/&laquo;/g, '«')
                                            .replace(/&raquo;/g, '»')
                                            .replace(/Previous/g, '')
                                            .replace(/Next/g, '');

                                        const isPrev = link.label.includes('Previous');
                                        const isNext = link.label.includes('Next');

                                        if (!link.url) {
                                            return (
                                                <PaginationItem key={idx} className="opacity-40 pointer-events-none">
                                                    {isPrev ? (
                                                        <PaginationPrevious href="#" />
                                                    ) : isNext ? (
                                                        <PaginationNext href="#" />
                                                    ) : (
                                                        <PaginationEllipsis />
                                                    )}
                                                </PaginationItem>
                                            );
                                        }

                                        return (
                                            <PaginationItem key={idx}>
                                                {isPrev ? (
                                                    <PaginationPrevious
                                                        href={link.url}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(link.url!);
                                                        }}
                                                    />
                                                ) : isNext ? (
                                                    <PaginationNext
                                                        href={link.url}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(link.url!);
                                                        }}
                                                    />
                                                ) : (
                                                    <PaginationLink
                                                        href={link.url}
                                                        isActive={link.active}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(link.url!);
                                                        }}
                                                    >
                                                        {label}
                                                    </PaginationLink>
                                                )}
                                            </PaginationItem>
                                        );
                                    })}
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

// Sidebar Layout Resolver
LeadsManagement.layout = (page: React.ReactNode) => page;
