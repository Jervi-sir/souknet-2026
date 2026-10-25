import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Printer,
    FileText,
    Truck,
    Download,
    CheckCircle2,
    Barcode,
    Layers,
    MapPin,
    Building2,
    Calendar,
    Phone,
    ArrowLeft,
    Filter,
    Check,
    Search,
    Copy,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ShippingLabel {
    id: string;
    tracking_number: string;
    order_ref: string;
    customer_name: string;
    customer_phone: string;
    customer_phone_alt?: string;
    wilaya_code: string;
    wilaya_name: string;
    commune: string;
    delivery_mode: 'home' | 'stopdesk';
    stopdesk_bureau?: string;
    courier: 'Yalidine Express' | 'ZR Express';
    items_summary: string;
    quantity_total: number;
    weight_kg: number;
    cod_amount_dzd: number;
    shipping_paid_by: 'client' | 'merchant';
    fragile: boolean;
    free_exchange: boolean;
    delivery_note: string;
    barcode_representation: string;
    created_at: string;
}

const SAMPLE_LABELS: ShippingLabel[] = [
    {
        id: 'lbl-01',
        tracking_number: 'YAL-74811029',
        order_ref: 'DZ-91031',
        customer_name: 'Youcef Mahrez',
        customer_phone: '0555 99 88 77',
        customer_phone_alt: '0770 11 22 33',
        wilaya_code: '16',
        wilaya_name: 'Alger',
        commune: 'Bab Ezzouar',
        delivery_mode: 'home',
        courier: 'Yalidine Express',
        items_summary: 'AirPulse Breathable Shoes (Size 42 / Red)',
        quantity_total: 1,
        weight_kg: 0.85,
        cod_amount_dzd: 6300,
        shipping_paid_by: 'client',
        fragile: false,
        free_exchange: true,
        delivery_note: 'Appeler avant midi, villa en face du lycée.',
        barcode_representation: '||| | | || ||| || | ||| | ||',
        created_at: 'Oct 25, 2026',
    },
    {
        id: 'lbl-02',
        tracking_number: 'YAL-74811030',
        order_ref: 'DZ-91032',
        customer_name: 'Amira Boudiaf',
        customer_phone: '0661 22 33 44',
        wilaya_code: '31',
        wilaya_name: 'Oran',
        commune: 'Bir El Djir',
        delivery_mode: 'stopdesk',
        stopdesk_bureau: 'Bureau Yalidine Bir El Djir (Centre commercial)',
        courier: 'Yalidine Express',
        items_summary: 'Comfort Performance Insole Gel (Pack 2x) + Socks',
        quantity_total: 3,
        weight_kg: 0.45,
        cod_amount_dzd: 4200,
        shipping_paid_by: 'client',
        fragile: false,
        free_exchange: false,
        delivery_note: 'Récupération stopdesk après 16h.',
        barcode_representation: '|| | ||| | | || ||| | ||| ||',
        created_at: 'Oct 25, 2026',
    },
    {
        id: 'lbl-03',
        tracking_number: 'ZR-89021488',
        order_ref: 'DZ-91033',
        customer_name: 'Karim Saidi',
        customer_phone: '0772 45 67 89',
        wilaya_code: '25',
        wilaya_name: 'Constantine',
        commune: 'Ali Mendjeli',
        delivery_mode: 'home',
        courier: 'ZR Express',
        items_summary: 'Titan Pro Ultra Smartwatch (Arabic Edition)',
        quantity_total: 1,
        weight_kg: 0.35,
        cod_amount_dzd: 8900,
        shipping_paid_by: 'client',
        fragile: true,
        free_exchange: true,
        delivery_note: 'Bâtiment 14, Porte 03, Nouvelle Ville.',
        barcode_representation: '|||| | | ||| | || | ||| | ||',
        created_at: 'Oct 25, 2026',
    },
    {
        id: 'lbl-04',
        tracking_number: 'ZR-89021489',
        order_ref: 'DZ-91034',
        customer_name: 'Salima Chergui',
        customer_phone: '0560 12 34 56',
        wilaya_code: '06',
        wilaya_name: 'Béjaïa',
        commune: 'Akbou',
        delivery_mode: 'home',
        courier: 'ZR Express',
        items_summary: 'ActiveFit Training Set (Size M / Black)',
        quantity_total: 1,
        weight_kg: 0.60,
        cod_amount_dzd: 5400,
        shipping_paid_by: 'client',
        fragile: false,
        free_exchange: true,
        delivery_note: 'Près de la mosquée Al-Nour.',
        barcode_representation: '|| | || | ||| || | | |||| ||',
        created_at: 'Oct 25, 2026',
    },
];

export default function ShippingLabelsManifest() {
    const [selectedLabels, setSelectedLabels] = useState<string[]>(SAMPLE_LABELS.map((l) => l.id));
    const [labelFormat, setLabelFormat] = useState<'thermal_100x150' | 'a4_four_per_page'>('thermal_100x150');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'labels' | 'manifest'>('labels');

    const filteredLabels = SAMPLE_LABELS.filter((l) => {
        const fullTxt = `${l.tracking_number} ${l.order_ref} ${l.customer_name} ${l.wilaya_name}`.toLowerCase();
        return fullTxt.includes(searchQuery.toLowerCase());
    });

    const toggleSelectLabel = (id: string) => {
        if (selectedLabels.includes(id)) {
            setSelectedLabels(selectedLabels.filter((x) => x !== id));
        } else {
            setSelectedLabels([...selectedLabels, id]);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const totalCOD = SAMPLE_LABELS.filter((l) => selectedLabels.includes(l.id)).reduce(
        (sum, l) => sum + l.cod_amount_dzd,
        0
    );

    return (
        <StoreMerchantLayout title="Shipping Labels & Expedition Manifests" activeNav="shipping-labels">
            <Head title="Print Shipping Labels & Manifests - Souknet" />

            <div className="space-y-6 ">
                {/* Print Control Toolbar (Hidden during browser printing) */}
                <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <Printer className="size-5 text-primary" />
                            <span>Bordereaux d'expédition & Manifestes</span>
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Generate thermal 100x150mm sticky labels and official courier pickup manifest for Yalidine & ZR Express.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Format Toggle */}
                        <div className="inline-flex rounded-lg border border-border p-1 bg-background text-xs">
                            <button
                                onClick={() => setLabelFormat('thermal_100x150')}
                                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${labelFormat === 'thermal_100x150'
                                        ? 'bg-primary text-primary-foreground shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Thermal 100×150mm
                            </button>
                            <button
                                onClick={() => setLabelFormat('a4_four_per_page')}
                                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${labelFormat === 'a4_four_per_page'
                                        ? 'bg-primary text-primary-foreground shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                A4 Sheet (4x)
                            </button>
                        </div>

                        <Button onClick={handlePrint} className="h-9 text-xs gap-1.5 bg-primary font-semibold shadow-xs">
                            <Printer className="size-3.5" />
                            <span>Print Selected ({selectedLabels.length})</span>
                        </Button>
                    </div>
                </div>

                {/* Sub-Tabs: Labels View vs Formal Courier Pickup Manifest */}
                <div className="print:hidden flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setActiveTab('labels')}
                            className={`text-xs font-semibold pb-1 border-b-2 transition-colors ${activeTab === 'labels'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Thermal Shipping Labels Preview
                        </button>
                        <button
                            onClick={() => setActiveTab('manifest')}
                            className={`text-xs font-semibold pb-1 border-b-2 transition-colors ${activeTab === 'manifest'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Official Courier Pickup Manifest (Bordereau de ramassage)
                        </button>
                    </div>

                    <div className="text-xs text-muted-foreground font-mono">
                        Total COD to Collect: <strong className="text-foreground">{totalCOD.toLocaleString()} DZD</strong>
                    </div>
                </div>

                {/* VIEW 1: THERMAL SHIPPING LABELS (Standard 100x150mm Layout) */}
                {activeTab === 'labels' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {filteredLabels.map((label) => {
                            const isSelected = selectedLabels.includes(label.id);
                            return (
                                <div key={label.id} className="space-y-2">
                                    <div className="print:hidden flex items-center justify-between text-xs px-1">
                                        <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => toggleSelectLabel(label.id)}
                                                className="rounded border-border text-primary focus:ring-0"
                                            />
                                            <span className="font-mono font-semibold">{label.tracking_number}</span>
                                        </label>
                                        <Badge variant="outline" className="text-[10px]">
                                            {label.courier}
                                        </Badge>
                                    </div>

                                    {/* Standard 100x150 Thermal Sticker Representation */}
                                    <div className="w-full max-w-[420px] mx-auto bg-white text-black p-4 rounded-xl border-2 border-black font-sans shadow-md space-y-3 print:border-black print:shadow-none print:m-0 print:break-after-page">
                                        {/* Label Top Bar: Courier Brand & Wilaya Big Code */}
                                        <div className="flex items-center justify-between border-b-2 border-black pb-2">
                                            <div>
                                                <span className="text-base font-black tracking-tight block uppercase">
                                                    {label.courier}
                                                </span>
                                                <span className="text-[9px] uppercase tracking-wider block font-semibold">
                                                    Livraison Express COD
                                                </span>
                                            </div>
                                            <div className="border-2 border-black px-3 py-1 text-center bg-black text-white">
                                                <span className="text-[9px] uppercase block font-bold">Wilaya</span>
                                                <span className="text-2xl font-black font-mono leading-none">
                                                    {label.wilaya_code}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Barcode & Tracking Number */}
                                        <div className="text-center py-1 border-b border-black space-y-1">
                                            <div className="font-mono tracking-widest text-2xl font-black py-1 select-none">
                                                {label.barcode_representation}
                                            </div>
                                            <div className="font-mono font-bold text-sm tracking-wider">
                                                {label.tracking_number}
                                            </div>
                                            <span className="text-[10px] text-zinc-600 block">
                                                Réf Commande: <strong>{label.order_ref}</strong>
                                            </span>
                                        </div>

                                        {/* Destination Address & Recipient */}
                                        <div className="grid grid-cols-2 gap-2 border-b-2 border-black pb-2 text-[11px] leading-tight">
                                            <div>
                                                <span className="text-[9px] uppercase font-bold text-zinc-500 block">
                                                    Destinataire:
                                                </span>
                                                <span className="font-black text-xs block text-black">
                                                    {label.customer_name}
                                                </span>
                                                <span className="font-mono font-bold block text-black mt-0.5">
                                                    {label.customer_phone}
                                                </span>
                                                {label.customer_phone_alt && (
                                                    <span className="font-mono text-[10px] text-zinc-600 block">
                                                        Alt: {label.customer_phone_alt}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <span className="text-[9px] uppercase font-bold text-zinc-500 block">
                                                    Destination:
                                                </span>
                                                <span className="font-bold text-black block">
                                                    {label.wilaya_name}
                                                </span>
                                                <span className="font-semibold text-black block">
                                                    {label.commune}
                                                </span>
                                                <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.5 bg-black text-white rounded">
                                                    {label.delivery_mode === 'home' ? 'À DOMICILE' : 'STOPDESK / BUREAU'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Stopdesk Bureau or Special Note */}
                                        {label.delivery_mode === 'stopdesk' && label.stopdesk_bureau && (
                                            <div className="p-1.5 bg-zinc-100 border border-black text-[10px] font-bold">
                                                Bureau de retrait: {label.stopdesk_bureau}
                                            </div>
                                        )}

                                        {label.delivery_note && (
                                            <div className="text-[10px] italic border-b border-black pb-1">
                                                Note livreur: "{label.delivery_note}"
                                            </div>
                                        )}

                                        {/* Product Contents Summary */}
                                        <div className="text-[10px] border-b border-black pb-1.5">
                                            <span className="font-bold uppercase text-[9px] text-zinc-500 block">
                                                Contenu du colis ({label.quantity_total} article - {label.weight_kg}kg):
                                            </span>
                                            <span className="font-medium">{label.items_summary}</span>
                                        </div>

                                        {/* BIG COD AMOUNT TO COLLECT (Crucial for Algerian Delivery Drivers) */}
                                        <div className="p-2 border-2 border-black flex items-center justify-between bg-zinc-50">
                                            <div>
                                                <span className="text-[9px] font-black uppercase tracking-wider block">
                                                    Montant à Encaisser (COD)
                                                </span>
                                                <span className="text-[9px] text-zinc-600 font-semibold">
                                                    Paiement en espèces au livreur
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-black font-mono leading-none">
                                                    {label.cod_amount_dzd.toLocaleString()}
                                                </span>
                                                <span className="text-xs font-black ml-1 font-mono">DZD</span>
                                            </div>
                                        </div>

                                        {/* Sender Expeditor Footer */}
                                        <div className="pt-1 flex items-center justify-between text-[9px] text-zinc-600 font-medium">
                                            <span>Expéditeur: DzAvenue Boutique (Cheraga, Alger)</span>
                                            <span>Souknet COD System</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* VIEW 2: FORMAL COURIER PICKUP MANIFEST (BORDEREAU DE RAMASSAGE) */}
                {activeTab === 'manifest' && (
                    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                        <CardHeader className="p-5 border-b border-border/80">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Building2 className="size-4 text-primary" />
                                        <CardTitle className="text-base font-bold">
                                            Manifeste de Ramassage Transporteur (Pickup Manifest)
                                        </CardTitle>
                                    </div>
                                    <CardDescription className="text-xs mt-0.5">
                                        Document officiel de remise des colis au livreur Yalidine / ZR Express.
                                    </CardDescription>
                                </div>

                                <div className="text-right text-xs">
                                    <span className="text-muted-foreground block">Date d'enlèvement:</span>
                                    <span className="font-mono font-bold text-foreground">
                                        25 Octobre 2026 · 14:30
                                    </span>
                                </div>
                            </div>
                        </CardHeader>

                        <div className="p-5 space-y-6">
                            {/* Merchant & Courier Coordinates */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-border bg-muted/20 text-xs">
                                <div>
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                                        Expéditeur (Marchand Souknet)
                                    </span>
                                    <span className="font-bold text-foreground text-sm block">
                                        DzAvenue Boutique
                                    </span>
                                    <span className="text-muted-foreground">Entrepôt Cheraga, Alger (0555 00 11 22)</span>
                                </div>

                                <div>
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                                        Transporteur Assermenté
                                    </span>
                                    <span className="font-bold text-foreground text-sm block">
                                        Yalidine Express Algérie
                                    </span>
                                    <span className="text-muted-foreground">Centre de tri Oued Smar, Alger</span>
                                </div>
                            </div>

                            {/* Parcels Table */}
                            <div className="overflow-x-auto rounded-xl border border-border">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-muted/40 border-b border-border text-[11px] uppercase text-muted-foreground font-semibold">
                                        <tr>
                                            <th className="p-3">N° Tracking</th>
                                            <th className="p-3">Réf Commande</th>
                                            <th className="p-3">Destinataire</th>
                                            <th className="p-3">Wilaya & Commune</th>
                                            <th className="p-3">Mode</th>
                                            <th className="p-3 text-right">Montant COD (DZD)</th>
                                            <th className="p-3 text-center">Émargement Livreur</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/60">
                                        {filteredLabels.map((l) => (
                                            <tr key={l.id} className="hover:bg-muted/20">
                                                <td className="p-3 font-mono font-bold text-foreground">
                                                    {l.tracking_number}
                                                </td>
                                                <td className="p-3 font-mono text-muted-foreground">
                                                    {l.order_ref}
                                                </td>
                                                <td className="p-3 font-medium text-foreground">
                                                    {l.customer_name} <br />
                                                    <span className="text-[10px] font-mono text-muted-foreground">
                                                        {l.customer_phone}
                                                    </span>
                                                </td>
                                                <td className="p-3 font-medium">
                                                    {l.wilaya_code} - {l.wilaya_name} ({l.commune})
                                                </td>
                                                <td className="p-3">
                                                    <Badge variant="outline" className="text-[9px]">
                                                        {l.delivery_mode === 'home' ? 'Domicile' : 'Stopdesk'}
                                                    </Badge>
                                                </td>
                                                <td className="p-3 text-right font-mono font-bold text-foreground">
                                                    {l.cod_amount_dzd.toLocaleString()} DZD
                                                </td>
                                                <td className="p-3 text-center text-muted-foreground">
                                                    [ _______ ]
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="border-t-2 border-border font-bold bg-muted/30">
                                        <tr>
                                            <td colSpan={5} className="p-3 text-right uppercase text-[11px]">
                                                Total Colis Remis ({filteredLabels.length} Colis) :
                                            </td>
                                            <td className="p-3 text-right font-mono text-sm text-foreground">
                                                {totalCOD.toLocaleString()} DZD
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            {/* Signatures Box */}
                            <div className="grid grid-cols-2 gap-6 pt-4 text-xs">
                                <div className="p-4 rounded-xl border border-border h-32 flex flex-col justify-between">
                                    <span className="text-[11px] font-bold text-muted-foreground uppercase">
                                        Signature & Cachet Marchand :
                                    </span>
                                    <div className="border-t border-dashed border-border/80 pt-1 text-[10px] text-muted-foreground">
                                        Responsable logistique DzAvenue
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl border border-border h-32 flex flex-col justify-between">
                                    <span className="text-[11px] font-bold text-muted-foreground uppercase">
                                        Signature & Matricule Livreur (Transporteur) :
                                    </span>
                                    <div className="border-t border-dashed border-border/80 pt-1 text-[10px] text-muted-foreground">
                                        Nom & N° Carte chauffeur
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </StoreMerchantLayout>
    );
}
