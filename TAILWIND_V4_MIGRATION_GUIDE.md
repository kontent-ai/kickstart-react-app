# Tailwind CSS v3 to v4 Migration Guide

## Overview
This guide provides a comprehensive plan for migrating the kickstart-react-app from Tailwind CSS v3.4.14 to v4.0. Tailwind CSS v4 brings significant performance improvements (up to 8x faster builds), a new configuration approach, and leverages modern CSS features.

## Prerequisites
- Node.js 20+ (required for v4)
- Backup your current project or work in a new branch
- Review your custom configurations and utilities

## Current Setup Analysis

### Current Configuration (v3)
- **Tailwind Version**: 3.4.14
- **PostCSS**: Using `postcss.config.js` with tailwindcss and autoprefixer plugins
- **Config File**: `tailwind.config.js` with custom theme extensions
- **CSS Import**: Using `@tailwind` directives in `src/index.css`
- **Build Tool**: Vite with PostCSS

### Custom Theme Configuration
Your project has the following customizations that need migration:
- Custom colors: burgundy, azure, creme, custom gray shades
- Custom fonts: Source Sans 3, Abhaya Libre
- Container configuration

## Migration Steps

### Step 1: Automated Upgrade (Recommended First Step)

Run the official upgrade tool which will handle most changes automatically:

```bash
# Run the upgrade tool (requires Node.js 20+)
npx @tailwindcss/upgrade

# Review the changes made by the tool
git diff
```

The upgrade tool will:
- Update package dependencies
- Convert configuration files
- Update CSS imports
- Rename deprecated utilities

### Step 2: Update Dependencies

#### Remove old packages:
```bash
npm uninstall tailwindcss autoprefixer postcss
```

#### Install Tailwind v4 packages:
```bash
# For Vite setup (recommended)
npm install tailwindcss@next @tailwindcss/vite@next

# Alternative: PostCSS setup
# npm install tailwindcss@next @tailwindcss/postcss@next
```

### Step 3: Update Vite Configuration

Replace PostCSS configuration with the new Vite plugin:

**vite.config.ts** (update):
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### Step 4: Update CSS Import

**src/index.css** (replace entire file):
```css
@import "tailwindcss";

/* If you need to keep the JS config during migration */
@config "../tailwind.config.js";
```

Note: The `@tailwind base`, `@tailwind components`, and `@tailwind utilities` directives are deprecated in v4.

### Step 5: Migrate Configuration
CSS-Based Configuration (v4 Native Approach)

Migrate to CSS-based configuration for better performance:

**src/index.css**:
```css
@import "tailwindcss";

/* Custom theme configuration using CSS variables */
@theme {
  /* Custom Colors */
  --color-burgundy: #993265;
  --color-azure: #009edb;
  --color-creme: #fff7e7;
  --color-gray-light: #8e8e8e;
  --color-gray: #3b3b3b;
  
  /* Custom Fonts */
  --font-family-sans: "Source Sans 3", Arial, sans-serif;
  --font-family-libre: "Abhaya Libre", Arial, serif;
}

/* Container configuration */
.container {
  margin-left: auto;
  margin-right: auto;
}
```

### Step 6: Remove PostCSS Configuration

Delete or rename the PostCSS config file as it's no longer needed with Vite plugin:

```bash
# Remove or rename
rm postcss.config.js
# or
mv postcss.config.js postcss.config.js.backup
```

### Step 7: Update Package.json Scripts

No changes needed to scripts, but ensure you're using:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

### Step 8: Handle Breaking Changes

#### Key Breaking Changes to Review:

1. **Renamed Utilities**:
   - Shadow utilities: `shadow-xs` → might need adjustment
   - Blur utilities: Check any `blur-*` classes
   - Ring utilities: Default ring color changed

2. **Color Changes**:
   - Colors now use OKLCH color space (more vibrant)
   - Some default colors have changed
   - Review if any UI elements look different

3. **Spacing and Sizing**:
   - Dynamic utilities now accept any value
   - Grid sizes are dynamically generated

4. **Selectors**:
   - Space-between selector changed
   - Review any complex selectors

### Step 9: Test and Verify

1. **Start Development Server**:
```bash
npm run dev
```

2. **Check for Console Errors**:
- Look for any CSS parsing errors
- Check for missing utilities
- Verify custom colors and fonts work

3. **Visual Regression Testing**:
- Compare UI before and after migration
- Check responsive designs
- Verify dark mode if implemented
- Test hover states and interactions

4. **Build Production**:
```bash
npm run build
```

5. **Check Bundle Size**:
- v4 should produce smaller CSS bundles
- Verify unused CSS is properly removed

### Step 10: Optimize for v4

Take advantage of new v4 features:

1. **Use New Color System**:
```css
/* Use OKLCH colors for better vibrancy */
@theme {
  --color-burgundy: oklch(40% 0.15 350);
  --color-azure: oklch(60% 0.2 210);
}
```

2. **Container Queries**:
```html
<div class="@container">
  <div class="@lg:text-2xl">Container query responsive text</div>
</div>
```

3. **Logical Properties**:
```html
<div class="ps-4 me-8">Start padding, end margin</div>
```

4. **3D Transforms**:
```html
<div class="rotate-x-45 rotate-y-45">3D rotation</div>
```

## Troubleshooting

### Common Issues and Solutions

1. **Build Errors**:
   - Ensure Node.js 20+ is installed
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

2. **Missing Utilities**:
   - Check the upgrade tool output for renamed utilities
   - Refer to the [official migration guide](https://tailwindcss.com/docs/upgrade-guide)

3. **Custom Colors Not Working**:
   - Ensure proper CSS variable syntax in v4
   - Use the `@theme` directive for custom values

4. **PostCSS Conflicts**:
   - Remove old PostCSS config
   - Use Vite plugin instead of PostCSS plugin

5. **Performance Issues**:
   - Ensure content detection is working properly
   - Check that unused CSS is being removed

## Rollback Plan

If issues arise, you can rollback:

```bash
# Discard all changes
git checkout main
git branch -D migrate-to-tailwind-v4

# Or revert to v3
npm install tailwindcss@^3.4.14 autoprefixer postcss
# Restore original configuration files
```

## Benefits After Migration

- **Performance**: Up to 8x faster incremental builds
- **Smaller Bundles**: Better tree-shaking and CSS optimization
- **Modern CSS**: Access to latest CSS features
- **Simplified Config**: CSS-based configuration option
- **Better DX**: Improved error messages and debugging

## Additional Resources

- [Official Tailwind CSS v4 Announcement](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Vite Plugin Documentation](https://tailwindcss.com/docs/installation/vite)

## Checklist

- [ ] Backup project/create new branch
- [ ] Run automated upgrade tool
- [ ] Update dependencies
- [ ] Configure Vite plugin
- [ ] Update CSS imports
- [ ] Migrate configuration
- [ ] Remove PostCSS config
- [ ] Test development build
- [ ] Check visual regression
- [ ] Test production build
- [ ] Verify bundle size improvement
- [ ] Update CI/CD if needed
- [ ] Document any custom migration steps
- [ ] Merge to main branch

## Notes for This Project

Based on the analysis of your codebase:

1. **Minimal Custom Configuration**: Your project has a relatively simple Tailwind setup, which should make migration straightforward.

2. **Custom Theme Values**: Pay special attention to:
   - Custom colors (burgundy, azure, creme, gray variations)
   - Custom fonts (Source Sans 3, Abhaya Libre)
   - These should work fine with the migration but verify visually

3. **No Custom Plugins**: You don't have any Tailwind plugins, simplifying the migration.

4. **Vite Setup**: Already using Vite makes adopting the new Vite plugin seamless.

5. **Content Paths**: Your content configuration is standard and should work without changes.

## Estimated Timeline

- **Automated Migration**: 5-10 minutes
- **Manual Review and Testing**: 30-60 minutes
- **Visual QA**: 30-60 minutes
- **Total Estimated Time**: 1-2 hours

## Post-Migration Recommendations

1. Consider adopting CSS-based configuration gradually
2. Explore new v4 features like container queries
3. Monitor build performance improvements
4. Update team documentation about the new setup
5. Consider using OKLCH colors for better color representation