import { Head, Link } from '@inertiajs/react';
import { ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import React from 'react';

interface StoreProduct {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price_cents: number;
    compare_at_price_cents: number | null;
    image_path: string | null;
}

interface Block {
    id: string;
    type: 'hero' | 'featured_products' | 'about' | 'newsletter' | 'footer';
    settings: Record<string, any>;
}

interface Store {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    domain: string | null;
    theme_settings: {
        primary_color?: string;
        blocks?: Block[];
    } | null;
}

interface PublicStoreShowProps {
    store: Store;
    products: StoreProduct[];
}

export default function PublicStoreShow({ store, products }: PublicStoreShowProps) {
    const primaryColor = store.theme_settings?.primary_color || '#4318FF';
    const blocks = store.theme_settings?.blocks || [];

    // Fallback default structure if no block customization is set up
    const hasCustomBlocks = blocks.length > 0;

    return (
        <>
            <Head title={store.name} />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#0b0c10] text-[#c5c6c7] font-['Outfit',_sans-serif] min-h-screen flex flex-col justify-between selection:bg-[#4318FF] selection:text-white">
                {/* Navbar */}
                <header className="border-b border-[#1f2833] bg-[#0b0c10]/95 backdrop-blur sticky top-0 z-40">
                    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                        <Link href={`/store/${store.slug}`} className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-extrabold text-sm shadow-md" style={{ backgroundColor: primaryColor }}>
                                {store.name.substring(0, 1).toUpperCase()}
                            </span>
                            <span className="text-white font-extrabold text-lg tracking-tight">{store.name}</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#1f2833] text-zinc-350">
                                Storefront
                            </span>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="flex-grow">
                    {hasCustomBlocks ? (
                        <div className="space-y-0">
                            {blocks.map((block) => {
                                const settings = block.settings;
                                switch (block.type) {
                                    case 'hero':
                                        return (
                                            <section key={block.id} className="py-20 px-6 text-center bg-[#1f2833]/15 border-b border-[#1f2833]/30">
                                                <div className="max-w-3xl mx-auto space-y-4">
                                                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                                        {settings.title || 'Welcome'}
                                                    </h1>
                                                    {settings.subtitle && (
                                                        <p className="text-sm md:text-base text-zinc-400 max-w-lg mx-auto">
                                                            {settings.subtitle}
                                                        </p>
                                                    )}
                                                    {settings.cta_text && (
                                                        <button
                                                            className="mt-6 px-6 py-2.5 text-xs font-black text-black rounded-xl transition-all hover:brightness-110 shadow-lg"
                                                            style={{ backgroundColor: primaryColor }}
                                                        >
                                                            {settings.cta_text}
                                                        </button>
                                                    )}
                                                </div>
                                            </section>
                                        );

                                    case 'featured_products':
                                        const limit = settings.limit || 4;
                                        const featured = products.slice(0, limit);
                                        return (
                                            <section key={block.id} className="max-w-6xl w-full mx-auto px-6 py-12 space-y-6">
                                                <div className="flex items-center justify-between border-b border-[#1f2833] pb-3">
                                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                                        <ShoppingBag className="h-5 w-5" style={{ color: primaryColor }} />
                                                        {settings.title || 'Featured Collection'}
                                                    </h2>
                                                </div>
                                                {featured.length === 0 ? (
                                                    <div className="py-12 text-center text-xs text-zinc-500 bg-[#1f2833]/5 border border-[#1f2833]/40 rounded-xl">No items in inventory.</div>
                                                ) : (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                                        {featured.map((product) => (
                                                            <div
                                                                key={product.id}
                                                                className="bg-[#1f2833]/15 border border-[#1f2833] hover:border-[#1f2833]/80 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all"
                                                            >
                                                                <div className="p-4 space-y-3">
                                                                    <div className="aspect-square w-full rounded-xl overflow-hidden bg-zinc-950 border border-[#1f2833]/30 relative">
                                                                        {product.image_path ? (
                                                                            <img
                                                                                src={product.image_path}
                                                                                alt={product.name}
                                                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                            />
                                                                        ) : (
                                                                            <div className="h-full w-full flex items-center justify-center text-zinc-650 font-black text-xl">
                                                                                {product.name.substring(0, 2).toUpperCase()}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <h3 className="font-extrabold text-sm text-white line-clamp-1">{product.name}</h3>
                                                                        {product.description && (
                                                                            <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{product.description}</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="p-4 border-t border-[#1f2833]/40 bg-[#1f2833]/10 flex items-center justify-between">
                                                                    <div>
                                                                        <span className="text-sm font-black text-white">${(product.price_cents / 100).toFixed(2)}</span>
                                                                    </div>
                                                                    <Link
                                                                        href={`/store/${store.slug}/products/${product.slug}`}
                                                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-white transition-all px-3 py-1.5 rounded-lg"
                                                                        style={{ backgroundColor: primaryColor }}
                                                                    >
                                                                        Details
                                                                        <ArrowRight className="h-3 w-3" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </section>
                                        );

                                    case 'about':
                                        return (
                                            <section key={block.id} className="max-w-3xl w-full mx-auto px-6 py-16 text-center space-y-4">
                                                <h2 className="text-2xl font-extrabold text-white">{settings.title || 'About Us'}</h2>
                                                <p className="text-sm text-zinc-400 leading-relaxed">{settings.content}</p>
                                            </section>
                                        );

                                    case 'newsletter':
                                        return (
                                            <section key={block.id} className="bg-[#1f2833]/10 border-t border-b border-[#1f2833] py-16 px-6">
                                                <div className="max-w-md mx-auto text-center space-y-4">
                                                    <h3 className="text-xl font-extrabold text-white">{settings.title || 'Subscribe'}</h3>
                                                    <p className="text-xs text-zinc-400">{settings.description}</p>
                                                    <form onSubmit={e => e.preventDefault()} className="flex gap-2 max-w-sm mx-auto">
                                                        <input type="email" placeholder="Your Email Address" className="bg-zinc-950 border border-[#1f2833] rounded-xl px-4 py-2 text-xs flex-grow text-white focus:outline-none focus:border-[#4318FF]" />
                                                        <button className="text-xs font-black text-black px-5 py-2.5 rounded-xl" style={{ backgroundColor: primaryColor }}>
                                                            {settings.button_text || 'Join'}
                                                        </button>
                                                    </form>
                                                </div>
                                            </section>
                                        );

                                    case 'footer':
                                        return (
                                            <footer key={block.id} className="bg-[#0b0c10] border-t border-[#1f2833] py-10 px-6 text-center text-xs text-zinc-500 space-y-2">
                                                <p className="font-bold text-zinc-400">{settings.copyright}</p>
                                                {settings.info && <p>{settings.info}</p>}
                                            </footer>
                                        );

                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    ) : (
                        // Standard default storefront listing fallback
                        <div className="max-w-6xl w-full mx-auto px-6 py-12 space-y-12">
                            <section className="text-center py-12 bg-[#1f2833]/10 border border-[#1f2833]/40 rounded-3xl">
                                <h1 className="text-3xl md:text-5xl font-black text-white">{store.name}</h1>
                                <p className="text-sm text-zinc-400 mt-2">{store.description || 'Welcome to our online store.'}</p>
                            </section>

                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#1f2833] pb-3">
                                    <ShoppingBag className="h-5 w-5" style={{ color: primaryColor }} />
                                    Products
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {products.map((product) => (
                                        <div key={product.id} className="bg-[#1f2833]/15 border border-[#1f2833] hover:border-[#1f2833]/80 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all">
                                            <div className="p-4 space-y-3">
                                                <div className="aspect-square w-full rounded-xl overflow-hidden bg-zinc-950 border border-[#1f2833]/30 relative animate-fade">
                                                    {product.image_path ? (
                                                        <img src={product.image_path} alt={product.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-zinc-700 font-bold">{product.name.substring(0, 1)}</div>
                                                    )}
                                                </div>
                                                <h3 className="font-bold text-sm text-white">{product.name}</h3>
                                            </div>
                                            <div className="p-4 border-t border-[#1f2833]/40 flex items-center justify-between">
                                                <span className="text-sm font-black text-white">${(product.price_cents / 100).toFixed(2)}</span>
                                                <Link href={`/store/${store.slug}/products/${product.slug}`} className="text-xs font-bold px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: primaryColor }}>
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Render fallback footer only if no custom visual footer block is defined */}
                {!hasCustomBlocks && (
                    <footer className="border-t border-[#1f2833] bg-[#0b0c10] py-8 text-center text-xs text-zinc-500 shrink-0">
                        <p>© {new Date().getFullYear()} {store.name}. Powered by SoukNet.</p>
                    </footer>
                )}
            </div>
        </>
    );
}
