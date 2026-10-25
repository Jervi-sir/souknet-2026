import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Tags,
    Boxes,
    Truck,
    RotateCcw,
    DollarSign,
    BarChart3,
    Percent,
    Palette,
    Globe,
    Settings,
    CreditCard,
    Building2,
    ChevronDown,
    Check,
    Plus,
    Sun,
    Moon,
    Bell,
    ExternalLink,
    Search,
    Menu,
    X,
    PhoneCall,
    SlidersHorizontal,
    Users,
    Puzzle,
    Layers,
    Radio,
    Calendar,
    Printer,
    MessageCircle,
    Activity,
    Receipt,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Organization {
    id: string;
    name: string;
    plan: string;
    stores: Array<{
        id: string;
        name: string;
        slug: string;
        is_active: boolean;
    }>;
}

const MOCK_ORGANIZATION: Organization = {
    id: 'org_1',
    name: 'Atlas Commerce Group',
    plan: 'Pro Scale (DZD)',
    stores: [
        { id: 'store_1', name: 'DzAvenue Boutique', slug: 'dzavenue', is_active: true },
        { id: 'store_2', name: 'Algeria Sneaker Lab', slug: 'sneakerlab', is_active: false },
        { id: 'store_3', name: 'Dar El Caftan Premium', slug: 'caftan-dz', is_active: false },
    ],
};

interface StoreMerchantLayoutProps {
    children: React.ReactNode;
    title?: string;
    activeNav?: string;
    currentStoreName?: string;
}

export default function StoreMerchantLayout({
    children,
    title = 'Store Management',
    activeNav = 'dashboard',
    currentStoreName = 'DzAvenue Boutique',
}: StoreMerchantLayoutProps) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState(currentStoreName);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const NAV_SECTIONS = [
        {
            label: 'Store Management',
            items: [
                {
                    key: 'dashboard',
                    label: 'Dashboard Overview',
                    href: '/store-merchant/dashboard',
                    icon: LayoutDashboard,
                },
                {
                    key: 'orders',
                    label: 'Orders (COD)',
                    href: '/store-merchant/orders',
                    icon: ShoppingCart,
                    badge: '18 New',
                },
                {
                    key: 'products',
                    label: 'Products Catalog',
                    href: '/store-merchant/products',
                    icon: Package,
                },
                {
                    key: 'categories',
                    label: 'Categories & Packs',
                    href: '/store-merchant/categories',
                    icon: Tags,
                },
                {
                    key: 'customers',
                    label: 'Customers (COD)',
                    href: '/store-merchant/customers',
                    icon: Users,
                },
                {
                    key: 'inventory',
                    label: 'Stock & Inventory',
                    href: '/store-merchant/inventory',
                    icon: Boxes,
                },
            ],
        },
        {
            label: 'COD & Logistics',
            items: [
                {
                    key: 'shipping',
                    label: 'Courier Accounts (58 Wilayas)',
                    href: '/store-merchant/shipping',
                    icon: Truck,
                    note: 'Yalidine / ZR Express',
                },
                {
                    key: 'shipping-labels',
                    label: 'Bordereaux & Manifests',
                    href: '/store-merchant/shipping-labels',
                    icon: Printer,
                    badge: '100x150',
                },
                {
                    key: 'dispatch-planner',
                    label: 'Dispatch & Route Planner',
                    href: '/store-merchant/dispatch-planner',
                    icon: Calendar,
                    badge: 'Timeline',
                },
                {
                    key: 'webhooks',
                    label: 'Courier API Webhooks',
                    href: '/store-merchant/webhooks',
                    icon: Activity,
                    badge: 'Live',
                },
                {
                    key: 'returns',
                    label: 'Returns & Exchanges (Retour)',
                    href: '/store-merchant/returns',
                    icon: RotateCcw,
                    badge: '3 Pending',
                },
                {
                    key: 'settlements',
                    label: 'COD Cash Settlements (Versements)',
                    href: '/store-merchant/settlements',
                    icon: DollarSign,
                },
            ],
        },
        {
            label: 'Growth & Storefront',
            items: [
                {
                    key: 'analytics',
                    label: 'Sales & Conversion Analytics',
                    href: '/store-merchant/analytics',
                    icon: BarChart3,
                },
                {
                    key: 'campaigns',
                    label: 'Ads Campaign Performance',
                    href: '/store-merchant/campaigns',
                    icon: Radio,
                    badge: 'ROAS 5.0x',
                },
                {
                    key: 'notifications',
                    label: 'WhatsApp Automation',
                    href: '/store-merchant/notifications',
                    icon: MessageCircle,
                    badge: 'Cloud API',
                },
                {
                    key: 'discounts',
                    label: 'Coupons & Bundles',
                    href: '/store-merchant/discounts',
                    icon: Percent,
                },
                {
                    key: 'storefront-theme',
                    label: 'Storefront Customizer',
                    href: '/store-merchant/theme',
                    icon: Palette,
                },
                {
                    key: 'apps',
                    label: 'Apps & Couriers API',
                    href: '/store-merchant/apps',
                    icon: Puzzle,
                },
                {
                    key: 'domain',
                    label: 'Custom Domain (.dz / .com)',
                    href: '/store-merchant/domain',
                    icon: Globe,
                },
            ],
        },
        {
            label: 'Organization & Workspace',
            items: [
                {
                    key: 'workspace',
                    label: 'Organization Overview',
                    href: '/store-merchant/workspace-overview',
                    icon: Layers,
                },
                {
                    key: 'my-stores',
                    label: 'Switch Store / Create New',
                    href: '/store-merchant/my-stores',
                    icon: Building2,
                },
                {
                    key: 'team',
                    label: 'Team & Call Agents',
                    href: '/store-merchant/team',
                    icon: Users,
                },
                {
                    key: 'billing',
                    label: 'Plan & Billing (DZD)',
                    href: '/store-merchant/billing',
                    icon: CreditCard,
                },
                {
                    key: 'invoices',
                    label: 'Fiscal Invoices & Receipts',
                    href: '/store-merchant/invoices',
                    icon: Receipt,
                    badge: 'TVA 19%',
                },
                {
                    key: 'settings',
                    label: 'Store Settings',
                    href: '/store-merchant/settings',
                    icon: Settings,
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen flex bg-background text-foreground antialiased font-sans selection:bg-primary selection:text-primary-foreground">
            {/* Desktop Left Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-border/80 bg-card/60 backdrop-blur-md">
                {/* Organization & Store Switcher Header */}
                <div className="p-4 border-b border-border/80 relative">
                    <button
                        type="button"
                        onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
                        className="w-full flex items-center justify-between p-2 rounded-xl border border-border/80 bg-background hover:bg-muted/50 transition-colors text-left"
                    >
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                                {selectedStore.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <span className="font-semibold text-xs tracking-tight text-foreground truncate block">
                                    {selectedStore}
                                </span>
                                <span className="text-[10px] text-muted-foreground truncate block">
                                    {MOCK_ORGANIZATION.name}
                                </span>
                            </div>
                        </div>
                        <ChevronDown className="size-4 text-muted-foreground shrink-0 ml-1" />
                    </button>

                    {/* Switcher Dropdown */}
                    {storeDropdownOpen && (
                        <div className="absolute top-16 left-4 right-4 z-50 rounded-xl border border-border bg-card shadow-xl p-2 space-y-1 animate-in zoom-in-95 duration-100">
                            <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                Stores in this Organization
                            </div>
                            {MOCK_ORGANIZATION.stores.map((store) => (
                                <button
                                    key={store.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedStore(store.name);
                                        setStoreDropdownOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-muted text-left transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="size-5 rounded-md bg-muted flex items-center justify-center text-[10px] font-bold">
                                            {store.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-foreground">{store.name}</span>
                                    </div>
                                    {selectedStore === store.name && (
                                        <Check className="size-3.5 text-primary" />
                                    )}
                                </button>
                            ))}
                            <div className="pt-1 border-t border-border mt-1">
                                <Link
                                    href="/organization/select"
                                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-primary font-medium hover:bg-primary/10 transition-colors"
                                >
                                    <Plus className="size-3.5" />
                                    <span>Create or Switch Organization</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
                    {NAV_SECTIONS.map((section) => (
                        <div key={section.label} className="space-y-1">
                            <div className="px-3 text-[10px] font-semibold text-muted-foreground/80 uppercase tracking-wider">
                                {section.label}
                            </div>
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeNav === item.key;
                                return (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive
                                                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Icon
                                                className={`size-4 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                                                    }`}
                                            />
                                            <span>{item.label}</span>
                                        </div>

                                        {item.badge && (
                                            <Badge
                                                variant={isActive ? 'secondary' : 'default'}
                                                className="text-[10px] px-1.5 py-0 h-4 rounded-md"
                                            >
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Store Live Link & Quick Status */}
                <div className="p-3 border-t border-border/80 bg-muted/20 space-y-2">
                    <a
                        href="/storefront"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg border border-border/80 bg-background text-xs font-medium hover:border-primary transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <span className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>View Live Storefront</span>
                        </span>
                        <ExternalLink className="size-3.5" />
                    </a>
                </div>
            </aside>

            {/* Main Application Column */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar Header */}
                <header className="h-16 border-b border-border/80 bg-background/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
                        >
                            <Menu className="size-5" />
                        </Button>
                        <div>
                            <h2 className="text-sm font-semibold tracking-tight text-foreground">
                                {title}
                            </h2>
                            <span className="text-[11px] text-muted-foreground hidden sm:block">
                                Algerian Cash-on-Delivery Merchant Hub
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Search in Store */}
                        <div className="relative hidden md:block w-64">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                            <Input
                                placeholder="Search order ID, phone, customer..."
                                className="pl-8 h-8 text-xs bg-muted/40"
                            />
                        </div>

                        {/* Quick Direct Link to Call Center Confirmation Queue */}
                        <Link href="/call-center/order-confirmation">
                            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-medium">
                                <PhoneCall className="size-3.5 text-emerald-600" />
                                <span className="hidden sm:inline">Call Center Desk</span>
                            </Button>
                        </Link>

                        {/* Notification Bell */}
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground relative">
                            <Bell className="size-4" />
                            <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500" />
                        </Button>

                        {/* Dark/Light Mode Switcher */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                            title="Toggle Appearance"
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="size-4 text-amber-400" />
                            ) : (
                                <Moon className="size-4 text-slate-700" />
                            )}
                        </Button>
                    </div>
                </header>

                {/* Mobile Drawer Sidebar */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 flex">
                        <div
                            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="relative w-72 max-w-[85%] bg-card border-r border-border p-4 flex flex-col h-full z-10 space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-border">
                                <span className="font-bold text-sm tracking-tight">{selectedStore}</span>
                                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="h-8 w-8">
                                    <X className="size-4" />
                                </Button>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-4">
                                {NAV_SECTIONS.map((section) => (
                                    <div key={section.label} className="space-y-1">
                                        <div className="px-2 text-[10px] font-semibold text-muted-foreground uppercase">
                                            {section.label}
                                        </div>
                                        {section.items.map((item) => (
                                            <Link
                                                key={item.key}
                                                href={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium ${activeNav === item.key
                                                        ? 'bg-primary text-primary-foreground font-semibold'
                                                        : 'text-muted-foreground hover:bg-muted'
                                                    }`}
                                            >
                                                <span>{item.label}</span>
                                                {item.badge && <Badge variant="secondary" className="text-[10px]">{item.badge}</Badge>}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-muted/10 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
