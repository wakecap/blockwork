#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpServer } from "./server.js";

// Load environment variables in development
if (process.env.NODE_ENV !== "production") {
  try {
    const dotenv = await import("dotenv");
    dotenv.config({ path: "./mcp/server/.env" });
  } catch (error) {
    // dotenv not available or .env file not found, continue without it
  }
}

/**
 * Blockwork Design System MCP Server
 * Supports dual-mode operation:
 * - STDIO (default): Local process communication for Claude Desktop
 * - HTTP: Remote HTTP server for external clients
 */
async function main() {
  const transport = process.env.MCP_TRANSPORT || "stdio";

  if (transport === "http") {
    // Start HTTP server
    console.error("Starting Blockwork MCP HTTP Server...");
    await import("./http-server.js");
  } else {
    // Start STDIO server (default, backward compatible)
    console.error("Starting Blockwork Design System MCP server on stdio...");

    const server = createMcpServer();
    const stdioTransport = new StdioServerTransport();

    await server.connect(stdioTransport);
    console.error("Blockwork Design System MCP server running on stdio");
  }
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
