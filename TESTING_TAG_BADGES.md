# 🧪 Testing Tag Badges

## Quick Test Instructions

### 1. Start Storybook

```bash
npm run storybook
```

### 2. Check the Sidebar

Navigate to **Components → Button** and look for these badges:

#### ✅ Expected Results:

**Playground** story should show:
- 🟢 **NEW** badge (green)
- 🟢 **STABLE** badge (green)

**IconShowcase** story should show:
- 🔵 **BETA** badge (blue)
- 🟣 **V1.2** badge (violet)

**StateCombinations** story should show:
- 🟠 **WIP** badge (amber)

### 3. Test Hover Tooltips

Hover over each badge to see the tooltip:
- **NEW**: "Recently added component or feature"
- **STABLE**: "Production ready and stable"
- **BETA**: "Beta version - API may change"
- **V1.2**: "Version number"
- **WIP**: "Work in progress"

## Visual Example

```
Components
└── 📁 Button
    ├── 📄 Default
    ├── 📄 Playground [NEW] [STABLE] ← Look here!
    ├── 📄 IconShowcase [BETA] [V1.2] ← And here!
    ├── 📄 StateCombinations [WIP] ← And here!
    └── ...more stories
```

## If Badges Don't Appear

1. **Restart Storybook** (configuration changes require restart)
   ```bash
   # Stop current Storybook (Ctrl+C)
   npm run storybook
   ```

2. **Clear cache**
   ```bash
   npm run build-storybook -- --clean
   npm run storybook
   ```

3. **Check browser console** for any errors

4. **Verify addon installation**
   ```bash
   npm list storybook-addon-tag-badges
   ```
   Should show: `storybook-addon-tag-badges@x.x.x`

## Adding Your Own Badges

Try adding a badge to another story:

1. Open any `.stories.tsx` file
2. Add tags to a story:
   ```typescript
   export const YourStory: Story = {
     tags: ['new', 'beta'],
     // rest of story...
   };
   ```
3. Save and check the sidebar

## Custom Badge Example

Want a custom badge? Add this to `.storybook/main.ts` badges array:

```typescript
{
  tags: ["premium"],
  badge: {
    text: "PREMIUM",
    bgColor: "#fbbf24", // yellow
    fgColor: "#000000",
    tooltip: "Premium feature"
  }
}
```

Then use it:
```typescript
export const PremiumFeature: Story = {
  tags: ['premium'],
  // ...
};
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Badges not showing | Restart Storybook |
| Wrong colors | Check hex values in main.ts |
| Tooltip not appearing | Hover and wait ~500ms |
| Custom tag ignored | Check spelling matches config |
| Multiple instances | Each story can have multiple tags |

## Success Criteria

✅ Badges appear in sidebar  
✅ Colors match configuration  
✅ Tooltips show on hover  
✅ Multiple badges display correctly  
✅ No console errors  

---

🎉 **If you see the badges, setup is complete!**

📖 **Next Steps**: 
- Read `STORYBOOK_TAG_BADGES_GUIDE.md` for detailed usage
- Check `TAG_BADGES_QUICK_REFERENCE.md` for quick tips
- Add badges to your other components

