import { logger } from "../utils/logger.js";
/**
 * Error types for MCP server
 */
export var ErrorType;
(function (ErrorType) {
    ErrorType["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorType["AUTHENTICATION_ERROR"] = "AUTHENTICATION_ERROR";
    ErrorType["AUTHORIZATION_ERROR"] = "AUTHORIZATION_ERROR";
    ErrorType["NOT_FOUND"] = "NOT_FOUND";
    ErrorType["RATE_LIMIT_ERROR"] = "RATE_LIMIT_ERROR";
    ErrorType["INTERNAL_ERROR"] = "INTERNAL_ERROR";
    ErrorType["BAD_REQUEST"] = "BAD_REQUEST";
})(ErrorType || (ErrorType = {}));
/**
 * Custom error class for MCP server errors
 */
export class McpError extends Error {
    type;
    message;
    statusCode;
    details;
    constructor(type, message, statusCode, details) {
        super(message);
        this.type = type;
        this.message = message;
        this.statusCode = statusCode;
        this.details = details;
        this.name = "McpError";
    }
}
/**
 * Map error types to HTTP status codes
 */
function getStatusCode(error) {
    if (error instanceof McpError) {
        return error.statusCode;
    }
    if (error.status) {
        return error.status;
    }
    if (error.statusCode) {
        return error.statusCode;
    }
    // Default to 500 for unknown errors
    return 500;
}
/**
 * Map error types to JSON-RPC error codes
 * Reference: https://www.jsonrpc.org/specification#error_object
 */
function getJsonRpcErrorCode(statusCode) {
    switch (statusCode) {
        case 400:
            return -32600; // Invalid Request
        case 401:
        case 403:
            return -32001; // Unauthorized (custom code)
        case 404:
            return -32601; // Method not found
        case 429:
            return -32002; // Rate limit exceeded (custom code)
        case 500:
        default:
            return -32603; // Internal error
    }
}
/**
 * Global error handler middleware
 * Catches all errors and formats them as JSON responses
 */
export function errorHandler(err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) {
    const statusCode = getStatusCode(err);
    const isProduction = process.env.NODE_ENV === "production";
    // Log the error
    const errorLog = {
        type: err.type || "UNKNOWN_ERROR",
        message: err.message,
        statusCode,
        path: req.path,
        method: req.method,
        ip: req.ip,
        stack: !isProduction ? err.stack : undefined,
        details: err.details,
    };
    if (statusCode >= 500) {
        logger.error("Server error", errorLog);
    }
    else {
        logger.warn("Client error", errorLog);
    }
    // Format error response
    const errorResponse = {
        error: {
            code: getJsonRpcErrorCode(statusCode),
            message: err.message || "An error occurred",
            type: err.type || ErrorType.INTERNAL_ERROR,
        },
    };
    // Add details in development mode
    if (!isProduction) {
        errorResponse.error.details = err.details;
        errorResponse.error.stack = err.stack;
    }
    // Send response
    res.status(statusCode).json(errorResponse);
}
/**
 * 404 Not Found handler
 * Catches requests to non-existent routes
 */
export function notFoundHandler(req, res) {
    logger.warn("Route not found", {
        path: req.path,
        method: req.method,
        ip: req.ip,
    });
    res.status(404).json({
        error: {
            code: -32601,
            message: `Route ${req.method} ${req.path} not found`,
            type: ErrorType.NOT_FOUND,
        },
    });
}
/**
 * Async handler wrapper to catch async errors
 * Usage: router.get('/route', asyncHandler(async (req, res) => { ... }))
 */
export function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
//# sourceMappingURL=errorHandler.js.map