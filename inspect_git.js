const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function search() {
  const objDir = path.join('.git', 'objects');
  const dirs = fs.readdirSync(objDir);
  for (const dir of dirs) {
    if (dir.length !== 2) continue;
    const files = fs.readdirSync(path.join(objDir, dir));
    for (const file of files) {
      const p = path.join(objDir, dir, file);
      try {
        const decomp = zlib.inflateSync(fs.readFileSync(p));
        const text = decomp.toString('utf8');
        if (text.includes('drive.google.com') || text.includes('googleDriveId') || text.includes('drive')) {
          if (text.toLowerCase().includes('reel') || text.toLowerCase().includes('shiv')) {
            console.log('=== MATCH IN OBJECT:', dir + file);
            text.split('\n').forEach((l, idx) => {
              if (l.includes('drive') || l.includes('Drive') || l.toLowerCase().includes('shiv') || l.toLowerCase().includes('reel')) {
                console.log(`  L${idx}:`, l.trim());
              }
            });
          }
        }
      } catch (e) {}
    }
  }
}

search();
