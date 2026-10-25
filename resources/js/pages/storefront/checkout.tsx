import React, { useState, useId } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBag,
    Truck,
    ShieldCheck,
    CheckCircle2,
    Phone,
    MapPin,
    Building2,
    User,
    ArrowLeft,
    Clock,
    Sparkles,
    AlertCircle,
    ChevronDown,
    Lock,
    Package,
    Minus,
    Plus,
} from 'lucide-react';
import StorefrontLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// 58 Algerian Wilayas with home & stopdesk baseline COD delivery prices (DZD)
interface WilayaOption {
    code: string;
    name: string;
    home_fee: number;
    stopdesk_fee: number;
    communes: string[];
}

const ALGERIA_WILAYAS: WilayaOption[] = [
    { code: '16', name: '16 - Alger (Algiers)', home_fee: 400, stopdesk_fee: 250, communes: ['Alger Centre', 'Bab Ezzouar', 'Hydra', 'El Biar', 'Cheraga', 'Dely Ibrahim', 'Kouba', 'Birkhadem', 'Rouiba', 'Zeralda'] },
    { code: '09', name: '09 - Blida', home_fee: 500, stopdesk_fee: 300, communes: ['Blida', 'Boufarik', 'Ouled Yaïch', 'Larbaa', 'El Affroun', 'Mouzaïa'] },
    { code: '31', name: '31 - Oran', home_fee: 650, stopdesk_fee: 350, communes: ['Oran', 'Bir El Djir', 'Es Senia', 'Ain El Turk', 'Arzew', 'Oued Tlelat'] },
    { code: '25', name: '25 - Constantine', home_fee: 650, stopdesk_fee: 350, communes: ['Constantine', 'Ali Mendjeli', 'El Khroub', 'Hamma Bouziane', 'Ain Smara'] },
    { code: '19', name: '19 - Sétif', home_fee: 600, stopdesk_fee: 350, communes: ['Sétif', 'El Eulma', 'Ain Oulmene', 'Ain Arnat', 'Bougaa'] },
    { code: '15', name: '15 - Tizi Ouzou', home_fee: 600, stopdesk_fee: 350, communes: ['Tizi Ouzou', 'Azazga', 'Draa Ben Khedda', 'Tigzirt'] },
    { code: '35', name: '35 - Boumerdès', home_fee: 550, stopdesk_fee: 300, communes: ['Boumerdès', 'Khemis El Khechna', 'Boudouaou', 'Dellys', 'Zemmouri'] },
    { code: '42', name: '42 - Tipaza', home_fee: 550, stopdesk_fee: 300, communes: ['Tipaza', 'Kolea', 'Cherchell', 'Bou Ismaïl', 'Hadjout', 'Fouka'] },
    { code: '23', name: '23 - Annaba', home_fee: 700, stopdesk_fee: 400, communes: ['Annaba', 'El Bouni', 'El Hadjar', 'Sidi Amar', 'Berrahal'] },
    { code: '13', name: '13 - Tlemcen', home_fee: 700, stopdesk_fee: 400, communes: ['Tlemcen', 'Mansourah', 'Maghnia', 'Remchi', 'Ghazaouet'] },
    { code: '06', name: '06 - Béjaïa', home_fee: 650, stopdesk_fee: 350, communes: ['Béjaïa', 'Akbou', 'Amizour', 'Sidi Aïch', 'El Kseur'] },
    { code: '27', name: '27 - Mostaganem', home_fee: 650, stopdesk_fee: 350, communes: ['Mostaganem', 'Ain Nouïssy', 'Hassi Mameche', 'Sidi Ali'] },
    { code: '10', name: '10 - Bouira', home_fee: 600, stopdesk_fee: 350, communes: ['Bouira', 'Lakhdaria', 'Sour El Ghouzlane', 'Ain Bessam'] },
    { code: '05', name: '05 - Batna', home_fee: 700, stopdesk_fee: 400, communes: ['Batna', 'Barika', 'Ain Touta', 'Merouana'] },
    { code: '22', name: '22 - Sidi Bel Abbès', home_fee: 700, stopdesk_fee: 400, communes: ['Sidi Bel Abbès', 'Telagh', 'Ben Badis', 'Sfisef'] },
    { code: '18', name: '18 - Jijel', home_fee: 700, stopdesk_fee: 400, communes: ['Jijel', 'Taher', 'El Milia', 'El Aouana'] },
    { code: '21', name: '21 - Skikda', home_fee: 700, stopdesk_fee: 400, communes: ['Skikda', 'El Hadaiek', 'Azzaba', 'Collo'] },
    { code: '30', name: '30 - Ouargla', home_fee: 900, stopdesk_fee: 550, communes: ['Ouargla', 'Hassi Messaoud', 'Rouissat'] },
    { code: '47', name: '47 - Ghardaïa', home_fee: 850, stopdesk_fee: 500, communes: ['Ghardaïa', 'Metlili', 'El Guerrara', 'Bounoura'] },
    { code: '07', name: '07 - Biskra', home_fee: 750, stopdesk_fee: 450, communes: ['Biskra', 'Tolga', 'Sidi Okba'] },
    { code: '17', name: '17 - Djelfa', home_fee: 750, stopdesk_fee: 450, communes: ['Djelfa', 'Ain Oussera', 'Messaad', 'Hassi Bahbah'] },
    { code: '39', name: '39 - El Oued', home_fee: 850, stopdesk_fee: 500, communes: ['El Oued', 'Robbah', 'Guemar', 'Magrane'] },
    { code: '08', name: '08 - Béchar', home_fee: 950, stopdesk_fee: 600, communes: ['Béchar', 'Kenadsa', 'Abadla', 'Taghit'] },
    { code: '11', name: '11 - Tamanrasset', home_fee: 1400, stopdesk_fee: 900, communes: ['Tamanrasset', 'Abalessa', 'In Amguel'] },
];

export default function StorefrontCheckout() {
    const fullNameId = useId();
    const phoneId = useId();
    const phoneAltId = useId();
    const addressId = useId();
    const notesId = useId();

    // Mock cart item
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('42');
    const [selectedColor, setSelectedColor] = useState('Black / Obsidian');

    // Customer Coordinates
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneAlt, setPhoneAlt] = useState('');
    const [selectedWilayaCode, setSelectedWilayaCode] = useState('16');
    const [selectedCommune, setSelectedCommune] = useState('Bab Ezzouar');
    const [deliveryType, setDeliveryType] = useState<'home' | 'stopdesk'>('home');
    const [addressDetails, setAddressDetails] = useState('');
    const [orderNotes, setOrderNotes] = useState('');

    // Submission & Confirmation state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');

    // Pricing calculation
    const unitPrice = 5900;
    const itemSubtotal = unitPrice * quantity;
    const currentWilaya = ALGERIA_WILAYAS.find((w) => w.code === selectedWilayaCode) || ALGERIA_WILAYAS[0];
    const deliveryFee = deliveryType === 'home' ? currentWilaya.home_fee : currentWilaya.stopdesk_fee;
    const totalAmount = itemSubtotal + deliveryFee;

    const handleWilayaChange = (code: string) => {
        setSelectedWilayaCode(code);
        const target = ALGERIA_WILAYAS.find((w) => w.code === code);
        if (target && target.communes.length > 0) {
            setSelectedCommune(target.communes[0]);
        }
    };

    const handleSubmitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !phone.trim()) {
            alert('Please enter your full name and primary phone number.');
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setTrackingNumber(`DZ-${Math.floor(100000 + Math.random() * 900000)}`);
            setIsSuccess(true);
        }, 800);
    };

    // If order is completed, show Algerian COD Thank-You View
    if (isSuccess) {
        return (
            <StorefrontLayout cartCount={0}>
                <Head title="Order Confirmed - DzAvenue Boutique" />
                <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
                    <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-md animate-in zoom-in-75 duration-300">
                        <CheckCircle2 className="size-9" />
                    </div>

                    <div className="space-y-2">
                        <Badge variant="outline" className="text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                            Cash On Delivery Order Received
                        </Badge>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Thank you, {fullName}!
                        </h1>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                            Your order <strong>{trackingNumber}</strong> has been logged in our system. You do not need to pay anything right now.
                        </p>
                    </div>

                    {/* Step call banner */}
                    <Card className="border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-left p-5 space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="size-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                <Phone className="size-4" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold text-emerald-950 dark:text-emerald-200">
                                    Next Step: Our Call Center Will Ring You
                                </h4>
                                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
                                    An agent from our verification center will call you shortly on <strong>{phone}</strong> to confirm your shoe size ({selectedSize}), color choice, and delivery coordinates before sending the parcel.
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Order summary table */}
                    <Card className="border border-border/80 text-left">
                        <CardHeader className="py-4 border-b border-border/60">
                            <CardTitle className="text-sm font-semibold">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3 text-xs">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Product</span>
                                <span className="font-medium text-foreground">AirPulse Running Shoes (Size {selectedSize}) × {quantity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Delivery Method</span>
                                <span className="font-medium text-foreground">
                                    {deliveryType === 'home' ? 'Home Delivery' : 'Stopdesk Pickup'} ({currentWilaya.name} - {selectedCommune})
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping Fee</span>
                                <span className="font-medium text-foreground">{deliveryFee.toLocaleString()} DZD</span>
                            </div>
                            <div className="pt-2 border-t border-border flex justify-between text-sm font-bold">
                                <span>Total to Pay in Cash</span>
                                <span className="text-primary">{totalAmount.toLocaleString()} DZD</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/storefront">
                            <Button variant="outline" className="gap-2">
                                <ArrowLeft className="size-4" />
                                Return to Store
                            </Button>
                        </Link>
                    </div>
                </div>
            </StorefrontLayout>
        );
    }

    return (
        <StorefrontLayout cartCount={quantity}>
            <Head title="Express 1-Click COD Checkout - DzAvenue Boutique" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Back to store navigation */}
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href="/storefront"
                        className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>Continue Shopping</span>
                    </Link>

                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        <Lock className="size-3" />
                        <span>Encrypted Cash on Delivery Gateway</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Algerian 1-Click COD Form */}
                    <div className="lg:col-span-7 space-y-6">
                        <form onSubmit={handleSubmitOrder} className="space-y-6">
                            {/* Personal Contact Details */}
                            <Card className="border border-border/80 shadow-xs">
                                <CardHeader className="pb-4 border-b border-border/60">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base font-semibold tracking-tight flex items-center gap-2">
                                            <User className="size-4 text-primary" />
                                            Customer Information
                                        </CardTitle>
                                        <Badge variant="secondary" className="text-[11px] font-normal">
                                            Required for Courier Delivery
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-xs">
                                        Our call center will reach out to this phone number to validate your package.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-5 space-y-4">
                                    {/* Full Name */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor={fullNameId} className="text-xs font-medium">
                                            Full Name (Nom & Prénom) <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                            <Input
                                                id={fullNameId}
                                                required
                                                placeholder="e.g. Karim Benali"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="pl-9 h-10 text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Primary Phone */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor={phoneId} className="text-xs font-medium">
                                                Phone Number (Téléphone) <span className="text-red-500">*</span>
                                            </Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-emerald-600 pointer-events-none" />
                                                <Input
                                                    id={phoneId}
                                                    required
                                                    type="tel"
                                                    placeholder="05 / 06 / 07 XX XX XX"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="pl-9 h-10 text-sm font-mono"
                                                />
                                            </div>
                                        </div>

                                        {/* Alternative Phone */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor={phoneAltId} className="text-xs font-medium text-muted-foreground">
                                                Alternative Phone (Optionnel)
                                            </Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                                <Input
                                                    id={phoneAltId}
                                                    type="tel"
                                                    placeholder="Secondary number"
                                                    value={phoneAlt}
                                                    onChange={(e) => setPhoneAlt(e.target.value)}
                                                    className="pl-9 h-10 text-sm font-mono"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Algerian Wilaya & Delivery Destination */}
                            <Card className="border border-border/80 shadow-xs">
                                <CardHeader className="pb-4 border-b border-border/60">
                                    <CardTitle className="text-base font-semibold tracking-tight flex items-center gap-2">
                                        <MapPin className="size-4 text-primary" />
                                        Delivery Coordinates (Algeria)
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Select your wilaya to calculate live courier fees (Yalidine / ZR Express).
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-5 space-y-4">
                                    {/* Delivery Type Switcher: Home vs Stopdesk */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setDeliveryType('home')}
                                            className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                                deliveryType === 'home'
                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                                    : 'border-border hover:bg-muted/50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between w-full mb-1">
                                                <div className="flex items-center gap-2">
                                                    <Truck className="size-4 text-primary" />
                                                    <span className="text-xs font-semibold text-foreground">Home Delivery</span>
                                                </div>
                                                <span className="text-xs font-bold text-primary">
                                                    +{currentWilaya.home_fee} DZD
                                                </span>
                                            </div>
                                            <span className="text-[11px] text-muted-foreground">
                                                Delivered directly to your door in 24-48h
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setDeliveryType('stopdesk')}
                                            className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                                deliveryType === 'stopdesk'
                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                                    : 'border-border hover:bg-muted/50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between w-full mb-1">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="size-4 text-primary" />
                                                    <span className="text-xs font-semibold text-foreground">Stopdesk (Bureau)</span>
                                                </div>
                                                <span className="text-xs font-bold text-primary">
                                                    +{currentWilaya.stopdesk_fee} DZD
                                                </span>
                                            </div>
                                            <span className="text-[11px] text-muted-foreground">
                                                Pick up yourself from the courier office
                                            </span>
                                        </button>
                                    </div>

                                    {/* Wilaya & Commune Cascading Dropdowns */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-medium">
                                                Wilaya (58 Provinces) <span className="text-red-500">*</span>
                                            </Label>
                                            <div className="relative">
                                                <select
                                                    value={selectedWilayaCode}
                                                    onChange={(e) => handleWilayaChange(e.target.value)}
                                                    className="w-full h-10 px-3 pr-8 rounded-md border border-input bg-background text-sm focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring appearance-none cursor-pointer"
                                                >
                                                    {ALGERIA_WILAYAS.map((wilaya) => (
                                                        <option key={wilaya.code} value={wilaya.code}>
                                                            {wilaya.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-medium">
                                                Commune (Municipality) <span className="text-red-500">*</span>
                                            </Label>
                                            <div className="relative">
                                                <select
                                                    value={selectedCommune}
                                                    onChange={(e) => setSelectedCommune(e.target.value)}
                                                    className="w-full h-10 px-3 pr-8 rounded-md border border-input bg-background text-sm focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring appearance-none cursor-pointer"
                                                >
                                                    {currentWilaya.communes.map((commune) => (
                                                        <option key={commune} value={commune}>
                                                            {commune}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detailed Address (Street / Building) */}
                                    {deliveryType === 'home' && (
                                        <div className="space-y-1.5">
                                            <Label htmlFor={addressId} className="text-xs font-medium">
                                                Street Address / Landmark (Adresse de livraison)
                                            </Label>
                                            <Input
                                                id={addressId}
                                                placeholder="e.g. Cité 500 Logements, Bâtiment B, N° 12"
                                                value={addressDetails}
                                                onChange={(e) => setAddressDetails(e.target.value)}
                                                className="h-10 text-sm"
                                            />
                                        </div>
                                    )}

                                    {/* Order Notes */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor={notesId} className="text-xs font-medium text-muted-foreground">
                                            Delivery Instructions / Note (Optionnel)
                                        </Label>
                                        <Input
                                            id={notesId}
                                            placeholder="e.g. Call after 2:00 PM, near the grand mosque"
                                            value={orderNotes}
                                            onChange={(e) => setOrderNotes(e.target.value)}
                                            className="h-9 text-xs"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Submit Button (Large High-Conversion CTA) */}
                            <div className="space-y-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    size="lg"
                                    className="w-full h-12 text-base font-semibold shadow-md gap-2"
                                >
                                    <ShoppingBag className="size-5" />
                                    {isSubmitting
                                        ? 'Registering Order...'
                                        : `Confirm Order - ${totalAmount.toLocaleString()} DZD (Cash on Delivery)`}
                                </Button>
                                <p className="text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1.5">
                                    <ShieldCheck className="size-3.5 text-emerald-500" />
                                    <span>Zero risk. Pay only when courier hands over the parcel.</span>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Order Summary & Product Customization */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border border-border/80 shadow-xs sticky top-20">
                            <CardHeader className="pb-3 border-b border-border/60">
                                <CardTitle className="text-sm font-semibold tracking-tight">Your Order</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-5">
                                {/* Product card with variants */}
                                <div className="flex gap-4 items-start">
                                    <div className="size-20 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/60">
                                        <img
                                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80"
                                            alt="AirPulse Running Shoes"
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-semibold text-sm leading-tight text-foreground">
                                            AirPulse Breathable Sport Running Shoes
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            Color: {selectedColor}
                                        </p>
                                        <div className="text-sm font-bold text-primary pt-0.5">
                                            {unitPrice.toLocaleString()} DZD
                                        </div>
                                    </div>
                                </div>

                                {/* Size selector */}
                                <div className="space-y-2 pt-2 border-t border-border/60">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-medium">Select Size (Pointure)</span>
                                        <span className="text-muted-foreground">Standard EU fit</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {['40', '41', '42', '43', '44'].map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setSelectedSize(size)}
                                                className={`size-9 rounded-lg text-xs font-semibold border transition-all ${
                                                    selectedSize === size
                                                        ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                                                        : 'border-border bg-background text-muted-foreground hover:border-foreground'
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity Counter */}
                                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                                    <span className="text-xs font-medium">Quantity</span>
                                    <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <Minus className="size-3.5" />
                                        </button>
                                        <span className="w-8 text-center text-xs font-semibold">
                                            {quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <Plus className="size-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Financial Breakdown */}
                                <div className="space-y-2 pt-4 border-t border-border text-xs">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal ({quantity} items)</span>
                                        <span className="font-medium text-foreground">{itemSubtotal.toLocaleString()} DZD</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Truck className="size-3.5 text-primary" />
                                            Shipping ({currentWilaya.name.split('-')[1]?.trim() || 'Algeria'})
                                        </span>
                                        <span className="font-medium text-foreground">+{deliveryFee.toLocaleString()} DZD</span>
                                    </div>
                                    <div className="pt-3 border-t border-border flex justify-between items-baseline">
                                        <div>
                                            <span className="text-sm font-bold text-foreground">Total (COD)</span>
                                            <span className="block text-[10px] text-muted-foreground">
                                                Paid to courier in cash upon arrival
                                            </span>
                                        </div>
                                        <span className="text-lg font-extrabold text-primary">
                                            {totalAmount.toLocaleString()} DZD
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fast Call Confirmation Explainer Card */}
                        <div className="p-4 rounded-xl border border-border/80 bg-muted/30 text-xs space-y-2 text-muted-foreground">
                            <div className="flex items-center gap-1.5 text-foreground font-semibold">
                                <Clock className="size-3.5 text-primary" />
                                <span>Fast Dispatch Policy</span>
                            </div>
                            <p className="text-[11px] leading-relaxed">
                                Once submitted, orders are routed to our call center team. We dispatch via Yalidine Express / ZR Express as soon as phone confirmation is completed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </StorefrontLayout>
    );
}
