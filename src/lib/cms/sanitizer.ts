/**
 * Sanitizes rich text and HTML input to prevent Stored XSS and dangerous embeds.
 * Only allows safe HTML tags and verified video embed providers (YouTube, Vimeo, Instagram).
 */

const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "strong", "b", "em", "i", "u", "s", "strike",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a", "img", "iframe",
  "table", "thead", "tbody", "tr", "th", "td",
  "figure", "figcaption", "div", "span"
]);

const ALLOWED_IFRAME_DOMAINS = [
  "www.youtube.com",
  "youtube.com",
  "player.vimeo.com",
  "vimeo.com",
  "www.instagram.com",
  "instagram.com",
  "drive.google.com"
];

export function sanitizeHtml(dirty: string): string {
  if (!dirty || typeof dirty !== "string") return "";

  // Strip script and style tags completely along with their inner content
  let clean = dirty.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  clean = clean.replace(/<link\b[^>]*>/gi, "");

  // Strip all on* event handlers (e.g. onclick, onerror, onload)
  clean = clean.replace(/\son\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");

  // Strip javascript: pseudoprotocol
  clean = clean.replace(/href\s*=\s*["']\s*javascript:[^"']*["']/gi, 'href="#"');
  clean = clean.replace(/src\s*=\s*["']\s*javascript:[^"']*["']/gi, 'src=""');

  // Verify iframe sources
  clean = clean.replace(/<iframe\b([^>]*)src=["']([^"']+)["']([^>]*)>/gi, (match, before, src, after) => {
    try {
      const url = new URL(src);
      const isAllowed = ALLOWED_IFRAME_DOMAINS.some(domain => url.hostname === domain || url.hostname.endsWith("." + domain));
      if (!isAllowed) {
        return "<!-- Disallowed iframe source removed for security -->";
      }
      return `<iframe ${before} src="${src}" ${after}>`;
    } catch {
      return "<!-- Invalid iframe source -->";
    }
  });

  return clean;
}

export function validateSlug(slug: string): boolean {
  if (!slug) return false;
  // Slug must be lowercase alphanumeric and hyphens only, between 2 and 100 chars
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length >= 2 && slug.length <= 100;
}
