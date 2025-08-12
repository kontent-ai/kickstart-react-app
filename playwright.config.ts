import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  
  // Run tests in parallel
  fullyParallel: false,
  
  // Retry on failure
  retries: 1,
  
  // Reporter to use
  reporter: 'line',
  
  use: {
    // Base URL for the application
    baseURL: 'http://localhost:3001',
    
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
    port: 3001,
    reuseExistingServer: true,
  },
});