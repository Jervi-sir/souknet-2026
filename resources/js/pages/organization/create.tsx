import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Plus,
    Check,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    Store,
    Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function OrganizationCreate() {
    const [name, setName] = useState('');
    const [legalName, setLegalName] = useState('');
    const [wilaya, setWilaya] = useState('16 - Algiers');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            window.location.href = '/store-merchant/dashboard';
        }, 800);
    };

    return (
        <div className="min-h-screen bg-muted/20 flex flex-col justify-center items-center p-4 antialiased font-sans">
            <Head title="Create Organization - Souknet" />

            <div className="w-full max-w-lg space-y-6">
                <Link
                    href="/organization/select"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="size-3.5" />
                    <span>Back to Organization Selection</span>
                </Link>

                <Card className="border border-border/80 shadow-md">
                    <CardHeader className="space-y-1 pb-4 border-b border-border/60">
                        <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-1 shadow-sm">
                            <Building2 className="size-5" />
                        </div>
                        <CardTitle className="text-xl font-bold tracking-tight">
                            Create a New Organization
                        </CardTitle>
                        <CardDescription className="text-xs">
                            An Organization represents your business entity or holding that manages multiple online stores in Algeria.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium">Organization / Company Name *</Label>
                                <Input
                                    required
                                    placeholder="e.g. Atlas Commerce Group"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="h-10 text-xs"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium">Legal Name (Raison Sociale)</Label>
                                <Input
                                    placeholder="e.g. SARL Atlas Commerce Algérie"
                                    value={legalName}
                                    onChange={(e) => setLegalName(e.target.value)}
                                    className="h-10 text-xs"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium">Headquarters Wilaya</Label>
                                <select
                                    value={wilaya}
                                    onChange={(e) => setWilaya(e.target.value)}
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-xs cursor-pointer"
                                >
                                    <option value="16 - Algiers">16 - Alger</option>
                                    <option value="31 - Oran">31 - Oran</option>
                                    <option value="25 - Constantine">25 - Constantine</option>
                                    <option value="19 - Sétif">19 - Sétif</option>
                                    <option value="09 - Blida">09 - Blida</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-11 text-xs font-semibold gap-2 shadow-md"
                                >
                                    <span>{isSubmitting ? 'Creating Organization...' : 'Create Organization & Continue'}</span>
                                    <ArrowRight className="size-4" />
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
