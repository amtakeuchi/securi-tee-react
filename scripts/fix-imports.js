import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  '../src/components/BlogListPage.jsx',
  '../src/components/ContactPage.jsx',
  '../src/components/ProjectListPage.jsx',
  '../src/components/BlogPostPage.jsx',
  '../src/components/ProjectPage.jsx',
  '../src/components/Header.jsx',
  '../src/context/ThemeContext.jsx',
  '../src/App.jsx',
  '../src/main.jsx'
];

files.forEach(file => {
  const filePath = path.resolve(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove any existing React imports
  content = content.replace(/^import.*?react['"];?\n/gm, '');
  
  // Add classic runtime import at the top
  content = `import React, { useState, useEffect, useContext } from 'react';\n${content}`;
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated imports in ${file}`);
}); 