#!/usr/bin/env node

/**
 * Script to move favicon files from subdirectories to public root
 * Run with: node scripts/move-favicons.js
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const faviconForApp = path.join(publicDir, 'favicon-for-app');
const faviconForPublic = path.join(publicDir, 'favicon-for-public');

function moveFile(source, dest) {
  if (fs.existsSync(source)) {
    if (fs.existsSync(dest)) {
      console.log(`⚠️  ${path.basename(dest)} already exists. Backing up...`);
      const backup = `${dest}.backup`;
      fs.copyFileSync(dest, backup);
      console.log(`   Backed up to ${backup}`);
    }
    fs.copyFileSync(source, dest);
    console.log(`✅ Moved ${path.basename(source)} → ${path.basename(dest)}`);
    return true;
  } else {
    console.log(`⚠️  ${source} not found, skipping...`);
    return false;
  }
}

console.log('🚀 Moving favicon files to correct locations...\n');

// Move favicon.ico
moveFile(
  path.join(faviconForApp, 'favicon.ico'),
  path.join(publicDir, 'favicon.ico')
);

// Move apple-touch-icon
moveFile(
  path.join(faviconForApp, 'apple-icon.png'),
  path.join(publicDir, 'apple-touch-icon.png')
);

// Move web app manifest icons (optional - only if they exist)
moveFile(
  path.join(faviconForPublic, 'web-app-manifest-192x192.png'),
  path.join(publicDir, 'favicon-192x192.png')
);

moveFile(
  path.join(faviconForPublic, 'web-app-manifest-512x512.png'),
  path.join(publicDir, 'favicon-512x512.png')
);

console.log('\n✅ Favicon files moved successfully!');
console.log('\n📝 Next steps:');
console.log('   1. Test locally: npm run dev');
console.log('   2. Clear browser cache and hard refresh');
console.log('   3. Deploy to Vercel');
console.log('   4. After verification, you can delete the subdirectories:');
console.log('      rm -rf public/favicon-for-app public/favicon-for-public');

