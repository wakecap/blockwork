import { Request, Response, NextFunction } from "express";
/**
 * Rate limiter for unauthenticated requests
 * Default: 100 requests per minute per IP
 */
export declare const globalRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Rate limiter for authenticated requests
 * Default: 500 requests per minute per API key
 * More lenient than global rate limiter
 */
export declare const authenticatedRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Combined rate limiter that applies both global and authenticated limits
 * This middleware should be applied after optional authentication
 */
export declare function combinedRateLimiter(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=rateLimiter.d.ts.map