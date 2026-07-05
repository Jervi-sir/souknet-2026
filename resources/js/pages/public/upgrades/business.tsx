import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import GuestLayout from '@/layouts/guest-layout';
import { Building2, CheckCircle, Clock, XCircle, ArrowLeft } from 'lucide-react';
import UpgradeController from '@/actions/App/Http/Controllers/Upgrade/UpgradeController';

interface UpgradeRequest {
    id: number;
    role_code: string;
    status: string;
    message: string | null;
    rejection_reason: string | null;
    created_at: string;
}

interface PageProps {
    userRole: {
        id: number;
        code: string;
        en: string;
    } | null;
    latestRequest: UpgradeRequest | null;
}

export default function BecomeBusiness({ userRole, latestRequest }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(UpgradeController.storeBusiness.url());
    };

    const isUpgraded = userRole && (userRole.code === 'business_owner' || userRole.code === 'admin');

    return (
        <GuestLayout>
            <Head title="Become a Business - SoukNet" />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <div className="max-w-xl mx-auto px-6 py-12 font-['Outfit',_sans-serif] text-zinc-100 min-h-[calc(100vh-6rem)] flex flex-col justify-center">

                {isUpgraded && (
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-2xl p-8 text-center space-y-6 shadow-2xl">
                        <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="h-10 w-10" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-extrabold text-white">Already Registered Business</h2>
                            <p className="text-sm text-[#8f9bba]">
                                Your account currently has the <strong className="text-white font-bold">{userRole?.en}</strong> role. You can access the owner console to manage your listings.
                            </p>
                        </div>
                        <a
                            href="/dashboard"
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors"
                        >
                            Go to Console
                        </a>
                    </div>
                )}

                {!isUpgraded && latestRequest && latestRequest.status === 'pending' && (
                    <div className="bg-[#0c0d12] border border-[#262930] rounded-2xl p-8 text-center space-y-6 shadow-2xl">
                        <div className="h-16 w-16 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                            <Clock className="h-10 w-10" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-extrabold text-white">Request Pending</h2>
                            <p className="text-sm text-[#8f9bba]">
                                Your request to become a Business Owner is currently being reviewed by our administrators.
                            </p>
                            <p className="text-xs text-zinc-550 pt-2">
                                Submitted on {new Date(latestRequest.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <a
                            href="/"
                            className="inline-flex items-center gap-1.5 text-xs text-[#8f9bba] hover:text-white transition-colors justify-center"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" /> Return Home
                        </a>
                    </div>
                )}

                {!isUpgraded && (!latestRequest || latestRequest.status !== 'pending') && (
                    <div className="space-y-8">
                        {latestRequest && latestRequest.status === 'rejected' && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 text-xs">
                                <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-red-400">Previous Request Declined</h4>
                                    <p className="text-zinc-400 mt-0.5">
                                        Your request was declined: <em className="text-zinc-300 font-medium">"{latestRequest.rejection_reason}"</em>
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 text-center md:text-left">
                            <div className="flex items-center gap-2 justify-center md:justify-start text-[#4318FF]">
                                <Building2 className="h-5 w-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">Merchant Portal</span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight">Become a Business</h1>
                            <p className="text-xs md:text-sm text-[#8f9bba] font-light">
                                Claim your company profile, moderate and respond to user reviews, and access listing performance metrics.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-[#0c0d12] border border-[#262930] rounded-2xl p-6 space-y-4 shadow-xl">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-[#8f9bba] uppercase tracking-wider">
                                    Introduce your company details
                                </label>
                                <textarea
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    placeholder="Enter your company description, active trade registry info, registry code, and primary business address..."
                                    rows={5}
                                    maxLength={1000}
                                    className="w-full text-xs bg-[#15171e] border border-[#262930] rounded-xl p-3 text-zinc-100 placeholder-zinc-550 focus:outline-none focus:border-[#4318FF] transition-colors"
                                    required
                                />
                                {errors.message && <div className="text-xs text-red-500">{errors.message}</div>}
                                {errors.error && <div className="text-xs text-red-500 font-bold">{errors.error}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 rounded-xl bg-[#c6f052] hover:bg-[#b5dc43] text-black font-black text-xs transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
