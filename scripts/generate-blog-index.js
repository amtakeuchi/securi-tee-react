import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(path.dirname(__dirname), 'public', 'blog-posts');
const OUTPUT_FILE = path.join(path.dirname(__dirname), 'public', 'blog-index.json');

function generateBlogIndex() {
  // Create blog directory if it doesn't exist
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  const posts = fs.readdirSync(BLOG_DIR)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const fullPath = path.join(BLOG_DIR, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      let { data, content } = matter(fileContents);
      
      // If no frontmatter, try to extract title and date from content
      if (Object.keys(data).length === 0) {
        const titleMatch = content.match(/^#\s+(.+)$/m);
        data.title = titleMatch ? titleMatch[1] : filename.replace('.md', '');
        
        // Use file modification time as date if not specified
        data.date = data.date || fs.statSync(fullPath).mtime.toISOString();
      }

      // Extract first paragraph as description if not specified
      if (!data.description) {
        const paragraphMatch = content.match(/^(?!#)(.+)$/m);
        data.description = paragraphMatch ? paragraphMatch[1].trim() : '';
      }

      return {
        filename: filename.replace('.md', ''),
        title: data.title,
        date: data.date,
        description: data.description,
        thumbnail: data.thumbnail || null
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`Generated blog index with ${posts.length} posts`);
}

generateBlogIndex(); 