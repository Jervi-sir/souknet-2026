import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import React from 'react';

interface StoreProduct {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price_cents: number;
    compare_at_price_cents: number | null;
    sku: string | null;
    barcode: string | null;
    inventory_quantity: number;
    track_inventory: boolean;
    image_path: string | null;
}

interface ProductPageSettings {
    layout: 'split' | 'stacked';
    show_inventory: boolean;
    show_sku: boolean;
    show_barcode: boolean;
    buy_button_text: string;
}

interface Store {
    id: number;
    name: string;
    slug: string;
    theme_settings: {
        primary_color?: string;
        product_page?: ProductPageSettings;
    } | null;
}

interface PublicProductProps {
    store: Store;
    product: StoreProduct;
}

const DEFAULT_PRODUCT_PAGE: ProductPageSettings = {
    layout: 'split',
    show_inventory: true,
    show_sku: true,
    show_barcode: true,
    buy_button_text: 'Purchase Now',
};

export default function PublicProduct({ store, product }: PublicProductProps) {
    const primaryColor = store.theme_settings?.primary_color || '#4318FF';
    const productPage = store.theme_settings?.product_page || DEFAULT_PRODUCT_PAGE;

    const inStock = !product.track_inventory || product.inventory_quantity > 0;

    return (
        <>
            <Head title={`${product.name} - ${store.name}`} />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#0b0c10] text-[#c5c6c7] font-['Outfit',_sans-serif] min-h-screen flex flex-col justify-between selection:bg-[#4318FF] selection:text-white">
                {/* Navbar */}
                <header className="border-b border-[#1f2833] bg-[#0b0c10]/95 backdrop-blur sticky top-0 z-40">
                    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                        <Link href={`/store/${store.slug}`} className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-extrabold text-sm" style={{ backgroundColor: primaryColor }}>
                                {store.name.substring(0, 1).toUpperCase()}
                            </span>
                            <span className="text-white font-extrabold text-lg tracking-tight">{store.name}</span>
                        </Link>
                    </div>
                </header>

                {/* Main Content Container */}
                <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-12 space-y-6">
                    <div>
                        <Link
                            href={`/store/${store.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            Back to Storefront
                        </Link>
                    </div>

                    <div className="bg-[#1f2833]/10 border border-[#1f2833] rounded-3xl p-6 md:p-10">
                        <div className={`grid gap-12 ${productPage.layout === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
                            {/* Image Panel */}
                            <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-[#1f2833]/30 flex items-center justify-center relative">
                                {product.image_path ? (
                                    <img
                                        src={product.image_path}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="text-zinc-700 font-black text-6xl">
                                        {product.name.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Details Panel */}
                            <div className="flex flex-col justify-between py-2 space-y-6">
                                <div className="space-y-4">
                                    <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                                        {product.name}
                                    </h1>

                                    <div className="flex items-baseline gap-3">
                                        <span className="text-3xl font-black text-white">${(product.price_cents / 100).toFixed(2)}</span>
                                        {product.compare_at_price_cents && (
                                            <span className="text-sm text-zinc-500 line-through">
                                                ${(product.compare_at_price_cents / 100).toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="border-t border-b border-[#1f2833]/60 py-4 space-y-2 text-xs">
                                        {productPage.show_inventory && (
                                            <div className="flex justify-between">
                                                <span className="text-zinc-500 font-bold uppercase tracking-wider">Availability</span>
                                                {inStock ? (
                                                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className="text-rose-400 font-bold flex items-center gap-1">
                                                        <AlertTriangle className="h-3.5 w-3.5" />
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {productPage.show_sku && product.sku && (
                                            <div className="flex justify-between">
                                                <span className="text-zinc-500 font-bold uppercase tracking-wider">SKU Code</span>
                                                <span className="font-mono text-zinc-400">{product.sku}</span>
                                            </div>
                                        )}
                                        {productPage.show_barcode && product.barcode && (
                                            <div className="flex justify-between">
                                                <span className="text-zinc-500 font-bold uppercase tracking-wider">Barcode</span>
                                                <span className="font-mono text-zinc-400">{product.barcode}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Description</h3>
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            {product.description || 'No detailed description available for this item.'}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    disabled={!inStock}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black text-black transition-all shadow-lg hover:brightness-110 disabled:brightness-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    {inStock ? productPage.buy_button_text : 'Out of Stock'}
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-[#1f2833] bg-[#0b0c10] py-8 text-center text-xs text-zinc-500">
                    <p>© {new Date().getFullYear()} {store.name}. Powered by SoukNet Storefronts.</p>
                </footer>
            </div>
        </>
    );
}
