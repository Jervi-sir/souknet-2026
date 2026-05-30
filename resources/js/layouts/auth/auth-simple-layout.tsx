import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="dark flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-[#0c0d12] via-[#15171e] to-[#0c0d12] text-zinc-100 p-6 md:p-10 select-none relative overflow-hidden">
            {/* Glowing background details */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[#4318FF]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-sm bg-[#0c0d12]/80 backdrop-blur-2xl border border-[#262930] rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-zinc-800">
                {/* Glowing radial accent */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-[#4318FF]/15 blur-[60px] rounded-full pointer-events-none" />

                <div className="flex flex-col gap-6 relative z-10">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={'/'}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-[#4318FF] text-white shadow-md shadow-indigo-500/20 text-xs font-black">
                                S
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-1.5 text-center">
                            <h1 className="text-xl font-extrabold text-white tracking-tight">{title}</h1>
                            <p className="text-center text-xs text-[#8f9bba]">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
