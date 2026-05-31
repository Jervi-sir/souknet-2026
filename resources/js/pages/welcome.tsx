import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { useState } from 'react';
import {
    Building2,
    Users2,
    Database,
    Briefcase,
    Layers,
    Zap,
    Search,
    Check,
    ChevronDown,
    Star,
    ArrowRight,
    ArrowUpRight,
    TrendingUp,
    Shield,
    FileText,
    Globe,
    ExternalLink
} from 'lucide-react';

interface CompanyMock {
    name: string;
    logoLetter: string;
    logoBg: string;
    role: string;
    location: string;
    category: string;
    employees: string;
    verified: boolean;
}

export default function Welcome() {
    const { auth } = usePage<any>().props;

    // State for interactive demo
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [faqOpen, setFaqOpen] = useState<number | null>(null);

    // Mock company data for interactive demo
    const mockCompanies: CompanyMock[] = [
        {
            name: 'Yassir',
            logoLetter: 'Y',
            logoBg: 'bg-yellow-500 text-black',
            role: 'Super-App & Logistics',
            location: 'Algiers, Algeria',
            category: 'Mobility',
            employees: '500+ Empl.',
            verified: true
        },
        {
            name: 'Zimela',
            logoLetter: 'Z',
            logoBg: 'bg-indigo-600 text-white',
            role: 'SaaS HR Platform',
            location: 'Oran, Algeria',
            category: 'SaaS',
            employees: '45 Empl.',
            verified: true
        },
        {
            name: 'Ridjaly',
            logoLetter: 'R',
            logoBg: 'bg-emerald-600 text-white',
            role: 'Fintech Payment Gateway',
            location: 'Algiers, Algeria',
            category: 'Fintech',
            employees: '28 Empl.',
            verified: true
        },
        {
            name: 'TemTem One',
            logoLetter: 'T',
            logoBg: 'bg-rose-500 text-white',
            role: 'E-commerce & Delivery',
            location: 'Algiers, Algeria',
            category: 'E-commerce',
            employees: '120 Empl.',
            verified: false
        },
        {
            name: 'Sila Lab',
            logoLetter: 'S',
            logoBg: 'bg-cyan-600 text-white',
            role: 'AI Data Analytics',
            location: 'Constantine, Algeria',
            category: 'SaaS',
            employees: '15 Empl.',
            verified: true
        }
    ];

    // Filtered companies based on interactive demo selection
    const filteredCompanies = mockCompanies.filter((company) => {
        const matchesCategory = selectedCategory === 'All' || company.category === selectedCategory;
        const matchesQuery = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.role.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    const faqItems = [
        {
            question: 'Is Souknet really free to search?',
            answer: 'Yes! Anyone can search and browse public company profiles, startup listings, and open job roles for free. Verified business owners can unlock premium features like direct messaging and CRM data enrichment.'
        },
        {
            question: 'How accurate is the business data?',
            answer: 'We continuously verify our data using primary sources, official registers, and manual community reviews. Verified profiles carry a checkmark to ensure contact details and key details are correct.'
        },
        {
            question: 'Can I search by specific cities or regions?',
            answer: 'Absolutely. Souknet allows advanced filtering by region (e.g., Algiers, Oran, Constantine) as well as industry sectors, size, and funding stage to find the exact startup or partner you need.'
        },
        {
            question: 'What is B2B CRM Data Enrichment?',
            answer: 'With our Enrichment tool, you can upload a list of company names or domains, and Souknet will instantly fill in details like emails, key decision-makers, tech stack details, and active office addresses.'
        }
    ];

    return (
        <>
            <Head title="Souknet - Startup & B2B Directory" />

            {/* Main Wrapper */}
            <div className="min-h-screen bg-[#fafaf9] font-sans text-neutral-900 selection:bg-yellow-200 selection:text-neutral-900 dark:bg-[#09090b] dark:text-neutral-100">

                {/* 1. Header & Navigation */}
                <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#09090b]/80">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 font-black text-black shadow-md dark:bg-yellow-400">
                                S
                            </div>
                            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                souknet
                            </span>
                        </div>

                        {/* Mid Navigation (Matching trust categories in Apollo) */}
                        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-600 lg:flex dark:text-neutral-400">
                            <a href="#features" className="transition hover:text-neutral-950 dark:hover:text-white">Features</a>
                            <a href="#interactive" className="transition hover:text-neutral-950 dark:hover:text-white">Live Search</a>
                            <a href="#pricing" className="transition hover:text-neutral-950 dark:hover:text-white">Pricing</a>
                            <a href="#faq" className="transition hover:text-neutral-950 dark:hover:text-white">FAQ</a>
                        </nav>

                        {/* Auth Navigation */}
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-flex h-9 items-center justify-center rounded-lg bg-yellow-400 px-4 text-sm font-semibold text-black transition hover:bg-yellow-300"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* 2. Hero Section with Fluid Mesh Gradient */}
                <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">

                    {/* Background Fluid Shapes (Apollo inspired) */}
                    <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
                        <div
                            className="aspect-1155/678 w-[72.1875rem] flex-none bg-gradient-to-tr from-yellow-300 via-pink-400 to-amber-300 opacity-40 dark:opacity-30"
                            style={{
                                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                            }}
                        />
                    </div>

                    <div className="mx-auto max-w-5xl px-6 text-center">
                        {/* Announcement Badge */}
                        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1.5 text-xs font-semibold text-yellow-800 dark:border-yellow-950/50 dark:bg-yellow-950/20 dark:text-yellow-400">
                            <span>🚀</span>
                            <span>The largest Startup & B2B Directory is now live</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.1] text-neutral-950 dark:text-white">
                            Your next tech partnership <br className="hidden sm:inline" />
                            is already on <span className="underline decoration-yellow-400 decoration-8 underline-offset-4">Souknet</span>
                        </h1>

                        {/* Subheading */}
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
                            Search thousands of startups, tech companies, founders, and business services. Unlock qualified leads, view verified profiles, and enrich your CRM.
                        </p>

                        {/* Search Input Bar Mockup */}
                        <div className="mx-auto mt-10 max-w-2xl">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById('interactive');
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="flex flex-col gap-2 p-1.5 bg-white border border-neutral-200 shadow-xl rounded-2xl sm:flex-row sm:items-center dark:bg-neutral-900 dark:border-neutral-800"
                            >
                                <div className="flex flex-1 items-center gap-3 px-3">
                                    <Search className="h-5 w-5 text-neutral-400 shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Search companies by name, category, city..."
                                        className="w-full bg-transparent py-3 text-sm focus:outline-none dark:text-white"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-neutral-950 py-3 px-6 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800 sm:py-4 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300"
                                >
                                    Search Directory
                                </button>
                            </form>
                        </div>

                        {/* Trust Bullet Highlights */}
                        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            <span className="flex items-center gap-1.5">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0" /> 5,000+ Startups & Services
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Verified Contact Emails
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0" /> GDPR & Alg. Privacy Compliant
                            </span>
                        </div>

                        {/* Trust Stats below Hero */}
                        <div className="mt-16 grid grid-cols-3 divide-x divide-neutral-200 border-t border-neutral-200/80 pt-10 dark:divide-neutral-800 dark:border-neutral-800/80">
                            <div>
                                <span className="block text-2xl font-bold sm:text-4xl text-neutral-950 dark:text-white">10K+</span>
                                <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Monthly Visitors</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold sm:text-4xl text-neutral-950 dark:text-white">99%</span>
                                <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Verification Rate</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold sm:text-4xl text-neutral-950 dark:text-white">100%</span>
                                <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Privacy Secure</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Logo Cloud / Partner Startups */}
                <section className="border-y border-neutral-200/80 bg-neutral-50 py-12 dark:border-neutral-800/80 dark:bg-neutral-900/20">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <p className="text-xs font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                            Trusted by teams at top directories and emerging startups
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale transition hover:grayscale-0">
                            <span className="text-lg font-black tracking-tight dark:text-white">YASSIR</span>
                            <span className="text-lg font-bold tracking-widest dark:text-white">TEMTEM</span>
                            <span className="text-lg font-bold dark:text-white">EMPLOITIC</span>
                            <span className="text-lg font-black dark:text-white">RIDJALY</span>
                            <span className="text-lg font-bold tracking-tight dark:text-white">ALGERTECH</span>
                            <span className="text-lg font-semibold tracking-widest dark:text-white">SILA LAB</span>
                        </div>
                    </div>
                </section>

                {/* 4. Features Grid ("In 60 seconds, you'll have access to:") */}
                <section id="features" className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center">
                            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                                Powerhouse Platform Features
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-neutral-950 dark:text-white">
                                In 60 seconds, you'll have access to:
                            </h2>
                            <p className="mx-auto mt-4 max-w-xl text-neutral-500 dark:text-neutral-400">
                                A suite of B2B features designed to accelerate startup networking, hiring, and data intelligence.
                            </p>
                        </div>

                        {/* Cards Grid */}
                        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {/* Feature 1 */}
                            <div className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-yellow-400">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-neutral-900 group-hover:text-neutral-950 dark:text-neutral-100 dark:group-hover:text-white">
                                    B2B Business Directory
                                </h3>
                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    Browse detailed startup registers complete with status, category tags, locations, and verified contacts.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-yellow-400">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400">
                                    <Users2 className="h-5 w-5" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-neutral-900 group-hover:text-neutral-950 dark:text-neutral-100 dark:group-hover:text-white">
                                    Key Founders & Contacts
                                </h3>
                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    Get key people contacts, LinkedIn profiles, and verified email channels for startup decision-makers.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-yellow-400">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400">
                                    <Database className="h-5 w-5" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-neutral-900 group-hover:text-neutral-950 dark:text-neutral-100 dark:group-hover:text-white">
                                    Data CRM Enrichment
                                </h3>
                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    Enrich your raw leads lists. Fill gaps in company directories, emails, locations, and details.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-yellow-400">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400">
                                    <Briefcase className="h-5 w-5" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-neutral-900 group-hover:text-neutral-950 dark:text-neutral-100 dark:group-hover:text-white">
                                    Startup Jobs Board
                                </h3>
                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    Connect with the best talent or check open roles at featured start-ups looking to grow their staff.
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-yellow-400">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400">
                                    <Layers className="h-5 w-5" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-neutral-900 group-hover:text-neutral-950 dark:text-neutral-100 dark:group-hover:text-white">
                                    Product Showcases
                                </h3>
                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    Discover local SaaS, hardware, and innovative products built by companies in the ecosystem.
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-yellow-400">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400">
                                    <Zap className="h-5 w-5" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-neutral-900 group-hover:text-neutral-950 dark:text-neutral-100 dark:group-hover:text-white">
                                    Smart Lead Workflows
                                </h3>
                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    Keep track of profile views, inbound inquiry leads, click events, and automated notification setups.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 5. Split Interactive Feature Section */}
                <section id="interactive" className="border-t border-neutral-200 bg-neutral-50 py-24 lg:py-32 dark:border-neutral-800 dark:bg-neutral-900/20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                            {/* Left Text */}
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                                    Real-time exploration
                                </p>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-neutral-950 dark:text-white">
                                    Find startups and tech partners in seconds
                                </h2>
                                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                                    Filter through startups by categories, search names, and interact directly. Try out the mockup directory search on the right side to preview how the platform functions.
                                </p>

                                <ul className="mt-8 space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                                            <Check className="h-3.5 w-3.5 shrink-0" />
                                        </div>
                                        <div>
                                            <strong className="block text-sm font-semibold dark:text-white">Dynamic category segmentation</strong>
                                            <span className="text-sm text-neutral-500 dark:text-neutral-400">Instantly switch filters between SaaS, Fintech, E-commerce, or Mobility.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                                            <Check className="h-3.5 w-3.5 shrink-0" />
                                        </div>
                                        <div>
                                            <strong className="block text-sm font-semibold dark:text-white">Verified checkmarks</strong>
                                            <span className="text-sm text-neutral-500 dark:text-neutral-400">Know which startup profiles have been officially validated by administrators.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Right Mockup Directory Card */}
                            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
                                {/* Dashboard Mockup Header */}
                                <div className="flex flex-col gap-4 border-b border-neutral-200 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
                                    <div>
                                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Startup Directory</h4>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Live preview filter</p>
                                    </div>
                                    {/* Category Filter Tabs */}
                                    <div className="flex flex-wrap gap-1">
                                        {['All', 'SaaS', 'Fintech', 'Mobility'].map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${selectedCategory === category
                                                        ? 'bg-yellow-400 text-black shadow-sm'
                                                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mockup Live Search Input */}
                                <div className="mt-4 flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-950">
                                    <Search className="h-4 w-4 text-neutral-400 shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Quick filter listings..."
                                        className="w-full bg-transparent text-xs focus:outline-none dark:text-white"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Mockup Items List */}
                                <div className="mt-4 space-y-3">
                                    {filteredCompanies.length > 0 ? (
                                        filteredCompanies.map((company, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col gap-3 rounded-xl border border-neutral-100 p-3 transition hover:bg-neutral-50 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800/60 dark:hover:bg-neutral-800/40"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {/* Avatar Icon */}
                                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-black text-sm ${company.logoBg}`}>
                                                        {company.logoLetter}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                                                                {company.name}
                                                            </span>
                                                            {company.verified && (
                                                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400" title="Verified Startup">
                                                                    ✓
                                                                </span>
                                                            )}
                                                            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                                                {company.category}
                                                            </span>
                                                        </div>
                                                        <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                                                            {company.role} • {company.location}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-neutral-100 pt-2 sm:border-t-0 sm:pt-0">
                                                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                                                        {company.employees}
                                                    </span>
                                                    <button className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-3 py-1 text-xs font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                                                        View Profile
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center text-xs text-neutral-500">
                                            No mockup companies found matching "{searchQuery}" in category {selectedCategory}.
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 6. Quote & Stats Section */}
                <section className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid gap-16 lg:grid-cols-5 lg:items-center">

                            {/* Left Testimonial */}
                            <div className="lg:col-span-3">
                                <h3 className="text-2xl font-semibold italic leading-relaxed tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
                                    "Every tech startup is more productive with Souknet. We booked 75% more partnership meetings while cutting manual sourcing work in half."
                                </h3>
                                <div className="mt-6 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black shadow-inner">
                                        MH
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-neutral-950 dark:text-white">Mourad Hamidi</span>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400">Head of Growth, AlgerTech Corp</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Stats Cards */}
                            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:col-span-2">
                                {/* Card 1 */}
                                <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                                    <span className="block text-xs uppercase tracking-wider text-neutral-400">Sourcing Efficiency</span>
                                    <span className="mt-1 block text-3xl font-extrabold text-neutral-950 dark:text-white">70%</span>
                                    <span className="text-xs text-neutral-500">Increase in pipeline lead growth</span>
                                </div>

                                {/* Card 2 */}
                                <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                                    <span className="block text-xs uppercase tracking-wider text-neutral-400">Hiring velocity</span>
                                    <span className="mt-1 block text-3xl font-extrabold text-neutral-950 dark:text-white">4x</span>
                                    <span className="text-xs text-neutral-500">Faster developer and sales recruiting</span>
                                </div>

                                {/* Card 3 */}
                                <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                                    <span className="block text-xs uppercase tracking-wider text-neutral-400">B2B outreach responses</span>
                                    <span className="mt-1 block text-3xl font-extrabold text-neutral-950 dark:text-white">64%</span>
                                    <span className="text-xs text-neutral-500">Response rates on verified startup contacts</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 7. Frequently Asked Questions (FAQ) Accordion */}
                <section id="faq" className="border-t border-neutral-200 py-24 lg:py-32 dark:border-neutral-800">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid gap-12 lg:grid-cols-3">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                                    Got questions?
                                </p>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                                    Frequently asked questions
                                </h2>
                                <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                                    Everything you need to know about the Souknet platform, business directory tools, and membership rules.
                                </p>
                            </div>

                            {/* Accordion container */}
                            <div className="space-y-4 lg:col-span-2">
                                {faqItems.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-neutral-200 bg-white overflow-hidden dark:border-neutral-800 dark:bg-neutral-900"
                                    >
                                        <button
                                            onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                                            className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-sm transition hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                                        >
                                            <span className="dark:text-white">{faq.question}</span>
                                            <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform ${faqOpen === index ? 'rotate-180' : ''}`} />
                                        </button>
                                        {faqOpen === index && (
                                            <div className="border-t border-neutral-100 px-5 py-4 text-xs leading-relaxed text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Vibrant CTA Banner (Yellow block with fluid pink overlay) */}
                <section className="mx-auto max-w-7xl px-6 pb-24">
                    <div className="relative overflow-hidden rounded-3xl bg-yellow-400 py-16 px-8 shadow-2xl sm:px-16 sm:py-24">

                        {/* Fluid Pink/Peach Overlay Shape */}
                        <div
                            className="absolute -right-20 -bottom-20 -z-10 aspect-1155/678 w-[40rem] rotate-12 transform-gpu bg-gradient-to-tr from-pink-400 to-rose-300 opacity-60 blur-2xl"
                            style={{
                                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                            }}
                        />

                        <div className="relative mx-auto max-w-3xl text-center text-neutral-950">
                            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                                Your next growth phase <br className="hidden sm:inline" />
                                is one free signup away.
                            </h2>
                            <p className="mx-auto mt-6 max-w-lg text-sm font-medium leading-relaxed opacity-80">
                                Start searching startups, claim your official company profile listing, and build massive B2B pipelines. No credit card required.
                            </p>

                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link
                                    href={register()}
                                    className="inline-flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-8 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-900 focus:outline-none"
                                >
                                    Get Started Free
                                </Link>
                                <Link
                                    href={login()}
                                    className="inline-flex h-12 items-center justify-center rounded-xl border border-neutral-950/20 px-8 text-sm font-semibold transition hover:bg-neutral-950/5 focus:outline-none"
                                >
                                    Log In to Account
                                </Link>
                            </div>

                            {/* Verification Badges */}
                            <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-semibold opacity-75">
                                <span className="flex items-center gap-1.5">✓ 5,000+ business logs</span>
                                <span className="flex items-center gap-1.5">✓ Fast CRM integration</span>
                                <span className="flex items-center gap-1.5">✓ Active startup jobs list</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9. Rich Sitemap Footer */}
                <footer className="border-t border-neutral-200 bg-neutral-900 py-16 text-neutral-400 dark:border-neutral-800">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

                            {/* Brand Info */}
                            <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 font-black text-black">
                                        S
                                    </div>
                                    <span className="text-lg font-bold tracking-tight text-white">
                                        souknet
                                    </span>
                                </div>
                                <p className="mt-4 text-xs leading-relaxed text-neutral-400">
                                    Souknet is the leading directory platform built for tech startups, B2B companies, and developers in Algeria and across North Africa. Search profiles, post jobs, showcase products, and scale.
                                </p>
                                <span className="mt-6 block text-xs">
                                    © {new Date().getFullYear()} Souknet Corp. All rights reserved.
                                </span>
                            </div>

                            {/* Sitemap Columns */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Directory</h4>
                                <ul className="mt-4 space-y-2 text-xs">
                                    <li><Link href="/discover/companies" className="hover:text-white">Tech Startups</Link></li>
                                    <li><Link href="/discover/people" className="hover:text-white">Founders Directory</Link></li>
                                    <li><Link href="/discover/jobs" className="hover:text-white">Active Jobs</Link></li>
                                    <li><Link href="/discover/products" className="hover:text-white">SaaS Products</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Solutions</h4>
                                <ul className="mt-4 space-y-2 text-xs">
                                    <li><a href="#features" className="hover:text-white">Lead Generation</a></li>
                                    <li><Link href="/discover/data-enrichment" className="hover:text-white">CRM Enrichment</Link></li>
                                    <li><a href="#" className="hover:text-white">Business Sourcing</a></li>
                                    <li><Link href="/pricing" className="hover:text-white">Freemium Plans</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
                                <ul className="mt-4 space-y-2 text-xs">
                                    <li><a href="#" className="hover:text-white">Developer API</a></li>
                                    <li><a href="#faq" className="hover:text-white">Support Helpdesk</a></li>
                                    <li><a href="#" className="hover:text-white">Ecosystem Report</a></li>
                                    <li><a href="#" className="hover:text-white">Press Kit</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
                                <ul className="mt-4 space-y-2 text-xs">
                                    <li><a href="#" className="hover:text-white">About Us</a></li>
                                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                    <li><a href="#" className="hover:text-white">Terms of Use</a></li>
                                    <li><a href="#" className="hover:text-white">Contact Sales</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
