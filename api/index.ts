/**
 * Vercel Serverless Function Entry Point
 *
 * This file exports the Express app for Vercel's serverless platform.
 * All routes (/health, /api/docs, /mcp) are handled by this function.
 */

import app from "../mcp/server/dist/vercel-server.js";

export default app;
