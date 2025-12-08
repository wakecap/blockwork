# MCP Server Architecture

Understanding the Blockwork MCP Server's design and implementation.

## System Overview

The Blockwork MCP Server is built on the Model Context Protocol (MCP) specification, providing a standardized interface for AI agents to access the Blockwork Design System.

```
┌─────────────────┐
│   AI Agent      │
│ (Claude, etc.)  │
└────────┬────────┘
         │ MCP Protocol
         │ (JSON-RPC 2.0)
         ▼
┌─────────────────────────────────────┐
│     MCP Server (Blockwork)          │
│  ┌───────────┐  ┌───────────────┐  │
│  │ Resources │  │     Tools     │  │
│  │  Handler  │  │    Handler    │  │
│  └───────────┘  └───────────────┘  │
│         │              │            │
│         └──────┬───────┘            │
│                ▼                    │
│     ┌──────────────────┐            │
│     │ Component        │            │
│     │   Registry       │            │
│     └──────────────────┘            │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   Blockwork Design System           │
│   (Source Code & Documentation)     │
└─────────────────────────────────────┘
```

## Core Components

### 1. Component Registry

**Location**: `mcp/server/src/server.ts`

The component registry is the central metadata store for all exposed components.

```typescript
export const COMPONENTS: Record<string, ComponentMetadata> = {
  TopNavigator: {
    name: "TopNavigator",
    description: "Top navigation bar...",
    category: "Navigation",
    path: "src/design-system/components/TopNavigator/TopNavigator.tsx",
    props: { /* ... */ },
    features: [ /* ... */ ],
    dependencies: [ /* ... */ ]
  },
  // More components added here as they become production-ready
};
```

**Purpose**: Single source of truth for which components are exposed to AI agents.

### 2. Resource Handlers

Resources provide read-only access to design system information.

**Available Resources**:
- `blockwork://design-system/overview` - System overview
- `blockwork://design-system/components` - Component list (JSON)
- `blockwork://design-system/tokens` - Design tokens (JSON)
- `blockwork://components/{ComponentName}` - Component documentation

**Implementation**:
```typescript
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  // Route to appropriate handler based on URI pattern
});
```

### 3. Tool Handlers

Tools provide interactive functionality for AI agents.

**Available Tools**:
1. **`search_components`** - Search by name, category, feature
2. **`get_component_code`** - Retrieve source code
3. **`get_usage_example`** - Generate usage examples
4. **`get_design_token`** - Query design tokens

**Implementation**:
```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  // Route to appropriate tool handler
});
```

### 4. Transport Layer

The MCP server supports multiple transport mechanisms:

#### STDIO Transport (Local)
**File**: `mcp/server/src/index.ts`

- Direct process communication
- Used for Claude Desktop
- No network overhead
- Full streaming support

```typescript
const stdioTransport = new StdioServerTransport();
await server.connect(stdioTransport);
```

#### HTTP Transport (Remote)
**File**: `mcp/server/src/http-server.ts`

- Express.js-based HTTP server
- StreamableHTTPServerTransport
- SSE streaming support
- Authentication & rate limiting

```typescript
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined, // Stateless
});
```

#### Vercel Transport (Serverless)
**File**: `mcp/server/src/vercel-server.ts`

- Serverless function handler
- JSON responses (no SSE)
- Timeout limitations (10-60s)
- Stateless architecture

```typescript
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
  enableJsonResponse: true, // Critical for Vercel
});
```

## Security Architecture

### 1. Authentication (HTTP Mode)

**Bearer Token API Keys**:
- Stored in environment variables
- Validated on every request
- Rate limiting based on auth status

**Middleware**: `mcp/server/src/middleware/auth.ts`

```typescript
export function validateApiKey(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.substring(7); // Remove "Bearer "
  const validKeys = process.env.API_KEYS.split(",");
  if (!validKeys.includes(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
```

### 2. Rate Limiting

**Tiered Limits**:
- Unauthenticated: 100 requests/minute per IP
- Authenticated: 500 requests/minute per API key

**Middleware**: `mcp/server/src/middleware/rateLimiter.ts`

```typescript
export const globalRateLimiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 100,
});

export const authenticatedRateLimiter = rateLimit({
  windowMs: 60000,
  max: 500,
  keyGenerator: (req) => req.apiKeyPrefix,
});
```

### 3. Security Headers & CORS

**Middleware**: `mcp/server/src/middleware/security.ts`

- Helmet.js for security headers
- CORS whitelist configuration
- Input sanitization
- Request size limits (10MB)

### 4. Error Handling

**Middleware**: `mcp/server/src/middleware/errorHandler.ts`

- JSON-RPC error formatting
- Structured logging
- No stack traces in production
- HTTP status code mapping

## Data Flow

### Resource Request Flow

```
1. AI Agent sends request
   ↓
2. Transport layer receives (STDIO/HTTP)
   ↓
3. [HTTP only] Authentication middleware
   ↓
4. [HTTP only] Rate limiting middleware
   ↓
5. MCP Protocol handler
   ↓
6. Resource handler routes by URI
   ↓
7. Component Registry lookup
   ↓
8. Read source code from filesystem
   ↓
9. Format response
   ↓
10. Return to AI Agent
```

### Tool Execution Flow

```
1. AI Agent calls tool
   ↓
2. Validate tool name & arguments
   ↓
3. Route to tool handler
   ↓
4. Execute tool logic
   ↓
5. Format response
   ↓
6. Return results
```

## Design Tokens System

**Location**: `mcp/server/src/server.ts`

```typescript
export const DESIGN_TOKENS = {
  colors: {
    primary: "Orange scale (50-950)",
    semantic: "Success, error, warning, info",
    wakecap: "Brand-specific colors"
  },
  typography: {
    fonts: { sans: "Figtree", arabic: "IBM Plex Sans Arabic" },
    scale: "xs to 9xl"
  },
  spacing: "8pt grid system (0-96)",
  shadows: "Elevation system (xs-2xl + custom)",
  borderRadius: "xs to 3xl plus full",
  animations: {
    durations: "fast, base, slow, slower",
    easings: "Custom cubic-bezier functions"
  }
};
```

## File Organization

```
mcp/server/src/
├── index.ts                 # Entry point, dual-mode support
├── server.ts                # Core MCP server logic
│                            # - Component registry
│                            # - Resource handlers
│                            # - Tool handlers
│                            # - Design tokens
├── stdio-server.ts          # STDIO transport (future)
├── http-server.ts           # HTTP/Express server
├── vercel-server.ts         # Vercel serverless handler
├── middleware/
│   ├── auth.ts              # Bearer token authentication
│   ├── rateLimiter.ts       # Request rate limiting
│   ├── security.ts          # CORS, Helmet, sanitization
│   └── errorHandler.ts      # Error formatting
├── utils/
│   └── logger.ts            # Winston structured logging
└── scripts/
    └── generate-api-key.ts  # API key generator
```

## Deployment Modes

### Mode Detection

The server automatically detects the deployment mode via `MCP_TRANSPORT` environment variable:

```typescript
const transport = process.env.MCP_TRANSPORT || 'stdio';

if (transport === 'http') {
  await import('./http-server.js');
} else {
  // STDIO mode
  const stdioTransport = new StdioServerTransport();
  await server.connect(stdioTransport);
}
```

### Configuration

- **STDIO**: No configuration needed
- **HTTP**: Requires `API_KEYS`, `ALLOWED_ORIGINS`, etc.
- **Vercel**: Uses `vercel.json` for routing

## Performance Considerations

### 1. Caching
- Component metadata cached in memory
- File system reads cached by Node.js
- No database queries

### 2. Stateless Design
- HTTP mode is fully stateless
- Horizontal scaling friendly
- No session storage

### 3. Optimization
- TypeScript compiled to optimized JavaScript
- Minimal dependencies
- Fast startup time (<1 second)

## Extensibility

### Adding New Components

1. Add metadata to `COMPONENTS` registry
2. Ensure source file exists at specified path
3. Rebuild: `npm run mcp:build`

See [Development Guide](./development.md) for details.

### Adding New Tools

1. Define tool schema in `ListToolsRequestSchema` handler
2. Implement tool logic in `CallToolRequestSchema` handler
3. Test with AI agent

### Adding New Resources

1. Define resource URI pattern
2. Add handler in `ReadResourceRequestSchema`
3. Return formatted content

## Dependencies

### Core Dependencies
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `express` - HTTP server (HTTP mode only)
- `winston` - Structured logging (HTTP mode only)

### Middleware Dependencies (HTTP mode)
- `helmet` - Security headers
- `cors` - Cross-origin resource sharing
- `express-rate-limit` - Rate limiting

## Logging

**Implementation**: Winston structured logging

**Log Levels**:
- `error` - Critical failures
- `warn` - Authentication failures, rate limits
- `info` - Request/response tracking
- `debug` - Detailed execution flow

**Log Format**: JSON (production), Pretty (development)

## Error Handling

All errors follow JSON-RPC 2.0 format:

```json
{
  "error": {
    "code": -32603,
    "message": "Internal server error",
    "type": "INTERNAL_ERROR"
  }
}
```

**Error Codes**:
- `-32600` - Invalid Request (400)
- `-32601` - Method not found (404)
- `-32001` - Unauthorized (401/403)
- `-32002` - Rate limit exceeded (429)
- `-32603` - Internal error (500)

## Future Enhancements

- OAuth 2.0 authentication
- Component usage analytics
- Real-time component updates
- Webhook support for deployments
- GraphQL query support
- Multi-tenant support

## References

- **MCP Specification**: https://modelcontextprotocol.io
- **JSON-RPC 2.0**: https://www.jsonrpc.org/specification
- **Express.js**: https://expressjs.com
- **Winston Logging**: https://github.com/winstonjs/winston
