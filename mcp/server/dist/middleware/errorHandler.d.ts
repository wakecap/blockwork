import { Request, Response, NextFunction } from "express";
/**
 * Error types for MCP server
 */
export declare enum ErrorType {
    VALIDATION_ERROR = "VALIDATION_ERROR",
    AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
    AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
    NOT_FOUND = "NOT_FOUND",
    RATE_LIMIT_ERROR = "RATE_LIMIT_ERROR",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    BAD_REQUEST = "BAD_REQUEST"
}
/**
 * Custom error class for MCP server errors
 */
export declare class McpError extends Error {
    type: ErrorType;
    message: string;
    statusCode: number;
    details?: unknown | undefined;
    constructor(type: ErrorType, message: string, statusCode: number, details?: unknown | undefined);
}
/**
 * Global error handler middleware
 * Catches all errors and formats them as JSON responses
 */
export declare function errorHandler(err: Error & {
    type?: ErrorType;
    details?: unknown;
}, req: Request, res: Response, _next: NextFunction): void;
/**
 * 404 Not Found handler
 * Catches requests to non-existent routes
 */
export declare function notFoundHandler(req: Request, res: Response): void;
/**
 * Async handler wrapper to catch async errors
 * Usage: router.get('/route', asyncHandler(async (req, res) => { ... }))
 */
export declare function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown> | unknown): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map