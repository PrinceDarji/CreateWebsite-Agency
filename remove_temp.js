const fs = require('fs');
['inspect_git.js', 'prev_page.tsx', 'prev_work.tsx', 'prev_slug.tsx'].forEach(f => {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log('Removed', f);
  }
});
