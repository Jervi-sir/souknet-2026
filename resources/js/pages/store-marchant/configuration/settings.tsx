import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
  Settings,
  Store,
  PhoneCall,
  Mail,
  MapPin,
  Truck,
  ShieldCheck,
  Save,
  Check,
  AlertCircle,
  Bell,
  Globe,
  MessageCircle,
} from 'lucide-react';
import StoreMerchantLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function StoreMerchantSettings() {
  const [saved, setSaved] = useState(false);

  // Store profile state
  const [storeName, setStoreName] = useState('DzAvenue Boutique');
  const [tagline, setTagline] = useState('Premium lifestyle & footwear delivered across 58 wilayas');
  const [contactPhone, setContactPhone] = useState('0555 12 34 56');
  const [whatsappPhone, setWhatsappPhone] = useState('0555 12 34 56');
  const [supportEmail, setSupportEmail] = useState('contact@dzavenue.dz');
  const [primaryWilaya, setPrimaryWilaya] = useState('16 - Algiers');
  const [address, setAddress] = useState('Rue Didouche Mourad, Alger Centre');

  // COD & Operational preferences
  const [autoCallDispatch, setAutoCallDispatch] = useState(true);
  const [maxCallAttempts, setMaxCallAttempts] = useState('3');
  const [allowStopdesk, setAllowStopdesk] = useState(true);
  const [minOrderAmount, setMinOrderAmount] = useState('1500');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('6000');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <StoreMerchantLayout activeNav="settings" title="Store Settings">
      <Head title="Store Settings - DzAvenue Boutique" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Store Configuration
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage store identity, customer contact coordinates, and Cash-on-Delivery fulfillment rules.
            </p>
          </div>

          <Button onClick={handleSave} className="gap-2 h-9 text-xs font-semibold shadow-xs">
            {saved ? <Check className="size-4 text-emerald-400" /> : <Save className="size-4" />}
            <span>{saved ? 'Changes Saved!' : 'Save Settings'}</span>
          </Button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Store Identity */}
          <Card className="border border-border/80 shadow-xs">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                <Store className="size-4 text-primary" />
                Store Profile & Branding
              </CardTitle>
              <CardDescription className="text-xs">
                Basic details displayed on your storefront and courier invoices.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Store Name</Label>
                  <Input
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Support Email</Label>
                  <Input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Store Tagline / Bio</Label>
                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Primary Call Center Phone</Label>
                  <div className="relative">
                    <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-emerald-600" />
                    <Input
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="pl-9 h-9 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">WhatsApp Floating Support</Label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-emerald-600" />
                    <Input
                      value={whatsappPhone}
                      onChange={(e) => setWhatsappPhone(e.target.value)}
                      className="pl-9 h-9 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Algerian Headquarters */}
          <Card className="border border-border/80 shadow-xs">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                Algerian Location & Return Address
              </CardTitle>
              <CardDescription className="text-xs">
                Used as the pickup origin address when couriers collect parcels from your warehouse.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Origin Wilaya</Label>
                  <select
                    value={primaryWilaya}
                    onChange={(e) => setPrimaryWilaya(e.target.value)}
                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs"
                  >
                    <option value="16 - Algiers">16 - Alger</option>
                    <option value="09 - Blida">09 - Blida</option>
                    <option value="31 - Oran">31 - Oran</option>
                    <option value="25 - Constantine">25 - Constantine</option>
                    <option value="19 - Sétif">19 - Sétif</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Detailed Warehouse / Office Address</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cash On Delivery & Call Center Rules */}
          <Card className="border border-border/80 shadow-xs">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                Cash On Delivery (COD) Rules
              </CardTitle>
              <CardDescription className="text-xs">
                Configure order threshold, confirmation call attempts, and stopdesk allowances.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Minimum Order Amount</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={minOrderAmount}
                      onChange={(e) => setMinOrderAmount(e.target.value)}
                      className="h-9 text-xs pr-12 font-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-bold">
                      DZD
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Free Delivery Threshold</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={freeShippingThreshold}
                      onChange={(e) => setFreeShippingThreshold(e.target.value)}
                      className="h-9 text-xs pr-12 font-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-bold">
                      DZD
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Max Call Attempts</Label>
                  <select
                    value={maxCallAttempts}
                    onChange={(e) => setMaxCallAttempts(e.target.value)}
                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs"
                  >
                    <option value="2">2 Attempts (Fast cancel)</option>
                    <option value="3">3 Attempts (Standard DZ)</option>
                    <option value="5">5 Attempts (Aggressive confirmation)</option>
                  </select>
                </div>
              </div>

              {/* Checkbox Options */}
              <div className="pt-2 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoCallDispatch}
                    onChange={(e) => setAutoCallDispatch(e.target.checked)}
                    className="rounded border-border size-4 text-primary focus:ring-primary"
                  />
                  <span className="text-xs text-foreground font-medium">
                    Auto-route newly registered COD orders directly into Call Center agent queues
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowStopdesk}
                    onChange={(e) => setAllowStopdesk(e.target.checked)}
                    className="rounded border-border size-4 text-primary focus:ring-primary"
                  />
                  <span className="text-xs text-foreground font-medium">
                    Enable Stopdesk (Bureau pickup) with discounted shipping fees
                  </span>
                </label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="gap-2 h-9 text-xs font-semibold shadow-xs">
              <Save className="size-4" />
              <span>Save Settings</span>
            </Button>
          </div>
        </form>
      </div>
    </StoreMerchantLayout>
  );
}
