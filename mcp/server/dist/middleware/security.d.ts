import cors from "cors";
import { Request, Response, NextFunction } from "express";
/**
 * Security headers middleware using Helmet
 * Adds various security headers to HTTP responses
 */
export declare const securityHeaders: (req: import("http").IncomingMessage, res: import("http").ServerResponse, next: (err?: unknown) => void) => void;
/**
 * CORS configuration
 * Allows requests from configured origins
 */
export declare function corsMiddleware(): (req: cors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;
/**
 * Request size limiter
 * Prevents large payloads that could cause DoS
 */
export declare function requestSizeLimiter(req: Request, res: Response, next: NextFunction): void;
/**
 * Input sanitization middleware
 * Sanitizes request body and query parameters
 */
export declare function sanitizeInput(req: Request, res: Response, next: NextFunction): void;
/**
 * Prevent common security vulnerabilities
 */
export declare const securityMiddleware: (((req: cors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void) | typeof requestSizeLimiter)[];
//# sourceMappingURL=security.d.ts.map