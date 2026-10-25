import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Save,
    Check,
    MapPin,
    FileText,
    ShieldCheck,
    PhoneCall,
    Mail,
    Globe,
    DollarSign,
} from 'lucide-react';
import OrganizationLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function OrganizationSettingsGeneral() {
    const [saved, setSaved] = useState(false);

    // Algerian Company Profile State
    const [orgName, setOrgName] = useState('Atlas Commerce Group');
    const [legalName, setLegalName] = useState('SARL Atlas Commerce Algérie');
    const [legalForm, setLegalForm] = useState('SARL');
    const [rcNumber, setRcNumber] = useState('16/00-1234567B26'); // Registre de Commerce
    const [nifNumber, setNifNumber] = useState('002616012345678'); // Numéro d'Identification Fiscale
    const [nisNumber, setNisNumber] = useState('002616012345'); // Numéro d'Identification Statistique
    const [capitalDzd, setCapitalDzd] = useState('5000000'); // 5M DZD
    const [phone, setPhone] = useState('023 45 67 89');
    const [email, setEmail] = useState('direction@atlascommerce.dz');
    const [wilaya, setWilaya] = useState('16 - Algiers');
    const [headquartersAddress, setHeadquartersAddress] = useState(
        'Tour d\'Affaires El Qods, Niveau 12, Chéraga, Alger',
    );

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <OrganizationLayout activeNav="general" title="Organization Legal Entity">
            <Head title="Legal Entity Settings - Atlas Commerce Group" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Company & Legal Entity (Algérie)
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Official business registration (RC, NIF, NIS) and fiscal details printed on tax invoices and courier contracts.
                        </p>
                    </div>

                    <Button onClick={handleSave} className="gap-2 h-9 text-xs font-semibold shadow-xs">
                        {saved ? <Check className="size-4 text-emerald-400" /> : <Save className="size-4" />}
                        <span>{saved ? 'Changes Saved!' : 'Save Company Details'}</span>
                    </Button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    {/* Organization Identity */}
                    <Card className="border border-border/80 shadow-xs">
                        <CardHeader className="pb-3 border-b border-border/60">
                            <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                                <Building2 className="size-4 text-primary" />
                                General Business Identity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Organization Display Name</Label>
                                    <Input
                                        value={orgName}
                                        onChange={(e) => setOrgName(e.target.value)}
                                        className="h-9 text-xs"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Legal Corporate Name (Raison Sociale)</Label>
                                    <Input
                                        value={legalName}
                                        onChange={(e) => setLegalName(e.target.value)}
                                        className="h-9 text-xs font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Legal Form (Forme Juridique)</Label>
                                    <select
                                        value={legalForm}
                                        onChange={(e) => setLegalForm(e.target.value)}
                                        className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs cursor-pointer"
                                    >
                                        <option value="SARL">SARL (Société à Responsabilité Limitée)</option>
                                        <option value="EURL">EURL (Entreprise Unipersonnelle)</option>
                                        <option value="SPA">SPA (Société par Actions)</option>
                                        <option value="SNC">SNC</option>
                                        <option value="Auto-Entrepreneur">Statut Auto-Entrepreneur (DZ)</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Official Email</Label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-9 text-xs"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Corporate Phone</Label>
                                    <Input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-9 text-xs font-mono"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Algerian Tax & Commerce Registry Numbers */}
                    <Card className="border border-border/80 shadow-xs">
                        <CardHeader className="pb-3 border-b border-border/60">
                            <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                                <FileText className="size-4 text-primary" />
                                Registre de Commerce & Identifiants Fiscaux
                            </CardTitle>
                            <CardDescription className="text-xs">
                                Mandatory Algerian corporate identifiers for courier contracts and commercial invoicing.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Numéro de Registre de Commerce (RC)</Label>
                                    <Input
                                        value={rcNumber}
                                        onChange={(e) => setRcNumber(e.target.value)}
                                        className="h-9 text-xs font-mono font-bold"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Numéro d'Identification Fiscale (NIF)</Label>
                                    <Input
                                        value={nifNumber}
                                        onChange={(e) => setNifNumber(e.target.value)}
                                        className="h-9 text-xs font-mono font-bold"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Numéro Statistique (NIS)</Label>
                                    <Input
                                        value={nisNumber}
                                        onChange={(e) => setNisNumber(e.target.value)}
                                        className="h-9 text-xs font-mono font-bold"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Official Headquarters Address */}
                    <Card className="border border-border/80 shadow-xs">
                        <CardHeader className="pb-3 border-b border-border/60">
                            <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                                <MapPin className="size-4 text-primary" />
                                Siège Social (Headquarters Address)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Wilaya</Label>
                                    <select
                                        value={wilaya}
                                        onChange={(e) => setWilaya(e.target.value)}
                                        className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs cursor-pointer"
                                    >
                                        <option value="16 - Algiers">16 - Alger</option>
                                        <option value="31 - Oran">31 - Oran</option>
                                        <option value="25 - Constantine">25 - Constantine</option>
                                        <option value="19 - Sétif">19 - Sétif</option>
                                        <option value="09 - Blida">09 - Blida</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2 space-y-1.5">
                                    <Label className="text-xs font-medium">Full Physical Address</Label>
                                    <Input
                                        value={headquartersAddress}
                                        onChange={(e) => setHeadquartersAddress(e.target.value)}
                                        className="h-9 text-xs"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" className="gap-2 h-9 text-xs font-semibold shadow-xs">
                            <Save className="size-4" />
                            <span>Save Company Details</span>
                        </Button>
                    </div>
                </form>
            </div>
        </OrganizationLayout>
    );
}
