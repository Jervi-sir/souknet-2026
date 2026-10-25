import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Globe,
    CheckCircle2,
    Clock,
    Copy,
    Check,
    AlertCircle,
    Plus,
    RefreshCw,
    ShieldCheck,
    ExternalLink,
    Lock,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DomainRecord {
    id: string;
    domain: string;
    type: 'subdomain' | 'custom';
    status: 'active' | 'pending_dns' | 'ssl_issuing';
    is_primary: boolean;
    ssl_active: boolean;
    created_at: string;
}

const INITIAL_DOMAINS: DomainRecord[] = [
    {
        id: 'dom_1',
        domain: 'dzavenue.souknet.dz',
        type: 'subdomain',
        status: 'active',
        is_primary: false,
        ssl_active: true,
        created_at: '2026-01-15',
    },
    {
        id: 'dom_2',
        domain: 'dzavenue.dz',
        type: 'custom',
        status: 'active',
        is_primary: true,
        ssl_active: true,
        created_at: '2026-03-02',
    },
];

export default function StoreMerchantDomain() {
    const [domains, setDomains] = useState<DomainRecord[]>(INITIAL_DOMAINS);
    const [newDomain, setNewDomain] = useState('');
    const [copiedValue, setCopiedValue] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedValue(text);
        setTimeout(() => setCopiedValue(null), 2000);
    };

    const handleAddDomain = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDomain.trim()) return;

        const record: DomainRecord = {
            id: `dom_${Date.now()}`,
            domain: newDomain.trim().toLowerCase(),
            type: 'custom',
            status: 'pending_dns',
            is_primary: false,
            ssl_active: false,
            created_at: 'Today',
        };

        setDomains([...domains, record]);
        setNewDomain('');
    };

    const handleVerifyDNS = () => {
        setIsChecking(true);
        setTimeout(() => {
            setIsChecking(false);
            alert('DNS records verified successfully! SSL certificate is active.');
        }, 1200);
    };

    return (
        <StoreMerchantLayout activeNav="domain" title="Domain Management">
            <Head title="Custom Domain - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Custom Domains & Branding
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Connect your own Algerian domain (e.g. <strong>.dz</strong> or <strong>.com</strong>) with automatic SSL certificate encryption.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleVerifyDNS}
                        disabled={isChecking}
                        className="gap-2 h-9 text-xs"
                    >
                        <RefreshCw className={`size-3.5 ${isChecking ? 'animate-spin' : ''}`} />
                        <span>Check DNS Status</span>
                    </Button>
                </div>

                {/* Connect New Custom Domain Input */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                            <Plus className="size-4 text-primary" />
                            Connect Existing Domain
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Enter the domain name you purchased from your registrar (e.g. Nic.dz, Namecheap, GoDaddy).
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5">
                        <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    placeholder="e.g. boutique-alger.dz or mybrand.com"
                                    value={newDomain}
                                    onChange={(e) => setNewDomain(e.target.value)}
                                    className="pl-9 h-10 text-xs font-mono"
                                />
                            </div>
                            <Button type="submit" className="h-10 px-5 text-xs font-semibold gap-1.5 shadow-xs">
                                <span>Add Domain</span>
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Connected Domains Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Active Domains</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Domain Name</th>
                                    <th className="p-3.5 font-semibold">Type</th>
                                    <th className="p-3.5 font-semibold">SSL Certificate</th>
                                    <th className="p-3.5 font-semibold">DNS Status</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {domains.map((dom) => (
                                    <tr key={dom.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5">
                                            <div className="flex items-center gap-2 font-mono font-bold text-foreground">
                                                <span>{dom.domain}</span>
                                                {dom.is_primary && (
                                                    <Badge className="bg-primary text-[10px] py-0 px-1.5">
                                                        Primary
                                                    </Badge>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3.5">
                                            <Badge variant="outline" className="text-[10px] capitalize">
                                                {dom.type}
                                            </Badge>
                                        </td>
                                        <td className="p-3.5">
                                            {dom.ssl_active ? (
                                                <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                                                    <Lock className="size-3" /> Encrypted (HTTPS)
                                                </span>
                                            ) : (
                                                <span className="text-amber-600">Pending SSL</span>
                                            )}
                                        </td>
                                        <td className="p-3.5">
                                            {dom.status === 'active' ? (
                                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                                    Connected & Live
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="text-[10px] text-amber-600">
                                                    Action Required (DNS)
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            <a
                                                href={`https://${dom.domain}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs"
                                            >
                                                <span>Visit</span>
                                                <ExternalLink className="size-3" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* DNS Configuration Helper Guide */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                            <ShieldCheck className="size-4 text-emerald-600" />
                            DNS Setup Instructions (Pour les domaines .DZ & .COM)
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Add these 2 DNS records in your domain registrar's DNS management panel:
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border text-xs">
                            <div className="p-3.5 bg-muted/30 grid grid-cols-12 gap-3 items-center">
                                <div className="col-span-2 font-bold font-mono">Type A</div>
                                <div className="col-span-3 text-muted-foreground">Host: @</div>
                                <div className="col-span-5 font-mono text-foreground font-semibold">185.199.108.153</div>
                                <div className="col-span-2 text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleCopy('185.199.108.153')}
                                        className="h-7 text-xs px-2 gap-1"
                                    >
                                        {copiedValue === '185.199.108.153' ? (
                                            <Check className="size-3 text-emerald-500" />
                                        ) : (
                                            <Copy className="size-3" />
                                        )}
                                        <span>Copy</span>
                                    </Button>
                                </div>
                            </div>

                            <div className="p-3.5 bg-muted/30 grid grid-cols-12 gap-3 items-center">
                                <div className="col-span-2 font-bold font-mono">CNAME</div>
                                <div className="col-span-3 text-muted-foreground">Host: www</div>
                                <div className="col-span-5 font-mono text-foreground font-semibold">ingress.souknet.dz</div>
                                <div className="col-span-2 text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleCopy('ingress.souknet.dz')}
                                        className="h-7 text-xs px-2 gap-1"
                                    >
                                        {copiedValue === 'ingress.souknet.dz' ? (
                                            <Check className="size-3 text-emerald-500" />
                                        ) : (
                                            <Copy className="size-3" />
                                        )}
                                        <span>Copy</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <p className="text-[11px] text-muted-foreground">
                            * Note: DNS propagation across Algerian telecoms (Mobilis, Djezzy, Ooredoo, Algérie Télécom) usually takes between 10 minutes to 2 hours.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </StoreMerchantLayout>
    );
}
