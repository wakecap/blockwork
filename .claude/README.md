# Claude Configuration

This directory contains configuration and instructions for Claude AI to work effectively in this repository.

## Structure

```
.claude/
├── README.md                           # This file
├── USAGE.md                           # How to use Claude instructions
├── instructions/
│   ├── README.md                      # Overview of available instructions
│   ├── QUICK_START.md                 # Quick reference guide
│   └── add-mcp-component.md          # Add component to MCP server
```

## What This Does

The `.claude/` directory provides **structured instructions** for Claude to follow when performing common tasks in this repository.

Instead of explaining the entire process each time, you can simply say:
- "Add [ComponentName] to the MCP server"

And Claude will automatically follow the complete step-by-step process.

## Available Instructions

### Add Component to MCP Server
**File**: `instructions/add-mcp-component.md`
**Trigger**: "Add [ComponentName] to the MCP server"
**What it does**: Reads component, extracts metadata, updates all docs, builds, and provides testing instructions

## How to Use

1. **Trigger a task**: Use the trigger phrase (e.g., "Add Button to the MCP server")
2. **Claude follows instructions**: Claude loads and follows the instruction file
3. **Review results**: Claude provides a summary of what was done
4. **Test changes**: Follow the testing instructions provided

## Benefits

- ✅ **Consistent**: Same process every time
- ✅ **Complete**: No steps forgotten
- ✅ **Documented**: All actions tracked
- ✅ **Fast**: No need to explain the process
- ✅ **Reliable**: Error handling built-in

## Adding New Instructions

To automate a new task:

1. Create a new `.md` file in `instructions/`
2. Follow the structure of existing instruction files
3. Document in `instructions/README.md`
4. Add usage examples to `USAGE.md`

## Documentation

- **Quick Start**: `.claude/instructions/QUICK_START.md`
- **Detailed Usage**: `.claude/USAGE.md`
- **All Instructions**: `.claude/instructions/README.md`

## For More Information

- See `CLAUDE.md` in the repository root for architecture
- See `mcp/docs/architecture.md` for MCP server architecture
- See `mcp/docs/development.md` for developer guide
- See `mcp/claude-instructions/` for MCP automation instructions
