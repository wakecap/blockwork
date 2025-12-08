# Cursor AI Integration Guide for Blockwork MCP Server

Connect Cursor AI to the Blockwork Design System MCP server for intelligent component assistance while coding.

## Overview

This guide shows you how to connect Cursor AI (AI-powered code editor) to your hosted Blockwork MCP server. Once configured, Cursor can:

- 🔍 Search and discover Blockwork components
- 📝 Access complete component source code and documentation
- ✨ Generate accurate implementation code with correct props
- 🎨 Query design tokens (colors, typography, spacing)
- 🚀 Speed up development with AI that knows your design system

## Prerequisites

- Cursor AI installed ([download here](https://cursor.sh))
- MCP server deployed to Vercel (or another hosting platform)
- API key generated for authentication

## Quick Start

### Step 1: Deploy MCP Server to Vercel

If you haven't deployed yet, see the [complete Vercel deployment guide](./vercel.md).

**Quick version:**

```bash
# 1. Generate API key
npm run mcp:generate-key

# 2. Deploy to Vercel
vercel

# 3. Add API key as environment variable
vercel env add API_KEYS
# Paste your key: BLOCKWORK_API_KEY_xxx

# 4. Redeploy
vercel --prod
```

Your MCP server will be at: `https://your-project.vercel.app`

### Step 2: Find Cursor's MCP Configuration File

Cursor stores MCP configuration in a JSON file. Check these locations:

**macOS/Linux:**
```bash
# Option 1: User-level config (recommended)
~/.cursor/mcp_settings.json

# Option 2: Project-level config
<your-project>/.cursor/mcp_settings.json

# Option 3: Alternative location
~/Library/Application Support/Cursor/User/mcp_settings.json
```

**Windows:**
```bash
# Option 1: User-level config
%APPDATA%\.cursor\mcp_settings.json

# Option 2: Project-level config
<your-project>\.cursor\mcp_settings.json

# Option 3: Alternative location
%APPDATA%\Cursor\User\mcp_settings.json
```

**If the file doesn't exist:**
1. Create the directory if needed: `mkdir -p ~/.cursor` (macOS/Linux)
2. Create the file: `touch ~/.cursor/mcp_settings.json`
3. Add the configuration (see next step)

### Step 3: Configure Cursor

Add this configuration to your MCP settings file:

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

**Replace:**
- `https://your-project.vercel.app` → Your actual Vercel URL
- `BLOCKWORK_API_KEY_xxx` → Your actual API key

**Example with real values:**
```json
{
  "mcpServers": {
    "blockwork-design-system": {
      "url": "https://blockwork-mcp.vercel.app/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer BLOCKWORK_API_KEY_a1b2c3d4-e5f6-7890-abcd-ef1234567890"
      }
    }
  }
}
```

### Step 4: Restart Cursor

1. Close Cursor completely
2. Reopen Cursor
3. The MCP server connection should be active

### Step 5: Verify Connection

Test the integration with these prompts in Cursor:

```
"What components are available in Blockwork?"

"Show me the TopNavigator component from Blockwork"

"Generate a usage example for the TopNavigator component"

"What design tokens does Blockwork have for colors?"
```

**Expected behavior:**
- Cursor queries the MCP server
- Returns accurate component information
- Generates code with correct props and imports

---

## Configuration Options

### Multiple Environments

Configure different servers for development and production:

```json
{
  "mcpServers": {
    "blockwork-dev": {
      "url": "http://localhost:3000/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer BLOCKWORK_API_KEY_dev"
      }
    },
    "blockwork-prod": {
      "url": "https://blockwork-mcp.vercel.app/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer BLOCKWORK_API_KEY_prod"
      }
    }
  }
}
```

### Project-Specific Configuration

For team projects, use project-level config:

1. Create `.cursor/mcp_settings.json` in your project root
2. Add configuration (same format as above)
3. Commit to version control (use environment variables for API keys)

**Example with environment variable:**
```json
{
  "mcpServers": {
    "blockwork-design-system": {
      "url": "${BLOCKWORK_MCP_URL}",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer ${BLOCKWORK_API_KEY}"
      }
    }
  }
}
```

Then set environment variables:
```bash
# In .env or shell profile
export BLOCKWORK_MCP_URL=https://blockwork-mcp.vercel.app/mcp
export BLOCKWORK_API_KEY=BLOCKWORK_API_KEY_xxx
```

---

## Usage Examples

### Example 1: Add Navigation Component

**Prompt in Cursor:**
```
"Add a TopNavigator component from Blockwork to my App.tsx"
```

**What Cursor does:**
1. Queries MCP server for TopNavigator
2. Gets component props, features, dependencies
3. Generates implementation:

```tsx
import { TopNavigator } from '@wakecap/blockwork-ui';
import type { TopNavigatorProps } from '@wakecap/blockwork-ui';

function App() {
  return (
    <TopNavigator
      projectName="My Project"
      onMenuClick={() => console.log('Menu clicked')}
      userName="John Doe"
      userAvatar="https://..."
    />
  );
}
```

### Example 2: Query Design Tokens

**Prompt:**
```
"What are the primary colors in Blockwork?"
```

**Response:**
```
The Blockwork design system uses an orange primary color scale:
- primary-50: #FFF7ED
- primary-500: #F97316 (main)
- primary-900: #7C2D12
[... complete color scale]
```

### Example 3: Search Components

**Prompt:**
```
"What navigation components does Blockwork have?"
```

**Response:**
```
Found 1 navigation component:
- TopNavigator: Top navigation bar with project selector, menus, and user avatar
  Features: Responsive, RTL support, mobile-optimized
  Props: projectName, onMenuClick, userName, userAvatar, etc.
```

---

## Troubleshooting

### Connection Issues

**Problem:** Cursor can't connect to MCP server

**Solutions:**
1. Verify server URL is correct (test with curl):
   ```bash
   curl https://your-project.vercel.app/health
   # Should return: {"status":"ok"}
   ```

2. Check API key is valid:
   ```bash
   curl -X POST https://your-project.vercel.app/mcp \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"jsonrpc":"2.0","method":"resources/list","id":1}'
   ```

3. Verify config file location:
   ```bash
   # macOS/Linux
   cat ~/.cursor/mcp_settings.json

   # Windows
   type %APPDATA%\.cursor\mcp_settings.json
   ```

4. Restart Cursor completely (quit and reopen)

### Authentication Errors

**Problem:** 401 Unauthorized errors

**Solutions:**
1. Verify API key format: `BLOCKWORK_API_KEY_<uuid>`
2. Check API key is set in Vercel environment variables
3. Ensure no extra spaces in Authorization header
4. Regenerate API key if compromised

### Cursor Not Finding Components

**Problem:** Cursor says "No components found"

**Solutions:**
1. Verify MCP server is running: `curl https://your-url/health`
2. Test resources endpoint:
   ```bash
   curl -X POST https://your-url/mcp \
     -H "Authorization: Bearer YOUR_KEY" \
     -H "Content-Type: application/json" \
     -d '{"jsonrpc":"2.0","method":"resources/list","params":{},"id":1}'
   ```
3. Check Cursor console for error messages
4. Restart Cursor

### Rate Limiting

**Problem:** "Too Many Requests" errors

**Solutions:**
1. You've hit the rate limit (default: 100 req/min unauthenticated, 500 req/min authenticated)
2. Wait a minute before trying again
3. Verify authentication is working (authenticated users get higher limits)
4. Contact admin to increase limits if needed

### CORS Errors

**Problem:** CORS policy blocks requests

**Solutions:**
1. Add Cursor's origin to `ALLOWED_ORIGINS` in Vercel:
   ```bash
   vercel env add ALLOWED_ORIGINS
   # Enter: https://cursor.sh,http://localhost:*
   ```
2. Redeploy: `vercel --prod`

---

## Alternative: Cursor Settings UI

If Cursor has a built-in MCP settings UI:

1. Open Cursor Settings (Cmd/Ctrl + ,)
2. Search for "MCP" or "Model Context Protocol"
3. Click "Add MCP Server"
4. Fill in:
   - **Name:** Blockwork Design System
   - **URL:** https://your-project.vercel.app/mcp
   - **Transport:** HTTP
   - **Headers:**
     - Key: `Authorization`
     - Value: `Bearer BLOCKWORK_API_KEY_xxx`
5. Save and restart Cursor

---

## Comparison: Vercel vs Railway

| Feature | Vercel | Railway |
|---------|--------|---------|
| **Setup Difficulty** | ✅ Easy | Moderate |
| **Pricing** | $0-20/month | $5-20/month |
| **SSE Streaming** | ❌ No | ✅ Yes |
| **Timeout** | 10-60s | Unlimited |
| **Best For** | Cursor AI (request/response) | Claude Desktop (streaming) |

**Recommendation for Cursor:**
- Vercel is perfect for Cursor AI (doesn't need streaming)
- Choose Railway only if you also want Claude Desktop HTTP support

---

## Example Workflow: Building with Cursor + MCP

### Scenario: Building a Dashboard

1. **Start a new React project in Cursor**
   ```bash
   npx create-react-app my-dashboard
   cd my-dashboard
   ```

2. **Ask Cursor to scaffold the layout**
   ```
   Prompt: "Create a dashboard layout using Blockwork's TopNavigator"
   ```

3. **Cursor queries MCP** → Gets TopNavigator details

4. **Cursor generates accurate code:**
   ```tsx
   import { TopNavigator } from '@wakecap/blockwork-ui';
   import '@wakecap/blockwork-ui/styles.css';

   function Dashboard() {
     return (
       <div>
         <TopNavigator
           projectName="My Dashboard"
           userName="John Doe"
           // ... correct props from MCP
         />
         <main>{/* Your content */}</main>
       </div>
     );
   }
   ```

5. **Continue building with AI assistance:**
   - "Add a data table using Blockwork components"
   - "Style this button using Blockwork design tokens"
   - "Make this responsive using Blockwork patterns"

**Result:** Faster development with accurate, production-ready code

---

## Security Best Practices

1. **Protect API Keys**
   - Never commit API keys to version control
   - Use environment variables for team projects
   - Rotate keys regularly

2. **Use HTTPS**
   - Always use HTTPS URLs in production
   - Vercel provides HTTPS automatically

3. **Limit Access**
   - Generate separate API keys per developer
   - Revoke keys when team members leave
   - Monitor usage logs

4. **Rate Limiting**
   - Authenticate for higher limits (500 vs 100 req/min)
   - Don't share API keys between projects

---

## Advanced Configuration

### Custom Request Headers

Add custom headers for debugging or tracking:

```json
{
  "mcpServers": {
    "blockwork-design-system": {
      "url": "https://your-project.vercel.app/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer BLOCKWORK_API_KEY_xxx",
        "X-Client": "Cursor",
        "X-Project": "my-dashboard"
      }
    }
  }
}
```

### Timeout Configuration

Adjust timeout for slow connections (if supported):

```json
{
  "mcpServers": {
    "blockwork-design-system": {
      "url": "https://your-project.vercel.app/mcp",
      "transport": "http",
      "timeout": 30000,
      "headers": {
        "Authorization": "Bearer BLOCKWORK_API_KEY_xxx"
      }
    }
  }
}
```

---

## Getting Help

### Documentation
- [MCP Server Architecture](../architecture.md)
- [Complete Vercel Deployment Guide](./vercel.md)
- [API Reference](../api/README.md)
- [Troubleshooting Guide](../troubleshooting.md)

### Testing Endpoints

Health check:
```bash
curl https://your-project.vercel.app/health
```

API documentation:
```bash
curl https://your-project.vercel.app/api/docs
```

List resources:
```bash
curl -X POST https://your-project.vercel.app/mcp \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"resources/list","params":{},"id":1}'
```

### Support

- GitHub Issues: [wakecap/blockwork/issues](https://github.com/wakecap/blockwork/issues)
- Cursor Documentation: [cursor.sh/docs](https://cursor.sh/docs)
- MCP Protocol: [modelcontextprotocol.io](https://modelcontextprotocol.io)

---

## Next Steps

1. ✅ Deploy MCP server to Vercel
2. ✅ Configure Cursor with your server URL
3. ✅ Test the connection with example prompts
4. 🚀 Start building faster with AI-assisted development!

**Happy coding with Cursor + Blockwork MCP!** 🎉
