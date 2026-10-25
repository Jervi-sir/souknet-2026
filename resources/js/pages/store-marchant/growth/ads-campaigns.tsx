import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Plus,
    Download,
    Filter,
    Columns,
    Settings,
    MoreHorizontal,
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Check,
    Layers,
    SlidersHorizontal,
    Zap,
    ExternalLink,
    Play,
    Pause,
    Radio,
    CircleDot,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface CampaignMetric {
    id: string;
    name: string;
    channel: 'meta' | 'tiktok' | 'google' | 'snapchat' | 'youtube';
    market: string; // e.g. "DZ · 58 Wilayas", "DZ · Alger & Oran"
    objective: 'Prospecting' | 'Retargeting' | 'Brand Search' | 'Winback';
    status: 'live' | 'limited' | 'paused';
    spend_dzd: number;
    budget_dzd: number;
    conversions: number;
    conversions_change_pct: number;
    sparkline_points: number[];
    cpa_dzd: number;
    cpa_change_pct: number;
    roas: number;
    roas_target: number;
    new_buyers_pct: number;
}

const CAMPAIGNS_DATA: CampaignMetric[] = [
    {
        id: 'cmp-01',
        name: 'AirPulse Breathable Shoes - Flash Drop',
        channel: 'meta',
        market: 'DZ · 58 Wilayas',
        objective: 'Prospecting',
        status: 'live',
        spend_dzd: 66100,
        budget_dzd: 77500,
        conversions: 2443,
        conversions_change_pct: -11.3,
        sparkline_points: [30, 45, 38, 62, 54, 70, 65, 82, 75, 90],
        cpa_dzd: 270,
        cpa_change_pct: 23.2,
        roas: 4.3,
        roas_target: 3.5,
        new_buyers_pct: 88,
    },
    {
        id: 'cmp-02',
        name: 'Algerian Streetwear TikTok Reel Boost',
        channel: 'tiktok',
        market: 'DZ · 16 - Alger, 31 - Oran',
        objective: 'Prospecting',
        status: 'live',
        spend_dzd: 62500,
        budget_dzd: 66000,
        conversions: 2799,
        conversions_change_pct: 36.1,
        sparkline_points: [20, 32, 40, 50, 48, 65, 75, 80, 88, 95],
        cpa_dzd: 223,
        cpa_change_pct: -31.6,
        roas: 4.9,
        roas_target: 4.0,
        new_buyers_pct: 73,
    },
    {
        id: 'cmp-03',
        name: 'Medina Silk Hijab Collection Retargeting',
        channel: 'meta',
        market: 'DZ · Constantine, Sétif',
        objective: 'Retargeting',
        status: 'limited',
        spend_dzd: 52400,
        budget_dzd: 53000,
        conversions: 5321,
        conversions_change_pct: -37.9,
        sparkline_points: [80, 75, 60, 65, 50, 55, 45, 52, 40, 38],
        cpa_dzd: 98,
        cpa_change_pct: 43.4,
        roas: 11.7,
        roas_target: 6.0,
        new_buyers_pct: 15,
    },
    {
        id: 'cmp-04',
        name: 'Sneaker Shield & Care Google Search Ads',
        channel: 'google',
        market: 'DZ · Nationwide',
        objective: 'Prospecting',
        status: 'live',
        spend_dzd: 50000,
        budget_dzd: 53500,
        conversions: 663,
        conversions_change_pct: 25.8,
        sparkline_points: [25, 30, 45, 40, 55, 60, 58, 68, 72, 78],
        cpa_dzd: 753,
        cpa_change_pct: -31.3,
        roas: 2.0,
        roas_target: 2.5,
        new_buyers_pct: 71,
    },
    {
        id: 'cmp-05',
        name: 'YouTube Shorts Unboxing COD Review',
        channel: 'youtube',
        market: 'DZ · Mobile Shoppers',
        objective: 'Retargeting',
        status: 'live',
        spend_dzd: 40000,
        budget_dzd: 52000,
        conversions: 1585,
        conversions_change_pct: -6.2,
        sparkline_points: [40, 48, 52, 45, 60, 58, 62, 59, 64, 61],
        cpa_dzd: 252,
        cpa_change_pct: 21.6,
        roas: 5.3,
        roas_target: 4.2,
        new_buyers_pct: 11,
    },
    {
        id: 'cmp-06',
        name: 'Snapchat Story Filter - Ramadan / Eid Drops',
        channel: 'snapchat',
        market: 'DZ · Youth Audience',
        objective: 'Prospecting',
        status: 'live',
        spend_dzd: 34700,
        budget_dzd: 36500,
        conversions: 182,
        conversions_change_pct: 37.9,
        sparkline_points: [15, 25, 35, 48, 55, 70, 78, 85, 92, 98],
        cpa_dzd: 1907,
        cpa_change_pct: -32.9,
        roas: 0.8,
        roas_target: 2.0,
        new_buyers_pct: 87,
    },
    {
        id: 'cmp-07',
        name: 'Abandoned Cart WhatsApp Automation Follow-up',
        channel: 'meta',
        market: 'DZ · Winback Pipeline',
        objective: 'Winback',
        status: 'live',
        spend_dzd: 34000,
        budget_dzd: 43500,
        conversions: 669,
        conversions_change_pct: 42.9,
        sparkline_points: [20, 28, 42, 50, 60, 68, 72, 85, 88, 94],
        cpa_dzd: 508,
        cpa_change_pct: -34.4,
        roas: 2.2,
        roas_target: 2.0,
        new_buyers_pct: 14,
    },
    {
        id: 'cmp-08',
        name: 'Brand Search - DzAvenue Official Keywords',
        channel: 'google',
        market: 'DZ · Brand Search',
        objective: 'Brand Search',
        status: 'live',
        spend_dzd: 31600,
        budget_dzd: 35500,
        conversions: 2079,
        conversions_change_pct: 17.2,
        sparkline_points: [60, 65, 70, 68, 75, 78, 82, 80, 85, 89],
        cpa_dzd: 152,
        cpa_change_pct: -24.3,
        roas: 7.4,
        roas_target: 5.0,
        new_buyers_pct: 48,
    },
    {
        id: 'cmp-09',
        name: 'Titan Smartwatch Lookalike 1% Buyers',
        channel: 'meta',
        market: 'DZ · 58 Wilayas',
        objective: 'Prospecting',
        status: 'live',
        spend_dzd: 30600,
        budget_dzd: 39000,
        conversions: 3436,
        conversions_change_pct: 1.8,
        sparkline_points: [70, 72, 75, 73, 76, 74, 78, 75, 79, 81],
        cpa_dzd: 89,
        cpa_change_pct: -1.4,
        roas: 11.6,
        roas_target: 8.0,
        new_buyers_pct: 45,
    },
    {
        id: 'cmp-10',
        name: 'Algerian Caftan High-Value Customers',
        channel: 'meta',
        market: 'DZ · Constantinoise Hub',
        objective: 'Winback',
        status: 'live',
        spend_dzd: 27500,
        budget_dzd: 28500,
        conversions: 2781,
        conversions_change_pct: 25.3,
        sparkline_points: [30, 42, 50, 62, 70, 75, 82, 88, 90, 95],
        cpa_dzd: 98,
        cpa_change_pct: -32.0,
        roas: 13.1,
        roas_target: 9.0,
        new_buyers_pct: 26,
    },
];

// Sparkline SVG renderer
function Sparkline({ points, isPositive }: { points: number[]; isPositive: boolean }) {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const width = 80;
    const height = 24;

    const coordinates = points.map((p, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((p - min) / (max - min || 1)) * height * 0.8 - 2;
        return `${x},${y}`;
    });

    const pathD = `M ${coordinates.join(' L ')}`;

    return (
        <svg width={width} height={height} className="overflow-visible">
            <path
                d={pathD}
                fill="none"
                stroke={isPositive ? '#38bdf8' : '#60a5fa'}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function AdsCampaignPerformance() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedChannel, setSelectedChannel] = useState<string>('all');
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const filtered = CAMPAIGNS_DATA.filter((cmp) => {
        const matchesSearch =
            cmp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cmp.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cmp.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesChannel = selectedChannel === 'all' || cmp.channel === selectedChannel;
        return matchesSearch && matchesChannel;
    });

    const toggleSelectAll = () => {
        if (selectedRows.length === filtered.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filtered.map((c) => c.id));
        }
    };

    const toggleSelectRow = (id: string) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((r) => r !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const renderChannelIcon = (channel: CampaignMetric['channel']) => {
        switch (channel) {
            case 'meta':
                return (
                    <div className="size-6 rounded-md bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                        M
                    </div>
                );
            case 'tiktok':
                return (
                    <div className="size-6 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-[10px]">
                        TT
                    </div>
                );
            case 'google':
                return (
                    <div className="size-6 rounded-md bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold text-[10px]">
                        G
                    </div>
                );
            case 'youtube':
                return (
                    <div className="size-6 rounded-md bg-rose-600/10 text-rose-600 flex items-center justify-center font-bold text-[10px]">
                        YT
                    </div>
                );
            case 'snapchat':
                return (
                    <div className="size-6 rounded-md bg-amber-400/20 text-amber-500 flex items-center justify-center font-bold text-[10px]">
                        SC
                    </div>
                );
        }
    };

    return (
        <StoreMerchantLayout title="Ads Campaign Performance" activeNav="campaigns">
            <Head title="Ads Campaign Performance - Souknet Merchant" />

            <div className="space-y-6 max-w-[1600px] mx-auto text-foreground">
                {/* Header Title & Date Range / Export Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <span>Campaign Performance</span>
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            30 campaigns · 17 live in view · Sep 6 to Oct 25, 2026
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                            <Download className="size-3.5" />
                            <span>Export</span>
                        </Button>

                        <Button size="sm" className="h-9 gap-1.5 text-xs bg-primary text-primary-foreground font-semibold shadow-xs">
                            <Plus className="size-3.5" />
                            <span>New Campaign</span>
                        </Button>
                    </div>
                </div>

                {/* 6 Top Metric KPI Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                                Spend
                            </span>
                            <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground">
                                643.6K <span className="text-xs font-normal text-muted-foreground">DZD</span>
                            </div>
                            <span className="text-[11px] text-muted-foreground block">
                                76% of 846K DZD budget
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                                Impressions
                            </span>
                            <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground">
                                43.6M
                            </div>
                            <span className="text-[11px] text-muted-foreground block">
                                2.2% CTR average
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                                Conversions (COD)
                            </span>
                            <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground">
                                27.8K
                            </div>
                            <span className="text-[11px] text-rose-500 font-medium block">
                                -6% vs last period
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                                Blended CPA
                            </span>
                            <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground">
                                23.13 <span className="text-xs font-normal text-muted-foreground">DZD</span>
                            </div>
                            <span className="text-[11px] text-rose-500 font-medium block">
                                +3.1% cost per acquisition
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                                Blended ROAS
                            </span>
                            <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
                                5.0x
                            </div>
                            <span className="text-[11px] text-muted-foreground block">
                                Target: 4.3x
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardContent className="p-4 space-y-1">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                                Below Target
                            </span>
                            <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground">
                                21
                            </div>
                            <span className="text-[11px] text-muted-foreground block">
                                of 30 campaigns
                            </span>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter and Table Actions Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 max-w-lg">
                        <div className="relative flex-1">
                            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search campaign, ID, market..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 pl-9 text-xs bg-card/60 border-border/80"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5">
                            <Filter className="size-3.5" />
                            <span>Filter</span>
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5">
                            <Columns className="size-3.5" />
                            <span>Columns</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5">
                            <Settings className="size-3.5" />
                            <span>Settings</span>
                        </Button>
                    </div>
                </div>

                {/* CAMPAIGN PERFORMANCE MASTER TABLE */}
                <Card className="border-border/80 bg-card/60 backdrop-blur-xs overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 border-b border-border/80 text-[11px] uppercase text-muted-foreground font-semibold tracking-wider">
                                <tr>
                                    <th className="p-3.5 pl-4 w-10">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === filtered.length && filtered.length > 0}
                                            onChange={toggleSelectAll}
                                            className="rounded border-border text-primary focus:ring-0 cursor-pointer"
                                        />
                                    </th>
                                    <th className="p-3.5">
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                            <span>Campaign</span>
                                            <ArrowUpDown className="size-3" />
                                        </div>
                                    </th>
                                    <th className="p-3.5 text-center">
                                        <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-foreground">
                                            <span>Status</span>
                                            <ArrowUpDown className="size-3" />
                                        </div>
                                    </th>
                                    <th className="p-3.5 text-right">
                                        <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-foreground">
                                            <span>Spend</span>
                                            <ArrowUpDown className="size-3" />
                                        </div>
                                    </th>
                                    <th className="p-3.5 text-right">
                                        <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-foreground">
                                            <span>Conversions</span>
                                            <ArrowUpDown className="size-3" />
                                        </div>
                                    </th>
                                    <th className="p-3.5 text-center">
                                        <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-foreground">
                                            <span>Trend</span>
                                            <ArrowUpDown className="size-3" />
                                        </div>
                                    </th>
                                    <th className="p-3.5 text-right">
                                        <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-foreground">
                                            <span>CPA</span>
                                            <ArrowUpDown className="size-3" />
                                        </div>
                                    </th>
                                    <th className="p-3.5 text-center">
                                        <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-foreground">
                                            <span>ROAS</span>
                                            <ArrowUpDown className="size-3" />
                                        </div>
                                    </th>
                                    <th className="p-3.5 text-center">
                                        <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-foreground">
                                            <span>New Buyers</span>
                                            <ArrowUpDown className="size-3" />
                                        </div>
                                    </th>
                                    <th className="p-3.5 text-right pr-4 w-12"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filtered.map((item) => {
                                    const isChecked = selectedRows.includes(item.id);
                                    const spendPct = Math.round((item.spend_dzd / item.budget_dzd) * 100);

                                    return (
                                        <tr
                                            key={item.id}
                                            className={`hover:bg-muted/40 transition-colors ${
                                                isChecked ? 'bg-primary/5' : ''
                                            }`}
                                        >
                                            {/* Row Checkbox */}
                                            <td className="p-3.5 pl-4">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => toggleSelectRow(item.id)}
                                                    className="rounded border-border text-primary focus:ring-0 cursor-pointer"
                                                />
                                            </td>

                                            {/* Campaign Channel Icon + Name + Subtitle */}
                                            <td className="p-3.5 font-medium text-foreground">
                                                <div className="flex items-center gap-2.5">
                                                    {renderChannelIcon(item.channel)}
                                                    <div className="min-w-0">
                                                        <span className="font-semibold text-foreground truncate block max-w-xs sm:max-w-md">
                                                            {item.name}
                                                        </span>
                                                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-0.5">
                                                            <span>{item.market}</span>
                                                            <span>•</span>
                                                            <span className="font-medium">{item.objective}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="p-3.5 text-center">
                                                {item.status === 'live' && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                        Live
                                                    </span>
                                                )}
                                                {item.status === 'limited' && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                                        Limited
                                                    </span>
                                                )}
                                                {item.status === 'paused' && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground border border-border">
                                                        Paused
                                                    </span>
                                                )}
                                            </td>

                                            {/* Spend Amount & % of Budget */}
                                            <td className="p-3.5 text-right font-mono">
                                                <div className="font-bold text-foreground">
                                                    {(item.spend_dzd / 1000).toFixed(1)}K <span className="text-[10px] font-normal text-muted-foreground">DZD</span>
                                                </div>
                                                <div className="text-[10px] text-muted-foreground mt-0.5">
                                                    {spendPct}% of {(item.budget_dzd / 1000).toFixed(1)}K
                                                </div>
                                            </td>

                                            {/* Conversions Count & % Change */}
                                            <td className="p-3.5 text-right font-mono">
                                                <div className="font-bold text-foreground">
                                                    {item.conversions.toLocaleString()}
                                                </div>
                                                <div
                                                    className={`text-[10px] font-semibold mt-0.5 ${
                                                        item.conversions_change_pct >= 0
                                                            ? 'text-emerald-500'
                                                            : 'text-rose-500'
                                                    }`}
                                                >
                                                    {item.conversions_change_pct >= 0 ? '+' : ''}
                                                    {item.conversions_change_pct}%
                                                </div>
                                            </td>

                                            {/* Trend Sparkline */}
                                            <td className="p-3.5 text-center">
                                                <div className="flex items-center justify-center">
                                                    <Sparkline
                                                        points={item.sparkline_points}
                                                        isPositive={item.conversions_change_pct >= 0}
                                                    />
                                                </div>
                                            </td>

                                            {/* Cost Per Acquisition (CPA) */}
                                            <td className="p-3.5 text-right font-mono">
                                                <div className="font-bold text-foreground">
                                                    {item.cpa_dzd} <span className="text-[10px] font-normal text-muted-foreground">DZD</span>
                                                </div>
                                                <div
                                                    className={`text-[10px] font-semibold mt-0.5 ${
                                                        item.cpa_change_pct <= 0
                                                            ? 'text-emerald-500'
                                                            : 'text-rose-500'
                                                    }`}
                                                >
                                                    {item.cpa_change_pct >= 0 ? '+' : ''}
                                                    {item.cpa_change_pct}%
                                                </div>
                                            </td>

                                            {/* ROAS Slider / Progress Gauge */}
                                            <td className="p-3.5 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {/* Custom Gauge Track */}
                                                    <div className="w-16 h-1 bg-muted rounded-full relative overflow-visible flex items-center">
                                                        <div
                                                            className="h-1 bg-blue-500 rounded-full"
                                                            style={{
                                                                width: `${Math.min(100, (item.roas / 15) * 100)}%`,
                                                            }}
                                                        />
                                                        {/* Marker Pin */}
                                                        <div
                                                            className="size-2 rounded-full bg-blue-400 absolute shadow-xs"
                                                            style={{
                                                                left: `${Math.min(95, (item.roas / 15) * 100)}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="font-mono font-bold text-xs text-foreground w-8 text-right">
                                                        {item.roas}x
                                                    </span>
                                                </div>
                                            </td>

                                            {/* New Buyers Pill Gauge */}
                                            <td className="p-3.5 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full"
                                                            style={{ width: `${item.new_buyers_pct}%` }}
                                                        />
                                                    </div>
                                                    <span className="font-mono text-xs text-muted-foreground w-8 text-right">
                                                        {item.new_buyers_pct}%
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Row Actions Menu */}
                                            <td className="p-3.5 text-right pr-4">
                                                <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors">
                                                    <MoreHorizontal className="size-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer Pagination */}
                    <div className="p-3.5 border-t border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground bg-muted/20">
                        <div className="flex items-center gap-2">
                            <span>Rows per page</span>
                            <select
                                value={rowsPerPage}
                                onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
                                className="h-7 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none"
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-4">
                            <span>
                                1 - {filtered.length} of 30 campaigns
                            </span>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" disabled>
                                    <ChevronLeft className="size-3.5" />
                                </Button>
                                <button className="h-7 w-7 rounded bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
                                    1
                                </button>
                                <button className="h-7 w-7 rounded hover:bg-muted text-muted-foreground font-medium text-xs flex items-center justify-center">
                                    2
                                </button>
                                <button className="h-7 w-7 rounded hover:bg-muted text-muted-foreground font-medium text-xs flex items-center justify-center">
                                    3
                                </button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                    <ChevronRight className="size-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </StoreMerchantLayout>
    );
}
