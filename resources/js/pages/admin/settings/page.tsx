import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import {
    ShieldAlert,
    Sparkles,
    Mail,
    Laptop,
    Save,
} from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface SettingsData {
    site_name: string;
    support_email: string;
    require_listing_verification: boolean;
    allow_new_registrations: boolean;
    maintenance_mode: boolean;
    accent_color: string;
}

interface SettingsPageProps {
    settings: {
        site_name: string;
        support_email: string;
        require_listing_verification: string;
        allow_new_registrations: string;
        maintenance_mode: string;
        accent_color: string;
    };
    errors: Record<string, string>;
}

export default function SettingsPage({ settings }: SettingsPageProps) {
    const form = useForm<SettingsData>({
        site_name: settings.site_name || 'SoukNet',
        support_email: settings.support_email || 'support@souknet.com',
        require_listing_verification:
            settings.require_listing_verification === '1',
        allow_new_registrations: settings.allow_new_registrations === '1',
        maintenance_mode: settings.maintenance_mode === '1',
        accent_color: settings.accent_color || '#4318FF',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/admin/settings', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('System configurations updated successfully!');
            },
            onError: () => {
                toast.error(
                    'Failed to update system settings. Please review details.',
                );
            },
        });
    };

    const colorSwatches = [
        { name: 'Indigo', value: '#4318FF' },
        { name: 'Emerald', value: '#10B981' },
        { name: 'Rose', value: '#F43F5E' },
        { name: 'Amber', value: '#F59E0B' },
        { name: 'Violet', value: '#8B5CF6' },
        { name: 'Sky', value: '#0EA5E9' },
    ];

    return (
        <>
            <Head title="Platform Settings" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="max-w-4xl bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                {/* Header */}
                <div className="border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#4318FF] tracking-wider uppercase">System Administration</span>
                    </div>
                    <h1 className="text-xl font-extrabold text-white">
                        Global Platform Settings
                    </h1>
                    <p className="text-xs text-[#8f9bba] mt-0.5">
                        Configure site branding, registration controls, features, and visual accents.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* SECTION 1: General Branding */}
                    <div className="space-y-4 rounded-xl border border-[#262930] bg-[#0c0d12] p-6">
                        <div className="mb-2 flex items-center gap-2 border-b border-[#262930] pb-3">
                            <Sparkles className="h-5 w-5 text-[#4318FF]" />
                            <h2 className="text-base font-bold text-white">
                                General Branding
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                    Directory Site Name *
                                </label>
                                <input
                                    type="text"
                                    value={form.data.site_name}
                                    onChange={(e) =>
                                        form.setData(
                                            'site_name',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                    placeholder="e.g. SoukNet"
                                />
                                {form.errors.site_name && (
                                    <p className="mt-1 text-xs text-rose-500">
                                        {form.errors.site_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                    Support Email Address *
                                </label>
                                <div className="relative">
                                    <div className="text-[#8f9bba] pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="email"
                                        value={form.data.support_email}
                                        onChange={(e) =>
                                            form.setData(
                                                'support_email',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-[#262930] bg-[#111111] py-2 pr-3 pl-10 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                        placeholder="support@site.com"
                                    />
                                </div>
                                {form.errors.support_email && (
                                    <p className="mt-1 text-xs text-rose-505">
                                        {form.errors.support_email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Control Rules */}
                    <div className="space-y-5 rounded-xl border border-[#262930] bg-[#0c0d12] p-6">
                        <div className="mb-2 flex items-center gap-2 border-b border-[#262930] pb-3">
                            <ShieldAlert className="h-5 w-5 text-[#4318FF]" />
                            <h2 className="text-base font-bold text-white">
                                Listing & User Controls
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {/* Toggle 1: Verification */}
                            <div className="flex items-start justify-between gap-4 rounded-lg border border-[#262930] bg-[#15171e]/50 p-3">
                                <div>
                                    <h4 className="text-xs font-bold text-zinc-200">
                                        Require Listing Verification
                                    </h4>
                                    <p className="mt-0.5 text-[11px] text-[#8f9bba] font-medium">
                                        Newly created listings must be manually
                                        reviewed and approved by administrators
                                        before going public.
                                    </p>
                                </div>
                                <label className="relative mt-1 inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={
                                            form.data
                                                .require_listing_verification
                                        }
                                        onChange={(e) =>
                                            form.setData(
                                                'require_listing_verification',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded border-[#262930] bg-[#111111] text-[#4318FF] focus:ring-0 cursor-pointer"
                                    />
                                </label>
                            </div>

                            {/* Toggle 2: Registrations */}
                            <div className="flex items-start justify-between gap-4 rounded-lg border border-[#262930] bg-[#15171e]/50 p-3">
                                <div>
                                    <h4 className="text-xs font-bold text-zinc-200">
                                        Allow New Registrations
                                    </h4>
                                    <p className="mt-0.5 text-[11px] text-[#8f9bba] font-medium">
                                        Enable or disable registration of new
                                        user and business owner accounts on the
                                        platform.
                                    </p>
                                </div>
                                <label className="relative mt-1 inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={
                                            form.data.allow_new_registrations
                                        }
                                        onChange={(e) =>
                                            form.setData(
                                                'allow_new_registrations',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded border-[#262930] bg-[#111111] text-[#4318FF] focus:ring-0 cursor-pointer"
                                    />
                                </label>
                            </div>

                            {/* Toggle 3: Maintenance Mode */}
                            <div className="flex items-start justify-between gap-4 rounded-lg border border-[#262930] bg-[#15171e]/50 p-3">
                                <div>
                                    <h4 className="text-xs font-bold text-zinc-200">
                                        Maintenance Mode
                                    </h4>
                                    <p className="mt-0.5 text-[11px] text-[#8f9bba] font-medium">
                                        Puts the public platform into
                                        read-only/maintenance window, permitting
                                        admin bypass logins.
                                    </p>
                                </div>
                                <label className="relative mt-1 inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={form.data.maintenance_mode}
                                        onChange={(e) =>
                                            form.setData(
                                                'maintenance_mode',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded border-[#262930] bg-[#111111] text-[#4318FF] focus:ring-0 cursor-pointer"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Accent System */}
                    <div className="space-y-4 rounded-xl border border-[#262930] bg-[#0c0d12] p-6">
                        <div className="mb-2 flex items-center gap-2 border-b border-[#262930] pb-3">
                            <Laptop className="h-5 w-5 text-[#4318FF]" />
                            <h2 className="text-base font-bold text-white">
                                Visual Customization
                            </h2>
                        </div>

                        <div>
                            <label className="mb-2 block text-[10px] font-bold tracking-wider text-[#8f9bba] uppercase">
                                System Theme Accent Color
                            </label>

                            <div className="flex flex-wrap items-center gap-3">
                                {/* Color Picker input */}
                                <input
                                    type="color"
                                    value={form.data.accent_color}
                                    onChange={(e) =>
                                        form.setData(
                                            'accent_color',
                                            e.target.value,
                                        )
                                    }
                                    className="h-8 w-12 cursor-pointer rounded-lg border border-[#262930] bg-[#111111]"
                                />

                                {/* Text input option */}
                                <input
                                    type="text"
                                    value={form.data.accent_color}
                                    onChange={(e) =>
                                        form.setData(
                                            'accent_color',
                                            e.target.value,
                                        )
                                    }
                                    className="w-24 rounded-lg border border-[#262930] bg-[#111111] px-2.5 py-1.5 text-center text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                    placeholder="#4318FF"
                                />

                                {/* Quick swatches */}
                                <div className="ml-1 flex flex-wrap items-center gap-2 border-l border-[#262930] pl-3">
                                    {colorSwatches.map((swatch) => (
                                        <button
                                            key={swatch.value}
                                            type="button"
                                            onClick={() =>
                                                form.setData(
                                                    'accent_color',
                                                    swatch.value,
                                                )
                                            }
                                            style={{
                                                backgroundColor: swatch.value,
                                            }}
                                            className="h-5 w-5 rounded-full border border-black/40 transition-transform hover:scale-110 cursor-pointer"
                                            title={swatch.name}
                                        />
                                    ))}
                                </div>
                            </div>
                            {form.errors.accent_color && (
                                <p className="mt-1 text-xs text-rose-500">
                                    {form.errors.accent_color}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 font-bold text-xs">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#4318FF] px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#3b15e6] disabled:opacity-50 cursor-pointer"
                        >
                            <Save className="h-4 w-4" />
                            Save Configurations
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

SettingsPage.layout = (page: React.ReactNode) => (
    <AdminLayout
        breadcrumbs={[{ title: 'Global Settings', href: '/admin/settings' }]}
    >
        {page}
    </AdminLayout>
);
