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