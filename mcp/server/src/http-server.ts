import express, { Request, Response } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "./server.js";
import { logger, requestLogger } from "./utils/logger.js";
import { optionalAuth, validateApiKey } from "./middleware/auth.js";
import { combinedRateLimiter } from "./middleware/rateLimiter.js";
import { securityMiddleware } from "./middleware/security.js";
import { errorHandler, notFoundHandler, asyncHandler } from "./middleware/errorHandler.js";

// Load environment variables
const PORT = parseInt(process.env.PORT || "3000", 10);
const NODE_ENV = process.env.NODE_ENV || "development";

/**
 * Create and configure Express app
 */
function createApp() {
  const app = express();

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
 * Create MCP server and transport
 */
async function startServer() {
  const app = createApp();

  // Create MCP server instance
  const mcpServer = createMcpServer();

  // Health check endpoint (public, no auth required)
  app.get(
    "/health",
    asyncHandler(async (req: Request, res: Response) => {
      res.json({
        status: "healthy",
        service: "blockwork-mcp-server",
        version: "1.0.0",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: NODE_ENV,
      });
    }),
  );

  // API documentation endpoint (public, no auth required)
  app.get(
    "/api/docs",
    asyncHandler(async (req: Request, res: Response) => {
      res.json({
        name: "Blockwork Design System MCP Server",
        version: "1.0.0",
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
          transport: "HTTP Streamable",
          mode: "stateless",
        },
      });
    }),
  );

  // MCP endpoint - requires authentication
  // Using all methods for MCP protocol (GET for SSE, POST for messages, DELETE for cleanup)
  const handleMcpRequest = async (req: Request, res: Response) => {
    try {
      // Create HTTP transport for this request (stateless mode)
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined, // Stateless mode
      });

      // Connect MCP server to this transport
      await mcpServer.connect(transport);

      // Handle the HTTP request/response with the transport
      await transport.handleRequest(req, res, req.body);

      logger.debug("MCP request processed", {
        method: req.method,
        apiKeyPrefix: (req as any).apiKeyPrefix,
      });
    } catch (error: any) {
      logger.error("Failed to process MCP request", {
        error: error.message,
        stack: error.stack,
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
  };

  app.get("/mcp", validateApiKey, handleMcpRequest);
  app.post("/mcp", validateApiKey, handleMcpRequest);
  app.delete("/mcp", validateApiKey, handleMcpRequest);

  // 404 handler (must be after all routes)
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(errorHandler);

  // Start HTTP server
  const server = app.listen(PORT, () => {
    logger.info("Blockwork MCP HTTP Server started", {
      port: PORT,
      environment: NODE_ENV,
      transport: "HTTP Streamable",
      mode: "stateless",
    });
    logger.info("Available endpoints", {
      health: `http://localhost:${PORT}/health`,
      docs: `http://localhost:${PORT}/api/docs`,
      mcp: `http://localhost:${PORT}/mcp`,
    });
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    logger.info("SIGTERM received, shutting down gracefully");
    server.close(() => {
      logger.info("HTTP server closed");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    logger.info("SIGINT received, shutting down gracefully");
    server.close(() => {
      logger.info("HTTP server closed");
      process.exit(0);
    });
  });
}

// Start the server
startServer().catch((error) => {
  logger.error("Failed to start server", {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});
