import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Search,
    User,
    Mail,
    Shield,
    Trash2,
    Calendar,
    X,
    UserCheck,
    Building2,
    MessageSquare,
    AlertTriangle,
} from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/layouts/admin-layout';

interface RoleType {
    id: number;
    code: string;
    en: string;
}

interface UserDataType {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    role_id: number;
    roles: RoleType | null;
    businesses_count: number;
    reviews_count: number;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedUsers {
    data: UserDataType[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface UserManagementProps {
    users: PaginatedUsers;
    roles: RoleType[];
    filters: {
        search: string;
        role: string;
        sort: string;
    };
    auth: {
        user: {
            id: number;
        };
    };
}

export default function UserManagement({
    users,
    roles,
    filters,
    auth,
}: UserManagementProps) {
    const [search, setSearch] = useState(filters.search);
    const [roleFilter, setRoleFilter] = useState(filters.role);
    const [sort, setSort] = useState(filters.sort);

    // Dialog state
    const [editingUser, setEditingUser] = useState<UserDataType | null>(null);
    const [deletingUser, setDeletingUser] = useState<UserDataType | null>(null);

    const { data: roleData, setData: setRoleData, processing: roleProcessing } = useForm({
        role_id: '',
    });

    const applyFilters = (updatedParams?: Record<string, any>) => {
        const params = {
            search,
            role: roleFilter,
            sort,
            ...updatedParams,
        };

        // Clean up empty params
        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        router.get('/admin/users', params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ page: 1 });
    };

    const handleRoleFilterChange = (newRole: string) => {
        setRoleFilter(newRole);
        applyFilters({ role: newRole, page: 1 });
    };

    const handleSortChange = (newSort: string) => {
        setSort(newSort);
        applyFilters({ sort: newSort, page: 1 });
    };

    const openRoleModal = (usr: UserDataType) => {
        setEditingUser(usr);
        setRoleData('role_id', usr.role_id.toString());
    };

    const handleRoleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingUser) {
return;
}

        router.post(`/admin/users/${editingUser.id}/role`, {
            _method: 'PATCH',
            role_id: roleData.role_id,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingUser(null);
            },
        });
    };

    const openDeleteModal = (usr: UserDataType) => {
        setDeletingUser(usr);
    };

    const handleDeleteSubmit = () => {
        if (!deletingUser) {
return;
}

        router.delete(`/admin/users/${deletingUser.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingUser(null);
            },
        });
    };

    const getRoleBadge = (roleCode: string) => {
        switch (roleCode) {
            case 'admin':
                return <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 font-semibold uppercase tracking-wider text-[10px]">Admin</Badge>;
            case 'business_owner':
                return <Badge className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-semibold uppercase tracking-wider text-[10px]">Owner</Badge>;
            case 'customer':
            default:
                return <Badge className="bg-zinc-800 text-zinc-400 border border-zinc-700 font-semibold uppercase tracking-wider text-[10px]">Customer</Badge>;
        }
    };

    return (
        <>
            <Head title="Admin User Management" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                {/* Header */}
                <div className="border-b border-[#262930] pb-5 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#4318FF] tracking-wider uppercase">System Administration</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white">
                            User Directory Management
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Inspect active users profiles, customize security authorization roles, and manage accounts.
                        </p>
                    </div>
                </div>

                {/* Filters Toolbar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    {/* Role filters tabs */}
                    <div className="flex items-center gap-1 bg-[#0c0d12] p-1 rounded-lg border border-[#262930] overflow-x-auto max-w-full">
                        {[
                            { code: 'all', label: 'All Users' },
                            { code: 'admin', label: 'Admins' },
                            { code: 'business_owner', label: 'Owners' },
                            { code: 'customer', label: 'Customers' },
                        ].map((tab) => (
                            <button
                                key={tab.code}
                                onClick={() => handleRoleFilterChange(tab.code)}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                                    roleFilter === tab.code
                                        ? 'bg-[#4318FF] text-white shadow-sm'
                                        : 'text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search / Sort */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
                        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:max-w-xs">
                            <div className="relative flex-1">
                                <Search className="absolute top-2.5 left-3 h-4 w-4 text-[#8f9bba]" />
                                <Input
                                    type="text"
                                    placeholder="Search name, email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 bg-[#111111] border-[#262930] text-zinc-150 focus-visible:ring-0 focus-visible:border-[#4318FF] text-xs h-9"
                                />
                            </div>
                            <Button type="submit" size="sm" className="bg-[#4318FF] hover:bg-[#3b15e6] text-white font-bold text-xs h-9 cursor-pointer">
                                Search
                            </Button>
                        </form>

                        <select
                            value={sort}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="bg-[#111111] border border-[#262930] text-white text-xs rounded-lg p-2 focus:ring-0 focus:border-[#4318FF] w-full sm:w-auto h-9 cursor-pointer focus:outline-none"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="name_asc">Name (A-Z)</option>
                            <option value="name_desc">Name (Z-A)</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                {users.data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#262930] bg-[#0c0d12]/30 p-16 text-center">
                        <User className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
                        <h3 className="font-semibold text-zinc-400 text-sm">No users found</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                            No registered users match your query parameters.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="border border-[#262930] bg-[#0c0d12] rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#262930] bg-[#0c0d12]/80 text-[#8f9bba] uppercase tracking-wider font-bold text-[10px]">
                                            <th className="p-4">User Details</th>
                                            <th className="p-4">Verification</th>
                                            <th className="p-4">Active Role</th>
                                            <th className="p-4">Submissions</th>
                                            <th className="p-4">Registered Date</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#262930]/40 text-zinc-300">
                                        {users.data.map((usr) => {
                                            const isSelf = auth.user.id === usr.id;
                                            const isVerified = usr.email_verified_at !== null;

                                            return (
                                                <tr key={usr.id} className="hover:bg-[#15171e]/40 transition-colors">
                                                    {/* Details */}
                                                    <td className="p-4">
                                                        <div>
                                                            <div className="font-bold text-white text-sm flex items-center gap-1.5">
                                                                {usr.name}
                                                                {isSelf && (
                                                                    <Badge className="bg-[#4318FF]/20 text-[#6AD2FF] border border-[#4318FF]/30 text-[9px] uppercase font-bold py-0.5">
                                                                        You
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="text-[11px] text-[#8f9bba] flex items-center gap-1 mt-0.5 font-medium">
                                                                <Mail className="h-3 w-3 text-zinc-500" />
                                                                {usr.email}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Verification */}
                                                    <td className="p-4">
                                                        {isVerified ? (
                                                            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                                                                <UserCheck className="h-4 w-4" />
                                                                Verified
                                                            </span>
                                                        ) : (
                                                            <span className="text-[#8f9bba] flex items-center gap-1 font-medium">
                                                                <X className="h-4 w-4" />
                                                                Pending
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Active Role */}
                                                    <td className="p-4">
                                                        {getRoleBadge(usr.roles?.code || 'customer')}
                                                    </td>

                                                    {/* Submissions */}
                                                    <td className="p-4">
                                                        <div className="space-y-1 text-[#8f9bba] font-medium">
                                                            <div className="flex items-center gap-1.5">
                                                                <Building2 className="h-3.5 w-3.5 text-zinc-650" />
                                                                <span>Listings: <strong className="text-white">{usr.businesses_count}</strong></span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <MessageSquare className="h-3.5 w-3.5 text-zinc-650" />
                                                                <span>Reviews: <strong className="text-white">{usr.reviews_count}</strong></span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Registered */}
                                                    <td className="p-4 text-[#8f9bba]">
                                                        <div className="flex items-center gap-1 font-medium">
                                                            <Calendar className="h-3.5 w-3.5 text-zinc-650" />
                                                            <span>{new Date(usr.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="p-4 text-right">
                                                        <div className="inline-flex gap-1.5">
                                                            {/* Change Role */}
                                                            <Button
                                                                disabled={isSelf}
                                                                onClick={() => openRoleModal(usr)}
                                                                size="sm"
                                                                className="h-8 text-xs bg-[#4318FF]/10 hover:bg-[#4318FF]/20 text-[#6AD2FF] border border-[#4318FF]/20 font-bold cursor-pointer"
                                                                title="Change Role"
                                                            >
                                                                <Shield className="h-3.5 w-3.5 mr-1" />
                                                                Role
                                                            </Button>

                                                            {/* Delete */}
                                                            <Button
                                                                disabled={isSelf}
                                                                onClick={() => openDeleteModal(usr)}
                                                                size="sm"
                                                                className="h-8 w-8 p-0 bg-[#111111] border border-[#262930] hover:bg-[#15171e]/40 text-[#8f9bba] hover:text-white cursor-pointer"
                                                                title="Delete User"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination links */}
                        {users.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-[#262930] pt-4">
                                <div className="text-xs text-[#8f9bba]">
                                    Showing{' '}
                                    <span className="text-white font-semibold">
                                        {users.data.length}
                                    </span>{' '}
                                    of{' '}
                                    <span className="text-white font-semibold">
                                        {users.total}
                                    </span>{' '}
                                    users
                                </div>
                                <div className="inline-flex gap-1.5">
                                    {users.links.map((link, idx) => {
                                        const label = link.label
                                            .replace(/&laquo;/g, '«')
                                            .replace(/&raquo;/g, '»')
                                            .replace(/Previous/g, '')
                                            .replace(/Next/g, '');

                                        if (!link.url) {
return null;
}

                                        const queryParams = new URL(link.url).search;

                                        return (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => router.visit(`/admin/users${queryParams}`)}
                                                className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                                                    link.active
                                                        ? 'border-[#4318FF] bg-[#4318FF] text-white'
                                                        : 'text-[#8f9bba] border-[#262930] bg-[#0c0d12] hover:bg-[#15171e]/40'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: label }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Change Role Dialog */}
            <Dialog open={editingUser !== null} onOpenChange={(open) => !open && setEditingUser(null)}>
                <DialogContent className="sm:max-w-md bg-[#0c0d12] border-[#262930] text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white text-base font-bold flex items-center gap-2">
                            <Shield className="h-5 w-5 text-[#4318FF]" />
                            Reassign User Role
                        </DialogTitle>
                        <DialogDescription className="text-[#8f9bba] text-xs mt-1">
                            Choose the security authorization access level for this user.
                        </DialogDescription>
                    </DialogHeader>

                    {editingUser && (
                        <form onSubmit={handleRoleSubmit} className="space-y-4 pt-2">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8f9bba]">Target User</label>
                                <div className="p-3 bg-[#111111] rounded-lg border border-[#262930] text-xs font-semibold text-white">
                                    {editingUser.name} ({editingUser.email})
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="role_id_select" className="text-[10px] font-bold uppercase tracking-wider text-[#8f9bba]">Target Role</label>
                                <select
                                    id="role_id_select"
                                    value={roleData.role_id}
                                    onChange={(e) => setRoleData('role_id', e.target.value)}
                                    className="bg-[#111111] border border-[#262930] text-white text-xs rounded-lg p-2.5 w-full focus:ring-0 focus:border-[#4318FF] focus:outline-none"
                                >
                                    {roles.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.en} ({r.code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <DialogFooter className="mt-4 gap-2 sm:gap-0">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setEditingUser(null)}
                                    className="text-xs text-[#8f9bba] hover:text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={roleProcessing}
                                    className="bg-[#4318FF] hover:bg-[#3b15e6] text-white text-xs font-bold px-4"
                                >
                                    Confirm Update
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Deletion Dialog */}
            <Dialog open={deletingUser !== null} onOpenChange={(open) => !open && setDeletingUser(null)}>
                <DialogContent className="sm:max-w-md bg-[#0c0d12] border-[#262930] text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white text-base font-bold flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-[#8f9bba]" />
                            Delete User Profile
                        </DialogTitle>
                        <DialogDescription className="text-[#8f9bba] text-xs mt-1">
                            Are you absolutely sure you want to permanently delete this user account? This action deletes all associated directory listings and comments.
                        </DialogDescription>
                    </DialogHeader>

                    {deletingUser && (
                        <div className="space-y-4 pt-2">
                            <div className="p-3 bg-rose-950/10 border border-rose-900/30 rounded-lg text-xs text-rose-450 font-bold flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                                Action cannot be undone. Permanent database removal.
                            </div>

                            <DialogFooter className="mt-4 gap-2 sm:gap-0">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setDeletingUser(null)}
                                    className="text-xs text-[#8f9bba] hover:text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDeleteSubmit}
                                    className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4"
                                >
                                    Yes, Delete User
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

UserManagement.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={[{ title: 'User Management', href: '/admin/users' }]}>
        {page}
    </AdminLayout>
);
