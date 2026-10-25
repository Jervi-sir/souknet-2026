import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    BarChart3,
    TrendingUp,
    PhoneCall,
    CheckCircle2,
    XCircle,
    Clock,
    PhoneMissed,
    Users,
    Flame,
    ArrowUpRight,
    ArrowDownRight,
    Award,
    Calendar,
    Filter,
} from 'lucide-react';
import CallCenterLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AgentPerformance {
    id: string;
    name: string;
    role: string;
    avatar: string;
    total_calls: number;
    confirmed_orders: number;
    cancelled_orders: number;
    unreachable_orders: number;
    confirmation_rate: number;
    avg_call_duration_sec: number;
    status: 'online' | 'on_call' | 'break' | 'offline';
}

const AGENTS_METRICS: AgentPerformance[] = [
    {
        id: 'AG-01',
        name: 'Khadija Merad',
        role: 'Senior Confirmation Agent',
        avatar: 'KM',
        total_calls: 42,
        confirmed_orders: 36,
        cancelled_orders: 4,
        unreachable_orders: 2,
        confirmation_rate: 85.7,
        avg_call_duration_sec: 145,
        status: 'online',
    },
    {
        id: 'AG-02',
        name: 'Yacine Bensalem',
        role: 'Confirmation & Suivi Agent',
        avatar: 'YB',
        total_calls: 38,
        confirmed_orders: 31,
        cancelled_orders: 5,
        unreachable_orders: 2,
        confirmation_rate: 81.5,
        avg_call_duration_sec: 160,
        status: 'on_call',
    },
    {
        id: 'AG-03',
        name: 'Amina Zerrouki',
        role: 'Suivi & Return Specialist',
        avatar: 'AZ',
        total_calls: 34,
        confirmed_orders: 26,
        cancelled_orders: 3,
        unreachable_orders: 5,
        confirmation_rate: 76.4,
        avg_call_duration_sec: 185,
        status: 'online',
    },
    {
        id: 'AG-04',
        name: 'Farid Belhadj',
        role: 'Junior Dialing Operator',
        avatar: 'FB',
        total_calls: 29,
        confirmed_orders: 20,
        cancelled_orders: 6,
        unreachable_orders: 3,
        confirmation_rate: 68.9,
        avg_call_duration_sec: 210,
        status: 'break',
    },
];

const HOURLY_CALL_DISTRIBUTION = [
    { hour: '09:00', calls: 14, confirmed: 11 },
    { hour: '10:00', calls: 24, confirmed: 20 },
    { hour: '11:00', calls: 32, confirmed: 28 },
    { hour: '12:00', calls: 18, confirmed: 13 },
    { hour: '13:00', calls: 12, confirmed: 8 },
    { hour: '14:00', calls: 22, confirmed: 18 },
    { hour: '15:00', calls: 28, confirmed: 23 },
    { hour: '16:00', calls: 26, confirmed: 21 },
    { hour: '17:00', calls: 19, confirmed: 15 },
];

export default function CallCenterAnalytics() {
    const [period, setPeriod] = useState<'today' | 'this_week' | 'this_month'>('today');

    const totalCalls = AGENTS_METRICS.reduce((acc, a) => acc + a.total_calls, 0);
    const totalConfirmed = AGENTS_METRICS.reduce((acc, a) => acc + a.confirmed_orders, 0);
    const totalCancelled = AGENTS_METRICS.reduce((acc, a) => acc + a.cancelled_orders, 0);
    const totalUnreachable = AGENTS_METRICS.reduce((acc, a) => acc + a.unreachable_orders, 0);
    const overallRate = totalCalls > 0 ? ((totalConfirmed / totalCalls) * 100).toFixed(1) : '0';

    return (
        <CallCenterLayout title="Agent Call Analytics & Operations KPIs" activeNav="analytics">
            <Head title="Call Center Analytics - Souknet" />

            <div className="space-y-6 ">
                {/* Header Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <span>Call Center Performance</span>
                            <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 bg-emerald-500/10 text-xs">
                                Live Tracking
                            </Badge>
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Real-time agent productivity, confirmation velocity, and delivery validation rates.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="inline-flex rounded-lg border border-border p-1 bg-card text-xs">
                            <button
                                onClick={() => setPeriod('today')}
                                className={`px-3 py-1 rounded-md font-medium transition-colors ${period === 'today'
                                        ? 'bg-primary text-primary-foreground shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Today
                            </button>
                            <button
                                onClick={() => setPeriod('this_week')}
                                className={`px-3 py-1 rounded-md font-medium transition-colors ${period === 'this_week'
                                        ? 'bg-primary text-primary-foreground shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                This Week
                            </button>
                            <button
                                onClick={() => setPeriod('this_month')}
                                className={`px-3 py-1 rounded-md font-medium transition-colors ${period === 'this_month'
                                        ? 'bg-primary text-primary-foreground shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                This Month
                            </button>
                        </div>
                    </div>
                </div>

                {/* Primary KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardHeader className="p-4 pb-2">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                                Total Calls Dialed
                                <PhoneCall className="size-4 text-primary" />
                            </span>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold font-mono tracking-tight text-foreground">
                                {totalCalls}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                                <ArrowUpRight className="size-3.5" />
                                <span>+14% vs yesterday</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardHeader className="p-4 pb-2">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                                Confirmed Orders
                                <CheckCircle2 className="size-4 text-emerald-600" />
                            </span>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
                                {totalConfirmed}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1">
                                <span>Ready to ship with Yalidine/ZR</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardHeader className="p-4 pb-2">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                                Confirmation Rate
                                <TrendingUp className="size-4 text-emerald-600" />
                            </span>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold font-mono tracking-tight text-foreground">
                                {overallRate}%
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                                <ArrowUpRight className="size-3.5" />
                                <span>Target: &gt; 80%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardHeader className="p-4 pb-2">
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                                Unreachable / Retries
                                <PhoneMissed className="size-4 text-amber-500" />
                            </span>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold font-mono tracking-tight text-amber-600 dark:text-amber-400">
                                {totalUnreachable}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1">
                                <span>Sent to Tentative Retry Queue</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Hourly Call Volume Chart Visualizer */}
                <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                    <CardHeader className="p-4 pb-2 border-b border-border/80">
                        <CardTitle className="text-sm font-semibold flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Clock className="size-4 text-primary" />
                                Today Hourly Call Distribution & Confirmation Ratio
                            </span>
                            <span className="text-xs font-normal text-muted-foreground">
                                Peak Dialing Hours: 11:00 - 16:00
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-6">
                        <div className="grid grid-cols-9 gap-3 items-end h-44">
                            {HOURLY_CALL_DISTRIBUTION.map((item) => {
                                const heightCalls = `${(item.calls / 35) * 100}%`;
                                const heightConfirmed = `${(item.confirmed / 35) * 100}%`;
                                return (
                                    <div key={item.hour} className="flex flex-col items-center gap-2 h-full justify-end">
                                        <div className="w-full flex items-end justify-center gap-1 h-32">
                                            {/* Calls dialed bar */}
                                            <div
                                                className="w-3 rounded-t bg-muted hover:bg-muted-foreground/30 transition-all cursor-pointer relative group"
                                                style={{ height: heightCalls }}
                                                title={`Calls: ${item.calls}`}
                                            >
                                                <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">
                                                    {item.calls}
                                                </div>
                                            </div>
                                            {/* Confirmed bar */}
                                            <div
                                                className="w-3 rounded-t bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 transition-all cursor-pointer relative group"
                                                style={{ height: heightConfirmed }}
                                                title={`Confirmed: ${item.confirmed}`}
                                            >
                                                <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">
                                                    {item.confirmed}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-mono text-muted-foreground">
                                            {item.hour}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="size-2.5 rounded-sm bg-muted border border-border" />
                                <span>Calls Placed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-2.5 rounded-sm bg-emerald-600" />
                                <span>Confirmed Orders</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Agent Leaderboard & Performance Table */}
                <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                    <CardHeader className="p-4 pb-3 border-b border-border/80">
                        <CardTitle className="text-sm font-semibold flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Users className="size-4 text-primary" />
                                Operators Leaderboard & Productivity Matrix
                            </span>
                            <Badge variant="outline" className="text-xs">
                                4 Active Operators
                            </Badge>
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Individual confirmation rates, average handling time, and live status.
                        </CardDescription>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="border-b border-border bg-muted/30 text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="p-3 pl-4">Operator</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-right">Calls Placed</th>
                                    <th className="p-3 text-right">Confirmed</th>
                                    <th className="p-3 text-right">Cancelled</th>
                                    <th className="p-3 text-right">Confirmation %</th>
                                    <th className="p-3 text-right pr-4">Avg Duration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {AGENTS_METRICS.map((agent, index) => {
                                    const mins = Math.floor(agent.avg_call_duration_sec / 60);
                                    const secs = agent.avg_call_duration_sec % 60;
                                    return (
                                        <tr key={agent.id} className="hover:bg-muted/40 transition-colors">
                                            <td className="p-3 pl-4 font-medium text-foreground">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="size-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                                                        {agent.avatar}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="font-semibold text-foreground">
                                                                {agent.name}
                                                            </span>
                                                            {index === 0 && (
                                                                <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                                                                    ★ Top Performer
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] text-muted-foreground block">
                                                            {agent.role}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 text-center">
                                                {agent.status === 'online' && (
                                                    <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-600 bg-emerald-500/10">
                                                        Online
                                                    </Badge>
                                                )}
                                                {agent.status === 'on_call' && (
                                                    <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-600 bg-blue-500/10 animate-pulse">
                                                        On Call
                                                    </Badge>
                                                )}
                                                {agent.status === 'break' && (
                                                    <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-600 bg-amber-500/10">
                                                        On Break
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="p-3 text-right font-mono font-medium text-foreground">
                                                {agent.total_calls}
                                            </td>
                                            <td className="p-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                                {agent.confirmed_orders}
                                            </td>
                                            <td className="p-3 text-right font-mono text-muted-foreground">
                                                {agent.cancelled_orders}
                                            </td>
                                            <td className="p-3 text-right">
                                                <div className="inline-flex items-center gap-1.5 font-mono font-bold text-foreground">
                                                    <span>{agent.confirmation_rate}%</span>
                                                    <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${agent.confirmation_rate >= 80
                                                                    ? 'bg-emerald-500'
                                                                    : agent.confirmation_rate >= 70
                                                                        ? 'bg-amber-500'
                                                                        : 'bg-rose-500'
                                                                }`}
                                                            style={{ width: `${agent.confirmation_rate}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 text-right font-mono text-muted-foreground pr-4">
                                                {mins}m {secs}s
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </CallCenterLayout>
    );
}
