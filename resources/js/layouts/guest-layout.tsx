import { Link, usePage } from '@inertiajs/react';
import { login, register } from '@/routes';
import React from 'react';

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-[#0A0A0A] font-sans text-zinc-100 antialiased selection:bg-[#6366F1] selection:text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-[#1F1F1F] bg-[#0A0A0A]/85 backdrop-blur-md">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Left: Brand Logo */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-bold tracking-tight text-white hover:opacity-90"
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded bg-[#6366F1] text-xs font-black text-white">
                                S
                            </span>
                            <span>SoukNet</span>
                        </Link>
                    </div>

                    {/* Right: Auth / Actions */}
                    <nav className="flex items-center gap-4">
                        {auth?.user ? (
                            <Link
                                href={''}
                                className="rounded-md border border-[#1F1F1F] bg-[#111111] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-xs font-medium text-zinc-400 transition-colors hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="rounded-md bg-[#6366F1] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#5053df]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t border-[#1F1F1F] bg-[#0A0A0A] py-12 text-center text-xs text-zinc-500">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p>
                        © {new Date().getFullYear()} SoukNet. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
