-- Supabase Schema for CREATE. Website

-- 1. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    website TEXT,
    service TEXT,
    project_type TEXT,
    budget TEXT,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'CREATE Website',
    status TEXT DEFAULT 'NEW', -- NEW, CONTACTED, QUALIFIED, IN_PROGRESS, CONVERTED, CLOSED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS public.portfolio (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client TEXT,
    organisation TEXT,
    category TEXT,
    division TEXT, -- CREATE. Studio, Labs, Social, Events
    description TEXT,
    brief TEXT,
    services TEXT[],
    budget TEXT,
    timeline TEXT,
    year TEXT,
    cover_image TEXT,
    gallery TEXT[],
    youtube_url TEXT,
    video_aspect_ratio TEXT DEFAULT '16:9', -- 16:9, 9:16, 1:1
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TEAM TABLE
CREATE TABLE IF NOT EXISTS public.team (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    photo_url TEXT,
    social_links JSONB,
    display_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. INSIGHTS / CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    body TEXT,
    client TEXT,
    division TEXT,
    platform TEXT,
    content_type TEXT,
    caption TEXT,
    media_url TEXT,
    thumbnail_url TEXT,
    campaign TEXT,
    assigned_person TEXT,
    tags TEXT[],
    internal_notes TEXT,
    status TEXT DEFAULT 'DRAFT', -- IDEA, DRAFT, REVIEW, APPROVED, SCHEDULED, PUBLISHED, ARCHIVED
    visibility TEXT DEFAULT 'INTERNAL', -- INTERNAL, PUBLIC
    publish_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CMS BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    featured_image_alt TEXT,
    author TEXT DEFAULT 'CREATE Editorial Team',
    category TEXT DEFAULT 'Insights',
    tags TEXT[],
    seo_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    og_image TEXT,
    og_title TEXT,
    og_description TEXT,
    status TEXT DEFAULT 'DRAFT', -- DRAFT, IN_REVIEW, SCHEDULED, PUBLISHED, ARCHIVED
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CMS BLOG REVISIONS TABLE
CREATE TABLE IF NOT EXISTS public.blog_revisions (
    id TEXT PRIMARY KEY,
    blog_id TEXT NOT NULL REFERENCES public.blogs(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author TEXT,
    saved_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. CMS HOMEPAGE SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id TEXT PRIMARY KEY,
    section_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT,
    image TEXT,
    image_alt TEXT,
    video_url TEXT,
    cta_text TEXT,
    cta_link TEXT,
    secondary_cta_text TEXT,
    secondary_cta_link TEXT,
    items JSONB,
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. CMS SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    h1 TEXT NOT NULL,
    seo_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    primary_keyword TEXT,
    supporting_keywords TEXT[],
    intro TEXT,
    image TEXT,
    what_we_do JSONB,
    sections JSONB,
    faqs JSONB,
    cta_heading TEXT,
    cta_text TEXT[],
    portfolio_link TEXT,
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. CMS CAMPAIGN REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.campaign_reports (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    overview TEXT,
    objectives TEXT[],
    metrics JSONB,
    deliverables TEXT[],
    roi TEXT,
    results TEXT,
    learnings TEXT[],
    published BOOLEAN DEFAULT true,
    cover_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. CMS MEDIA ASSETS TABLE
CREATE TABLE IF NOT EXISTS public.media_assets (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    mime_type TEXT NOT NULL,
    size BIGINT NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    caption TEXT,
    uploaded_by TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. CMS SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    settings JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. CMS REDIRECT RULES TABLE
CREATE TABLE IF NOT EXISTS public.redirect_rules (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL UNIQUE,
    destination TEXT NOT NULL,
    permanent BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. CMS AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id TEXT PRIMARY KEY,
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    details TEXT,
    ip TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Setup
-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirect_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published content
CREATE POLICY "Public can view published portfolio" ON public.portfolio FOR SELECT USING (published = true);
CREATE POLICY "Public can view published team" ON public.team FOR SELECT USING (published = true);
CREATE POLICY "Public can view public content" ON public.content FOR SELECT USING (visibility = 'PUBLIC' AND status = 'PUBLISHED');
CREATE POLICY "Public can view published blogs" ON public.blogs FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Public can view published campaign reports" ON public.campaign_reports FOR SELECT USING (published = true);
CREATE POLICY "Public can view media assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view redirect rules" ON public.redirect_rules FOR SELECT USING (true);

-- Allow anon to insert leads
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Authenticated Admin/Owner users have full access to everything
CREATE POLICY "Admins have full access to leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to portfolio" ON public.portfolio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to team" ON public.team FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to content" ON public.content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to blog_revisions" ON public.blog_revisions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to homepage_sections" ON public.homepage_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to campaign_reports" ON public.campaign_reports FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to media_assets" ON public.media_assets FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to redirect_rules" ON public.redirect_rules FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to audit_logs" ON public.audit_logs FOR ALL USING (auth.role() = 'authenticated');

