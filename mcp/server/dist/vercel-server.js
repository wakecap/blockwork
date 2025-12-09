import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "./server.js";
import { logger, requestLogger } from "./utils/logger.js";
import { optionalAuth, validateApiKey } from "./middleware/auth.js";
import { combinedRateLimiter } from "./middleware/rateLimiter.js";
import { securityMiddleware } from "./middleware/security.js";
import { errorHandler, notFoundHandler, asyncHandler } from "./middleware/errorHandler.js";
// Load environment variables
const NODE_ENV = process.env.NODE_ENV || "development";
/**
 * Create and configure Express app for Vercel
 * Note: Vercel uses serverless functions, so we need to:
 * 1. Enable JSON responses instead of SSE streaming
 * 2. Keep functions stateless
 * 3. Work within 10-60 second timeout limits
 */
function createApp() {
    const app = express();
    // Trust Vercel proxy
    app.set("trust proxy", 1);
    // Parse JSON bodies
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));
    // Request logging
    app.use(requestLogger);
    // Security middleware (Helmet, CORS, input sanitization, request size limits)
    securityMiddleware.forEach((middleware) => app.use(middleware));
    // Optional authentication (sets req.isAuthenticated for rate limiting)
    app.use(optionalAuth);
    // Rate limiting (applies different limits based on authentication)
    app.use(combinedRateLimiter);
    return app;
}
/**
 * Create Vercel-compatible Express app
 */
const app = createApp();
// Create MCP server instance (shared across requests)
const mcpServer = createMcpServer();
// Health check endpoint (public, no auth required)
app.get("/health", asyncHandler(async (req, res) => {
    res.json({
        status: "healthy",
        service: "blockwork-mcp-server",
        version: "1.0.0",
        platform: "vercel",
        environment: NODE_ENV,
    });
}));
// API documentation endpoint (public, no auth required)
app.get("/api/docs", asyncHandler(async (req, res) => {
    res.json({
        name: "Blockwork Design System MCP Server",
        version: "1.0.0",
        platform: "Vercel Serverless",
        description: "Model Context Protocol server for the Blockwork UI design system",
        authentication: {
            type: "Bearer Token",
            header: "Authorization: Bearer YOUR_API_KEY",
            note: "Contact administrator for API keys",
        },
        rateLimits: {
            unauthenticated: "100 requests per minute",
            authenticated: "500 requests per minute",
        },
        endpoints: {
            "GET /health": "Health check endpoint (no auth required)",
            "GET /api/docs": "API documentation (no auth required)",
            "POST /mcp": "MCP protocol endpoint (authentication required)",
        },
        resources: [
            "blockwork://design-system/overview - Design system overview",
            "blockwork://design-system/components - List of all components",
            "blockwork://design-system/tokens - Design tokens",
            "blockwork://components/{name} - Specific component documentation",
        ],
        tools: [
            "search_components - Search for components by name, category, or feature",
            "get_component_code - Get source code for a specific component",
            "get_usage_example - Get usage example for a component",
            "get_design_token - Get design token information",
        ],
        mcpProtocol: {
            version: "2024-11-05",
            transport: "HTTP (JSON responses)",
            mode: "stateless",
            streaming: "disabled (Vercel serverless compatibility)",
        },
        limitations: {
            timeout: "10-60 seconds (Vercel serverless limit)",
            streaming: "SSE streaming disabled for Vercel compatibility",
            responseMode: "Direct JSON responses only",
        },
    });
}));
// MCP endpoint - requires authentication
// Note: Using POST only for Vercel serverless (no persistent GET/SSE streams)
app.post("/mcp", validateApiKey, asyncHandler(async (req, res) => {
    try {
        // Create HTTP transport for this request (stateless, JSON response mode)
        const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined, // Stateless mode
            enableJsonResponse: true, // Critical for Vercel: use JSON instead of SSE
        });
        // Connect MCP server to this transport
        await mcpServer.connect(transport);
        // Handle the HTTP request/response with the transport
        await transport.handleRequest(req, res, req.body);
        logger.debug("MCP request processed", {
            method: req.method,
            apiKeyPrefix: req.apiKeyPrefix,
            platform: "vercel",
        });
    }
    catch (error) {
        const err = error;
        logger.error("Failed to process MCP request", {
            error: err.message,
            stack: err.stack,
            method: req.method,
            path: req.path,
        });
        if (!res.headersSent) {
            res.status(500).json({
                error: {
                    code: -32603,
                    message: "Internal server error",
                    type: "INTERNAL_ERROR",
                },
            });
        }
    }
}));
// 404 handler (must be after all routes)
app.use(notFoundHandler);
// Global error handler (must be last)
app.use(errorHandler);
// Export for Vercel serverless functions
export default app;
//# sourceMappingURL=vercel-server.js.map