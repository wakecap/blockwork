# Vercel Deployment Guide for Blockwork MCP Server

This guide covers deploying the Blockwork MCP server to Vercel's serverless platform.

## ⚠️ Important Limitations

Vercel uses serverless functions with specific constraints:

### What Works ✅
- ✅ Stateless HTTP requests/responses
- ✅ Bearer token authentication
- ✅ Rate limiting
- ✅ All MCP tools and resources
- ✅ JSON-RPC protocol
- ✅ Security middleware (CORS, Helmet)

### What Doesn't Work ❌
- ❌ **SSE Streaming**: Vercel's 10-60 second timeout prevents persistent SSE connections
- ❌ **Real-time Updates**: No server-initiated notifications
- ❌ **Long-running Operations**: Must complete within timeout (10s Hobby, 60s Pro)

### Recommendation
- **Use Vercel** if: You need simple, stateless request/response MCP operations
- **Use Railway/Render** if: You need SSE streaming, real-time updates, or long-running operations

---

## Quick Deployment (5 minutes)

### 1. Prerequisites

- Vercel account ([sign up free](https://vercel.com/signup))
- GitHub repository connected to Vercel
- Node.js >=22.0.0

### 2. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 3. Configure Environment Variables

Create `.env.production` file (or set in Vercel dashboard):

```bash
NODE_ENV=production
API_KEYS=BLOCKWORK_API_KEY_xxx,BLOCKWORK_API_KEY_yyy
ALLOWED_ORIGINS=https://your-app.com,https://www.your-app.com
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_AUTHENTICATED_MAX=500
LOG_LEVEL=info
```

### 4. Generate API Keys

```bash
npm run mcp:generate-key
```

Copy the generated key(s) to your environment variables.

### 5. Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Other
   - **Build Command**: `npm run mcp:build`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm ci` (or leave empty for default)

4. Add Environment Variables:
   - Go to Settings → Environment Variables
   - Add each variable from `.env.production`

5. Deploy!

#### Option B: Using Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? blockwork-mcp
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### 6. Set Environment Variables (CLI)

```bash
# Add environment variables
vercel env add API_KEYS
# Paste your API keys when prompted

vercel env add ALLOWED_ORIGINS
# Paste your allowed origins

vercel env add NODE_ENV
# Type: production
```

### 7. Verify Deployment

Your server will be available at: `https://your-project.vercel.app`

```bash
# Check health
curl https://your-project.vercel.app/health

# Check API docs
curl https://your-project.vercel.app/api/docs

# Test MCP endpoint
curl -X POST https://your-project.vercel.app/mcp \
  -H "Authorization: Bearer BLOCKWORK_API_KEY_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "resources/list",
    "params": {},
    "id": 1
  }'
```

---

## Configuration

### vercel.json

The project includes `vercel.json` with optimized settings (located at `mcp/deploy/vercel.json`):

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "buildCommand": "npm run mcp:build"
}
```

**How it works**:
1. Vercel detects `vercel-build` script in package.json
2. Runs `npm run vercel-build` which compiles MCP server → `mcp/server/dist/`
3. Vercel auto-builds `api/index.ts` (which imports from `mcp/server/dist/`)
4. `rewrites`: Routes all traffic to the API function
5. No output directory needed - pure serverless function deployment

**Key Files**:
- `package.json` - Contains `vercel-build` script (auto-detected by Vercel)
- `api/index.ts` - Vercel serverless function entry point
- `mcp/server/dist/vercel-server.js` - Compiled MCP server (imported by api/index.ts)
- `vercel.json` - Simple routing configuration (no build commands)

### Custom Domain

1. Go to your Vercel project → Settings → Domains
2. Add your domain (e.g., `mcp.yourcompany.com`)
3. Update DNS records as instructed
4. Add domain to `ALLOWED_ORIGINS` environment variable

---

## Client Configuration

### Claude Desktop

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

### cURL Example

```bash
curl -X POST https://your-project.vercel.app/mcp \
  -H "Authorization: Bearer BLOCKWORK_API_KEY_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "params": {},
    "id": 1
  }'
```

---

## Monitoring & Logs

### View Logs

**Dashboard:**
1. Go to your project in Vercel
2. Click "Functions" tab
3. View real-time logs

**CLI:**
```bash
vercel logs
vercel logs --follow  # Live tail
```

### Performance Monitoring

Vercel provides built-in analytics:
- Response times
- Error rates
- Function invocations
- Bandwidth usage

Access at: `https://vercel.com/[your-username]/[project]/analytics`

---

## Cost Estimation

### Hobby Plan (Free)
- **Invocations**: 100GB-Hrs per month
- **Bandwidth**: 100GB per month
- **Timeout**: 10 seconds per function
- **Good for**: Testing, low-traffic personal use

### Pro Plan ($20/month)
- **Invocations**: 1,000GB-Hrs per month
- **Bandwidth**: 1TB per month
- **Timeout**: 60 seconds per function
- **Good for**: Production use, moderate traffic

### Estimated Usage
- **Low traffic** (1,000 req/day): Free tier sufficient
- **Medium traffic** (10,000 req/day): Pro plan recommended
- **High traffic** (100,000+ req/day): Consider Railway or dedicated hosting

---

## Troubleshooting

### Function Timeout Errors

**Problem**: `FUNCTION_INVOCATION_TIMEOUT`

**Solution**:
1. Optimize slow operations
2. Upgrade to Pro plan (60s timeout)
3. Consider Railway for long-running operations

### Build Fails - "vite: command not found" or "tsc: command not found"

**Problem**: Build error with exit code 127:
- `sh: line 1: vite: command not found`
- `sh: line 1: tsc: command not found`
- `Command "npm run build && npm run mcp:build" exited with 127`

**Root Causes**:
1. **Wrong build command**: Trying to build UI library when only MCP server is needed
2. **Missing devDependencies**: TypeScript not installed during build

**Solution**:

**Step 1: Fix Build Command**
Update Vercel settings to build only the MCP server:
- Go to Project Settings → General → Build & Development Settings
- **Build Command**: `npm run mcp:build`
- **Install Command**: `npm ci` or leave empty (uses default)

**Step 2: Ensure devDependencies Are Installed**

Vercel should install devDependencies by default, but if it doesn't:

**Option A - Using Vercel Dashboard:**
1. Project Settings → General → Build & Development Settings
2. **Install Command**: `npm install --include=dev` or `npm ci`
3. **Build Command**: `npm run mcp:build`

**Option B - Using vercel.json:**
Use the correct config from `mcp/deploy/vercel.json`:
```json
{
  "buildCommand": "npm run mcp:build",
  "installCommand": "npm install --include=dev"
}
```

**Step 3: Verify Node Version**
Make sure Vercel is using Node.js >= 22:
- Project Settings → General → Node.js Version
- Select: **22.x** (or latest)

**Step 4: Check .vercelignore**
Make sure your `.vercelignore` file doesn't exclude MCP server source files:
```bash
# ❌ BAD - These will cause "No inputs found" error:
src/                    # Excludes ALL src directories (including mcp/server/src/)
mcp/server/src/*.ts     # Explicitly excludes MCP source files

# ✅ GOOD - Only exclude UI library src, not MCP server src:
/src/                   # Leading slash = only root src/ directory
# Don't exclude mcp/server/src/
```

**Critical**: The pattern `src/` matches ANY `src` directory. Use `/src/` (with leading slash) to only match the root-level directory.

**Step 5: Redeploy**
```bash
# Commit the changes
git add .vercelignore mcp/deploy/vercel.json
git commit -m "fix: Vercel build configuration"
git push

# Deploy
vercel --prod
```

**Important**: The MCP server deployment doesn't need the UI library, but it DOES need the TypeScript source files to compile during build.

### Build Fails - "No inputs were found in config file"

**Problem**: TypeScript error during build:
```
error TS18003: No inputs were found in config file 'mcp/server/tsconfig.json'.
Specified 'include' paths were '["src/**/*.ts"]'
```

**Root Cause**: `.vercelignore` is excluding the TypeScript source files needed for compilation.

**Solution**:
1. Check your `.vercelignore` file for these problematic patterns:
   ```bash
   # ❌ WRONG - Excludes ALL src directories:
   src/

   # ✅ CORRECT - Only excludes root src directory:
   /src/
   ```

2. Fix the pattern by adding a leading slash:
   ```bash
   # In .vercelignore, change:
   src/          →    /src/
   ```

3. Remove any other patterns that exclude MCP files:
   ```bash
   # Remove these if present:
   # mcp/server/src/*.ts
   # mcp/server/src/
   ```

4. Commit and push changes:
   ```bash
   git add .vercelignore
   git commit -m "fix: allow MCP server source files for Vercel build"
   git push
   ```

5. Redeploy: `vercel --prod`

**Why this happens**:
- Pattern `src/` matches ANY directory named `src` (including `mcp/server/src/`)
- Pattern `/src/` only matches the root-level `src/` directory
- We need `mcp/server/src/` for the build, but don't need the UI library `src/`

### "No Output Directory named dist found"

**Problem**: Build succeeds but deployment fails with:
```
Error: No Output Directory named "dist" found after the Build completed.
Configure the Output Directory in your Project Settings.
```

**Root Cause**: Using custom `builds` configuration with custom `buildCommand` confuses Vercel's output detection.

**Solution**: Use Vercel's automatic build detection with `vercel-build` script:

**Step 1**: Add `vercel-build` script to `package.json`:
```json
{
  "scripts": {
    "vercel-build": "npm run mcp:build",
    "mcp:build": "tsc -p mcp/server/tsconfig.json"
  }
}
```

**Step 2**: Remove `buildCommand` from `vercel.json`:
```json
{
  "version": 2,
  "rewrites": [
    {"source": "/(.*)", "destination": "/api/index"}
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

**Step 3**: Clear Vercel dashboard settings:
- Go to Project Settings → General → Build & Development Settings
- **Build Command**: Leave empty
- **Output Directory**: Leave empty
- **Install Command**: Leave empty
- Save and redeploy

**Why this works**:
- Vercel automatically detects and runs `vercel-build` script
- No output directory is needed for serverless functions
- `api/index.ts` is built automatically by Vercel
- No "missing dist" error

**Files to check**:
1. `package.json` has `vercel-build` script
2. `api/index.ts` exists and imports from `mcp/server/dist/`
3. `.vercelignore` doesn't exclude `mcp/server/src/` or `mcp/server/dist/`

### Build Fails - TypeScript Errors

**Problem**: TypeScript compilation errors during MCP build

**Solution**:
```bash
# Test build locally
npm run mcp:build

# Check for TypeScript errors
tsc -p mcp/server/tsconfig.json --noEmit

# Check build logs in Vercel dashboard
```

### CORS Errors

**Problem**: `Access-Control-Allow-Origin` errors

**Solution**:
1. Add your domain to `ALLOWED_ORIGINS` environment variable
2. Redeploy: `vercel --prod`
3. Clear browser cache

### Authentication Errors

**Problem**: 401 Unauthorized

**Solution**:
1. Verify `API_KEYS` environment variable is set in Vercel
2. Check Bearer token format: `Authorization: Bearer BLOCKWORK_API_KEY_xxx`
3. Generate new API key: `npm run mcp:generate-key`

---

## Comparison: Vercel vs Railway

| Feature | Vercel | Railway |
|---------|--------|---------|
| **SSE Streaming** | ❌ No (timeout limits) | ✅ Yes |
| **Timeout** | 10-60s | Unlimited |
| **Pricing** | $0-20/month | $5-20/month |
| **Setup** | Easier (serverless) | Moderate (Docker) |
| **Scalability** | Auto (serverless) | Manual/Auto |
| **Best For** | Simple requests | Streaming, real-time |

---

## Migration from Vercel to Railway

If you need SSE streaming later:

1. Keep the same environment variables
2. Use `http-server.ts` instead of `vercel-server.ts`
3. Deploy to Railway using `railway.json`
4. Update client URLs

No code changes needed - just deployment configuration!

---

## Security Checklist

- [ ] API keys configured and secure
- [ ] `ALLOWED_ORIGINS` whitelist configured
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Rate limiting tested
- [ ] Custom domain configured (optional)
- [ ] Environment variables set in production
- [ ] `.env` files not committed to Git

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Issues**: https://github.com/wakecap/blockwork/issues
- **MCP Protocol**: https://modelcontextprotocol.io

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test with `curl` or Postman
3. ✅ Configure Claude Desktop
4. ✅ Monitor logs and performance
5. ✅ Set up custom domain (optional)
