const fs = require('fs');

async function main() {
  const code = 'DdEaYGZJtdM';
  const res = await fetch('https://www.instagram.com/p/' + code + '/embed/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html'
    }
  });
  const text = await res.text();
  fs.writeFileSync('sample_embed.html', text);
  console.log('Saved sample_embed.html');

  // Search for URLs
  const urls = text.match(/https:\\\/\\\/[^"'\s\\]+/g) || [];
  console.log('Found escaped urls:', urls.length);
  const imgUrls = urls.map(u => u.replace(/\\\//g, '/')).filter(u => u.includes('scontent') || u.includes('.jpg') || u.includes('.webp'));
  console.log('Filtered img urls:', imgUrls.slice(0, 10));
}

main();
