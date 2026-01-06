"use client";

import { Button } from "@/components/ui/button";
import { Package, ArrowRight, History } from "lucide-react";
import Link from "next/link";
import { RoleGuard } from "@/components/auth/role-guard";

export default function OrdersPage() {
    return (
        <RoleGuard allowedRoles={['USER']}>
            <OrdersContent />
        </RoleGuard>
    );
}

function OrdersContent() {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto max-w-4xl space-y-12">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight text-left">Patient History</h1>
                    <p className="text-slate-500 font-medium">Manage and track your pharmaceutical orders.</p>
                </div>

                <div className="flex flex-col items-center gap-10 py-32 rounded-[3.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 text-center px-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-slate-100" />

                    <div className="h-32 w-32 rounded-[2.5rem] bg-slate-50 flex items-center justify-center relative border border-slate-100">
                        <History className="h-16 w-16 text-slate-200" />
                        <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black">
                            0
                        </div>
                    </div>

                    <div className="space-y-3 max-w-md">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">No Patient History Found</h3>
                        <p className="text-slate-600 text-lg font-medium leading-relaxed">
                            You haven&apos;t placed any medical orders yet. Once you complete a purchase, your tracked history will appear here.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="h-16 px-12 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20 group" asChild>
                            <Link href="/medicines">
                                Place First Order <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl text-lg font-black border-2 bg-transparent hover:bg-slate-50">
                            Support Center
                        </Button>
                    </div>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Package className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xl font-black tracking-tight">Track a Medicine Package</h4>
                            <p className="text-slate-400 text-sm font-medium">Enter your tracking ID to see real-time updates.</p>
                        </div>
                    </div>
                    <Button className="h-12 rounded-xl px-8 font-black bg-white text-slate-900 hover:bg-slate-100">Track Now</Button>
                </div>
            </div>
        </div>
    );
}
