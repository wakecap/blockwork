import { logger } from "../utils/logger.js";
/**
 * Authentication middleware for validating API keys
 * Expects Bearer token in Authorization header
 */
export function validateApiKey(req, res, next) {
    const authHeader = req.headers.authorization;
    // Check if Authorization header exists
    if (!authHeader) {
        logger.warn("Missing Authorization header", {
            ip: req.ip,
            url: req.url,
        });
        return res.status(401).json({
            error: "Unauthorized",
            message: "Missing Authorization header. Please provide a valid API key.",
        });
    }
    // Check Bearer token format
    if (!authHeader.startsWith("Bearer ")) {
        logger.warn("Invalid Authorization format", {
            ip: req.ip,
            url: req.url,
        });
        return res.status(401).json({
            error: "Unauthorized",
            message: "Invalid Authorization format. Expected: Bearer <API_KEY>",
        });
    }
    // Extract the token
    const token = authHeader.substring(7); // Remove "Bearer " prefix
    // Get valid API keys from environment
    const validKeys = process.env.API_KEYS?.split(",").map((key) => key.trim()) || [];
    if (validKeys.length === 0) {
        logger.error("No API keys configured in environment");
        return res.status(500).json({
            error: "Configuration Error",
            message: "Server is not properly configured. Please contact the administrator.",
        });
    }
    // Validate the token
    if (!validKeys.includes(token)) {
        logger.warn("Invalid API key attempt", {
            ip: req.ip,
            url: req.url,
            keyPrefix: token.substring(0, 20) + "...", // Log only prefix for security
        });
        return res.status(401).json({
            error: "Unauthorized",
            message: "Invalid API key. Please check your credentials.",
        });
    }
    // Success - attach API key info to request for later use
    req.apiKey = token;
    req.apiKeyPrefix = token.substring(0, 20);
    logger.debug("API key validated successfully", {
        ip: req.ip,
        url: req.url,
        keyPrefix: req.apiKeyPrefix,
    });
    next();
}
/**
 * Optional authentication - doesn't fail if no API key provided
 * But applies rate limiting based on authentication status
 */
export function optionalAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        const validKeys = process.env.API_KEYS?.split(",").map((key) => key.trim()) || [];
        if (validKeys.includes(token)) {
            req.apiKey = token;
            req.apiKeyPrefix = token.substring(0, 20);
            req.isAuthenticated = true;
        }
    }
    next();
}
//# sourceMappingURL=auth.js.map