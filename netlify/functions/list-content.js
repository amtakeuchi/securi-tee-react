const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    console.log('Function environment:', {
      cwd: process.cwd(),
      nodeEnv: process.env.NODE_ENV,
      netlifyDevMode: process.env.NETLIFY_DEV === 'true'
    });

    const { type } = event.queryStringParameters;
    
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

    // Define the content directory based on type
    const basePublicPath = path.join(process.cwd(), 'public');
    console.log('Base public path:', basePublicPath);
    console.log('Public directory exists:', fs.existsSync(basePublicPath));

    // Only look in the correct directories as specified in config.yml
    const contentDir = path.join(basePublicPath, type);
    console.log('Content directory to check:', contentDir);
    console.log(`Directory ${contentDir} exists:`, fs.existsSync(contentDir));

    let allFiles = [];

    // Try to read files from the directory
    try {
      if (fs.existsSync(contentDir)) {
        console.log('Reading directory:', contentDir);
        const dirContents = fs.readdirSync(contentDir);
        console.log('Directory contents:', dirContents);

        const files = dirContents
          .filter(file => file.endsWith('.md'))
          .map(file => {
            const filePath = path.join(contentDir, file);
            try {
              console.log('Reading file:', filePath);
              let content = fs.readFileSync(filePath, 'utf8');
              
              // Normalize line endings
              content = content.replace(/\r\n/g, '\n');
              
              console.log('File content starts with:', content.substring(0, 100).replace(/\n/g, '\\n'));

              // Determine the correct path for the file
              const relativePath = path.relative(basePublicPath, contentDir);
              const fileLocation = path.join(relativePath, file);

              // Parse frontmatter with exact format matching
              const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
              const match = content.match(frontMatterRegex);
              
              if (match) {
                console.log('Found frontmatter');
                const [, frontMatter, postContent] = match;
                
                // Parse frontmatter into metadata
                const metadata = {};
                const frontMatterLines = frontMatter.split('\n');
                
                frontMatterLines.forEach(line => {
                  const trimmedLine = line.trim();
                  if (trimmedLine && !trimmedLine.startsWith('#')) {
                    const colonIndex = trimmedLine.indexOf(':');
                    if (colonIndex !== -1) {
                      const key = trimmedLine.slice(0, colonIndex).trim();
                      let value = trimmedLine.slice(colonIndex + 1).trim();
                      // Remove quotes if they exist
                      if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                      }
                      metadata[key] = value;
                    }
                  }
                });

                console.log('Parsed metadata:', metadata);

                // Get the first paragraph of content for preview if no description
                if (!metadata.description) {
                  const preview = postContent
                    .split('\n')
                    .find(line => line.trim().length > 0) || '';
                  metadata.description = preview.slice(0, 150) + '...';
                }

                return {
                  filename: file.replace('.md', ''),
                  ...metadata,
                  content: postContent.trim(),
                  path: fileLocation,
                  location: relativePath
                };
              }

              console.log('No frontmatter found in standard format, trying alternative parsing');
              // Fallback for files without frontmatter
              const titleMatch = content.match(/^#\s+(.*)$/m);
              const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
              const preview = content
                .split('\n')
                .find(line => line.trim().length > 0 && !line.startsWith('#')) || '';

              return {
                filename: file.replace('.md', ''),
                title,
                content: content.trim(),
                description: preview.slice(0, 150) + '...',
                path: fileLocation,
                location: relativePath
              };
            } catch (err) {
              console.error(`Error processing file ${file}:`, err);
              return null;
            }
          })
          .filter(file => file !== null);

        allFiles = [...allFiles, ...files];
      }
    } catch (err) {
      console.error(`Error reading directory ${contentDir}:`, err);
    }

    // Sort files by date if available, then by filename
    allFiles.sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return a.filename.localeCompare(b.filename);
    });

    console.log('Returning files:', allFiles.map(f => ({ 
      filename: f.filename, 
      title: f.title,
      hasContent: !!f.content,
      contentLength: f.content ? f.content.length : 0
    })));

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
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 