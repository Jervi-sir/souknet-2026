import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    User,
    Phone,
    MapPin,
    Save,
    Check,
    Plus,
    Building2,
    ShieldCheck,
    Truck,
} from 'lucide-react';
import CustomerLayout from './layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SavedAddress {
    id: string;
    label: string;
    wilaya: string;
    commune: string;
    street_address: string;
    is_default: boolean;
}

const INITIAL_ADDRESSES: SavedAddress[] = [
    {
        id: 'addr_1',
        label: 'Home (Domicile)',
        wilaya: '16 - Alger',
        commune: 'Hydra',
        street_address: 'Cité 200 Logements, Bâtiment C, N° 14',
        is_default: true,
    },
    {
        id: 'addr_2',
        label: 'Work / Bureau',
        wilaya: '16 - Alger',
        commune: 'Bab Ezzouar',
        street_address: 'Centre des Affaires Bab Ezzouar, Étage 4',
        is_default: false,
    },
];

export default function CustomerProfile() {
    const [name, setName] = useState('Amine Khelil');
    const [phone, setPhone] = useState('0661 22 33 44');
    const [phoneAlt, setPhoneAlt] = useState('0555 12 34 56');
    const [saved, setSaved] = useState(false);
    const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <CustomerLayout activeNav="profile" title="Delivery Addresses & Phone">
            <Head title="My Profile & Addresses - Souknet" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Delivery Coordinates & Contact
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Pre-fill your delivery coordinates for fast 1-click Cash on Delivery checkouts across any store.
                        </p>
                    </div>

                    <Button onClick={handleSave} className="gap-2 h-9 text-xs font-semibold shadow-xs">
                        {saved ? <Check className="size-4 text-emerald-400" /> : <Save className="size-4" />}
                        <span>{saved ? 'Profile Saved!' : 'Save Details'}</span>
                    </Button>
                </div>

                {/* Personal Phone Details */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                            <Phone className="size-4 text-emerald-600" />
                            Primary Phone Contact
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Couriers (Yalidine, ZR Express) call this number directly before home arrival.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5">
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Full Name (Nom & Prénom)</Label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-9 text-xs"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Primary Phone Number</Label>
                                    <Input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-9 text-xs font-mono font-bold"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Alternative Secondary Phone</Label>
                                    <Input
                                        value={phoneAlt}
                                        onChange={(e) => setPhoneAlt(e.target.value)}
                                        className="h-9 text-xs font-mono"
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Saved Delivery Addresses */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-sm font-semibold tracking-tight">Saved Delivery Addresses</CardTitle>
                            <CardDescription className="text-xs">
                                Used automatically when ordering from any Souknet merchant.
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                            <Plus className="size-3.5" />
                            <span>Add Address</span>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {addresses.map((addr) => (
                                <div
                                    key={addr.id}
                                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                                        addr.is_default
                                            ? 'border-primary ring-1 ring-primary/20 bg-card'
                                            : 'border-border/80 bg-muted/20'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="size-3.5 text-primary" />
                                            <span className="font-bold text-foreground">{addr.label}</span>
                                        </div>
                                        {addr.is_default && (
                                            <Badge className="bg-primary text-primary-foreground text-[9px] px-1.5 py-0">
                                                Default
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground">{addr.street_address}</p>
                                    <span className="font-semibold text-foreground block">
                                        {addr.commune}, {addr.wilaya}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </CustomerLayout>
    );
}
