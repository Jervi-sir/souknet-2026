import { Head } from '@inertiajs/react';
import {
    Mail,
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Plus,
    MoreHorizontal,
    Send,
    Edit2,
    Trash2,
    CheckCircle,
    Clock,
    FileText,
    Inbox,
    Paperclip,
    Eye,
    X,
    AlertCircle
} from 'lucide-react';
import React, { useState } from 'react';
import GuestLayout from '@/layouts/guest-layout';

interface SavedEmail {
    id: number;
    recipientName: string;
    recipientEmail: string;
    subject: string;
    body: string;
    status: 'sent' | 'draft' | 'scheduled' | 'failed';
    date: string;
}

export default function SavedEmails() {
    const [activeTab, setActiveTab] = useState<'all' | 'drafts' | 'sent' | 'scheduled'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    
    // Compose Form fields
    const [toEmail, setToEmail] = useState('');
    const [toName, setToName] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const [emails, setEmails] = useState<SavedEmail[]>([
        { id: 1, recipientName: 'Farhan Yozbashi', recipientEmail: 'farhan@laravel.com', subject: 'Inquiry regarding Laravel architecture service', body: 'Hi Farhan, I would like to schedule a consult...', status: 'sent', date: 'May 28, 2026 10:15 AM' },
        { id: 2, recipientName: 'Jay Yadav', recipientEmail: 'jay@laravel.com', subject: 'Collaboration offer: SoukNet directory platform', body: 'Hey Jay, let\'s explore mutual listings integration...', status: 'draft', date: 'May 27, 2026 04:30 PM' },
        { id: 3, recipientName: 'Sundar Pichai', recipientEmail: 'sundar@google.com', subject: 'API Partner Agreement proposal', body: 'Dear Sundar, we are looking forward to verifying cloud credentials...', status: 'scheduled', date: 'May 29, 2026 09:00 AM' }
    ]);

    const handleSendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!toEmail || !subject) {
return;
}

        const newEmail: SavedEmail = {
            id: Date.now(),
            recipientName: toName || toEmail.split('@')[0],
            recipientEmail: toEmail,
            subject,
            body,
            status: 'sent',
            date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        };

        setEmails([newEmail, ...emails]);
        setIsComposeOpen(false);
        setToEmail('');
        setToName('');
        setSubject('');
        setBody('');
    };

    const toggleRow = (id: number) => {
        setSelectedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const selectAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const newSelected: Record<number, boolean> = {};

        if (checked) {
            filteredEmails.forEach(em => {
                newSelected[em.id] = true;
            });
        }

        setSelectedRows(newSelected);
    };

    const filteredEmails = emails.filter(em => {
        const matchesTab = activeTab === 'all' || em.status === activeTab;
        const matchesSearch = 
            em.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            em.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            em.subject.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const allSelected = filteredEmails.length > 0 && filteredEmails.every(em => selectedRows[em.id]);

    const getStatusBadge = (status: SavedEmail['status']) => {
        switch (status) {
            case 'sent':
                return (
                    <span className="inline-flex items-center gap-1 text-[#10b981] font-bold bg-[#10b981]/10 px-2 py-0.5 rounded text-[9px]">
                        <CheckCircle className="h-3 w-3" /> Sent
                    </span>
                );
            case 'draft':
                return (
                    <span className="inline-flex items-center gap-1 text-[#8f9bba] font-bold bg-[#22252e] px-2 py-0.5 rounded text-[9px]">
                        <FileText className="h-3 w-3" /> Draft
                    </span>
                );
            case 'scheduled':
                return (
                    <span className="inline-flex items-center gap-1 text-[#6AD2FF] font-bold bg-[#6AD2FF]/10 px-2 py-0.5 rounded text-[9px]">
                        <Clock className="h-3 w-3" /> Scheduled
                    </span>
                );
            case 'failed':
                return (
                    <span className="inline-flex items-center gap-1 text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded text-[9px]">
                        <AlertCircle className="h-3 w-3" /> Failed
                    </span>
                );
        }
    };

    return (
        <GuestLayout>
            <Head title="Saved Emails - Apollo.io Style" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-[calc(100vh-48px)] p-6 space-y-6 relative">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#262930] pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#10b981] tracking-wider uppercase">Outbox Console</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight">
                            Saved Emails
                        </h1>
                        <p className="text-xs text-[#8f9bba] mt-0.5">
                            Manage communication threads, drafts, sent responses, and templates for directory contacts.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsComposeOpen(true)}
                        className="bg-[#4318FF] hover:bg-[#3b15e6] text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg"
                    >
                        <Plus className="h-4 w-4" />
                        Compose Email
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c0d12] rounded-lg border border-[#262930] text-xs font-semibold text-white">
                                <span>Views</span>
                                <ChevronDown className="h-3 w-3" />
                            </div>
                            
                            <form onSubmit={(e) => e.preventDefault()} className="relative w-48 sm:w-64">
                                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#8f9bba]" />
                                <input
                                    type="text"
                                    placeholder="Search recipient or subject..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#0c0d12] border border-[#262930] rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF]"
                                />
                            </form>
                        </div>

                        {/* Credits available stats */}
                        <div className="bg-[#0c0d12] border border-[#262930] rounded-lg px-3.5 py-1.5 text-xs text-[#8f9bba]">
                            Direct Email Credits: <strong className="text-white">1,240 / month</strong>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-[#262930] mt-2">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                activeTab === 'all' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                            }`}
                        >
                            <span>All Emails</span>
                            <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                {emails.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('drafts')}
                            className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                activeTab === 'drafts' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                            }`}
                        >
                            <span>Drafts</span>
                            <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                {emails.filter(e => e.status === 'draft').length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('sent')}
                            className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                activeTab === 'sent' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                            }`}
                        >
                            <span>Sent</span>
                            <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                {emails.filter(e => e.status === 'sent').length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('scheduled')}
                            className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                activeTab === 'scheduled' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                            }`}
                        >
                            <span>Scheduled</span>
                            <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                {emails.filter(e => e.status === 'scheduled').length}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Table list card */}
                <div className="bg-[#0c0d12] border border-[#262930] rounded-xl overflow-hidden flex flex-col justify-between min-h-[350px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs select-none">
                            <thead>
                                <tr className="border-b border-[#262930] bg-[#15171e]/50 text-[#8f9bba]">
                                    <th className="p-3 w-10">
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            onChange={selectAllRows}
                                            className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                                        />
                                    </th>
                                    <th className="p-3 font-semibold">Recipient</th>
                                    <th className="p-3 font-semibold">Subject</th>
                                    <th className="p-3 font-semibold">Body Preview</th>
                                    <th className="p-3 font-semibold">Status</th>
                                    <th className="p-3 font-semibold">Date</th>
                                    <th className="p-3 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262930] text-zinc-100">
                                {filteredEmails.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-12 text-center text-[#8f9bba] space-y-2">
                                            <Inbox className="h-10 w-10 text-zinc-650 mx-auto mb-3" />
                                            <h4 className="font-bold text-white text-xs">No Emails Found</h4>
                                            <p className="text-[10px] text-[#8f9bba] max-w-xs mx-auto">
                                                Compose a new outbound message or select a different category filter.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredEmails.map((em) => {
                                        const isSelected = !!selectedRows[em.id];

                                        return (
                                            <tr key={em.id} className={`hover:bg-[#15171e]/40 transition-colors ${isSelected ? 'bg-[#4318FF]/5' : ''}`}>
                                                <td className="p-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleRow(em.id)}
                                                        className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                                                    />
                                                </td>
                                                <td className="p-3 font-bold text-white">
                                                    <div>
                                                        <span>{em.recipientName}</span>
                                                        <span className="block text-[10px] text-[#8f9bba] font-normal">{em.recipientEmail}</span>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-[#6AD2FF] font-semibold">{em.subject}</td>
                                                <td className="p-3 text-zinc-400 line-clamp-1 max-w-[200px]">{em.body}</td>
                                                <td className="p-3">{getStatusBadge(em.status)}</td>
                                                <td className="p-3 text-[#8f9bba]">{em.date}</td>
                                                <td className="p-3 text-right">
                                                    <MoreHorizontal className="h-4 w-4 text-[#8f9bba] hover:text-white cursor-pointer transition-colors" />
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination footer */}
                    {filteredEmails.length > 0 && (
                        <div className="border-t border-[#262930] bg-[#15171e]/30 px-4 py-3 flex items-center justify-between text-[10px] text-[#8f9bba]">
                            <span>Showing {filteredEmails.length} of {emails.length} total messages</span>
                            <div className="flex gap-2">
                                <button className="h-7 w-7 bg-[#15171e] border border-[#262930] rounded flex items-center justify-center text-zinc-500 cursor-not-allowed">
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                </button>
                                <button className="h-7 w-7 bg-[#15171e] border border-[#262930] rounded flex items-center justify-center text-zinc-500 cursor-not-allowed">
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Interactive Compose Email Modal */}
                {isComposeOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-[#0c0d12] border border-[#262930] w-full max-w-lg rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between">
                            
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#262930]">
                                <span className="text-xs font-bold uppercase tracking-wider text-white">Compose Message</span>
                                <button onClick={() => setIsComposeOpen(false)} className="text-[#8f9bba] hover:text-white">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSendEmail} className="p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-[#8f9bba] font-bold uppercase">To Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={toEmail}
                                            onChange={(e) => setToEmail(e.target.value)}
                                            placeholder="recipient@domain.com"
                                            className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4318FF]"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-[#8f9bba] font-bold uppercase">Recipient Name</label>
                                        <input
                                            type="text"
                                            value={toName}
                                            onChange={(e) => setToName(e.target.value)}
                                            placeholder="Farhan Yozbashi"
                                            className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4318FF]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] text-[#8f9bba] font-bold uppercase">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Enter subject header..."
                                        className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4318FF]"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] text-[#8f9bba] font-bold uppercase">Message Body</label>
                                    <textarea
                                        rows={6}
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        placeholder="Write your email details here..."
                                        className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#4318FF] resize-none"
                                    />
                                </div>

                                {/* Modal Footer */}
                                <div className="flex items-center justify-between pt-2 border-t border-[#262930]/40">
                                    <div className="flex items-center gap-2">
                                        <Paperclip className="h-4 w-4 text-[#8f9bba] cursor-pointer hover:text-white" />
                                        <span className="text-[10px] text-[#8f9bba]">Attach listings, contacts, or documents</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsComposeOpen(false)}
                                            className="px-3 py-1.5 bg-[#15171e] hover:bg-[#22252e] text-xs font-bold rounded-lg text-white"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-3.5 py-1.5 bg-[#4318FF] hover:bg-[#3b15e6] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                                        >
                                            <Send className="h-3.5 w-3.5" />
                                            Send Credit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
