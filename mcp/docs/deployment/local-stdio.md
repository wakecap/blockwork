# MCP Server Quick Start Guide

This guide will help you quickly set up the Blockwork Design System MCP server for use with AI agents.

## What is the MCP Server?

The Model Context Protocol (MCP) server exposes the Blockwork UI design system to AI agents, enabling them to:
- Search and discover components
- Access component source code
- Generate usage examples
- Query design tokens (colors, typography, spacing, etc.)
- Get complete component documentation

## Deployment Modes

The MCP server supports three deployment modes:

1. **Local STDIO** (Default) - For Claude Desktop local integration
2. **Remote HTTP** - For cloud hosting with Railway/Render (supports SSE streaming)
3. **Vercel Serverless** - For Vercel deployment (stateless, no SSE streaming)

Choose the setup guide that matches your needs:

---

## Setup: Local STDIO (5 minutes)

### 1. Build the MCP Server

```bash
cd /path/to/blockwork
npm install
npm run mcp:build
```

This creates `mcp/server/dist/index.js` - the compiled server.

### 2. Configure Claude Desktop

**macOS:**
```bash
# Edit the config file
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
# Edit the config file at
%APPDATA%\Claude\claude_desktop_config.json
```

**Add this configuration:**
```json
{
  "mcpServers": {
    "blockwork-design-system": {
      "command": "node",
      "args": ["/absolute/path/to/blockwork/mcp/server/dist/index.js"]
    }
  }
}
```

⚠️ **Important**: Replace `/absolute/path/to/blockwork` with the actual full path to your repository.

**Example:**
```json
{
  "mcpServers": {
    "blockwork-design-system": {
      "command": "node",
      "args": ["/Users/yourname/projects/blockwork/mcp/server/dist/index.js"]
    }
  }
}
```

### 3. Restart Claude Desktop

Close and reopen Claude Desktop to load the MCP server.

### 4. Verify It's Working

In Claude Desktop, try asking:
- "What components are available in Blockwork?"
- "Show me the TopNavigator component"
- "Generate a usage example for TopNavigator with project selection"
- "What colors are in the design system?"
- "Show me the TopNavigator source code"

## Quick Reference

### Available Commands

```bash
npm run mcp:build    # Build the server
npm run mcp:dev      # Build and run (for testing)
npm run mcp:start    # Run built server
```

### Available Resources

- `blockwork://design-system/overview` - System overview
- `blockwork://design-system/components` - All components (JSON)
- `blockwork://design-system/tokens` - Design tokens (JSON)
- `blockwork://components/{Name}` - Component docs (e.g., Button, TopNavigator)

### Available Tools (via AI)

Just ask naturally:
- **Search**: "Find navigation components"
- **Code**: "Show me the TopNavigator source code"
- **Examples**: "How do I use TopNavigator with custom menus?"
- **Tokens**: "What spacing options are available?"
- **Documentation**: "What props does TopNavigator accept?"

## Production-Ready Components

Currently available: **1 component**

1. **TopNavigator** - Full-featured navigation bar
   - Project selector with search
   - Menu dropdown with pinning
   - Avatar menu
   - Settings menu
   - Responsive and mobile-optimized
   - Arabic/RTL support ready
   - Includes: MegaDropdown, Button, Avatar, SearchInput, EmptyState

**More components will be added as they reach production quality.**

## Troubleshooting

### Server not showing up in Claude

1. Check the path in config is absolute (not relative)
2. Verify the server built: `ls mcp/server/dist/index.js`
3. Check Claude Desktop logs for errors
4. Restart Claude Desktop completely

### Build fails

1. Ensure Node.js >= 22.0.0: `node --version`
2. Install dependencies: `npm install`
3. Check for TypeScript errors in `mcp/server/index.ts`

### Components not found

1. Verify you're in the repository root when building
2. Check component paths are correct in `mcp/server/index.ts`
3. Rebuild: `npm run mcp:build`

---

## Setup: Remote HTTP Server (15 minutes)

### Prerequisites

- Railway account (recommended) or any Node.js hosting platform
- GitHub repository for CI/CD (optional)

### 1. Install Dependencies

```bash
npm install express helmet cors express-rate-limit dotenv winston
```

### 2. Generate API Keys

```bash
npm run mcp:generate-key
# Copy the generated API key
```

### 3. Configure Environment Variables

Create `mcp/server/.env`:

```bash
NODE_ENV=production
PORT=3000
API_KEYS=BLOCKWORK_API_KEY_your-generated-key-here
ALLOWED_ORIGINS=https://your-app.com
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_AUTHENTICATED_MAX=500
LOG_LEVEL=info
```

See `mcp/server/.env.example` for all options.

### 4. Local Testing

```bash
# Build the server
npm run mcp:build

# Start HTTP server locally
npm run mcp:http:dev

# Test health endpoint
curl http://localhost:3000/health

# Test MCP endpoint (requires auth)
curl -X POST http://localhost:3000/mcp \
  -H "Authorization: Bearer BLOCKWORK_API_KEY_xxx" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"resources/list","id":1}'
```

### 5. Deploy to Railway

1. **Connect Repository**:
   - Go to [Railway](https://railway.app)
   - Create new project from GitHub repo
   - Railway will auto-detect Node.js

2. **Set Environment Variables**:
   ```
   NODE_ENV=production
   API_KEYS=BLOCKWORK_API_KEY_xxx,BLOCKWORK_API_KEY_yyy
   ALLOWED_ORIGINS=https://your-app.com
   PORT=3000
   ```

3. **Deploy**:
   - Railway will build using `railway.json` config
   - Build command: `npm ci && npm run build && npm run mcp:build`
   - Start command: `MCP_TRANSPORT=http node mcp/server/dist/index.js`

4. **Get Your URL**:
   - Railway provides: `https://your-app.up.railway.app`
   - Access health: `https://your-app.up.railway.app/health`
   - MCP endpoint: `https://your-app.up.railway.app/mcp`

### 6. Configure AI Client

**Claude Desktop HTTP Configuration:**
```json
{
  "mcpServers": {
    "blockwork-design-system": {
      "url": "https://your-app.up.railway.app/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer BLOCKWORK_API_KEY_xxx"
      }
    }
  }
}
```

**Generic HTTP Client:**
```bash
curl -X POST https://your-app.up.railway.app/mcp \
  -H "Authorization: Bearer BLOCKWORK_API_KEY_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "resources/list",
    "params": {},
    "id": 1
  }'
```

### 7. Verify Deployment

```bash
# Check health
curl https://your-app.up.railway.app/health

# Check API docs
curl https://your-app.up.railway.app/api/docs

# Test authenticated request
curl -X POST https://your-app.up.railway.app/mcp \
  -H "Authorization: Bearer BLOCKWORK_API_KEY_xxx" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

### Alternative: Docker Deployment

```bash
# Build Docker image
docker build -f Dockerfile.mcp -t blockwork-mcp:latest .

# Run locally
docker run -p 3000:3000 \
  -e API_KEYS=BLOCKWORK_API_KEY_xxx \
  -e NODE_ENV=production \
  blockwork-mcp:latest

# Deploy to any Docker hosting (Render, Fly.io, AWS ECS, etc.)
```

### HTTP Server Features

- **Authentication**: Bearer token API keys
- **Rate Limiting**:
  - Unauthenticated: 100 requests/minute
  - Authenticated: 500 requests/minute
- **Security**:
  - CORS whitelisting
  - Helmet security headers
  - Input sanitization
  - Request size limits (10MB)
- **Monitoring**:
  - Structured logging (Winston)
  - Health check endpoint
  - Request/response tracking

### HTTP Endpoints

- `GET /health` - Health check (no auth)
- `GET /api/docs` - API documentation (no auth)
- `POST /mcp` - MCP protocol endpoint (requires auth)

### Security Best Practices

1. **API Keys**:
   - Generate unique keys per user/client
   - Rotate keys regularly
   - Never commit keys to version control
   - Revoke compromised keys immediately

2. **Environment Variables**:
   - Store all secrets in environment variables
   - Use `.env` for local development
   - Configure secrets in Railway/hosting platform

3. **CORS**:
   - Whitelist only trusted origins
   - Never use `*` in production
   - Test CORS configuration thoroughly

4. **Rate Limiting**:
   - Adjust limits based on usage patterns
   - Monitor for abuse
   - Implement IP-based blocking if needed

---

## Setup: Vercel Serverless (10 minutes)

### ⚠️ Important: Vercel Limitations

Vercel uses serverless functions with constraints:
- ✅ Works: Stateless requests, authentication, rate limiting
- ❌ Doesn't work: SSE streaming (timeout limits), real-time updates
- ⏱️ Timeout: 10 seconds (Hobby), 60 seconds (Pro)

**Recommendation**: Use Railway/Render if you need SSE streaming.

### Prerequisites

- Vercel account (free tier available)
- GitHub repository

### 1. Quick Deploy via Vercel Dashboard

1. **Connect Repository**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Framework: Other
   - Build Command: `npm run build && npm run mcp:build`

2. **Set Environment Variables**:
   ```
   NODE_ENV=production
   API_KEYS=BLOCKWORK_API_KEY_xxx
   ALLOWED_ORIGINS=https://your-app.com
   ```

3. **Deploy**: Click "Deploy"

4. **Get Your URL**: `https://your-project.vercel.app`

### 2. Test Deployment

```bash
# Health check
curl https://your-project.vercel.app/health

# API docs
curl https://your-project.vercel.app/api/docs

# MCP endpoint
curl -X POST https://your-project.vercel.app/mcp \
  -H "Authorization: Bearer BLOCKWORK_API_KEY_xxx" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"resources/list","id":1}'
```

### 3. Configure Client

```json
{
  "mcpServers": {
    "blockwork-design-system": {
      "url": "https://your-project.vercel.app/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer BLOCKWORK_API_KEY_xxx"
      }
    }
  }
}
```

### Vercel vs Railway Comparison

| Feature | Vercel | Railway |
|---------|--------|---------|
| SSE Streaming | ❌ No | ✅ Yes |
| Timeout | 10-60s | Unlimited |
| Setup | Easiest | Easy |
| Free Tier | Yes | Limited |
| Best For | Simple requests | Streaming |

**See `VERCEL_DEPLOYMENT.md` for detailed guide.**

## Next Steps

- See `mcp/server/README.md` for detailed documentation
- See `CLAUDE.md` for architecture details
- See `README.md` for general design system usage

## Support

- Issues: https://github.com/wakecap/blockwork/issues
- MCP Documentation: https://modelcontextprotocol.io
- Claude Desktop: https://claude.ai/download
