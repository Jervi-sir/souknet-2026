import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import {
    Building2,
    Save,
    ArrowLeft,
    Building,
    MapPin,
    Phone,
    Globe,
    Mail,
    Calendar,
} from 'lucide-react';

interface Category {
    id: number;
    en: string;
}

interface Plan {
    id: number;
    en: string;
}

interface Business {
    id: number;
    name: string;
    tagline: string | null;
    description: string | null;
    category_id: number;
    plan_id: number | null;
    founded_year: number | null;
    address: string | null;
    city: string | null;
    country: string;
    phone: string | null;
    email: string | null;
    website: string | null;
}

interface ListingFormProps {
    business: Business | null;
    categories: Category[];
    plans: Plan[];
}

export default function ListingForm({
    business,
    categories,
    plans,
}: ListingFormProps) {
    const isEdit = !!business;

    const { data, setData, post, put, processing, errors } = useForm({
        name: business?.name || '',
        tagline: business?.tagline || '',
        description: business?.description || '',
        category_id: business?.category_id || '',
        plan_id: business?.plan_id || '',
        founded_year: business?.founded_year || '',
        address: business?.address || '',
        city: business?.city || '',
        country: business?.country || 'DZ',
        phone: business?.phone || '',
        email: business?.email || '',
        website: business?.website || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/owner/businesses/${business.id}`);
        } else {
            post('/owner/businesses');
        }
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Business Listing' : 'Submit New Business Listing'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 overflow-x-auto text-zinc-100 bg-[#0A0A0A] min-h-screen">
                {/* Back Link */}
                <div>
                    <Link
                        href="/owner/dashboard"
                        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Dashboard
                    </Link>
                </div>

                {/* Header Title */}
                <div className="border-b border-[#1F1F1F] pb-4">
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">
                        {isEdit ? 'Edit Business Details' : 'Register Your Business'}
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        {isEdit
                            ? 'Update details about your listing, services description, contact channels, and location.'
                            : 'Fill in the fields below to register your company profile in the SoukNet directory.'}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto w-full">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Core Details Card */}
                        <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                            <CardHeader className="border-b border-[#1F1F1F] pb-4">
                                <CardTitle className="text-white text-base flex items-center gap-2">
                                    <Building className="h-4.5 w-4.5 text-indigo-400" />
                                    Business Identity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-400">Business Name *</label>
                                    <Input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="bg-[#161616] border-[#2E2E2E] text-zinc-100 focus-visible:ring-indigo-500"
                                        placeholder="e.g. Algiers Tech Solutions"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Category Select */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Category *</label>
                                        <select
                                            required
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="w-full rounded-md border border-[#2E2E2E] bg-[#161616] px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        >
                                            <option value="">Select a Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.en}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category_id} />
                                    </div>

                                    {/* Plan Select */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Plan</label>
                                        <select
                                            value={data.plan_id}
                                            onChange={(e) => setData('plan_id', e.target.value)}
                                            className="w-full rounded-md border border-[#2E2E2E] bg-[#161616] px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        >
                                            <option value="">Select a Plan</option>
                                            {plans.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.en}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.plan_id} />
                                    </div>
                                </div>

                                {/* Tagline */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-400">Slogan / Tagline</label>
                                    <Input
                                        type="text"
                                        value={data.tagline}
                                        onChange={(e) => setData('tagline', e.target.value)}
                                        className="bg-[#161616] border-[#2E2E2E] text-zinc-100 focus-visible:ring-indigo-500"
                                        placeholder="Brief one-line summary..."
                                    />
                                    <InputError message={errors.tagline} />
                                </div>

                                {/* Description */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-400">Detailed Description</label>
                                    <Textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="bg-[#161616] border-[#2E2E2E] text-zinc-100 focus-visible:ring-indigo-500 min-h-[120px]"
                                        placeholder="Describe your services, background history, team, and offerings..."
                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Location Details Card */}
                        <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                            <CardHeader className="border-b border-[#1F1F1F] pb-4">
                                <CardTitle className="text-white text-base flex items-center gap-2">
                                    <MapPin className="h-4.5 w-4.5 text-indigo-400" />
                                    Location Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* City */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">City</label>
                                        <Input
                                            type="text"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="bg-[#161616] border-[#2E2E2E] text-zinc-100 focus-visible:ring-indigo-500"
                                            placeholder="e.g. Algiers"
                                        />
                                        <InputError message={errors.city} />
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Full Address</label>
                                        <Input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="bg-[#161616] border-[#2E2E2E] text-zinc-100 focus-visible:ring-indigo-500"
                                            placeholder="Street address, building number..."
                                        />
                                        <InputError message={errors.address} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Channels Card */}
                        <Card className="border-[#1F1F1F] bg-[#111111]/70 backdrop-blur-sm">
                            <CardHeader className="border-b border-[#1F1F1F] pb-4">
                                <CardTitle className="text-white text-base flex items-center gap-2">
                                    <Phone className="h-4.5 w-4.5 text-indigo-400" />
                                    Contact Channels
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Phone */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Phone Number</label>
                                        <Input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="bg-[#161616] border-[#2E2E2E] text-zinc-100 focus-visible:ring-indigo-500"
                                            placeholder="Phone for client inquiries..."
                                        />
                                        <InputError message={errors.phone} />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Email Address</label>
                                        <Input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="bg-[#161616] border-[#2E2E2E] text-zinc-100 focus-visible:ring-indigo-500"
                                            placeholder="Contact email address..."
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Website */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Website URL</label>
                                        <Input
                                            type="url"
                                            value={data.website}
                                            onChange={(e) => setData('website', e.target.value)}
                                            className="bg-[#161616] border-[#2E2E2E] text-zinc-100 focus-visible:ring-indigo-500"
                                            placeholder="https://example.com"
                                        />
                                        <InputError message={errors.website} />
                                    </div>

                                    {/* Founded Year */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-400">Founded Year</label>
                                        <Input
                                            type="number"
                                            value={data.founded_year}
                                            onChange={(e) => setData('founded_year', e.target.value)}
                                            className="bg-[#161616] border-[#2E2E2E] text-zinc-100 focus-visible:ring-indigo-500"
                                            placeholder="e.g. 2020"
                                        />
                                        <InputError message={errors.founded_year} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Actions */}
                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href="/owner/dashboard"
                                className="inline-flex items-center justify-center rounded-lg bg-[#1C1C1C] border border-[#2E2E2E] px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
                            >
                                Cancel
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg text-xs sm:text-sm flex items-center gap-1.5"
                            >
                                <Save className="h-4 w-4" />
                                {isEdit ? 'Save Changes' : 'Submit Business'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

// Sidebar Layout Wrapper
ListingForm.layout = (page: React.ReactNode) => page;
