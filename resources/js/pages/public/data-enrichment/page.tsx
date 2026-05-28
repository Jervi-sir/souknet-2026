import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import {
    Database,
    Upload,
    Mail,
    Phone,
    Building2,
    Users,
    Check,
    ArrowRight,
    TrendingUp,
    FileText,
    Sparkles,
    RefreshCw,
    Download,
    Play,
    AlertCircle,
    MapPin,
    Globe
} from 'lucide-react';

interface EnrichedRecord {
    id: number;
    input: string;
    name: string;
    company: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    status: 'pending' | 'success' | 'failed';
}

export default function DataEnrichment() {
    const [enrichType, setEnrichType] = useState<'contacts' | 'companies'>('contacts');
    const [pasteData, setPasteData] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const [records, setRecords] = useState<EnrichedRecord[]>([
        { id: 1, input: 'farhan@laravel.com', name: 'Farhan Yozbashi', company: 'Laravel', title: 'Developer', email: 'farhan@laravel.com', phone: '+90 532 ••• ••••', location: 'Turkey', status: 'pending' },
        { id: 2, input: 'google.com', name: 'Sundar Pichai', company: 'Google', title: 'CEO', email: 'sundar@google.com', phone: '+1 650 ••• ••••', location: 'California, USA', status: 'pending' },
        { id: 3, input: 'jay@laravel.com', name: 'Jay Yadav', company: 'Laravel', title: 'Software Engineer', email: 'jay@laravel.com', phone: '+91 987 ••• ••••', location: 'India', status: 'pending' }
    ]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setPasteData('');
        }
    };

    const startEnrichment = () => {
        setIsProcessing(true);
        setProgress(0);
        setShowResults(true);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsProcessing(false);
                    setRecords(prevRecs => 
                        prevRecs.map(rec => ({ ...rec, status: 'success' }))
                    );
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const handleReset = () => {
        setShowResults(false);
        setIsProcessing(false);
        setProgress(0);
        setFileName(null);
        setPasteData('');
        setRecords(prev => prev.map(r => ({ ...r, status: 'pending' })));
    };

    return (
        <GuestLayout>
            <Head title="Data Enrichment Console - Apollo.io Style" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-[calc(100vh-48px)] p-6 space-y-6">
                
                {/* Header */}
                <div className="border-b border-[#262930] pb-5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full bg-[#4318FF] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#6AD2FF] tracking-wider uppercase">Apollo Intelligence Suite</span>
                    </div>
                    <h1 className="text-xl font-extrabold text-white tracking-tight">
                        Data Enrichment
                    </h1>
                    <p className="text-xs text-[#8f9bba] mt-0.5">
                        Upload CSV files or paste emails/domains to instantly append missing details like name, company size, revenue, direct dials, and verified emails.
                    </p>
                </div>

                {/* Main Content Split Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Setup / Controls Panel */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-5 space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">Enrichment Settings</h2>
                            
                            {/* Type toggles */}
                            <div className="flex bg-[#15171e] p-0.5 rounded-lg border border-[#262930]">
                                <button
                                    onClick={() => setEnrichType('contacts')}
                                    className={`flex-1 text-[11px] font-bold py-1.5 rounded-md transition-all ${
                                        enrichType === 'contacts' ? 'bg-[#22252e] text-white' : 'text-[#8f9bba]'
                                    }`}
                                >
                                    Enrich Contacts
                                </button>
                                <button
                                    onClick={() => setEnrichType('companies')}
                                    className={`flex-1 text-[11px] font-bold py-1.5 rounded-md transition-all ${
                                        enrichType === 'companies' ? 'bg-[#22252e] text-white' : 'text-[#8f9bba]'
                                    }`}
                                >
                                    Enrich Companies
                                </button>
                            </div>

                            {/* Drag & Drop Upload Zone */}
                            <div className="border-2 border-dashed border-[#262930] hover:border-[#4318FF] rounded-xl p-6 text-center cursor-pointer transition-colors relative group">
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <Upload className="h-8 w-8 text-[#8f9bba] mx-auto mb-2.5 group-hover:text-white transition-colors" />
                                <span className="block text-xs font-bold text-white">
                                    {fileName ? fileName : 'Select CSV file to upload'}
                                </span>
                                <span className="block text-[10px] text-[#8f9bba] mt-1">
                                    Drag and drop your file here or click to browse
                                </span>
                            </div>

                            {/* Divider OR */}
                            <div className="flex items-center justify-between text-[10px] text-zinc-600 font-bold uppercase">
                                <div className="h-[1px] bg-[#262930] flex-1" />
                                <span className="px-3">or paste items</span>
                                <div className="h-[1px] bg-[#262930] flex-1" />
                            </div>

                            {/* Paste text area */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-[#8f9bba] font-bold uppercase">Paste list ({enrichType === 'contacts' ? 'Emails' : 'Domains'})</label>
                                <textarea
                                    rows={4}
                                    placeholder={enrichType === 'contacts' ? 'farhan@laravel.com\njay@laravel.com' : 'laravel.com\ngoogle.com'}
                                    value={pasteData}
                                    onChange={(e) => {
                                        setPasteData(e.target.value);
                                        setFileName(null);
                                    }}
                                    className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2.5 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-[#4318FF] resize-none"
                                />
                            </div>

                            {/* Credits Info */}
                            <div className="bg-[#15171e] p-3 rounded-lg border border-[#262930] flex items-center justify-between text-xs">
                                <span className="text-[#8f9bba]">Enrichment Credits available</span>
                                <span className="font-bold text-white">4,850</span>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={startEnrichment}
                                disabled={isProcessing || (!fileName && !pasteData.trim())}
                                className="w-full py-2 bg-[#c6f052] hover:bg-[#b5dc43] disabled:bg-[#22252e] disabled:text-[#8f9bba] text-black font-black text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                            >
                                <Sparkles className="h-4 w-4" />
                                Run Enrichment
                            </button>
                        </div>
                    </div>

                    {/* Results / Preview Pane */}
                    <div className="lg:col-span-2 space-y-4">
                        
                        {/* Simulation Progress bar */}
                        {isProcessing && (
                            <div className="bg-[#0c0d12] border border-[#262930] rounded-xl p-4 space-y-2">
                                <div className="flex justify-between items-center text-xs font-bold text-[#8f9bba]">
                                    <span className="flex items-center gap-1.5">
                                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                        Enriching profiles...
                                    </span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#15171e] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#4318FF] transition-all duration-300" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        )}

                        {/* Enrichment Results Card */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden flex flex-col justify-between min-h-[300px]">
                            
                            {/* Card Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#262930] bg-[#0c0d12]/50">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8f9bba]">Enrichment Results</h3>
                                {showResults && !isProcessing && (
                                    <div className="flex items-center gap-2">
                                        <button className="px-2.5 py-1.5 bg-[#15171e] border border-[#262930] hover:bg-[#22252e] text-[10px] font-bold rounded-lg text-white transition-colors flex items-center gap-1">
                                            <Download className="h-3 w-3" />
                                            Export CSV
                                        </button>
                                        <button onClick={handleReset} className="px-2.5 py-1.5 bg-[#15171e] border border-[#262930] hover:bg-[#22252e] text-[10px] font-bold rounded-lg text-white transition-colors">
                                            Clear
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Table List */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-[11px]">
                                    <thead>
                                        <tr className="border-b border-[#262930] bg-[#15171e]/50 text-[#8f9bba]">
                                            <th className="p-3 font-semibold">Input Query</th>
                                            <th className="p-3 font-semibold">Match Status</th>
                                            <th className="p-3 font-semibold">Enriched Name</th>
                                            <th className="p-3 font-semibold">Title</th>
                                            <th className="p-3 font-semibold">Verified Email</th>
                                            <th className="p-3 font-semibold">Direct Phone</th>
                                            <th className="p-3 font-semibold">Location</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#262930] text-zinc-100">
                                        {!showResults ? (
                                            <tr>
                                                <td colSpan={7} className="p-12 text-center text-[#8f9bba] space-y-2">
                                                    <Database className="h-10 w-10 text-zinc-650 mx-auto mb-3" />
                                                    <h4 className="font-bold text-white text-xs">No Data Loaded</h4>
                                                    <p className="text-[10px] text-[#8f9bba] max-w-xs mx-auto">
                                                        Upload a CSV file or paste inputs on the left column to run database enrichment.
                                                    </p>
                                                </td>
                                            </tr>
                                        ) : (
                                            records.map((rec) => (
                                                <tr key={rec.id} className="hover:bg-[#15171e]/40 transition-colors">
                                                    <td className="p-3 font-semibold text-[#8f9bba]">{rec.input}</td>
                                                    <td className="p-3">
                                                        {rec.status === 'pending' ? (
                                                            <span className="inline-flex items-center gap-1 text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded text-[9px]">
                                                                Pending
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-[#10b981] font-bold bg-[#10b981]/10 px-2 py-0.5 rounded text-[9px]">
                                                                <Check className="h-3 w-3" /> Match
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-3 font-bold text-white">{rec.status === 'success' ? rec.name : '—'}</td>
                                                    <td className="p-3 text-zinc-400">{rec.status === 'success' ? rec.title : '—'}</td>
                                                    <td className="p-3 text-[#6AD2FF] font-semibold">{rec.status === 'success' ? rec.email : '—'}</td>
                                                    <td className="p-3 text-zinc-350">{rec.status === 'success' ? rec.phone : '—'}</td>
                                                    <td className="p-3 text-zinc-400 flex items-center gap-1">
                                                        {rec.status === 'success' && <MapPin className="h-3 w-3 text-[#8f9bba]" />}
                                                        {rec.status === 'success' ? rec.location : '—'}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination footer */}
                            {showResults && (
                                <div className="border-t border-[#262930] bg-[#15171e]/30 px-4 py-3 flex items-center justify-between text-[10px] text-[#8f9bba]">
                                    <span>Showing 1-3 of 3 results</span>
                                    <span>Credits spent: <strong className="text-white">3 credits</strong></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
