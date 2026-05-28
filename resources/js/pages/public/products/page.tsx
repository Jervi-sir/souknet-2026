import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import {
    Search,
    MapPin,
    Sparkles,
    SlidersHorizontal,
    Building2,
    ChevronDown,
    ChevronUp,
    Plus,
    Package,
    Settings,
    Tag,
    Cpu,
    Truck,
    Shield,
    DollarSign,
    Layers,
    ShoppingCart
} from 'lucide-react';

interface Product {
    id: number;
    name: string;
    category: string;
    manufacturer: string;
    origin: string;
    price: string;
    specs: string;
    imageColor: string;
    type: 'machinery' | 'manufacture' | 'small';
}

export default function ProductsDirectory() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState<'all' | 'machinery' | 'manufacture' | 'small'>('all');
    const [expandedFilter, setExpandedFilter] = useState('categories');

    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'CNC Lathe Machine (Heavy Duty)', category: 'Industrial Machinery', manufacturer: 'Algiers Steel Works', origin: 'Algeria', price: 'Request Quote', specs: '380V • 5.5kW • 1500 RPM', imageColor: 'from-slate-700 to-slate-900', type: 'machinery' },
        { id: 2, name: 'Hydraulic Cylinder H-240', category: 'Raw Hydraulics', manufacturer: 'Sider El Hadjar', origin: 'Algeria', price: '$450.00', specs: 'Max 250 Bar • Stroke 400mm', imageColor: 'from-blue-800 to-indigo-950', type: 'manufacture' },
        { id: 3, name: 'Smart Power Sensor S-10', category: 'Micro Electronics', manufacturer: 'Condor Tech', origin: 'Algeria', price: '$24.99', specs: 'Wi-Fi • 16A • Real-time logs', imageColor: 'from-purple-900 to-zinc-950', type: 'small' },
        { id: 4, name: 'Forklift F-30 (Electric)', category: 'Material Handling', manufacturer: 'ENMTP', origin: 'Algeria', price: 'Request Quote', specs: 'Load 3T • Max Lift Height 3m', imageColor: 'from-amber-800 to-amber-950', type: 'machinery' },
        { id: 5, name: 'Stainless Steel Flanges (DN80)', category: 'Piping Components', manufacturer: 'Sider Group', origin: 'Algeria', price: '$85.00', specs: 'PN16 • SUS 316L', imageColor: 'from-stone-700 to-stone-950', type: 'manufacture' },
        { id: 6, name: 'Digital Multimeter D-400', category: 'Handheld Testers', manufacturer: 'Sonelgaz Labs', origin: 'Algeria', price: '$45.00', specs: 'CAT III 600V • True RMS', imageColor: 'from-teal-900 to-zinc-950', type: 'small' }
    ]);

    const filteredProducts = products.filter((p) => {
        const matchesType = selectedType === 'all' || p.type === selectedType;
        const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || p.name.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesSearch =
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesCategory && matchesSearch;
    });

    return (
        <GuestLayout>
            <Head title="Products Directory - Apollo.io Style" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="flex bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-[calc(100vh-48px)]">
                {/* 1. Left Filters Panel Drawer */}
                <aside className="w-64 border-r border-[#262930] bg-[#0c0d12] flex flex-col justify-between shrink-0 select-none">
                    <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                        {/* Category Selector */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'categories' ? '' : 'categories')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <Layers className="h-3.5 w-3.5" />
                                    Categories / Segment
                                </span>
                                {expandedFilter === 'categories' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'categories' && (
                                <div className="px-4 pb-4 space-y-2">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4318FF]"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="machinery">Heavy Machinery</option>
                                        <option value="manufacture">Manufactured Parts</option>
                                        <option value="small">Small Goods</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Technical specifications */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'specs' ? '' : 'specs')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <Cpu className="h-3.5 w-3.5" />
                                    Specifications
                                </span>
                                {expandedFilter === 'specs' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'specs' && (
                                <div className="px-4 pb-4 space-y-2 text-xs text-[#8f9bba]">
                                    <label className="flex items-center gap-2.5 cursor-pointer group">
                                        <input type="checkbox" className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5" />
                                        <span className="group-hover:text-white transition-colors">CE Certified</span>
                                    </label>
                                    <label className="flex items-center gap-2.5 cursor-pointer group">
                                        <input type="checkbox" className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5" />
                                        <span className="group-hover:text-white transition-colors">Custom Specs</span>
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Origin / Supplier */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'supplier' ? '' : 'supplier')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <Truck className="h-3.5 w-3.5" />
                                    Supplier Location
                                </span>
                                {expandedFilter === 'supplier' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'supplier' && (
                                <div className="px-4 pb-4 space-y-2 text-xs text-[#8f9bba]">
                                    <div className="flex items-center gap-2.5">
                                        <MapPin className="h-4 w-4" />
                                        <span>Algeria (Local Stock)</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 border-t border-[#262930] bg-[#0c0d12] flex items-center justify-between text-xs">
                        <button onClick={() => { setSelectedCategory('all'); setSelectedType('all'); setSearchQuery(''); }} className="text-[#8f9bba] hover:text-white font-semibold">Reset filters</button>
                        <button className="bg-[#22252e] hover:bg-[#2c303c] px-3 py-1.5 rounded-lg font-bold text-white transition-colors">Clear all</button>
                    </div>
                </aside>

                {/* 2. Main products explorer area */}
                <main className="flex-1 flex flex-col min-w-0 bg-[#15171e] p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#262930] pb-3">
                        <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                            <Package className="h-5 w-5 text-[#4318FF]" />
                            Explore Products / Machinery
                        </h1>
                        <button className="bg-[#4318FF] hover:bg-[#3b15e6] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5">
                            <Plus className="h-4 w-4" />
                            Register Product
                        </button>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c0d12] rounded-lg border border-[#262930] text-xs font-semibold text-white">
                                    <span>Browse Grid</span>
                                    <ChevronDown className="h-3 w-3" />
                                </div>
                                <form onSubmit={(e) => e.preventDefault()} className="relative w-48 sm:w-64">
                                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#8f9bba]" />
                                    <input
                                        type="text"
                                        placeholder="Search machinery, parts, products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#0c0d12] border border-[#262930] rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF]"
                                    />
                                </form>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-900/20">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    AI Spec Generator
                                </button>
                            </div>
                        </div>

                        {/* Search Statistics Tabbing */}
                        <div className="flex border-b border-[#262930] mt-2">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    selectedType === 'all' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Total Products</span>
                                <span className="bg-[#4318FF]/20 text-[#6AD2FF] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {products.length}
                                </span>
                            </button>
                            <button
                                onClick={() => setSelectedType('machinery')}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    selectedType === 'machinery' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Machinery</span>
                                <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {products.filter(p => p.type === 'machinery').length}
                                </span>
                            </button>
                            <button
                                onClick={() => setSelectedType('manufacture')}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    selectedType === 'manufacture' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Manufactured Goods</span>
                                <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {products.filter(p => p.type === 'manufacture').length}
                                </span>
                            </button>
                            <button
                                onClick={() => setSelectedType('small')}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    selectedType === 'small' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Small / Consumer</span>
                                <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {products.filter(p => p.type === 'small').length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length === 0 ? (
                        <div className="flex-1 bg-[#0c0d12] border border-[#262930] rounded-xl p-12 text-center text-[#8f9bba] flex flex-col items-center justify-center">
                            <Package className="h-10 w-10 text-zinc-650 mb-3" />
                            <h4 className="font-bold text-white text-sm">No Products Found</h4>
                            <p className="text-xs text-[#8f9bba] mt-1 max-w-xs mx-auto">
                                Reset the filters or expand your query keywords.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.map((p) => (
                                <div key={p.id} className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] rounded-xl overflow-hidden flex flex-col justify-between transition-all group">
                                    <div>
                                        {/* Colored Gradient Top Box representing Product type */}
                                        <div className={`h-28 bg-gradient-to-br ${p.imageColor} relative p-3 flex flex-col justify-between border-b border-[#262930]`}>
                                            <span className="bg-black/60 backdrop-blur-md text-[#6AD2FF] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider self-start">
                                                {p.category}
                                            </span>
                                            <Package className="h-8 w-8 text-white/20 self-end" />
                                        </div>

                                        <div className="p-4 space-y-2 text-xs">
                                            <h3 className="font-bold text-white group-hover:text-[#4318FF] transition-colors text-sm truncate">
                                                {p.name}
                                            </h3>
                                            
                                            <div className="text-[#8f9bba] space-y-1">
                                                <div className="flex items-center gap-1.5">
                                                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="font-semibold text-zinc-300">{p.manufacturer}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Cpu className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="truncate">{p.specs}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Action Footer */}
                                    <div className="px-4 pb-4 pt-2.5 border-t border-[#262930]/40 flex items-center justify-between text-xs">
                                        <span className="font-bold text-white text-xs">{p.price}</span>
                                        <button className="px-3.5 py-1.5 bg-[#c6f052] hover:bg-[#b5dc43] text-black font-black rounded-lg transition-colors flex items-center gap-1">
                                            <ShoppingCart className="h-3.5 w-3.5" />
                                            Request Quote
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </GuestLayout>
    );
}
