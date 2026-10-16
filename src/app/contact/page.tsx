"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", website: "",
    projectType: "", budget: "", message: "", _gotcha: ""
  , consent: false });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 1500); // Faster intro for premium feel
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("SUBMITTING");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Submission failed");
        }
      
      setStatus("SUCCESS");
    } catch (error) {
      console.error(error);
      setStatus("ERROR");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink flex items-center justify-center px-6 md:px-12 relative overflow-hidden pt-32 pb-24">
      
      {/* Intro Transition */}
      <AnimatePresence>
        {!showForm && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-display font-bold text-center tracking-tight text-balance max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Let's Create Something Worth Watching.
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Form Section */}
      <motion.div 
        className="w-full max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: showForm ? 1 : 0, y: showForm ? 0 : 40 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Intro */}
          <div className="lg:col-span-5 sticky top-32">
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-8 leading-tight">
              Let's Create Something Worth Watching.
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-medium mb-6 leading-relaxed">
              Tell us what you're building.
            </p>
            <p className="text-white/50 text-lg leading-relaxed">
              We'll bring the research, creative thinking, production, and execution together to help turn the idea into finished work.
            </p>
          </div>

          {/* Right Column: Form and Contact Details */}
          <div className="lg:col-span-7 bg-[#050505] p-5 sm:p-8 md:p-16 border border-white/5 relative">
            
            <div className="mb-16 pb-12 border-b border-white/10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-red mb-8">Start a Conversation</h2>
              
              <div className="grid sm:grid-cols-2 gap-8 text-lg font-medium">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Email</div>
                  <a href="mailto:createforbrands@gmail.com" className="hover:text-brand-red transition-colors">createforbrands@gmail.com</a>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Phone</div>
                  <a href="tel:+919811005532" className="hover:text-brand-red transition-colors">+91 98110 05532</a>
                </div>
              </div>
            </div>

            <p className="text-white/60 mb-12 text-lg">Tell us about the project, what you need, and where you are in the process.</p>

            {status === "SUCCESS" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
                className="flex flex-col items-center justify-center text-center py-24"
              >
                <div className="w-20 h-20 bg-brand-red text-white rounded-full flex items-center justify-center text-3xl mb-8 shadow-lg shadow-brand-red/20">✓</div>
                <h3 className="text-3xl font-display font-bold tracking-tight mb-4">Got it. Your project is with us.</h3>
                <p className="text-lg text-white/60">We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {status === "ERROR" && (
                  <div className="p-4 bg-brand-red/10 border border-brand-red/50 text-brand-red text-sm text-center">
                    {errorMessage || "We encountered an issue submitting your request. Please email us directly at createforbrands@gmail.com."}
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/50">Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#111] border border-white/10 px-4 py-3 focus:outline-none focus:border-brand-red transition-colors text-white text-base" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/50">Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-[#111] border border-white/10 px-4 py-3 focus:outline-none focus:border-brand-red transition-colors text-white text-base" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/50">Email *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#111] border border-white/10 px-4 py-3 focus:outline-none focus:border-brand-red transition-colors text-white text-base" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/50">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#111] border border-white/10 px-4 py-3 focus:outline-none focus:border-brand-red transition-colors text-white text-base" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/50">Website</label>
                    <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full bg-[#111] border border-white/10 px-4 py-3 focus:outline-none focus:border-brand-red transition-colors text-white text-base" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/50">Project Type</label>
                    <input type="text" name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-[#111] border border-white/10 px-4 py-3 focus:outline-none focus:border-brand-red transition-colors text-white text-base" placeholder="e.g. Commercial, Campaign..." />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/50">Budget</label>
                  <input type="text" name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-[#111] border border-white/10 px-4 py-3 focus:outline-none focus:border-brand-red transition-colors text-white text-base" placeholder="What is the expected scope?" />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/50">Project Details *</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-[#111] border border-white/10 px-4 py-3 focus:outline-none focus:border-brand-red transition-colors text-white text-base resize-none" placeholder="Tell us about the goals and creative direction..."></textarea>
                </div>

                {/* Honeypot — invisible to real users, catches bots */}
                <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="_gotcha">Do not fill this</label>
                  <input type="text" id="_gotcha" name="_gotcha" value={formData._gotcha} onChange={handleChange} autoComplete="off" tabIndex={-1} />
                </div>

                <div className="flex items-start gap-4 mt-6">
                  <input required type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleChange} className="mt-1 accent-brand-red w-4 h-4 cursor-pointer" />
                  <label htmlFor="consent" className="text-sm text-white/70 leading-relaxed cursor-pointer">
                    We collect your name, email address and message to respond to your enquiry. By submitting this form, you consent to this processing as described in our <Link href="/privacy" className="text-brand-red hover:underline">Privacy Policy</Link>.
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "SUBMITTING"}
                  className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-brand-red hover:text-white transition-all duration-300 disabled:opacity-50 mt-4 rounded-none"
                >
                  {status === "SUBMITTING" ? "Sending..." : "Start a Conversation"}
                </button>
              </form>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
