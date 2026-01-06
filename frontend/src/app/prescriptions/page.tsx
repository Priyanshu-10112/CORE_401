"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    FileUp,
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    Microscope,
    Stethoscope,
    UploadCloud
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Zod schema for clinical validation
const prescriptionSchema = z.object({
    patientName: z.string().min(2, "Please enter the patient's full name."),
    doctorName: z.string().min(2, "Doctor's name is required."),
    hospitalName: z.string().min(2, "Clinic or Hospital name is required."),
    prescriptionFile: z.any().refine((files) => files?.length > 0, "Please select a photo of your prescription."),
});

type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

export default function PrescriptionPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PrescriptionFormValues>({
        resolver: zodResolver(prescriptionSchema),
    });

    const onSubmit = async (data: PrescriptionFormValues) => {
        setIsUploading(true);
        // Simulate clinical upload process
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsUploading(false);
        setIsSuccess(true);
        toast.success("Reception Received", {
            description: "We've got your prescription. Our pharmacists will call you shortly.",
        });
    };

    if (isSuccess) {
        return (
            <div className="min-h-[calc(100vh-5rem)] bg-slate-50 flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-xl w-full bg-white rounded-[3rem] p-12 text-center space-y-8 shadow-2xl shadow-slate-200/50 border border-slate-100"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="h-24 w-24 rounded-[2rem] bg-green-50 text-green-500 flex items-center justify-center mx-auto shadow-lg shadow-green-500/10"
                    >
                        <CheckCircle2 size={48} />
                    </motion.div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Got it!</h2>
                        <p className="text-slate-500 font-medium">Sit back and relax. We'll verify your prescription and pack your medicines within 30 minutes.</p>
                    </div>
                    <div className="pt-4 flex flex-col gap-4">
                        <Button size="lg" className="h-14 rounded-2xl font-black shadow-xl shadow-primary/20" onClick={() => setIsSuccess(false)}>
                            Upload Another Parchi
                        </Button>
                        <Button variant="ghost" className="h-14 rounded-2xl font-bold text-slate-500">
                            Go to My Dashboard
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-16 overflow-hidden">
            <div className="container mx-auto max-w-5xl px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Info Side */}
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest"
                            >
                                <ShieldCheck size={14} /> Indore's Trusted Pharmacy
                            </motion.div>
                            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                                Quick Upload <br />
                                <span className="text-primary italic text-6xl underline decoration-primary/20 underline-offset-8">Prescription.</span>
                            </h1>
                            <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-md">
                                Just upload a photo of your Doctor's Parchi (Slip). We'll handle the rest.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 space-y-3"
                            >
                                <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                    <Microscope size={24} />
                                </div>
                                <h4 className="font-black text-slate-900">Lab Tests?</h4>
                                <p className="text-xs text-slate-500 font-medium">We can also arrange home sample collection.</p>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 space-y-3"
                            >
                                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Stethoscope size={24} />
                                </div>
                                <h4 className="font-black text-slate-900">Doctor Support</h4>
                                <p className="text-xs text-slate-500 font-medium">Need clarification? We speak to your doctor directly.</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden perspective-1000"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100%] z-0" />

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Patient Name</label>
                                    <Input
                                        placeholder="e.g. Rahul Sharma"
                                        className="h-14 bg-slate-50 border-none rounded-2xl px-6 text-lg focus-visible:ring-1 focus-visible:ring-primary/20 transition-all hover:bg-slate-100"
                                        {...register("patientName")}
                                    />
                                    {errors.patientName && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1 ml-1"><AlertCircle size={12} /> {errors.patientName.message as string}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Doctor Name</label>
                                        <Input
                                            placeholder="Dr. Verma"
                                            className="h-14 bg-slate-50 border-none rounded-2xl px-6 text-lg focus-visible:ring-1 focus-visible:ring-primary/20 transition-all hover:bg-slate-100"
                                            {...register("doctorName")}
                                        />
                                        {errors.doctorName && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1 ml-1"><AlertCircle size={12} /> {errors.doctorName.message as string}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Clinic / Hospital</label>
                                        <Input
                                            placeholder="Apollo / Bombay Hospital"
                                            className="h-14 bg-slate-50 border-none rounded-2xl px-6 text-lg focus-visible:ring-1 focus-visible:ring-primary/20 transition-all hover:bg-slate-100"
                                            {...register("hospitalName")}
                                        />
                                        {errors.hospitalName && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1 ml-1"><AlertCircle size={12} /> {errors.hospitalName.message as string}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Upload Parchi (Photo or PDF)</label>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative group cursor-pointer"
                                    >
                                        <Input
                                            type="file"
                                            className="h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl file:hidden flex items-center justify-center text-transparent cursor-pointer group-hover:bg-slate-100 group-hover:border-primary/30 transition-all"
                                            {...register("prescriptionFile")}
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none space-y-2">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-primary">
                                                <UploadCloud className="h-5 w-5" />
                                            </div>
                                            <span className="text-slate-400 font-bold text-xs group-hover:text-primary transition-colors">Tap to Upload File</span>
                                        </div>
                                    </motion.div>
                                    {errors.prescriptionFile && (
                                        <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1 ml-1">
                                            <AlertCircle size={12} /> {errors.prescriptionFile.message as string}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isUploading}
                                className="w-full h-16 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20 group hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                {isUploading ? (
                                    <div className="flex items-center gap-2 italic">
                                        Checking details...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        Send Parchi Now <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-white to-transparent z-0 pointer-events-none" />
        </div>
    );
}
