# Vercel Serverless API

This directory contains the entry point for Vercel serverless deployment.

## File Structure

```
api/
└── index.ts  - Exports the Express app from mcp/server/dist/vercel-server.js
```

## How It Works

1. Vercel detects files in the `api/` directory as serverless functions
2. `index.ts` imports the pre-built Express app from `mcp/server/dist/vercel-server.js`
3. All routes (`/health`, `/api/docs`, `/mcp`) are handled by this single function
4. Vercel automatically handles routing based on the URL path

## Routes

- `GET /health` - Health check endpoint
- `GET /api/docs` - API documentation
- `POST /mcp` - MCP protocol endpoint (requires authentication)

## Configuration

See `mcp/deploy/vercel.json` for build and routing configuration.

## Local Testing

To test the Vercel function locally:

```bash
# Install Vercel CLI
npm install -g vercel

# Run local development server
vercel dev
```

## Deployment

See `mcp/docs/deployment/vercel.md` for detailed deployment instructions.
