// Netlify serverless function to publish content to GitHub
// This requires environment variables:
// - GITHUB_TOKEN: Personal access token with repo write permissions
// - WRITE_PASSWORD: Password to access the write form
// - GITHUB_REPO: Owner/repo (e.g., "username/justalida")

const https = require('https');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { filename, content, password } = JSON.parse(event.body);

    // Validate password
    if (password !== process.env.WRITE_PASSWORD) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid password' })
      };
    }

    // Validate required fields
    if (!filename || !content) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing filename or content' })
      };
    }

    // Get GitHub credentials from environment
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || 'alida-laney/justalida';
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!githubToken) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GitHub token not configured' })
      };
    }

    // Prepare file path in repo
    const filePath = `_content/${filename}`;

    // Base64 encode the content
    const encodedContent = Buffer.from(content).toString('base64');

    // Prepare commit message
    const commitMessage = `Add content: ${filename}\n\n🤖 Created via mobile form`;

    // GitHub API request to create/update file
    const githubData = JSON.stringify({
      message: commitMessage,
      content: encodedContent,
      branch: branch
    });

    const githubOptions = {
      hostname: 'api.github.com',
      port: 443,
      path: `/repos/${githubRepo}/contents/${filePath}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': githubData.length,
        'Authorization': `token ${githubToken}`,
        'User-Agent': 'justalida-write-form',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    // Make request to GitHub API
    const githubResponse = await new Promise((resolve, reject) => {
      const req = https.request(githubOptions, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            data: JSON.parse(data)
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(githubData);
      req.end();
    });

    // Check if successful
    if (githubResponse.statusCode === 201) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: true,
          message: 'Content published successfully',
          url: githubResponse.data.content.html_url
        })
      };
    } else if (githubResponse.statusCode === 422) {
      // File already exists - would need to get SHA and update
      return {
        statusCode: 409,
        body: JSON.stringify({
          error: 'File already exists. Try a different title.',
          details: githubResponse.data
        })
      };
    } else {
      return {
        statusCode: githubResponse.statusCode,
        body: JSON.stringify({
          error: 'GitHub API error',
          details: githubResponse.data
        })
      };
    }

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
