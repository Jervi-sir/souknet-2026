import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Palette,
    Eye,
    Save,
    Check,
    Layout,
    Type,
    Sparkles,
    Image as ImageIcon,
    Sliders,
    MessageCircle,
    Monitor,
    Smartphone,
    RotateCcw,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ColorPreset {
    id: string;
    name: string;
    primary: string;
    accent: string;
}

const COLOR_PRESETS: ColorPreset[] = [
    { id: 'slate', name: 'Minimalist Obsidian', primary: '#0f172a', accent: '#3b82f6' },
    { id: 'emerald', name: 'Algiers Emerald', primary: '#059669', accent: '#10b981' },
    { id: 'crimson', name: 'Carmine Luxury', primary: '#b91c1c', accent: '#ef4444' },
    { id: 'indigo', name: 'Royal Indigo', primary: '#4338ca', accent: '#6366f1' },
];

export default function StoreMerchantStorefrontTheme() {
    const [saved, setSaved] = useState(false);
    const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

    // Theme Customizer State
    const [selectedPreset, setSelectedPreset] = useState<string>('slate');
    const [primaryColor, setPrimaryColor] = useState<string>('#0f172a');
    const [fontFamily, setFontFamily] = useState<string>('Instrument Sans');
    const [announcementText, setAnnouncementText] = useState<string>(
        '⚡ Free Express Home Delivery in Algiers on orders above 6,000 DZD • Cash On Delivery Available',
    );
    const [showWhatsappButton, setShowWhatsappButton] = useState<boolean>(true);
    const [whatsappNumber, setWhatsappNumber] = useState<string>('213555123456');
    const [heroHeading, setHeroHeading] = useState<string>(
        'Premium essentials delivered straight to your door in Algeria.',
    );
    const [showStockCounter, setShowStockCounter] = useState<boolean>(true);
    const [showReviewsStars, setShowReviewsStars] = useState<boolean>(true);

    const handleApplyPreset = (preset: ColorPreset) => {
        setSelectedPreset(preset.id);
        setPrimaryColor(preset.primary);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <StoreMerchantLayout activeNav="storefront-theme" title="Storefront Customizer">
            <Head title="Storefront Theme - DzAvenue Boutique" />

            <div className="space-y-6">
                {/* Header with Save and Preview Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Visual Theme & Storefront Customizer
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Tailor colors, fonts, announcement banners, and COD conversion widgets in real time.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border rounded-lg p-0.5 bg-background">
                            <button
                                type="button"
                                onClick={() => setPreviewDevice('desktop')}
                                className={`p-1.5 rounded-md transition-colors ${
                                    previewDevice === 'desktop'
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                                title="Desktop preview"
                            >
                                <Monitor className="size-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setPreviewDevice('mobile')}
                                className={`p-1.5 rounded-md transition-colors ${
                                    previewDevice === 'mobile'
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                                title="Mobile preview"
                            >
                                <Smartphone className="size-4" />
                            </button>
                        </div>

                        <Button onClick={handleSave} className="gap-2 h-9 text-xs font-semibold shadow-xs">
                            {saved ? <Check className="size-4 text-emerald-400" /> : <Save className="size-4" />}
                            <span>{saved ? 'Theme Published!' : 'Publish Theme'}</span>
                        </Button>
                    </div>
                </div>

                {/* 2-Column Studio: Left Editor Controls, Right Interactive Mock Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Theme Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Color Presets */}
                        <Card className="border border-border/80 shadow-xs">
                            <CardHeader className="pb-3 border-b border-border/60">
                                <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                                    <Palette className="size-4 text-primary" />
                                    Color Palette
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Choose an Algerian curated color scheme or customize your hex code.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4">
                                <div className="grid grid-cols-2 gap-2.5">
                                    {COLOR_PRESETS.map((preset) => (
                                        <button
                                            key={preset.id}
                                            type="button"
                                            onClick={() => handleApplyPreset(preset)}
                                            className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                                                selectedPreset === preset.id
                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                                    : 'border-border/80 hover:bg-muted/40'
                                            }`}
                                        >
                                            <div
                                                className="size-5 rounded-full border border-black/20 shrink-0"
                                                style={{ backgroundColor: preset.primary }}
                                            />
                                            <span className="text-xs font-semibold text-foreground truncate">
                                                {preset.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-1.5 pt-2 border-t border-border/60">
                                    <Label className="text-xs font-medium">Primary Accent Color</Label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            className="size-9 rounded-lg border border-border cursor-pointer p-0.5 bg-transparent"
                                        />
                                        <Input
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            className="h-9 text-xs font-mono w-32"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Announcement Bar & Header */}
                        <Card className="border border-border/80 shadow-xs">
                            <CardHeader className="pb-3 border-b border-border/60">
                                <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                                    <Sparkles className="size-4 text-primary" />
                                    Top Announcement Bar
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-3">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">Banner Text</Label>
                                    <Input
                                        value={announcementText}
                                        onChange={(e) => setAnnouncementText(e.target.value)}
                                        className="h-9 text-xs"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* WhatsApp & COD Conversion Widgets */}
                        <Card className="border border-border/80 shadow-xs">
                            <CardHeader className="pb-3 border-b border-border/60">
                                <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                                    <MessageCircle className="size-4 text-emerald-600" />
                                    Floating WhatsApp & Trust Elements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4 text-xs">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showWhatsappButton}
                                        onChange={(e) => setShowWhatsappButton(e.target.checked)}
                                        className="rounded border-border size-4 text-primary"
                                    />
                                    <span className="font-medium text-foreground">
                                        Display floating WhatsApp contact button
                                    </span>
                                </label>

                                {showWhatsappButton && (
                                    <div className="space-y-1.5 pl-6">
                                        <Label className="text-[11px] font-medium text-muted-foreground">
                                            WhatsApp Number (Without + sign)
                                        </Label>
                                        <Input
                                            value={whatsappNumber}
                                            onChange={(e) => setWhatsappNumber(e.target.value)}
                                            className="h-8 text-xs font-mono"
                                        />
                                    </div>
                                )}

                                <div className="pt-2 border-t border-border/60 space-y-2.5">
                                    <label className="flex items-center gap-2.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={showStockCounter}
                                            onChange={(e) => setShowStockCounter(e.target.checked)}
                                            className="rounded border-border size-4 text-primary"
                                        />
                                        <span className="font-medium text-foreground">
                                            Show urgency badges ("Only 3 left in stock")
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-2.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={showReviewsStars}
                                            onChange={(e) => setShowReviewsStars(e.target.checked)}
                                            className="rounded border-border size-4 text-primary"
                                        />
                                        <span className="font-medium text-foreground">
                                            Display verified Algerian buyer star ratings
                                        </span>
                                    </label>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Live Responsive Preview Sandbox */}
                    <div className="lg:col-span-7 sticky top-20">
                        <div className="border border-border/80 rounded-2xl bg-card shadow-lg overflow-hidden flex flex-col">
                            {/* Browser / Device Chrome Header */}
                            <div className="px-4 py-2.5 bg-muted/60 border-b border-border flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <span className="size-2.5 rounded-full bg-red-400" />
                                    <span className="size-2.5 rounded-full bg-amber-400" />
                                    <span className="size-2.5 rounded-full bg-emerald-400" />
                                    <span className="ml-2 font-mono text-[11px]">https://dzavenue.dz</span>
                                </div>
                                <span className="font-semibold text-[10px] uppercase tracking-wider">
                                    Live Preview
                                </span>
                            </div>

                            {/* Simulated Screen Stage */}
                            <div
                                className={`p-4 bg-background transition-all mx-auto ${
                                    previewDevice === 'mobile'
                                        ? 'max-w-xs border-x border-border my-4 rounded-xl shadow-inner'
                                        : 'w-full'
                                }`}
                            >
                                {/* Announcement Bar */}
                                <div
                                    className="p-1.5 text-center text-[10px] font-medium text-white rounded-md mb-3 line-clamp-1"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    {announcementText}
                                </div>

                                {/* Simulated Topbar */}
                                <div className="flex items-center justify-between py-2 border-b border-border/60 mb-4">
                                    <span className="font-bold text-xs tracking-tight">DzAvenue Boutique</span>
                                    <div
                                        className="size-6 rounded-md text-white flex items-center justify-center text-[10px] font-bold"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        🛒
                                    </div>
                                </div>

                                {/* Simulated Hero */}
                                <div className="p-4 rounded-xl bg-muted/30 border border-border/60 text-center space-y-2 mb-4">
                                    <Badge variant="outline" className="text-[9px]">
                                        58 Wilayas COD
                                    </Badge>
                                    <h4 className="text-xs font-bold leading-tight line-clamp-2">
                                        {heroHeading}
                                    </h4>
                                    <button
                                        type="button"
                                        className="px-3 py-1.5 rounded-md text-white text-[11px] font-semibold mx-auto block shadow-xs"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        Shop Best Sellers
                                    </button>
                                </div>

                                {/* Simulated Product Card */}
                                <div className="border border-border/80 rounded-xl p-2.5 space-y-2 bg-card">
                                    <div className="aspect-16/9 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                        Product Image
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-muted-foreground">Footwear</span>
                                            {showReviewsStars && (
                                                <span className="text-amber-500 font-bold">★ 4.9</span>
                                            )}
                                        </div>
                                        <span className="text-xs font-bold block truncate">
                                            AirPulse Running Shoes
                                        </span>
                                        <div className="flex justify-between items-center pt-1">
                                            <span className="font-bold text-xs">5,900 DZD</span>
                                            <span
                                                className="text-[10px] font-semibold px-2 py-0.5 rounded text-white"
                                                style={{ backgroundColor: primaryColor }}
                                            >
                                                Order (COD)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StoreMerchantLayout>
    );
}
