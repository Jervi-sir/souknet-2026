import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    PhoneCall,
    PhoneForwarded,
    CheckCircle2,
    XCircle,
    Clock,
    User,
    MapPin,
    Truck,
    MessageCircle,
    RotateCcw,
    ChevronRight,
    ShieldCheck,
    Search,
    Flame,
    Building2,
    ListFilter,
    Plus,
    Minus,
    Trash2,
    Tag,
    Edit3,
    FileText,
    Percent,
    AlertCircle,
    Check,
    Package,
    Store,
} from 'lucide-react';
import CallCenterLayout from './layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Order Item Interface
interface OrderItem {
    id: string;
    product_id: string;
    name: string;
    variant: string;
    quantity: number;
    unit_price: number;
}

// Available Store Catalog Item for Upsell/Product Addition
interface CatalogProduct {
    id: string;
    name: string;
    variant: string;
    price: number;
    sku: string;
    stock: number;
}

// Full Desk Order Interface
interface DeskOrder {
    id: string;
    store_name: string;
    store_slug: string;
    customer_first_name: string;
    customer_last_name: string;
    customer_phone: string;
    customer_phone_alt?: string;
    wilaya_code: string;
    wilaya_name: string;
    commune: string;
    delivery_type: 'home' | 'stopdesk';
    courier_account: 'yalidine' | 'zr_express' | 'ecotrack';
    delivery_comment: string;
    operator_internal_notes: string;
    items: OrderItem[];
    discount_dzd: number;
    shipping_fee_dzd: number;
    attempt_count: number;
    urgency: 'high' | 'normal' | 'low';
    created_at: string;
}

// 58 Algerian Wilayas definition with fee defaults & communes
interface WilayaConfig {
    code: string;
    name: string;
    home_fee: number;
    stopdesk_fee: number;
    communes: string[];
}

const ALGERIA_WILAYAS: WilayaConfig[] = [
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
];

// Products Available in Store Inventory for quick cross-sell / add item
const STORE_CATALOG_ITEMS: Record<string, CatalogProduct[]> = {
    'DzAvenue Boutique': [
        { id: 'cat-01', name: 'AirPulse Breathable Shoes', variant: 'Size 42 / Red', price: 5900, sku: 'AP-42-RED', stock: 18 },
        { id: 'cat-02', name: 'AirPulse Breathable Shoes', variant: 'Size 43 / Black', price: 5900, sku: 'AP-43-BLK', stock: 14 },
        { id: 'cat-03', name: 'AirPulse Breathable Shoes', variant: 'Size 41 / Navy Blue', price: 5900, sku: 'AP-41-BLU', stock: 9 },
        { id: 'cat-04', name: 'Comfort Performance Insole (Pack 2x)', variant: 'Standard Gel', price: 1200, sku: 'INS-GEL-02', stock: 45 },
        { id: 'cat-05', name: 'Waterproof Sneaker Protector Spray', variant: '250ml Can', price: 1500, sku: 'SPR-WTR-250', stock: 32 },
        { id: 'cat-06', name: 'Athletic Cushioned Ankle Socks (Pack 3x)', variant: 'White / Free size', price: 950, sku: 'SOX-3X-WHT', stock: 60 },
    ],
    'Algeria Sneaker Lab': [
        { id: 'snk-01', name: 'Titan Street Runner', variant: 'Size 42 / Triple White', price: 7400, sku: 'TSR-42-WHT', stock: 12 },
        { id: 'snk-02', name: 'Crease Protector Inserts', variant: 'Universal Mens', price: 800, sku: 'CRS-PRT-01', stock: 50 },
    ],
    'Moda Constantinoise': [
        { id: 'mod-01', name: 'Silk Touch Hijab Pack', variant: 'Taupe + Black', price: 2100, sku: 'STH-2PK', stock: 24 },
        { id: 'mod-02', name: 'Magnetic Hijab Pins Set', variant: 'Matte Gold / Silver', price: 900, sku: 'MAG-PIN-04', stock: 75 },
    ],
};

const INITIAL_DESK_ORDERS: DeskOrder[] = [
    {
        id: 'DZ-91031',
        store_name: 'DzAvenue Boutique',
        store_slug: 'dzavenue',
        customer_first_name: 'Youcef',
        customer_last_name: 'Mahrez',
        customer_phone: '0555 99 88 77',
        customer_phone_alt: '0770 11 22 33',
        wilaya_code: '16',
        wilaya_name: '16 - Alger (Algiers)',
        commune: 'Bab Ezzouar',
        delivery_type: 'home',
        courier_account: 'yalidine',
        delivery_comment: 'Appelez avant 13h00, villa blanche en face du lycée.',
        operator_internal_notes: 'Client confirmed he needs EU size 42. Verified WhatsApp.',
        items: [
            {
                id: 'item-101',
                product_id: 'cat-01',
                name: 'AirPulse Breathable Shoes',
                variant: 'Size 42 / Red',
                quantity: 1,
                unit_price: 5900,
            },
        ],
        discount_dzd: 0,
        shipping_fee_dzd: 400,
        attempt_count: 0,
        urgency: 'high',
        created_at: '12m ago',
    },
    {
        id: 'DZ-91032',
        store_name: 'DzAvenue Boutique',
        store_slug: 'dzavenue',
        customer_first_name: 'Amira',
        customer_last_name: 'Boudiaf',
        customer_phone: '0661 22 33 44',
        customer_phone_alt: '0550 44 55 66',
        wilaya_code: '31',
        wilaya_name: '31 - Oran',
        commune: 'Bir El Djir',
        delivery_type: 'stopdesk',
        courier_account: 'yalidine',
        delivery_comment: 'Récupération au Bureau Yalidine Bir El Djir après 16h.',
        operator_internal_notes: '1st attempt busy tone.',
        items: [
            {
                id: 'item-102',
                product_id: 'cat-04',
                name: 'Comfort Performance Insole (Pack 2x)',
                variant: 'Standard Gel',
                quantity: 2,
                unit_price: 1200,
            },
            {
                id: 'item-103',
                product_id: 'cat-06',
                name: 'Athletic Cushioned Ankle Socks (Pack 3x)',
                variant: 'White / Free size',
                quantity: 1,
                unit_price: 950,
            },
        ],
        discount_dzd: 200,
        shipping_fee_dzd: 350,
        attempt_count: 1,
        urgency: 'normal',
        created_at: '35m ago',
    },
    {
        id: 'DZ-91033',
        store_name: 'Algeria Sneaker Lab',
        store_slug: 'algeria-sneakers',
        customer_first_name: 'Karim',
        customer_last_name: 'Saidi',
        customer_phone: '0772 45 67 89',
        wilaya_code: '25',
        wilaya_name: '25 - Constantine',
        commune: 'Ali Mendjeli',
        delivery_type: 'home',
        courier_account: 'zr_express',
        delivery_comment: 'Batiment 14, Porte 03, Nouvelle Ville Ali Mendjeli.',
        operator_internal_notes: 'Wants expedited delivery if possible.',
        items: [
            {
                id: 'item-104',
                product_id: 'snk-01',
                name: 'Titan Street Runner',
                variant: 'Size 42 / Triple White',
                quantity: 1,
                unit_price: 7400,
            },
        ],
        discount_dzd: 500,
        shipping_fee_dzd: 650,
        attempt_count: 0,
        urgency: 'high',
        created_at: '48m ago',
    },
];

export default function CallCenterDesk() {
    const [orders, setOrders] = useState<DeskOrder[]>(INITIAL_DESK_ORDERS);
    const [selectedOrderId, setSelectedOrderId] = useState<string>(INITIAL_DESK_ORDERS[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    const [callOutcomeFeedback, setCallOutcomeFeedback] = useState<string | null>(null);
    const [showCatalogModal, setShowCatalogModal] = useState(false);

    // Get Active Order
    const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

    // Helper to mutate active order fields
    const updateActiveOrder = (updater: (prev: DeskOrder) => DeskOrder) => {
        setOrders((prevOrders) =>
            prevOrders.map((o) => (o.id === activeOrder.id ? updater(o) : o))
        );
    };

    // Calculate Items Subtotal
    const itemsSubtotal = activeOrder.items.reduce(
        (sum, item) => sum + item.unit_price * item.quantity,
        0
    );

    // Calculate Net Total DZD
    const finalTotalDzd = Math.max(0, itemsSubtotal - activeOrder.discount_dzd + activeOrder.shipping_fee_dzd);

    // Filter queue
    const filteredOrders = orders.filter((o) => {
        const fullTxt = `${o.id} ${o.customer_first_name} ${o.customer_last_name} ${o.customer_phone} ${o.wilaya_name}`.toLowerCase();
        return fullTxt.includes(searchQuery.toLowerCase());
    });

    // Handle Wilaya selection and automatic fee update
    const handleWilayaChange = (wilayaCode: string) => {
        const selectedWilaya = ALGERIA_WILAYAS.find((w) => w.code === wilayaCode);
        if (!selectedWilaya) return;

        const newFee =
            activeOrder.delivery_type === 'home'
                ? selectedWilaya.home_fee
                : selectedWilaya.stopdesk_fee;

        updateActiveOrder((prev) => ({
            ...prev,
            wilaya_code: selectedWilaya.code,
            wilaya_name: selectedWilaya.name,
            commune: selectedWilaya.communes[0] || 'Centre',
            shipping_fee_dzd: newFee,
        }));
    };

    // Handle Delivery Type toggle (Home vs Stopdesk)
    const handleDeliveryTypeChange = (type: 'home' | 'stopdesk') => {
        const currentWilaya = ALGERIA_WILAYAS.find((w) => w.code === activeOrder.wilaya_code);
        const newFee = currentWilaya
            ? type === 'home'
                ? currentWilaya.home_fee
                : currentWilaya.stopdesk_fee
            : activeOrder.shipping_fee_dzd;

        updateActiveOrder((prev) => ({
            ...prev,
            delivery_type: type,
            shipping_fee_dzd: newFee,
        }));
    };

    // Product Quantity Handlers
    const handleUpdateQuantity = (itemId: string, delta: number) => {
        updateActiveOrder((prev) => ({
            ...prev,
            items: prev.items
                .map((item) => {
                    if (item.id === itemId) {
                        const newQty = item.quantity + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : null;
                    }
                    return item;
                })
                .filter(Boolean) as OrderItem[],
        }));
    };

    const handleRemoveItem = (itemId: string) => {
        updateActiveOrder((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== itemId),
        }));
    };

    // Add Product from Store Catalog
    const handleAddCatalogProduct = (product: CatalogProduct) => {
        const existing = activeOrder.items.find((i) => i.product_id === product.id);
        if (existing) {
            handleUpdateQuantity(existing.id, 1);
        } else {
            const newItem: OrderItem = {
                id: `item-${Date.now()}`,
                product_id: product.id,
                name: product.name,
                variant: product.variant,
                quantity: 1,
                unit_price: product.price,
            };
            updateActiveOrder((prev) => ({
                ...prev,
                items: [...prev.items, newItem],
            }));
        }
        setShowCatalogModal(false);
        setCallOutcomeFeedback(`Added "${product.name} (${product.variant})" to order.`);
        setTimeout(() => setCallOutcomeFeedback(null), 3000);
    };

    // Handle Call Action
    const handleAction = (outcome: string) => {
        setCallOutcomeFeedback(`Order ${activeOrder?.id} successfully saved & marked as: ${outcome}`);
        setTimeout(() => setCallOutcomeFeedback(null), 3500);

        const currentIndex = orders.findIndex((o) => o.id === selectedOrderId);
        if (currentIndex < orders.length - 1) {
            setSelectedOrderId(orders[currentIndex + 1].id);
        }
    };

    // Available catalog for current active order's store
    const storeCatalog = STORE_CATALOG_ITEMS[activeOrder.store_name] || STORE_CATALOG_ITEMS['DzAvenue Boutique'];
    const currentWilayaConfig = ALGERIA_WILAYAS.find((w) => w.code === activeOrder.wilaya_code) || ALGERIA_WILAYAS[0];

    return (
        <CallCenterLayout title="Unified Operator Call Desk & Order Editor" activeNav="desk">
            <Head title="Operator Call Desk & Order Editor - Souknet" />

            <div className="space-y-4">
                {callOutcomeFeedback && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center justify-between shadow-xs">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 shrink-0" />
                            <span>{callOutcomeFeedback}</span>
                        </span>
                        <button
                            onClick={() => setCallOutcomeFeedback(null)}
                            className="text-[11px] underline opacity-80 hover:opacity-100"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* 2-Column Split: Queue (4 cols) | Active Order Full Detail Editor (8 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    {/* LEFT COLUMN: Queue Selection */}
                    <div className="lg:col-span-4 space-y-3">
                        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                            <CardHeader className="p-3 pb-2 border-b border-border/80">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <PhoneCall className="size-4 text-emerald-600" />
                                        <CardTitle className="text-sm font-semibold">Dialing Queue</CardTitle>
                                    </div>
                                    <Badge variant="secondary" className="text-xs font-mono">
                                        {filteredOrders.length} Orders
                                    </Badge>
                                </div>
                                <div className="relative mt-2">
                                    <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search customer, phone, ref..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="h-8 pl-8 text-xs"
                                    />
                                </div>
                            </CardHeader>
                            <div className="divide-y divide-border/60 max-h-[calc(100vh-250px)] overflow-y-auto">
                                {filteredOrders.map((order) => {
                                    const isSelected = order.id === activeOrder?.id;
                                    const orderSub = order.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
                                    const orderTot = orderSub - order.discount_dzd + order.shipping_fee_dzd;

                                    return (
                                        <div
                                            key={order.id}
                                            onClick={() => setSelectedOrderId(order.id)}
                                            className={`p-3 cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'bg-primary/10 border-l-4 border-l-primary'
                                                    : 'hover:bg-muted/40'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-mono font-bold text-xs text-foreground">
                                                        {order.id}
                                                    </span>
                                                    <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5 border-border">
                                                        {order.courier_account.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {order.created_at}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-xs font-medium text-foreground">
                                                <span>
                                                    {order.customer_first_name} {order.customer_last_name}
                                                </span>
                                                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                                                    {orderTot.toLocaleString()} DZD
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
                                                <span className="flex items-center gap-1 truncate max-w-[180px]">
                                                    <MapPin className="size-3 shrink-0" />
                                                    {order.wilaya_code} - {order.commune}
                                                </span>
                                                <span className="text-[10px] font-medium text-muted-foreground">
                                                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN: Full Order Detail, Items, Address, Logistics & Total Workspace */}
                    <div className="lg:col-span-8 space-y-4">
                        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
                            {/* Order Header */}
                            <CardHeader className="p-4 border-b border-border/80 bg-muted/20">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-lg font-bold text-foreground">
                                                {activeOrder.id}
                                            </span>
                                            <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/5">
                                                <Store className="size-3 mr-1" />
                                                {activeOrder.store_name}
                                            </Badge>
                                            <Badge variant="secondary" className="text-[11px]">
                                                {activeOrder.delivery_type === 'home' ? 'Home Delivery' : 'Stopdesk'}
                                            </Badge>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-0.5 block">
                                            Assigned COD Order · Received {activeOrder.created_at}
                                        </span>
                                    </div>

                                    {/* Action Call Outcome Buttons */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleAction('Confirmed (Confirmée)')}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 gap-1.5 shadow-xs"
                                        >
                                            <CheckCircle2 className="size-3.5" />
                                            <span>Confirmer</span>
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAction('Unreachable (Injoignable)')}
                                            className="text-amber-600 border-amber-500/40 hover:bg-amber-500/10 text-xs h-8 gap-1"
                                        >
                                            <Clock className="size-3.5" />
                                            <span>Injoignable</span>
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAction('Postponed (Reporté)')}
                                            className="text-blue-600 border-blue-500/40 hover:bg-blue-500/10 text-xs h-8 gap-1"
                                        >
                                            <RotateCcw className="size-3.5" />
                                            <span>Reporté</span>
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAction('Cancelled (Annulée)')}
                                            className="text-rose-600 border-rose-500/40 hover:bg-rose-500/10 text-xs h-8 gap-1"
                                        >
                                            <XCircle className="size-3.5" />
                                            <span>Annuler</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-4 sm:p-5 space-y-6">
                                {/* SECTION 1: Customer Names & Live Phone Dialer */}
                                <div className="p-4 rounded-xl border border-border/80 bg-background/90 space-y-4">
                                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                                        <span className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                            <User className="size-3.5 text-primary" />
                                            Customer Information & Dialer
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`tel:${activeOrder.customer_phone}`}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-xs transition-colors"
                                            >
                                                <PhoneCall className="size-3" />
                                                <span>Call {activeOrder.customer_phone}</span>
                                            </a>
                                            <a
                                                href={`https://wa.me/213${activeOrder.customer_phone.replace(/\D/g, '').slice(-9)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                                                title="Open WhatsApp chat with client"
                                            >
                                                <MessageCircle className="size-3.5" />
                                                <span>WhatsApp</span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Editable First Name & Last Name & Phones */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">First Name</Label>
                                            <Input
                                                value={activeOrder.customer_first_name}
                                                onChange={(e) =>
                                                    updateActiveOrder((prev) => ({
                                                        ...prev,
                                                        customer_first_name: e.target.value,
                                                    }))
                                                }
                                                className="h-8 text-xs font-medium mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Last Name</Label>
                                            <Input
                                                value={activeOrder.customer_last_name}
                                                onChange={(e) =>
                                                    updateActiveOrder((prev) => ({
                                                        ...prev,
                                                        customer_last_name: e.target.value,
                                                    }))
                                                }
                                                className="h-8 text-xs font-medium mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Primary Mobile Phone</Label>
                                            <Input
                                                value={activeOrder.customer_phone}
                                                onChange={(e) =>
                                                    updateActiveOrder((prev) => ({
                                                        ...prev,
                                                        customer_phone: e.target.value,
                                                    }))
                                                }
                                                className="h-8 text-xs font-mono mt-1"
                                                placeholder="0555 00 00 00"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Secondary Backup Phone</Label>
                                            <Input
                                                value={activeOrder.customer_phone_alt || ''}
                                                onChange={(e) =>
                                                    updateActiveOrder((prev) => ({
                                                        ...prev,
                                                        customer_phone_alt: e.target.value,
                                                    }))
                                                }
                                                className="h-8 text-xs font-mono mt-1"
                                                placeholder="0770 00 00 00 (optional)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: Order Items (Products) & Cross-Sell Catalog */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Package className="size-4 text-primary" />
                                            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                                Order Products & Quantities ({activeOrder.items.length})
                                            </span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowCatalogModal(true)}
                                            className="h-7 text-xs gap-1 border-primary/40 text-primary hover:bg-primary/10"
                                        >
                                            <Plus className="size-3.5" />
                                            <span>Add Product from Store</span>
                                        </Button>
                                    </div>

                                    {/* Items Table */}
                                    <div className="rounded-xl border border-border/80 overflow-hidden bg-card/60">
                                        <table className="w-full text-xs text-left">
                                            <thead className="bg-muted/40 border-b border-border/60 text-[10px] uppercase text-muted-foreground font-semibold">
                                                <tr>
                                                    <th className="p-3">Product Name & Variant</th>
                                                    <th className="p-3 text-right">Unit Price</th>
                                                    <th className="p-3 text-center">Quantity</th>
                                                    <th className="p-3 text-right">Total</th>
                                                    <th className="p-3 text-right pr-4">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border/60">
                                                {activeOrder.items.map((item) => (
                                                    <tr key={item.id} className="hover:bg-muted/20">
                                                        <td className="p-3 font-medium text-foreground">
                                                            <div className="font-semibold">{item.name}</div>
                                                            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                                                <Badge variant="outline" className="text-[9px] px-1 py-0 h-4">
                                                                    {item.variant}
                                                                </Badge>
                                                            </div>
                                                        </td>
                                                        <td className="p-3 text-right font-mono text-muted-foreground">
                                                            {item.unit_price.toLocaleString()} DZD
                                                        </td>
                                                        <td className="p-3">
                                                            <div className="flex items-center justify-center gap-1.5">
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() => handleUpdateQuantity(item.id, -1)}
                                                                    className="h-6 w-6 rounded-md"
                                                                >
                                                                    <Minus className="size-3" />
                                                                </Button>
                                                                <span className="font-mono font-bold text-xs w-6 text-center">
                                                                    {item.quantity}
                                                                </span>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() => handleUpdateQuantity(item.id, 1)}
                                                                    className="h-6 w-6 rounded-md"
                                                                >
                                                                    <Plus className="size-3" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                        <td className="p-3 text-right font-mono font-bold text-foreground">
                                                            {(item.unit_price * item.quantity).toLocaleString()} DZD
                                                        </td>
                                                        <td className="p-3 text-right pr-4">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleRemoveItem(item.id)}
                                                                className="h-7 w-7 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                                                                title="Remove item"
                                                            >
                                                                <Trash2 className="size-3.5" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}

                                                {activeOrder.items.length === 0 && (
                                                    <tr>
                                                        <td colSpan={5} className="p-6 text-center text-muted-foreground text-xs">
                                                            No products in this order. Click "Add Product from Store" to add items.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* SECTION 3: Algerian Delivery Configuration (Account, Wilaya, Commune, Type & Comment) */}
                                <div className="p-4 rounded-xl border border-border/80 bg-background/90 space-y-4">
                                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                                        <span className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                            <Truck className="size-3.5 text-primary" />
                                            Delivery Account & Algerian Wilaya / Commune Logistics
                                        </span>
                                        <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted/40 text-xs">
                                            <button
                                                type="button"
                                                onClick={() => handleDeliveryTypeChange('home')}
                                                className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${
                                                    activeOrder.delivery_type === 'home'
                                                        ? 'bg-primary text-primary-foreground shadow-xs'
                                                        : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            >
                                                Home (À domicile)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeliveryTypeChange('stopdesk')}
                                                className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${
                                                    activeOrder.delivery_type === 'stopdesk'
                                                        ? 'bg-primary text-primary-foreground shadow-xs'
                                                        : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            >
                                                Stopdesk (Bureau)
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {/* Delivery Courier Account */}
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Courier Account Provider</Label>
                                            <select
                                                value={activeOrder.courier_account}
                                                onChange={(e) =>
                                                    updateActiveOrder((prev) => ({
                                                        ...prev,
                                                        courier_account: e.target.value as any,
                                                    }))
                                                }
                                                className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground focus:outline-none mt-1"
                                            >
                                                <option value="yalidine">Yalidine Express</option>
                                                <option value="zr_express">ZR Express</option>
                                                <option value="ecotrack">EcoTrack Delivery</option>
                                            </select>
                                        </div>

                                        {/* Wilaya Selection */}
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Wilaya (58 Provinces)</Label>
                                            <select
                                                value={activeOrder.wilaya_code}
                                                onChange={(e) => handleWilayaChange(e.target.value)}
                                                className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground focus:outline-none mt-1"
                                            >
                                                {ALGERIA_WILAYAS.map((w) => (
                                                    <option key={w.code} value={w.code}>
                                                        {w.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Commune Selection */}
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Commune / Municipality</Label>
                                            <select
                                                value={activeOrder.commune}
                                                onChange={(e) =>
                                                    updateActiveOrder((prev) => ({
                                                        ...prev,
                                                        commune: e.target.value,
                                                    }))
                                                }
                                                className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground focus:outline-none mt-1"
                                            >
                                                {currentWilayaConfig.communes.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Delivery Comment for Driver & Operator Internal Notes */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">
                                                Delivery Comment (Printed on Courier Bordereau)
                                            </Label>
                                            <Input
                                                value={activeOrder.delivery_comment}
                                                onChange={(e) =>
                                                    updateActiveOrder((prev) => ({
                                                        ...prev,
                                                        delivery_comment: e.target.value,
                                                    }))
                                                }
                                                placeholder="e.g. Call client before delivery, landmark near mosque..."
                                                className="h-8 text-xs mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">
                                                Operator Internal Notes (Visible to Call Center Team)
                                            </Label>
                                            <Input
                                                value={activeOrder.operator_internal_notes}
                                                onChange={(e) =>
                                                    updateActiveOrder((prev) => ({
                                                        ...prev,
                                                        operator_internal_notes: e.target.value,
                                                    }))
                                                }
                                                placeholder="e.g. Client requested size confirmation, 2nd call attempt..."
                                                className="h-8 text-xs mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 4: Discount & Financial Summary Breakdown */}
                                <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-3">
                                    <span className="text-xs font-semibold text-foreground uppercase tracking-wider block">
                                        Financial Summary & Discount Controls
                                    </span>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Order Discount (DZD)</Label>
                                            <div className="relative mt-1">
                                                <Tag className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    type="number"
                                                    value={activeOrder.discount_dzd || ''}
                                                    onChange={(e) =>
                                                        updateActiveOrder((prev) => ({
                                                            ...prev,
                                                            discount_dzd: Math.max(0, parseInt(e.target.value || '0', 10)),
                                                        }))
                                                    }
                                                    placeholder="0"
                                                    className="h-8 pl-8 text-xs font-mono"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="text-[11px] text-muted-foreground">Shipping Fee (DZD)</Label>
                                            <div className="relative mt-1">
                                                <Truck className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    type="number"
                                                    value={activeOrder.shipping_fee_dzd || ''}
                                                    onChange={(e) =>
                                                        updateActiveOrder((prev) => ({
                                                            ...prev,
                                                            shipping_fee_dzd: Math.max(0, parseInt(e.target.value || '0', 10)),
                                                        }))
                                                    }
                                                    placeholder="400"
                                                    className="h-8 pl-8 text-xs font-mono"
                                                />
                                            </div>
                                        </div>

                                        {/* Financial Breakdown Pill */}
                                        <div className="p-2.5 rounded-lg border border-border bg-background text-xs space-y-1">
                                            <div className="flex justify-between text-muted-foreground">
                                                <span>Items Subtotal:</span>
                                                <span className="font-mono">{itemsSubtotal.toLocaleString()} DZD</span>
                                            </div>
                                            {activeOrder.discount_dzd > 0 && (
                                                <div className="flex justify-between text-rose-600 dark:text-rose-400">
                                                    <span>Discount:</span>
                                                    <span className="font-mono">- {activeOrder.discount_dzd.toLocaleString()} DZD</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-muted-foreground">
                                                <span>Shipping:</span>
                                                <span className="font-mono">+{activeOrder.shipping_fee_dzd.toLocaleString()} DZD</span>
                                            </div>
                                            <div className="pt-1.5 border-t border-border flex justify-between font-bold text-sm text-foreground">
                                                <span>Total to Collect (COD):</span>
                                                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                                                    {finalTotalDzd.toLocaleString()} DZD
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* MODAL: Add Product from Store Catalog */}
                {showCatalogModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                        <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
                            <div className="p-4 border-b border-border flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-sm text-foreground">
                                        Add Product from {activeOrder.store_name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Click to append to customer's order for upselling.
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowCatalogModal(false)}
                                    className="h-8 w-8 text-muted-foreground"
                                >
                                    ✕
                                </Button>
                            </div>

                            <div className="p-4 max-h-96 overflow-y-auto space-y-2">
                                {storeCatalog.map((prod) => (
                                    <div
                                        key={prod.id}
                                        className="p-3 rounded-lg border border-border bg-background hover:bg-muted/40 transition-colors flex items-center justify-between gap-3"
                                    >
                                        <div>
                                            <div className="font-semibold text-xs text-foreground">{prod.name}</div>
                                            <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                                                <Badge variant="outline" className="text-[9px] px-1 py-0">
                                                    {prod.variant}
                                                </Badge>
                                                <span className="font-mono text-[10px]">SKU: {prod.sku}</span>
                                                <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[10px]">
                                                    Stock: {prod.stock}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono font-bold text-xs text-foreground">
                                                {prod.price.toLocaleString()} DZD
                                            </span>
                                            <Button
                                                size="sm"
                                                onClick={() => handleAddCatalogProduct(prod)}
                                                className="h-7 text-xs bg-primary text-primary-foreground gap-1"
                                            >
                                                <Plus className="size-3" />
                                                <span>Add</span>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-3 border-t border-border bg-muted/20 flex justify-end">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowCatalogModal(false)}
                                    className="h-8 text-xs"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CallCenterLayout>
    );
}
