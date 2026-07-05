import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, ShoppingBag, Trash2, ArrowUp, ArrowDown, Move, Settings, Type, Grid, Mail, FileText, Layout, Eye, CheckCircle2, AlertTriangle, ArrowRight, Plus } from 'lucide-react';
import React, { useState } from 'react';
import StoreLayout from '@/layouts/store-layout';
import StoreController from '@/actions/App/Http/Controllers/Owner/StoreController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface StoreProduct {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price_cents: number;
    compare_at_price_cents: number | null;
    image_path: string | null;
    sku: string | null;
    barcode: string | null;
    inventory_quantity: number;
    track_inventory: boolean;
}

interface Block {
    id: string;
    type: 'hero' | 'featured_products' | 'about' | 'newsletter' | 'footer';
    settings: Record<string, any>;
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
    description: string | null;
    theme_settings: {
        primary_color?: string;
        blocks?: Block[];
        product_page?: ProductPageSettings;
    } | null;
    products: StoreProduct[];
}

interface CustomizeProps {
    store: Store;
}

const DEFAULT_BLOCKS: Block[] = [
    {
        id: 'hero-1',
        type: 'hero',
        settings: {
            title: 'Welcome to Our Store',
            subtitle: 'Discover our premium curation of items picked just for you.',
            cta_text: 'Explore Collection',
        },
    },
    {
        id: 'products-1',
        type: 'featured_products',
        settings: {
            title: 'Featured Arrivals',
            limit: 4,
        },
    },
    {
        id: 'about-1',
        type: 'about',
        settings: {
            title: 'Our Journey',
            content: 'We source only the finest goods directly to guarantee unparalleled standards.',
        },
    },
    {
        id: 'newsletter-1',
        type: 'newsletter',
        settings: {
            title: 'Subscribe to Our Newsletter',
            description: 'Get notified immediately on new catalog drops and promotions.',
            button_text: 'Subscribe',
        },
    },
];

const DEFAULT_PRODUCT_PAGE: ProductPageSettings = {
    layout: 'split',
    show_inventory: true,
    show_sku: true,
    show_barcode: true,
    buy_button_text: 'Purchase Now',
};

export default function CustomizeStore({ store }: CustomizeProps) {
    const primaryColor = store.theme_settings?.primary_color || '#4318FF';
    const initialBlocks = store.theme_settings?.blocks || DEFAULT_BLOCKS;
    const initialProductPage = store.theme_settings?.product_page || DEFAULT_PRODUCT_PAGE;

    const [activeTab, setActiveTab] = useState<'home' | 'product'>('home');
    const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
    const [productPage, setProductPage] = useState<ProductPageSettings>(initialProductPage);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
        blocks.length > 0 ? blocks[0].id : null
    );
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const { data, setData, post, processing } = useForm({
        blocks: blocks,
        theme_color: primaryColor,
        product_page: productPage,
    });

    const updateBlocksState = (newBlocks: Block[]) => {
        setBlocks(newBlocks);
        setData('blocks', newBlocks);
    };

    const updateProductPageState = (newSettings: ProductPageSettings) => {
        setProductPage(newSettings);
        setData('product_page', newSettings);
    };

    const handleAddBlock = (type: Block['type']) => {
        const id = `${type}-${Date.now()}`;
        let settings = {};

        switch (type) {
            case 'hero':
                settings = { title: 'New Banner Section', subtitle: 'Subtitle details...', cta_text: 'Buy Now' };
                break;
            case 'featured_products':
                settings = { title: 'New Arrivals', limit: 4 };
                break;
            case 'about':
                settings = { title: 'Who We Are', content: 'Our background story and team values...' };
                break;
            case 'newsletter':
                settings = { title: 'Newsletter Club', description: 'Unlock 10% off on your first order.', button_text: 'Join Now' };
                break;
            case 'footer':
                settings = { copyright: `© ${new Date().getFullYear()} ${store.name}`, info: 'Contact us at contact@store.com' };
                break;
        }

        const newBlock: Block = { id, type, settings };
        const updated = [...blocks, newBlock];
        updateBlocksState(updated);
        setSelectedBlockId(id);
    };

    const handleRemoveBlock = (id: string) => {
        const updated = blocks.filter(b => b.id !== id);
        updateBlocksState(updated);
        if (selectedBlockId === id) {
            setSelectedBlockId(updated.length > 0 ? updated[0].id : null);
        }
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= blocks.length) return;

        const updated = [...blocks];
        const temp = updated[index];
        updated[index] = updated[targetIndex];
        updated[targetIndex] = temp;
        updateBlocksState(updated);
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const updated = [...blocks];
        const draggedItem = updated[draggedIndex];
        updated.splice(draggedIndex, 1);
        updated.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        setBlocks(updated);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setData('blocks', blocks);
    };

    const handleSettingChange = (blockId: string, key: string, value: any) => {
        const updated = blocks.map(b => {
            if (b.id === blockId) {
                return { ...b, settings: { ...b.settings, [key]: value } };
            }
            return b;
        });
        updateBlocksState(updated);
    };

    const handleProductPageChange = (key: keyof ProductPageSettings, value: any) => {
        const updated = { ...productPage, [key]: value };
        updateProductPageState(updated);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        post(StoreController.saveCustomize.url({ id: store.id }));
    };

    const getBlockIcon = (type: Block['type']) => {
        switch (type) {
            case 'hero': return <Type className="h-4 w-4" />;
            case 'featured_products': return <Grid className="h-4 w-4" />;
            case 'about': return <FileText className="h-4 w-4" />;
            case 'newsletter': return <Mail className="h-4 w-4" />;
            default: return <Settings className="h-4 w-4" />;
        }
    };

    const selectedBlock = blocks.find(b => b.id === selectedBlockId);

    // Mock product for page preview
    const mockProduct = store.products[0] || {
        id: 999,
        name: 'Premium Leather Boots',
        description: 'Meticulously crafted boots featuring water-resistant outer lining, memory foam support, and classic aesthetic styling perfect for all occasions.',
        price_cents: 12000,
        compare_at_price_cents: 18000,
        sku: 'BOOTS-001',
        barcode: '9876543210',
        inventory_quantity: 12,
        track_inventory: true,
        image_path: null,
    };

    return (
        <>
            <Head title={`Theme Builder - ${store.name}`} />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] h-screen flex flex-col justify-between overflow-hidden">
                {/* Editor Header */}
                <header className="border-b border-[#262930] bg-[#0c0d12] px-6 h-14 flex items-center justify-between z-20 shrink-0">
                    <div className="flex items-center gap-3">
                        <Link href={`/stores/${store.id}`} className="text-zinc-400 hover:text-white transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div>
                            <span className="text-[10px] font-bold text-[#4318FF] uppercase tracking-wider block leading-none mb-0.5">Store Customizer</span>
                            <span className="text-xs font-bold text-white leading-none">{store.name} Builder</span>
                        </div>
                    </div>

                    {/* Page Tab Selector Toggle */}
                    <div className="flex items-center bg-[#15171e] border border-[#262930] p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('home')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${activeTab === 'home'
                                ? 'bg-[#4318FF] text-white shadow'
                                : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            Home Page
                        </button>
                        <button
                            onClick={() => setActiveTab('product')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${activeTab === 'product'
                                ? 'bg-[#4318FF] text-white shadow'
                                : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            Product Page
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 border border-[#262930] rounded-lg px-2.5 py-1 bg-[#15171e]">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase">Primary Color:</span>
                            <input
                                type="color"
                                value={data.theme_color}
                                onChange={e => {
                                    setData('theme_color', e.target.value);
                                }}
                                className="h-4.5 w-8 rounded cursor-pointer border-0 bg-transparent"
                            />
                        </div>

                        <form onSubmit={handleSave}>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-[#4318FF] hover:bg-[#3b15e6] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-lg"
                            >
                                <Save className="h-3.5 w-3.5" />
                                Save Changes
                            </Button>
                        </form>
                    </div>
                </header>

                {/* Editor Main Section */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Builder Pane */}
                    <div className="w-80 border-r border-[#262930] bg-[#0c0d12] flex flex-col shrink-0 overflow-y-auto">

                        {activeTab === 'home' ? (
                            <>
                                {/* Sections Manager Header */}
                                <div className="p-4 border-b border-[#262930] space-y-3">
                                    <h2 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Add Content Block</h2>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(['hero', 'featured_products', 'about', 'newsletter', 'footer'] as const).map(type => (
                                            <button
                                                key={type}
                                                onClick={() => handleAddBlock(type)}
                                                className="bg-[#15171e] hover:bg-zinc-800 border border-[#262930] text-[10px] text-zinc-350 p-2 rounded-lg flex items-center gap-1.5 font-bold transition-all justify-start"
                                            >
                                                <Plus className="h-3 w-3 text-[#4318FF]" />
                                                {type.replace('_', ' ').toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Blocks Listing Reorder List */}
                                <div className="p-4 border-b border-[#262930] flex-1 overflow-y-auto space-y-2">
                                    <h2 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Layout Order (Drag & Drop)</h2>
                                    {blocks.length === 0 ? (
                                        <div className="text-center py-6 text-xs text-zinc-500">No layout blocks added. Click above to add some content sections!</div>
                                    ) : (
                                        <div className="space-y-2">
                                            {blocks.map((block, idx) => (
                                                <div
                                                    key={block.id}
                                                    draggable
                                                    onDragStart={() => handleDragStart(idx)}
                                                    onDragOver={(e) => handleDragOver(e, idx)}
                                                    onDragEnd={handleDragEnd}
                                                    onClick={() => setSelectedBlockId(block.id)}
                                                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${selectedBlockId === block.id
                                                        ? 'border-[#4318FF] bg-[#4318FF]/5'
                                                        : 'border-[#262930] bg-[#15171e]/50 hover:bg-[#15171e]'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <Move className="h-3.5 w-3.5 text-zinc-500 cursor-grab active:cursor-grabbing shrink-0" />
                                                        <div className="flex items-center gap-1.5 min-w-0">
                                                            <span className="text-zinc-400 shrink-0">{getBlockIcon(block.type)}</span>
                                                            <span className="text-[11px] font-bold text-white capitalize truncate">{block.type.replace('_', ' ')}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1 shrink-0">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); moveBlock(idx, 'up'); }}
                                                            disabled={idx === 0}
                                                            className="p-1 hover:bg-zinc-800 rounded disabled:opacity-20 text-zinc-400 hover:text-white"
                                                        >
                                                            <ArrowUp className="h-3 w-3" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); moveBlock(idx, 'down'); }}
                                                            disabled={idx === blocks.length - 1}
                                                            className="p-1 hover:bg-zinc-800 rounded disabled:opacity-20 text-zinc-400 hover:text-white"
                                                        >
                                                            <ArrowDown className="h-3 w-3" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleRemoveBlock(block.id); }}
                                                            className="p-1 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Selected Block Settings Panel */}
                                <div className="p-4 border-t border-[#262930] bg-[#0c0d12] h-72 overflow-y-auto shrink-0">
                                    {selectedBlock ? (
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                                {getBlockIcon(selectedBlock.type)}
                                                {selectedBlock.type.replace('_', ' ')} Settings
                                            </h3>

                                            {/* Dynamic inputs based on block type */}
                                            {selectedBlock.type === 'hero' && (
                                                <div className="space-y-3 text-xs">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Headline</label>
                                                        <Input
                                                            value={selectedBlock.settings.title || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'title', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs h-8 text-white"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Subtitle</label>
                                                        <Textarea
                                                            value={selectedBlock.settings.subtitle || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'subtitle', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs min-h-[50px] p-2 text-white"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">CTA Button Text</label>
                                                        <Input
                                                            value={selectedBlock.settings.cta_text || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'cta_text', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs h-8 text-white"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {selectedBlock.type === 'featured_products' && (
                                                <div className="space-y-3 text-xs">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Section Title</label>
                                                        <Input
                                                            value={selectedBlock.settings.title || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'title', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs h-8 text-white"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Max Products to Show</label>
                                                        <Input
                                                            type="number"
                                                            value={selectedBlock.settings.limit || 4}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'limit', parseInt(e.target.value))}
                                                            className="bg-[#111111] border-[#262930] text-xs h-8 text-white"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {selectedBlock.type === 'about' && (
                                                <div className="space-y-3 text-xs">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Headline</label>
                                                        <Input
                                                            value={selectedBlock.settings.title || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'title', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs h-8 text-white"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Content</label>
                                                        <Textarea
                                                            value={selectedBlock.settings.content || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'content', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs min-h-[80px] text-white"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {selectedBlock.type === 'newsletter' && (
                                                <div className="space-y-3 text-xs">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Heading</label>
                                                        <Input
                                                            value={selectedBlock.settings.title || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'title', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs h-8 text-white"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Description</label>
                                                        <Input
                                                            value={selectedBlock.settings.description || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'description', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs h-8 text-white"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Submit Button Text</label>
                                                        <Input
                                                            value={selectedBlock.settings.button_text || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'button_text', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs h-8 text-white"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {selectedBlock.type === 'footer' && (
                                                <div className="space-y-3 text-xs">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Copyright Text</label>
                                                        <Input
                                                            value={selectedBlock.settings.copyright || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'copyright', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs h-8 text-white"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase font-bold text-zinc-400">Additional Info</label>
                                                        <Input
                                                            value={selectedBlock.settings.info || ''}
                                                            onChange={e => handleSettingChange(selectedBlock.id, 'info', e.target.value)}
                                                            className="bg-[#111111] border-[#262930] text-xs h-8 text-white"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 text-zinc-500 text-xs font-bold uppercase">No block selected</div>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* Product Page Layout Customization Inputs */
                            <div className="p-4 space-y-5 text-xs">
                                <h2 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                                    <Layout className="h-4 w-4 text-[#4318FF]" />
                                    Product Page Settings
                                </h2>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-zinc-400">Page Layout Grid</label>
                                    <select
                                        value={productPage.layout}
                                        onChange={e => handleProductPageChange('layout', e.target.value as any)}
                                        className="w-full rounded-lg border border-[#262930] bg-[#111111] px-3 py-2 text-xs text-white focus:border-[#4318FF] focus:outline-none"
                                    >
                                        <option value="split">Split Columns (Classic)</option>
                                        <option value="stacked">Stacked Rows (Modern)</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-zinc-400">Buy Button CTA text</label>
                                    <Input
                                        value={productPage.buy_button_text}
                                        onChange={e => handleProductPageChange('buy_button_text', e.target.value)}
                                        className="bg-[#111111] border-[#262930] text-xs text-white"
                                    />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="show_inventory"
                                            checked={productPage.show_inventory}
                                            onChange={e => handleProductPageChange('show_inventory', e.target.checked)}
                                            className="h-4 w-4 bg-[#111111] border-[#262930] text-[#4318FF] rounded"
                                        />
                                        <label htmlFor="show_inventory" className="text-zinc-350 cursor-pointer font-semibold">
                                            Show Inventory Stock Level
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="show_sku"
                                            checked={productPage.show_sku}
                                            onChange={e => handleProductPageChange('show_sku', e.target.checked)}
                                            className="h-4 w-4 bg-[#111111] border-[#262930] text-[#4318FF] rounded"
                                        />
                                        <label htmlFor="show_sku" className="text-zinc-350 cursor-pointer font-semibold">
                                            Show Product SKU
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="show_barcode"
                                            checked={productPage.show_barcode}
                                            onChange={e => handleProductPageChange('show_barcode', e.target.checked)}
                                            className="h-4 w-4 bg-[#111111] border-[#262930] text-[#4318FF] rounded"
                                        />
                                        <label htmlFor="show_barcode" className="text-zinc-350 cursor-pointer font-semibold">
                                            Show Barcode Reference
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Live Preview Pane */}
                    <div className="flex-grow bg-[#15171e] p-6 flex flex-col justify-start overflow-y-auto">
                        <div className="border border-[#262930] rounded-2xl overflow-hidden bg-[#0b0c10] flex-1 flex flex-col text-[#c5c6c7] font-['Outfit'] select-none">
                            {/* Live Storefront Mock Header */}
                            <div className="h-12 border-b border-[#1f2833] bg-[#0b0c10] px-4 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-6 w-6 rounded text-white font-extrabold text-[11px] flex items-center justify-center" style={{ backgroundColor: data.theme_color }}>
                                        {store.name.substring(0, 1).toUpperCase()}
                                    </span>
                                    <span className="text-xs font-black text-white">{store.name}</span>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Live Preview</span>
                            </div>

                            {/* Store Dynamic Render Canvas */}
                            <div className="flex-1 overflow-y-auto p-0 min-h-0 bg-[#0b0c10]">
                                {activeTab === 'home' ? (
                                    /* HOME PAGE PREVIEW */
                                    blocks.length === 0 ? (
                                        <div className="h-full flex items-center justify-center text-xs text-zinc-600">Your storefront layout is empty.</div>
                                    ) : (
                                        <div className="space-y-0">
                                            {blocks.map((block) => {
                                                const settings = block.settings;
                                                return (
                                                    <div key={block.id} className="relative border-b border-[#1f2833]/40 last:border-0">
                                                        {selectedBlockId === block.id && (
                                                            <div className="absolute inset-0 border-2 border-dashed border-[#4318FF] pointer-events-none z-10" />
                                                        )}

                                                        {block.type === 'hero' && (
                                                            <div className="py-12 px-6 text-center bg-[#1f2833]/10">
                                                                <h2 className="text-2xl font-black text-white">{settings.title || 'Headline'}</h2>
                                                                <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto">{settings.subtitle}</p>
                                                                {settings.cta_text && (
                                                                    <button
                                                                        className="mt-4 px-4 py-1.5 text-[11px] font-bold text-black rounded-lg transition-all"
                                                                        style={{ backgroundColor: data.theme_color }}
                                                                    >
                                                                        {settings.cta_text}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}

                                                        {block.type === 'featured_products' && (
                                                            <div className="py-8 px-6 space-y-4">
                                                                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{settings.title || 'Featured Products'}</h3>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    {store.products.slice(0, settings.limit || 2).map(prod => (
                                                                        <div key={prod.id} className="border border-[#1f2833] rounded-xl p-3 bg-[#1f2833]/5 text-left">
                                                                            <div className="aspect-square bg-zinc-950 rounded border border-[#1f2833]/20 flex items-center justify-center text-[10px] text-zinc-700 font-bold mb-2">Image</div>
                                                                            <span className="font-extrabold text-[11px] text-white block truncate">{prod.name}</span>
                                                                            <span className="text-[10px] text-zinc-400 font-bold">${(prod.price_cents / 100).toFixed(2)}</span>
                                                                        </div>
                                                                    ))}
                                                                    {store.products.length === 0 && (
                                                                        <div className="col-span-2 py-4 text-center text-[10px] text-zinc-600 font-bold border border-dashed border-[#1f2833] rounded-xl">Product catalog empty. Add products to preview here.</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {block.type === 'about' && (
                                                            <div className="py-8 px-6 text-center space-y-2">
                                                                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{settings.title}</h3>
                                                                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">{settings.content}</p>
                                                            </div>
                                                        )}

                                                        {block.type === 'newsletter' && (
                                                            <div className="py-8 px-6 text-center bg-[#1f2833]/15 space-y-3">
                                                                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{settings.title}</h3>
                                                                <p className="text-[11px] text-zinc-400">{settings.description}</p>
                                                                <div className="flex gap-2 max-w-xs mx-auto">
                                                                    <input disabled type="email" placeholder="email address" className="bg-zinc-950 border border-[#1f2833] rounded-lg px-2.5 py-1 text-[10px] flex-grow text-white" />
                                                                    <button className="text-[10px] font-bold text-black px-3.5 py-1 rounded-lg" style={{ backgroundColor: data.theme_color }}>{settings.button_text}</button>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {block.type === 'footer' && (
                                                            <div className="py-6 px-4 text-center bg-[#0b0c10] border-t border-[#1f2833]/40 text-[10px] text-zinc-600">
                                                                <p className="font-bold">{settings.copyright}</p>
                                                                {settings.info && <p className="mt-1">{settings.info}</p>}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )
                                ) : (
                                    /* PRODUCT DETAIL PAGE PREVIEW */
                                    <div className="p-6 space-y-6">
                                        <div className="inline-flex items-center gap-1 text-[10px] text-zinc-500">
                                            <ArrowLeft className="h-3 w-3" /> Back to Store
                                        </div>

                                        <div className={`grid gap-6 ${productPage.layout === 'split' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                            {/* Left Column (Image) */}
                                            <div className="aspect-square bg-zinc-950 border border-[#1f2833] rounded-xl flex items-center justify-center text-zinc-700 font-bold text-sm">
                                                Product Image Canvas
                                            </div>

                                            {/* Right Column (Info) */}
                                            <div className="flex flex-col justify-between py-1 space-y-4">
                                                <div className="space-y-3">
                                                    <h2 className="text-lg font-extrabold text-white leading-tight">{mockProduct.name}</h2>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xl font-black text-white">${(mockProduct.price_cents / 100).toFixed(2)}</span>
                                                        <span className="text-xs text-zinc-500 line-through">${(mockProduct.compare_at_price_cents / 100).toFixed(2)}</span>
                                                    </div>

                                                    <div className="border-t border-b border-[#1f2833]/40 py-2.5 space-y-1.5 text-[10px]">
                                                        {productPage.show_inventory && (
                                                            <div className="flex justify-between">
                                                                <span className="text-zinc-500 font-bold uppercase">Stock Level</span>
                                                                <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                                                                    <CheckCircle2 className="h-3 w-3" /> {mockProduct.inventory_quantity} in stock
                                                                </span>
                                                            </div>
                                                        )}
                                                        {productPage.show_sku && (
                                                            <div className="flex justify-between">
                                                                <span className="text-zinc-500 font-bold uppercase">SKU Code</span>
                                                                <span className="font-mono text-zinc-400">{mockProduct.sku}</span>
                                                            </div>
                                                        )}
                                                        {productPage.show_barcode && (
                                                            <div className="flex justify-between">
                                                                <span className="text-zinc-500 font-bold uppercase">Barcode</span>
                                                                <span className="font-mono text-zinc-400">{mockProduct.barcode}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <p className="text-[11px] text-zinc-450 leading-relaxed">{mockProduct.description}</p>
                                                </div>

                                                <button
                                                    className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-black text-black transition-all shadow"
                                                    style={{ backgroundColor: data.theme_color }}
                                                >
                                                    {productPage.buy_button_text}
                                                    <ArrowRight className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

CustomizeStore.layout = (page: React.ReactNode) => (
    <StoreLayout breadcrumbs={[{ title: 'Theme Builder', href: '#' }]}>
        {page}
    </StoreLayout>
);
