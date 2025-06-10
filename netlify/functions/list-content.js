const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    const { type } = event.queryStringParameters;
    console.log('Content type requested:', type);
    
    if (!type || !['blog-posts', 'projects'].includes(type)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET'
        },
        body: JSON.stringify({ error: 'Invalid content type' })
      };
    }

    // In Netlify Functions, we need to look for the files in the publish directory
    const basePublicPath = path.join(process.cwd(), 'public');
    const contentDir = path.join(basePublicPath, type);
    
    console.log('Current working directory:', process.cwd());
    console.log('Content directory to check:', contentDir);
    console.log(`Directory ${contentDir} exists:`, fs.existsSync(contentDir));
    
    let allFiles = [];

    // Try to read files from the directory
    try {
      if (fs.existsSync(contentDir)) {
        console.log('Reading directory:', contentDir);
        const dirContents = fs.readdirSync(contentDir);
        console.log('Directory contents:', dirContents);
        console.log('Number of files found:', dirContents.length);

        for (const file of dirContents) {
          if (!file.endsWith('.md')) {
            console.log(`Skipping non-markdown file: ${file}`);
            continue;
          }

          try {
            const filePath = path.join(contentDir, file);
            console.log('Reading file:', filePath);
            
            const content = fs.readFileSync(filePath, 'utf8');
            const normalizedContent = content.replace(/\r\n/g, '\n');
            
            // Parse frontmatter
            const frontMatterMatch = normalizedContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
            
            if (frontMatterMatch) {
              const [, frontMatter, postContent] = frontMatterMatch;
              const metadata = {};
              
              frontMatter.split('\n').forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine && !trimmedLine.startsWith('#')) {
                  const colonIndex = trimmedLine.indexOf(':');
                  if (colonIndex !== -1) {
                    const key = trimmedLine.slice(0, colonIndex).trim();
                    let value = trimmedLine.slice(colonIndex + 1).trim();
                    if (value.startsWith('"') && value.endsWith('"')) {
                      value = value.slice(1, -1);
                    }
                    metadata[key] = value;
                  }
                }
              });

              if (!metadata.description) {
                const preview = postContent
                  .split('\n')
                  .find(line => line.trim().length > 0) || '';
                metadata.description = preview.slice(0, 150) + '...';
              }

              allFiles.push({
                filename: file.replace('.md', ''),
                ...metadata,
                content: postContent.trim(),
                path: path.join(type, file),
                location: type
              });
            } else {
              const titleMatch = normalizedContent.match(/^#\s+(.*)$/m);
              const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
              const preview = normalizedContent
                .split('\n')
                .find(line => line.trim().length > 0 && !line.startsWith('#')) || '';

              allFiles.push({
                filename: file.replace('.md', ''),
                title,
                content: normalizedContent.trim(),
                description: preview.slice(0, 150) + '...',
                path: path.join(type, file),
                location: type
              });
            }
          } catch (err) {
            console.error(`Error processing file ${file}:`, err);
          }
        }
      } else {
        console.log('Content directory does not exist:', contentDir);
      }
    } catch (err) {
      console.error(`Error reading directory ${contentDir}:`, err);
      throw err;
    }

    // Sort files by date if available, then by filename
    allFiles.sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return a.filename.localeCompare(b.filename);
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify(allFiles)
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        stack: error.stack
      })
    };
  }
}; 