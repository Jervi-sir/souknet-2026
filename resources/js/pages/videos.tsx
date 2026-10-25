import { Head, Link } from '@inertiajs/react';
import {
    Clock,
    Search,
    Youtube,
    Share2,
    ArrowLeft,
    Milestone,
    Calendar,
    CheckCircle2,
    Flame,
    Moon,
    Sun,
    ExternalLink,
    Rocket,
    Code2,
    Users,
    ShieldAlert,
    Building2,
    PhoneCall,
    Layers,
    Store,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';

export interface ProgressVideoItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    youtubeId: string;
    stageNumber: string;
    date: string;
    duration: string;
    status: 'Déployé en Prod' | 'Phase Pilote / Test Marché';
    notice?: string;
    highlights: string[];
    tags: string[];
}

// Exactly the two progress videos in French with the custom context
export const PLATFORM_PROGRESS_VIDEOS: ProgressVideoItem[] = [
    {
        id: 'progress-update-01-refonte-infrastructure',
        title: 'Avancement & Refonte de l’Infrastructure Globale de Souknet',
        subtitle: 'Marketplace Mega-Catalogue, Organisations, Multi-Boutiques & Call Center Intégré',
        description:
            'Présentation complète de l’évolution majeure de notre architecture technique : migration vers un modèle multi-entités capable de gérer simultanément les catalogues produits (listing), les organisations marchandes, le déploiement de boutiques multiples indépendantes (multi-store), la Mega Marketplace nationale et le module Call Center unifié.',
        youtubeId: 'NAc0eiJllfg', // Remplacez par votre identifiant YouTube réel
        stageNumber: 'Rapport #01',
        date: 'Octobre 2026',
        duration: '12:40',
        status: 'Déployé en Prod',
        highlights: [
            'Refonte architecturelle : gestion multi-organisations et multi-boutiques isolées',
            'Mega Marketplace & listing de catalogue unifié pour les 58 Wilayas',
            'Intégration directe du Call Center au sein du cycle de vie des commandes',
            'Synchronisation des flux logistiques et des états d’inventaire en temps réel',
        ],
        tags: ['Architecture', 'Multi-Store', 'Marketplace', 'Call Center', 'Organisations'],
    },
    {
        id: 'progress-update-02-call-center-pilote',
        title: 'Lancement du Call Center sur le Marché en Phase Pilote / Test Réel',
        subtitle: 'Validation terrain avec un groupe restreint de commerçants partenaires',
        description:
            'Démonstration du desk Call Center opérationnel déployé sur le terrain. En raison de l’absence temporaire de structure financière dédiée et du registre de commerce en cours de finalisation, le service est actuellement testé en conditions réelles avec un groupe fermé de marchands partenaires pour valider le taux de confirmation, la gestion des tentatives d’appels et la réduction des retours.',
        youtubeId: '50z1O76rwU4', // Remplacez par votre identifiant YouTube réel
        stageNumber: 'Rapport #02',
        date: 'Octobre 2026',
        duration: '10:15',
        status: 'Phase Pilote / Test Marché',
        notice: 'Note terrain : Déploiement en comité restreint (groupe pilote) sans facturation publique directe, en attendant la finalisation administrative du registre de commerce.',
        highlights: [
            'Test grandeur nature du Call Center Desk avec un groupe de marchands',
            'Traitement en direct des commandes COD (appels, confirmation, blocage anti-fraude)',
            'Validation terrain des tentatives d’appels et qualification des motifs de refus',
            'Optimisation du taux de livraison avant l’expansion officielle post-registre',
        ],
        tags: ['Call Center', 'Test Marché', 'Groupe Pilote', 'Confirmation COD', 'Algérie'],
    },
];

export default function VideosPage({ customVideos }: { customVideos?: ProgressVideoItem[] }) {
    const { appearance, updateAppearance } = useAppearance();
    const resolvedAppearance =
        appearance === 'system'
            ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
            : appearance;

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const videosList = (customVideos && customVideos.length > 0 ? customVideos : PLATFORM_PROGRESS_VIDEOS).slice(0, 2);

    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredVideos = useMemo(() => {
        return videosList.filter((video) => {
            const matchesSearch =
                searchQuery.trim() === '' ||
                video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.stageNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
                video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesSearch;
        });
    }, [videosList, searchQuery]);

    const getStatusBadge = (status: ProgressVideoItem['status']) => {
        switch (status) {
            case 'Déployé en Prod':
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="size-3" />
                        Déployé en Prod
                    </span>
                );
            case 'Phase Pilote / Test Marché':
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Flame className="size-3" />
                        Phase Pilote (Groupe Partenaire)
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/20 selection:text-purple-600 dark:selection:text-purple-300">
            <Head title="Journal de Bord & Avancement Technique - Souknet" />

            {/* EN-TÊTE DE NAVIGATION */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="size-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
                                S
                            </div>
                            <span className="font-extrabold tracking-tight text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                                Souknet
                            </span>
                            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                                Avancement
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-5 text-xs font-medium text-muted-foreground">
                            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                                <ArrowLeft className="size-3.5" />
                                Accueil
                            </Link>
                            <Link href="/storefront" className="hover:text-foreground transition-colors">
                                Démo Boutique
                            </Link>
                            <Link href="/store-merchant/dashboard" className="hover:text-foreground transition-colors">
                                Espace Marchand
                            </Link>
                            <Link href="/call-center/desk" className="hover:text-foreground transition-colors">
                                Desk Call Center
                            </Link>
                            <Link href="/marketplace" className="hover:text-foreground transition-colors">
                                Marketplace
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                            title="Basculer le thème"
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="size-4 text-amber-400" />
                            ) : (
                                <Moon className="size-4 text-slate-700" />
                            )}
                        </Button>

                        <Link href="/organization/create">
                            <Button className="h-9 px-4 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 shadow-xs">
                                Tester la Plateforme
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* BANNIÈRE TITRE */}
            <div className="relative border-b border-border/40 bg-muted/20 py-10 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium mb-3">
                            <Rocket className="size-3.5" />
                            Building in Public • Journal de Bord & État d’Avancement
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                            Avancement & Démonstrations Vidéo
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                            Découvrez les étapes concrètes du développement de Souknet : refonte technique de l’infrastructure multi-services et retour d'expérience terrain sur la phase pilote du Call Center.
                        </p>
                    </div>

                    {/* Champ de recherche */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Rechercher un rapport, module..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border/80 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-xs"
                        />
                    </div>
                </div>
            </div>

            {/* SECTION PRINCIPALE - 2 LIGNES HORIZONTALES */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <div className="flex flex-col gap-10">
                    {filteredVideos.map((video) => (
                        <article
                            key={video.id}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-card border border-border/80 rounded-3xl p-5 sm:p-7 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            {/* Colonne Gauche : Lecteur Vidéo YouTube Horizontal (7 colonnes) */}
                            <div className="lg:col-span-7 flex flex-col justify-center">
                                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-white/10 group">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&rel=0`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>

                            {/* Colonne Droite : Explication détaillée & Livrables (5 colonnes) */}
                            <div className="lg:col-span-5 flex flex-col justify-between py-1">
                                <div>
                                    {/* En-tête statut & badges */}
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-purple-600 text-white shadow-xs">
                                            {video.stageNumber}
                                        </span>
                                        {getStatusBadge(video.status)}
                                        <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto font-medium">
                                            <Calendar className="size-3.5" />
                                            {video.date}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium bg-muted px-2 py-0.5 rounded-md">
                                            <Clock className="size-3" />
                                            {video.duration}
                                        </span>
                                    </div>

                                    {/* Titre & Sous-titre */}
                                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                                        {video.title}
                                    </h2>
                                    <p className="mt-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
                                        {video.subtitle}
                                    </p>

                                    {/* Description principale */}
                                    <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {video.description}
                                    </p>

                                    {/* Note contextuelle spéciale (pilote / registre de commerce) */}
                                    {video.notice && (
                                        <div className="mt-3.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-700 dark:text-amber-300">
                                            <ShieldAlert className="size-4 shrink-0 mt-0.5 text-amber-500" />
                                            <p className="leading-relaxed font-medium">
                                                {video.notice}
                                            </p>
                                        </div>
                                    )}

                                    {/* Boîte des réalisations concrètes */}
                                    <div className="mt-4 p-4 rounded-2xl bg-muted/40 border border-border/60">
                                        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                            <Milestone className="size-3.5 text-purple-500" />
                                            Points Clés de l’Avancement :
                                        </h4>
                                        <ul className="space-y-2">
                                            {video.highlights.map((highlight, idx) => (
                                                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        {video.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[11px] px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground font-medium"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Liens externes & partage */}
                                <div className="pt-5 border-t border-border/60 mt-6 flex items-center justify-between">
                                    <a
                                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <Youtube className="size-4" />
                                        Voir sur YouTube
                                        <ExternalLink className="size-3" />
                                    </a>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 rounded-full text-xs gap-1.5"
                                        onClick={() => {
                                            if (navigator.clipboard) {
                                                navigator.clipboard.writeText(
                                                    `https://www.youtube.com/watch?v=${video.youtubeId}`
                                                );
                                                alert('Lien YouTube copié dans le presse-papiers !');
                                            }
                                        }}
                                    >
                                        <Share2 className="size-3.5" />
                                        Partager la vidéo
                                    </Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* État de recherche vide */}
                {filteredVideos.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                        <Rocket className="size-12 mx-auto text-muted-foreground/50 mb-3" />
                        <h3 className="text-base font-bold text-foreground">Aucune vidéo trouvée</h3>
                        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                            Aucun élément ne correspond à votre recherche "{searchQuery}".
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-4 rounded-full text-xs"
                            onClick={() => setSearchQuery('')}
                        >
                            Réinitialiser la recherche
                        </Button>
                    </div>
                )}
            </main>

            {/* PIED DE PAGE & CALLOUT */}
            <section className="border-t border-border/60 bg-muted/30 py-14 px-4 sm:px-6 mt-12">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold">
                        <Code2 className="size-3.5" />
                        Transparence & Développement Terrain
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                        Bâtir l’Écosystème E-Commerce Algérien en Direct
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                        Suivez notre parcours étape par étape : de la conception technique à l'expérimentation réelle avec les commerçants locaux.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <Link href="/organization/create">
                            <Button className="h-10 px-6 rounded-full font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-md">
                                Découvrir la Plateforme
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" className="h-10 px-5 rounded-full font-medium">
                                Retour à l’Accueil
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
