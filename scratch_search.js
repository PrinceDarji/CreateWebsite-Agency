const fs = require('fs');

const text = fs.readFileSync('sample_embed.html', 'utf8');

const keywords = ['display_url', 'thumbnail', 'poster', 'cover', 'media_id', 'shortcode', 'image', 'video_url'];
for (const kw of keywords) {
  const idx = text.indexOf(kw);
  console.log(kw, idx !== -1 ? 'found at ' + idx : 'not found');
  if (idx !== -1) {
    console.log(text.slice(Math.max(0, idx - 50), idx + 200));
  }
}
