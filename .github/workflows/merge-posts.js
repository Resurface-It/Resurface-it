const fs = require('fs');
const path = require('path');

const blogPostsPath = 'data/blogPosts.ts';
const generatedDir = 'data/generated-posts';

// Read existing blogPosts.ts
let content = fs.readFileSync(blogPostsPath, 'utf8');

// Get all JSON files
const jsonFiles = fs.readdirSync(generatedDir).filter(f => f.endsWith('.json'));

jsonFiles.forEach(file => {
  const jsonPath = path.join(generatedDir, file);
  const postData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // Escape quotes in strings
  const escapeQuotes = (str) => str.replace(/'/g, "\\'");
  const contentArray = postData.content
    .map(para => `    '${escapeQuotes(para)}'`)
    .join(',\n');
  
  // Format as TypeScript object matching your interface
  const postObj = `  {
    slug: '${escapeQuotes(postData.slug)}',
    title: '${escapeQuotes(postData.title)}',
    description: '${escapeQuotes(postData.description)}',
    date: '${postData.date}',
    tags: [${postData.tags.map(t => `'${t}'`).join(', ')}],
    content: [
${contentArray}
    ],
  },`;
  
  // Insert before the closing bracket of blogPosts array
  content = content.replace(
    /^(export const blogPosts: BlogPost\[\] = \[)/m,
    `$1\n${postObj}`
  );
  
  // Delete the JSON file
  fs.unlinkSync(jsonPath);
});

// Write updated file
fs.writeFileSync(blogPostsPath, content);
console.log('✅ Blog posts merged successfully');
