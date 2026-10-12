const fs = require('fs');
const path = require('path');

// Fix 1: src/app/work/page.tsx
const workPagePath = 'src/app/work/page.tsx';
if (fs.existsSync(workPagePath)) {
  let content = fs.readFileSync(workPagePath, 'utf8');
  content = content.replace(
    /title:\s*"Shiva Immersive[^"]*",\s*slug:\s*"shiv-immersive",\s*client:\s*"Shiva Immersive",\s*category:\s*"[^"]*",/g,
    'title: "Shiva Immersive",\n    slug: "shiv-immersive",\n    client: "Shiva Immersive",\n    category: "Influencer Marketing · Ideation · Scripting",'
  );
  fs.writeFileSync(workPagePath, content, 'utf8');
  console.log('Updated src/app/work/page.tsx');
}

// Fix 2: src/app/work/[slug]/page.tsx
const slugPagePath = 'src/app/work/[slug]/page.tsx';
if (fs.existsSync(slugPagePath)) {
  let content = fs.readFileSync(slugPagePath, 'utf8');
  content = content.replace(/title:\s*"Shiva Immersive Reels",/g, 'title: "Shiva Immersive",');
  content = content.replace(/brief:\s*"A series of immersive Instagram reels produced for Shiva Immersive\.",/g, 'brief: "We developed and executed the influencer marketing strategy for Shiva Immersive, from campaign ideation and content concepts to creator scripting and short-form execution.",');
  content = content.replace(/services:\s*\["Production", "Social Media", "Post-Production"\]/g, 'services: ["Social Media Marketing", "Influencer Marketing", "Branded Content", "Creative Direction", "Content Marketing"]');
  fs.writeFileSync(slugPagePath, content, 'utf8');
  console.log('Updated src/app/work/[slug]/page.tsx');
}

// Fix 3: src/app/page.tsx
const homePagePath = 'src/app/page.tsx';
if (fs.existsSync(homePagePath)) {
  let content = fs.readFileSync(homePagePath, 'utf8');
  content = content.replace(
    /name:\s*"Shiva Immersive Reels",\s*client:\s*"Shiva Immersive",\s*category:\s*"Reels \/ Social Video",/g,
    'name: "Shiva Immersive", \n      client: "Shiva Immersive",\n      category: "Influencer Marketing · Ideation · Scripting",'
  );
  fs.writeFileSync(homePagePath, content, 'utf8');
  console.log('Updated src/app/page.tsx');
}
