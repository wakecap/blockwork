# Quick Start: Adding Components to MCP

This is a condensed guide for quickly adding a component to the MCP server.

## One-Line Trigger

Just say:
```
"Add [ComponentName] to the MCP server"
```

Claude will automatically:
1. ✅ Verify the component is production-ready
2. ✅ Read the component code and documentation
3. ✅ Extract props, features, and dependencies
4. ✅ Update MCP server configuration
5. ✅ Update all 5 documentation files
6. ✅ Build and verify the MCP server
7. ✅ Provide testing instructions

## Prerequisites

Before asking Claude to add a component:
- [ ] Component is exported from `src/design-system/index.ts`
- [ ] Component is in `package.json` exports
- [ ] Component has Storybook documentation
- [ ] Component passes linting and type checks
- [ ] Component is production-ready

## After Adding

Test it works:
```bash
# 1. Restart Claude Desktop

# 2. Ask Claude Desktop:
"What components are available in Blockwork?"
"Show me the [ComponentName] component"
"Generate a usage example for [ComponentName]"
```

## Files That Get Updated

- `mcp/server/src/index.ts` - Component metadata added
- `mcp/docs/components.md` - Components catalog updated
- `mcp/docs/getting-started.md` - Quick start guide updated
- `CLAUDE.md` - Architecture docs updated
- `README.md` - Main readme updated

## Common Issues

**Build fails?**
- Check TypeScript syntax in metadata
- Verify component path is correct
- Run `npm run mcp:build` to see error

**Component not found?**
- Restart Claude Desktop
- Verify component was added to COMPONENTS object
- Check spelling matches exactly

**Wrong information?**
- Edit `mcp/server/src/index.ts` directly
- Update the component metadata
- Rebuild: `npm run mcp:build`

## Example

```
User: "Add Button to the MCP server"

Claude: "I'll add the Button component to the MCP server..."

[Claude reads Button.tsx]
[Claude extracts 12 props, 8 features]
[Claude updates 5 files]
[Claude builds successfully]

Claude: "✅ Successfully added Button to the MCP server!

Now exposing 2 production-ready components:
1. TopNavigator
2. Button

To test..."
```

## That's It!

For detailed documentation, see:
- Full instructions: `mcp/claude-instructions/add-component.md`
- Usage guide: `.claude/USAGE.md`
- Developer guide: `mcp/docs/development.md`
