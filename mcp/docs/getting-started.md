# Getting Started with Blockwork MCP Server

Quick start guide to set up the Blockwork Design System MCP server for use with AI agents.

## What is the MCP Server?

The Model Context Protocol (MCP) server exposes the Blockwork UI design system to AI agents, enabling them to:

- 🔍 **Search and discover** UI components
- 📝 **Access component** source code and documentation
- 💡 **Generate usage** examples with specific props
- 🎨 **Query design tokens** (colors, typography, spacing, shadows, etc.)
- 📚 **Get complete** component documentation and features

## Prerequisites

Before you begin, ensure you have:

- **Node.js** >=22.0.0 ([download](https://nodejs.org))
- **npm** or **yarn** package manager
- **Git** (to clone the repository)
- **(Optional)** Claude Desktop or Cursor AI for testing

Check your Node.js version:
```bash
node --version  # Should be >= v22.0.0
```

## Choose Your Deployment Mode

The MCP server supports multiple deployment modes. Choose based on your needs:

### Option 1: Local STDIO (Recommended for Claude Desktop)

**Best for**: Local development, Claude Desktop integration

**Pros**:
- ✅ Full feature support (SSE streaming)
- ✅ No deployment needed
- ✅ Unlimited timeout
- ✅ Free

**Setup Time**: 5 minutes

→ **[Local STDIO Setup Guide](./deployment/local-stdio.md)**

---

### Option 2: Remote HTTP (Railway/Render)

**Best for**: Production deployments, team access, remote AI agents

**Pros**:
- ✅ SSE streaming support
- ✅ Unlimited timeouts
- ✅ Authentication & rate limiting
- ✅ Scalable

**Cons**:
- 💰 Cost: $5-20/month

**Setup Time**: 15 minutes

→ **[Railway Deployment Guide](./deployment/railway.md)**

---

### Option 3: Vercel Serverless

**Best for**: Quick deployment, serverless architecture

**Pros**:
- ✅ Easiest deployment
- ✅ Auto-scaling
- ✅ Free tier available

**Cons**:
- ❌ No SSE streaming
- ⏱️ Timeout: 10-60 seconds

**Setup Time**: 10 minutes

→ **[Vercel Deployment Guide](./deployment/vercel.md)**

---

### Option 4: Cursor AI Integration

**Best for**: AI-powered code editors, IDE integration

**Pros**:
- ✅ Intelligent component assistance while coding
- ✅ Works with hosted MCP server (Vercel/Railway)
- ✅ Generate accurate code with correct props
- ✅ Access design tokens in your editor

**Requirements**:
- Deploy MCP server first (Option 2 or 3)
- Cursor AI installed

**Setup Time**: 10 minutes (after deployment)

→ **[Cursor AI Setup Guide](./deployment/cursor.md)**

---

### Option 5: Docker

**Best for**: Custom hosting, containers, Kubernetes

**Pros**:
- ✅ Full control
- ✅ Deploy anywhere
- ✅ Multi-stage optimized

**Setup Time**: 20 minutes

→ **[Docker Deployment Guide](./deployment/docker.md)**

---

## Quick Start (Local STDIO)

For most users, start with local STDIO mode for Claude Desktop:

### 1. Clone and Install

```bash
# Clone repository (if not already done)
git clone https://github.com/wakecap/blockwork.git
cd blockwork

# Install dependencies
npm install
```

### 2. Build MCP Server

```bash
npm run mcp:build
```

This compiles the TypeScript server to `mcp/server/dist/index.js`.

### 3. Configure Claude Desktop

**macOS:**
```bash
# Open Claude Desktop config
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
# Open Claude Desktop config at:
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

⚠️ **Important**: Replace `/absolute/path/to/blockwork` with the **actual full path** to your repository.

**Example** (macOS):
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

**Example** (Windows):
```json
{
  "mcpServers": {
    "blockwork-design-system": {
      "command": "node",
      "args": ["C:\\Users\\yourname\\projects\\blockwork\\mcp\\server\\dist\\index.js"]
    }
  }
}
```

### 4. Restart Claude Desktop

Close and reopen Claude Desktop to load the MCP server.

### 5. Verify It's Working

In Claude Desktop, try asking:

- *"What components are available in Blockwork?"*
- *"Show me the TopNavigator component"*
- *"Generate a usage example for TopNavigator with project selection"*
- *"What colors are in the design system?"*

If Claude can answer these questions with specific information about Blockwork components, the MCP server is working! ✅

## Available Commands

```bash
# Build the MCP server
npm run mcp:build

# Development mode (STDIO)
npm run mcp:dev

# HTTP server mode
npm run mcp:http:dev

# Generate API key (for HTTP deployments)
npm run mcp:generate-key
```

## Available Resources

The MCP server exposes these resources to AI agents:

- `blockwork://design-system/overview` - Design system overview
- `blockwork://design-system/components` - All components (JSON)
- `blockwork://design-system/tokens` - Design tokens (JSON)
- `blockwork://components/TopNavigator` - Component documentation

## Available Tools

AI agents can use these tools:

- **`search_components`** - Search for components by name, category, or feature
- **`get_component_code`** - Get source code for a specific component
- **`get_usage_example`** - Generate usage example with specific props
- **`get_design_token`** - Get design token information (colors, typography, etc.)

## Currently Exposed Components

**Production-ready**: 1 component

1. **TopNavigator** - Full-featured navigation bar
   - Project selector with search
   - Menu dropdown with pinning
   - Avatar menu
   - Settings menu
   - Responsive and mobile-optimized
   - Arabic/RTL support ready

**More components will be added as they reach production quality.**

## Troubleshooting

### Server not showing up in Claude

1. Check the path in config is **absolute** (not relative)
2. Verify the server built: `ls mcp/server/dist/index.js`
3. Check Claude Desktop logs for errors
4. Restart Claude Desktop completely

### Build fails

1. Ensure Node.js >= 22.0.0: `node --version`
2. Install dependencies: `npm install`
3. Check for TypeScript errors in `mcp/server/src/`

### Components not found

1. Verify you're in the repository root when building
2. Check component paths are correct in `mcp/server/src/server.ts`
3. Rebuild: `npm run mcp:build`

See full [Troubleshooting Guide](./troubleshooting.md) for more issues and solutions.

## Next Steps

### Learn More
- **[System Architecture](./architecture.md)** - Understand how the MCP server works
- **[Components Catalog](./components.md)** - Explore available components
- **[API Reference](./api/README.md)** - Complete API documentation

### Deploy to Production
- **[Railway Guide](./deployment/railway.md)** - Remote HTTP server
- **[Vercel Guide](./deployment/vercel.md)** - Serverless deployment
- **[Docker Guide](./deployment/docker.md)** - Container deployment

### Develop
- **[Development Guide](./development.md)** - Add new components to MCP
- **[API Tools Reference](./api/tools.md)** - Available tools and their schemas

## Support

- **Issues**: https://github.com/wakecap/blockwork/issues
- **MCP Documentation**: https://modelcontextprotocol.io
- **Claude Desktop**: https://claude.ai/download

## Quick Reference Card

```bash
# Build
npm run mcp:build

# Local Development
npm run mcp:dev

# HTTP Server
npm run mcp:http:dev

# Generate API Key
npm run mcp:generate-key

# Test Health (HTTP mode)
curl http://localhost:3000/health
```

**Config Location**:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**Server Path**: `/path/to/blockwork/mcp/server/dist/index.js`
