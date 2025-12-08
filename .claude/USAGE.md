# How to Use Claude Instructions

This document explains how to trigger and use the Claude instruction files in this repository.

## Quick Reference

| Task | Command | Instruction File |
|------|---------|------------------|
| Add component to MCP | "Add [ComponentName] to the MCP server" | `add-mcp-component.md` |

## Detailed Usage

### Adding a Component to the MCP Server

**Trigger phrases:**
- "Add [ComponentName] to the MCP server"
- "Expose [ComponentName] through MCP"
- "Make [ComponentName] available to AI agents"
- "Include [ComponentName] in the MCP server"

**Prerequisites:**
- Component must be production-ready
- Component must be exported from `src/design-system/index.ts`
- Component must have Storybook documentation

**Example conversation:**
```
User: "Add the Button component to the MCP server"

Claude: "I'll add the Button component to the MCP server. Let me first verify
it's production-ready by checking the exports and documentation..."

[Claude follows instructions in add-mcp-component.md]

Claude: "✅ Successfully added Button to the MCP server!

Component Details:
- Name: Button
- Category: Form
- Props documented: 12
- Features listed: 8

Updated MCP Server:
Now exposing 2 production-ready components:
1. TopNavigator
2. Button

To test with Claude Desktop:
..."
```

## How It Works

1. **User makes request** using trigger phrase
2. **Claude loads instruction file** from `.claude/instructions/`
3. **Claude follows steps** sequentially
4. **Claude verifies completion** at each step
5. **Claude provides summary** when done

## Tips for Best Results

### Be Specific
✅ "Add Button to the MCP server"
❌ "Update the MCP server"

### Confirm Prerequisites
If Claude asks about prerequisites, confirm:
- Component is tested and working
- Component is exported properly
- Documentation is complete

### Review the Summary
Claude will provide a detailed summary showing:
- What was changed
- What was updated
- How to test
- Next steps

### Testing After Changes

Always test the changes:
1. Restart Claude Desktop (if using)
2. Ask: "What components are available?"
3. Ask: "Show me the [ComponentName] component"
4. Ask: "Generate a usage example for [ComponentName]"

## Customizing Instructions

To modify how Claude performs a task:

1. Edit the instruction file in `.claude/instructions/`
2. Keep the same structure (Prerequisites, Steps, Error Handling, etc.)
3. Be explicit about commands and file paths
4. Test the changes by triggering the task

## Creating New Instructions

To add new automated tasks:

1. Create a new `.md` file in `.claude/instructions/`
2. Follow the structure of existing instruction files
3. Document it in `.claude/instructions/README.md`
4. Add usage examples to this file

## Troubleshooting

### Claude doesn't follow instructions

**Possible causes:**
- Trigger phrase wasn't clear
- Prerequisites weren't met
- Instruction file has errors

**Solutions:**
- Use clearer trigger phrase
- Confirm prerequisites first
- Check instruction file syntax

### Instructions are outdated

**Fix:**
1. Edit the instruction file
2. Update file paths or commands
3. Test with a new request

### Need to skip steps

You can tell Claude:
- "Skip the documentation updates"
- "Just update the MCP server file"
- "Only do steps 1-3"

## Examples by Task Type

### Adding Features
```
"Add [ComponentName] to the MCP server"
"Expose [ComponentName] to AI agents"
```

### Updating Configuration
```
"Update the MCP server configuration for [ComponentName]"
"Modify [ComponentName] metadata in MCP"
```

### Removing Components
```
"Remove [ComponentName] from the MCP server"
"Stop exposing [ComponentName] through MCP"
```

## Best Practices

1. **Verify prerequisites** before starting
2. **Review changes** after Claude completes
3. **Test functionality** to ensure it works
4. **Commit changes** with clear commit message
5. **Update Storybook** if needed

## Questions?

If you have questions about:
- **How to use** - See this file
- **How it works** - See `.claude/instructions/README.md`
- **Specific task** - See the instruction file for that task
- **Creating instructions** - See `.claude/instructions/README.md`

## Future Automation Ideas

Consider creating instructions for:
- Generating component documentation
- Creating new components from templates
- Updating version numbers
- Running test suites
- Deploying to production
- Migrating components
- Refactoring code patterns
