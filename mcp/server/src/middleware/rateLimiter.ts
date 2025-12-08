import rateLimit from "express-rate-limit";
import { Request } from "express";
import { logger } from "../utils/logger.js";

// Configuration from environment variables
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10); // 1 minute
const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10);
const RATE_LIMIT_AUTHENTICATED_MAX = parseInt(process.env.RATE_LIMIT_AUTHENTICATED_MAX || "500", 10);

/**
 * Rate limiter for unauthenticated requests
 * Default: 100 requests per minute per IP
 */
export const globalRateLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_REQUESTS,
  message: {
    error: "Too Many Requests",
    message: `You have exceeded the rate limit. Please try again later. Limit: ${RATE_LIMIT_MAX_REQUESTS} requests per ${RATE_LIMIT_WINDOW_MS / 1000} seconds.`,
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  skip: (req: Request) => {
    // Skip rate limiting for authenticated users (they have their own limiter)
    return !!(req as any).isAuthenticated;
  },
  handler: (req, res) => {
    logger.warn("Rate limit exceeded (unauthenticated)", {
      ip: req.ip,
      url: req.url,
      limit: RATE_LIMIT_MAX_REQUESTS,
    });
    res.status(429).json({
      error: "Too Many Requests",
      message: `You have exceeded the rate limit. Please try again later. Limit: ${RATE_LIMIT_MAX_REQUESTS} requests per ${RATE_LIMIT_WINDOW_MS / 1000} seconds.`,
    });
  },
});

/**
 * Rate limiter for authenticated requests
 * Default: 500 requests per minute per API key
 * More lenient than global rate limiter
 */
export const authenticatedRateLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_AUTHENTICATED_MAX,
  message: {
    error: "Too Many Requests",
    message: `You have exceeded the authenticated rate limit. Please try again later. Limit: ${RATE_LIMIT_AUTHENTICATED_MAX} requests per ${RATE_LIMIT_WINDOW_MS / 1000} seconds.`,
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Use API key for rate limiting instead of IP
  keyGenerator: (req: Request) => {
    return (req as any).apiKeyPrefix || req.ip || "unknown";
  },
  skip: (req: Request) => {
    // Only apply to authenticated users
    return !(req as any).isAuthenticated;
  },
  handler: (req, res) => {
    logger.warn("Rate limit exceeded (authenticated)", {
      ip: req.ip,
      url: req.url,
      apiKeyPrefix: (req as any).apiKeyPrefix,
      limit: RATE_LIMIT_AUTHENTICATED_MAX,
    });
    res.status(429).json({
      error: "Too Many Requests",
      message: `You have exceeded the authenticated rate limit. Please try again later. Limit: ${RATE_LIMIT_AUTHENTICATED_MAX} requests per ${RATE_LIMIT_WINDOW_MS / 1000} seconds.`,
    });
  },
});

/**
 * Combined rate limiter that applies both global and authenticated limits
 * This middleware should be applied after optional authentication
 */
export function combinedRateLimiter(req: any, res: any, next: any) {
  if ((req as any).isAuthenticated) {
    // Use authenticated rate limiter
    authenticatedRateLimiter(req, res, next);
  } else {
    // Use global rate limiter
    globalRateLimiter(req, res, next);
  }
}
