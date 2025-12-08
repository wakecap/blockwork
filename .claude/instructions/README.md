# Claude Instructions Directory

This directory contains instruction files for Claude to follow when performing specific tasks in the Blockwork repository.

## Available Instructions

### `add-mcp-component.md`
**Purpose**: Add a new production-ready component to the MCP server

**When to use**: When a component is ready for production and should be exposed to AI agents via the MCP server

**How to use**:
```
User: "Add [ComponentName] to the MCP server"
Claude: [Follows instructions in add-mcp-component.md]
```

**What it does**:
1. Verifies component is production-ready
2. Reads component code and documentation
3. Extracts props, features, and dependencies
4. Updates MCP server configuration
5. Updates all documentation files
6. Builds and verifies the MCP server
7. Provides testing instructions

## How These Instructions Work

When a user requests a task that matches one of these instruction files, Claude will:

1. **Load the instruction file** - Read the complete step-by-step guide
2. **Follow each step** - Execute actions in order
3. **Verify completion** - Check that each step succeeded
4. **Handle errors** - Use error handling guidelines if issues occur
5. **Provide summary** - Give user clear feedback on what was done

## Adding New Instructions

To add new instruction files:

1. Create a new `.md` file in this directory
2. Follow this structure:
   - **Prerequisites** - What must be true before starting
   - **Steps** - Numbered, actionable steps with commands
   - **Error Handling** - How to handle common issues
   - **Quality Checklist** - Verification items
   - **Summary Template** - How to communicate results to user

3. Update this README with the new instruction file

## Best Practices for Instruction Files

- **Be explicit**: Include exact commands and file paths
- **Be sequential**: Steps should be in order with clear dependencies
- **Be complete**: Include error handling and verification
- **Be helpful**: Provide templates and examples
- **Be specific**: Avoid ambiguous language

## File Naming Convention

- Use kebab-case: `task-name.md`
- Be descriptive: Name should indicate what task it covers
- Be verb-based: Start with action verb (add, update, create, fix)

Examples:
- ✅ `add-mcp-component.md`
- ✅ `update-design-tokens.md`
- ✅ `create-new-component.md`
- ❌ `component.md`
- ❌ `instructions.md`

## Future Instructions to Add

Consider creating instruction files for:
- Adding a new component to the design system
- Updating design tokens
- Publishing a new version
- Adding a new Storybook story
- Configuring CI/CD
- Updating dependencies

## Questions?

If you need to create a new instruction file or modify an existing one, consider:
- What task needs automation?
- What are the exact steps involved?
- What could go wrong?
- How should results be communicated?
