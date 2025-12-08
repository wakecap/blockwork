#!/usr/bin/env node
/**
 * API Key Generator for Blockwork MCP Server
 *
 * Generates secure API keys for authentication.
 * Keys are prefixed with BLOCKWORK_API_KEY_ followed by a UUID.
 *
 * Usage:
 *   npm run mcp:generate-key
 *   OR
 *   node mcp/server/dist/scripts/generate-api-key.js
 */

import { randomUUID } from "crypto";

function generateApiKey(): string {
  return `BLOCKWORK_API_KEY_${randomUUID()}`;
}

// Generate multiple keys if requested
const count = parseInt(process.argv[2] || "1", 10);
const validCount = Math.min(Math.max(count, 1), 10); // Limit to 1-10 keys

console.log("\n🔑 Blockwork MCP Server - API Key Generator\n");
console.log("━".repeat(60));

if (validCount === 1) {
  const apiKey = generateApiKey();
  console.log("\nGenerated API Key:\n");
  console.log(`  ${apiKey}\n`);
} else {
  console.log(`\nGenerated ${validCount} API Keys:\n`);
  for (let i = 0; i < validCount; i++) {
    const apiKey = generateApiKey();
    console.log(`  ${i + 1}. ${apiKey}`);
  }
  console.log("");
}

console.log("━".repeat(60));
console.log("\n📝 Next Steps:\n");
console.log("1. Copy the API key(s) above");
console.log("2. Add to your .env file:");
console.log("   API_KEYS=BLOCKWORK_API_KEY_xxx,BLOCKWORK_API_KEY_yyy");
console.log("3. For Railway deployment, add as environment variable");
console.log("4. Share keys securely with authorized users\n");
console.log("⚠️  Security:");
console.log("   - Never commit API keys to version control");
console.log("   - Rotate keys regularly");
console.log("   - Revoke compromised keys immediately\n");
