# Blockwork MCP Server

Model Context Protocol (MCP) server for the Blockwork Design System. This server exposes UI components, design tokens, and documentation to AI agents through a standardized protocol.

## What's in This Directory?

```
mcp/
├── server/             # MCP server implementation
│   ├── src/           # TypeScript source files
│   └── dist/          # Compiled JavaScript (generated)
├── deploy/            # Deployment configurations (Railway, Vercel, Docker)
├── docs/              # Complete documentation
└── claude-instructions/  # AI automation scripts
```

## Quick Links

### 🚀 Getting Started
- **New to MCP?** → [Getting Started Guide](./docs/getting-started.md)
- **Choose deployment** → [Deployment Overview](./docs/deployment/README.md)
- **Local setup (5 min)** → [Local STDIO Guide](./docs/deployment/local-stdio.md)
- **Cursor AI setup (10 min)** → [Cursor AI Guide](./docs/deployment/cursor.md)

### 📚 Documentation
- **Full Documentation Index** → [docs/README.md](./docs/README.md)
- **System Architecture** → [Architecture Guide](./docs/architecture.md)
- **Available Components** → [Components Catalog](./docs/components.md)
- **Developer Guide** → [Development Guide](./docs/development.md)

### 🌐 Deployment
- **Deployment Options** → [deploy/README.md](./deploy/README.md)
- **Railway** → [Railway Guide](./docs/deployment/railway.md)
- **Vercel** → [Vercel Guide](./docs/deployment/vercel.md)
- **Docker** → [Docker Guide](./docs/deployment/docker.md)
- **Cursor AI** → [Cursor AI Guide](./docs/deployment/cursor.md)

### 🔧 Development
- **Add New Component** → [Development Guide](./docs/development.md)
- **API Reference** → [API Documentation](./docs/api/README.md)
- **Troubleshooting** → [Troubleshooting Guide](./docs/troubleshooting.md)

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context to Large Language Models (LLMs). The Blockwork MCP Server exposes:

- **Resources**: Component documentation, source code, design tokens
- **Tools**: Search, code generation, usage examples

### Supported AI Tools

- ✅ **Claude Desktop** - Local STDIO or remote HTTP
- ✅ **Cursor AI** - AI-powered code editor integration
- ✅ Any MCP-compatible AI tool

AI agents can use this server to:
- Discover available UI components
- Get component source code and documentation
- Generate usage examples with specific props
- Access design tokens (colors, typography, spacing, etc.)

## Quick Start (Local)

```bash
# 1. Build the server
npm run mcp:build

# 2. Run the server (STDIO mode)
npm run mcp:dev

# 3. Configure Claude Desktop
# Add to ~/Library/Application Support/Claude/claude_desktop_config.json:
{
  "mcpServers": {
    "blockwork-design-system": {
      "command": "node",
      "args": ["/absolute/path/to/blockwork/mcp/server/dist/index.js"]
    }
  }
}
```

## Deployment Modes

| Mode | Use Case | Streaming | Timeout | Guide |
|------|----------|-----------|---------|-------|
| **Local STDIO** | Claude Desktop | ✅ Yes | Unlimited | [Local Guide](./docs/deployment/local-stdio.md) |
| **Railway HTTP** | Production | ✅ Yes | Unlimited | [Railway Guide](./docs/deployment/railway.md) |
| **Vercel** | Quick Deploy | ❌ No | 10-60s | [Vercel Guide](./docs/deployment/vercel.md) |
| **Docker** | Custom Hosting | ✅ Yes | Unlimited | [Docker Guide](./docs/deployment/docker.md) |

## Currently Exposed Components

- **TopNavigator** - Full-featured navigation bar with project selector, menu dropdown, pinned items, and avatar menu

More components will be added as they reach production quality.

## Development

### Adding a New Component

See the [Development Guide](./docs/development.md) for step-by-step instructions.

### Project Structure

```
server/src/
├── index.ts              # Main entry point (dual-mode support)
├── server.ts             # Shared MCP server logic
├── stdio-server.ts       # STDIO transport (local)
├── http-server.ts        # HTTP transport (Railway)
├── vercel-server.ts      # Vercel serverless handler
├── middleware/           # Authentication, rate limiting, security
├── utils/                # Logger, helpers
└── scripts/              # API key generation, etc.
```

### Build Commands

```bash
# Build MCP server
npm run mcp:build

# Development (STDIO)
npm run mcp:dev

# Development (HTTP)
npm run mcp:http:dev

# Generate API key
npm run mcp:generate-key
```

## Support

- **Issues**: https://github.com/wakecap/blockwork/issues
- **MCP Protocol**: https://modelcontextprotocol.io
- **Troubleshooting**: [docs/troubleshooting.md](./docs/troubleshooting.md)

## License

MIT - See LICENSE file in the repository root
