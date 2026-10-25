import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar as CalendarIcon,
    Truck,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    Plus,
    CalendarCheck,
    MapPin,
    Building2,
    MoreHorizontal,
    User,
    ArrowUpRight,
    PhoneCall,
    Package,
    SlidersHorizontal,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface DeliveryTimelineSlot {
    date: number; // day of month e.g. 12..31
    dayName: string; // Mo, Tu, We...
    status?: 'delivered' | 'failed' | 'scheduled' | 'pending' | 'slot_available';
    slotDetails?: {
        time?: string;
        driver?: string;
        notes?: string;
        courier?: string;
    };
}

interface WilayaHubRoute {
    id: string;
    wilaya_code: string;
    wilaya_name: string;
    hub_manager: string;
    courier_partner: 'Yalidine Express' | 'ZR Express' | 'EcoTrack';
    active_parcels_count: number;
    completed_deliveries: number;
    target_deliveries: number;
    compliance_status: 'On track' | 'Action required' | 'Critical delays' | 'Pending pickup';
    compliance_reason?: string;
    calendar_days: DeliveryTimelineSlot[];
}

const TIMELINE_DAYS = [
    { date: 12, dayName: 'Mo' },
    { date: 13, dayName: 'Tu' },
    { date: 14, dayName: 'We' },
    { date: 15, dayName: 'Th' },
    { date: 16, dayName: 'Fr', isCurrent: true },
    { date: 17, dayName: 'Sa' },
    { date: 18, dayName: 'Su' },
    { date: 19, dayName: 'Mo' },
    { date: 20, dayName: 'Tu' },
    { date: 21, dayName: 'We' },
    { date: 22, dayName: 'Th' },
    { date: 23, dayName: 'Fr' },
    { date: 24, dayName: 'Sa' },
    { date: 25, dayName: 'Su' },
    { date: 26, dayName: 'Mo' },
    { date: 27, dayName: 'Tu' },
    { date: 28, dayName: 'We' },
    { date: 29, dayName: 'Th' },
    { date: 30, dayName: 'Fr' },
    { date: 31, dayName: 'Sa' },
    { date: 1, dayName: 'Su' },
];

const WILAYA_ROUTES_DATA: WilayaHubRoute[] = [
    {
        id: 'rt-16',
        wilaya_code: '16',
        wilaya_name: 'Alger Centre & Bab Ezzouar',
        hub_manager: 'Amine Touati (Yalidine Oued Smar)',
        courier_partner: 'Yalidine Express',
        active_parcels_count: 48,
        completed_deliveries: 42,
        target_deliveries: 45,
        compliance_status: 'On track',
        compliance_reason: 'Optimal 48h rotation',
        calendar_days: [
            { date: 16, dayName: 'Fr', status: 'delivered' },
            { date: 20, dayName: 'Tu', status: 'scheduled' },
            { date: 26, dayName: 'Mo', status: 'scheduled' },
        ],
    },
    {
        id: 'rt-31',
        wilaya_code: '31',
        wilaya_name: 'Oran & Bir El Djir Hub',
        hub_manager: 'Karim Mansouri (ZR Express Oran)',
        courier_partner: 'ZR Express',
        active_parcels_count: 36,
        completed_deliveries: 28,
        target_deliveries: 36,
        compliance_status: 'Action required',
        compliance_reason: '2nd attempt due Oct 21',
        calendar_days: [
            { date: 13, dayName: 'Tu', status: 'failed' },
            { date: 15, dayName: 'Th', status: 'delivered' },
            { date: 22, dayName: 'Th', status: 'scheduled' },
            { date: 23, dayName: 'Fr', status: 'scheduled' },
        ],
    },
    {
        id: 'rt-25',
        wilaya_code: '25',
        wilaya_name: 'Constantine (Ali Mendjeli)',
        hub_manager: 'Mourad Belkacem (Yalidine Khroub)',
        courier_partner: 'Yalidine Express',
        active_parcels_count: 29,
        completed_deliveries: 20,
        target_deliveries: 30,
        compliance_status: 'Critical delays',
        compliance_reason: 'Stopdesk overflow Oct 18',
        calendar_days: [
            { date: 13, dayName: 'Tu', status: 'failed' },
            { date: 14, dayName: 'We', status: 'delivered' },
            { date: 21, dayName: 'We', status: 'scheduled' },
            { date: 22, dayName: 'Th', status: 'scheduled' },
            { date: 27, dayName: 'Tu', status: 'scheduled' },
        ],
    },
    {
        id: 'rt-19',
        wilaya_code: '19',
        wilaya_name: 'Sétif (El Eulma & Centre)',
        hub_manager: 'Farid Zaidi (ZR Express Sétif)',
        courier_partner: 'ZR Express',
        active_parcels_count: 24,
        completed_deliveries: 22,
        target_deliveries: 25,
        compliance_status: 'On track',
        compliance_reason: 'COD cash verified',
        calendar_days: [
            { date: 16, dayName: 'Fr', status: 'failed' },
            { date: 23, dayName: 'Fr', status: 'scheduled' },
        ],
    },
    {
        id: 'rt-06',
        wilaya_code: '06',
        wilaya_name: 'Béjaïa & Akbou Industrial',
        hub_manager: 'Lyes Boukhalfa (EcoTrack)',
        courier_partner: 'EcoTrack',
        active_parcels_count: 19,
        completed_deliveries: 14,
        target_deliveries: 20,
        compliance_status: 'Action required',
        compliance_reason: 'Relance client needed',
        calendar_days: [
            { date: 22, dayName: 'Th', status: 'pending' },
            { date: 23, dayName: 'Fr', status: 'scheduled' },
        ],
    },
    {
        id: 'rt-09',
        wilaya_code: '09',
        wilaya_name: 'Blida & Boufarik Hub',
        hub_manager: 'Nabil Harchaoui (Yalidine Blida)',
        courier_partner: 'Yalidine Express',
        active_parcels_count: 32,
        completed_deliveries: 29,
        target_deliveries: 32,
        compliance_status: 'On track',
        compliance_reason: 'Express 24h pickup',
        calendar_days: [
            { date: 15, dayName: 'Th', status: 'failed' },
            { date: 16, dayName: 'Fr', status: 'delivered' },
            { date: 27, dayName: 'Tu', status: 'scheduled' },
            { date: 29, dayName: 'Th', status: 'scheduled' },
        ],
    },
    {
        id: 'rt-13',
        wilaya_code: '13',
        wilaya_name: 'Tlemcen & Maghnia Border',
        hub_manager: 'Yacine Senoussi (ZR Express Tlemcen)',
        courier_partner: 'ZR Express',
        active_parcels_count: 17,
        completed_deliveries: 15,
        target_deliveries: 18,
        compliance_status: 'On track',
        compliance_reason: 'Stopdesk on schedule',
        calendar_days: [
            { date: 21, dayName: 'We', status: 'scheduled' },
            { date: 27, dayName: 'Tu', status: 'scheduled' },
        ],
    },
    {
        id: 'rt-23',
        wilaya_code: '23',
        wilaya_name: 'Annaba & El Bouni Coast',
        hub_manager: 'Hamza Djemai (Yalidine Annaba)',
        courier_partner: 'Yalidine Express',
        active_parcels_count: 22,
        completed_deliveries: 18,
        target_deliveries: 22,
        compliance_status: 'On track',
        compliance_reason: 'Home delivery active',
        calendar_days: [
            { date: 14, dayName: 'We', status: 'delivered' },
            { date: 21, dayName: 'We', status: 'pending' },
            { date: 26, dayName: 'Mo', status: 'scheduled' },
        ],
    },
    {
        id: 'rt-30',
        wilaya_code: '30',
        wilaya_name: 'Ouargla & Hassi Messaoud',
        hub_manager: 'Brahim Khelil (Sud Express)',
        courier_partner: 'ZR Express',
        active_parcels_count: 14,
        completed_deliveries: 10,
        target_deliveries: 15,
        compliance_status: 'Action required',
        compliance_reason: 'Desert route weekly dispatch',
        calendar_days: [
            { date: 15, dayName: 'Th', status: 'delivered' },
            { date: 26, dayName: 'Mo', status: 'scheduled' },
            { date: 29, dayName: 'Th', status: 'scheduled' },
        ],
    },
    {
        id: 'rt-15',
        wilaya_code: '15',
        wilaya_name: 'Tizi Ouzou & Azazga Hub',
        hub_manager: 'Sofiane Ould Ali (Yalidine Tizi)',
        courier_partner: 'Yalidine Express',
        active_parcels_count: 21,
        completed_deliveries: 19,
        target_deliveries: 21,
        compliance_status: 'On track',
        compliance_reason: 'Clean bordereaux',
        calendar_days: [
            { date: 16, dayName: 'Fr', status: 'delivered' },
            { date: 23, dayName: 'Fr', status: 'scheduled' },
            { date: 26, dayName: 'Mo', status: 'pending' },
            { date: 29, dayName: 'Th', status: 'scheduled' },
        ],
    },
];

export default function DispatchRoutePlanner() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourier, setSelectedCourier] = useState<string>('all');
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedSlotModal, setSelectedSlotModal] = useState<any | null>(null);

    const filtered = WILAYA_ROUTES_DATA.filter((route) => {
        const matchesQuery =
            route.wilaya_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            route.hub_manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
            route.wilaya_code.includes(searchQuery);
        const matchesCourier =
            selectedCourier === 'all' || route.courier_partner === selectedCourier;
        return matchesQuery && matchesCourier;
    });

    const toggleSelectAll = () => {
        if (selectedRows.length === filtered.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filtered.map((r) => r.id));
        }
    };

    const toggleSelectRow = (id: string) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((r) => r !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    return (
        <StoreMerchantLayout title="Courier Dispatch & Delivery Planner" activeNav="dispatch-planner">
            <Head title="Courier Dispatch & Delivery Planner - Souknet Merchant" />

            <div className="space-y-5 max-w-[1700px] mx-auto text-foreground">
                {/* Header Toolbar matching Service Visit Planner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <span>Courier Service & Dispatch Planner</span>
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Oct 12 to Nov 1 · 18 Wilaya Hub Routes · Real-time Courier Pickup & Delivery Rotation
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Date Pagination Controls */}
                        <div className="flex items-center gap-1 border border-border rounded-lg p-0.5 bg-card/60">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                <ChevronLeft className="size-3.5" />
                            </Button>
                            <span className="text-xs font-semibold px-2">Today</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                <ChevronRight className="size-3.5" />
                            </Button>
                        </div>

                        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                            <CalendarIcon className="size-3.5" />
                        </Button>

                        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                            <Plus className="size-3.5" />
                            <span>Add Wilaya Route</span>
                        </Button>

                        <Button size="sm" className="h-9 gap-1.5 text-xs bg-primary text-primary-foreground font-semibold shadow-xs">
                            <Truck className="size-3.5" />
                            <span>Book Courier Pickup</span>
                        </Button>
                    </div>
                </div>

                {/* Filter and Bulk Action Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 max-w-xl">
                        <div className="relative flex-1">
                            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search Wilaya, hub manager, or commune..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 pl-9 text-xs bg-card/60 border-border/80"
                            />
                        </div>

                        <select
                            value={selectedCourier}
                            onChange={(e) => setSelectedCourier(e.target.value)}
                            className="h-9 rounded-md border border-input bg-card/60 px-3 text-xs text-foreground focus:outline-none"
                        >
                            <option value="all">All Couriers (Yalidine, ZR, Eco)</option>
                            <option value="Yalidine Express">Yalidine Express</option>
                            <option value="ZR Express">ZR Express</option>
                            <option value="EcoTrack">EcoTrack</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5">
                            <CalendarCheck className="size-3.5" />
                            <span>Schedule All Routes</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5">
                            <SlidersHorizontal className="size-3.5" />
                        </Button>
                    </div>
                </div>

                {/* MASTER DISPATCH PLANNER MATRIX TABLE */}
                <Card className="border-border/80 bg-card/60 backdrop-blur-xs overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                            {/* Days Timeline Header */}
                            <thead className="bg-muted/40 border-b border-border/80 text-[11px] text-muted-foreground font-semibold">
                                <tr>
                                    {/* Selection Box Header */}
                                    <th className="p-3 pl-4 w-10 border-r border-border/60">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === filtered.length && filtered.length > 0}
                                            onChange={toggleSelectAll}
                                            className="rounded border-border text-primary focus:ring-0 cursor-pointer"
                                        />
                                    </th>

                                    {/* Wilaya Hub Column */}
                                    <th className="p-3 w-56 min-w-[210px] border-r border-border/60">
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                            <span>Wilaya Hub & Driver</span>
                                            <ChevronRight className="size-3 rotate-90" />
                                        </div>
                                    </th>

                                    {/* 21 Day Calendar Columns */}
                                    {TIMELINE_DAYS.map((day) => (
                                        <th
                                            key={`${day.date}-${day.dayName}`}
                                            className={`p-2 text-center w-10 min-w-[36px] border-r border-border/40 ${
                                                day.isCurrent
                                                    ? 'bg-primary/10 text-primary font-bold border-b-2 border-b-primary'
                                                    : ''
                                            }`}
                                        >
                                            <div className="text-[12px] font-mono leading-none">{day.date}</div>
                                            <div className="text-[9px] uppercase tracking-wider opacity-75 mt-0.5">
                                                {day.dayName}
                                            </div>
                                        </th>
                                    ))}

                                    {/* Coverage & SLA Progress Bar Column */}
                                    <th className="p-3 min-w-[150px] border-r border-border/60 text-left">
                                        <span>Coverage / SLA ↑</span>
                                    </th>

                                    {/* Actions */}
                                    <th className="p-3 w-10 text-center pr-4"></th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/60">
                                {filtered.map((route) => {
                                    const isChecked = selectedRows.includes(route.id);
                                    const coverageRatio = route.completed_deliveries / route.target_deliveries;
                                    const coveragePct = Math.min(100, Math.round(coverageRatio * 100));

                                    return (
                                        <tr
                                            key={route.id}
                                            className={`hover:bg-muted/30 transition-colors ${
                                                isChecked ? 'bg-primary/5' : ''
                                            }`}
                                        >
                                            {/* Checkbox */}
                                            <td className="p-3 pl-4 border-r border-border/60">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => toggleSelectRow(route.id)}
                                                    className="rounded border-border text-primary focus:ring-0 cursor-pointer"
                                                />
                                            </td>

                                            {/* Wilaya Name & Hub Manager */}
                                            <td className="p-3 border-r border-border/60">
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-1.5 font-bold text-xs text-foreground">
                                                        <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-muted text-foreground">
                                                            {route.wilaya_code}
                                                        </span>
                                                        <span className="truncate">{route.wilaya_name}</span>
                                                    </div>
                                                    <span className="text-[10px] text-muted-foreground block truncate">
                                                        {route.hub_manager}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Calendar Days Slots */}
                                            {TIMELINE_DAYS.map((day) => {
                                                const slot = route.calendar_days.find((d) => d.date === day.date);

                                                return (
                                                    <td
                                                        key={`${route.id}-${day.date}`}
                                                        className={`p-1 text-center border-r border-border/40 relative group ${
                                                            day.isCurrent ? 'bg-primary/5' : ''
                                                        }`}
                                                    >
                                                        {slot?.status === 'delivered' && (
                                                            <div
                                                                className="size-6 mx-auto rounded-md bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                                                                title={`Delivered: On schedule (${day.date} ${day.dayName})`}
                                                            >
                                                                <CheckCircle2 className="size-3.5" />
                                                            </div>
                                                        )}

                                                        {slot?.status === 'failed' && (
                                                            <div
                                                                className="size-6 mx-auto rounded-md bg-rose-500/15 text-rose-500 flex items-center justify-center font-bold shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                                                                title={`Missed/Refused delivery (${day.date} ${day.dayName})`}
                                                            >
                                                                <AlertCircle className="size-3.5" />
                                                            </div>
                                                        )}

                                                        {slot?.status === 'scheduled' && (
                                                            <div
                                                                className="size-6 mx-auto rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                                                                title={`Courier Scheduled Route (${day.date} ${day.dayName})`}
                                                            >
                                                                <CalendarIcon className="size-3" />
                                                            </div>
                                                        )}

                                                        {slot?.status === 'pending' && (
                                                            <div
                                                                className="size-6 mx-auto rounded-md bg-amber-500/20 text-amber-500 border border-amber-500/30 flex items-center justify-center font-bold shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                                                                title={`Pending Pickup (${day.date} ${day.dayName})`}
                                                            >
                                                                <Clock className="size-3" />
                                                            </div>
                                                        )}

                                                        {/* Hover Add Button on Empty Slots */}
                                                        {!slot && (
                                                            <div className="opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                <button
                                                                    className="size-5 rounded hover:bg-muted text-muted-foreground hover:text-foreground text-[10px] flex items-center justify-center"
                                                                    title={`Add delivery slot for ${day.date} ${day.dayName}`}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}

                                            {/* Coverage Progress Bar & Reason */}
                                            <td className="p-3 border-r border-border/60">
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between text-[11px] font-mono">
                                                        <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${
                                                                    coveragePct >= 80
                                                                        ? 'bg-emerald-500'
                                                                        : coveragePct >= 65
                                                                        ? 'bg-amber-500'
                                                                        : 'bg-rose-500'
                                                                }`}
                                                                style={{ width: `${coveragePct}%` }}
                                                            />
                                                        </div>
                                                        <span className="font-bold text-foreground">
                                                            {route.completed_deliveries}/{route.target_deliveries}
                                                        </span>
                                                    </div>
                                                    <span
                                                        className={`text-[10px] font-medium block truncate ${
                                                            route.compliance_status === 'On track'
                                                                ? 'text-emerald-500'
                                                                : route.compliance_status === 'Critical delays'
                                                                ? 'text-rose-500'
                                                                : 'text-amber-500'
                                                        }`}
                                                    >
                                                        {route.compliance_reason}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Menu Actions */}
                                            <td className="p-3 text-center pr-4">
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

                    {/* Pagination matching reference footer */}
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
                                1 - {filtered.length} of 18 Wilaya routes
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
