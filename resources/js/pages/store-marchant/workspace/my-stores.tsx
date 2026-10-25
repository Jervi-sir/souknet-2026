import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
  Building2,
  Store,
  Plus,
  ExternalLink,
  Check,
  Settings,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Users,
  ShieldCheck,
  ArrowRight,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StoreItem {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  wilaya: string;
  monthly_revenue_dzd: number;
  monthly_orders: number;
  status: 'active' | 'maintenance';
  is_current: boolean;
  created_at: string;
}

const MY_STORES: StoreItem[] = [
  {
    id: 'store_1',
    name: 'DzAvenue Boutique',
    slug: 'dzavenue',
    domain: 'dzavenue.dz',
    wilaya: '16 - Alger (Didouche Mourad)',
    monthly_revenue_dzd: 1485000,
    monthly_orders: 312,
    status: 'active',
    is_current: true,
    created_at: '2026-01-15',
  },
  {
    id: 'store_2',
    name: 'Algeria Sneaker Lab',
    slug: 'sneakerlab',
    domain: 'sneakerlab.souknet.dz',
    wilaya: '31 - Oran (Akid Lotfi)',
    monthly_revenue_dzd: 620000,
    monthly_orders: 86,
    status: 'active',
    is_current: false,
    created_at: '2026-02-10',
  },
  {
    id: 'store_3',
    name: 'Dar El Caftan Premium',
    slug: 'caftan-dz',
    wilaya: '25 - Constantine',
    monthly_revenue_dzd: 340000,
    monthly_orders: 38,
    status: 'maintenance',
    is_current: false,
    created_at: '2026-03-01',
  },
];

export default function StoreMerchantMyStores() {
  const [stores, setStores] = useState<StoreItem[]>(MY_STORES);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newWilaya, setNewWilaya] = useState('16 - Algiers');

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName.trim()) return;

    const store: StoreItem = {
      id: `store_${Date.now()}`,
      name: newStoreName,
      slug: newStoreName.toLowerCase().replace(/\s+/g, '-'),
      wilaya: newWilaya,
      monthly_revenue_dzd: 0,
      monthly_orders: 0,
      status: 'active',
      is_current: false,
      created_at: 'Today',
    };

    setStores([...stores, store]);
    setNewStoreName('');
    setIsCreateOpen(false);
  };

  const handleSwitchStore = (id: string) => {
    setStores(stores.map((s) => ({ ...s, is_current: s.id === id })));
  };

  return (
    <StoreMerchantLayout activeNav="my-stores" title="My Stores (Multi-Store)">
      <Head title="My Stores - Atlas Commerce Group" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Multi-Store Workspace
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage all online shops under organization <strong>Atlas Commerce Group</strong> (3 of 5 store slots used).
            </p>
          </div>

          <Button
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className="gap-2 h-9 text-xs font-semibold shadow-xs"
          >
            <Plus className="size-3.5" />
            <span>Create New Store</span>
          </Button>
        </div>

        {/* Create Modal / Card */}
        {isCreateOpen && (
          <Card className="border-2 border-primary/20 bg-card shadow-md animate-in slide-in-from-top-3 duration-150">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-sm font-semibold tracking-tight">Create a New Store</CardTitle>
              <CardDescription className="text-xs">
                New store will inherit shared call center queues and courier billing accounts.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <form onSubmit={handleCreateStore} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Store Name</Label>
                    <Input
                      required
                      placeholder="e.g. Oran Perfumes Boutique"
                      value={newStoreName}
                      onChange={(e) => setNewStoreName(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Warehouse Origin Wilaya</Label>
                    <select
                      value={newWilaya}
                      onChange={(e) => setNewWilaya(e.target.value)}
                      className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs cursor-pointer"
                    >
                      <option value="16 - Algiers">16 - Alger</option>
                      <option value="31 - Oran">31 - Oran</option>
                      <option value="25 - Constantine">25 - Constantine</option>
                      <option value="19 - Sétif">19 - Sétif</option>
                      <option value="09 - Blida">09 - Blida</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCreateOpen(false)}
                    className="h-8 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="h-8 text-xs font-semibold">
                    Launch Store
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stores.map((store) => (
            <Card
              key={store.id}
              className={`border transition-all flex flex-col justify-between ${store.is_current
                  ? 'border-primary ring-2 ring-primary/20 bg-card shadow-md'
                  : 'border-border/80 bg-card/60 hover:border-primary/40'
                }`}
            >
              <CardHeader className="pb-3 border-b border-border/60">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      {store.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-tight">
                        {store.name}
                      </CardTitle>
                      <span className="text-[10px] font-mono text-muted-foreground truncate block">
                        {store.domain || `${store.slug}.souknet.dz`}
                      </span>
                    </div>
                  </div>

                  {store.is_current ? (
                    <Badge className="bg-primary text-primary-foreground text-[9px] px-1.5 py-0">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[9px]">
                      Standby
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-3.5 text-primary" />
                    <span>{store.wilaya}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">
                        Revenue (30d)
                      </span>
                      <span className="font-bold text-foreground">
                        {(store.monthly_revenue_dzd / 1000).toFixed(0)}k DZD
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block">
                        Orders
                      </span>
                      <span className="font-bold text-foreground">
                        {store.monthly_orders} orders
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                  {store.is_current ? (
                    <Button disabled variant="outline" size="sm" className="w-full text-xs">
                      Currently Selected
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleSwitchStore(store.id)}
                      className="w-full text-xs font-semibold"
                    >
                      Switch to this Store
                    </Button>
                  )}

                  <a
                    href="/storefront"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    title="Open Live Storefront"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StoreMerchantLayout>
  );
}
