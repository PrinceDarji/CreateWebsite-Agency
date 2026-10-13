async function testOembed() {
  const codes = ['DdEaYGZJtdM', 'DdHNNxMhDTi', 'DdEfxbtgt2B', 'DdMcOrNOzeM'];
  for (const c of codes) {
    try {
      const url = `https://api.instagram.com/oembed/?url=https://www.instagram.com/reel/${c}/`;
      const res = await fetch(url);
      console.log(c, 'oembed status:', res.status);
      const data = await res.json();
      console.log(c, 'oembed data:', data);
    } catch (e) {
      console.log(c, 'error:', e.message);
    }
  }
}
testOembed();
