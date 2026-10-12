import { ArrowIcon } from "@/components/ArrowIcon";
import { Metadata } from "next";
import Link from "next/link";
import { LeadershipSection } from "@/components/LeadershipSection";

export const metadata: Metadata = {
  title: "About CREATE | Creative Production Studio",
  description: "Learn about CREATE, a creative production studio focused on commercials, branded content, campaigns, and visual storytelling. Built by real people with creative and production experience.",
  keywords: ["creative production studio", "creative production company", "visual storytelling", "create leadership"]
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-bg text-brand-ink">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* We Are CREATE */}
        <div className="max-w-4xl mb-32 pt-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
            We Are CREATE.
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl mb-8">
            CREATE is a creative production studio focused on commercials, branded content, campaigns, and visual storytelling.
          </p>
          <p className="text-lg md:text-xl text-white/50 font-medium leading-relaxed max-w-3xl mb-8">
            Connect. Research. Execute. Assemble. Transform. Elevate.
          </p>
          <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed max-w-3xl">
            Our process brings research, creative direction, production, and execution together so the idea stays connected from the first conversation to the final frame.
          </p>
        </div>

        {/* What We Believe / How We Work */}
        <div className="grid md:grid-cols-2 gap-24 mb-32 border-t border-white/5 pt-24">
          <div className="group">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-red mb-8">What We Believe</h2>
            <div className="text-2xl md:text-3xl font-display font-medium leading-relaxed max-w-xl">
              Good creative starts with understanding. We want to know the brand, the audience, the brief, and the reason behind the work before we shape the idea.
            </div>
          </div>
          
          <div className="group">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-red mb-8">How We Work</h2>
            <div className="text-xl font-sans text-white/70 font-medium leading-relaxed max-w-xl">
              We connect first. We research the context. We develop the creative. We execute the work. We assemble the moving parts. We transform the idea into a finished experience. Then we elevate the details.
            </div>
          </div>
        </div>

        {/* The Leadership */}
        <LeadershipSection 
          sectionId="leadership" 
          className="py-0 px-0 bg-transparent border-t border-white/5 pt-24 mb-32" 
          containerClassName="" 
        />
        
        {/* Why CREATE Preview Link */}
        <div className="border-t border-white/5 pt-24 mb-32 max-w-4xl">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brand-red mb-8">Why CREATE</h2>
          <div className="text-xl md:text-2xl font-sans text-white/90 font-medium leading-relaxed mb-12">
            CREATE is built around the production of commercials, branded content, campaigns, and visual stories. 
            The website should support this positioning with real work, clear services, transparent project details, and verifiable proof.
          </div>
          <Link 
            href="/why-choose-us"
            className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-brand-red transition-colors"
          >
            Why Choose CREATE <ArrowIcon className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* CTA */}
        <div className="bg-[#050505] p-12 md:p-24 text-center border border-white/5">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Let's Create.</h2>
          <Link 
            href="/contact"
            className="inline-block bg-white text-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-red hover:text-white transition-colors rounded-full"
          >
            Start a Conversation
          </Link>
        </div>

      </div>
    </div>
  );
}


