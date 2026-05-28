import { OwnerSidebar } from '@/components/owner-sidebar';
import type { AppLayoutProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { Bell } from 'lucide-react';

export default function OwnerLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-[#15171e] text-zinc-100 antialiased selection:bg-[#4318FF] selection:text-white flex flex-col md:flex-row">
            {/* Owner Sidebar (Desktop) */}
            <OwnerSidebar />

            {/* Right side: Top Header + Main Content Dashboard Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#15171e]">
                {/* Header */}
                <header className="h-12 border-b border-[#262930] bg-[#0c0d12] sticky top-0 z-30 flex items-center justify-between px-6">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1.5 text-xs text-[#8f9bba]">
                        <Link href="/owner/dashboard" className="hover:text-white transition-colors text-[11px] font-semibold">Console</Link>
                        {breadcrumbs.map((bc, idx) => (
                            <React.Fragment key={idx}>
                                <span className="text-[10px] text-zinc-600">&gt;</span>
                                <Link href={bc.href} className="hover:text-white transition-colors text-[11px] font-semibold">{bc.title}</Link>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-[#8f9bba] hover:text-white cursor-pointer transition-colors" />
                        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-[#4318FF] to-[#6AD2FF] text-white flex items-center justify-center font-bold text-[10px] shadow-sm select-none">
                            GA
                        </div>
                    </div>
                </header>

                {/* Main Workspace Canvas */}
                <main className="flex-1 relative overflow-y-auto bg-[#15171e]">
                    {children}
                </main>
            </div>
        </div>
    );
}
