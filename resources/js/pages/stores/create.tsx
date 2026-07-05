import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, ShoppingBag, Palette } from 'lucide-react';
import React from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import StoreLayout from '@/layouts/store-layout';
import StoreController from '@/actions/App/Http/Controllers/Owner/StoreController';

export default function CreateStore() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        domain: '',
        theme_color: '#4318FF',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(StoreController.store.url());
    };

    return (
        <>
            <Head title="Create New Store" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                <div>
                    <Link
                        href="/stores"
                        className="inline-flex items-center gap-1.5 text-xs text-[#8f9bba] hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Stores
                    </Link>
                </div>

                <div className="border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#4318FF] tracking-wider uppercase">Store Builder</span>
                    </div>
                    <h1 className="text-xl font-extrabold text-white">Create Your Shopify-like Store</h1>
                    <p className="text-xs text-[#8f9bba] mt-0.5">
                        Define your storefront parameters, custom subdomains, and branding theme color.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto w-full">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card className="border-[#262930] bg-[#0c0d12] backdrop-blur-sm">
                            <CardHeader className="border-b border-[#262930] pb-4">
                                <CardTitle className="text-white text-sm font-bold flex items-center gap-2">
                                    <ShoppingBag className="h-4.5 w-4.5 text-[#4318FF]" />
                                    Store Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Store Name *</label>
                                    <Input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF]"
                                        placeholder="e.g. My Awesome Shop"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Store URL Slug</label>
                                        <Input
                                            type="text"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF]"
                                            placeholder="e.g. my-awesome-shop"
                                        />
                                        <p className="text-[10px] text-[#8f9bba]">Leave blank to generate automatically from name.</p>
                                        <InputError message={errors.slug} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Custom Domain</label>
                                        <Input
                                            type="text"
                                            value={data.domain}
                                            onChange={(e) => setData('domain', e.target.value)}
                                            className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF]"
                                            placeholder="e.g. shop.mydomain.com (optional)"
                                        />
                                        <InputError message={errors.domain} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba]">Store Description</label>
                                    <Textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF]"
                                        placeholder="Describe what your store sells..."
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8f9bba] flex items-center gap-1.5">
                                        <Palette className="h-4 w-4 text-[#4318FF]" />
                                        Primary Theme Color
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={data.theme_color}
                                            onChange={(e) => setData('theme_color', e.target.value)}
                                            className="h-8 w-16 bg-transparent border-0 cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={data.theme_color}
                                            onChange={(e) => setData('theme_color', e.target.value)}
                                            className="w-32 bg-[#111111] border-[#262930] text-white focus-visible:ring-[#4318FF]"
                                        />
                                    </div>
                                    <InputError message={errors.theme_color} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href="/stores"
                                className="inline-flex items-center justify-center rounded-lg bg-[#111111] border border-[#262930] px-5 py-2.5 text-xs font-semibold text-[#8f9bba] hover:bg-zinc-800 transition-colors"
                            >
                                Cancel
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-[#4318FF] hover:bg-[#3b15e6] text-white font-semibold px-6 py-2.5 rounded-lg text-xs flex items-center gap-1.5"
                            >
                                <Save className="h-4 w-4" />
                                Create Store
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

CreateStore.layout = (page: React.ReactNode) => (
    <StoreLayout breadcrumbs={[{ title: 'Create Store', href: '/stores/create' }]}>
        {page}
    </StoreLayout>
);
