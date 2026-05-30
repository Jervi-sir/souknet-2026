import { Head, Link } from '@inertiajs/react';
import { Globe, Sparkles, ArrowLeft } from 'lucide-react';
import React from 'react';
import GuestLayout from '@/layouts/guest-layout';

export default function WebsiteVisitors() {
    return (
        <GuestLayout>
            <Head>
                <title>Website Visitors - Coming Soon</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)] bg-[#15171e] text-white p-6 relative overflow-hidden font-['Inter',_sans-serif]">
                {/* Glowing background details */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-[#4318FF]/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-md w-full text-center relative z-10 space-y-6">
                    {/* Icon Container with glowing effect */}
                    <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-gradient-to-br from-[#22252e] to-[#0c0d12] border border-[#262930] shadow-2xl relative group transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-[#4318FF]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Globe className="h-10 w-10 text-cyan-400 relative z-10 animate-[spin_12s_linear_infinite]" />
                    </div>

                    <div className="space-y-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 animate-pulse">
                            <Sparkles className="h-3 w-3" />
                            Inbound Suite
                        </span>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-['Outfit',_sans-serif]">
                            Website Visitors
                        </h1>
                        <p className="text-sm text-[#8f9bba] max-w-sm mx-auto leading-relaxed">
                            Identify anonymous accounts visiting your website, enrich their profiles, and turn visitors into pipeline. Coming soon to SoukNet.
                        </p>
                    </div>

                    {/* Interaction element */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#22252e] hover:bg-[#2c303c] border border-[#262930] text-xs font-bold text-white transition-all hover:translate-x-[-2px]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Link>
                        <button
                            onClick={() => alert('Thanks for your interest! We will notify you when Website Visitors launches.')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-[#4318FF] hover:from-cyan-500 hover:to-[#5028ff] text-xs font-bold text-white shadow-lg shadow-indigo-950/50 hover:shadow-indigo-500/10 transition-all hover:translate-y-[-1px]"
                        >
                            Notify Me
                        </button>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
