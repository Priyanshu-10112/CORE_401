"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Pill, ShieldCheck, Truck, Activity, HeartPulse, Microscope } from "lucide-react";
import IndorePride from "@/components/special/IndorePride";

export default function Home() {
  const categories = [
    { name: "Prescription", icon: Activity, count: "1,200+ Products", color: "bg-teal-50 text-teal-600" },
    { name: "OTC Meds", icon: Pill, count: "800+ Products", color: "bg-blue-50 text-blue-600" },
    { name: "Vitamins", icon: HeartPulse, count: "450+ Products", color: "bg-green-50 text-green-600" },
    { name: "Devices", icon: Microscope, count: "200+ Products", color: "bg-slate-50 text-slate-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[400px] h-[400px] bg-teal-100/20 rounded-full blur-3xl" />

        <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-tight">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              LICENSED DIGITAL PHARMACY
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight"
            >
              Get Medicines <br />
              <span className="text-primary italic">At Your Home.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-[600px] text-lg md:text-xl text-slate-500 font-medium leading-relaxed"
            >
              Why wait at the chemist? Order verified medicines and health products. We deliver across Indore in 24 hours.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl shadow-xl shadow-primary/25 group transition-all duration-300 hover:scale-105" asChild>
                <Link href="/medicines">
                  Order Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-2xl border-2 hover:bg-slate-50 transition-all duration-300 hover:scale-105">
                Upload Prescription
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-600">
                <span className="text-primary">10k+</span> Trusted Customers
              </p>

              <div className="h-8 w-[1px] bg-slate-200 hidden lg:block" />

              <IndorePride />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="flex-1 w-full max-w-xl perspective-1000"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateX: [0, 2, 0],
                rotateY: [0, -2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative aspect-[4/5] sm:aspect-square bg-white rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white p-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-teal-500/5" />

              {/* Abstract 3D Medical Shapes / Visualization */}
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden bg-slate-50 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center opacity-[0.03]"
                >
                  <Pill size={400} />
                </motion.div>

                <div className="relative z-10 flex flex-col items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="h-32 w-32 rounded-3xl bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/20"
                  >
                    <Pill size={64} />
                  </motion.div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Genuine Care</h3>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Indore's Trusted Choice</p>
                  </div>
                </div>

                {/* Floating Labels */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute top-12 right-12 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl space-y-2 border border-white/50"
                >
                  <ShieldCheck className="text-primary h-8 w-8" />
                  <p className="font-black text-slate-900">Verified</p>
                  <p className="text-xs text-slate-500 font-bold">Clinical Grade</p>
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-12 left-12 bg-primary text-white p-6 rounded-3xl shadow-xl shadow-primary/20 space-y-2"
                >
                  <Truck className="h-8 w-8" />
                  <p className="font-black">Fast Dispatch</p>
                  <p className="text-xs text-white/80 font-bold">Across Indore</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
              <p className="text-slate-500 font-medium">Easily find what you need from our collection.</p>
            </div>
            <Button variant="ghost" className="text-primary font-bold">View All Categories</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href="/medicines" className="block group p-8 rounded-[2.5rem] bg-slate-50 hover:bg-white border border-transparent hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all h-full">
                  <div className={`h-16 w-16 rounded-2xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <cat.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{cat.name}</h3>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">{cat.count}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "Original Medicines", desc: "We only sell 100% original medicines, stored safely in our certified warehouse." },
            { icon: Truck, title: "Fast Home Delivery", desc: "Get your medicines delivered the same day in most parts of Indore." },
            { icon: HeartPulse, title: "Talk to Pharmacist", desc: "Our friendly pharmacists are here to help with your prescription 24/7." }
          ].map((badge, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex gap-6 items-start p-4 hover:bg-slate-50 rounded-3xl transition-colors"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                <badge.icon size={28} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900">{badge.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto pb-24 px-4">
        <motion.div
          whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-slate-900 overflow-hidden p-12 md:p-20 text-center space-y-8"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
          <h2 className="relative z-10 text-3xl md:text-5xl font-black text-white leading-tight">
            Ready to Take Control of <br /> Your Health?
          </h2>
          <p className="relative z-10 text-slate-400 text-lg font-medium max-w-xl mx-auto">
            Experience the future of healthcare in Indore. Swift, safe, and always reliable.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 text-lg font-black rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-black border-slate-700 bg-transparent text-white hover:bg-slate-800 rounded-2xl transition-all hover:scale-105 active:scale-95">
              Browse Medicines
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
