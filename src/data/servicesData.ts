export interface ServiceSection {
  heading: string;
  paragraphs: string[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  name: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  intro: string;
  image: string;
  whatWeDo: Array<{ title: string; desc: string } | string>;
  sections: ServiceSection[];
  faqs: ServiceFAQ[];
  ctaHeading: string;
  ctaText: string[];
  portfolioLink: string;
  order: number;
  isAlias?: boolean;
  canonicalSlug?: string;
  caseStudy?: any;
}

export const servicesData: Record<string, ServiceDetail> = {
  "brand-visual-design": {
    "slug": "brand-visual-design",
    "name": "Brand & Visual Design",
    "h1": "Visual Design That Supports the Story",
    "seoTitle": "Creative Design Studio & Brand Visuals | CREATE",
    "metaDescription": "CREATE develops visual identity, campaign design, key visuals, and creative assets that help brands communicate with clarity and consistency.",
    "primaryKeyword": "creative design studio",
    "supportingKeywords": [
      "brand design agency",
      "campaign design agency",
      "visual identity design",
      "advertising creative",
      "brand guidelines"
    ],
    "intro": "Design should do more than make something look good. It should help an idea communicate. CREATE develops visual systems for campaigns, content, advertising, and brand communication, connecting the brief, audience, idea, and final execution.",
    "image": "/images/services/brand-visual-design.webp",
    "whatWeDo": [
      "Visual Identity",
      "Campaign Design",
      "Key Visuals",
      "Advertising Creative",
      "Social Media Design",
      "Motion Design",
      "Brand Guidelines"
    ],
    "sections": [
      {
        "heading": "Design with a job to do",
        "paragraphs": [
          "Good design begins with a reason. A visual identity needs to help people recognise a brand. A campaign visual needs to make an idea clear at a glance. A social asset needs to work in the space and format where people will see it. Every design choice should support the message, not compete with it.",
          "CREATE approaches brand and visual design as part of a wider creative process. Before choosing colours, type, images, or shapes, we look at the brief and what the work needs to achieve. We consider who the audience is, what they already know, what they need to understand, and what the brand wants to say. That context gives the design a purpose.",
          "The result should feel considered, not decorated. Strong visual work has a clear point of view, but it also has a clear role. It helps the brand speak in a recognisable way across different places and formats."
        ]
      },
      {
        "heading": "Visual identity that holds together",
        "paragraphs": [
          "A visual identity gives a brand a set of cues people can recognise. These may include a logo, colour palette, typography, graphic elements, image direction, layout rules, and guidance for how the pieces work together. The aim is not to make every asset look identical. It is to make each asset feel like it belongs to the same brand.",
          "CREATE can help shape or refine these elements around the brand's positioning and communication needs. The process begins by understanding what already exists and what needs to change. Some projects call for a new visual direction. Others need a clearer system that makes existing brand assets easier to use.",
          "A useful identity system needs to work in real conditions. It should hold up across digital screens, campaign layouts, presentations, social content, and other planned uses. Guidelines should explain the key rules without making the system hard to apply. The right level of detail depends on the brand, its team, and the work it needs to produce."
        ]
      },
      {
        "heading": "Campaign design and key visuals",
        "paragraphs": [
          "Campaign design turns a central idea into a visual language people can recognise. The key visual often sets the tone for the wider campaign. It can guide advertising layouts, social content, landing pages, event materials, and other supporting assets.",
          "CREATE develops campaign design around the message, audience, and planned use. We consider the hierarchy of information, the role of imagery, the space needed for copy, and how the design may adapt across formats. A strong key visual should be memorable, but it also needs to be practical enough to work across the campaign.",
          "Campaign assets should feel connected without becoming repetitive. Different placements have different jobs. A social post may need to stop a scroll; a landing page visual may need to support a decision; a display ad may need to communicate one clear message quickly. A shared design system helps those assets feel related while allowing each one to work in its own context."
        ]
      },
      {
        "heading": "Advertising and social media creative",
        "paragraphs": [
          "Advertising creative must make the message clear in a short amount of time. The visual needs to work with the copy, offer, and call to action. It should be easy to understand at the size and speed at which people will see it.",
          "For social media, the design also needs to respect platform behaviour. A vertical video cover, carousel, story, and static post each have different constraints. CREATE can develop social media design and advertising creative that fit those formats while keeping the brand's visual language consistent.",
          "We consider legibility, contrast, cropping, visual hierarchy, and the relationship between the first impression and the full message. Where the assets are part of a wider campaign, we can build a set of variations that explore different messages or visual routes. The exact deliverables are agreed based on the brief and the platforms involved."
        ]
      },
      {
        "heading": "Motion design and visual systems",
        "paragraphs": [
          "Some ideas need movement. Motion design can guide attention, explain a sequence, introduce a product, or give a campaign a more expressive visual rhythm. It can also help connect static assets with film and social content.",
          "CREATE can develop motion-led design as part of a wider visual system. That may include animated graphic elements, titles, transitions, social motion assets, or campaign-specific visual treatments. Motion should support the message rather than add movement for its own sake.",
          "The same principle applies to the full design system. Each choice should have a reason, and the system should be flexible enough to support future content. A brand may need to communicate through many formats over time. Clear visual rules help teams create new assets without losing the identity that makes the brand recognisable."
        ]
      },
      {
        "heading": "Our process: Connect, research, execute",
        "paragraphs": [
          "We begin by connecting with the people behind the brief and understanding the work's purpose. We research the audience, context, existing brand, and visual references that may help shape the direction. We then develop design routes that respond to the brief rather than starting with decoration.",
          "Once a direction is agreed, we build and refine the assets. We review how the work functions across its intended formats and make adjustments where needed. Final files and guidelines are prepared according to the agreed scope, so the team knows what has been supplied and how it can be used.",
          "The process is collaborative, but it also needs clear decisions. A defined brief, feedback process, and approval path help keep the work focused. The exact stages and deliverables vary by project, so the scope is confirmed before production begins."
        ]
      },
      {
        "heading": "What the service can include",
        "paragraphs": [
          "Depending on the project, brand and visual design work may include visual identity development, campaign design, key visuals, advertising creative, social media design, motion design, and brand guidelines. Not every project needs every service. The work should fit the problem, not the other way around.",
          "CREATE keeps the focus on the connection between the idea and its visual expression. We want the design to communicate clearly, feel distinctive, and work where the audience will encounter it. We also consider how the assets will be used after handover, because a visual system is most useful when people can apply it consistently.",
          "We do not treat a list of deliverables as proof of success. The value of the work depends on how well it answers the brief and supports the brand's communication. Where relevant, the project can be documented through the actual work, the design rationale, and approved examples."
        ]
      },
      {
        "heading": "Design systems for real use",
        "paragraphs": [
          "A visual system should be practical for the people who need to use it. A guide that is too vague can lead to inconsistent work. A guide that is too complex can slow teams down. The right system gives people enough direction to make choices while leaving room for the idea and format.",
          "This includes thinking about how the design works in different sizes, how type behaves in long and short messages, how images are selected, and how visual elements can be combined. The system should also make clear which choices are fixed and which can change.",
          "CREATE can help define these rules as part of an identity or campaign project. The exact level of documentation depends on who will use the system and how often new creative assets will be made. The goal is consistency that supports the work, not rules for their own sake."
        ]
      },
      {
        "heading": "A design partner for considered creative work",
        "paragraphs": [
          "A creative design studio should bring more than software skills to a project. It should ask useful questions, understand the brief, explain the thinking behind the work, and make design choices that serve a purpose.",
          "CREATE brings research, creative direction, and execution together. Brand and visual design is one part of a wider creative production offering that includes campaigns, branded content, commercials, and visual storytelling. That connection can help the design remain aligned with the story and the final output.",
          "If you need a new visual identity, a campaign design system, or creative assets for a specific project, start with the problem you need to solve. Tell us what you are building, who needs to understand it, and where the work will appear. We can then discuss the right scope and creative direction."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does a creative design studio do?",
        "answer": "A creative design studio develops visual identities and design assets that help brands communicate. Depending on the brief, this can include campaign design, key visuals, advertising creative, social media design, motion design, and brand guidelines."
      },
      {
        "question": "What is included in brand and visual design?",
        "answer": "The scope can include visual identity, campaign assets, key visuals, typography and colour systems, advertising creative, social media design, motion design, and guidelines. The final scope depends on the project."
      },
      {
        "question": "Does CREATE only design logos?",
        "answer": "No. Logo design may be part of an identity project, but CREATE's visual design work also covers campaigns, content, advertising, and wider brand communication."
      },
      {
        "question": "How do we start a design project?",
        "answer": "Share the brief, audience, goal, and intended use. CREATE can then discuss the creative direction, scope, timeline, and deliverables."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Tell us what you are building, who needs to understand it, and where the work will appear. We can discuss the right visual direction, scope, and deliverables.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work?filter=design",
    "order": 1
  },
  "branded-content": {
    "slug": "branded-content",
    "name": "Branded Content",
    "h1": "Give Your Brand Something Worth Watching",
    "seoTitle": "Branded Content Studio & Production | CREATE",
    "metaDescription": "CREATE creates branded films, product stories, creator-led content, and campaign content built around your brand, audience, and idea.",
    "primaryKeyword": "branded content studio",
    "supportingKeywords": [
      "branded content production",
      "brand storytelling",
      "branded films",
      "creator-led content",
      "social video"
    ],
    "intro": "Branded content should feel like content first and advertising second. CREATE develops brand-led stories around the audience, the brand, and the idea, making work that gives people something to watch, understand, or remember.",
    "image": "/images/services/branded-content.webp",
    "whatWeDo": [
      "Branded Films",
      "Product Stories",
      "Creator-Led Content",
      "Social Video",
      "Promotional Content",
      "Campaign Content"
    ],
    "sections": [
      {
        "heading": "What branded content is meant to do",
        "paragraphs": [
          "Branded content gives a business a way to take part in culture and conversation through stories. Instead of making every message a direct sales pitch, it builds a piece of content around an idea that matters to the audience and has a natural connection to the brand.",
          "That connection is important. If the brand feels forced into the story, people notice. If the story has no clear relationship to the brand, the content may attract attention without helping people understand what the brand stands for. The challenge is to bring the two together in a way that feels natural.",
          "CREATE begins with the audience, the brief, and the idea. We ask what the audience may care about, what the brand can credibly contribute, and what form the story should take. The answer may be a branded film, product story, creator-led piece, social video, promotional content, or a wider set of campaign assets."
        ]
      },
      {
        "heading": "Content built around the audience",
        "paragraphs": [
          "A branded content project should start with people, not just a product list. What might the audience want to watch? What question, feeling, interest, or situation could make the story relevant? What role can the brand play without taking over every moment?",
          "Research helps the team make informed choices about tone, format, and subject. It can include reviewing the brief, understanding the brand, examining the platform, and discussing what the content needs to communicate. Research does not replace creative judgement. It gives the idea a stronger starting point.",
          "The audience also affects the way a story is told. A short vertical video may need a direct opening and a clear visual hook. A longer branded film may have room for a more gradual story. Creator-led content may benefit from a voice that feels true to the creator, while still meeting the project's requirements. The format should serve the idea and the people it is intended for."
        ]
      },
      {
        "heading": "Branded films and product stories",
        "paragraphs": [
          "A branded film can build a world around a brand, subject, or idea. It may introduce a point of view, show a product in context, share a story, or communicate what makes a business different. The strongest approach depends on the brief and the audience, not on a fixed formula.",
          "Product stories need the same care. A list of features can tell people what a product has, but a story can help them understand why those features matter in real life. That does not mean making claims the product cannot support. It means choosing a clear message and showing it in a way that people can follow.",
          "CREATE can support concept development, scripting, storyboarding, creative direction, production, and post-production according to the agreed scope. The work is shaped from the first idea through to the finished piece, so the final film remains connected to the reason it was made."
        ]
      },
      {
        "heading": "Creator-led content and social video",
        "paragraphs": [
          "Creator-led content can bring a personal voice and a familiar style to a brand story. It can be useful when the creator's way of communicating fits the audience and the message. The work still needs a clear brief, a shared understanding of the brand, and agreement on what the content should deliver.",
          "Social video also has its own demands. People often decide quickly whether to keep watching, so the opening, pacing, visual clarity, and sound all matter. The content should be planned for the platform and placement rather than simply cropped from a longer film without thought.",
          "CREATE can develop creator-led content and social video as standalone work or as part of a wider campaign. We consider the format, message, and intended use early in the process. The final deliverables may include a primary edit and agreed variations for different placements, depending on the project scope."
        ]
      },
      {
        "heading": "From idea to finished content",
        "paragraphs": [
          "The process starts with a clear brief. We align on the audience, message, tone, deliverables, and the role the content should play. Research then helps identify useful context and possible creative routes. The idea is developed into a concept that can be reviewed before production begins.",
          "Depending on the project, the next steps may include scriptwriting, storyboards, casting or creator planning, location planning, production, editing, sound, motion, colour, and final delivery. Not every project requires every stage. The production plan is built around the needs of the work.",
          "The content is then reviewed against the agreed brief. This includes checking the story, the brand's role, the technical requirements, and the formats needed for release. A clear approval process helps avoid late changes that affect the schedule or the final quality."
        ]
      },
      {
        "heading": "Content that belongs to a wider campaign",
        "paragraphs": [
          "Branded content can work on its own, but it can also support a wider campaign. A central idea may be expressed through a film, shorter edits, social posts, product stories, and supporting creative. The pieces should feel connected without simply repeating the same message in every format.",
          "Planning the wider use early helps the team make better production choices. It can affect framing, aspect ratios, edit structure, graphic elements, and the moments captured on set. When the intended uses are known, the project can be built to deliver assets that fit those needs.",
          "CREATE brings branded content together with campaign production, creative direction, visual storytelling, and post-production. That makes it possible to consider both the story itself and how the finished work will be used. The precise scope depends on the brief and is confirmed before work begins."
        ]
      },
      {
        "heading": "How we judge the work",
        "paragraphs": [
          "Branded content should be judged against the job it was made to do. If the aim is to communicate a brand idea, clarity and audience response may matter most. If the work supports a product launch, the content may need to explain the product and fit into a broader launch plan. If it is part of a campaign, consistency across the assets may be a key concern.",
          "Views or engagement can be useful signals, but they do not explain everything. The right measures depend on the platform, the objective, and the wider campaign. CREATE does not promise a fixed level of reach or response from creative work alone. Distribution, audience fit, timing, and other factors also shape performance.",
          "The first step is to define what the content needs to do. That gives the team a clear basis for creative decisions and a fair way to review the final output."
        ]
      },
      {
        "heading": "Rights, approvals, and practical details",
        "paragraphs": [
          "Branded content may involve music, talent, locations, products, third-party footage, or creator participation. These details can affect the production plan and the ways the finished content may be used. Usage rights, approval responsibilities, and delivery requirements should be discussed before production begins.",
          "A clear brief helps avoid uncertainty later. It should identify the intended channels, formats, timing, review stages, and any legal or brand requirements that affect the work. If creator-led content is involved, the scope should also clarify the agreed deliverables and usage permissions.",
          "CREATE confirms project scope and responsibilities before work begins. The exact requirements vary by production, and any third-party permissions should be verified rather than assumed."
        ]
      },
      {
        "heading": "Make something worth watching",
        "paragraphs": [
          "People see a great deal of brand content every day. Making another piece is not enough. The content needs a reason to exist, a story worth following, and a clear connection to the brand behind it.",
          "CREATE develops branded content by connecting research, creative thinking, production, and execution. We look for the idea that can carry the message, then shape it into a story and format that fit the audience. The result should be considered, clear, and made for its intended use.",
          "If you are planning a branded film, product story, creator-led piece, or social video, tell us what you need to communicate and who you need to reach. We can discuss the idea, the production approach, and the deliverables that make sense for the project."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is branded content?",
        "answer": "Branded content is content developed around a story, idea, or subject that connects naturally to a brand. It may take the form of a film, product story, creator-led video, or social content."
      },
      {
        "question": "How is branded content different from a traditional advertisement?",
        "answer": "A traditional ad often leads with a direct sales message. Branded content gives the audience a story or useful experience first, while keeping a clear and credible connection to the brand."
      },
      {
        "question": "What types of branded content does CREATE produce?",
        "answer": "Depending on the brief, CREATE can develop branded films, product stories, creator-led content, social video, promotional content, and campaign content."
      },
      {
        "question": "Can branded content be made for social media?",
        "answer": "Yes. Branded content can be planned for social platforms, with formats, pacing, and creative choices suited to the audience and placement."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Tell us what you need to communicate and who you need to reach. We can discuss the idea, production approach, and deliverables that fit the project.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work?filter=branded-content",
    "order": 2
  },
  "campaign-production": {
    "slug": "campaign-production",
    "name": "Campaign Production",
    "h1": "Campaigns Built From Idea to Execution",
    "seoTitle": "Campaign Production Agency | CREATE",
    "metaDescription": "CREATE develops campaign concepts and produces creative assets across films, digital content, social platforms, and campaign touchpoints.",
    "primaryKeyword": "campaign production agency",
    "supportingKeywords": [
      "advertising campaign production",
      "creative campaign studio",
      "campaign assets",
      "social cutdowns",
      "commercial production"
    ],
    "intro": "A campaign rarely lives in one format. CREATE develops campaign concepts and produces the films, digital content, social assets, and supporting creative needed to bring one clear idea to life across different touchpoints.",
    "image": "/images/services/campaign-production.webp",
    "whatWeDo": [
      "Campaign Concepts",
      "Creative Direction",
      "Commercial Production",
      "Content Production",
      "Campaign Assets",
      "Social Cutdowns"
    ],
    "sections": [
      {
        "heading": "A campaign needs more than one asset",
        "paragraphs": [
          "A campaign is a connected set of messages and creative work built around a shared idea. It may include a commercial, branded content, social videos, display assets, landing page visuals, or other formats. The mix depends on the audience, the objective, the platforms, and the campaign timeline.",
          "When each asset is created separately without a shared direction, the campaign can lose its identity. The message may change from one placement to another, the visual language may feel inconsistent, and the audience may not recognise the connection. A campaign production process helps keep the central idea clear while adapting it to the needs of each format.",
          "CREATE brings research, creative direction, production, and execution together. We work from the campaign idea outward, identifying what needs to be created and how the pieces should work together. The goal is not to produce the most assets possible. It is to produce the right creative work for the campaign's purpose."
        ]
      },
      {
        "heading": "Research and campaign understanding",
        "paragraphs": [
          "Before production begins, the team needs to understand the brief. What is the campaign trying to communicate? Who needs to hear the message? What does the audience already know? What should they understand or do after seeing the work? These questions help shape the creative route.",
          "Research can include reviewing the brand, audience, category, existing materials, and campaign context. The depth of research depends on the project. Its role is to uncover useful information and avoid building the campaign on assumptions alone.",
          "The brief also needs practical clarity. Timing, platforms, formats, approvals, usage requirements, and deliverables affect the production plan. Confirming these early helps the team create work that can be made and delivered within the agreed scope."
        ]
      },
      {
        "heading": "Developing the central idea",
        "paragraphs": [
          "The central idea gives a campaign its point of view. It should be clear enough to guide different assets and flexible enough to work across the planned formats. A campaign concept is more than a headline or a visual treatment. It connects the message, story, tone, and creative execution.",
          "CREATE develops concepts in response to the brief and the audience. Depending on the project, this may include creative routes, key messages, scripts, storyboards, moodboards, or sample executions. These tools help make the idea tangible before the full production commitment begins.",
          "The strongest route is not always the most complicated. A simple idea can be powerful when it is relevant and executed with care. The important question is whether the concept gives the campaign something clear to say and a distinctive way to say it."
        ]
      },
      {
        "heading": "From concept to production",
        "paragraphs": [
          "Once the concept is approved, the production plan turns the idea into a set of practical tasks. This may involve commercial production, branded content, photography, social video, graphic design, motion, or other creative formats. Each asset needs a clear role and a defined delivery requirement.",
          "Planning across formats can help the team make better use of production time. A shoot may need to capture both a main film and material for shorter edits. A visual system may need to accommodate different placements and message lengths. These needs should be considered before production rather than discovered at the final edit stage.",
          "CREATE coordinates the creative and production elements according to the agreed scope. The exact process depends on the type and scale of the campaign. We keep the relationship between the concept and the final assets in view so the work feels connected from first idea to delivery."
        ]
      },
      {
        "heading": "Creative direction across touchpoints",
        "paragraphs": [
          "A campaign needs consistency, but consistency does not mean every asset should look the same. A film, a carousel, a display ad, and a landing page each have different jobs. They need to share the campaign's core idea while using the format in a way that makes sense.",
          "Creative direction provides the rules and judgement that hold the work together. It guides visual language, tone, story, composition, and the way messages are expressed. It also helps the team decide what should remain constant and what can change across the campaign.",
          "The audience should be able to recognise the campaign without having to see the exact same execution repeatedly. This is where a clear idea and a considered visual system help. They create a family of assets with a shared point of view."
        ]
      },
      {
        "heading": "Campaign assets and cutdowns",
        "paragraphs": [
          "Campaign production often includes a main asset and a set of supporting versions. These may include shorter edits, vertical formats, social cutdowns, alternate openings, stills, graphic assets, or other adaptations. The exact set should be based on the media plan and the needs of the campaign.",
          "Cutdowns should not be treated as a purely technical task. Shortening a film can change its meaning, pacing, and clarity. Each version needs to retain the core message while working within the time and format available. Similarly, resizing a visual may require a new hierarchy rather than a simple crop.",
          "By planning asset requirements early, the team can consider how the work will be used and reduce avoidable rework. Final specifications, file formats, and delivery needs should be confirmed before production begins."
        ]
      },
      {
        "heading": "Review, delivery, and rollout",
        "paragraphs": [
          "The final stage brings the assets together for review and delivery. The team checks that the work matches the approved direction, that required formats are supplied, and that the files meet the technical specifications. Feedback and approval should follow the process agreed at the start.",
          "Campaign production may also need to support a rollout schedule. Different assets may be released at different times or used on different platforms. Clear naming, organised files, and documented versions help the team manage the work after delivery.",
          "CREATE's role is to connect the creative idea with the production needed to execute it. Media buying, publishing, and campaign management may sit with the client or another partner unless they are included in the agreed scope. Responsibilities should be clear so each team knows what it owns."
        ]
      },
      {
        "heading": "What campaign production can include",
        "paragraphs": [
          "Depending on the brief, campaign production can include campaign concepts, creative direction, commercial production, branded content, content production, campaign assets, and social cutdowns. A project may need a single hero asset or a connected set of outputs across channels.",
          "The right deliverables depend on the campaign goal, audience, timing, and platforms. A launch may require a main film and several supporting assets. A social campaign may need a set of short videos and static creative. A brand campaign may require a wider visual system that can carry the idea over time.",
          "CREATE defines the scope before production begins. This helps align creative expectations with practical needs and keeps the team focused on what the campaign actually requires."
        ]
      },
      {
        "heading": "A connected campaign, made with intent",
        "paragraphs": [
          "A campaign should feel like one idea expressed in the right ways, not a pile of unrelated assets. That takes research, creative direction, planning, production, and careful finishing.",
          "CREATE develops campaign concepts and produces the creative work required to bring them to life across formats. We focus on the connection between the message and the execution, while keeping the practical needs of the campaign in view.",
          "If you are planning a launch, seasonal campaign, brand initiative, or advertising project, share the goal, audience, timeline, and channels involved. We can discuss the concept, production requirements, and assets needed to carry the idea from start to finish."
        ]
      },
      {
        "heading": "Planning the production scope",
        "paragraphs": [
          "A clear production scope helps the campaign move from an approved idea to usable assets without confusion. Before work begins, confirm the campaign objective, audience, key message, formats, delivery dates, review stages, and final file requirements. Also agree who will provide brand assets, product information, legal approvals, and platform specifications.These details may seem practical, but they affect the creative. The length of a film can change the script. The number of placements can change the shot list. A launch date can affect the production schedule. CREATE brings these needs into the planning stage so the team can make informed choices before time and resources are committed. The scope should stay flexible enough to respond to useful learning, while remaining clear about what has been approved and what counts as a change."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does a campaign production agency do?",
        "answer": "A campaign production agency helps develop a campaign idea and produces the creative assets needed to execute it across formats such as film, social content, and digital placements."
      },
      {
        "question": "What can campaign production include?",
        "answer": "Depending on the brief, it can include campaign concepts, creative direction, commercials, branded content, content production, social cutdowns, and supporting campaign assets."
      },
      {
        "question": "Does campaign production include media buying?",
        "answer": "Not by default. Campaign production focuses on creative work and its delivery. Media buying or campaign management should be confirmed as part of the project scope."
      },
      {
        "question": "When should asset formats be planned?",
        "answer": "Plan formats and deliverables before production begins. Early planning helps the team capture or create material suited to the campaign's intended channels."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Share the campaign goal, audience, timeline, and channels involved. CREATE can discuss the concept, production requirements, and assets needed to bring the idea to life.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work?filter=campaigns",
    "order": 3
  },
  "commercial-production": {
    "slug": "commercial-production",
    "name": "Commercial Production",
    "h1": "Commercials Built Around Ideas",
    "seoTitle": "Commercial Production Company | CREATE",
    "metaDescription": "CREATE produces commercials around clear ideas, strong stories, and purposeful visual direction, from concept through final delivery.",
    "primaryKeyword": "commercial production company",
    "supportingKeywords": [
      "commercial video production",
      "advertising film production",
      "commercial video agency",
      "TV commercial production"
    ],
    "intro": "A commercial has seconds to make an impression. CREATE develops and produces commercial work around a clear idea, a strong story, and purposeful visual direction, keeping the brief connected to the finished film.",
    "image": "/images/services/commercial-production.webp",
    "whatWeDo": [
      "Creative Concepts",
      "Scripts",
      "Storyboards",
      "Creative Direction",
      "Production",
      "Direction",
      "Editing",
      "Motion",
      "Colour",
      "Sound",
      "Final Delivery"
    ],
    "sections": [
      {
        "heading": "The idea comes before the shot",
        "paragraphs": [
          "A commercial is often judged by what people remember after watching it. That makes the idea important. Beautiful images can attract attention, but they need a reason to be there. The story, message, and visual direction should work together so the commercial says something clear.",
          "CREATE begins by understanding the brief and the audience. We look at what the brand needs to communicate, what the audience needs to understand, and what role the commercial will play. The answer may be a product-focused film, a brand story, a launch commercial, or another form of advertising film.",
          "A clear idea helps guide every later decision. It affects the script, casting, locations, visual language, pacing, sound, and edit. When the idea is understood early, production choices can support it rather than pull the work in different directions."
        ]
      },
      {
        "heading": "Concept development and scripting",
        "paragraphs": [
          "Concept development turns the brief into a story that can be made. The creative route needs to be distinctive enough to hold attention and clear enough to communicate the intended message. It also needs to fit the production requirements, budget, timing, and intended placements.",
          "Depending on the project, development may include concept options, scripts, story outlines, storyboards, moodboards, and reference material. These help the team and client understand what the commercial could look and feel like before production begins.",
          "A script should be shaped for the medium. It needs to consider the time available, the role of dialogue or voiceover, the images that carry the story, and the information that must be communicated. Not every commercial needs to explain everything. The job is to find the right balance between clarity, emotion, and memory."
        ]
      },
      {
        "heading": "Pre-production: Plan the details",
        "paragraphs": [
          "Pre-production turns the approved concept into a workable plan. Depending on the project, this may include scheduling, location planning, casting, crew planning, art direction, props, wardrobe, shot lists, storyboards, production design, and technical preparation.",
          "The purpose is to solve as many practical questions as possible before the shoot. Clear planning helps everyone understand the creative direction and their role in making it happen. It also helps identify risks, dependencies, and decisions that need approval.",
          "The scope of pre-production varies. A small product film may require a compact plan, while a larger commercial may involve more departments and coordination. CREATE defines the production approach around the needs of the project rather than using the same process for every brief."
        ]
      },
      {
        "heading": "Production and visual direction",
        "paragraphs": [
          "Production is where the plan becomes footage and images. The team brings together direction, camera, lighting, performance, production design, and other elements required by the concept. The aim is not simply to capture the planned shots, but to create material that supports the story and gives the edit what it needs.",
          "Visual direction shapes the mood and point of view of the film. Framing, movement, light, colour, texture, and performance all influence how the message feels. These choices should be deliberate and consistent with the approved concept.",
          "Good production also requires judgement. Conditions can change, time can be limited, and a planned approach may need adjustment. A clear creative direction gives the team a basis for making those decisions without losing sight of the idea."
        ]
      },
      {
        "heading": "Post-production: Shape the final film",
        "paragraphs": [
          "The commercial continues to take shape after filming. Editing determines the rhythm and structure. Sound supports mood and clarity. Colour grading helps establish the visual finish. Motion graphics, animation, visual effects, and titles may be used when the concept calls for them.",
          "The edit should serve the story. A cut can change what the audience notices, how a moment feels, and whether the message is clear. Sound can create atmosphere or bring focus to a detail. Finishing makes the film feel complete and prepares it for its intended use.",
          "CREATE can connect production and post-production so the original idea remains visible in the final output. The exact services depend on the brief and may include editing, motion, colour, sound, versioning, and final mastering."
        ]
      },
      {
        "heading": "Commercials for different placements",
        "paragraphs": [
          "A commercial may need to work across television, online video, social platforms, websites, or other placements. Each has its own technical specifications and viewing conditions. A long-form film may need shorter edits, vertical versions, or alternate formats for different uses.",
          "These requirements should be considered early. Framing that works in a wide format may not translate cleanly to vertical. A story built around a slow reveal may need a different opening for a shorter placement. Planning ahead helps the team capture and edit the work with its future uses in mind.",
          "The deliverables should be confirmed at the start, including duration, aspect ratio, file format, captions, language versions, and any other required specifications. This keeps production aligned with the actual needs of the campaign."
        ]
      },
      {
        "heading": "A clear, connected production process",
        "paragraphs": [
          "CREATE's process connects the brief, research, creative concept, production, and final delivery. We begin by understanding the task, then shape the idea and plan the work. The team produces the approved concept and refines the footage through post-production.",
          "Client feedback is part of the process, but the review stages need to be clear. Agreeing on who approves the work and when helps keep the schedule realistic. It also makes it easier to manage changes that affect the scope.",
          "The final result should be ready for the intended use and consistent with the agreed creative direction. The specific scope, timeline, deliverables, usage rights, and production requirements are confirmed before work begins."
        ]
      },
      {
        "heading": "What commercial production can include",
        "paragraphs": [
          "Depending on the brief, commercial production can include creative concepts, scripts, storyboards, creative direction, production planning, filming, editing, motion, colour, sound, and final delivery. Some projects need a complete end-to-end production process. Others need support at selected stages.",
          "The right approach depends on the message, the production scale, and the way the commercial will be used. A product film may require detailed product visuals. A brand film may need more attention to story and performance. A campaign commercial may need a set of cutdowns for different placements.",
          "CREATE confirms the scope before work begins. This helps everyone understand what will be produced, which stages are included, and what is needed from the client or other partners."
        ]
      },
      {
        "heading": "Make a commercial people remember",
        "paragraphs": [
          "A commercial needs a clear reason to exist. It should communicate something about the brand, product, or idea in a way that fits the audience and the medium. The strongest work brings the message and the craft together.",
          "CREATE produces commercials through connected creative development, production, and post-production. We focus on the story behind the images and the decisions that help the film work as a whole.",
          "If you are planning an advertising film, product commercial, or brand film, tell us what needs to be communicated and where the work will appear. We can discuss the creative route, production needs, and final deliverables that fit the brief."
        ]
      },
      {
        "heading": "Production planning and project scope",
        "paragraphs": [
          "Commercial production works best when the creative ambition and practical plan are discussed together. The team should understand the target duration, intended placements, production scale, locations, talent, required versions, and approval process before locking the plan. These details influence the schedule, crew, equipment, and finishing needs.A good brief also makes clear what the commercial must communicate and what can be left unsaid. The creative team can then focus on the moments that carry the message rather than trying to fit every detail into the film. CREATE confirms the intended use and deliverables before production begins. This helps align the idea with the resources available and reduces avoidable surprises during the shoot or edit."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does a commercial production company do?",
        "answer": "A commercial production company develops and produces advertising films. The work may include concept development, scripting, storyboarding, pre-production, filming, editing, sound, colour, motion, and final delivery."
      },
      {
        "question": "What is included in commercial video production?",
        "answer": "The scope depends on the project. It can include creative concepts, scripts, storyboards, direction, production, editing, motion graphics, colour grading, sound design, and final mastering."
      },
      {
        "question": "Can a commercial be adapted for social media?",
        "answer": "Yes. The production plan can include shorter edits and different aspect ratios for social platforms when those deliverables are agreed at the start."
      },
      {
        "question": "How long does commercial production take?",
        "answer": "Timing depends on concept approval, production scale, locations, talent, edit complexity, and the number of deliverables. A schedule should be set after the brief and scope are understood."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Tell us what needs to be communicated and where the film will appear. We can discuss the creative route, production needs, schedule, and final deliverables.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work?filter=commercials",
    "order": 4
  },
  "content-marketing": {
    "slug": "content-marketing",
    "name": "Content Marketing",
    "h1": "Content With a Purpose",
    "seoTitle": "Content Marketing Services & Strategy | CREATE",
    "metaDescription": "CREATE connects content strategy with creative production to help brands communicate through stories, video, social content, articles, and more.",
    "primaryKeyword": "content marketing agency",
    "supportingKeywords": [
      "content marketing services",
      "brand content strategy",
      "content planning",
      "video content",
      "content distribution"
    ],
    "intro": "Content marketing connects useful ideas with the right audience. CREATE combines content planning and creative production to help brands communicate through stories, videos, social content, articles, and other formats that serve a clear purpose.",
    "image": "/images/services/content-marketing.webp",
    "whatWeDo": [
      "Content Strategy",
      "Content Planning",
      "Brand Content",
      "Video Content",
      "Social Content",
      "Campaign Content",
      "Content Distribution"
    ],
    "sections": [
      {
        "heading": "Content needs a reason to exist",
        "paragraphs": [
          "Publishing more content does not automatically make a brand more useful or memorable. Content needs a clear purpose, a defined audience, and a reason for people to give it their time. Without those things, a content calendar can become a list of posts rather than a plan.",
          "CREATE starts by understanding the brand, the audience, and the communication goal. The work may need to explain a subject, introduce a product, express a point of view, support a campaign, or help people understand what a brand does. Each goal calls for a different approach.",
          "A content marketing plan connects those goals with topics, formats, timing, and production. It gives the team a reason for each piece and helps content work together over time. The aim is not to fill every available slot. It is to make each piece earn its place."
        ]
      },
      {
        "heading": "Strategy before the calendar",
        "paragraphs": [
          "A content strategy sets the direction before the team starts filling a calendar. It identifies who the content is for, what they need, what the brand can credibly contribute, and which channels make sense. It also defines the role content plays in the wider communication plan.",
          "Research may include reviewing existing content, audience questions, brand material, search topics, platform behaviour, and the campaign context. The process should help the team identify useful themes rather than simply copy what others are doing.",
          "From there, topics can be grouped into content pillars or themes. These should be broad enough to support a range of ideas but specific enough to keep the brand focused. The calendar then turns those themes into a practical publishing plan with formats, responsibilities, and review stages."
        ]
      },
      {
        "heading": "Content planning across formats",
        "paragraphs": [
          "Different formats help people engage with information in different ways. Articles can explain a subject in depth. Video can demonstrate, tell a story, or make an idea easier to follow. Social content can create a regular connection with the audience. Branded films and campaign assets can carry a larger creative idea.",
          "CREATE considers format as part of the content plan. The right choice depends on the message, the audience, the platform, the resources available, and the desired action. A topic may work well as a short video, while another may need a detailed guide or a series of posts.",
          "Planning across formats can also help a brand get more value from a strong idea. A larger subject may become an article, a short video, a carousel, and a discussion prompt. Each version should be adapted to its format rather than copied without thought."
        ]
      },
      {
        "heading": "Content production that supports the plan",
        "paragraphs": [
          "A strategy is only useful if it can be put into practice. Content production turns the plan into finished work. Depending on the project, that may include writing, filming, editing, design, motion, photography, or other creative tasks.",
          "CREATE connects content planning with production so the idea and execution stay aligned. We consider the brief, audience, format, tone, and intended use before the work begins. This helps the final content serve the purpose set in the plan.",
          "The production process also needs clear approvals and practical deadlines. A content plan should reflect the time and resources available. If a format is too costly or complex to produce regularly, the plan may need a different approach. Consistency comes from a workable process, not from making promises that cannot be sustained."
        ]
      },
      {
        "heading": "Brand voice and useful storytelling",
        "paragraphs": [
          "Content should sound and feel like it comes from the brand, but it should still be useful to the audience. Brand voice provides a consistent point of view. Storytelling gives information a shape people can follow. Together, they can make complex or ordinary subjects more engaging without losing accuracy.",
          "CREATE develops content around the idea and the audience. That may mean a direct explainer, a behind-the-scenes story, a product demonstration, a point-of-view piece, or a creative series. The format should follow the subject rather than forcing every message into the same style.",
          "A useful content plan also respects what the brand can genuinely say. Claims should be supported, advice should be clear, and examples should be real. Content builds trust when it helps people understand something, not when it relies on inflated promises."
        ]
      },
      {
        "heading": "Distribution and reuse",
        "paragraphs": [
          "Creating content is one part of the work. The content also needs a plan for how it will reach people. Distribution may include the brand's own channels, campaign placements, partner channels, or other methods agreed for the project.",
          "The right distribution approach depends on the audience and the content. Some pieces may be designed for search, others for social feeds, and others for a campaign. The plan should make clear where each piece will appear and what role it plays.",
          "Repurposing can help a strong idea work across several formats, but each adaptation needs care. A detailed article cannot always be reduced to a short post without losing important context. A video made for one platform may need changes for another. CREATE plans content with these differences in mind."
        ]
      },
      {
        "heading": "Measurement and learning",
        "paragraphs": [
          "Content marketing should be reviewed against its purpose. Depending on the goal, useful measures may include search visibility, time spent with a page, video completion, saves, shares, meaningful comments, enquiries, or assisted conversions. No single metric explains the value of every content format.",
          "Measurement should inform decisions rather than become a list of numbers without context. If a piece attracts attention but does not answer the audience's question, the team may need to improve the content. If a format is difficult to produce and adds little value, the plan may need to change.",
          "CREATE can help connect content goals with the production plan and the measures available. Results depend on factors such as audience, distribution, competition, timing, and the quality of the content. No specific outcome should be promised before those factors are understood."
        ]
      },
      {
        "heading": "What content marketing can include",
        "paragraphs": [
          "Depending on the brief, content marketing can include content strategy, content planning, brand content, video content, social content, campaign content, and distribution planning. The service can be focused on a specific campaign or built around a longer content programme.",
          "The right mix depends on what the brand needs to communicate and what the audience is looking for. Some plans require more written content. Others rely on video, social assets, or a mix of formats. The aim is to choose formats that serve the goal and can be produced well.",
          "CREATE confirms the work, roles, schedule, and deliverables before the project begins. This creates a clear link between the strategy and the content that will actually be made."
        ]
      },
      {
        "heading": "Build a content system that can last",
        "paragraphs": [
          "Useful content is rarely a one-off task. Brands need a clear process for choosing topics, creating work, reviewing it, publishing it, and learning from the response. A content system makes those steps easier to repeat without making the work feel repetitive.",
          "CREATE brings strategy, content planning, creative production, and campaign thinking together. We help shape a plan that gives each piece a job and gives the team a workable way to produce it. The exact scope depends on the brand's needs and the resources available.",
          "If your content feels disconnected, inconsistent, or hard to sustain, start by reviewing the audience, the purpose, and the process. Tell us what you want the content to do and where it needs to appear. We can discuss a plan that connects useful ideas with creative execution."
        ]
      },
      {
        "heading": "Making the plan practical",
        "paragraphs": [
          "A content strategy needs to match the time, people, and production resources available. A calendar that looks ambitious on paper can become hard to maintain if each piece requires a different process or extensive approvals. Planning should account for research, writing, production, review, publishing, and later updates.CREATE can help shape a content plan around the team's needs and the formats that make sense for the audience. The plan should identify the purpose of each content theme, the intended channel, the owner of each task, and the review process. It should also leave room to respond to useful questions or changes in the wider campaign. A realistic system makes it easier to keep quality consistent over time."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does a content marketing agency do?",
        "answer": "A content marketing agency helps plan, create, and organise content around business and audience goals. Services may include strategy, planning, writing, video, social content, and distribution support."
      },
      {
        "question": "What is included in content marketing services?",
        "answer": "The scope may include content strategy, content planning, brand content, video content, social content, campaign content, and distribution planning."
      },
      {
        "question": "How is content marketing different from social media marketing?",
        "answer": "Content marketing focuses on the wider plan for useful brand content across formats and channels. Social media marketing focuses on strategy and content designed for social platforms."
      },
      {
        "question": "How do you measure content marketing?",
        "answer": "Measures depend on the goal. They may include search visibility, engagement, video completion, enquiries, or conversions. The right measures should be agreed before work begins."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Tell us what the content needs to communicate, who it is for, and where it should appear. CREATE can discuss a practical plan and the production needed to support it.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work",
    "order": 5
  },
  "creative-direction": {
    "slug": "creative-direction",
    "name": "Creative Direction",
    "h1": "One Creative Direction. Every Detail Connected.",
    "seoTitle": "Creative Direction Services | CREATE",
    "metaDescription": "CREATE shapes concepts, visual language, story, tone, and execution so every part of a creative project feels connected.",
    "primaryKeyword": "creative direction services",
    "supportingKeywords": [
      "creative direction agency",
      "visual direction",
      "art direction",
      "concept development",
      "creative studio"
    ],
    "intro": "Creative direction gives a project a point of view. CREATE shapes the concept, visual language, story, tone, and execution so the idea stays clear from the first discussion to the final output.",
    "image": "/images/services/creative-direction.webp",
    "whatWeDo": [
      "Concept Development",
      "Visual Direction",
      "Story Development",
      "Moodboards",
      "Art Direction",
      "Production Direction",
      "Creative Review"
    ],
    "sections": [
      {
        "heading": "What creative direction brings to a project",
        "paragraphs": [
          "Creative direction is the thinking that connects the parts of a project. It helps decide what the work should say, how it should feel, and how the idea should appear across images, film, design, sound, and other creative elements.",
          "Without a clear direction, a project can become a collection of good-looking parts that do not belong together. The script may suggest one tone, the visuals another, and the final edit something else. Creative direction gives the team a shared point of view and a basis for making decisions.",
          "CREATE approaches creative direction as a link between research, concept, and execution. It starts with understanding the brief and audience, then develops a direction that can guide the work. The exact role depends on the project and may cover concept development, visual direction, story development, moodboards, art direction, production direction, and creative review."
        ]
      },
      {
        "heading": "Understanding the brief and the audience",
        "paragraphs": [
          "A creative direction should answer the brief, not just express a personal taste. Before choosing a visual style or story, the team needs to understand the goal, the audience, the context, and the message. These details help define what the work needs to do.",
          "Research can include reviewing the brand, its existing communication, the category, audience expectations, and references relevant to the brief. The goal is to find useful insight and avoid choosing a direction only because it looks current.",
          "The audience matters because creative choices affect how a message is received. Tone, pace, visual language, and level of detail all shape the experience. A direction that works for one audience or platform may not fit another. Understanding the context gives the creative a stronger foundation."
        ]
      },
      {
        "heading": "Concept development and the central idea",
        "paragraphs": [
          "A concept gives the project a clear creative centre. It connects the message with a story, visual idea, or experience that can be developed into the final work. The concept should be distinctive, but it also needs to be relevant to the brief and possible to execute.",
          "CREATE can develop concept routes, story ideas, visual references, moodboards, scripts, or other tools that make the direction easier to assess. These materials help stakeholders understand not only what the work may look like, but why the approach fits the task.",
          "A strong concept also helps the team decide what to leave out. Creative work often improves when it has a clear focus. When the central idea is understood, details can support it rather than compete for attention."
        ]
      },
      {
        "heading": "Visual language and tone",
        "paragraphs": [
          "Visual language includes the choices that shape the look of the work: framing, colour, lighting, typography, composition, texture, movement, and image treatment. Tone includes the way the story speaks and feels. Together, they create a recognisable point of view.",
          "Creative direction helps those choices work as one system. A playful idea may need a different pace and visual treatment from a serious or reflective story. A brand film may need a different tone from a short promotional video. The direction should fit the subject and the intended audience.",
          "Moodboards and references can help communicate the direction, but they are starting points rather than a substitute for decisions. The team needs to translate references into a clear approach that suits the brand, the brief, and the production conditions."
        ]
      },
      {
        "heading": "Guiding production and execution",
        "paragraphs": [
          "Creative direction continues after the concept is approved. During production, it helps the team make choices about performance, composition, locations, design, movement, and other details. During post-production, it helps guide the edit, sound, colour, graphics, and final finish.",
          "This does not mean every decision needs to be fixed in advance. Production often brings new information or constraints. A clear direction gives the team a framework for adapting while keeping the work connected to the original idea.",
          "CREATE can support creative review across the stages included in the agreed scope. That may mean reviewing scripts, storyboards, production plans, edits, design layouts, or final assets. The purpose is to protect the central idea while making the work stronger through execution."
        ]
      },
      {
        "heading": "Working across teams and disciplines",
        "paragraphs": [
          "Creative projects often involve several people and skill sets. Writers, designers, directors, producers, editors, motion artists, clients, and other partners may each contribute to the outcome. A clear direction helps everyone understand what they are working toward.",
          "The process works best when roles and approvals are understood. Creative direction should help the team make decisions, not create confusion about who owns them. The project brief should establish responsibilities, review points, and how feedback will be handled.",
          "CREATE connects the creative idea with the work needed to produce it. Depending on the project, we can work with internal teams or external collaborators. The scope and responsibilities should be agreed before the project begins."
        ]
      },
      {
        "heading": "Creative review and refinement",
        "paragraphs": [
          "Review is more useful when it has clear criteria. Instead of asking only whether a piece feels right, the team can check whether it communicates the intended message, fits the direction, serves the audience, and works in its final format.",
          "Creative review may involve scripts, storyboards, rough cuts, design routes, motion tests, or final outputs. The review stage depends on the project. Feedback should be specific enough to guide improvement and prioritised so the team can focus on what matters most.",
          "Refinement is not the same as adding more. Sometimes the best change is to remove a detail, simplify the message, or give the main idea more room. Creative direction helps keep those decisions tied to the purpose of the work."
        ]
      },
      {
        "heading": "What creative direction can include",
        "paragraphs": [
          "Depending on the brief, creative direction can include concept development, visual direction, story development, moodboards, art direction, production direction, and creative review. It can support a single deliverable or guide a wider campaign with several connected assets.",
          "The exact role should be clear from the start. Some projects need direction through the concept stage. Others need a partner who stays involved through production and post-production. Defining the stages, decision rights, and deliverables helps the team work with confidence.",
          "CREATE confirms the scope around the project rather than applying one fixed process to every brief. The aim is to provide the level of direction that helps the work stay focused and connected."
        ]
      },
      {
        "heading": "Give the idea a clear point of view",
        "paragraphs": [
          "Creative direction brings intention to the details. It gives the project a clear concept, a consistent visual language, and a way to make decisions as the work moves from planning to production and final delivery.",
          "CREATE brings research, creative thinking, and execution together. We help shape the direction so the story and the way it is told feel connected. The precise role depends on the brief and may be part of a larger production project or a defined creative direction engagement.",
          "If you have a brief that needs a stronger idea, a more consistent visual approach, or a clearer link between concept and execution, tell us what you are trying to make. We can discuss the direction, the people involved, and the support the project needs."
        ]
      },
      {
        "heading": "Making decisions with a shared brief",
        "paragraphs": [
          "Creative direction becomes more useful when the team agrees on the brief and the way decisions will be made. The brief should define the goal, audience, message, tone, deliverables, constraints, and approval path. These details give the team a common reference when new ideas or production challenges appear.A shared brief does not remove creative exploration. It gives exploration a purpose. The team can consider different routes while judging each against the same needs. CREATE uses the brief to connect research, concept development, visual language, and execution. Clear decision points also help prevent endless rounds of subjective feedback and keep the work moving toward a finished result."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does a creative director do?",
        "answer": "A creative director shapes the central idea and guides how it is expressed through story, visuals, tone, and execution. The role can include concept development, visual direction, and creative review."
      },
      {
        "question": "When should a project bring in creative direction?",
        "answer": "Creative direction is useful when a project needs a clear point of view, a consistent visual language, or guidance connecting the brief with production and final delivery."
      },
      {
        "question": "What is the difference between creative direction and art direction?",
        "answer": "Creative direction usually guides the wider idea, tone, and execution. Art direction focuses more closely on visual expression. Responsibilities can overlap depending on the project."
      },
      {
        "question": "Can CREATE provide creative direction without production?",
        "answer": "The scope should be discussed at the start. Creative direction can be a separate service or connected to production, depending on the project's needs."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Tell us what you are trying to make and where the idea needs more focus. We can discuss the direction, scope, and support required.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work",
    "order": 6
  },
  "performance-marketing": {
    "slug": "performance-marketing",
    "name": "Performance Marketing",
    "h1": "Creative That Can Perform.",
    "seoTitle": "Performance Marketing Services | CREATE",
    "metaDescription": "CREATE connects creative production with paid campaigns, audience targeting, testing, optimisation, and performance reporting.",
    "primaryKeyword": "performance marketing agency",
    "supportingKeywords": [
      "performance marketing services",
      "paid advertising",
      "Meta Ads",
      "Google Ads",
      "campaign optimisation",
      "performance reporting"
    ],
    "intro": "Performance marketing connects creative work with measurable campaign goals. CREATE brings creative production together with paid campaign planning, audience targeting, testing, optimisation, and reporting so the message and the media work toward a defined objective.",
    "image": "/images/services/performance-marketing.webp",
    "whatWeDo": [
      "Meta Ads",
      "Google Ads",
      "Campaign Strategy",
      "Audience Targeting",
      "Creative Testing",
      "Campaign Optimisation",
      "Performance Reporting"
    ],
    "sections": [
      {
        "heading": "Performance starts with a clear objective",
        "paragraphs": [
          "Performance marketing uses paid campaigns and measurement to work toward defined actions. Depending on the business, that may mean visits, enquiries, registrations, purchases, or another conversion. The right objective depends on the offer, the audience, and the wider business goal.",
          "A campaign needs more than a platform and a budget. It needs a clear message, a useful landing experience, a way to measure actions, and a plan for reviewing results. Without those pieces, campaign data can be difficult to interpret and decisions can become guesswork.",
          "CREATE connects paid campaign thinking with creative production. We consider what the audience needs to understand, what the creative should communicate, and what action the campaign is asking people to take. The scope may include Meta Ads, Google Ads, campaign strategy, audience targeting, creative testing, optimisation, and performance reporting."
        ]
      },
      {
        "heading": "Research, offer, and audience",
        "paragraphs": [
          "Before a campaign launches, the team needs to understand the offer and the audience. What is being promoted? Why might someone care? What questions or barriers could affect the decision? Where is the audience likely to look for information or take action?",
          "Research can include reviewing the brief, existing campaign data, audience information, the website or landing page, and the competitive context. The depth depends on the project and the information available. The goal is to make the campaign plan more grounded in the business and its audience.",
          "Targeting is one part of this work, not the whole strategy. A relevant audience still needs a clear offer and creative that communicates it. A strong campaign connects audience selection, message, landing experience, and measurement."
        ]
      },
      {
        "heading": "Meta Ads and Google Ads",
        "paragraphs": [
          "Meta Ads can help brands reach people across social platforms using creative formats suited to the feed, story, reel, or other placement. Campaigns may be built around different objectives, audiences, and creative approaches. The setup should follow the goal and the available tracking.",
          "Google Ads can connect a brand with people searching for relevant products, services, or information. Search campaigns rely on the relationship between search intent, keywords, ad copy, and landing pages. Other campaign types have different requirements and should be chosen based on the brief.",
          "CREATE can support paid campaign planning and execution within the agreed scope. Platform features change, and campaign choices should be made based on current account conditions, objectives, and data. No platform or campaign type guarantees a result by itself."
        ]
      },
      {
        "heading": "Creative testing and campaign learning",
        "paragraphs": [
          "Creative has a direct role in how a campaign communicates. The first image, headline, opening seconds, offer, and call to action can affect whether people understand the message and decide to act. Testing helps the team learn which creative approaches work better under the conditions of the campaign.",
          "Useful tests start with a clear question. The team may compare different messages, formats, visuals, or calls to action. Testing too many things at once can make the result hard to interpret. A clear process helps separate what changed from what the data suggests.",
          "CREATE connects creative production with performance work so that creative is not treated as an afterthought. The aim is to produce assets that serve the campaign goal and can be reviewed against performance. The right testing plan depends on budget, volume, timing, and the campaign's measurement setup."
        ]
      },
      {
        "heading": "Landing pages and the conversion path",
        "paragraphs": [
          "An ad is only one step in the journey. After clicking, a person needs to find a page that matches the message and makes the next step clear. If the page is slow, confusing, or unrelated to the ad, the campaign can lose interested visitors before they convert.",
          "The landing page should carry the same promise and language as the campaign. It should explain the offer, answer important questions, make the action easy to find, and work well on mobile. Form length, page structure, proof, and user experience can all affect the conversion path.",
          "The campaign scope should make clear who is responsible for the landing page, analytics, tracking, and any technical changes. CREATE can consider the creative and conversion experience as part of the campaign plan, with development or tracking work confirmed separately where needed."
        ]
      },
      {
        "heading": "Measurement, optimisation, and reporting",
        "paragraphs": [
          "Performance marketing depends on measurement, but data only helps when it is understood in context. Clicks, cost per click, conversion rate, cost per lead, and return measures can each tell part of the story. The right metrics depend on the campaign objective and the quality of the tracking.",
          "Optimisation is the process of reviewing performance and making informed changes. This may involve creative, targeting, bids, budgets, landing pages, or campaign structure, depending on the platform and the evidence available. Changes should be made with a clear reason, not simply because a number moved on one day.",
          "Reporting should explain what happened, what the data can support, and what the team recommends next. It should also make limits clear. Attribution, tracking gaps, delayed conversions, and outside factors can affect the figures. Honest reporting is more useful than a dashboard without explanation."
        ]
      },
      {
        "heading": "Creative and media need to work together",
        "paragraphs": [
          "A campaign can have careful targeting and still struggle if the message does not connect. It can also have strong creative but fail to convert if the offer, landing page, or tracking is weak. Performance marketing works best when the parts are considered together.",
          "CREATE's creative production background helps connect the message with the campaign. Commercials, branded content, social videos, and campaign assets can be planned with their paid use in mind. This does not remove the need for audience research or measurement. It helps make the creative part of the strategy rather than a last-minute addition.",
          "The right scope depends on the project. Some engagements may focus on paid campaigns, while others may include creative development, landing-page input, or reporting. Responsibilities and deliverables should be clear before launch."
        ]
      },
      {
        "heading": "What performance marketing can include",
        "paragraphs": [
          "Depending on the brief, performance marketing may include Meta Ads, Google Ads, campaign strategy, audience targeting, creative testing, campaign optimisation, and performance reporting. The right mix depends on the objective, available data, budget, and the actions the campaign needs to support.",
          "Measurement should be agreed before launch. This includes defining the conversion, checking the tracking setup, and confirming how results will be reported. If tracking is incomplete, the team should identify that limitation rather than treating every reported number as complete.",
          "CREATE works to connect the creative idea with campaign execution. The specific responsibilities, platforms, budgets, and deliverables should be confirmed before work begins."
        ]
      },
      {
        "heading": "Build campaigns around learning",
        "paragraphs": [
          "Performance marketing is not a promise of instant growth. Results depend on the offer, audience, competition, budget, timing, creative, landing experience, and tracking. The value of a disciplined process is that it gives the team a way to learn and make better decisions over time.",
          "CREATE connects campaign objectives with creative thinking, paid media, testing, and reporting. We focus on clear goals and a practical process that can be reviewed against the available data. We do not promise a fixed cost per lead, return, or volume before understanding the project.",
          "If you are planning a paid campaign, share the objective, audience, offer, current setup, and measurement available. We can discuss the work needed to build a campaign and review its performance with care."
        ]
      },
      {
        "heading": "Setting expectations before launch",
        "paragraphs": [
          "Before a paid campaign begins, agree on the objective, conversion definition, budget, reporting window, and tracking method. A lead, a qualified lead, a sale, and a booked appointment are different outcomes. The reporting should name the action being measured so the team does not compare unlike figures.It is also useful to record the starting point where reliable data exists. That may include current traffic, conversion rates, cost measures, or the state of the landing page. A baseline gives the team context when reviewing later results. CREATE uses clear definitions to support more useful campaign discussions. This does not guarantee a result, but it helps the team judge performance with less guesswork and make changes for a clear reason."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does a performance marketing agency do?",
        "answer": "A performance marketing agency plans, manages, and measures paid campaigns around defined actions such as leads, registrations, purchases, or enquiries."
      },
      {
        "question": "Which platforms can CREATE support?",
        "answer": "Depending on the project scope, CREATE can support Meta Ads and Google Ads, along with campaign strategy, audience targeting, creative testing, optimisation, and reporting."
      },
      {
        "question": "Can performance marketing guarantee leads or sales?",
        "answer": "No. Outcomes depend on the offer, audience, budget, competition, creative, landing page, and tracking. A credible campaign sets goals and measures results without promising guaranteed outcomes."
      },
      {
        "question": "What should be measured in a performance campaign?",
        "answer": "Measures depend on the objective and may include conversions, cost per lead, conversion rate, click costs, or revenue-based measures where reliable tracking exists."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Share the objective, audience, offer, current setup, and available measurement. We can discuss a paid campaign approach built around clear goals and useful reporting.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work",
    "order": 7
  },
  "post-production": {
    "slug": "post-production",
    "name": "Post-Production",
    "h1": "The Final Frame Matters.",
    "seoTitle": "Post-Production Studio & Video Editing | CREATE",
    "metaDescription": "CREATE brings editing, motion, colour, sound, visual effects, and finishing together to shape the final creative output.",
    "primaryKeyword": "post-production studio",
    "supportingKeywords": [
      "video editing services",
      "motion graphics studio",
      "colour grading",
      "sound design",
      "visual effects"
    ],
    "intro": "Production captures the material. Post-production shapes the final experience. CREATE brings footage, design, motion, colour, sound, and finishing together to turn raw material into a considered final output.",
    "image": "/images/services/post-production.webp",
    "whatWeDo": [
      "Video Editing",
      "Motion Graphics",
      "Animation",
      "Colour Grading",
      "Sound Design",
      "Visual Effects",
      "Social Cutdowns",
      "Final Mastering"
    ],
    "sections": [
      {
        "heading": "The work continues after the shoot",
        "paragraphs": [
          "A shoot creates the material, but the final story often becomes clear in the edit. The order of shots, the length of a moment, the sound, and the visual finish all affect how the audience experiences the work. Post-production is where those elements are brought together.",
          "CREATE approaches post-production as a creative stage, not only a technical one. The goal is to serve the story and the approved direction while making the final work clear, coherent, and ready for its intended use. The exact requirements depend on the project, the footage, the format, and the agreed deliverables.",
          "Post-production may include editing, motion graphics, animation, colour grading, sound design, visual effects, social cutdowns, subtitles, and final mastering. Not every project needs every service. The scope should reflect what the material and the final output require."
        ]
      },
      {
        "heading": "Editing and story structure",
        "paragraphs": [
          "Editing shapes the pace and meaning of a film. It decides what the audience sees first, how information is revealed, where a pause matters, and how the story moves from one moment to the next. A good edit gives the work structure without drawing attention to every decision.",
          "The process begins by understanding the brief, footage, script, and intended audience. The editor then shapes the material into a sequence that supports the story. Depending on the project, this may involve rough cuts, feedback rounds, fine cuts, and final approval.",
          "Editing is also a process of selection. Not every shot or line belongs in the final film. Removing material can make the message stronger and the pacing clearer. The aim is to keep the details that serve the idea and let go of those that distract from it."
        ]
      },
      {
        "heading": "Motion graphics and animation",
        "paragraphs": [
          "Motion graphics can explain, emphasise, or connect information that may be difficult to communicate through footage alone. Titles, labels, graphic transitions, animated diagrams, and designed elements can give a film a clear visual structure. Animation may also be used when the idea requires movement or imagery that cannot be captured in a live-action shoot.",
          "The motion approach should match the wider creative direction. Type, timing, movement, and graphic style need to work with the footage and the brand. Motion should not be added only to make a video feel busy. Each element should support the message or the experience.",
          "CREATE can include motion graphics and animation where they suit the brief. The complexity, style, and number of assets affect the scope, so requirements should be agreed before production begins."
        ]
      },
      {
        "heading": "Colour grading and visual consistency",
        "paragraphs": [
          "Colour grading helps shape the final look of a film. It can create consistency between shots, support the mood, and bring the images closer to the intended visual direction. The process depends on the footage, the lighting conditions, the desired finish, and the delivery requirements.",
          "A consistent grade does not mean every shot has the same colour values. Different scenes may need different treatment while still feeling part of the same film. The aim is to make the visual choices feel deliberate and keep the images working together.",
          "Colour work should be considered alongside the wider project. If the commercial or branded film has a clear visual direction, grading helps carry that direction into the final output. The final files should also be checked for the intended delivery format and viewing conditions."
        ]
      },
      {
        "heading": "Sound design and audio finishing",
        "paragraphs": [
          "Sound can guide attention, create atmosphere, and help the story feel complete. Dialogue, voiceover, music, effects, room tone, and silence each have a role. Poorly balanced audio can distract from strong images, while thoughtful sound design can give a moment greater clarity and feeling.",
          "Sound work may include dialogue cleanup, sound effects, music editing, mixing, and other finishing tasks, depending on the brief. Music and other third-party materials also need the right permissions and licences for the intended use. Those rights should be confirmed rather than assumed.",
          "CREATE considers sound as part of the final experience. The mix should support the story and meet the requirements of the destination platform. Different outputs may have different audio needs, so delivery specifications should be clear."
        ]
      },
      {
        "heading": "Visual effects and finishing",
        "paragraphs": [
          "Visual effects can help complete a shot, remove distractions, combine elements, or create an image that serves the concept. The need may be subtle or complex. The appropriate approach depends on the footage, the creative direction, and the final use.",
          "Finishing also includes practical checks. The team reviews the approved edit, graphic elements, colour, sound, titles, captions, and export settings. Version names and final files should be organised so the client can identify the correct output.",
          "The goal is not to make every frame look heavily processed. The goal is to make the final work feel complete and consistent with the direction. The right level of finishing is the level the project needs."
        ]
      },
      {
        "heading": "Cutdowns and delivery formats",
        "paragraphs": [
          "A final film may need multiple versions for different placements. These can include shorter edits, vertical formats, alternate aspect ratios, captions, language versions, or platform-specific exports. Each version needs to preserve the message while working within its technical limits.",
          "Cutdowns need editorial judgement. Removing time from a film can affect the story, so the shortened version may need a different structure or opening. A vertical version may need reframing or a different visual hierarchy. Planning these needs early helps the production capture material that can support the final set.",
          "CREATE can prepare agreed versions and exports as part of the post-production scope. Duration, aspect ratio, file type, captions, language, and delivery platform should be confirmed before finishing begins."
        ]
      },
      {
        "heading": "What post-production can include",
        "paragraphs": [
          "Depending on the brief, post-production can include video editing, motion graphics, animation, colour grading, sound design, visual effects, social cutdowns, and final mastering. Some projects need a full finishing process, while others require one or two specific services.",
          "The material and intended output shape the scope. A dialogue-led film may need careful audio work. A product commercial may require detailed visual finishing. A social campaign may need several versions with different durations and aspect ratios. The work should be planned around the actual deliverables.",
          "CREATE confirms the technical requirements, review stages, and final formats before work begins. This gives the team a clear basis for editing, finishing, and delivery."
        ]
      },
      {
        "heading": "A careful finish from first cut to final file",
        "paragraphs": [
          "Post-production brings the creative choices together. Editing, motion, colour, sound, effects, and mastering should support one another rather than feel like separate tasks. A clear brief and review process help the team protect the story while improving the details.",
          "CREATE connects post-production with the wider creative direction and production process. We work from the purpose of the piece and the needs of its final use. The scope is confirmed based on the material, complexity, timeline, and deliverables.",
          "If you have footage that needs a clear edit, a commercial that needs finishing, or campaign assets that need platform-ready versions, tell us about the project. We can discuss the material, the intended result, and the post-production support required."
        ]
      },
      {
        "heading": "Clear feedback and version control",
        "paragraphs": [
          "Post-production moves faster when feedback is specific and consolidated. Comments should identify the moment, explain the issue, and say what needs to change. Conflicting notes from several reviewers can lead to extra rounds, so the project should define who collects and approves feedback.Version control matters as well. Rough cuts, review exports, and final masters should be clearly labelled so the team knows which file is current. The delivery list should include the agreed durations, aspect ratios, captions, language versions, and file formats. CREATE confirms these details as part of the post-production scope. A clear review process gives creative decisions room to improve while protecting the schedule and reducing confusion around final delivery."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does a post-production studio do?",
        "answer": "A post-production studio shapes filmed material into final output through editing, motion graphics, animation, colour grading, sound design, visual effects, and mastering."
      },
      {
        "question": "What are video editing services?",
        "answer": "Video editing services organise footage into a clear story, shape pacing, refine transitions, and prepare versions for the intended audience and platform."
      },
      {
        "question": "Can CREATE make short social edits from a longer video?",
        "answer": "Yes, when cutdowns are included in the project scope. Each version should be edited for its duration, format, and intended use."
      },
      {
        "question": "What files are needed for post-production?",
        "answer": "The required material depends on the project. It may include footage, audio, graphics, scripts, references, brand assets, and clear delivery specifications."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Tell us about the footage, the intended output, and the formats you need. CREATE can discuss the edit, finishing requirements, and final delivery.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work",
    "order": 8
  },
  "social-media-marketing": {
    "slug": "social-media-marketing",
    "name": "Social Media Marketing",
    "h1": "Social Content Built Around the Brand.",
    "seoTitle": "Social Media Marketing Agency | CREATE",
    "metaDescription": "CREATE combines social strategy and creative production to build content that fits the platform, audience, and brand.",
    "primaryKeyword": "social media marketing agency",
    "supportingKeywords": [
      "social media management",
      "social media strategy",
      "social campaigns",
      "reels production",
      "creator content"
    ],
    "intro": "Social media needs more than frequent posting. CREATE combines social strategy with creative production to build content that fits the platform, the audience, and the brand's point of view.",
    "image": "/images/services/social-media-marketing.webp",
    "whatWeDo": [
      "Social Strategy",
      "Content Planning",
      "Social Campaigns",
      "Reels",
      "UGC",
      "Creator Content",
      "Community Content",
      "Performance Tracking"
    ],
    "sections": [
      {
        "heading": "Social media needs a plan",
        "paragraphs": [
          "A social presence can become busy without becoming useful. Posting often is not a strategy by itself. Brands need to understand who they are speaking to, what they want to communicate, and why the audience should care. A clear plan helps each piece of content serve a purpose.",
          "CREATE begins by understanding the brand, audience, channels, and goals. The plan may need to build familiarity, explain a product, share a point of view, support a campaign, or give people a closer look at the brand. The objective shapes the content and the way it should be reviewed.",
          "Social media marketing connects strategy, content planning, creative production, publishing needs, and performance tracking. The exact scope varies by project. The important thing is to create a system that fits the brand rather than copying a posting formula that may not suit it."
        ]
      },
      {
        "heading": "Platform and audience fit",
        "paragraphs": [
          "Each social platform has its own habits, formats, and expectations. A vertical video, carousel, story, static post, and longer video do not work in the same way. The content should fit the place where people will see it and the reason they use that platform.",
          "Audience understanding matters as much as format. What does the audience want to learn, see, or discuss? What questions do they have? What tone will feel appropriate? These questions help the team choose content that is relevant instead of simply filling a calendar.",
          "CREATE considers platform and audience fit during planning. The aim is not to be everywhere without a clear reason. It is to choose the formats and channels that suit the brand's needs and produce content that works in those settings."
        ]
      },
      {
        "heading": "Content planning and social campaigns",
        "paragraphs": [
          "A content plan creates a rhythm for the brand's communication. It can group content into themes, formats, and publishing windows. It also helps the team balance different kinds of posts, such as educational content, brand stories, product information, campaign creative, and community-led ideas.",
          "Social campaigns need a more focused structure. They may support a launch, event, announcement, or wider campaign. The creative should connect to the central idea and make the intended action clear. Depending on the brief, a campaign may include a lead asset and supporting posts or video variations.",
          "CREATE develops social strategy and content planning around the brief and the audience. We do not assume every brand needs the same number of posts or formats. The plan should be realistic to produce and useful to the people it is meant to reach."
        ]
      },
      {
        "heading": "Reels, video, and creator content",
        "paragraphs": [
          "Short-form video gives brands a way to communicate through movement, voice, demonstration, and story. Reels and other social videos often need a clear opening, strong pacing, and an idea that can be understood quickly. The format should support the message rather than dictate it.",
          "Creator content can add a distinct voice or perspective. The fit depends on the creator, audience, brief, and intended use. The brand still needs clear expectations and an agreed direction, but the content should not lose the qualities that make the creator's work feel natural.",
          "CREATE can develop reels, UGC-style content, creator-led pieces, social videos, and other assets within the agreed scope. We consider how the content will appear on the platform and what role it plays in the wider plan."
        ]
      },
      {
        "heading": "A consistent brand without repetitive posts",
        "paragraphs": [
          "Consistency helps people recognise a brand, but repetition can make the feed feel stale. A useful social system needs a clear visual language and voice, along with enough variety to keep the content relevant.",
          "Brand consistency may come through colour, type, image treatment, tone, recurring formats, or the way ideas are expressed. It does not require every post to use the same layout. The system should allow different subjects and formats while keeping a recognisable connection to the brand.",
          "CREATE connects creative direction with social production. That helps the content feel like part of the same brand while giving each post a reason to exist. The result should be a considered body of work, not a feed made from unrelated templates."
        ]
      },
      {
        "heading": "Publishing, community, and responsibilities",
        "paragraphs": [
          "A social media engagement can include different responsibilities: strategy, creative development, content production, scheduling, publishing, community management, paid promotion, and reporting. These services are related, but they are not the same. The project scope should make clear which tasks are included.",
          "Community management may involve responding to comments and messages, escalating issues, or following agreed brand guidelines. Publishing requires access, approvals, timing, and a clear process for handling changes. These practical details affect how the work runs day to day.",
          "CREATE defines the role and deliverables with the client before work begins. If the project includes publishing or community work, responsibilities and approval times should be agreed. If it focuses on strategy and production, those limits should also be clear."
        ]
      },
      {
        "heading": "Performance tracking and improvement",
        "paragraphs": [
          "Social media results should be read against the purpose of the content. Reach and views can show distribution, while saves, shares, comments, clicks, and other actions may help explain how people respond. The right measures depend on the channel and the goal.",
          "A report should not simply list numbers. It should explain what the figures suggest, what they cannot prove, and what may be worth testing next. Performance can be affected by the audience, timing, format, platform changes, distribution, and other factors outside the creative itself.",
          "CREATE can connect social content with a clear review process where measurement is part of the agreed scope. Learning from the response helps the team improve the plan over time. It does not mean every post will perform equally or that a particular outcome can be guaranteed."
        ]
      },
      {
        "heading": "What social media marketing can include",
        "paragraphs": [
          "Depending on the brief, social media marketing can include social strategy, content planning, social campaigns, reels, UGC, creator content, community content, and performance tracking. Publishing and community management should be clearly included in the agreed scope if they are required.",
          "The right mix depends on the brand, audience, channels, and available production resources. A brand may need a focused campaign, a recurring content plan, or a combination of both. The number of posts matters less than whether the content serves a clear purpose and can be made well.",
          "CREATE confirms the plan, responsibilities, formats, and review process before work begins. This helps the team set realistic expectations and keep the content connected to the brand's wider communication."
        ]
      },
      {
        "heading": "Social content with a point of view",
        "paragraphs": [
          "The strongest social presence gives people a reason to recognise and return to a brand. That comes from a clear point of view, relevant ideas, and creative that fits the way people use each platform.",
          "CREATE brings social strategy and creative production together. We help brands plan content, develop social campaigns, and produce assets such as reels, creator content, and campaign visuals. The exact scope depends on the brand's needs and the channels involved.",
          "If your social content feels inconsistent or disconnected from the brand, start with the audience and the purpose. Tell us what you need social media to do, what content you can produce, and where you want the brand to show up. We can discuss a plan built around those needs."
        ]
      },
      {
        "heading": "Building a workable social workflow",
        "paragraphs": [
          "A useful social workflow connects planning, production, approvals, publishing, and review. It should define who supplies information, who approves posts, how urgent changes are handled, and which person owns each platform task. Without clear roles, even a good content plan can stall.CREATE helps define the work around the channels and formats included in the brief. A realistic schedule should leave enough time to create content well, check details, and adapt assets to each platform. The workflow should also allow the team to learn from audience response without changing direction after every post. Clear roles and a steady review rhythm make social media work easier to manage and more consistent with the brand."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does a social media marketing agency do?",
        "answer": "A social media marketing agency plans and creates content for social platforms. Depending on the scope, this may include strategy, content planning, campaigns, reels, creator content, publishing, and performance tracking."
      },
      {
        "question": "Does social media marketing include community management?",
        "answer": "It can, but community management should be confirmed in the scope. Strategy and content production do not automatically include replying to every comment or message."
      },
      {
        "question": "What content can CREATE produce for social media?",
        "answer": "Depending on the brief, CREATE can produce reels, social videos, creator content, UGC-style content, campaign assets, and other platform-specific creative."
      },
      {
        "question": "How is social media marketing measured?",
        "answer": "Measures depend on the goal and can include reach, views, engagement, saves, shares, clicks, or conversions where tracking is available."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Tell us what you need social media to do, what content you can produce, and where you want the brand to show up. CREATE can discuss a plan around those needs.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work?filter=social",
    "order": 9
  },
  "visual-storytelling": {
    "slug": "visual-storytelling",
    "name": "Visual Storytelling",
    "h1": "Stories People Can See.",
    "seoTitle": "Visual Storytelling Studio | CREATE",
    "metaDescription": "CREATE uses film, photography, design, motion, sound, and creative direction to turn ideas into clear visual stories.",
    "primaryKeyword": "visual storytelling studio",
    "supportingKeywords": [
      "visual storytelling agency",
      "brand storytelling",
      "brand films",
      "commercial films",
      "promotional videos"
    ],
    "intro": "Visual storytelling turns ideas into experiences. CREATE uses film, photography, design, motion, sound, and creative direction to build stories that communicate clearly and leave a lasting impression.",
    "image": "/images/services/visual-storytelling.webp",
    "whatWeDo": [
      "Brand Films",
      "Commercial Films",
      "Promotional Videos",
      "Photography",
      "Motion",
      "Campaign Visuals",
      "Story Development"
    ],
    "sections": [
      {
        "heading": "Why visual storytelling matters",
        "paragraphs": [
          "People do not experience a brand only through words. They see its images, watch its films, hear its sound, and form an impression from the details. Visual storytelling brings those elements together to communicate an idea through an experience rather than a list of statements.",
          "A strong visual story has a reason to be told. It gives the audience a point of entry, a clear thread to follow, and a connection to the subject. The story may explain a product, express a brand point of view, introduce a place, or communicate an idea through a film or campaign.",
          "CREATE approaches visual storytelling by connecting the brief, audience, and creative idea. We consider what needs to be communicated and which visual form will help the audience understand it. The aim is not to make everything cinematic. It is to use the right images, sequence, sound, and direction for the story."
        ]
      },
      {
        "heading": "Finding the story inside the brief",
        "paragraphs": [
          "A brief often begins with a need: explain something, introduce something, show a difference, or create a particular feeling. The creative task is to find the story that can carry that need without turning the work into a list of claims.",
          "Research helps the team understand the context and identify useful angles. It may include conversations, brand material, audience questions, references, and the intended platform. The research should guide the idea rather than become a report that sits apart from the creative.",
          "Once the story is clear, the team can decide how it should be told. It may need a human point of view, a product demonstration, a sequence of images, a voiceover, or a visual metaphor. The form should grow from the story and the audience, not from a fixed template."
        ]
      },
      {
        "heading": "Film, photography, design, and motion",
        "paragraphs": [
          "Visual storytelling can use several forms. Film can combine movement, performance, sound, and editing. Photography can capture a moment, detail, or point of view. Design can create a clear visual hierarchy or make abstract information easier to understand. Motion can guide attention and connect ideas over time.",
          "These tools do not need to compete. They can work together as part of one visual language. A brand film may use graphic elements to clarify a message. A campaign may connect still images with motion assets. A product story may use close-up photography and sound to focus attention on a detail.",
          "CREATE chooses the tools that serve the brief. The scope may include brand films, commercial films, promotional videos, photography, motion, campaign visuals, and story development. The final combination depends on the idea and the planned use."
        ]
      },
      {
        "heading": "Building a visual language",
        "paragraphs": [
          "A visual language is the set of choices that gives a story its look and feel. It may include framing, movement, light, colour, texture, typography, sound, and pace. When those choices work together, the story feels intentional.",
          "The visual language should fit the subject and the audience. A quiet, close perspective may suit one story, while another may need scale, speed, or a more graphic approach. References can help communicate the direction, but the team still needs to define how the idea will be expressed in the actual work.",
          "CREATE develops visual direction around the story and the brand. This helps the team make connected choices across production and post-production. The result should not rely on style alone. The visual treatment needs to help the audience understand or feel something that matters to the story."
        ]
      },
      {
        "heading": "Story structure and pacing",
        "paragraphs": [
          "The order of information shapes the way a story is understood. An opening creates a reason to continue. The middle develops the idea. The ending gives the story a sense of completion or a clear next step. Not every visual story follows a traditional beginning, middle, and end, but every story benefits from structure.",
          "Pacing affects how people experience the work. A quick edit can create energy or urgency. A slower sequence can give a detail more weight. Silence, sound, movement, and stillness can all influence the meaning of a moment.",
          "CREATE considers structure and pacing during concept development and editing. The approach depends on the format and duration. A short social video may need to communicate quickly, while a longer film may have room to build a more layered story."
        ]
      },
      {
        "heading": "Visual storytelling across formats",
        "paragraphs": [
          "A story may need to appear in more than one place. A film can be supported by stills, short edits, social content, or campaign visuals. Each format has its own limits and opportunities, so the story may need to be adapted rather than simply resized.",
          "Planning these uses early helps the team decide what material to create and how the pieces should connect. A campaign can keep a shared idea across formats while changing the amount of detail, pace, and call to action for each placement.",
          "CREATE can develop visual storytelling as a single film or as part of a wider campaign. The exact deliverables should be agreed at the start. This helps ensure the creative idea is supported by a practical production plan."
        ]
      },
      {
        "heading": "Craft, detail, and finishing",
        "paragraphs": [
          "Visual storytelling depends on the details. Framing, performance, transitions, sound, colour, and the final edit all affect the audience's experience. The work should be reviewed as a whole, not only as a collection of technically correct shots.",
          "Post-production gives the team a chance to refine the story. Editing establishes the sequence, sound adds texture and clarity, colour supports the visual direction, and motion or graphics can help communicate key information. Every finishing choice should support the idea.",
          "CREATE connects creative direction with production and post-production where the project scope allows. This helps preserve the original point of view while refining the final output for its intended use."
        ]
      },
      {
        "heading": "What visual storytelling can include",
        "paragraphs": [
          "Depending on the brief, visual storytelling can include brand films, commercial films, promotional videos, photography, motion, campaign visuals, and story development. It may be a single finished film or a set of connected assets designed for different placements.",
          "The right form depends on the story and the audience. A subject may need a short film, a visual sequence, a product demonstration, or a wider campaign system. The work should be built around what needs to be communicated, not a preference for one format.",
          "CREATE confirms the story, creative direction, deliverables, and intended use before production begins. This makes the relationship between the idea and the final work clear."
        ]
      },
      {
        "heading": "Tell the story in the right way",
        "paragraphs": [
          "Visual storytelling is not simply about making attractive images. It is about finding the right way to communicate an idea through images, movement, sound, and sequence. The story needs to matter to the audience and connect naturally to the brand or subject.",
          "CREATE brings research, creative direction, production, and finishing together to shape visual stories. We look for the idea that can carry the message and choose the forms that help it work.",
          "If you need a brand film, commercial, promotional video, or a set of campaign visuals, tell us what the audience needs to understand and what the work should make them notice. We can discuss the story, the creative direction, and the production approach."
        ]
      },
      {
        "heading": "Choosing the right form for the story",
        "paragraphs": [
          "Not every idea needs a large production. Some stories are best told through a focused film, while others may need a sequence of stills, motion graphics, photography, or a set of short edits. The choice should follow the message, audience, context, and intended use.CREATE considers the production needs alongside the story. A more complex visual treatment may require additional planning, locations, talent, design, or post-production. A simpler approach can be stronger when it gives the idea more focus. Discussing these choices early helps the team decide what is essential and what is optional. The aim is to make the creative form serve the story rather than letting production scale become the story itself."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is visual storytelling?",
        "answer": "Visual storytelling communicates an idea through images, film, photography, design, motion, sound, and sequence rather than relying on words alone."
      },
      {
        "question": "What does a visual storytelling studio create?",
        "answer": "Depending on the brief, it may create brand films, commercial films, promotional videos, photography, motion assets, campaign visuals, and story concepts."
      },
      {
        "question": "How is visual storytelling different from video production?",
        "answer": "Video production is one way to create a visual story. Visual storytelling begins with the idea and the way it should be communicated, then chooses the right formats and production methods."
      },
      {
        "question": "Can visual storytelling support a campaign?",
        "answer": "Yes. A visual story can become a campaign's central idea and be adapted into films, stills, social content, and other assets."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Tell us what the audience needs to understand and what the work should make them notice. CREATE can discuss the story, visual direction, and production approach.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work?filter=films",
    "order": 10
  },
  "website-development": {
    "slug": "website-development",
    "name": "Website Development",
    "h1": "Websites Built for Brands and Business.",
    "seoTitle": "Website Development Services | CREATE",
    "metaDescription": "CREATE develops websites that bring brand identity, content, user experience, SEO foundations, and business goals together.",
    "primaryKeyword": "website development company",
    "supportingKeywords": [
      "website development agency",
      "business website development",
      "website design",
      "CMS integration",
      "conversion-focused websites"
    ],
    "intro": "A website should do more than look good. CREATE develops websites that bring brand identity, content, user experience, SEO foundations, and business goals together in one clear digital experience.",
    "image": "/images/services/website-development.webp",
    "whatWeDo": [
      "Website Design",
      "Website Development",
      "Landing Pages",
      "Responsive Development",
      "CMS Integration",
      "SEO Foundations",
      "Conversion-Focused Pages"
    ],
    "sections": [
      {
        "heading": "A website is part of the brand experience",
        "paragraphs": [
          "A website is often where people go to understand a business in more detail. It needs to show what the brand does, make important information easy to find, and help visitors take the next step. A strong visual design matters, but it is only one part of the experience.",
          "CREATE approaches website development by connecting the brand, content, user journey, and technical build. The work begins with understanding the purpose of the site, the people who will use it, and the actions it needs to support. Those needs shape the structure, design, and features.",
          "A business website may need to explain services, show work, publish articles, capture enquiries, or support another task. The right structure depends on the goal. Building around that goal helps avoid a site that looks polished but leaves visitors unsure what to do next."
        ]
      },
      {
        "heading": "Planning the structure and user journey",
        "paragraphs": [
          "Before design begins, the site needs a clear structure. Pages should reflect the information visitors need and the questions they may have. Navigation should help people move through the site without forcing them to guess where information is hidden.",
          "CREATE can help define page architecture, content sections, navigation, and calls to action. The plan should also consider how people arrive at the site. Someone coming from a search result may need a direct answer, while someone viewing a portfolio project may want to see related work or contact the team.",
          "A clear user journey does not mean every visitor follows the same path. It means the site makes useful paths easy to find. The structure should support the main goals while allowing people to explore the brand at their own pace."
        ]
      },
      {
        "heading": "Design that fits the brand",
        "paragraphs": [
          "Website design should express the brand while helping people use the site. Typography, colour, spacing, images, movement, and layout all affect the experience. The design needs to feel distinctive, but it also needs to support readability, navigation, and the content.",
          "CREATE connects visual design with the wider brand system. This helps the website feel like a natural part of the brand rather than a separate template. The design process should consider the actual content and the way it will appear across desktop, tablet, and mobile screens.",
          "A responsive website should adapt to different screen sizes without losing its structure or making important actions hard to use. The team should review the key pages at different widths and test forms, navigation, media, and other interactive elements."
        ]
      },
      {
        "heading": "Development and CMS integration",
        "paragraphs": [
          "Development turns the approved design into a working website. Depending on the project, this may include page templates, reusable components, content management, forms, media handling, and integrations with other systems. The technical approach should fit the site's needs and the people who will maintain it.",
          "A content management system can make it easier for a team to update articles, images, page details, or other content without changing code. The right CMS depends on the content model, publishing process, access needs, and expected growth. Editing tools should be practical for the people who will use them.",
          "CREATE confirms the required features and responsibilities before development begins. Complex integrations, custom dashboards, e-commerce, or other advanced features should be scoped clearly rather than assumed to be included in every website project."
        ]
      },
      {
        "heading": "SEO foundations and content structure",
        "paragraphs": [
          "Search visibility starts with a site that helps search engines and people understand the content. Each important page needs a clear topic, useful copy, logical headings, descriptive metadata, and links to related pages. Technical foundations also matter, including crawlability, indexation, canonical URLs, redirects, and a sitemap where appropriate.",
          "CREATE can build SEO foundations into the website structure. This may include editable page titles and meta descriptions, semantic heading structure, image alt text, internal links, responsive layouts, and performance considerations. The exact SEO scope should be confirmed, because technical setup is not the same as ongoing SEO strategy or guaranteed rankings.",
          "Content should be written for the visitor first. Keywords help define what a page needs to cover, but repeating them without purpose makes the page harder to read. A useful page answers the visitor's question and makes the next step clear."
        ]
      },
      {
        "heading": "Performance, accessibility, and quality checks",
        "paragraphs": [
          "A website should load reliably, work across common devices, and make its content easy to use. Performance can be affected by images, scripts, fonts, third-party tools, hosting, and other factors. Optimisation should focus on the actual site rather than relying on one quick fix.",
          "Accessibility also matters. Text needs sufficient contrast, controls should be usable with a keyboard, forms should have clear labels, and meaningful images need suitable alternative text. These choices help more people use the site and often improve the overall experience.",
          "Before launch, the team should check links, forms, page layouts, mobile behaviour, metadata, redirects, and key interactions. The exact testing process depends on the project, but a site should not be considered ready just because the homepage looks correct."
        ]
      },
      {
        "heading": "Security and ongoing maintenance",
        "paragraphs": [
          "A website needs care after launch. Software updates, hosting, integrations, user access, backups, and content changes can affect its reliability and security. The right maintenance plan depends on the site's technical setup and business needs.",
          "Admin access should be limited to the people who need it. Private settings and data should be protected on the server, not only hidden in the interface. Forms and uploads should be validated, and backups should be considered where the platform supports them.",
          "CREATE can clarify the handover and maintenance responsibilities for the project. Hosting, ongoing support, security monitoring, and future development should be agreed rather than assumed. A clear handover helps the client understand how to manage the site and where to get help."
        ]
      },
      {
        "heading": "What website development can include",
        "paragraphs": [
          "Depending on the brief, website development can include website design, responsive development, landing pages, CMS integration, SEO foundations, and conversion-focused pages. More advanced needs such as e-commerce, booking systems, custom tools, or integrations should be scoped separately when required.",
          "The project plan should make clear which content will be supplied by the client, which content CREATE will help develop, and who is responsible for domain, hosting, analytics, and third-party services. These practical details affect delivery and ongoing ownership.",
          "CREATE confirms the required features, technical approach, and handover before development begins. This helps the site meet its purpose while keeping the scope clear."
        ]
      },
      {
        "heading": "Build a site that supports the next step",
        "paragraphs": [
          "A good website combines clear information, a strong visual identity, useful content, and a reliable technical foundation. It should help visitors understand the brand and make the next step easier, whether that means exploring work, reading an article, enquiring about a service, or completing another action.",
          "CREATE brings creative thinking and development together so the site supports both brand expression and practical use. We consider structure, content, design, SEO foundations, and the features required for the project. The scope depends on the goals and complexity of the site.",
          "If you are planning a new website or improving an existing one, tell us what the site needs to do, who will use it, and what content or systems it must support. We can discuss the structure, design direction, technical requirements, and next steps."
        ]
      },
      {
        "heading": "Clear scope before the build",
        "paragraphs": [
          "A website project should define its pages, content needs, features, integrations, and ownership before development starts. It should also identify who supplies copy, images, legal information, and other materials. Missing content or late feature changes can affect the schedule, so these dependencies need to be visible from the start.CREATE confirms the requirements and explains what is included in the build. If a site needs custom workflows, third-party tools, a complex CMS, or ongoing maintenance, those needs should be scoped clearly. A documented handover should explain how to update content, who manages access, and where responsibility sits after launch. Clear scope helps the finished website meet its purpose and gives the client a more useful foundation for future changes."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does a website development company do?",
        "answer": "A website development company plans and builds websites. Depending on the scope, this can include structure, design, responsive development, CMS integration, forms, SEO foundations, and testing."
      },
      {
        "question": "Does CREATE build responsive websites?",
        "answer": "Responsive behaviour should be part of the agreed build. The site should be checked across common screen sizes and devices."
      },
      {
        "question": "Can I edit website content after launch?",
        "answer": "A CMS can allow authorised users to edit content without code changes. The right setup depends on the type of content and the editing needs."
      },
      {
        "question": "Does website development guarantee SEO rankings?",
        "answer": "No. A website can include sound SEO foundations, but rankings depend on many factors, including content quality, competition, authority, technical health, and search intent."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Tell us what the site needs to do, who will use it, and what content or systems it must support. CREATE can discuss the structure, design direction, and technical requirements.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work",
    "order": 11
  },
  "brand-and-visual-design": {
    "slug": "brand-and-visual-design",
    "name": "Brand & Visual Design",
    "h1": "Visual Design That Supports the Story",
    "seoTitle": "Creative Design Studio & Brand Visuals | CREATE",
    "metaDescription": "CREATE develops visual identity, campaign design, key visuals, and creative assets that help brands communicate with clarity and consistency.",
    "primaryKeyword": "creative design studio",
    "supportingKeywords": [
      "brand design agency",
      "campaign design agency",
      "visual identity design",
      "advertising creative",
      "brand guidelines"
    ],
    "intro": "Design should do more than make something look good. It should help an idea communicate. CREATE develops visual systems for campaigns, content, advertising, and brand communication, connecting the brief, audience, idea, and final execution.",
    "image": "/images/services/brand-and-visual-design.webp",
    "whatWeDo": [
      "Visual Identity",
      "Campaign Design",
      "Key Visuals",
      "Advertising Creative",
      "Social Media Design",
      "Motion Design",
      "Brand Guidelines"
    ],
    "sections": [
      {
        "heading": "Design with a job to do",
        "paragraphs": [
          "Good design begins with a reason. A visual identity needs to help people recognise a brand. A campaign visual needs to make an idea clear at a glance. A social asset needs to work in the space and format where people will see it. Every design choice should support the message, not compete with it.",
          "CREATE approaches brand and visual design as part of a wider creative process. Before choosing colours, type, images, or shapes, we look at the brief and what the work needs to achieve. We consider who the audience is, what they already know, what they need to understand, and what the brand wants to say. That context gives the design a purpose.",
          "The result should feel considered, not decorated. Strong visual work has a clear point of view, but it also has a clear role. It helps the brand speak in a recognisable way across different places and formats."
        ]
      },
      {
        "heading": "Visual identity that holds together",
        "paragraphs": [
          "A visual identity gives a brand a set of cues people can recognise. These may include a logo, colour palette, typography, graphic elements, image direction, layout rules, and guidance for how the pieces work together. The aim is not to make every asset look identical. It is to make each asset feel like it belongs to the same brand.",
          "CREATE can help shape or refine these elements around the brand's positioning and communication needs. The process begins by understanding what already exists and what needs to change. Some projects call for a new visual direction. Others need a clearer system that makes existing brand assets easier to use.",
          "A useful identity system needs to work in real conditions. It should hold up across digital screens, campaign layouts, presentations, social content, and other planned uses. Guidelines should explain the key rules without making the system hard to apply. The right level of detail depends on the brand, its team, and the work it needs to produce."
        ]
      },
      {
        "heading": "Campaign design and key visuals",
        "paragraphs": [
          "Campaign design turns a central idea into a visual language people can recognise. The key visual often sets the tone for the wider campaign. It can guide advertising layouts, social content, landing pages, event materials, and other supporting assets.",
          "CREATE develops campaign design around the message, audience, and planned use. We consider the hierarchy of information, the role of imagery, the space needed for copy, and how the design may adapt across formats. A strong key visual should be memorable, but it also needs to be practical enough to work across the campaign.",
          "Campaign assets should feel connected without becoming repetitive. Different placements have different jobs. A social post may need to stop a scroll; a landing page visual may need to support a decision; a display ad may need to communicate one clear message quickly. A shared design system helps those assets feel related while allowing each one to work in its own context."
        ]
      },
      {
        "heading": "Advertising and social media creative",
        "paragraphs": [
          "Advertising creative must make the message clear in a short amount of time. The visual needs to work with the copy, offer, and call to action. It should be easy to understand at the size and speed at which people will see it.",
          "For social media, the design also needs to respect platform behaviour. A vertical video cover, carousel, story, and static post each have different constraints. CREATE can develop social media design and advertising creative that fit those formats while keeping the brand's visual language consistent.",
          "We consider legibility, contrast, cropping, visual hierarchy, and the relationship between the first impression and the full message. Where the assets are part of a wider campaign, we can build a set of variations that explore different messages or visual routes. The exact deliverables are agreed based on the brief and the platforms involved."
        ]
      },
      {
        "heading": "Motion design and visual systems",
        "paragraphs": [
          "Some ideas need movement. Motion design can guide attention, explain a sequence, introduce a product, or give a campaign a more expressive visual rhythm. It can also help connect static assets with film and social content.",
          "CREATE can develop motion-led design as part of a wider visual system. That may include animated graphic elements, titles, transitions, social motion assets, or campaign-specific visual treatments. Motion should support the message rather than add movement for its own sake.",
          "The same principle applies to the full design system. Each choice should have a reason, and the system should be flexible enough to support future content. A brand may need to communicate through many formats over time. Clear visual rules help teams create new assets without losing the identity that makes the brand recognisable."
        ]
      },
      {
        "heading": "Our process: Connect, research, execute",
        "paragraphs": [
          "We begin by connecting with the people behind the brief and understanding the work's purpose. We research the audience, context, existing brand, and visual references that may help shape the direction. We then develop design routes that respond to the brief rather than starting with decoration.",
          "Once a direction is agreed, we build and refine the assets. We review how the work functions across its intended formats and make adjustments where needed. Final files and guidelines are prepared according to the agreed scope, so the team knows what has been supplied and how it can be used.",
          "The process is collaborative, but it also needs clear decisions. A defined brief, feedback process, and approval path help keep the work focused. The exact stages and deliverables vary by project, so the scope is confirmed before production begins."
        ]
      },
      {
        "heading": "What the service can include",
        "paragraphs": [
          "Depending on the project, brand and visual design work may include visual identity development, campaign design, key visuals, advertising creative, social media design, motion design, and brand guidelines. Not every project needs every service. The work should fit the problem, not the other way around.",
          "CREATE keeps the focus on the connection between the idea and its visual expression. We want the design to communicate clearly, feel distinctive, and work where the audience will encounter it. We also consider how the assets will be used after handover, because a visual system is most useful when people can apply it consistently.",
          "We do not treat a list of deliverables as proof of success. The value of the work depends on how well it answers the brief and supports the brand's communication. Where relevant, the project can be documented through the actual work, the design rationale, and approved examples."
        ]
      },
      {
        "heading": "Design systems for real use",
        "paragraphs": [
          "A visual system should be practical for the people who need to use it. A guide that is too vague can lead to inconsistent work. A guide that is too complex can slow teams down. The right system gives people enough direction to make choices while leaving room for the idea and format.",
          "This includes thinking about how the design works in different sizes, how type behaves in long and short messages, how images are selected, and how visual elements can be combined. The system should also make clear which choices are fixed and which can change.",
          "CREATE can help define these rules as part of an identity or campaign project. The exact level of documentation depends on who will use the system and how often new creative assets will be made. The goal is consistency that supports the work, not rules for their own sake."
        ]
      },
      {
        "heading": "A design partner for considered creative work",
        "paragraphs": [
          "A creative design studio should bring more than software skills to a project. It should ask useful questions, understand the brief, explain the thinking behind the work, and make design choices that serve a purpose.",
          "CREATE brings research, creative direction, and execution together. Brand and visual design is one part of a wider creative production offering that includes campaigns, branded content, commercials, and visual storytelling. That connection can help the design remain aligned with the story and the final output.",
          "If you need a new visual identity, a campaign design system, or creative assets for a specific project, start with the problem you need to solve. Tell us what you are building, who needs to understand it, and where the work will appear. We can then discuss the right scope and creative direction."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does a creative design studio do?",
        "answer": "A creative design studio develops visual identities and design assets that help brands communicate. Depending on the brief, this can include campaign design, key visuals, advertising creative, social media design, motion design, and brand guidelines."
      },
      {
        "question": "What is included in brand and visual design?",
        "answer": "The scope can include visual identity, campaign assets, key visuals, typography and colour systems, advertising creative, social media design, motion design, and guidelines. The final scope depends on the project."
      },
      {
        "question": "Does CREATE only design logos?",
        "answer": "No. Logo design may be part of an identity project, but CREATE's visual design work also covers campaigns, content, advertising, and wider brand communication."
      },
      {
        "question": "How do we start a design project?",
        "answer": "Share the brief, audience, goal, and intended use. CREATE can then discuss the creative direction, scope, timeline, and deliverables."
      }
    ],
    "ctaHeading": "Start a project",
    "ctaText": [
      "Tell us what you are building, who needs to understand it, and where the work will appear. We can discuss the right visual direction, scope, and deliverables.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work?filter=design",
    "order": 1,
    "isAlias": true,
    "canonicalSlug": "brand-visual-design"
  },
  "influencer-marketing": {
    "slug": "influencer-marketing",
    "name": "Influencer Marketing",
    "h1": "Influencer Marketing Built on Strategy & Creator Direction",
    "seoTitle": "Influencer Marketing Agency & Campaign Case Study | CREATE",
    "metaDescription": "CREATE develops influencer marketing campaigns connecting strategy, discovery, creator scripting, and performance tracking. Explore our Shiva Immersive campaign case study.",
    "primaryKeyword": "influencer marketing agency",
    "supportingKeywords": [
      "influencer marketing services",
      "influencer campaign management",
      "influencer strategy",
      "creator ideation",
      "influencer scripting",
      "influencer discovery",
      "shiva immersive case study",
      "creator campaign roi"
    ],
    "intro": "Influencer marketing succeeds when creative direction leads creator partnerships. CREATE bridges brand objectives and authentic creator storytelling—managing every stage from campaign planning and audience alignment to scripting, coordination, and performance tracking.",
    "image": "/images/services/social-media-marketing.webp",
    "whatWeDo": [
      {
        "title": "Influencer Strategy & Campaign Planning",
        "desc": "We establish clear campaign goals, target messaging, and distribution channels before engaging creators, ensuring content serves measurable brand outcomes."
      },
      {
        "title": "Influencer Discovery & Selection",
        "desc": "We identify and evaluate creators based on authentic voice, aesthetic alignment, community credibility, and verified audience resonance."
      },
      {
        "title": "Audience & Brand Fit",
        "desc": "We analyze demographic alignment and audience overlap to ensure every creator collaboration feels natural and genuinely engages the target audience."
      },
      {
        "title": "Creative Ideation",
        "desc": "We develop original creative directions, storytelling angles, and campaign hooks that feel natural to creators while reinforcing core brand narratives."
      },
      {
        "title": "Content Concepts & Scripting",
        "desc": "We craft structured narrative briefs, storyline concepts, and creator scripts that balance brand messaging with the creator's authentic tone."
      },
      {
        "title": "Campaign Coordination",
        "desc": "From initial briefing to production timelines, we manage creator communications and deliverables smoothly from end to end."
      },
      {
        "title": "Content Review & Delivery",
        "desc": "We review drafts, refine messaging and visual polish, and ensure all deliverables align with brand standards prior to publishing."
      },
      {
        "title": "Campaign Performance Tracking",
        "desc": "We monitor campaign delivery, engagement, and reach metrics to assess performance against project objectives."
      }
    ],
    "sections": [
      {
        "heading": "Influencer marketing driven by creative direction",
        "paragraphs": [
          "Creator partnerships work best when they feel authentic to both the creator and the brand. CREATE provides the strategic grounding and narrative direction needed to make influencer collaborations impactful.",
          "Rather than relying on unguided product placements, we build campaign concepts, narrative briefs, and creator scripts that resonate with audiences across Instagram, YouTube, and short-form platforms."
        ]
      },
      {
        "heading": "End-to-end campaign execution",
        "paragraphs": [
          "From creator identification and contract negotiation to review, visual polish, and delivery, our production team handles every step.",
          "We ensure creator assets maintain the aesthetic sophistication of high-end commercial production while preserving the creator's natural voice."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What does an influencer marketing agency do?",
        "answer": "An influencer marketing agency manages the entire lifecycle of creator partnerships: strategy, talent identification, creative direction, scripting, campaign logistics, content review, and performance tracking."
      },
      {
        "question": "How does CREATE approach creator scripting?",
        "answer": "We develop structured storylines and message hooks tailored to each creator's tone, ensuring brand objectives are met naturally without sounding overly commercialized."
      },
      {
        "question": "Can influencer content be repurposed for paid ads?",
        "answer": "Yes. When creator contracts include usage rights, influencer assets can be adapted into high-performing Meta Ads, Spark Ads, and paid social creatives."
      },
      {
        "question": "How do you evaluate campaign success?",
        "answer": "We track engagement rate, views, reach, audience sentiment, and conversion metrics to evaluate both brand uplift and direct return on investment."
      }
    ],
    "ctaHeading": "Start an influencer campaign",
    "ctaText": [
      "Tell us about your brand, campaign objectives, and target audience. We'll outline a tailored creator strategy and production roadmap.",
      "Primary CTA: Start a Project | Secondary CTA: View Our Work"
    ],
    "portfolioLink": "/work",
    "order": 12
  }
};
