# MCP Server Documentation

Complete documentation for the Blockwork Design System MCP Server.

## Documentation Index

### Getting Started
- **[Getting Started Guide](./getting-started.md)** - Quick start for all deployment modes
- **[System Architecture](./architecture.md)** - How the MCP server works
- **[Components Catalog](./components.md)** - Available UI components

### Deployment Guides
- **[Deployment Overview](./deployment/README.md)** - Choose your deployment platform
- **[Local STDIO Setup](./deployment/local-stdio.md)** - For Claude Desktop (5 minutes)
- **[Railway Deployment](./deployment/railway.md)** - Remote HTTP server (15 minutes)
- **[Vercel Deployment](./deployment/vercel.md)** - Serverless deployment (10 minutes)
- **[Docker Deployment](./deployment/docker.md)** - Container-based deployment
- **[Cursor AI Setup](./deployment/cursor.md)** - Connect Cursor to hosted MCP server (10 minutes)

### API Reference
- **[API Documentation](./api/README.md)** - Complete API reference
- **[Authentication](./api/authentication.md)** - API keys and rate limiting
- **[Resources](./api/resources.md)** - Available resources (components, tokens)
- **[Tools](./api/tools.md)** - Available tools (search, code generation)
- **[Error Codes](./api/errors.md)** - Error reference

### Development
- **[Development Guide](./development.md)** - Add new components to MCP server
- **[Troubleshooting](./troubleshooting.md)** - Common issues and solutions

## Common Use Cases

### For AI Coding Assistants (Cursor AI, IDEs)
Connect your AI-powered code editor to the design system for intelligent component assistance:
- 🔍 Search and discover components while coding
- 📝 Get accurate component implementations with correct props
- ✨ Generate code that follows your design system
- 🎨 Access design tokens (colors, typography, spacing)

**Quick Start:** [Cursor AI Setup Guide](./deployment/cursor.md)

### For Claude Desktop (Local Development)
Run MCP server locally for direct integration with Claude Desktop:
- 💻 No deployment needed
- 🚀 Full feature support including SSE streaming
- 🔒 Private and secure (local only)

**Quick Start:** [Local STDIO Setup](./deployment/local-stdio.md)

### For Team Production Use
Deploy to the cloud for team-wide access:
- 👥 Share access across your development team
- 🌐 Remote HTTP access from any AI tool
- 📊 Monitor usage and rate limiting

**Quick Start:** [Railway Deployment](./deployment/railway.md) or [Vercel Deployment](./deployment/vercel.md)

## Quick Decision Tree

**Choose your setup based on your needs:**

```
┌─ Using Cursor AI or other IDE?
│  └─→ [Cursor AI Setup](./deployment/cursor.md) + Deploy to Vercel/Railway
│
├─ Need to use with Claude Desktop locally?
│  └─→ [Local STDIO Setup](./deployment/local-stdio.md)
│
├─ Need remote access with SSE streaming?
│  └─→ [Railway Deployment](./deployment/railway.md)
│
├─ Want easiest cloud deployment?
│  └─→ [Vercel Deployment](./deployment/vercel.md)
│
└─ Need custom container deployment?
   └─→ [Docker Deployment](./deployment/docker.md)
```

## Deployment Comparison

| Feature | Local STDIO | Railway HTTP | Vercel | Docker |
|---------|-------------|--------------|--------|--------|
| **SSE Streaming** | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| **Timeout** | Unlimited | Unlimited | 10-60s | Unlimited |
| **Setup Time** | 5 min | 15 min | 10 min | 20 min |
| **Cost** | Free | $5-20/mo | $0-20/mo | Varies |
| **Best For** | Local dev | Production | Quick deploy | Custom |
| **Difficulty** | ⭐ Easy | ⭐⭐ Easy | ⭐ Easiest | ⭐⭐⭐ Moderate |

## Common Tasks

### First Time Setup
1. Read [Getting Started Guide](./getting-started.md)
2. Choose deployment mode (see decision tree above)
3. Follow platform-specific guide
4. Test with provided examples

### Adding a Component
1. Read [Development Guide](./development.md)
2. Add component metadata to `server/src/server.ts`
3. Build and test: `npm run mcp:build && npm run mcp:dev`
4. Update documentation

### Troubleshooting
1. Check [Troubleshooting Guide](./troubleshooting.md)
2. Verify environment variables
3. Check logs
4. Review error codes in [Error Reference](./api/errors.md)

### Deploying to Production
1. Choose platform: [Railway](./deployment/railway.md) or [Vercel](./deployment/vercel.md)
2. Set environment variables
3. Deploy
4. Test endpoints (`/health`, `/api/docs`, `/mcp`)
5. Configure clients

## Documentation Structure

```
docs/
├── README.md (you are here)
├── getting-started.md
├── architecture.md
├── components.md
├── development.md
├── troubleshooting.md
├── deployment/
│   ├── README.md
│   ├── local-stdio.md
│   ├── railway.md
│   ├── vercel.md
│   ├── docker.md
│   └── cursor.md        ← AI Coding Assistant setup
└── api/
    ├── README.md
    ├── authentication.md
    ├── resources.md
    ├── tools.md
    └── errors.md
```

## External Resources

- **MCP Protocol Specification**: https://modelcontextprotocol.io
- **Claude Desktop**: https://claude.ai/download
- **Cursor AI**: https://cursor.sh
- **Railway Platform**: https://railway.app
- **Vercel Platform**: https://vercel.com
- **GitHub Repository**: https://github.com/wakecap/blockwork

## Need Help?

- **Issues & Bugs**: [GitHub Issues](https://github.com/wakecap/blockwork/issues)
- **Questions**: Check [Troubleshooting Guide](./troubleshooting.md) first
- **Feature Requests**: [GitHub Discussions](https://github.com/wakecap/blockwork/discussions)

## Contributing

See the [Development Guide](./development.md) for information on:
- Adding new components
- Improving documentation
- Testing changes
- Submitting pull requests
