import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import {
    Check,
    ArrowLeft,
    ArrowRight,
    Save,
    Upload,
    Plus,
    X,
    DollarSign,
    Briefcase,
    MapPin,
    Image as ImageIcon,
    Clock,
    CheckCircle,
} from 'lucide-react';
import React, { useState } from 'react';

// Interfaces matching props
interface Category {
    id: number;
    code: string;
    en: string;
}

interface Plan {
    id: number;
    code: string;
    en: string;
    price_monthly_cents: number;
    price_yearly_cents: number;
    max_photos: number;
    has_analytics: boolean;
    has_featured: boolean;
    has_verified_badge: boolean;
}

interface Tag {
    id: number;
    code: string;
}

interface BusinessHour {
    day_of_week: number;
    open_time: string | null;
    close_time: string | null;
    is_closed: boolean;
}

interface Business {
    id: number;
    name: string;
    tagline: string | null;
    category_id: number;
    description: string | null;
    address: string | null;
    city: string | null;
    country: string;
    phone: string | null;
    email: string | null;
    website: string | null;
    twitter_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    facebook_url: string | null;
    plan_id: number | null;
    status: string;
    tags?: Tag[];
    hours?: BusinessHour[];
}

interface ListingFormProps {
    business: Business | null;
    categories: Category[];
    plans: Plan[];
    errors: Record<string, string>;
}

export default function ListingForm({
    business,
    categories,
    plans,
    errors,
}: ListingFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [tagInput, setTagInput] = useState('');
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [stepValidationErrors, setStepValidationErrors] = useState<
        Record<string, string>
    >({});

    const steps = [
        { id: 1, label: 'Basic Info', icon: Briefcase },
        { id: 2, label: 'Location & Contact', icon: MapPin },
        { id: 3, label: 'Media', icon: ImageIcon },
        { id: 4, label: 'Business Hours', icon: Clock },
        { id: 5, label: 'Plan Selection', icon: CheckCircle },
    ];

    // Inertia form setup
    const form = useForm({
        name: business?.name || '',
        tagline: business?.tagline || '',
        category_id: business?.category_id || '',
        description: business?.description || '',
        tags: business?.tags?.map((t) => t.code) || ([] as string[]),
        address: business?.address || '',
        city: business?.city || '',
        country: business?.country || 'DZ',
        phone: business?.phone || '',
        email: business?.email || '',
        website: business?.website || '',
        twitter_url: business?.twitter_url || '',
        linkedin_url: business?.linkedin_url || '',
        github_url: business?.github_url || '',
        facebook_url: business?.facebook_url || '',
        logo: null as File | null,
        cover: null as File | null,
        hours:
            business?.hours?.map((h) => ({
                day_of_week: h.day_of_week,
                open_time: h.open_time ? h.open_time.substring(0, 5) : '09:00',
                close_time: h.close_time
                    ? h.close_time.substring(0, 5)
                    : '17:00',
                is_closed: !!h.is_closed,
            })) ||
            Array.from({ length: 7 }, (_, i) => ({
                day_of_week: i + 1,
                open_time: '09:00',
                close_time: '17:00',
                is_closed: false,
            })),
        plan_id: business?.plan_id || (plans.length > 0 ? plans[0].id : ''),
        status: business?.status || 'draft',
        _method: business ? 'PUT' : 'POST',
    });

    // Tag chip handlers
    const addTag = () => {
        const cleanTag = tagInput.trim().toLowerCase();
        if (cleanTag && !form.data.tags.includes(cleanTag)) {
            form.setData('tags', [...form.data.tags, cleanTag]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        form.setData(
            'tags',
            form.data.tags.filter((t) => t !== tagToRemove),
        );
    };

    // File upload change handlers
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'logo' | 'cover',
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setData(field, file);
            const url = URL.createObjectURL(file);
            if (field === 'logo') {
                setLogoPreview(url);
            } else {
                setCoverPreview(url);
            }
        }
    };

    // Copy monday hours shortcut
    const copyMondayHours = () => {
        const monday = form.data.hours.find((h) => h.day_of_week === 1);
        if (monday) {
            const updated = form.data.hours.map((h) => {
                // Days 1 (Mon) to 5 (Fri)
                if (h.day_of_week >= 1 && h.day_of_week <= 5) {
                    return {
                        ...h,
                        open_time: monday.open_time,
                        close_time: monday.close_time,
                        is_closed: monday.is_closed,
                    };
                }
                return h;
            });
            form.setData('hours', updated);
        }
    };

    // Front-end step validation
    const validateStep = (step: number): boolean => {
        const errors: Record<string, string> = {};
        if (step === 1) {
            if (!form.data.name.trim()) {
                errors.name = 'Business name is required.';
            }
            if (!form.data.category_id) {
                errors.category_id = 'Please select a category.';
            }
            if (!form.data.description.trim()) {
                errors.description = 'Description is required.';
            } else if (form.data.description.trim().length < 50) {
                errors.description =
                    'Description must be at least 50 characters.';
            }
        }
        if (step === 2) {
            if (!form.data.address?.trim()) {
                errors.address = 'Address is required.';
            }
            if (!form.data.city?.trim()) {
                errors.city = 'City is required.';
            }
            if (!form.data.phone?.trim()) {
                errors.phone = 'Phone number is required.';
            }
            if (!form.data.email?.trim()) {
                errors.email = 'Contact email is required.';
            }
        }
        if (step === 5) {
            if (!form.data.plan_id) {
                errors.plan_id = 'Please select a subscription plan.';
            }
        }
        setStepValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, 5));
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    // Save logic
    const submitForm = (statusValue: 'draft' | 'pending') => {
        if (!validateStep(currentStep)) return;

        form.setData('status', statusValue);

        // File uploads require a POST request with _method spoofing for updates
        const url = business ? `/dashboard/listing` : `/dashboard/listing`;

        if (business) {
            form.post(url, {
                preserveScroll: true,
            });
        } else {
            form.post(url, {
                preserveScroll: true,
            });
        }
    };

    const dayNames = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    return (
        <>
            <Head title={business ? 'Edit Listing' : 'Create Listing'} />

            <div className="mx-auto max-w-[720px] px-4 py-8 sm:px-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white">
                        {business
                            ? 'Edit Business Listing'
                            : 'Create Business Listing'}
                    </h1>
                    <p className="mt-1 text-sm text-zinc-400">
                        Provide information about your startup or company to
                        list on SoukNet.
                    </p>
                </div>

                {/* Step Indicator Bar */}
                <div className="mb-10">
                    <div className="flex items-center justify-between">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isDone = currentStep > step.id;

                            return (
                                <div
                                    key={step.id}
                                    className="relative flex flex-1 flex-col items-center"
                                >
                                    {/* Line connecting steps */}
                                    {step.id > 1 && (
                                        <div
                                            className={`absolute top-5 right-[50%] left-[-50%] z-0 h-0.5 -translate-y-1/2 ${currentStep >= step.id ? 'bg-[#6366F1]' : 'bg-zinc-800'}`}
                                        />
                                    )}

                                    {/* Circle indicator */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                isDone ||
                                                validateStep(currentStep)
                                            ) {
                                                setCurrentStep(step.id);
                                            }
                                        }}
                                        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${isActive ? 'border-[#6366F1] bg-[#0A0A0A] text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]' : ''} ${isDone ? 'border-[#6366F1] bg-[#6366F1] text-white' : ''} ${!isActive && !isDone ? 'border-zinc-850 bg-zinc-900 text-zinc-500 hover:border-zinc-700' : ''}`}
                                    >
                                        {isDone ? (
                                            <Check className="h-5 w-5" />
                                        ) : (
                                            <Icon className="h-5 w-5" />
                                        )}
                                    </button>
                                    <span
                                        className={`mt-2 hidden text-[10px] font-semibold tracking-wider uppercase sm:block ${isActive ? 'text-[#6366F1]' : 'text-zinc-500'}`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Wrapper */}
                <div className="space-y-6 rounded-lg border border-[#1F1F1F] bg-[#111111] p-6">
                    {/* STEP 1: Basic Info */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <h2 className="border-b border-[#1F1F1F] pb-2 text-base font-bold text-white">
                                Business Information
                            </h2>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                    Business Name *
                                </label>
                                <input
                                    type="text"
                                    value={form.data.name}
                                    onChange={(e) =>
                                        form.setData('name', e.target.value)
                                    }
                                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                    placeholder="e.g. Acme Tech"
                                />
                                {(stepValidationErrors.name ||
                                    form.errors.name) && (
                                    <p className="mt-1 text-xs text-rose-500">
                                        {stepValidationErrors.name ||
                                            form.errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                    Tagline (Max 100 characters)
                                </label>
                                <input
                                    type="text"
                                    maxLength={100}
                                    value={form.data.tagline}
                                    onChange={(e) =>
                                        form.setData('tagline', e.target.value)
                                    }
                                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                    placeholder="A brief sentence describing your startup"
                                />
                                {form.errors.tagline && (
                                    <p className="mt-1 text-xs text-rose-500">
                                        {form.errors.tagline}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                    Category *
                                </label>
                                <select
                                    value={form.data.category_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'category_id',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.en}
                                        </option>
                                    ))}
                                </select>
                                {(stepValidationErrors.category_id ||
                                    form.errors.category_id) && (
                                    <p className="mt-1 text-xs text-rose-500">
                                        {stepValidationErrors.category_id ||
                                            form.errors.category_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                    Description (Min 50 chars) *
                                </label>
                                <textarea
                                    rows={5}
                                    value={form.data.description}
                                    onChange={(e) =>
                                        form.setData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                    placeholder="Describe your products, team, mission..."
                                />
                                {(stepValidationErrors.description ||
                                    form.errors.description) && (
                                    <p className="mt-1 text-xs text-rose-500">
                                        {stepValidationErrors.description ||
                                            form.errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                    Tags (Press Enter to add)
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) =>
                                            setTagInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addTag();
                                            }
                                        }}
                                        className="flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                        placeholder="e.g. saas, remote, ai"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTag}
                                        className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:bg-zinc-700"
                                    >
                                        <Plus className="h-5 w-5 text-white" />
                                    </button>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {form.data.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1 rounded border border-[#6366F1]/20 bg-[#6366F1]/10 px-2.5 py-1 text-xs font-semibold text-[#6366F1]"
                                        >
                                            #{tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="hover:text-white"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Location & Contact */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <h2 className="border-b border-[#1F1F1F] pb-2 text-base font-bold text-white">
                                Location & Contact Details
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                        Address *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.address}
                                        onChange={(e) =>
                                            form.setData(
                                                'address',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                        placeholder="Street name & number"
                                    />
                                    {stepValidationErrors.address && (
                                        <p className="mt-1 text-xs text-rose-500">
                                            {stepValidationErrors.address}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.city}
                                        onChange={(e) =>
                                            form.setData('city', e.target.value)
                                        }
                                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                        placeholder="e.g. Algiers"
                                    />
                                    {stepValidationErrors.city && (
                                        <p className="mt-1 text-xs text-rose-500">
                                            {stepValidationErrors.city}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                    Country
                                </label>
                                <select
                                    value={form.data.country}
                                    onChange={(e) =>
                                        form.setData('country', e.target.value)
                                    }
                                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                >
                                    <option value="DZ">Algeria (DZ)</option>
                                    <option value="US">
                                        United States (US)
                                    </option>
                                    <option value="FR">France (FR)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                        Phone *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.phone}
                                        onChange={(e) =>
                                            form.setData(
                                                'phone',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                        placeholder="+213..."
                                    />
                                    {stepValidationErrors.phone && (
                                        <p className="mt-1 text-xs text-rose-500">
                                            {stepValidationErrors.phone}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                        Contact Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={form.data.email}
                                        onChange={(e) =>
                                            form.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                        placeholder="contact@business.com"
                                    />
                                    {stepValidationErrors.email && (
                                        <p className="mt-1 text-xs text-rose-500">
                                            {stepValidationErrors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                    Website URL
                                </label>
                                <input
                                    type="url"
                                    value={form.data.website}
                                    onChange={(e) =>
                                        form.setData('website', e.target.value)
                                    }
                                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="space-y-3 pt-2">
                                <span className="block text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                    Social Links
                                </span>
                                <div className="grid grid-cols-3 gap-3">
                                    <input
                                        type="url"
                                        value={form.data.twitter_url}
                                        onChange={(e) =>
                                            form.setData(
                                                'twitter_url',
                                                e.target.value,
                                            )
                                        }
                                        className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-[#6366F1]"
                                        placeholder="Twitter URL"
                                    />
                                    <input
                                        type="url"
                                        value={form.data.linkedin_url}
                                        onChange={(e) =>
                                            form.setData(
                                                'linkedin_url',
                                                e.target.value,
                                            )
                                        }
                                        className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-[#6366F1]"
                                        placeholder="LinkedIn URL"
                                    />
                                    <input
                                        type="url"
                                        value={form.data.github_url}
                                        onChange={(e) =>
                                            form.setData(
                                                'github_url',
                                                e.target.value,
                                            )
                                        }
                                        className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-[#6366F1]"
                                        placeholder="GitHub URL"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Media Uploads */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="border-b border-[#1F1F1F] pb-2 text-base font-bold text-white">
                                Business Media
                            </h2>

                            {/* Logo */}
                            <div>
                                <label className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                    Business Logo (Single Image)
                                </label>
                                <div className="flex items-center gap-6">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
                                        {logoPreview ? (
                                            <img
                                                src={logoPreview}
                                                alt="Logo preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="h-8 w-8 text-zinc-600" />
                                        )}
                                    </div>
                                    <label className="flex cursor-pointer items-center gap-2 rounded border border-[#1F1F1F] bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-800">
                                        <Upload className="h-4 w-4" />
                                        Upload Logo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleFileChange(e, 'logo')
                                            }
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Cover Photo */}
                            <div>
                                <label className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                    Cover Photo (Single Image)
                                </label>
                                <div className="space-y-4">
                                    <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
                                        {coverPreview ? (
                                            <img
                                                src={coverPreview}
                                                alt="Cover preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="h-10 w-10 text-zinc-600" />
                                        )}
                                    </div>
                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-[#1F1F1F] bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-800">
                                        <Upload className="h-4 w-4" />
                                        Upload Cover Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleFileChange(e, 'cover')
                                            }
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Business Hours */}
                    {currentStep === 4 && (
                        <div className="space-y-4">
                            <div className="flex flex-col justify-between gap-2 border-b border-[#1F1F1F] pb-2 sm:flex-row sm:items-center">
                                <h2 className="text-base font-bold text-white">
                                    Operation Hours
                                </h2>
                                <button
                                    type="button"
                                    onClick={copyMondayHours}
                                    className="text-left text-xs font-semibold text-[#6366F1] hover:underline"
                                >
                                    Copy Monday to all weekdays
                                </button>
                            </div>

                            <div className="space-y-3">
                                {dayNames.map((day, index) => {
                                    const hourIndex = form.data.hours.findIndex(
                                        (h) => h.day_of_week === index + 1,
                                    );
                                    const hour = form.data.hours[hourIndex];

                                    return (
                                        <div
                                            key={day}
                                            className="flex flex-wrap items-center justify-between gap-4 rounded border border-[#1F1F1F] bg-zinc-900/40 p-3"
                                        >
                                            <span className="w-24 text-sm font-semibold text-zinc-200">
                                                {day}
                                            </span>

                                            <div className="flex items-center gap-4">
                                                {/* Closed Switch */}
                                                <label className="flex cursor-pointer items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={hour.is_closed}
                                                        onChange={(e) => {
                                                            const updated = [
                                                                ...form.data
                                                                    .hours,
                                                            ];
                                                            updated[hourIndex] =
                                                                {
                                                                    ...hour,
                                                                    is_closed:
                                                                        e.target
                                                                            .checked,
                                                                };
                                                            form.setData(
                                                                'hours',
                                                                updated,
                                                            );
                                                        }}
                                                        className="rounded border-zinc-700 bg-zinc-950 text-[#6366F1] focus:ring-0"
                                                    />
                                                    <span className="text-xs font-medium text-zinc-400">
                                                        Closed
                                                    </span>
                                                </label>

                                                {/* Time pickers */}
                                                {!hour.is_closed && (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="time"
                                                            value={
                                                                hour.open_time ||
                                                                '09:00'
                                                            }
                                                            onChange={(e) => {
                                                                const updated =
                                                                    [
                                                                        ...form
                                                                            .data
                                                                            .hours,
                                                                    ];
                                                                updated[
                                                                    hourIndex
                                                                ] = {
                                                                    ...hour,
                                                                    open_time:
                                                                        e.target
                                                                            .value,
                                                                };
                                                                form.setData(
                                                                    'hours',
                                                                    updated,
                                                                );
                                                            }}
                                                            className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-white"
                                                        />
                                                        <span className="text-zinc-500">
                                                            -
                                                        </span>
                                                        <input
                                                            type="time"
                                                            value={
                                                                hour.close_time ||
                                                                '17:00'
                                                            }
                                                            onChange={(e) => {
                                                                const updated =
                                                                    [
                                                                        ...form
                                                                            .data
                                                                            .hours,
                                                                    ];
                                                                updated[
                                                                    hourIndex
                                                                ] = {
                                                                    ...hour,
                                                                    close_time:
                                                                        e.target
                                                                            .value,
                                                                };
                                                                form.setData(
                                                                    'hours',
                                                                    updated,
                                                                );
                                                            }}
                                                            className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-white"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* STEP 5: Plan Selection */}
                    {currentStep === 5 && (
                        <div className="space-y-4">
                            <h2 className="border-b border-[#1F1F1F] pb-2 text-base font-bold text-white">
                                Select Listing Plan
                            </h2>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {plans.map((plan) => {
                                    const isSelected =
                                        form.data.plan_id === plan.id;
                                    const isMonthly =
                                        plan.price_monthly_cents > 0;

                                    return (
                                        <div
                                            key={plan.id}
                                            onClick={() =>
                                                form.setData('plan_id', plan.id)
                                            }
                                            className={`relative flex cursor-pointer flex-col justify-between rounded-lg border p-5 transition-all ${
                                                isSelected
                                                    ? 'border-[#6366F1] bg-[#6366F1]/5 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                                                    : 'border-[#1F1F1F] bg-[#111111] hover:border-zinc-700'
                                            }`}
                                        >
                                            <div>
                                                <div className="text-sm font-bold text-white capitalize">
                                                    {plan.en}
                                                </div>
                                                <div className="mt-2 flex items-baseline">
                                                    <span className="text-xl font-extrabold text-white">
                                                        {isMonthly
                                                            ? `$${(plan.price_monthly_cents / 100).toFixed(0)}`
                                                            : 'Free'}
                                                    </span>
                                                    {isMonthly && (
                                                        <span className="ml-1 text-xs text-zinc-500">
                                                            /mo
                                                        </span>
                                                    )}
                                                </div>
                                                <ul className="mt-4 space-y-2 text-[11px] font-medium text-zinc-400">
                                                    <li className="flex items-center gap-1.5">
                                                        <Check className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
                                                        Up to {plan.max_photos}{' '}
                                                        Photos
                                                    </li>
                                                    <li className="flex items-center gap-1.5">
                                                        <Check
                                                            className={`h-3.5 w-3.5 shrink-0 ${plan.has_analytics ? 'text-indigo-400' : 'text-zinc-700'}`}
                                                        />
                                                        Analytics Dashboard
                                                    </li>
                                                    <li className="flex items-center gap-1.5">
                                                        <Check
                                                            className={`h-3.5 w-3.5 shrink-0 ${plan.has_verified_badge ? 'text-indigo-400' : 'text-zinc-700'}`}
                                                        />
                                                        Verified Badge
                                                    </li>
                                                    <li className="flex items-center gap-1.5">
                                                        <Check
                                                            className={`h-3.5 w-3.5 shrink-0 ${plan.has_featured ? 'text-indigo-400' : 'text-zinc-700'}`}
                                                        />
                                                        Featured Placements
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="pt-6">
                                                <button
                                                    type="button"
                                                    className={`w-full rounded py-1.5 text-center text-xs font-semibold transition-colors ${
                                                        isSelected
                                                            ? 'bg-[#6366F1] text-white hover:bg-[#5053df]'
                                                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                                    }`}
                                                >
                                                    Select Plan
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {stepValidationErrors.plan_id && (
                                <p className="mt-1 text-xs text-rose-500">
                                    {stepValidationErrors.plan_id}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Step Navigation Actions */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#1F1F1F] pt-4">
                        {/* Back */}
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-30"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </button>

                        <div className="flex items-center gap-3">
                            {/* Save Draft */}
                            <button
                                type="button"
                                onClick={() => submitForm('draft')}
                                disabled={form.processing}
                                className="inline-flex items-center gap-1.5 rounded-md border border-[#1F1F1F] bg-[#111111] px-4 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-800"
                            >
                                <Save className="h-4 w-4" />
                                Save Draft
                            </button>

                            {/* Next / Submit */}
                            {currentStep < 5 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="inline-flex items-center gap-1.5 rounded-md bg-[#6366F1] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5053df]"
                                >
                                    Next
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => submitForm('pending')}
                                    disabled={form.processing}
                                    className="inline-flex items-center gap-1.5 rounded-md bg-[#6366F1] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5053df]"
                                >
                                    Submit for Review
                                    <Check className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ListingForm.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Listing Form', href: '#' }]}>
        {page}
    </AppLayout>
);
