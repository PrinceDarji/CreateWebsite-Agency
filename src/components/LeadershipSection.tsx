import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";

export interface TeamMember {
  name: string;
  designation: string;
  tagline: string;
  subheading?: string;
  image: string;
  bio: string;
}

export const leadershipMembers: TeamMember[] = [
  {
    name: "Akash",
    designation: "Creative Director",
    tagline: "The hands behind the visual.",
    subheading: "The hands behind the visual.",
    image: "/images/team/akash.png",
    bio: "A graduate of Sri Venkateswara College, University of Delhi and former President of Film Club Effulgence, Akash built his creative foundation through filmmaking, production, and visual storytelling. His journey from campus productions to collaborating with emerging and established brands shaped his belief that great ideas deserve exceptional execution."
  },
  {
    name: "Nimit",
    designation: "CEO",
    tagline: "The brain behind the deck.",
    subheading: "The brain behind the deck.",
    image: "/images/team/nimit.jpg",
    bio: "An alumnus of IIM Lucknow and former Vice President of Film Club Effulgence, Nimit brings together leadership, strategy, and execution. His experience spans student leadership, consumer brands, and high-growth projects, giving him a unique perspective on transforming creative ideas into measurable business outcomes."
  },
  {
    name: "Shehul",
    designation: "COO",
    tagline: "The nervous system who operates us.",
    subheading: "The nervous system who operates us.",
    image: "/images/team/shehul.png",
    bio: "A graduate of Sri Venkateswara College, University of Delhi, Shehul began his leadership journey as the Cultural Secretary of Effulgence 2023. From managing large-scale cultural initiatives to working with international organizations, government bodies, and purpose-driven brands, he developed a strategic understanding of how stories shape perception and impact."
  }
];

interface LeadershipSectionProps {
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
  sectionId?: string;
  className?: string;
  containerClassName?: string;
}

export function LeadershipSection({
  showCta = false,
  ctaText = "Meet the Team",
  ctaHref = "/about#leadership",
  sectionId,
  className,
  containerClassName = "container mx-auto max-w-7xl"
}: LeadershipSectionProps) {
  const sectionClass = className ?? "py-32 px-6 md:px-12 bg-brand-bg border-t border-white/5";

  return (
    <section id={sectionId} className={sectionClass}>
      <div className={containerClassName}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <h2 className="text-brand-red text-sm font-bold uppercase tracking-widest mb-4">Created By</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white">The Leadership.</h3>
          </div>
          {showCta && (
            <Link 
              href={ctaHref}
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest hover:text-brand-red transition-colors group"
            >
              {ctaText} <ArrowIcon className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {leadershipMembers.map((member, i) => (
            <div 
              key={member.name}
              className="group flex flex-col"
            >
              {/* Portrait: Full color by default, no hover requirement to see details */}
              <div className="w-full aspect-[4/5] bg-[#111] mb-8 relative overflow-hidden border border-white/10 group-hover:border-brand-red transition-colors duration-500 rounded-lg">
                <Image 
                  src={member.image} 
                  alt={`Portrait of ${member.name} - ${member.designation}, CREATE`} 
                  fill 
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={i === 0}
                />
              </div>
              
              {/* Founder Header: Name & Designation always visible */}
              <div className="flex flex-col mb-3">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <h4 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-brand-red transition-colors">
                    {member.name}
                  </h4>
                  <span className="text-xs uppercase tracking-widest font-bold text-brand-red px-3 py-1 bg-brand-red/10 rounded-full border border-brand-red/20 inline-block">
                    {member.designation}
                  </span>
                </div>
                
                {/* Tagline: Clearly visible on initial page load */}
                <p className="text-base font-display font-medium text-white/90 italic">
                  "{member.tagline || member.subheading}"
                </p>
              </div>

              {/* Red Accent Rule */}
              <div className="w-12 h-0.5 bg-brand-red mb-4"></div>
              
              {/* Bio */}
              <p className="text-white/60 font-sans font-medium leading-relaxed text-sm">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
