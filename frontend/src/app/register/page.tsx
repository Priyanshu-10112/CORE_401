"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Pill, ShieldCheck, Activity, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { authService } from "@/lib/auth-service";
import { useAuthStore } from "@/lib/auth-store";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const registerSchema = z.object({
    name: z.string().min(2, "Full name is required."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [role, setRole] = useState("USER");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setIsSubmitting(true);
        try {
            console.log("Sending registration data:", { 
                name: data.name, 
                email: data.email, 
                role: role 
            });
            
            // Map frontend role to database role
            let dbRole = "USER"; // Default
            if (role === "USER") {
                dbRole = "USER";        // Customer
            } else if (role === "ADMIN") {
                dbRole = "STORE";       // Medical Store/Pharmacy Partner
            }
            
            const response = await authService.register(data.name, data.email, data.password, dbRole);
            
            console.log("Registration response:", response);
            
            // Check if response has the expected structure
            if (!response.user || !response.token) {
                throw new Error("Invalid response format from server");
            }
            
            login(response.user, response.token);
            toast.success("Account Created!", {
                description: `Swagat hai, ${response.user.name}. You are now a MedSetu member.`,
            });
            
            // Always redirect to home page after registration (same flow for all roles)
            router.push("/");
        } catch (error) {
            console.error("Registration error:", error);
            
            // More detailed error handling
            let errorMessage = "Something went wrong. Please check your details.";
            
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as any;
                if (axiosError.response?.data?.message) {
                    errorMessage = axiosError.response.data.message;
                } else if (axiosError.response?.status) {
                    errorMessage = `Server error: ${axiosError.response.status}`;
                }
            }
            
            toast.error("Sign Up Failed", {
                description: errorMessage,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-slate-50 flex items-center justify-center p-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-primary to-teal-500" />

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl shadow-slate-200 overflow-hidden min-h-[650px] perspective-1000">
                {/* Visual Side */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex relative bg-slate-900 p-16 flex-col justify-between overflow-hidden order-last"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl text-primary" />

                    <Link href="/" className="relative z-10 flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: -180 }}
                            className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white"
                        >
                            <Pill className="h-6 w-6" />
                        </motion.div>
                        <span className="text-2xl font-black tracking-tight text-white">
                            Med<span className="text-primary italic">Setu</span>
                        </span>
                    </Link>

                    <div className="relative z-10 space-y-6 text-right lg:text-left">
                        <h2 className="text-5xl font-black text-white leading-tight">Join the Family. <br /><span className="text-primary">Indore's Trusted.</span></h2>
                        <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-sm italic">
                            Register now for fast home delivery and exclusive discounts on medicines.
                        </p>
                        <div className="flex gap-4 pt-4 justify-end lg:justify-start">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest cursor-pointer"
                            >
                                <ShieldCheck className="h-4 w-4 text-primary" /> Secure
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest cursor-pointer"
                            >
                                <Activity className="h-4 w-4 text-primary" /> Fast
                            </motion.div>
                        </div>
                    </div>

                    <p className="relative z-10 text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 justify-end lg:justify-start">
                        ISO 27001 Certified Clinical Portal
                    </p>
                </motion.div>

                {/* Form Side */}
                <div className="p-12 md:p-16 flex flex-col justify-center">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full max-w-sm mx-auto space-y-8"
                    >
                        <div className="space-y-3">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create Account</h1>
                            <p className="text-slate-500 font-medium font-inter underline-offset-4">Get medicines delivered to your home in Indore.</p>
                        </div>

                        <Tabs defaultValue="USER" onValueChange={setRole} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 h-14 rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
                                <TabsTrigger value="USER" className="rounded-xl h-full font-black text-sm uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
                                    Customer
                                </TabsTrigger>
                                <TabsTrigger value="ADMIN" className="rounded-xl h-full font-black text-sm uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">
                                    Pharmacy Partner
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                <Input
                                    placeholder="e.g. Rahul Verma"
                                    className="h-12 bg-slate-50 border-none rounded-xl px-5 text-base focus-visible:ring-1 focus-visible:ring-primary/20 font-inter transition-all hover:bg-slate-100"
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1"><AlertCircle size={10} /> {errors.name.message as string}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="h-12 bg-slate-50 border-none rounded-xl px-5 text-base focus-visible:ring-1 focus-visible:ring-primary/20 font-inter transition-all hover:bg-slate-100"
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1"><AlertCircle size={10} /> {errors.email.message as string}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Create Password</label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-12 bg-slate-50 border-none rounded-xl px-5 text-base focus-visible:ring-1 focus-visible:ring-primary/20 font-inter transition-all hover:bg-slate-100"
                                        {...register("password")}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirm Password</label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-12 bg-slate-50 border-none rounded-xl px-5 text-base focus-visible:ring-1 focus-visible:ring-primary/20 font-inter transition-all hover:bg-slate-100"
                                        {...register("confirmPassword")}
                                    />
                                </div>
                                {(errors.password || errors.confirmPassword) && (
                                    <div className="col-span-2">
                                        <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                                            <AlertCircle size={10} /> {(errors.password?.message || errors.confirmPassword?.message) as string}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <Button disabled={isSubmitting} size="lg" className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 group hover:scale-[1.02] active:scale-[0.98] transition-all">
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2 italic">
                                        <Loader2 className="animate-spin h-5 w-5" /> Processing...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        Join MedSetu <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        <div className="text-center">
                            <p className="text-slate-500 font-medium text-sm mb-1 font-inter">Already a member?</p>
                            <Link href="/login" className="text-primary font-black hover:underline underline-offset-4 decoration-2 italic">Log in now</Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
