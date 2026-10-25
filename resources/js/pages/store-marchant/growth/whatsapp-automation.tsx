import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    MessageCircle,
    Send,
    Bot,
    Sparkles,
    CheckCircle2,
    Clock,
    PhoneCall,
    Truck,
    Package,
    ShieldAlert,
    Copy,
    Save,
    Plus,
    RotateCcw,
    Zap,
    ExternalLink,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NotificationTrigger {
    id: string;
    event_key: 'order_placed' | 'order_confirmed' | 'parcel_dispatched' | 'out_for_delivery' | 'delivery_failed_retry';
    title: string;
    description: string;
    active: boolean;
    template_french: string;
    template_arabic: string;
    variables: string[];
}

const DEFAULT_TEMPLATES: NotificationTrigger[] = [
    {
        id: 'trg-1',
        event_key: 'order_placed',
        title: 'Nouvelle Commande Passée (Order Received)',
        description: 'Sent instantly when customer clicks 1-Click COD checkout on storefront.',
        active: true,
        template_french:
            'Bonjour {{customer_name}}, nous avons bien reçu votre commande {{order_ref}} sur {{store_name}} pour un montant de {{total_amount}} DZD. Notre service confirmation va vous appeler dans 30 minutes pour valider votre adresse à {{commune}}, {{wilaya}}.',
        template_arabic:
            'مرحبا {{customer_name}}، لقد تم استلام طلبكم رقم {{order_ref}} بقيمة {{total_amount}} دج. سيتصل بكم فريق التأكيد لتأكيد العنوان والتوصيل إلى {{commune}}، {{wilaya}}.',
        variables: ['{{customer_name}}', '{{order_ref}}', '{{store_name}}', '{{total_amount}}', '{{commune}}', '{{wilaya}}'],
    },
    {
        id: 'trg-2',
        event_key: 'order_confirmed',
        title: 'Commande Confirmée par Téléphone (Confirmed by Operator)',
        description: 'Sent when call center operator marks order as Confirmed (Confirmée).',
        active: true,
        template_french:
            'Parfait {{customer_name}}! Votre commande {{order_ref}} ({{items_list}}) est confirmée. Elle est en cours de préparation pour expédition rapide via {{courier_name}}.',
        template_arabic:
            'تم تأكيد طلبك {{order_ref}} بنجاح! يتم الآن تجهيز طردكم للشحن السريع عبر {{courier_name}}.',
        variables: ['{{customer_name}}', '{{order_ref}}', '{{items_list}}', '{{courier_name}}'],
    },
    {
        id: 'trg-3',
        event_key: 'parcel_dispatched',
        title: 'Colis Expédié & Numéro de Suivi (Dispatched with Tracking Link)',
        description: 'Sent when courier picks up parcel from warehouse with live tracking code.',
        active: true,
        template_french:
            'Bonne nouvelle! Votre colis a été pris en charge par {{courier_name}}. Numéro de suivi: {{tracking_code}}. Suivez votre livraison en direct ici: {{tracking_link}}',
        template_arabic:
            'بشرى سارة! طردكم الآن في الطريق مع {{courier_name}}. رقم التتبع: {{tracking_code}}. تتبع طردك هنا: {{tracking_link}}',
        variables: ['{{customer_name}}', '{{courier_name}}', '{{tracking_code}}', '{{tracking_link}}'],
    },
    {
        id: 'trg-4',
        event_key: 'out_for_delivery',
        title: 'Livreur en Route vers Vous (Driver Arriving Today)',
        description: 'Crucial alert sent on the morning of delivery to ensure customer is home with cash ready.',
        active: true,
        template_french:
            'Aujourd\'hui c\'est le jour J! Le livreur {{driver_name}} ({{driver_phone}}) est en route pour livrer votre colis {{order_ref}}. Merci de préparer le montant exact de {{total_amount}} DZD en espèces. Mode: {{delivery_mode}}.',
        template_arabic:
            'طردكم في طريقه إليكم اليوم مع السائق {{driver_name}} ({{driver_phone}}). يرجى تحضير مبلغ {{total_amount}} دج نقداً عند الاستلام.',
        variables: ['{{driver_name}}', '{{driver_phone}}', '{{order_ref}}', '{{total_amount}}', '{{delivery_mode}}'],
    },
    {
        id: 'trg-5',
        event_key: 'delivery_failed_retry',
        title: 'Tentative de Livraison Injoignable (Return Mitigation)',
        description: 'Automated message when driver marks client unreachable to prevent returns.',
        active: true,
        template_french:
            'Attention {{customer_name}}, le livreur a essayé de vous joindre mais votre téléphone n\'a pas répondu. Pour reprogrammer votre livraison avant renvoi du colis, répondez simplement "OUI" à ce message ou appelez le {{driver_phone}}.',
        template_arabic:
            'تنبيه: حاول السائق الاتصال بكم لكن الهاتف لم يجب. لإعادة جدولة التوصيل قبل إرجاع الطرد، أجب بـ "نعم" على هذه الرسالة أو اتصل بالسائق {{driver_phone}}.',
        variables: ['{{customer_name}}', '{{driver_phone}}', '{{order_ref}}'],
    },
];

export default function WhatsAppNotificationsBuilder() {
    const [templates, setTemplates] = useState<NotificationTrigger[]>(DEFAULT_TEMPLATES);
    const [selectedTriggerId, setSelectedTriggerId] = useState<string>(DEFAULT_TEMPLATES[0].id);
    const [selectedLanguage, setSelectedLanguage] = useState<'french' | 'arabic'>('french');
    const [savedNotice, setSavedNotice] = useState(false);

    const activeTrigger = templates.find((t) => t.id === selectedTriggerId) || templates[0];

    const updateActiveTemplateText = (text: string) => {
        setTemplates((prev) =>
            prev.map((t) => {
                if (t.id === activeTrigger.id) {
                    return selectedLanguage === 'french'
                        ? { ...t, template_french: text }
                        : { ...t, template_arabic: text };
                }
                return t;
            })
        );
    };

    const toggleTriggerActive = (id: string) => {
        setTemplates((prev) =>
            prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
        );
    };

    const handleSave = () => {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    // Live Simulated Preview Text with Sample Values
    const getRenderedPreview = () => {
        const raw =
            selectedLanguage === 'french'
                ? activeTrigger.template_french
                : activeTrigger.template_arabic;

        return raw
            .replace(/\{\{customer_name\}\}/g, 'Youcef Mahrez')
            .replace(/\{\{order_ref\}\}/g, 'DZ-91031')
            .replace(/\{\{store_name\}\}/g, 'DzAvenue Boutique')
            .replace(/\{\{total_amount\}\}/g, '6,300')
            .replace(/\{\{commune\}\}/g, 'Bab Ezzouar')
            .replace(/\{\{wilaya\}\}/g, 'Alger')
            .replace(/\{\{items_list\}\}/g, 'AirPulse Shoes (Size 42)')
            .replace(/\{\{courier_name\}\}/g, 'Yalidine Express')
            .replace(/\{\{tracking_code\}\}/g, 'YAL-74811029')
            .replace(/\{\{tracking_link\}\}/g, 'souknet.dz/track/YAL-74811029')
            .replace(/\{\{driver_name\}\}/g, 'Mourad')
            .replace(/\{\{driver_phone\}\}/g, '0661 88 77 66')
            .replace(/\{\{delivery_mode\}\}/g, 'À domicile');
    };

    return (
        <StoreMerchantLayout title="WhatsApp Notification Automation" activeNav="notifications">
            <Head title="WhatsApp Notifications Automation Builder - Souknet" />

            <div className="space-y-6 ">
                {savedNotice && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="size-4" />
                            <span>WhatsApp Automation Templates successfully synchronized with Cloud API!</span>
                        </span>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <MessageCircle className="size-5 text-emerald-600" />
                            <span>WhatsApp Automated Customer Alerts</span>
                            <Badge className="bg-emerald-600 text-white text-[10px]">
                                Cloud API Connected
                            </Badge>
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Automate transactional order receipts, dispatch updates, and driver arrival notifications to boost COD delivery success.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button onClick={handleSave} className="h-9 text-xs gap-1.5 bg-primary font-semibold shadow-xs">
                            <Save className="size-3.5" />
                            <span>Save Automation Rules</span>
                        </Button>
                    </div>
                </div>

                {/* 2-Column Layout: Left Trigger Selector | Right Message Builder & WhatsApp Phone Simulator */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Trigger Events List (5 cols) */}
                    <div className="lg:col-span-5 space-y-3">
                        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                            <CardHeader className="p-4 pb-2 border-b border-border/80">
                                <CardTitle className="text-sm font-semibold flex items-center justify-between">
                                    <span>Lifecycle Trigger Events</span>
                                    <Badge variant="secondary" className="text-xs">
                                        5 Configured
                                    </Badge>
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Select an event to customize message templates and variables.
                                </CardDescription>
                            </CardHeader>

                            <div className="divide-y divide-border/60">
                                {templates.map((trigger) => {
                                    const isSelected = trigger.id === activeTrigger.id;
                                    return (
                                        <div
                                            key={trigger.id}
                                            onClick={() => setSelectedTriggerId(trigger.id)}
                                            className={`p-3.5 cursor-pointer transition-all ${isSelected
                                                    ? 'bg-primary/10 border-l-4 border-l-primary'
                                                    : 'hover:bg-muted/40'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-semibold text-xs text-foreground">
                                                    {trigger.title}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleTriggerActive(trigger.id);
                                                    }}
                                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${trigger.active
                                                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                                            : 'bg-muted text-muted-foreground'
                                                        }`}
                                                >
                                                    {trigger.active ? 'Active' : 'Disabled'}
                                                </button>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                                                {trigger.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* Right: Message Editor & Live WhatsApp Smartphone Preview (7 cols) */}
                    <div className="lg:col-span-7 space-y-5">
                        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                            <CardHeader className="p-4 border-b border-border/80 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-semibold">
                                        Template Editor: {activeTrigger.title}
                                    </CardTitle>
                                    <span className="text-[11px] text-muted-foreground">
                                        Supports dynamic Liquid-style bracket tags.
                                    </span>
                                </div>

                                {/* Language Selector */}
                                <div className="inline-flex rounded-lg border border-border p-1 bg-background text-xs">
                                    <button
                                        onClick={() => setSelectedLanguage('french')}
                                        className={`px-2.5 py-0.5 rounded font-medium text-xs transition-colors ${selectedLanguage === 'french'
                                                ? 'bg-primary text-primary-foreground font-bold'
                                                : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        Français
                                    </button>
                                    <button
                                        onClick={() => setSelectedLanguage('arabic')}
                                        className={`px-2.5 py-0.5 rounded font-medium text-xs transition-colors ${selectedLanguage === 'arabic'
                                                ? 'bg-primary text-primary-foreground font-bold'
                                                : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        العربية
                                    </button>
                                </div>
                            </CardHeader>

                            <CardContent className="p-4 space-y-4">
                                {/* Textarea Editor */}
                                <div>
                                    <Label className="text-xs text-muted-foreground font-semibold block mb-1.5">
                                        Message Body ({selectedLanguage === 'french' ? 'French' : 'Arabic'})
                                    </Label>
                                    <textarea
                                        rows={4}
                                        value={
                                            selectedLanguage === 'french'
                                                ? activeTrigger.template_french
                                                : activeTrigger.template_arabic
                                        }
                                        onChange={(e) => updateActiveTemplateText(e.target.value)}
                                        dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
                                        className="w-full rounded-xl border border-input bg-background p-3 text-xs leading-relaxed text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                {/* Dynamic Variables Insertion Pills */}
                                <div className="space-y-1.5">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                                        Available Dynamic Variables (Click to copy)
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {activeTrigger.variables.map((variable) => (
                                            <button
                                                key={variable}
                                                type="button"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(variable);
                                                }}
                                                className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground hover:bg-primary/20 transition-colors border border-border"
                                                title="Click to copy tag"
                                            >
                                                {variable}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* LIVE WHATSAPP SMARTPHONE MOCKUP FRAME */}
                        <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-2">
                            <span className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <MessageCircle className="size-4 text-emerald-600" />
                                Live Customer WhatsApp Preview
                            </span>

                            {/* Simulated WhatsApp Chat Bubble */}
                            <div className="max-w-md mx-auto rounded-2xl overflow-hidden border border-emerald-800/30 bg-[#0b141a] text-white shadow-xl">
                                {/* WhatsApp Header */}
                                <div className="bg-[#202c33] p-3 flex items-center gap-3 border-b border-[#313d45]">
                                    <div className="size-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                                        DZ
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-white">
                                            <span>DzAvenue Boutique</span>
                                            <CheckCircle2 className="size-3 text-emerald-400" />
                                        </div>
                                        <span className="text-[10px] text-zinc-400 block">
                                            Official Business Account · Souknet
                                        </span>
                                    </div>
                                </div>

                                {/* Chat Wallpaper Area */}
                                <div className="p-4 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] min-h-[160px] flex flex-col justify-end">
                                    {/* Green Message Bubble */}
                                    <div
                                        dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
                                        className="bg-[#005c4b] text-[#e9edef] p-3 rounded-2xl rounded-tr-none text-xs leading-relaxed shadow-md space-y-1.5 relative max-w-[90%] ml-auto"
                                    >
                                        <p>{getRenderedPreview()}</p>
                                        <div className="flex items-center justify-end gap-1 text-[9px] text-[#8696a0] pt-0.5">
                                            <span>14:32</span>
                                            <span className="text-emerald-400 font-bold">✓✓</span>
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
