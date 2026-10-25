import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Receipt,
    Download,
    Printer,
    FileSpreadsheet,
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    Search,
    Filter,
    ArrowUpRight,
    Copy,
    Check,
    CreditCard,
    DollarSign,
    ShieldCheck,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface FiscalInvoice {
    id: string;
    invoice_number: string;
    invoice_type: 'facture_definitive' | 'facture_proforma' | 'avoir';
    customer_client: string;
    client_type: 'individual' | 'corporate';
    client_nif?: string;
    client_nis?: string;
    client_rc?: string;
    wilaya: string;
    subtotal_ht_dzd: number;
    tva_rate_pct: number;
    tva_amount_dzd: number;
    timbre_fiscal_dzd: number;
    total_ttc_dzd: number;
    payment_mode: 'Cash on Delivery (Espèces)' | 'BaridiMob (Virement)' | 'Chèque Certifié';
    payment_status: 'paid' | 'pending' | 'cleared';
    date_issued: string;
    items: Array<{
        name: string;
        quantity: number;
        unit_price_ht: number;
        total_ht: number;
    }>;
}

const SAMPLE_INVOICES: FiscalInvoice[] = [
    {
        id: 'inv-01',
        invoice_number: 'FACT-2026-00481',
        invoice_type: 'facture_definitive',
        customer_client: 'SARL Atlas Logistics & Distribution',
        client_type: 'corporate',
        client_nif: '001916010048123',
        client_nis: '0912160500124',
        client_rc: '16/00-0948123B19',
        wilaya: '16 - Alger (Hydra)',
        subtotal_ht_dzd: 118000,
        tva_rate_pct: 19,
        tva_amount_dzd: 22420,
        timbre_fiscal_dzd: 2500,
        total_ttc_dzd: 142920,
        payment_mode: 'BaridiMob (Virement)',
        payment_status: 'paid',
        date_issued: '25 Oct 2026',
        items: [
            {
                name: 'AirPulse Breathable Shoes (Pack Pro Corporate 20x)',
                quantity: 20,
                unit_price_ht: 4957,
                total_ht: 99140,
            },
            {
                name: 'Comfort Performance Orthopedic Insole Pack',
                quantity: 20,
                unit_price_ht: 943,
                total_ht: 18860,
            },
        ],
    },
    {
        id: 'inv-02',
        invoice_number: 'FACT-2026-00482',
        invoice_type: 'facture_definitive',
        customer_client: 'Youcef Mahrez',
        client_type: 'individual',
        wilaya: '16 - Alger (Bab Ezzouar)',
        subtotal_ht_dzd: 5294,
        tva_rate_pct: 19,
        tva_amount_dzd: 1006,
        timbre_fiscal_dzd: 0,
        total_ttc_dzd: 6300,
        payment_mode: 'Cash on Delivery (Espèces)',
        payment_status: 'paid',
        date_issued: '25 Oct 2026',
        items: [
            {
                name: 'AirPulse Breathable Sport Sneaker (Carmine Red / 42)',
                quantity: 1,
                unit_price_ht: 4958,
                total_ht: 4958,
            },
            {
                name: 'Frais de livraison Yalidine Express Domicile',
                quantity: 1,
                unit_price_ht: 336,
                total_ht: 336,
            },
        ],
    },
    {
        id: 'inv-03',
        invoice_number: 'PROF-2026-00109',
        invoice_type: 'facture_proforma',
        customer_client: 'EURL Oran Sports Equipment',
        client_type: 'corporate',
        client_nif: '002031020084912',
        client_nis: '092031020014',
        client_rc: '31/00-1094812B20',
        wilaya: '31 - Oran (Es Senia)',
        subtotal_ht_dzd: 245000,
        tva_rate_pct: 19,
        tva_amount_dzd: 46550,
        timbre_fiscal_dzd: 2500,
        total_ttc_dzd: 294050,
        payment_mode: 'Chèque Certifié',
        payment_status: 'pending',
        date_issued: '24 Oct 2026',
        items: [
            {
                name: 'Titan Pro Ultra Smartwatch 2026 (Bulk 25x)',
                quantity: 25,
                unit_price_ht: 7479,
                total_ht: 186975,
            },
            {
                name: 'Titan Street Runner Exclusive Edition (10x)',
                quantity: 10,
                unit_price_ht: 5802,
                total_ht: 58025,
            },
        ],
    },
];

export default function MerchantFiscalInvoices() {
    const [invoices, setInvoices] = useState<FiscalInvoice[]>(SAMPLE_INVOICES);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>(SAMPLE_INVOICES[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string>('all');

    const activeInvoice = invoices.find((i) => i.id === selectedInvoiceId) || invoices[0];

    const filtered = invoices.filter((i) => {
        const matchesQuery =
            i.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.customer_client.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.wilaya.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || i.invoice_type === filterType;
        return matchesQuery && matchesType;
    });

    const handlePrintInvoice = () => {
        window.print();
    };

    return (
        <StoreMerchantLayout title="Fiscal Invoices & Receipts Generator" activeNav="invoices">
            <Head title="Algerian Invoices & Receipts - Souknet" />

            <div className="space-y-6 ">
                {/* Header Toolbar */}
                <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <Receipt className="size-5 text-primary" />
                            <span>Factures Fiscales & Reçus Commerciaux</span>
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Generate legally compliant Algerian invoices (Facture Définitive, Proforma, Reçu COD) with RC, NIF, NIS, Article d'Imposition & TVA 19%.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button onClick={handlePrintInvoice} className="h-9 text-xs gap-1.5 bg-primary font-semibold shadow-xs">
                            <Printer className="size-3.5" />
                            <span>Imprimer Facture (PDF)</span>
                        </Button>
                    </div>
                </div>

                {/* 2-Column Split: Invoices List on Left (4 cols) | Official Algerian Fiscal Invoice Document on Right (8 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Invoices Directory (4 cols, hidden during print) */}
                    <div className="print:hidden lg:col-span-4 space-y-3">
                        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                            <CardHeader className="p-3 pb-2 border-b border-border/80">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                                        Invoices Archive
                                    </span>
                                    <Badge variant="secondary" className="text-xs font-mono">
                                        {filtered.length} Invoices
                                    </Badge>
                                </div>
                                <div className="relative mt-2">
                                    <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search invoice or client..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="h-8 pl-8 text-xs"
                                    />
                                </div>
                            </CardHeader>

                            <div className="divide-y divide-border/60 max-h-[580px] overflow-y-auto">
                                {filtered.map((inv) => {
                                    const isSelected = inv.id === activeInvoice.id;
                                    return (
                                        <div
                                            key={inv.id}
                                            onClick={() => setSelectedInvoiceId(inv.id)}
                                            className={`p-3.5 cursor-pointer transition-all ${isSelected
                                                    ? 'bg-primary/10 border-l-4 border-l-primary'
                                                    : 'hover:bg-muted/40'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-mono font-bold text-xs text-foreground">
                                                    {inv.invoice_number}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {inv.date_issued}
                                                </span>
                                            </div>

                                            <div className="text-xs font-semibold text-foreground truncate">
                                                {inv.customer_client}
                                            </div>

                                            <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
                                                <span>{inv.wilaya}</span>
                                                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                                    {inv.total_ttc_dzd.toLocaleString()} DZD
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* Right: OFFICIAL ALGERIAN FISCAL INVOICE SHEET (8 cols) */}
                    <div className="lg:col-span-8 print:col-span-12">
                        <div className="bg-white text-black p-6 sm:p-10 rounded-2xl border border-border shadow-lg font-sans text-xs space-y-6 print:border-none print:shadow-none print:p-0">
                            {/* Invoice Header: Merchant Corporate Identity & Official Algerian Fiscal Identifiers */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-black">
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-tight text-black">
                                        DzAvenue Boutique Algérie
                                    </h2>
                                    <span className="text-[11px] text-zinc-600 block">
                                        Commerce de détail de chaussures & prêt-à-porter
                                    </span>
                                    <div className="mt-2 space-y-0.5 text-[10px] text-zinc-700 font-mono">
                                        <div><strong>Adresse:</strong> Cité 1024 Logements, Cheraga, Alger</div>
                                        <div><strong>RC:</strong> 16/00-0982341A21 · <strong>NIF:</strong> 002116010098234</div>
                                        <div><strong>NIS:</strong> 092116010048 · <strong>Art. d'Imposition:</strong> 16010948123</div>
                                        <div><strong>Téléphone:</strong> +213 (0) 555 99 88 77</div>
                                    </div>
                                </div>

                                <div className="text-left sm:text-right space-y-1">
                                    <div className="inline-block px-3 py-1 bg-black text-white font-black text-sm uppercase rounded">
                                        {activeInvoice.invoice_type === 'facture_definitive' && 'FACTURE DÉFINITIVE'}
                                        {activeInvoice.invoice_type === 'facture_proforma' && 'FACTURE PROFORMA'}
                                        {activeInvoice.invoice_type === 'avoir' && 'AVOIR COMMERCIAL'}
                                    </div>
                                    <div className="font-mono font-black text-base text-black mt-1">
                                        N° {activeInvoice.invoice_number}
                                    </div>
                                    <div className="text-zinc-600 text-[11px]">
                                        Date d'émission: <strong>{activeInvoice.date_issued}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Client Coordinates Box */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-black bg-zinc-50 text-[11px]">
                                <div>
                                    <span className="text-[9px] uppercase font-bold text-zinc-500 block">
                                        Facturé à (Client) :
                                    </span>
                                    <span className="font-black text-sm block text-black mt-0.5">
                                        {activeInvoice.customer_client}
                                    </span>
                                    <span className="text-zinc-700 block">{activeInvoice.wilaya}</span>
                                </div>

                                {activeInvoice.client_type === 'corporate' && (
                                    <div className="space-y-0.5 font-mono text-[10px] text-zinc-800">
                                        <div><strong>NIF Client:</strong> {activeInvoice.client_nif}</div>
                                        <div><strong>NIS Client:</strong> {activeInvoice.client_nis}</div>
                                        <div><strong>RC Client:</strong> {activeInvoice.client_rc}</div>
                                    </div>
                                )}
                            </div>

                            {/* Line Items Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-black bg-zinc-100 font-bold uppercase text-[10px]">
                                            <th className="p-2.5">Désignation des Articles</th>
                                            <th className="p-2.5 text-center w-16">Qté</th>
                                            <th className="p-2.5 text-right w-28">P.U. HT (DZD)</th>
                                            <th className="p-2.5 text-right w-32">Montant HT (DZD)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-200">
                                        {activeInvoice.items.map((it, idx) => (
                                            <tr key={idx}>
                                                <td className="p-2.5 font-medium">{it.name}</td>
                                                <td className="p-2.5 text-center font-mono">{it.quantity}</td>
                                                <td className="p-2.5 text-right font-mono">{it.unit_price_ht.toLocaleString()}</td>
                                                <td className="p-2.5 text-right font-mono font-bold">{it.total_ht.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Totals & Fiscal Calculation (HT, TVA 19%, Timbre, TTC) */}
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2 border-t border-black">
                                <div className="space-y-1 text-[11px] max-w-sm">
                                    <div className="font-bold text-black uppercase text-[10px]">
                                        Mode de Règlement :
                                    </div>
                                    <div className="font-semibold text-zinc-800">
                                        {activeInvoice.payment_mode}
                                    </div>
                                    <div className="text-[10px] text-zinc-600">
                                        Statut fiscal: <strong className="text-black">Acquitté & Déclaré</strong>
                                    </div>
                                </div>

                                <div className="w-full sm:w-64 space-y-1.5 text-xs font-mono">
                                    <div className="flex justify-between text-zinc-700">
                                        <span>Total Brut HT:</span>
                                        <span>{activeInvoice.subtotal_ht_dzd.toLocaleString()} DZD</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-700">
                                        <span>TVA (19%) :</span>
                                        <span>{activeInvoice.tva_amount_dzd.toLocaleString()} DZD</span>
                                    </div>
                                    {activeInvoice.timbre_fiscal_dzd > 0 && (
                                        <div className="flex justify-between text-zinc-700">
                                            <span>Droit de Timbre:</span>
                                            <span>{activeInvoice.timbre_fiscal_dzd.toLocaleString()} DZD</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-black text-sm pt-2 border-t-2 border-black text-black">
                                        <span>TOTAL NET TTC:</span>
                                        <span>{activeInvoice.total_ttc_dzd.toLocaleString()} DZD</span>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Notice & Signature Box */}
                            <div className="pt-6 border-t border-zinc-200 grid grid-cols-2 gap-8 text-[10px] text-zinc-600">
                                <div>
                                    <p>
                                        Arrêtée la présente facture à la somme de : <br />
                                        <strong className="text-black uppercase">
                                            {activeInvoice.total_ttc_dzd.toLocaleString()} Dinars Algériens TTC
                                        </strong>.
                                    </p>
                                </div>
                                <div className="border border-black p-3 h-28 flex flex-col justify-between text-center">
                                    <span className="font-bold uppercase text-[9px]">Cachet & Signature de la Direction</span>
                                    <span className="text-[8px] text-zinc-400">DzAvenue Commerce Algérie</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StoreMerchantLayout>
    );
}
