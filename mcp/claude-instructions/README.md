# Claude AI Automation Instructions

This directory contains instruction files for Claude AI to automate common MCP server tasks.

## What Are These Instructions?

These `.md` files contain step-by-step instructions that Claude AI can follow to perform complex, repetitive tasks consistently. They act as "playbooks" that ensure Claude:
- Follows best practices
- Updates all relevant files
- Maintains consistency across the codebase
- Doesn't miss any steps

## Available Instructions

### [`add-component.md`](./add-component.md)
**Purpose**: Add a new production-ready component to the MCP server

**When to use**: After a component has been:
- Fully implemented and tested
- Exported from `src/design-system/index.ts`
- Added to `package.json` exports
- Documented in Storybook

**What it does**:
1. Reads component files to understand props and features
2. Adds component metadata to `mcp/server/src/index.ts`
3. Updates all relevant documentation files
4. Builds the MCP server
5. Provides testing instructions

**How to use**: Tell Claude:
```
Follow the instructions in mcp/claude-instructions/add-component.md to add [ComponentName]
```

## How These Instructions Work

1. **User Request**: You ask Claude to perform a task
2. **Instruction Loading**: Claude reads the relevant instruction file
3. **Step-by-Step Execution**: Claude follows each step in order
4. **Verification**: Claude verifies each step succeeded
5. **Summary**: Claude provides a summary of what was done

## Benefits

- **Consistency**: Every component addition follows the same process
- **Completeness**: No documentation files are forgotten
- **Quality**: Built-in quality checks and validation
- **Efficiency**: Automation reduces manual work
- **Knowledge Transfer**: New team members can see exactly what needs to be done

## Creating New Instructions

If you need Claude to automate a new task:

1. **Identify the Task**: What repetitive task needs automation?
2. **Document Steps**: Write clear, numbered steps
3. **Include Examples**: Show what the output should look like
4. **Add Error Handling**: Cover common failure scenarios
5. **Test**: Have Claude follow the instructions to verify they work

### Instruction File Template

```markdown
# Claude Instructions: [Task Name]

Brief description of what this automation does.

## Prerequisites Check

List what must be true before starting:
- [ ] Prerequisite 1
- [ ] Prerequisite 2

## Step 1: [Action Name]

**Action:**
\```
Command or tool to use
\```

Clear description of what to do.

## Step 2: [Action Name]

Continue with numbered steps...

## Error Handling

### If X happens:
\```
Explanation and recovery steps
\```

## Quality Checklist

Final verification steps:
- [ ] Check 1
- [ ] Check 2
```

## Best Practices

### For Users:
- Reference the instruction file by path when asking Claude to perform a task
- Review Claude's work after it completes the automation
- Provide feedback if any steps are unclear or incomplete

### For Maintainers:
- Keep instructions up-to-date with codebase changes
- Update file paths when restructuring the project
- Add new instructions as repetitive tasks emerge
- Remove or archive instructions that are no longer needed

## Related Documentation

- [MCP Server Architecture](../docs/architecture.md) - Understand how the MCP server works
- [Development Guide](../docs/development.md) - Manual guide for adding components
- [Component Catalog](../docs/components.md) - See all available components

## Questions?

If you have questions about these instructions or need help creating new ones, refer to:
- The example instruction file: `add-component.md`
- The development guide: `mcp/docs/development.md`
- The main project documentation: `README.md`
