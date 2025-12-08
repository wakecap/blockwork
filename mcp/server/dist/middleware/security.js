import helmet from "helmet";
import cors from "cors";
import { logger } from "../utils/logger.js";
/**
 * Security headers middleware using Helmet
 * Adds various security headers to HTTP responses
 */
export const securityHeaders = helmet({
    // Content Security Policy
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    // Strict Transport Security
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
    },
    // X-Frame-Options
    frameguard: {
        action: "deny",
    },
    // X-Content-Type-Options
    noSniff: true,
    // X-XSS-Protection
    xssFilter: true,
});
/**
 * CORS configuration
 * Allows requests from configured origins
 */
export function corsMiddleware() {
    const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || "";
    const allowedOrigins = allowedOriginsEnv
        .split(",")
        .map((origin) => origin.trim())
        .filter((origin) => origin.length > 0);
    // If no origins configured, allow all in development, none in production
    const isDevelopment = process.env.NODE_ENV !== "production";
    if (allowedOrigins.length === 0 && !isDevelopment) {
        logger.warn("No ALLOWED_ORIGINS configured. CORS will deny all requests.");
    }
    return cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, curl, Postman)
            if (!origin) {
                return callback(null, true);
            }
            // In development, allow all origins if none specified
            if (isDevelopment && allowedOrigins.length === 0) {
                return callback(null, true);
            }
            // Check if origin is in whitelist
            if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
                callback(null, true);
            }
            else {
                logger.warn("CORS blocked request from unauthorized origin", {
                    origin,
                    allowedOrigins,
                });
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "MCP-Protocol-Version"],
        exposedHeaders: ["RateLimit-Limit", "RateLimit-Remaining", "RateLimit-Reset"],
        maxAge: 86400, // 24 hours
    });
}
/**
 * Request size limiter
 * Prevents large payloads that could cause DoS
 */
export function requestSizeLimiter(req, res, next) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    let size = 0;
    req.on("data", (chunk) => {
        size += chunk.length;
        if (size > maxSize) {
            logger.warn("Request size limit exceeded", {
                ip: req.ip,
                url: req.url,
                size,
                maxSize,
            });
            res.status(413).json({
                error: "Payload Too Large",
                message: `Request size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`,
            });
            req.destroy();
        }
    });
    next();
}
/**
 * Input sanitization middleware
 * Sanitizes request body and query parameters
 */
export function sanitizeInput(req, res, next) {
    // Sanitize query parameters
    if (req.query) {
        for (const key in req.query) {
            if (typeof req.query[key] === "string") {
                // Remove potentially dangerous characters
                req.query[key] = req.query[key]
                    .replace(/[<>\"']/g, "")
                    .trim();
            }
        }
    }
    // Sanitize body (for JSON requests)
    if (req.body && typeof req.body === "object") {
        sanitizeObject(req.body);
    }
    next();
}
/**
 * Recursively sanitize object properties
 */
function sanitizeObject(obj) {
    for (const key in obj) {
        if (typeof obj[key] === "string") {
            // Remove potentially dangerous characters but preserve MCP protocol content
            // Only sanitize if it looks like user input, not protocol data
            if (!key.includes("jsonrpc") && !key.includes("method")) {
                obj[key] = obj[key].replace(/[<>]/g, "").trim();
            }
        }
        else if (typeof obj[key] === "object" && obj[key] !== null) {
            sanitizeObject(obj[key]);
        }
    }
}
/**
 * Prevent common security vulnerabilities
 */
export const securityMiddleware = [
    securityHeaders,
    corsMiddleware(),
    requestSizeLimiter,
    sanitizeInput,
];
//# sourceMappingURL=security.js.map