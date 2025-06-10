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

    // In Netlify Functions, we need to look for the files relative to the function's root
    const basePublicPath = path.join(__dirname, '..', '..', 'public');
    console.log('Current working directory:', process.cwd());
    console.log('Function directory:', __dirname);
    console.log('Base public path:', basePublicPath);
    console.log('Public directory exists:', fs.existsSync(basePublicPath));

    try {
      const publicContents = fs.readdirSync(basePublicPath);
      console.log('Public directory contents:', publicContents);
      console.log('Public directory has projects folder:', publicContents.includes('projects'));
    } catch (err) {
      console.error('Error reading public directory:', err);
    }

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
        console.log('Number of files found:', dirContents.length);

        for (const file of dirContents) {
          console.log('Processing file:', file);
          
          if (!file.endsWith('.md')) {
            console.log(`Skipping non-markdown file: ${file}`);
            continue;
          }

          try {
            const filePath = path.join(contentDir, file);
            console.log('Reading file:', filePath);
            console.log('File exists:', fs.existsSync(filePath));
            console.log('File stats:', fs.statSync(filePath));
            
            const content = fs.readFileSync(filePath, 'utf8');
            console.log('Successfully read file content, length:', content.length);
            
            // Normalize line endings
            const normalizedContent = content.replace(/\r\n/g, '\n');
            
            console.log('File content starts with:', normalizedContent.substring(0, 100).replace(/\n/g, '\\n'));

            // Parse frontmatter with exact format matching
            const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
            const match = normalizedContent.match(frontMatterRegex);
            
            if (match) {
              console.log('Found frontmatter for file:', file);
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

              console.log('Parsed metadata for file:', file, metadata);

              // Get the first paragraph of content for preview if no description
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
              console.log('Successfully added file to allFiles array');
            } else {
              console.log('No frontmatter found in standard format for file:', file);
              // Fallback for files without frontmatter
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
              console.log('Successfully added file to allFiles array (no frontmatter)');
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

    console.log('Total files processed:', allFiles.length);

    // Sort files by date if available, then by filename
    allFiles.sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return a.filename.localeCompare(b.filename);
    });

    console.log('Final files to return:', allFiles.map(f => ({ 
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
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        stack: error.stack
      })
    };
  }
}; 