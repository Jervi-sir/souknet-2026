import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Truck,
    MapPin,
    Plus,
    Save,
    Check,
    Building2,
    SlidersHorizontal,
    Search,
    AlertCircle,
    ArrowUpDown,
    CheckCircle2,
    Key,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CourierAccount {
    code: string;
    name: string;
    status: 'connected' | 'not_configured';
    api_key?: string;
    api_token?: string;
    is_default: boolean;
}

const COURIER_ACCOUNTS: CourierAccount[] = [
    { code: 'yalidine', name: 'Yalidine Express', status: 'connected', api_key: 'yal_live_9921', is_default: true },
    { code: 'zr_express', name: 'ZR Express', status: 'connected', api_key: 'zr_key_7718', is_default: false },
    { code: 'ecotrack', name: 'EcoTrack', status: 'not_configured', is_default: false },
    { code: 'noest', name: 'Noest Delivery', status: 'not_configured', is_default: false },
];

interface WilayaRate {
    code: string;
    name: string;
    home_fee: number;
    stopdesk_fee: number;
    is_active: boolean;
}

const DEFAULT_WILAYA_RATES: WilayaRate[] = [
    { code: '16', name: 'Alger (Algiers)', home_fee: 400, stopdesk_fee: 250, is_active: true },
    { code: '09', name: 'Blida', home_fee: 500, stopdesk_fee: 300, is_active: true },
    { code: '31', name: 'Oran', home_fee: 650, stopdesk_fee: 350, is_active: true },
    { code: '25', name: 'Constantine', home_fee: 650, stopdesk_fee: 350, is_active: true },
    { code: '19', name: 'Sétif', home_fee: 600, stopdesk_fee: 350, is_active: true },
    { code: '15', name: 'Tizi Ouzou', home_fee: 600, stopdesk_fee: 350, is_active: true },
    { code: '35', name: 'Boumerdès', home_fee: 550, stopdesk_fee: 300, is_active: true },
    { code: '42', name: 'Tipaza', home_fee: 550, stopdesk_fee: 300, is_active: true },
    { code: '23', name: 'Annaba', home_fee: 700, stopdesk_fee: 400, is_active: true },
    { code: '13', name: 'Tlemcen', home_fee: 700, stopdesk_fee: 400, is_active: true },
    { code: '30', name: 'Ouargla', home_fee: 900, stopdesk_fee: 550, is_active: true },
    { code: '47', name: 'Ghardaïa', home_fee: 850, stopdesk_fee: 500, is_active: true },
    { code: '08', name: 'Béchar', home_fee: 950, stopdesk_fee: 600, is_active: true },
    { code: '11', name: 'Tamanrasset', home_fee: 1400, stopdesk_fee: 900, is_active: true },
];

export default function StoreMerchantDeliveryShipping() {
    const [rates, setRates] = useState<WilayaRate[]>(DEFAULT_WILAYA_RATES);
    const [searchWilaya, setSearchWilaya] = useState('');
    const [saved, setSaved] = useState(false);

    const handleRateChange = (code: string, field: 'home_fee' | 'stopdesk_fee', value: number) => {
        setRates(
            rates.map((r) => (r.code === code ? { ...r, [field]: value } : r)),
        );
    };

    const handleToggleWilaya = (code: string) => {
        setRates(
            rates.map((r) => (r.code === code ? { ...r, is_active: !r.is_active } : r)),
        );
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const filteredRates = rates.filter((r) =>
        r.name.toLowerCase().includes(searchWilaya.toLowerCase()) || r.code.includes(searchWilaya),
    );

    return (
        <StoreMerchantLayout activeNav="shipping" title="Courier & Shipping Rates">
            <Head title="Shipping Rates (58 Wilayas) - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Courier Accounts & Wilaya Delivery Rates
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Manage API credentials for Yalidine / ZR Express and adjust Home vs Stopdesk delivery fees per Wilaya.
                        </p>
                    </div>

                    <Button onClick={handleSave} className="gap-2 h-9 text-xs font-semibold shadow-xs">
                        {saved ? <Check className="size-4 text-emerald-400" /> : <Save className="size-4" />}
                        <span>{saved ? 'Rates Updated!' : 'Save Shipping Rates'}</span>
                    </Button>
                </div>

                {/* Courier Accounts Status Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {COURIER_ACCOUNTS.map((courier) => (
                        <Card key={courier.code} className="border border-border/80 shadow-xs">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Truck className="size-4 text-primary" />
                                        <span className="font-bold text-xs text-foreground">{courier.name}</span>
                                    </div>
                                    {courier.is_default && (
                                        <Badge className="bg-primary text-[9px] px-1.5 py-0">Default</Badge>
                                    )}
                                </div>

                                <div className="text-xs">
                                    {courier.status === 'connected' ? (
                                        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                                            <CheckCircle2 className="size-3.5" />
                                            <span>API Connected</span>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">Not connected</span>
                                    )}
                                </div>

                                <Button variant="outline" size="sm" className="w-full h-7 text-[11px]">
                                    {courier.status === 'connected' ? 'Configure API' : 'Connect Account'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Wilaya Delivery Fee Matrix */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <CardTitle className="text-sm font-semibold tracking-tight">
                                58 Wilayas Fee Table (Frais de Livraison)
                            </CardTitle>
                            <CardDescription className="text-xs">
                                Override standard courier costs charged to customers during 1-click checkout.
                            </CardDescription>
                        </div>

                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                            <Input
                                placeholder="Search wilaya code or name..."
                                value={searchWilaya}
                                onChange={(e) => setSearchWilaya(e.target.value)}
                                className="pl-8 h-8 text-xs"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Wilaya Code & Name</th>
                                    <th className="p-3.5 font-semibold">Home Delivery Fee (À Domicile)</th>
                                    <th className="p-3.5 font-semibold">Stopdesk Fee (Bureau)</th>
                                    <th className="p-3.5 font-semibold">Delivery Availability</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filteredRates.map((r) => (
                                    <tr key={r.code} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5 font-semibold text-foreground flex items-center gap-2">
                                            <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-[11px]">
                                                {r.code}
                                            </span>
                                            <span>{r.name}</span>
                                        </td>
                                        <td className="p-3.5">
                                            <div className="flex items-center gap-1.5 max-w-[140px]">
                                                <Input
                                                    type="number"
                                                    value={r.home_fee}
                                                    onChange={(e) =>
                                                        handleRateChange(r.code, 'home_fee', Number(e.target.value))
                                                    }
                                                    className="h-8 text-xs font-mono"
                                                />
                                                <span className="text-[11px] text-muted-foreground font-semibold">
                                                    DZD
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3.5">
                                            <div className="flex items-center gap-1.5 max-w-[140px]">
                                                <Input
                                                    type="number"
                                                    value={r.stopdesk_fee}
                                                    onChange={(e) =>
                                                        handleRateChange(r.code, 'stopdesk_fee', Number(e.target.value))
                                                    }
                                                    className="h-8 text-xs font-mono"
                                                />
                                                <span className="text-[11px] text-muted-foreground font-semibold">
                                                    DZD
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3.5">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={r.is_active}
                                                    onChange={() => handleToggleWilaya(r.code)}
                                                    className="rounded border-border size-4 text-primary"
                                                />
                                                <span className="text-[11px] text-muted-foreground">
                                                    {r.is_active ? 'Shippable' : 'Excluded'}
                                                </span>
                                            </label>
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            {r.is_active ? (
                                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="text-[10px]">
                                                    Disabled
                                                </Badge>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </StoreMerchantLayout>
    );
}
