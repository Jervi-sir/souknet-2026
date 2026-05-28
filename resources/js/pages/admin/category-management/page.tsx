import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Building2,
    Tag,
    Palette,
    Layers,
    Info,
    AlertTriangle,
    Check,
} from 'lucide-react';

interface Category {
    id: number;
    code: string;
    en: string;
    fr: string | null;
    ar: string | null;
    icon: string | null;
    hex_color: string | null;
    sort_order: number;
    businesses_count: number;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedCategories {
    data: Category[];
    links: PaginationLinkType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface CategoryManagementProps {
    categories: PaginatedCategories;
    filters: {
        search: string;
        sort: string;
    };
    errors: {
        error?: string;
    };
}

export default function CategoryManagement({
    categories,
    filters,
    errors,
}: CategoryManagementProps) {
    const [search, setSearch] = useState(filters.search);
    const [sort, setSort] = useState(filters.sort);

    // Dialog form toggles
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

    // Form logic
    const { data, setData, post, patch, processing, reset, errors: formErrors } = useForm({
        code: '',
        en: '',
        fr: '',
        ar: '',
        icon: '',
        hex_color: '',
        sort_order: 0,
    });

    const applyFilters = (updatedParams?: Record<string, any>) => {
        const params = {
            search,
            sort,
            ...updatedParams,
        };

        // Clean up empty params
        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        router.get('/admin/categories', params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ page: 1 });
    };

    const handleSortChange = (newSort: string) => {
        setSort(newSort);
        applyFilters({ sort: newSort, page: 1 });
    };

    const openCreateModal = () => {
        reset();
        setIsCreateOpen(true);
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/categories', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
            },
        });
    };

    const openEditModal = (cat: Category) => {
        setEditingCategory(cat);
        setData({
            code: cat.code,
            en: cat.en,
            fr: cat.fr || '',
            ar: cat.ar || '',
            icon: cat.icon || '',
            hex_color: cat.hex_color || '',
            sort_order: cat.sort_order,
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;

        // Custom Inertia path call
        router.post(`/admin/categories/${editingCategory.id}`, {
            _method: 'PATCH',
            ...data,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingCategory(null);
            },
        });
    };

    const openDeleteModal = (cat: Category) => {
        setDeletingCategory(cat);
    };

    const handleDeleteSubmit = () => {
        if (!deletingCategory) return;

        router.delete(`/admin/categories/${deletingCategory.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingCategory(null);
            },
        });
    };

    return (
        <>
            <Head title="Admin Category Management" />

            <div className="space-y-6 text-zinc-100 bg-[#0A0A0A] p-1 rounded-xl">
                {/* Header */}
                <div className="border-b border-[#1F1F1F] pb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                            Category Catalog Manager
                        </h1>
                        <p className="text-xs text-zinc-400 mt-1">
                            Create, update translations, edit metadata colors, and order directory listings categories.
                        </p>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shrink-0"
                    >
                        <Plus className="h-4 w-4" />
                        Add Category
                    </Button>
                </div>

                {/* Filters toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:max-w-xs">
                        <div className="relative flex-1">
                            <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-500" />
                            <Input
                                type="text"
                                placeholder="Search code, translations..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500 text-xs sm:text-sm"
                            />
                        </div>
                        <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white">
                            Search
                        </Button>
                    </form>

                    <select
                        value={sort}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="bg-[#111111] border border-[#1F1F1F] text-zinc-300 text-xs rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
                    >
                        <option value="order_asc">Sort Order (Lowest)</option>
                        <option value="order_desc">Sort Order (Highest)</option>
                        <option value="name_asc">Name (A-Z)</option>
                        <option value="name_desc">Name (Z-A)</option>
                    </select>
                </div>

                {/* Display validation block error if category delete fails */}
                {errors.error && (
                    <div className="p-4 bg-rose-950/15 border border-rose-900/30 text-xs font-semibold text-rose-450 rounded-xl flex items-center gap-2">
                        <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                        {errors.error}
                    </div>
                )}

                {/* Categories Table */}
                {categories.data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#1F1F1F] bg-[#111111]/30 p-16 text-center">
                        <Tag className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
                        <h3 className="font-semibold text-zinc-400 text-sm">No categories found</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                            No directory categories match your filter parameters.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Card className="border-[#1F1F1F] bg-[#111111]/60 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#1F1F1F] bg-[#111111]/80 text-zinc-400 uppercase tracking-wider font-bold">
                                            <th className="p-4">Visual Details</th>
                                            <th className="p-4">Unique Code</th>
                                            <th className="p-4">English Name</th>
                                            <th className="p-4">French / Arabic</th>
                                            <th className="p-4">Sort Order</th>
                                            <th className="p-4">Linked Listings</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1F1F1F]/40 text-zinc-300">
                                        {categories.data.map((cat) => (
                                            <tr key={cat.id} className="hover:bg-[#161616]/40 transition-colors">
                                                {/* Visuals */}
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-200 text-xs border border-zinc-800"
                                                            style={{
                                                                backgroundColor: cat.hex_color || '#161616',
                                                            }}
                                                        >
                                                            <span className="text-[10px] truncate max-w-full font-mono">
                                                                {cat.icon ? cat.icon.substring(0, 3) : 'Tag'}
                                                            </span>
                                                        </div>
                                                        {cat.hex_color && (
                                                            <span className="text-[10px] text-zinc-500 font-mono">
                                                                {cat.hex_color}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Code */}
                                                <td className="p-4 font-bold text-white uppercase">{cat.code}</td>

                                                {/* English */}
                                                <td className="p-4 text-sm font-semibold text-zinc-150">{cat.en}</td>

                                                {/* Others */}
                                                <td className="p-4">
                                                    <div className="space-y-0.5 text-zinc-400">
                                                        <div>Fr: {cat.fr || <em className="text-zinc-600">N/A</em>}</div>
                                                        <div className="text-right-rtl">Ar: {cat.ar || <em className="text-zinc-600">N/A</em>}</div>
                                                    </div>
                                                </td>

                                                {/* Sort order */}
                                                <td className="p-4">
                                                    <Badge className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 font-mono">
                                                        {cat.sort_order}
                                                    </Badge>
                                                </td>

                                                {/* Count */}
                                                <td className="p-4 text-zinc-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <Building2 className="h-3.5 w-3.5 text-zinc-650" />
                                                        <span>Listings: <strong>{cat.businesses_count}</strong></span>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="p-4 text-right">
                                                    <div className="inline-flex gap-1.5">
                                                        {/* Edit */}
                                                        <Button
                                                            onClick={() => openEditModal(cat)}
                                                            size="sm"
                                                            className="h-8 w-8 p-0 bg-indigo-655/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-600/20"
                                                            title="Edit Category"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                        </Button>

                                                        {/* Delete */}
                                                        <Button
                                                            onClick={() => openDeleteModal(cat)}
                                                            size="sm"
                                                            className="h-8 w-8 p-0 bg-zinc-900 border border-[#2E2E2E] hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                                            title="Delete Category"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* Pagination links */}
                        {categories.last_page > 1 && (
                            <Pagination className="mt-8">
                                <PaginationContent>
                                    {categories.links.map((link, idx) => {
                                        const label = link.label
                                            .replace(/&laquo;/g, '«')
                                            .replace(/&raquo;/g, '»')
                                            .replace(/Previous/g, '')
                                            .replace(/Next/g, '');

                                        const isPrev = link.label.includes('Previous');
                                        const isNext = link.label.includes('Next');

                                        if (!link.url) {
                                            return (
                                                <PaginationItem key={idx} className="opacity-40 pointer-events-none">
                                                    {isPrev ? (
                                                        <PaginationPrevious href="#" />
                                                    ) : isNext ? (
                                                        <PaginationNext href="#" />
                                                    ) : (
                                                        <PaginationEllipsis />
                                                    )}
                                                </PaginationItem>
                                            );
                                        }

                                        const queryParams = new URL(link.url).search;

                                        return (
                                            <PaginationItem key={idx}>
                                                {isPrev ? (
                                                    <PaginationPrevious
                                                        href={`/admin/categories${queryParams}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(`/admin/categories${queryParams}`);
                                                        }}
                                                    />
                                                ) : isNext ? (
                                                    <PaginationNext
                                                        href={`/admin/categories${queryParams}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(`/admin/categories${queryParams}`);
                                                        }}
                                                    />
                                                ) : (
                                                    <PaginationLink
                                                        href={`/admin/categories${queryParams}`}
                                                        isActive={link.active}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(`/admin/categories${queryParams}`);
                                                        }}
                                                    >
                                                        {label}
                                                    </PaginationLink>
                                                )}
                                            </PaginationItem>
                                        );
                                    })}
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                )}
            </div>

            {/* Create & Edit unified dialog modal */}
            <Dialog open={isCreateOpen || editingCategory !== null} onOpenChange={(open) => {
                if (!open) {
                    setIsCreateOpen(false);
                    setEditingCategory(null);
                    reset();
                }
            }}>
                <DialogContent className="sm:max-w-lg bg-[#0F0F0F] border-[#1F1F1F] text-zinc-100">
                    <DialogHeader>
                        <DialogTitle className="text-white text-base sm:text-lg font-bold flex items-center gap-2">
                            <Layers className="h-5 w-5 text-indigo-400" />
                            {editingCategory ? 'Update Catalog Category' : 'Register New Catalog Category'}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 text-xs mt-1">
                            Set up code identifiers, visual themes (hex color, icons), and localized translations.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={editingCategory ? handleEditSubmit : handleCreateSubmit} className="space-y-4 pt-2">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Code */}
                            <div className="space-y-1.5 col-span-2">
                                <Label htmlFor="code" className="text-zinc-300 text-xs">Unique Identifier Code</Label>
                                <Input
                                    id="code"
                                    required
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                                    placeholder="e.g. medical-services"
                                    className="bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500 text-xs"
                                />
                                {formErrors.code && <p className="text-[10px] text-rose-500 mt-1">{formErrors.code}</p>}
                            </div>

                            {/* English */}
                            <div className="space-y-1.5">
                                <Label htmlFor="en" className="text-zinc-300 text-xs">Name (English)</Label>
                                <Input
                                    id="en"
                                    required
                                    value={data.en}
                                    onChange={(e) => setData('en', e.target.value)}
                                    placeholder="e.g. Medical Services"
                                    className="bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500 text-xs"
                                />
                                {formErrors.en && <p className="text-[10px] text-rose-500 mt-1">{formErrors.en}</p>}
                            </div>

                            {/* French */}
                            <div className="space-y-1.5">
                                <Label htmlFor="fr" className="text-zinc-300 text-xs">Name (French)</Label>
                                <Input
                                    id="fr"
                                    value={data.fr}
                                    onChange={(e) => setData('fr', e.target.value)}
                                    placeholder="e.g. Services Médicaux"
                                    className="bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500 text-xs"
                                />
                            </div>

                            {/* Arabic */}
                            <div className="space-y-1.5 col-span-2">
                                <Label htmlFor="ar" className="text-zinc-300 text-xs">Name (Arabic)</Label>
                                <Input
                                    id="ar"
                                    value={data.ar}
                                    onChange={(e) => setData('ar', e.target.value)}
                                    placeholder="e.g. خدمات طبية"
                                    className="bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500 text-xs text-right"
                                />
                            </div>

                            {/* Icon Name */}
                            <div className="space-y-1.5">
                                <Label htmlFor="icon" className="text-zinc-300 text-xs">Lucide Icon Class</Label>
                                <Input
                                    id="icon"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    placeholder="e.g. stethoscope"
                                    className="bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500 text-xs"
                                />
                            </div>

                            {/* Hex Color */}
                            <div className="space-y-1.5">
                                <Label htmlFor="hex_color" className="text-zinc-300 text-xs">Theme Hex Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="hex_color"
                                        value={data.hex_color}
                                        onChange={(e) => setData('hex_color', e.target.value)}
                                        placeholder="#6366F1"
                                        className="bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500 text-xs font-mono"
                                    />
                                    <div
                                        className="h-9 w-9 rounded-lg border border-[#1F1F1F] shrink-0"
                                        style={{ backgroundColor: data.hex_color || '#161616' }}
                                    />
                                </div>
                            </div>

                            {/* Sort Order */}
                            <div className="space-y-1.5 col-span-2">
                                <Label htmlFor="sort_order" className="text-zinc-300 text-xs">Display Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    required
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    className="bg-[#111111] border-[#1F1F1F] text-zinc-100 focus-visible:ring-indigo-500 text-xs"
                                />
                            </div>
                        </div>

                        <DialogFooter className="mt-6 gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    setIsCreateOpen(false);
                                    setEditingCategory(null);
                                    reset();
                                }}
                                className="text-xs text-zinc-400"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4"
                            >
                                {editingCategory ? 'Save Changes' : 'Create Category'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Deletion Dialog */}
            <Dialog open={deletingCategory !== null} onOpenChange={(open) => !open && setDeletingCategory(null)}>
                <DialogContent className="sm:max-w-md bg-[#0F0F0F] border-[#1F1F1F] text-zinc-100">
                    <DialogHeader>
                        <DialogTitle className="text-white text-base sm:text-lg font-bold flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-zinc-450" />
                            Delete Catalog Category
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 text-xs mt-1">
                            Confirm permanent deletion of category folder.
                        </DialogDescription>
                    </DialogHeader>

                    {deletingCategory && (
                        <div className="space-y-4 pt-2">
                            {deletingCategory.businesses_count > 0 ? (
                                <div className="p-3 bg-rose-950/15 border border-rose-900/40 rounded-lg text-xs text-rose-400 font-semibold flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
                                    <span>
                                        Block Warning: This category has <strong>{deletingCategory.businesses_count} listings</strong> linked to it. You cannot delete it until those listings are moved or deleted.
                                    </span>
                                </div>
                            ) : (
                                <div className="p-3 bg-amber-950/10 border border-amber-900/30 rounded-lg text-xs text-amber-400 font-semibold flex items-center gap-2">
                                    <Info className="h-4 w-4 text-amber-500 shrink-0" />
                                    Are you sure you want to delete category <strong>{deletingCategory.en}</strong>?
                                </div>
                            )}

                            <DialogFooter className="mt-4 gap-2 sm:gap-0">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setDeletingCategory(null)}
                                    className="text-xs text-zinc-400"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={deletingCategory.businesses_count > 0}
                                    onClick={handleDeleteSubmit}
                                    className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4 disabled:opacity-40 disabled:pointer-events-none"
                                >
                                    Confirm Delete
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

// Layout Wrapper
CategoryManagement.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={[{ title: 'Category Management', href: '/admin/categories' }]}>
        {page}
    </AdminLayout>
);
