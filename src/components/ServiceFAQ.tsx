"use client";

import { useState } from "react";
import type { ServiceFAQ as FAQType } from "@/data/servicesData";

interface ServiceFAQProps {
  faqs: FAQType[];
  serviceName: string;
}

export function ServiceFAQ({ faqs, serviceName }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section 
      id="faq-section" 
      className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl scroll-mt-24"
      aria-labelledby="faq-heading"
    >
      <div className="border-t border-white/10 pt-16 md:pt-24">
        <div className="max-w-4xl mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-3">
            Questions &amp; Clarity
          </div>
          <h2 
            id="faq-heading" 
            className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-6"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 text-lg">
            Straightforward answers about how we approach {serviceName.toLowerCase()}, scope projects, and deliver creative work.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10 max-w-4xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const faqId = `faq-answer-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div 
                key={index} 
                className="group py-6 md:py-8 transition-colors duration-300"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                  className="w-full flex items-center justify-between text-left gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg py-1"
                >
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-white/90 group-hover:text-white transition-colors">
                    {faq.question}
                  </h3>
                  <span 
                    className={`shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? "bg-brand-red border-brand-red text-white rotate-45" 
                        : "text-white/60 group-hover:border-white group-hover:text-white"
                    }`}
                    aria-hidden="true"
                  >
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 14 14" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300"
                    >
                      <path 
                        d="M7 1V13M1 7H13" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  id={faqId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pt-5" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base md:text-lg text-white/70 font-sans leading-relaxed whitespace-pre-line pr-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
