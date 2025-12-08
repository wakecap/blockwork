# MCP Server Deployment Configurations

This directory contains all deployment configurations for the Blockwork MCP Server across different platforms.

## Available Deployment Options

### 1. Railway (Recommended for Production)
**File**: `railway.json`

- ✅ Full SSE streaming support
- ✅ Unlimited timeouts
- ✅ Auto-scaling
- 💰 **Cost**: $5-20/month

**Guide**: [Railway Deployment Guide](../docs/deployment/railway.md)

### 2. Vercel (Serverless)
**File**: `vercel.json`

- ✅ Easiest deployment
- ✅ Auto-scaling
- ❌ No SSE streaming
- ⏱️ Timeout: 10-60 seconds
- 💰 **Cost**: $0-20/month (Free tier available)

**Guide**: [Vercel Deployment Guide](../docs/deployment/vercel.md)

### 3. Docker
**File**: `Dockerfile`

- ✅ Full control
- ✅ Deploy anywhere
- ✅ Multi-stage optimized build
- 💰 **Cost**: Varies by platform

**Guide**: [Docker Deployment Guide](../docs/deployment/docker.md)

### 4. Claude Desktop (Local)
**File**: `mcp-config.json`

- ✅ Local development
- ✅ Full feature support
- ✅ No deployment needed
- 💰 **Cost**: Free

**Guide**: [Local STDIO Setup](../docs/deployment/local-stdio.md)

## Quick Comparison

| Platform | SSE Streaming | Timeout | Setup Difficulty | Cost | Best For |
|----------|--------------|---------|------------------|------|----------|
| **Railway** | ✅ Yes | Unlimited | ⭐⭐ Easy | $5-20/mo | Production |
| **Vercel** | ❌ No | 10-60s | ⭐ Easiest | $0-20/mo | Quick Deploy |
| **Docker** | ✅ Yes | Unlimited | ⭐⭐⭐ Moderate | Varies | Custom Hosting |
| **Local** | ✅ Yes | Unlimited | ⭐ Easy | Free | Development |

## Configuration Files

### railway.json
Railway platform configuration with build and deployment settings.

**Key Settings**:
- Build command: `npm ci && npm run build && npm run mcp:build`
- Start command: `MCP_TRANSPORT=http node mcp/server/dist/index.js`
- Auto-restart on failure

### vercel.json
Vercel serverless function configuration.

**Key Settings**:
- Entry point: `mcp/server/src/vercel-server.ts`
- Routes: `/health`, `/api/docs`, `/mcp`
- Stateless mode with JSON responses

### Dockerfile
Multi-stage Docker build for optimized production images.

**Features**:
- Node 22 Alpine base
- Multi-stage build (builder + production)
- Health check included
- Production dependencies only

### mcp-config.json
Claude Desktop configuration for local development.

**Usage**: Copy to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)

## Environment Variables

All deployment platforms require these environment variables:

```bash
# Required
API_KEYS=BLOCKWORK_API_KEY_xxx,BLOCKWORK_API_KEY_yyy

# Recommended
NODE_ENV=production
ALLOWED_ORIGINS=https://your-app.com
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_AUTHENTICATED_MAX=500

# Optional
PORT=3000
LOG_LEVEL=info
```

See `../server/.env.example` for complete list.

## Quick Deploy

### Railway
```bash
# Connect GitHub repo at railway.app
# Set environment variables
# Deploy automatically
```

### Vercel
```bash
vercel login
vercel
vercel --prod
```

### Docker
```bash
docker build -f mcp/deploy/Dockerfile -t blockwork-mcp:latest .
docker run -p 3000:3000 -e API_KEYS=xxx blockwork-mcp:latest
```

### Local
```bash
npm run mcp:build
npm run mcp:dev
```

## Need Help?

- **Deployment Guides**: See `../docs/deployment/` for detailed platform-specific guides
- **Troubleshooting**: See `../docs/troubleshooting.md`
- **API Documentation**: See `../docs/api/README.md`
