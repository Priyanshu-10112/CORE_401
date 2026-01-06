"use client";

import {
    Store,
    MapPin,
    Clock,
    Truck,
    ShieldCheck,
    Save,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-profile";

export default function StoreProfilePage() {
    const { data: user, isLoading, error } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="h-full bg-slate-50/50 rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full bg-slate-50/50 rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 font-medium">Failed to load profile</p>
                    <p className="text-slate-400 text-sm mt-2">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-slate-50/50 rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-y-auto">
            {/* Header */}
            <div className="p-8 md:p-10 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10 backdrop-blur-xl bg-white/80">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Store Profile</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your pharmacy details and settings.</p>
                </div>
                <Button className="rounded-xl bg-primary text-white font-black shadow-xl shadow-primary/20">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </div>

            <div className="max-w-4xl mx-auto p-8 space-y-8">

                {/* Basic Details Card */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Store size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900">Basic Information</h2>
                            <p className="text-sm text-slate-400 font-medium">Your store name and contact details visible to customers.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Store Name</Label>
                            <Input defaultValue={user?.name || ''} className="h-12 rounded-xl bg-slate-50 border-none font-bold text-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</Label>
                            <Input defaultValue={user?.email || ''} className="h-12 rounded-xl bg-slate-50 border-none font-bold text-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">License Number (DL)</Label>
                            <Input defaultValue="DL-MP-IND-99281" className="h-12 rounded-xl bg-slate-50 border-none font-bold text-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Role</Label>
                            <Input defaultValue={user?.role || ''} disabled className="h-12 rounded-xl bg-slate-100 border-none font-bold text-slate-500" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Store Address</Label>
                            <Input defaultValue="12, Scheme 54, Near Bombay Hospital, Vijay Nagar, Indore" className="h-12 rounded-xl bg-slate-50 border-none font-bold text-slate-900" />
                        </div>
                    </div>
                </div>

                {/* Delivery Settings */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Truck size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900">Delivery Configuration</h2>
                            <p className="text-sm text-slate-400 font-medium">Set your delivery radius and charges.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div>
                                <h3 className="font-bold text-slate-900">Enable Delivery</h3>
                                <p className="text-xs text-slate-500 font-medium">Allow customers to place delivery orders.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Delivery Radius (KM)</Label>
                                <Input type="number" defaultValue="5" className="h-12 rounded-xl bg-slate-50 border-none font-bold text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Min. Order Value (₹)</Label>
                                <Input type="number" defaultValue="200" className="h-12 rounded-xl bg-slate-50 border-none font-bold text-slate-900" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
