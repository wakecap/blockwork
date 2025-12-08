# Claude Instructions: Adding Components to MCP Server

This file contains step-by-step instructions for Claude to follow when adding a new production-ready component to the Blockwork MCP server.

## Prerequisites Check

Before starting, verify:
- [ ] Component is exported from `src/design-system/index.ts`
- [ ] Component is included in `package.json` exports
- [ ] Component has Storybook documentation
- [ ] Component passes all linting and type checks
- [ ] User has confirmed the component is production-ready

If any of these are missing, inform the user before proceeding.

## Step 1: Read Component File

Read the component's main TypeScript file to understand:
- Props interface and types
- Key features and functionality
- Any dependencies on other components

**Action:**
```
Read src/design-system/components/[ComponentName]/[ComponentName].tsx
```

## Step 2: Read Component Story (Optional but Recommended)

Read the Storybook file to understand usage patterns and variants:

**Action:**
```
Read src/design-system/components/[ComponentName]/[ComponentName].stories.tsx
```

## Step 3: Gather Component Metadata

Based on the component code and story, gather:

1. **Name**: The component's name (PascalCase)
2. **Description**: Clear, concise description (1-2 sentences) of what it does and its purpose
3. **Category**: Choose from:
   - `Navigation` - Navigation bars, menus, breadcrumbs, tabs
   - `Form` - Buttons, inputs, selects, checkboxes, radio buttons
   - `Display` - Cards, badges, avatars, images, icons
   - `Feedback` - Alerts, toasts, loading indicators, modals
   - `Layout` - Grids, containers, dividers, spacers
   - `Data` - Tables, lists, data grids
   - `Typography` - Headings, text, links

4. **Props**: Document key props with format:
   ```
   propName: "type (optional/required, default: value) - Description"
   ```

5. **Features**: List 5-10 key features, focusing on:
   - Unique capabilities
   - Variant options
   - Responsive behavior
   - Accessibility features
   - RTL/Arabic support (if applicable)

6. **Dependencies**: List other Blockwork components it uses internally (if any)

## Step 4: Edit mcp/server/src/index.ts

**Action:**
```
Edit mcp/server/src/index.ts
```

Add the component metadata to the `COMPONENTS` object:

**Location**: After the existing components, before the closing `};`

**Template:**
```typescript
  ComponentName: {
    name: "ComponentName",
    description: "Clear, concise description of the component's purpose and use case",
    category: "CategoryName",
    path: "src/design-system/components/ComponentName/ComponentName.tsx",
    props: {
      propName: "PropType - Description of what this prop controls",
      variant: "'option1' | 'option2' | 'option3' (optional, default: 'option1') - Visual style variant",
      size: "'sm' | 'md' | 'lg' (optional, default: 'md') - Component size",
      // Add more props as needed
    },
    features: [
      "Feature 1 with specific details",
      "Feature 2 with specific details",
      "Responsive design with mobile optimization",
      "Accessibility features (ARIA labels, keyboard navigation)",
      // Add more features as needed
    ],
    dependencies: ["DependentComponent1", "DependentComponent2"], // Or empty array if none
  },
```

**Important Guidelines:**
- Use proper TypeScript syntax (commas, quotes, brackets)
- Maintain consistent indentation (2 spaces)
- Put a comma after the closing brace of the component object
- Keep the TODO comment section intact below your addition

## Step 5: Update Documentation Files

### A. Update mcp/docs/components.md

**Action:**
```
Edit mcp/docs/components.md
```

**Section**: "## Components Catalog"

Add the new component to the numbered list:

```markdown
Currently available **production-ready** components:

1. **TopNavigator** - Top navigation bar with project selector, menu dropdown, pinned items, and avatar menu
   - Full-featured navigation component for construction project applications
   - Includes MegaDropdown, Button, Avatar, SearchInput, and EmptyState integrations
   - Arabic/RTL support ready
   - Responsive and mobile-optimized

2. **ComponentName** - Brief one-line description
   - Key feature 1
   - Key feature 2
   - Key feature 3
   - Arabic/RTL support ready (if applicable)
```

### B. Update mcp/docs/getting-started.md

**Action:**
```
Edit mcp/docs/getting-started.md
```

**Section**: "## Production-Ready Components"

Update the count and add to the list:

```markdown
Currently available: **X component(s)**

1. **TopNavigator** - Full-featured navigation bar
   - [existing features...]

2. **ComponentName** - Brief description
   - Key feature 1
   - Key feature 2
   - Key feature 3
```

### C. Update CLAUDE.md

**Action:**
```
Edit CLAUDE.md
```

**Section**: "### Currently Exposed Components"

Add the new component:

```markdown
### Currently Exposed Components
- **TopNavigator** (production-ready) - Full navigation bar with all features
- **ComponentName** (production-ready) - Brief description
```

### D. Update README.md

**Action:**
```
Edit README.md
```

**Section**: "### Currently Available"

Add the new component:

```markdown
### Currently Available
- **TopNavigator** (production-ready) - Full-featured navigation component
- **ComponentName** (production-ready) - Brief description
```

## Step 6: Build the MCP Server

**Action:**
```bash
npm run mcp:build
```

**Expected Output:**
- No TypeScript errors
- Successful compilation
- Output files in `mcp/server/dist/`

**If build fails:**
1. Check TypeScript syntax in component metadata
2. Verify all quotes and commas are correct
3. Check that the component path is correct
4. Fix errors and rebuild

## Step 7: Verify the Build

**Action:**
```bash
ls -lh mcp/server/dist/index.js
```

**Expected Output:**
- File exists
- Size is reasonable (should increase from previous build)

## Step 8: Create Summary for User

Provide a summary message to the user with:

1. **Confirmation** that the component was added
2. **Component details**:
   - Name
   - Category
   - Number of documented props
   - Number of features listed
3. **Updated counts**:
   - Total production-ready components now available
   - List all exposed components
4. **Next steps** for testing:
   - How to test with Claude Desktop
   - Example queries to try
   - How to verify it's working

## Example Summary Message Template

```markdown
✅ Successfully added [ComponentName] to the MCP server!

## Component Details
- **Name**: ComponentName
- **Category**: CategoryName
- **Props documented**: X
- **Features listed**: Y
- **Dependencies**: [List or "None"]

## Updated MCP Server
Now exposing **X production-ready component(s)**:
1. TopNavigator
2. ComponentName

## Testing
1. Rebuild is complete: ✅
2. To test with Claude Desktop:
   ```bash
   # Restart Claude Desktop, then ask:
   - "What components are available in Blockwork?"
   - "Show me the ComponentName component"
   - "Generate a usage example for ComponentName"
   ```

## Documentation Updated
- ✅ mcp/server/src/index.ts
- ✅ mcp/docs/components.md
- ✅ mcp/docs/getting-started.md
- ✅ CLAUDE.md
- ✅ README.md

The MCP server is ready to use!
```

## Error Handling

### If component is not production-ready:
```
I notice that [ComponentName] is not yet exported from src/design-system/index.ts or package.json.

Before adding it to the MCP server, we should:
1. Export it from src/design-system/index.ts
2. Add it to package.json exports
3. Ensure it has Storybook documentation
4. Verify it passes linting and type checks

Should we complete these steps first, or would you like me to add it to the MCP server anyway?
```

### If component file doesn't exist:
```
I cannot find the component file at src/design-system/components/[ComponentName]/[ComponentName].tsx.

Could you verify:
1. The component name is correct?
2. The component exists in the repository?
3. The file path follows the standard structure?
```

### If build fails:
```
The MCP server build failed with the following error:
[error details]

This is likely due to:
1. Syntax error in the component metadata
2. Incorrect TypeScript types
3. Missing dependencies

I'll fix the issue and rebuild.
```

## Quality Checklist

Before completing, verify:
- [ ] Component metadata is complete and accurate
- [ ] Props are documented with types and descriptions
- [ ] Features list is specific and detailed (not generic)
- [ ] All 5 documentation files are updated
- [ ] Build succeeds without errors
- [ ] User receives clear summary with testing instructions

## Notes for Claude

- **Be thorough**: Read the component code carefully to understand all props and features
- **Be specific**: Avoid generic descriptions like "Works well" or "Good component"
- **Be consistent**: Follow the existing format and style in the COMPONENTS object
- **Be helpful**: Provide clear testing instructions to the user
- **Ask if unsure**: If component structure is unclear, ask the user for clarification

## Reference Files

For examples and additional context:
- `mcp/server/src/index.ts` - See existing TopNavigator for reference
- `mcp/docs/development.md` - Detailed guide for developers
- `mcp/docs/architecture.md` - Architecture documentation
