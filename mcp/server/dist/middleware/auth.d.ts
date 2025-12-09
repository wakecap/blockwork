import { Request, Response, NextFunction } from "express";
/**
 * Extended Request interface with authentication properties
 */
export interface AuthenticatedRequest extends Request {
    apiKey?: string;
    apiKeyPrefix?: string;
    isAuthenticated?: boolean;
}
/**
 * Authentication middleware for validating API keys
 * Expects Bearer token in Authorization header
 */
export declare function validateApiKey(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
/**
 * Optional authentication - doesn't fail if no API key provided
 * But applies rate limiting based on authentication status
 */
export declare function optionalAuth(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map