"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowIcon } from "@/components/ArrowIcon";

export function ShivaCampaignCaseStudy() {
  const [activeTab, setActiveTab] = useState<"creators" | "community">("creators");

  const reels = [
    {
      title: "Shiva Immersive Reel 1",
      creator: "Siya (Music-Led Cut)",
      url: "https://www.instagram.com/reel/DdEaYGZJtdM/",
      thumbnail: null,
      tag: "Music-Led Visuals"
    },
    {
      title: "Shiva Immersive Reel 2",
      creator: "Ravi Dixit (Emotional Voiceover)",
      url: "https://www.instagram.com/reel/DdHNNxMhDTi/",
      thumbnail: null,
      tag: "Emotional Voiceover"
    },
    {
      title: "Shiva Immersive Reel 3",
      creator: "Abhishek Khanduja (Explainer)",
      url: "https://www.instagram.com/reel/DdEfxbtgt2B/",
      thumbnail: null,
      tag: "Talking-Head Explainer"
    },
    {
      title: "Shiva Immersive Reel 4",
      creator: "Apna.delhii (Community Reel)",
      url: "https://www.instagram.com/reel/DdMcOrNOzeM/",
      thumbnail: null,
      tag: "Community Page"
    }
  ];

  const influencerRankings = [
    { creator: "Ravi Dixit", reach: "1,19,000", ratio: "1.22×", cpm: "₹59", format: "Emotional Voiceover" },
    { creator: "Abhishek Khanduja", reach: "1,55,000", ratio: "0.39×", cpm: "₹65", format: "Talking-Head Explainer" },
    { creator: "Siya (Music clips)", reach: "2,37,000", ratio: "0.88×", cpm: "₹84", format: "Music-Led Experience" },
    { creator: "Shammi", reach: "2,50,000", ratio: "0.46×", cpm: "₹120", format: "Talking-Head Explainer" },
    { creator: "Prince Tomar", reach: "2,06,000", ratio: "0.83×", cpm: "₹136", format: "Family Outing Vlog" },
    { creator: "Aryan Singh", reach: "1,10,000", ratio: "1.05×", cpm: "₹164", format: "Dressed-Up Event Vlog" },
    { creator: "Siya (Explainer)", reach: "2,37,000", ratio: "0.88×", cpm: "₹169", format: "Walkthrough Explainer" },
    { creator: "Raman", reach: "1,41,000", ratio: "0.67×", cpm: "₹248", format: "Talking-Head Explainer" },
    { creator: "Delhi Travel Blogger", reach: "95,600", ratio: "0.80×", cpm: "₹272", format: "Site-Visit Reel" },
    { creator: "Rishab", reach: "78,400", ratio: "0.80×", cpm: "₹319", format: "Talking-Head Explainer" },
    { creator: "Pooja Gupta", reach: "1,05,000", ratio: "1.01×", cpm: "₹333", format: "Family Outing Vlog" },
    { creator: "Aafreen Sheikh", reach: "61,200", ratio: "0.27×", cpm: "₹523", format: "Site-Visit Reel" },
    { creator: "Shumylaa", reach: "10,000", ratio: "0.37×", cpm: "₹800", format: "Site-Visit Reel (Audio issue)" },
    { creator: "Ummey Khansa", reach: "13,200", ratio: "0.05×", cpm: "₹1,515", format: "Light-Hearted Fun Vlog" }
  ];

  const communityPages = [
    { page: "Apna.delhii", format: "Music reel", followers: "57.1K", fee: "₹10,000", reach: "4,11,000", ratio: "7.20×", cpm: "₹24", comments: 585 },
    { page: "unseennoida", format: "Anchored reel", followers: "1.74L", fee: "₹25,000", reach: "53,100", ratio: "0.31×", cpm: "₹471", comments: 220 },
    { page: "Noida Gyan", format: "Reel + 2 stories", followers: "3.27L", fee: "₹28,000", reach: "55,100", ratio: "0.17×", cpm: "₹508", comments: 5 },
    { page: "What’s Up Gurgaon", format: "Collab carousel", followers: "1.81L", fee: "₹12,000", reach: "~0†", ratio: "—", cpm: "—", comments: 5 },
    { page: "What’s Up Noida", format: "Collab carousel", followers: "1.13L", fee: "₹10,000", reach: "~1,000†", ratio: "—", cpm: "—", comments: 5 },
    { page: "What’s Up New Delhi", format: "Collab carousel", followers: "98.2K", fee: "₹7,000", reach: "~1,000†", ratio: "—", cpm: "—", comments: 5 },
    { page: "Apna.delhii", format: "Explainer carousel", followers: "57.1K", fee: "₹5,000", reach: "~0†", ratio: "—", cpm: "—", comments: 4 }
  ];

  return (
    <section id="campaign-report" className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl scroll-mt-28">
      <div className="border-t border-white/10 pt-20">
        
        {/* Section Tag & Main Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-bold uppercase tracking-widest mb-6">
              <span>Verified Campaign Report</span>
              <span>•</span>
              <span>Section 01 & 02 Evaluation</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white mb-6">
              Shiva Immersive Experience
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-sans font-medium leading-relaxed">
              Week 1 Influencer Campaign Report · GIP Mall, Noida. A comprehensive audit of return on investment, creator efficiency, and creative craft across 22 creators and 23.4 lakh accounts reached.
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-start md:items-end gap-2 text-sm text-white/50">
            <span className="font-bold text-white uppercase tracking-wider">Venue: GIP Mall, Noida</span>
            <span>Evaluation: Live Week 1 Deliverables</span>
            <span>Reporting: Prepared by CREATE</span>
          </div>
        </div>

        {/* 1. Results Grid (Week 1 in Six Numbers) */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-brand-red font-display text-lg font-bold">00</span>
            <h3 className="text-xl font-display font-bold uppercase tracking-widest text-white">
              Week 1 In Six Numbers
            </h3>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 bg-[#0D0D0D] border border-white/10 rounded-xl relative overflow-hidden group hover:border-brand-red transition-colors">
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">
                22
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-brand-red mb-2">Creators Engaged</div>
              <p className="text-sm text-white/60 leading-relaxed">
                15 individual creators and 7 Noida / Delhi NCR local community discovery pages.
              </p>
            </div>

            <div className="p-8 bg-[#0D0D0D] border border-white/10 rounded-xl relative overflow-hidden group hover:border-brand-red transition-colors">
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">
                21 <span className="text-xl text-white/40 font-normal">of 23</span>
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-brand-red mb-2">Live Posts Counted</div>
              <p className="text-sm text-white/60 leading-relaxed">
                21 live posts evaluated in reported metrics (Vineet Singh and Ayushi Dixit delivered with reach reporting pending).
              </p>
            </div>

            <div className="p-8 bg-[#0D0D0D] border border-white/10 rounded-xl relative overflow-hidden group hover:border-brand-red transition-colors">
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">
                ₹4.84 L
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-brand-red mb-2">Creator Media Spend</div>
              <p className="text-sm text-white/60 leading-relaxed">
                Direct creator spend across all 22 collaborators (before CREATE’s 20% management fee).
              </p>
            </div>

            <div className="p-8 bg-[#0D0D0D] border border-white/10 rounded-xl relative overflow-hidden group hover:border-brand-red transition-colors">
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">
                23.4 L
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-brand-red mb-2">Total Accounts Reached</div>
              <p className="text-sm text-white/60 leading-relaxed">
                18.2 L organic reach generated by individual influencers; 5.2 L generated by community channels.
              </p>
            </div>

            <div className="p-8 bg-[#0D0D0D] border border-white/10 rounded-xl relative overflow-hidden group hover:border-brand-red transition-colors">
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">
                1,665
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-brand-red mb-2">Comments Generated</div>
              <p className="text-sm text-white/60 leading-relaxed">
                Triggered <span className="text-white font-semibold">1,561 ticket-link DMs</span> across 16 posts running keyword auto-reply automation.*
              </p>
            </div>

            <div className="p-8 bg-[#0D0D0D] border border-white/10 rounded-xl relative overflow-hidden group hover:border-brand-red transition-colors">
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-3 tracking-tight">
                ₹184
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/80 mb-2">Cost / 1,000 Accounts Reached</div>
              <p className="text-sm text-white/60 leading-relaxed">
                Blended CPM based on ₹4.84 L creator spend across all counted live posts.
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-white/40 italic">
            * Note on direct message automation: The 1,561 automated DMs represent high-intent link delivery triggered by visitor keyword comments; DMs reflect active funnel interest and do not represent verified ticket sales.
          </div>
          <div className="mt-3 text-xs text-white/50 leading-relaxed border-t border-white/5 pt-3">
            <strong className="text-white/80">Financial & Fee Allocation:</strong> Net creator media spend was ₹4,84,000 (79% to individual influencers, 21% to regional community pages) with a 20% CREATE management fee of ₹96,800 (campaign total ₹5,80,800). A separate branding engagement was billed at ₹35,000 (total billed ₹6,15,800). All delivery efficiency metrics are calculated strictly against net creator spend.
          </div>
        </div>

        {/* Creator Performance Rankings & Community Audit */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-brand-red font-display text-sm font-bold">01 ROI</span>
                <span className="text-white/40">•</span>
                <span className="text-xs uppercase tracking-widest font-bold text-white/70">Granular Post Audit</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                Creator & Community Performance
              </h3>
            </div>
            
            {/* Filter Toggle */}
            <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-full">
              <button
                onClick={() => setActiveTab("creators")}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeTab === "creators" ? "bg-brand-red text-white" : "text-white/60 hover:text-white"
                }`}
              >
                Influencers Ranked by CPM
              </button>
              <button
                onClick={() => setActiveTab("community")}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeTab === "community" ? "bg-brand-red text-white" : "text-white/60 hover:text-white"
                }`}
              >
                Community Pages Breakdown
              </button>
            </div>
          </div>

          {activeTab === "creators" ? (
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden p-6 md:p-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                      <th className="py-4 px-4">Creator</th>
                      <th className="py-4 px-4">Content Format</th>
                      <th className="py-4 px-4 text-right">Accounts Reached</th>
                      <th className="py-4 px-4 text-right">Reach ÷ Followers</th>
                      <th className="py-4 px-4 text-right font-bold text-brand-red">Cost / 1K Reach</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans text-sm">
                    {influencerRankings.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-white">{row.creator}</td>
                        <td className="py-3.5 px-4 text-white/60">{row.format}</td>
                        <td className="py-3.5 px-4 text-right font-mono text-white/90">{row.reach}</td>
                        <td className="py-3.5 px-4 text-right font-mono text-white/70">{row.ratio}</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-brand-red">{row.cpm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-white/40 italic">
                * Note: Vineet Singh and Ayushi Dixit are not included above as verified reach figures had not been reported at the time of report cutoff.
              </p>
            </div>
          ) : (
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden p-6 md:p-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                      <th className="py-4 px-4">Page Handle</th>
                      <th className="py-4 px-4">Format</th>
                      <th className="py-4 px-4 text-right">Followers</th>
                      <th className="py-4 px-4 text-right">Fee</th>
                      <th className="py-4 px-4 text-right">Reach</th>
                      <th className="py-4 px-4 text-right">Cost / 1K</th>
                      <th className="py-4 px-4 text-right">Comments</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans text-sm">
                    {communityPages.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-white">{row.page}</td>
                        <td className="py-3.5 px-4 text-white/60">{row.format}</td>
                        <td className="py-3.5 px-4 text-right text-white/70 font-mono">{row.followers}</td>
                        <td className="py-3.5 px-4 text-right text-white/70 font-mono">{row.fee}</td>
                        <td className="py-3.5 px-4 text-right text-white font-mono font-medium">{row.reach}</td>
                        <td className="py-3.5 px-4 text-right text-brand-red font-mono font-bold">{row.cpm}</td>
                        <td className="py-3.5 px-4 text-right text-white font-mono font-semibold">{row.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-white/40 italic">
                † Instagram reported near-zero organic delivery for static carousels. The four community carousels combined cost ₹34,000 and reached only roughly 2,000 accounts.
              </p>
            </div>
          )}
        </div>

        {/* 5. What Worked vs. What Did Not Work (Section 02 Learnings) */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-brand-red font-display text-sm font-bold">02 LEARNINGS</span>
            <span className="text-white/40">•</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
              Tactical Performance Audit
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* What Worked */}
            <div className="p-8 md:p-10 bg-[#0A0A0A] border border-white/10 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <h4 className="text-2xl font-display font-bold text-white">What Worked</h4>
                </div>
                
                <div className="space-y-6">
                  <div className="border-t border-white/5 pt-4">
                    <h5 className="text-lg font-display font-bold text-white mb-1">
                      A Music Reel on a Community Page
                    </h5>
                    <p className="text-sm text-white/70 leading-relaxed">
                      <strong className="text-white">Apna.delhii</strong> reached 7.2× its 57K followers with 585 comments for ₹10,000 spend. This single reel delivered <strong className="text-white">18% of total campaign reach</strong> from only 2% of the budget, at an unmatched <strong className="text-brand-red">₹24 per 1,000 accounts</strong>.
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <h5 className="text-lg font-display font-bold text-white mb-1">
                      Emotional Voiceover Storytelling
                    </h5>
                    <p className="text-sm text-white/70 leading-relaxed">
                      <strong className="text-white">Ravi Dixit</strong> reached 1.22× his follower count at <strong className="text-brand-red">₹59 per 1,000</strong> and drew 116 high-intent comments. Heartfelt, detailed personal narration held viewer attention even where microphone audio was standard.
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <h5 className="text-lg font-display font-bold text-white mb-1">
                      Talking-Head Explainers, Given Time
                    </h5>
                    <p className="text-sm text-white/70 leading-relaxed">
                      <strong className="text-white">Abhishek Khanduja</strong> achieved ₹65 per 1,000 with 100 comments, while <strong className="text-white">Shammi</strong> generated 2.50 L reach. Plainly breaking down the show’s structure and what visitors experience converts passive curiosity into direct questions.
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <h5 className="text-lg font-display font-bold text-white mb-1">
                      Music-Led Experience Clips
                    </h5>
                    <p className="text-sm text-white/70 leading-relaxed">
                      <strong className="text-white">Siya</strong> reached 2.37 L accounts at <strong className="text-brand-red">₹84 per 1,000</strong>. Strong devotional song choices, rhythmic pacing, and editing cuts synced on the beat allowed the immersive visuals to speak for themselves.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What Did Not Work */}
            <div className="p-8 md:p-10 bg-[#0A0A0A] border border-white/10 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-brand-red"></div>
                  <h4 className="text-2xl font-display font-bold text-white">What Did Not Work</h4>
                </div>

                <div className="space-y-6">
                  <div className="border-t border-white/5 pt-4">
                    <h5 className="text-lg font-display font-bold text-white mb-1">
                      Static Carousels
                    </h5>
                    <p className="text-sm text-white/70 leading-relaxed">
                      ₹34,000 spent across four carousels yielded roughly 2,000 accounts reached. Multi-slide text and image carousels lacked an immediate visual hook to stop user scroll in feeds.
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <h5 className="text-lg font-display font-bold text-white mb-1">
                      Light-Hearted Fun Vlogs
                    </h5>
                    <p className="text-sm text-white/70 leading-relaxed">
                      At <strong className="text-brand-red">₹1,515 per 1,000 reach</strong> and 0.05× follower ratio, comedy and light-hearted formats performed weakest. A playful, humorous tone conflicted with a sacred, devotional exhibition.
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <h5 className="text-lg font-display font-bold text-white mb-1">
                      Paying for Follower Count Over Audience Fit
                    </h5>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Large follower accounts underperformed: <strong className="text-white">Noida Gyan</strong> (3.27 L followers) reached 55K and <strong className="text-white">Ummey Khansa</strong> (2.68 L) reached only 13.2K. In contrast, <strong className="text-white">Ravi Dixit</strong> (97K followers) reached 1.19 L. Fees must be priced on verified median reel reach, not follower volume.
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <h5 className="text-lg font-display font-bold text-white mb-1">
                      High-Cost Generic Site-Visit Reels
                    </h5>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Noida Gyan and unseennoida cost ₹471–₹508 per 1,000. However, <strong className="text-white">unseennoida</strong> earned value through 220 sincere devotional comments from a localized Noida audience with genuine physical access to GIP Mall.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 6. Content Craft Notes */}
        <div className="mb-24 p-8 md:p-12 bg-[#0A0A0A] border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-red font-display text-sm font-bold">02 LEARNINGS</span>
            <span className="text-white/40">•</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
              Craft Notes From Reviewing Every Edit
            </h3>
          </div>
          <p className="text-sm text-white/60 mb-8 max-w-2xl">
            Detailed video production findings extracted from editorial reviews across all 21 live video submissions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">01. The Hook</div>
              <h4 className="text-base font-display font-bold text-white mb-2">First 2 Seconds Rule</h4>
              <p className="text-sm text-white/60 leading-relaxed mb-3">
                Posts with an immediate opening beat (Pooja Gupta, Apna.delhii) arrested drop-off. Carousels had none.
              </p>
              <div className="text-xs font-semibold text-white/90 border-t border-white/10 pt-2">
                Mandatory opening hook within the first 2 seconds on every video.
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">02. Voiceover</div>
              <h4 className="text-base font-display font-bold text-white mb-2">Detail Beats Polish</h4>
              <p className="text-sm text-white/60 leading-relaxed mb-3">
                Substantive personal narrative carried reels even with average audio; poor audio heavily damaged distribution (Shumylaa).
              </p>
              <div className="text-xs font-semibold text-white/90 border-t border-white/10 pt-2">
                Enforce dedicated mic briefing; story depth outweighs studio sheen.
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">03. Music Selection</div>
              <h4 className="text-base font-display font-bold text-white mb-2">Rhythmic Audio Cutting</h4>
              <p className="text-sm text-white/60 leading-relaxed mb-3">
                Devotional song selections combined with cuts locked to the musical beat elevated Siya and Apna.delhii.
              </p>
              <div className="text-xs font-semibold text-white/90 border-t border-white/10 pt-2">
                Set music-led rhythmic edits as the baseline production standard.
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">04. Captions & Titles</div>
              <h4 className="text-base font-display font-bold text-white mb-2">Short On-Screen Headings</h4>
              <p className="text-sm text-white/60 leading-relaxed mb-3">
                Full-dialogue subtitles created clutter over visual projections.
              </p>
              <div className="text-xs font-semibold text-white/90 border-t border-white/10 pt-2">
                Use clean on-screen segment markers: experience, location, duration.
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl md:col-span-2 lg:col-span-2">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">05. Call To Action</div>
              <h4 className="text-base font-display font-bold text-white mb-2">Keyword Automation DM Funnel</h4>
              <p className="text-sm text-white/60 leading-relaxed mb-3">
                Directives like <em className="text-white">“Comment SHIVA and I’ll DM the link”</em> successfully converted engagement into 1,561 ticket-link DMs across the 16 posts running auto-reply integration.
              </p>
              <div className="text-xs font-semibold text-white/90 border-t border-white/10 pt-2">
                Incorporate structured keyword CTA with automated DM distribution on all acquisition posts.
              </div>
            </div>
          </div>
        </div>

        {/* 7. Brand Messaging & Audience Feedback */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-brand-red font-display text-sm font-bold">02 LEARNINGS</span>
            <span className="text-white/40">•</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
              Brand Messaging & Audience Commentary
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* For Messaging */}
            <div className="p-8 md:p-10 bg-[#0A0A0A] border border-white/10 rounded-2xl">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-3">
                Strategic Narrative Directives
              </div>
              <h4 className="text-2xl font-display font-bold text-white mb-6">
                Critical Messaging Framework
              </h4>

              <div className="space-y-6">
                <div className="border-t border-white/5 pt-4">
                  <div className="text-base font-bold text-white mb-1">
                    Say “Experience”, Never “Mythology”
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    To devotees, Shiva represents living faith and reverence. Describing sacred narratives as “mythology” triggered public pushback in comment threads (<em className="text-white/90">“Remove mythology from your caption”</em>). Copy must reference the <strong className="text-white">“Shiva Immersive Experience”</strong> and spiritual storytelling.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="text-base font-bold text-white mb-1">
                    Show the Real Walkthrough Format
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Creative content must clearly showcase the actual 45-minute standing, walkthrough projection installation. Setting transparent visual expectations prevents visitors from expecting a seated cinema auditorium.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="text-base font-bold text-white mb-1">
                    Unify Show Duration and Ticket Pricing
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Visitor comments reflected discrepancies regarding runtime and ticket prices compared to official briefs (45 min, ₹800–₹1,000). Creator briefings require strict alignment on pricing and timings.
                  </p>
                </div>
              </div>
            </div>

            {/* Audience Reaction */}
            <div className="p-8 md:p-10 bg-[#0A0A0A] border border-white/10 rounded-2xl">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-3">
                Audience Intelligence
              </div>
              <h4 className="text-2xl font-display font-bold text-white mb-6">
                What The Audience Said In Comments
              </h4>

              <div className="space-y-6">
                <div className="border-t border-white/5 pt-4">
                  <div className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    Active Purchase Intent
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    High volume of booking queries: <em className="text-white">“Link please”</em> and family logistics like <em className="text-white">“Can I take my 1.5-month-old baby?”</em>, signaling ready-to-book local visitors.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-1">
                    Organic Devotional Sentiment
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Widespread devotional comments (<em className="text-white">“Har Har Mahadev”</em>, <em className="text-white">“Om Namah Shivaya”</em>) drove organic algorithmic momentum and positive comment section energy.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="text-sm font-bold uppercase tracking-wider text-brand-red mb-1">
                    Post-Visit Reality Feedback
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Attendees shared recurring observations regarding ticket pricing relative to show duration, peak-time crowding without seating, and an appetite for broader narrative depth beyond the Samudra Manthan chapter.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 8. Live Reels Showcase */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">
                Live Campaign Assets
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                Featured Shiva Immersive Reels
              </h3>
            </div>
            <p className="text-xs text-white/50 max-w-md">
              Tap any reel to view the creative execution and format craft directly on Instagram.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {reels.map((reel, idx) => (
              <a 
                key={idx} 
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-[9/16] relative overflow-hidden bg-[#0c0c0c] rounded-xl border border-white/10 group flex flex-col justify-between p-5 shadow-xl hover:border-brand-red transition-all select-none"
                aria-label={`View ${reel.title} on Instagram`}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                    REEL 0{idx + 1}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-brand-red font-semibold uppercase">
                    IG
                  </span>
                </div>

                {/* Center Play Icon */}
                <div className="flex flex-col items-center justify-center my-auto z-10">
                  <div className="w-12 h-12 border border-white/20 bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center pl-0.5 group-hover:bg-brand-red group-hover:border-brand-red group-hover:scale-110 transition-all duration-300 shadow-xl">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-white/50 group-hover:text-white uppercase mt-3 transition-colors">
                    WATCH
                  </span>
                </div>

                {/* Bottom Metadata */}
                <div className="border-t border-white/5 pt-3 z-10 text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-red block mb-0.5">
                    {reel.tag}
                  </span>
                  <div className="text-xs font-bold text-white truncate">
                    {reel.creator}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 9. Strategic Call to Action */}
        <div className="p-8 md:p-16 bg-[#080808] border border-white/10 rounded-2xl text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Plan Your Creator Campaign With CREATE.
            </h3>
            <p className="text-base md:text-lg text-white/70 font-sans leading-relaxed mb-8">
              We combine audience analysis, narrative scripting, creator vetting, and automated conversion mechanics to ensure your influencer investments deliver measurable awareness.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                href="/contact"
                className="bg-brand-red hover:bg-white hover:text-black text-white px-8 py-4 font-bold uppercase tracking-widest text-xs transition-colors rounded-full"
              >
                Enquire About Influencer Marketing
              </Link>
              <Link 
                href="/work"
                className="border border-white/20 hover:border-brand-red text-white px-8 py-4 font-bold uppercase tracking-widest text-xs transition-colors rounded-full"
              >
                View Other Projects
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
