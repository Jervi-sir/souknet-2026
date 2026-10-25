import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Check,
    Plus,
    ArrowRight,
    Store,
    Users,
    ShieldCheck,
    Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface UserOrg {
    id: string;
    name: string;
    legal_name: string;
    role: string;
    stores_count: number;
    plan: string;
    is_active: boolean;
}

const MY_ORGANIZATIONS: UserOrg[] = [
    {
        id: 'org_1',
        name: 'Atlas Commerce Group',
        legal_name: 'SARL Atlas Commerce Algérie',
        role: 'Owner',
        stores_count: 3,
        plan: 'Pro Scale (DZD)',
        is_active: true,
    },
    {
        id: 'org_2',
        name: 'El Bahdja Retail',
        legal_name: 'EURL El Bahdja Distribution',
        role: 'Admin',
        stores_count: 1,
        plan: 'Starter COD',
        is_active: false,
    },
];

export default function OrganizationSelect() {
    const [selectedId, setSelectedId] = useState<string>('org_1');

    return (
        <div className="min-h-screen bg-muted/20 flex flex-col justify-center items-center p-4 antialiased font-sans">
            <Head title="Select Organization - Souknet" />

            <div className="w-full max-w-xl space-y-6">
                {/* Branding Header */}
                <div className="text-center space-y-2">
                    <div className="size-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto shadow-md">
                        S
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Select an Organization
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        Choose the business account or company you want to manage today.
                    </p>
                </div>

                {/* Organization Selection Cards */}
                <div className="space-y-3">
                    {MY_ORGANIZATIONS.map((org) => {
                        const isSelected = selectedId === org.id;
                        return (
                            <div
                                key={org.id}
                                onClick={() => setSelectedId(org.id)}
                                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between bg-card ${
                                    isSelected
                                        ? 'border-primary ring-2 ring-primary/20 shadow-md'
                                        : 'border-border/80 hover:border-foreground/40'
                                }`}
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                                        {org.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm text-foreground">
                                                {org.name}
                                            </span>
                                            <Badge variant="outline" className="text-[10px]">
                                                {org.role}
                                            </Badge>
                                        </div>
                                        <span className="text-xs text-muted-foreground block">
                                            {org.legal_name} • {org.stores_count} Stores • {org.plan}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div
                                        className={`size-5 rounded-full border flex items-center justify-center ${
                                            isSelected
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-muted-foreground'
                                        }`}
                                    >
                                        {isSelected && <Check className="size-3" />}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Action CTA */}
                <div className="space-y-3 pt-2">
                    <Link href="/store-merchant/dashboard" className="block w-full">
                        <Button className="w-full h-11 text-sm font-semibold gap-2 shadow-md">
                            <span>Enter Workspace</span>
                            <ArrowRight className="size-4" />
                        </Button>
                    </Link>

                    <div className="pt-2 border-t border-border/80 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Need to add another business?</span>
                        <Link
                            href="/organization/create"
                            className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                        >
                            <Plus className="size-3.5" />
                            <span>Create New Organization</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
