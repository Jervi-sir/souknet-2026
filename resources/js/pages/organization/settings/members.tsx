import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Users,
    UserPlus,
    Shield,
    PhoneCall,
    Mail,
    Check,
    Trash2,
    ShieldCheck,
    Lock,
    Key,
    Phone,
} from 'lucide-react';
import OrganizationLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OrgMember {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'owner' | 'admin' | 'call_manager' | 'call_agent' | 'warehouse_staff';
    status: 'active' | 'invited';
    confirmed_calls_today?: number;
    joined_at: string;
}

const MEMBERS: OrgMember[] = [
    {
        id: 'mem_1',
        name: 'Lamine Bekheira',
        email: 'lamine@atlascommerce.dz',
        phone: '0555 12 34 56',
        role: 'owner',
        status: 'active',
        joined_at: 'Jan 2026',
    },
    {
        id: 'mem_2',
        name: 'Karim Zouaoui',
        email: 'karim@atlascommerce.dz',
        phone: '0661 22 33 44',
        role: 'admin',
        status: 'active',
        joined_at: 'Feb 2026',
    },
    {
        id: 'mem_3',
        name: 'Khadija Merad',
        email: 'khadija@atlascommerce.dz',
        phone: '0770 11 22 33',
        role: 'call_agent',
        status: 'active',
        confirmed_calls_today: 42,
        joined_at: 'Mar 2026',
    },
    {
        id: 'mem_4',
        name: 'Yacine Bensalem',
        email: 'yacine@atlascommerce.dz',
        phone: '0550 44 55 66',
        role: 'call_agent',
        status: 'active',
        confirmed_calls_today: 38,
        joined_at: 'Mar 2026',
    },
];

export default function OrganizationSettingsMembers() {
    const [members, setMembers] = useState<OrgMember[]>(MEMBERS);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteName, setInviteName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<'admin' | 'call_agent' | 'warehouse_staff'>('call_agent');

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteName.trim() || !inviteEmail.trim()) return;

        const newMem: OrgMember = {
            id: `mem_${Date.now()}`,
            name: inviteName,
            email: inviteEmail,
            phone: 'Pending',
            role: inviteRole,
            status: 'invited',
            joined_at: 'Today',
        };

        setMembers([...members, newMem]);
        setInviteName('');
        setInviteEmail('');
        setIsInviteOpen(false);
    };

    const handleDelete = (id: string) => {
        setMembers(members.filter((m) => m.id !== id));
    };

    return (
        <OrganizationLayout activeNav="members" title="Team Members & Roles">
            <Head title="Team Members - Atlas Commerce Group" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Team Members & Access Control
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Manage organization administrators, supervisors, and call center confirmation operators.
                        </p>
                    </div>

                    <Button
                        onClick={() => setIsInviteOpen(!isInviteOpen)}
                        className="gap-2 h-9 text-xs font-semibold shadow-xs"
                    >
                        <UserPlus className="size-3.5" />
                        <span>Invite Team Member</span>
                    </Button>
                </div>

                {/* Invite Form */}
                {isInviteOpen && (
                    <Card className="border-2 border-primary/20 bg-card shadow-md animate-in slide-in-from-top-3 duration-150">
                        <CardHeader className="pb-3 border-b border-border/60">
                            <CardTitle className="text-sm font-semibold tracking-tight">Invite Staff Member</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            <form onSubmit={handleInvite} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">Full Name</Label>
                                        <Input
                                            required
                                            placeholder="e.g. Nabil Benseghir"
                                            value={inviteName}
                                            onChange={(e) => setInviteName(e.target.value)}
                                            className="h-9 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">Email Address</Label>
                                        <Input
                                            required
                                            type="email"
                                            placeholder="nabil@company.dz"
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                            className="h-9 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">Role & Permissions</Label>
                                        <select
                                            value={inviteRole}
                                            onChange={(e) =>
                                                setInviteRole(
                                                    e.target.value as 'admin' | 'call_agent' | 'warehouse_staff',
                                                )
                                            }
                                            className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs cursor-pointer"
                                        >
                                            <option value="call_agent">Call Center Operator (Dialer & Suivi)</option>
                                            <option value="warehouse_staff">Warehouse & Packing Staff</option>
                                            <option value="admin">Administrator (All Stores & Settings)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsInviteOpen(false)}
                                        className="h-8 text-xs"
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" size="sm" className="h-8 text-xs font-semibold">
                                        Send Invitation
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Members Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Active Staff</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Member</th>
                                    <th className="p-3.5 font-semibold">Contact Email & Phone</th>
                                    <th className="p-3.5 font-semibold">Role</th>
                                    <th className="p-3.5 font-semibold">Confirmed Calls (Today)</th>
                                    <th className="p-3.5 font-semibold">Status</th>
                                    <th className="p-3.5 font-semibold">Joined</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {members.map((mem) => (
                                    <tr key={mem.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                                    {mem.name.charAt(0)}
                                                </div>
                                                <span className="font-semibold text-foreground">{mem.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3.5">
                                            <div className="text-foreground">{mem.email}</div>
                                            <span className="text-[10px] font-mono text-muted-foreground">
                                                {mem.phone}
                                            </span>
                                        </td>
                                        <td className="p-3.5">
                                            {mem.role === 'owner' && (
                                                <Badge className="bg-primary text-primary-foreground text-[10px]">
                                                    Owner
                                                </Badge>
                                            )}
                                            {mem.role === 'call_agent' && (
                                                <Badge className="bg-emerald-600 text-white text-[10px] flex items-center gap-1 w-fit">
                                                    <PhoneCall className="size-2.5" /> Call Agent
                                                </Badge>
                                            )}
                                            {mem.role === 'admin' && (
                                                <Badge variant="secondary" className="text-[10px]">
                                                    Admin
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 font-mono">
                                            {mem.confirmed_calls_today !== undefined ? (
                                                <span className="text-emerald-600 font-bold">
                                                    {mem.confirmed_calls_today} calls
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">—</span>
                                            )}
                                        </td>
                                        <td className="p-3.5">
                                            {mem.status === 'active' ? (
                                                <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-medium">
                                                    <Check className="size-3" /> Active
                                                </span>
                                            ) : (
                                                <Badge variant="secondary" className="text-[10px]">
                                                    Invited
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">{mem.joined_at}</td>
                                        <td className="p-3.5 pr-5 text-right">
                                            {mem.role !== 'owner' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(mem.id)}
                                                    className="text-muted-foreground hover:text-red-500 p-1"
                                                    title="Remove member"
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </OrganizationLayout>
    );
}
