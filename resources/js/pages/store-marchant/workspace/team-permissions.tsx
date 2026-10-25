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
    UserCheck,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TeamMember {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'owner' | 'admin' | 'call_agent' | 'warehouse_agent';
    assigned_stores: string;
    calls_confirmed_today?: number;
    status: 'active' | 'invited';
}

const TEAM_MEMBERS: TeamMember[] = [
    {
        id: 'user_1',
        name: 'Lamine Bekheira',
        email: 'lamine@dzavenue.dz',
        phone: '0555 12 34 56',
        role: 'owner',
        assigned_stores: 'All Stores (Organization)',
        status: 'active',
    },
    {
        id: 'user_2',
        name: 'Khadija Merad',
        email: 'khadija@dzavenue.dz',
        phone: '0661 44 55 66',
        role: 'call_agent',
        assigned_stores: 'DzAvenue Boutique',
        calls_confirmed_today: 42,
        status: 'active',
    },
    {
        id: 'user_3',
        name: 'Yacine Bensalem',
        email: 'yacine@dzavenue.dz',
        phone: '0770 88 99 00',
        role: 'call_agent',
        assigned_stores: 'All Stores',
        calls_confirmed_today: 38,
        status: 'active',
    },
    {
        id: 'user_4',
        name: 'Nour El Houda',
        email: 'nour@dzavenue.dz',
        phone: '0550 33 22 11',
        role: 'warehouse_agent',
        assigned_stores: 'Alger Warehouse',
        status: 'active',
    },
];

export default function StoreMerchantTeamPermissions() {
    const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteName, setInviteName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<'admin' | 'call_agent' | 'warehouse_agent'>('call_agent');

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteName.trim() || !inviteEmail.trim()) return;

        const newMem: TeamMember = {
            id: `user_${Date.now()}`,
            name: inviteName,
            email: inviteEmail,
            phone: 'Pending',
            role: inviteRole,
            assigned_stores: 'DzAvenue Boutique',
            status: 'invited',
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
        <StoreMerchantLayout activeNav="team" title="Team & Call Center Agents">
            <Head title="Team & Agents - Atlas Commerce Group" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Team Members & Call Center Agents
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Manage staff permissions, call center confirmation operators, and warehouse packing staff.
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
                            <CardTitle className="text-sm font-semibold tracking-tight">Invite New Operator</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            <form onSubmit={handleInvite} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium">Full Name</Label>
                                        <Input
                                            required
                                            placeholder="e.g. Samia Djaballah"
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
                                            placeholder="agent@company.dz"
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
                                                    e.target.value as 'admin' | 'call_agent' | 'warehouse_agent',
                                                )
                                            }
                                            className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs cursor-pointer"
                                        >
                                            <option value="call_agent">Call Center Agent (Confirmation)</option>
                                            <option value="warehouse_agent">Warehouse & Packing Agent</option>
                                            <option value="admin">Store Admin (Full Access)</option>
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

                {/* Team Members Table */}
                <Card className="border border-border/80 shadow-xs">
                    <CardHeader className="pb-3 border-b border-border/60">
                        <CardTitle className="text-sm font-semibold tracking-tight">Active Staff & Agents</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-muted-foreground border-b border-border/60">
                                <tr>
                                    <th className="p-3.5 pl-5 font-semibold">Staff Member</th>
                                    <th className="p-3.5 font-semibold">Contact Email & Phone</th>
                                    <th className="p-3.5 font-semibold">Role</th>
                                    <th className="p-3.5 font-semibold">Store Access</th>
                                    <th className="p-3.5 font-semibold">Call Performance</th>
                                    <th className="p-3.5 font-semibold">Status</th>
                                    <th className="p-3.5 pr-5 text-right font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {members.map((member) => (
                                    <tr key={member.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-3.5 pl-5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <span className="font-semibold text-foreground">{member.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3.5">
                                            <div className="text-foreground">{member.email}</div>
                                            <span className="text-[10px] font-mono text-muted-foreground">
                                                {member.phone}
                                            </span>
                                        </td>
                                        <td className="p-3.5">
                                            {member.role === 'owner' && (
                                                <Badge className="bg-primary text-primary-foreground text-[10px]">
                                                    Organization Owner
                                                </Badge>
                                            )}
                                            {member.role === 'call_agent' && (
                                                <Badge className="bg-emerald-600 text-white text-[10px] flex items-center gap-1 w-fit">
                                                    <PhoneCall className="size-2.5" /> Call Agent
                                                </Badge>
                                            )}
                                            {member.role === 'warehouse_agent' && (
                                                <Badge variant="outline" className="text-[10px]">
                                                    Warehouse Staff
                                                </Badge>
                                            )}
                                            {member.role === 'admin' && (
                                                <Badge variant="secondary" className="text-[10px]">
                                                    Administrator
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 text-muted-foreground">
                                            {member.assigned_stores}
                                        </td>
                                        <td className="p-3.5 font-mono">
                                            {member.calls_confirmed_today !== undefined ? (
                                                <span className="text-emerald-600 font-bold">
                                                    {member.calls_confirmed_today} calls today
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">—</span>
                                            )}
                                        </td>
                                        <td className="p-3.5">
                                            {member.status === 'active' ? (
                                                <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-medium">
                                                    <Check className="size-3" /> Active
                                                </span>
                                            ) : (
                                                <Badge variant="secondary" className="text-[10px]">
                                                    Invited
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3.5 pr-5 text-right">
                                            {member.role !== 'owner' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(member.id)}
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
        </StoreMerchantLayout>
    );
}
