const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

async function build() {
  try {
    console.log('Building employment quiz...');
    
    // Read the current minified file
    const currentFile = fs.readFileSync('webflow-quiz.min.js', 'utf8');
    
    // Get version from package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const version = packageJson.version;
    
    // Create versioned filename
    const versionedFilename = `webflow-quiz.v${version}.min.js`;
    
    // Copy current file to versioned filename
    fs.writeFileSync(versionedFilename, currentFile);
    
    // Create _headers file for Cloudflare Pages
    const headersContent = `/*
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
`;
    
    fs.writeFileSync('_headers', headersContent);
    
    // Create _redirects for fallback
    const redirectsContent = `/*    /index.html   200`;
    fs.writeFileSync('_redirects', redirectsContent);
    
    console.log(`✅ Built version ${version}`);
    console.log(`📁 Created: ${versionedFilename}`);
    console.log(`📁 Created: _headers`);
    console.log(`📁 Created: _redirects`);
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
