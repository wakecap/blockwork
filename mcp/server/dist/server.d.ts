import { Server } from "@modelcontextprotocol/sdk/server/index.js";
export type ComponentMetadata = {
    name: string;
    description: string;
    category: string;
    path: string;
    props?: Record<string, string>;
    features?: string[];
    dependencies?: string[];
};
export declare const COMPONENTS: Record<string, ComponentMetadata>;
export declare const DESIGN_TOKENS: {
    colors: {
        primary: string;
        secondary: string;
        semantic: string;
        wakecap: string;
    };
    typography: {
        fonts: {
            sans: string;
            arabic: string;
            mono: string;
        };
        scale: string;
        weights: string;
    };
    spacing: string;
    shadows: string;
    borderRadius: string;
    animations: {
        durations: string;
        easings: string;
        keyframes: string;
    };
    zIndex: string;
};
/**
 * Create and configure an MCP server with all request handlers
 * This function is used by both stdio and HTTP transports
 */
export declare function createMcpServer(): Server;
//# sourceMappingURL=server.d.ts.map