import { Head, useForm } from '@inertiajs/react';
import {
    Settings,
    Bell,
    FileText,
    Save,
    CheckCircle,
    Info,
    Mail,
    Phone,
    MapPin,
    Calendar,
} from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import OwnerLayout from '@/layouts/owner-layout';

interface OwnerSettingsProps {
    settings: {
        notification_new_review: boolean;
        notification_new_lead: boolean;
        notification_monthly_report: boolean;
        notification_marketing: boolean;
        default_city: string;
        default_email: string;
        default_phone: string;
        default_founded_year: number;
    };
}

export default function OwnerSettings({ settings }: OwnerSettingsProps) {
    const { data, setData, post, processing, wasSuccessful } = useForm({
        notification_new_review: settings.notification_new_review,
        notification_new_lead: settings.notification_new_lead,
        notification_monthly_report: settings.notification_monthly_report,
        notification_marketing: settings.notification_marketing,
        default_city: settings.default_city || '',
        default_email: settings.default_email || '',
        default_phone: settings.default_phone || '',
        default_founded_year: settings.default_founded_year || (new Date().getFullYear()),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/owner/settings');
    };

    return (
        <>
            <Head title="Owner Settings" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-screen space-y-6">
                {/* Header */}
                <div className="border-b border-[#262930] pb-5 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#4318FF] tracking-wider uppercase">Console Settings</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white">
                            Owner Settings
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Configure your dashboard default values and toggle your email alerts.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                    {/* Notifications preferences Card */}
                    <Card className="border-[#262930] bg-[#0c0d12] backdrop-blur-sm">
                        <CardHeader className="pb-3 border-b border-[#262930]/40">
                            <CardTitle className="text-white text-sm font-bold flex items-center gap-2">
                                <Bell className="h-4.5 w-4.5 text-[#4318FF]" />
                                Email Notification Preferences
                            </CardTitle>
                            <CardDescription className="text-[#8f9bba] text-xs mt-1">
                                Control when and how you receive update summaries on customer actions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="divide-y divide-[#262930]/50">
                                {/* Alert 1: Reviews */}
                                <div className="flex items-center justify-between py-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-zinc-200 text-xs sm:text-sm font-semibold">New Review Alerts</Label>
                                        <p className="text-[11px] text-[#8f9bba]">
                                            Receive an email notification instantly when a user writes a review on your business listings.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={data.notification_new_review}
                                        onCheckedChange={(checked) => setData('notification_new_review', checked)}
                                        className="bg-[#262930] data-[state=checked]:bg-[#4318FF]"
                                    />
                                </div>

                                {/* Alert 2: Leads */}
                                <div className="flex items-center justify-between py-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-zinc-200 text-xs sm:text-sm font-semibold">New Lead Alerts</Label>
                                        <p className="text-[11px] text-[#8f9bba]">
                                            Receive an email alert when a client fills out the contact request form on one of your profile pages.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={data.notification_new_lead}
                                        onCheckedChange={(checked) => setData('notification_new_lead', checked)}
                                        className="bg-[#262930] data-[state=checked]:bg-[#4318FF]"
                                    />
                                </div>

                                {/* Alert 3: Monthly report */}
                                <div className="flex items-center justify-between py-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-zinc-200 text-xs sm:text-sm font-semibold">Monthly Analytics Reports</Label>
                                        <p className="text-[11px] text-[#8f9bba]">
                                            Get a monthly digest containing profile clicks, views counts, and reviewer analytics.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={data.notification_monthly_report}
                                        onCheckedChange={(checked) => setData('notification_monthly_report', checked)}
                                        className="bg-[#262930] data-[state=checked]:bg-[#4318FF]"
                                    />
                                </div>

                                {/* Alert 4: Marketing updates */}
                                <div className="flex items-center justify-between py-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-zinc-200 text-xs sm:text-sm font-semibold">Promotion & Tip Guides</Label>
                                        <p className="text-[11px] text-[#8f9bba]">
                                            Receive occasional guides, directory listing search tips, and plan promotion offers.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={data.notification_marketing}
                                        onCheckedChange={(checked) => setData('notification_marketing', checked)}
                                        className="bg-[#262930] data-[state=checked]:bg-[#4318FF]"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Listing Defaults Card */}
                    <Card className="border-[#262930] bg-[#0c0d12] backdrop-blur-sm">
                        <CardHeader className="pb-3 border-b border-[#262930]/40">
                            <CardTitle className="text-white text-sm font-bold flex items-center gap-2">
                                <FileText className="h-4.5 w-4.5 text-[#4318FF]" />
                                Listing Default Values
                            </CardTitle>
                            <CardDescription className="text-[#8f9bba] text-xs mt-1">
                                Set default templates to prepopulate input boxes when registering new business listings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* City */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="default_city" className="text-[#8f9bba] text-xs flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                                        <MapPin className="h-3.5 w-3.5" />
                                        Default Listing City
                                    </Label>
                                    <Input
                                        id="default_city"
                                        type="text"
                                        placeholder="Algiers"
                                        value={data.default_city}
                                        onChange={(e) => setData('default_city', e.target.value)}
                                        className="bg-[#111111] border-[#262930] text-white text-xs sm:text-sm focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF]"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="default_email" className="text-[#8f9bba] text-xs flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                                        <Mail className="h-3.5 w-3.5" />
                                        Default Contact Email
                                    </Label>
                                    <Input
                                        id="default_email"
                                        type="email"
                                        placeholder="owner@example.com"
                                        value={data.default_email}
                                        onChange={(e) => setData('default_email', e.target.value)}
                                        className="bg-[#111111] border-[#262930] text-white text-xs sm:text-sm focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF]"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="default_phone" className="text-[#8f9bba] text-xs flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                                        <Phone className="h-3.5 w-3.5" />
                                        Default Business Phone
                                    </Label>
                                    <Input
                                        id="default_phone"
                                        type="text"
                                        placeholder="+213 555 12 34 56"
                                        value={data.default_phone}
                                        onChange={(e) => setData('default_phone', e.target.value)}
                                        className="bg-[#111111] border-[#262930] text-white text-xs sm:text-sm focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF]"
                                    />
                                </div>

                                {/* Founded Year */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="default_founded_year" className="text-[#8f9bba] text-xs flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Default Founded Year
                                    </Label>
                                    <Input
                                        id="default_founded_year"
                                        type="number"
                                        placeholder="2026"
                                        value={data.default_founded_year}
                                        onChange={(e) => setData('default_founded_year', parseInt(e.target.value) || '')}
                                        className="bg-[#111111] border-[#262930] text-white text-xs sm:text-sm focus-visible:ring-[#4318FF] focus-visible:border-[#4318FF]"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bottom Save bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                        {wasSuccessful ? (
                            <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                                <CheckCircle className="h-4 w-4" />
                                Settings updated successfully
                            </div>
                        ) : (
                            <div className="text-[#8f9bba] text-xs flex items-center gap-1.5">
                                <Info className="h-4 w-4" />
                                Changes will be saved instantly.
                            </div>
                        )}
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[#4318FF] hover:bg-[#3b15e6] text-white font-semibold text-xs px-5 flex items-center gap-1.5 w-full sm:w-auto"
                        >
                            <Save className="h-4 w-4" />
                            Save Settings
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

// Sidebar Layout Wrapper
OwnerSettings.layout = (page: React.ReactNode) => (
    <OwnerLayout breadcrumbs={[{ title: 'Settings', href: '/owner/settings' }]}>
        {page}
    </OwnerLayout>
);
