"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Pill, Activity, ShieldCheck, Loader2, AlertCircle, ArrowRight, User, Store, ShieldAlert } from "lucide-react";
import { authService } from "@/lib/auth-service";
import { useAuthStore } from "@/lib/auth-store";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type UserRole = 'customer' | 'store' | 'admin';

export default function LoginPage() {
    const router = useRouter();
    const { login, logout, isAuthenticated, isInitialized, initialize, user } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [role, setRole] = useState<UserRole>('customer');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // Clear any existing auth and form data on mount
    useEffect(() => {
        // Initialize auth store
        if (!isInitialized) {
            initialize();
        }
        
        // If user is already authenticated, redirect them based on role
        if (isInitialized && isAuthenticated) {
            console.log("Login Page - User already authenticated, redirecting based on role:", user?.role);
            
            if (user?.role === 'USER') {
                router.push('/');
            } else if (user?.role === 'STORE') {
                router.push('/admin');
            } else if (user?.role === 'PLATFORM_ADMIN') {
                router.push('/platform-admin');
            } else {
                router.push('/');
            }
            return;
        }
        
        // Clear any stale auth data first
        logout();
        
        // Reset form to ensure clean state
        reset({
            email: '',
            password: ''
        });
        
    }, [isAuthenticated, isInitialized, user?.role, router, reset, logout, initialize]);

    const onSubmit = async (data: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await authService.login(data.email, data.password);
            console.log("Login Response:", response);
            
            login(response.user, response.token);

            toast.success("Login Successful", {
                description: `Welcome back, ${response.user.name}.`,
            });

            // Role-based redirection using the ACTUAL user role from database
            const userRole = response.user.role;
            console.log("User Role for Redirection:", userRole);
            
            // Add a small delay to ensure auth state is updated
            setTimeout(() => {
                if (userRole === 'USER') {
                    console.log("Redirecting to home for USER");
                    router.push("/"); // Customer goes to home
                } else if (userRole === 'STORE') {
                    console.log("Redirecting to admin for STORE");
                    router.push("/admin"); // Medical store goes to admin dashboard
                } else if (userRole === 'PLATFORM_ADMIN') {
                    console.log("Redirecting to platform-admin for PLATFORM_ADMIN");
                    router.push("/platform-admin"); // Platform admin goes to platform dashboard
                } else {
                    console.log("Unknown role, redirecting to home:", userRole);
                    router.push("/"); // Default to home
                }
            }, 200); // Small delay to ensure auth state is updated
            
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Authentication Failed", {
                description: "Incorrect credentials. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const roles = [
        { id: 'customer', label: 'Customer', icon: User },
        { id: 'store', label: 'Medical Store', icon: Store },
        { id: 'admin', label: 'Admin', icon: ShieldAlert },
    ];

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-slate-50 flex items-center justify-center p-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-primary to-teal-500" />

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl shadow-slate-200 overflow-hidden min-h-[700px] perspective-1000">
                {/* Visual Side */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex relative bg-slate-900 p-16 flex-col justify-between overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl text-primary" />

                    <Link href="/" className="relative z-10 flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white"
                        >
                            <Pill className="h-6 w-6" />
                        </motion.div>
                        <span className="text-2xl font-black tracking-tight text-white">
                            Med<span className="text-primary italic">Setu</span>
                        </span>
                    </Link>

                    <div className="relative z-10 space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={role}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-5xl font-black text-white leading-tight">
                                    {role === 'customer' && <>Genuine Care, <br /><span className="text-primary">Indore Style.</span></>}
                                    {role === 'store' && <>Manage Your <br /><span className="text-primary">Pharmacy.</span></>}
                                    {role === 'admin' && <>Platform <br /><span className="text-primary">Control.</span></>}
                                </h2>
                                <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-sm italic mt-4">
                                    {role === 'customer' && "Log in to order medicines, book tests, and consult locally trusted doctors."}
                                    {role === 'store' && "Access inventory, manage purchase orders, and track your daily earnings."}
                                    {role === 'admin' && "System-wide controls and analytics for MedSetu administrators."}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex gap-4 pt-4">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest cursor-pointer"
                            >
                                <ShieldCheck className="h-4 w-4 text-primary" /> Verified
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest cursor-pointer"
                            >
                                <Activity className="h-4 w-4 text-primary" /> Clinical
                            </motion.div>
                        </div>
                    </div>

                    <p className="relative z-10 text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        Trusted by thousands of families in Indore
                    </p>
                </motion.div>

                {/* Form Side */}
                <div className="p-12 md:p-20 flex flex-col justify-center">
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full max-w-sm mx-auto space-y-10"
                    >
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
                            <p className="text-slate-500 font-medium">Select your portal to continue.</p>
                        </div>

                        {/* Role Information - Shows available portals */}
                        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl">
                            {roles.map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => setRole(r.id as UserRole)}
                                    className={`relative flex flex-col items-center justify-center py-3 rounded-xl transition-all ${role === r.id ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:bg-slate-200/50"
                                        }`}
                                >
                                    <r.icon size={20} className="mb-1" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{r.label}</span>
                                    {role === r.id && (
                                        <motion.div
                                            layoutId="activeRole"
                                            className="absolute inset-0 border-2 border-primary/10 rounded-xl"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 text-center">
                            Your account role determines which dashboard you'll access after login.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    data-form-type="other"
                                    className="h-14 bg-slate-50 border-none rounded-2xl px-6 text-lg focus-visible:ring-1 focus-visible:ring-primary/20 transition-all hover:bg-slate-100"
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1 ml-1"><AlertCircle size={12} /> {errors.email.message as string}</p>}
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Password</label>
                                    <button type="button" className="text-[10px] font-black uppercase text-primary tracking-tighter hover:underline">Forgot Password?</button>
                                </div>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    data-form-type="other"
                                    className="h-14 bg-slate-50 border-none rounded-2xl px-6 text-lg focus-visible:ring-1 focus-visible:ring-primary/20 transition-all hover:bg-slate-100"
                                    {...register("password")}
                                />
                                {errors.password && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1 ml-1"><AlertCircle size={12} /> {errors.password.message as string}</p>}
                            </div>
                            <Button disabled={isSubmitting} size="lg" className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 group hover:scale-[1.02] active:scale-[0.98] transition-all">
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2 italic">
                                        <Loader2 className="animate-spin h-5 w-5" /> Verifying...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        Login as {role === 'store' ? 'Partner' : role === 'admin' ? 'Admin' : 'Customer'} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        <div className="text-center pt-4">
                            <p className="text-slate-500 font-medium mb-1">New to MedSetu?</p>
                            <Link href="/register" className="text-primary font-black hover:underline underline-offset-4 decoration-2">Create an Account</Link>
                            
                            {/* Debug: Clear Storage Button */}
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Clear all storage
                                        localStorage.clear();
                                        sessionStorage.clear();
                                        
                                        // Clear form fields manually
                                        const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                                        const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
                                        
                                        if (emailInput) {
                                            emailInput.value = '';
                                            emailInput.defaultValue = '';
                                        }
                                        if (passwordInput) {
                                            passwordInput.value = '';
                                            passwordInput.defaultValue = '';
                                        }
                                        
                                        // Reset form
                                        reset({
                                            email: '',
                                            password: ''
                                        });
                                        
                                        // Show success message
                                        toast.success("All data cleared!");
                                        
                                        // Reload page
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 500);
                                    }}
                                    className="text-xs text-slate-400 hover:text-slate-600 underline"
                                >
                                    🗑️ Clear All Data & Refresh
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
