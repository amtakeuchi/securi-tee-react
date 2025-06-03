const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    const { type } = event.queryStringParameters;
    
    if (!type || !['blog-posts', 'projects'].includes(type)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid content type' })
      };
    }

    const contentDir = path.join(process.cwd(), 'public', type);
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md'));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // Allow requests from your development and production domains
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify(files)
    };
  } catch (error) {
    console.error('Error listing content:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to list content' })
    };
  }
}; 