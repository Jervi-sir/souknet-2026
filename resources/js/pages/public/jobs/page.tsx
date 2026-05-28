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
    Briefcase,
    Calendar,
    Clock,
    DollarSign,
    Layers,
    UserCheck,
    Check,
    Bookmark
} from 'lucide-react';

interface JobPost {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
    postedDate: string;
    tags: string[];
    experience: 'entry' | 'mid' | 'senior';
}

export default function JobsDirectory() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExp, setSelectedExp] = useState('all');
    const [selectedType, setSelectedType] = useState<'all' | 'Full-time' | 'Part-time' | 'Contract' | 'Remote'>('all');
    const [expandedFilter, setExpandedFilter] = useState('categories');
    const [savedJobs, setSavedJobs] = useState<Record<number, boolean>>({});

    const [jobs, setJobs] = useState<JobPost[]>([
        { id: 1, title: 'Senior Laravel Developer', company: 'SoukNet Labs', location: 'Algiers, Algeria (Hybrid)', salary: '$1,500 - $2,500 / month', type: 'Full-time', postedDate: '2 hours ago', tags: ['PHP', 'Laravel', 'React', 'Inertia'], experience: 'senior' },
        { id: 2, title: 'Front-End Engineer (React)', company: 'Condor Electronics', location: 'Bordj Bou Arreridj, Algeria', salary: '$1,000 - $1,800 / month', type: 'Full-time', postedDate: '1 day ago', tags: ['React', 'TypeScript', 'Tailwind'], experience: 'mid' },
        { id: 3, title: 'Full Stack Web Developer', company: 'Yassir', location: 'Algiers, Algeria (Remote)', salary: 'Request Range', type: 'Remote', postedDate: '3 days ago', tags: ['Node.js', 'React', 'PostgreSQL'], experience: 'mid' },
        { id: 4, title: 'Junior QA Engineer', company: 'TemTem', location: 'Algiers, Algeria', salary: '$600 - $900 / month', type: 'Full-time', postedDate: '5 days ago', tags: ['Cypress', 'Automation', 'QA'], experience: 'entry' },
        { id: 5, title: 'DevOps & Cloud Architect', company: 'Djezzy', location: 'Algeria (Remote)', salary: 'Request Range', type: 'Contract', postedDate: '1 week ago', tags: ['AWS', 'Docker', 'Kubernetes'], experience: 'senior' }
    ]);

    const toggleSaveJob = (id: number) => {
        setSavedJobs(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const filteredJobs = jobs.filter((j) => {
        const matchesType = selectedType === 'all' || j.type === selectedType;
        const matchesExp = selectedExp === 'all' || j.experience === selectedExp;
        const matchesSearch =
            j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesType && matchesExp && matchesSearch;
    });

    return (
        <GuestLayout>
            <Head title="Jobs Directory - Apollo.io Style" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="flex bg-[#15171e] text-white font-['Inter',_sans-serif] min-h-[calc(100vh-48px)]">
                {/* 1. Left Filters Panel Drawer */}
                <aside className="w-64 border-r border-[#262930] bg-[#0c0d12] flex flex-col justify-between shrink-0 select-none">
                    <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                        {/* Experience Level Selector */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'experience' ? '' : 'experience')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <Layers className="h-3.5 w-3.5" />
                                    Experience Level
                                </span>
                                {expandedFilter === 'experience' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'experience' && (
                                <div className="px-4 pb-4 space-y-2">
                                    <select
                                        value={selectedExp}
                                        onChange={(e) => setSelectedExp(e.target.value)}
                                        className="w-full bg-[#15171e] border border-[#262930] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4318FF]"
                                    >
                                        <option value="all">All Experience Levels</option>
                                        <option value="entry">Entry Level</option>
                                        <option value="mid">Mid Level</option>
                                        <option value="senior">Senior Level</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Job Location Spec */}
                        <div className="border-b border-[#262930]">
                            <button
                                onClick={() => setExpandedFilter(expandedFilter === 'location' ? '' : 'location')}
                                className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#a3aed0] hover:text-white"
                            >
                                <span className="flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5" />
                                    Job Location
                                </span>
                                {expandedFilter === 'location' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {expandedFilter === 'location' && (
                                <div className="px-4 pb-4 space-y-2 text-xs text-[#8f9bba]">
                                    <label className="flex items-center gap-2.5 cursor-pointer group">
                                        <input type="checkbox" defaultChecked className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5" />
                                        <span className="group-hover:text-white transition-colors">Algeria (Local)</span>
                                    </label>
                                    <label className="flex items-center gap-2.5 cursor-pointer group">
                                        <input type="checkbox" className="rounded border-[#262930] bg-[#15171e] text-[#4318FF] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5" />
                                        <span className="group-hover:text-white transition-colors">International / Remote</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 border-t border-[#262930] bg-[#0c0d12] flex items-center justify-between text-xs">
                        <button onClick={() => { setSelectedExp('all'); setSelectedType('all'); setSearchQuery(''); }} className="text-[#8f9bba] hover:text-white font-semibold">Reset filters</button>
                        <button className="bg-[#22252e] hover:bg-[#2c303c] px-3 py-1.5 rounded-lg font-bold text-white transition-colors">Clear all</button>
                    </div>
                </aside>

                {/* 2. Main jobs explorer area */}
                <main className="flex-1 flex flex-col min-w-0 bg-[#15171e] p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#262930] pb-3">
                        <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-[#4318FF]" />
                            Explore Job Postings
                        </h1>
                        <button className="bg-[#4318FF] hover:bg-[#3b15e6] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5">
                            <Plus className="h-4 w-4" />
                            Post a Job
                        </button>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c0d12] rounded-lg border border-[#262930] text-xs font-semibold text-white">
                                    <span>Browse List</span>
                                    <ChevronDown className="h-3 w-3" />
                                </div>
                                <form onSubmit={(e) => e.preventDefault()} className="relative w-48 sm:w-64">
                                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#8f9bba]" />
                                    <input
                                        type="text"
                                        placeholder="Search jobs, tech stack, titles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#0c0d12] border border-[#262930] rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-[#8f9bba] focus:outline-none focus:border-[#4318FF]"
                                    />
                                </form>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-900/20">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    AI Resume Matcher
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
                                <span>Total Postings</span>
                                <span className="bg-[#4318FF]/20 text-[#6AD2FF] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {jobs.length}
                                </span>
                            </button>
                            <button
                                onClick={() => setSelectedType('Remote')}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    selectedType === 'Remote' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Remote</span>
                                <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {jobs.filter(j => j.type === 'Remote').length}
                                </span>
                            </button>
                            <button
                                onClick={() => setSelectedType('Full-time')}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
                                    selectedType === 'Full-time' ? 'border-[#4318FF] text-white bg-[#0c0d12]/30 rounded-t-lg' : 'border-transparent text-[#8f9bba] hover:text-white'
                                }`}
                            >
                                <span>Full-time</span>
                                <span className="bg-[#262930] text-[#8f9bba] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {jobs.filter(j => j.type === 'Full-time').length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Jobs List */}
                    {filteredJobs.length === 0 ? (
                        <div className="flex-1 bg-[#0c0d12] border border-[#262930] rounded-xl p-12 text-center text-[#8f9bba] flex flex-col items-center justify-center">
                            <Briefcase className="h-10 w-10 text-zinc-650 mb-3" />
                            <h4 className="font-bold text-white text-sm">No Jobs Found</h4>
                            <p className="text-xs text-[#8f9bba] mt-1 max-w-xs mx-auto">
                                Reset the filters or expand your query keywords.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredJobs.map((j) => {
                                const isSaved = !!savedJobs[j.id];
                                return (
                                    <div key={j.id} className="bg-[#0c0d12] border border-[#262930] hover:border-[#4318FF] p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all group">
                                        <div className="flex items-start gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-[#15171e] border border-[#262930] flex items-center justify-center text-xs font-black text-[#4318FF] shrink-0">
                                                {j.company.substring(0, 1)}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="font-bold text-white group-hover:text-[#4318FF] transition-colors text-sm">{j.title}</h3>
                                                    <span className="bg-[#15171e] border border-[#262930] text-[#6AD2FF] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                                        {j.type}
                                                    </span>
                                                </div>
                                                <div className="text-[11px] text-[#8f9bba] flex flex-wrap items-center gap-3">
                                                    <span className="font-semibold text-zinc-300">{j.company}</span>
                                                    <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3 shrink-0" /> {j.location}</span>
                                                    <span className="flex items-center gap-0.5"><Clock className="h-3 w-3 shrink-0" /> {j.postedDate}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {j.tags.map(t => (
                                                        <span key={t} className="bg-[#15171e] border border-[#262930] text-zinc-400 text-[10px] px-2 py-0.5 rounded">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 justify-end">
                                            <span className="text-xs font-bold text-white mr-2">{j.salary}</span>
                                            <button
                                                onClick={() => toggleSaveJob(j.id)}
                                                className={`p-2 rounded-lg border border-[#262930] transition-colors ${
                                                    isSaved ? 'bg-[#4318FF]/20 text-[#6AD2FF] border-[#4318FF]' : 'bg-[#15171e] text-[#8f9bba] hover:text-white'
                                                }`}
                                            >
                                                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                                            </button>
                                            <button className="px-3.5 py-1.5 bg-[#c6f052] hover:bg-[#b5dc43] text-black text-xs font-black rounded-lg transition-colors flex items-center gap-1">
                                                <UserCheck className="h-3.5 w-3.5" />
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </GuestLayout>
    );
}
