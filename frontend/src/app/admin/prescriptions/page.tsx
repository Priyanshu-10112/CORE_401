"use client";

import {
    FileText,
    CheckCircle2,
    XCircle,
    ZoomIn,
    Download,
    Eye,
    MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";

// Mock Prescriptions
const prescriptions = [
    { id: "RX-9012", patient: "Amit Verma", age: "45 M", doctor: "Dr. R.K. Gupta", date: "2 mins ago", status: "Pending", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800" },
    { id: "RX-9011", patient: "Suman Rao", age: "32 F", doctor: "Dr. P. Sharma", date: "15 mins ago", status: "Pending", img: "https://images.unsplash.com/photo-1631549916768-4119b2d5f926?auto=format&fit=crop&q=80&w=800" },
    { id: "RX-9010", patient: "Rahul Yadav", age: "28 M", doctor: "Self Upload", date: "1 hour ago", status: "Rejected", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800" },
];

export default function PrescriptionsPage() {
    return (
        <div className="h-full bg-slate-50/50 rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-8 md:p-10 bg-white border-b border-slate-100 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Parchi (Prescriptions)</h1>
                    <p className="text-slate-500 font-medium mt-1">Review uploaded prescriptions and create orders.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">2 Pending Review</span>
                </div>
            </div>

            {/* Grid */}
            <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prescriptions.map((rx, i) => (
                    <motion.div
                        key={rx.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-100">
                            <Image
                                src={rx.img}
                                alt="Prescription"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="secondary" size="sm" className="rounded-xl font-bold">
                                            <ZoomIn size={16} className="mr-2" /> View
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden rounded-3xl bg-slate-900 border-none">
                                        <div className="relative w-full h-full flex flex-col md:flex-row">
                                            {/* Image Vewier */}
                                            <div className="flex-1 relative bg-black flex items-center justify-center p-4">
                                                <div className="relative w-full h-full max-h-[80vh]">
                                                    <Image src={rx.img} alt="Full Rx" fill className="object-contain" />
                                                </div>
                                            </div>

                                            {/* Action Sidebar */}
                                            <div className="w-full md:w-96 bg-white p-8 flex flex-col h-full">
                                                <div className="mb-8">
                                                    <h2 className="text-2xl font-black text-slate-900">{rx.patient}</h2>
                                                    <p className="text-slate-500 font-medium">{rx.age} • {rx.doctor}</p>
                                                    <div className="mt-4 p-4 rounded-xl bg-slate-50 text-xs font-bold text-slate-500 border border-slate-100">
                                                        Rx ID: <span className="text-slate-900">{rx.id}</span> <br />
                                                        Uploaded: {rx.date}
                                                    </div>
                                                </div>

                                                <div className="flex-1 overflow-y-auto">
                                                    {/* Chat or Notes could go here */}
                                                    <p className="text-sm text-slate-400 italic">No notes from patient.</p>
                                                </div>

                                                <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                                                    <Button className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black shadow-lg shadow-green-500/20">
                                                        <CheckCircle2 className="mr-2" /> Accept & Create Order
                                                    </Button>
                                                    <Button variant="outline" className="w-full h-12 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100 font-black">
                                                        <XCircle className="mr-2" /> Reject Prescription
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="absolute top-3 right-3">
                                <Badge className={`${rx.status === 'Pending' ? 'bg-orange-500' : 'bg-red-500'} border-white shadow-sm`}>
                                    {rx.status}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-black text-slate-900 text-lg">{rx.patient}</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{rx.doctor}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400">{rx.date}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <Button className="flex-1 rounded-xl bg-slate-900 text-white font-bold h-10 shadow-lg shadow-slate-900/10">
                                Verify Now
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
