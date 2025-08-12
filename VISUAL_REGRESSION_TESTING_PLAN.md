# Visual Regression Testing Plan for Kickstart React App

## Executive Summary

This document outlines a simple, focused plan for implementing visual regression testing for the Kickstart React application using Playwright. The goal is to create a straightforward full-page screenshot test for desktop using Chromium browser.

## Current Application Overview

### Technology Stack
- **Frontend Framework**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS v4.1.11
- **Build Tool**: Vite
- **CMS**: Kontent.ai Delivery SDK
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v7

### Application Structure
- Single landing page (`/` and `/:envId` routes)
- Dynamic content fetched from Kontent.ai CMS
- Components: HeroImage, Solution list, Featured content, Page content

### Testing Environment
- Tests will run on local development machine
- Playwright and Chromium browser will be installed locally
- No devcontainer required for this setup

## Simple Visual Regression Testing Setup

### 1. Directory Structure

```
kickstart-react-app/
├── tests/
│   └── visual/
│       ├── landing-page.spec.ts    # Main test file
│       └── landing-page-desktop.png # Baseline screenshot
├── playwright.config.ts             # Playwright configuration
└── package.json                     # Test scripts
```

### 2. Playwright Configuration

**playwright.config.ts**
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  
  // Run tests in parallel
  fullyParallel: false,
  
  // Retry on failure
  retries: 1,
  
  // Reporter to use
  reporter: 'html',
  
  use: {
    // Base URL for the application
    baseURL: 'http://localhost:5173',
    
    // Chromium only
    browserName: 'chromium',
    
    // Desktop viewport
    viewport: { width: 1920, height: 1080 },
    
    // Capture screenshot on failure
    screenshot: 'only-on-failure',
  },
  
  // Run dev server before tests
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
});
```

### 3. Single Visual Test Implementation

**tests/visual/landing-page.spec.ts**
```typescript
import { test, expect } from '@playwright/test';

test('Landing page full screenshot - Desktop Chromium', async ({ page }) => {
  // Navigate to the landing page
  await page.goto('/');
  
  // Wait for the main content to load
  // Wait for hero image to be visible
  await page.waitForSelector('img', { state: 'visible' });
  
  // Wait for network to be idle (no requests for 500ms)
  await page.waitForLoadState('networkidle');
  
  // Additional wait to ensure all content is rendered
  await page.waitForTimeout(2000);
  
  // Disable animations and transitions for consistent screenshots
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `
  });
  
  // Take full page screenshot and compare with baseline
  await expect(page).toHaveScreenshot('landing-page-desktop.png', {
    fullPage: true,
    maxDiffPixels: 100,
    threshold: 0.2,
  });
});
```

### 4. Test Execution Scripts

Add to **package.json**:
```json
{
  "scripts": {
    "test:visual": "playwright test",
    "test:visual:update": "playwright test --update-snapshots",
    "test:visual:report": "playwright show-report"
  }
}
```

### 5. Running the Tests

#### Initial Setup (First Time - Local Machine)

1. **Install Playwright Test Package**:
   ```bash
   npm install --save-dev @playwright/test
   ```

2. **Install Chromium Browser**:
   ```bash
   npx playwright install chromium
   ```
   This will download and install Chromium browser locally (approximately 150MB).

3. **Install System Dependencies** (if needed):
   ```bash
   npx playwright install-deps chromium
   ```
   This installs any missing system dependencies required by Chromium. On macOS, this is usually not needed. On Linux, it may install libraries like libgtk, libnotify, etc.

4. **Create baseline screenshot**:
   ```bash
   npm run test:visual:update
   ```
   This will create the initial baseline screenshot at `tests/visual/landing-page-desktop.png`

#### Regular Test Execution
```bash
# Run visual regression test
npm run test:visual

# View HTML report after test run
npm run test:visual:report
```

#### Updating Baseline
When the UI intentionally changes:
```bash
npm run test:visual:update
```

### 6. Handling Dynamic Content

Since the app fetches content from Kontent.ai CMS, consider these strategies:

#### Option A: Test Against Fixed Environment
Use a specific test environment ID with stable content:
```typescript
test('Landing page screenshot', async ({ page }) => {
  // Use a test environment with stable content
  await page.goto('/test-environment-id');
  // ... rest of the test
});
```

#### Option B: Mock API Responses
```typescript
test('Landing page screenshot', async ({ page }) => {
  // Mock Kontent.ai API responses for consistent content
  await page.route('**/api.kontent.ai/**', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockData), // Use fixed mock data
    });
  });
  
  await page.goto('/');
  // ... rest of the test
});
```

### 7. Screenshot Comparison Settings

The test uses these comparison settings:
- **fullPage**: `true` - Captures the entire scrollable page
- **maxDiffPixels**: `100` - Allows up to 100 pixels difference
- **threshold**: `0.2` - 20% color difference threshold per pixel

Adjust these values based on your tolerance for visual differences.

### 8. Expected Workflow

1. **Developer makes UI changes**
2. **Run visual test**: `npm run test:visual`
3. **If test fails**: 
   - Review the HTML report to see differences
   - If changes are intentional, update baseline: `npm run test:visual:update`
   - If changes are unintentional, fix the regression
4. **Commit baseline changes** along with code changes

### 9. Troubleshooting Common Issues

#### Test Fails Due to Dynamic Content
**Problem**: Content from CMS changes between test runs
**Solution**: Use mock data or a stable test environment

#### Font Rendering Differences
**Problem**: Fonts render slightly differently
**Solution**: Increase threshold value or maxDiffPixels

#### Loading Issues
**Problem**: Content not fully loaded when screenshot is taken
**Solution**: Add more explicit waits or increase timeout

#### Screenshot File Size
**Problem**: Large screenshot files in git
**Solution**: Consider using Git LFS for storing baseline images

### 10. Simple Implementation Checklist

#### Local Setup Prerequisites
- [ ] Ensure Node.js is installed (v18 or higher)
- [ ] Ensure npm is available

#### Implementation Steps
- [ ] Install Playwright: `npm install --save-dev @playwright/test`
- [ ] Install Chromium browser: `npx playwright install chromium`
- [ ] Install system dependencies (if on Linux): `npx playwright install-deps chromium`
- [ ] Create `tests/visual/` directory
- [ ] Create `playwright.config.ts` with simple configuration
- [ ] Write `landing-page.spec.ts` test file
- [ ] Add test scripts to `package.json`
- [ ] Run `npm run test:visual:update` to create baseline
- [ ] Verify test passes with `npm run test:visual`
- [ ] Commit baseline screenshot to repository
- [ ] Document the process for the team

## Conclusion

This simplified plan focuses on implementing a single, reliable visual regression test for the landing page using Playwright with Chromium on desktop. The tests run directly on your local development machine without requiring Docker or devcontainer setup.

The approach prioritizes simplicity and ease of maintenance while providing value in catching unintended visual changes. The test can be run locally by developers before committing changes, ensuring visual consistency without the complexity of multiple browsers, viewports, or CI/CD pipelines. This foundation can be expanded in the future as needs grow.