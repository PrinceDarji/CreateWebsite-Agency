export interface ShivaItem {
  id: string;
  name: string;
  client: string;
  category: string;
  url: string;
  type: "reel" | "post";
  instagramId: string;
  thumbnail: string | null;
  slug: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  title?: string;
  client: string;
  category: string;
  slug: string;
  youtubeUrl?: string | null;
  googleDriveId?: string | null;
  image?: string | null;
  aspectRatio?: string;
}

export const shivaReelsData: ShivaItem[] = [
  { 
    id: "shiva-reel-01", 
    name: "Shiva Immersive Reel 1", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdEaYGZJtdM/embed",
    type: "reel",
    instagramId: "DdEaYGZJtdM",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-02", 
    name: "Shiva Immersive Reel 2", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdHNNxMhDTi/embed",
    type: "reel",
    instagramId: "DdHNNxMhDTi",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-03", 
    name: "Shiva Immersive Reel 3", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdEfxbtgt2B/embed",
    type: "reel",
    instagramId: "DdEfxbtgt2B",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-04", 
    name: "Shiva Immersive Reel 4", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdMcOrNOzeM/embed",
    type: "reel",
    instagramId: "DdMcOrNOzeM",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-05", 
    name: "Shiva Immersive Reel 5", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdET8YCs7gl/embed",
    type: "reel",
    instagramId: "DdET8YCs7gl",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-06", 
    name: "Shiva Immersive Reel 6", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdMGo8lhjt1/embed",
    type: "reel",
    instagramId: "DdMGo8lhjt1",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-07", 
    name: "Shiva Immersive Reel 7", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdHVVXry4Ry/embed",
    type: "reel",
    instagramId: "DdHVVXry4Ry",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-08", 
    name: "Shiva Immersive Reel 8", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdEQUVmAub0/embed",
    type: "reel",
    instagramId: "DdEQUVmAub0",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-09", 
    name: "Shiva Immersive Reel 9", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/Ddi5n5uy85g/embed",
    type: "reel",
    instagramId: "Ddi5n5uy85g",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-10", 
    name: "Shiva Immersive Reel 10", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdOywkChsQo/embed",
    type: "reel",
    instagramId: "DdOywkChsQo",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-11", 
    name: "Shiva Immersive Reel 11", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdjAu15AFxJ/embed",
    type: "reel",
    instagramId: "DdjAu15AFxJ",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-12", 
    name: "Shiva Immersive Reel 12", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdEE-1eymon/embed",
    type: "reel",
    instagramId: "DdEE-1eymon",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-13", 
    name: "Shiva Immersive Post 13", 
    client: "Shiva Immersive",
    category: "Community Collaboration · Carousel",
    url: "https://www.instagram.com/p/DdjYkyKCZdN/embed",
    type: "post",
    instagramId: "DdjYkyKCZdN",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-14", 
    name: "Shiva Immersive Reel 14", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdET-GxvqJ1/embed",
    type: "reel",
    instagramId: "DdET-GxvqJ1",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-15", 
    name: "Shiva Immersive Reel 15", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdGw6KDpVx9/embed",
    type: "reel",
    instagramId: "DdGw6KDpVx9",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-16", 
    name: "Shiva Immersive Post 16", 
    client: "Shiva Immersive",
    category: "Community Collaboration · Carousel",
    url: "https://www.instagram.com/p/DdOQlKWEy0I/embed",
    type: "post",
    instagramId: "DdOQlKWEy0I",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-17", 
    name: "Shiva Immersive Reel 17", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdiPifeBtc-/embed",
    type: "reel",
    instagramId: "DdiPifeBtc-",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-18", 
    name: "Shiva Immersive Reel 18", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdiQfbAzFxS/embed",
    type: "reel",
    instagramId: "DdiQfbAzFxS",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-19", 
    name: "Shiva Immersive Reel 19", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DdoIp8uTfvm/embed",
    type: "reel",
    instagramId: "DdoIp8uTfvm",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-20", 
    name: "Shiva Immersive Reel 20", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DeBZ80kSNyh/embed",
    type: "reel",
    instagramId: "DeBZ80kSNyh",
    thumbnail: null,
    slug: "shiv-immersive"
  },
  { 
    id: "shiva-reel-21", 
    name: "Shiva Immersive Reel 21", 
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    url: "https://www.instagram.com/reel/DeBmWeCzTM5/embed",
    type: "reel",
    instagramId: "DeBmWeCzTM5",
    thumbnail: null,
    slug: "shiv-immersive"
  }
];

export const standardProjectsData: PortfolioProject[] = [
  { 
    id: "01", 
    name: "Bhagat Singh Memorial Day", 
    title: "Bhagat Singh Memorial Day",
    client: "PWD Delhi", 
    category: "Museum Inauguration Video",
    youtubeUrl: "https://www.youtube.com/watch?v=4kR-PMhCSc8",
    image: "https://i.ytimg.com/vi/4kR-PMhCSc8/maxresdefault.jpg",
    aspectRatio: "aspect-[21/9]",
    slug: "balidaan-diwas"
  },
  { 
    id: "02", 
    name: "IIAC Promotional Video", 
    title: "IIAC Promotional Video",
    client: "India International Arbitration Centre",
    category: "Promotional Video",
    youtubeUrl: null,
    googleDriveId: "1h5IsPFCKi4eMrLAhvO8kskZGv3Lr0XTL",
    image: "https://lh3.googleusercontent.com/d/1h5IsPFCKi4eMrLAhvO8kskZGv3Lr0XTL=w1920",
    aspectRatio: "aspect-[16/9]",
    slug: "iiac-promo"
  },
  { 
    id: "03", 
    name: "Laut Aaye Budhu", 
    title: "Laut Aaye Budhu",
    client: "Naash", 
    category: "Lyrical Video",
    youtubeUrl: "https://youtu.be/a4S9Q-Tchs4?si=HV1OzDyV0M9cy3NE",
    image: "https://i.ytimg.com/vi/a4S9Q-Tchs4/maxresdefault.jpg",
    aspectRatio: "aspect-[16/9]",
    slug: "laut-aaye"
  },
  {
    id: "04",
    name: "An Effulgence Production",
    title: "An Effulgence Production",
    client: "Effulgence",
    category: "Film & Production Execution",
    youtubeUrl: null,
    googleDriveId: null,
    image: "/images/clients/government-of-meghalaya.webp",
    aspectRatio: "aspect-[16/9]",
    slug: "effulgence"
  }
];
