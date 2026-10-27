// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Directory where Playwright searches for test files
  testDir: './tests',

  // Maximum time (in milliseconds) a single test can run before timing out
  timeout: 60000,

  // Default timeout for Playwright assertions (e.g., expect(locator).toBeVisible())
  expect: {
    timeout: 10000,
  },

  // Generates interactive HTML and Allure reports after test execution
  reporter: [
    ['html'],
    ['allure-playwright']
  ],

  // Shared settings applied to all tests and browser contexts
  use: {
    // Defines Chromium as the primary execution engine
    browserName: 'chromium',

    // Runs browser in headed mode for visual debugging
    headless: false,

    // Sets a standard desktop browser User-Agent header
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',

    // Bypasses SSL certificate warnings during navigation
    ignoreHTTPSErrors: true,

    // Maximum wait time for actionability checks (clicks, fills, types)
    actionTimeout: 15000,

    // Maximum wait time for page load and navigation events
    navigationTimeout: 30000,

    // Artifact collection settings
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',

    // Custom browser startup flags
    launchOptions: {
      args: [
        '--start-maximized',
        '--disable-blink-features=AutomationControlled',
      ],
    },

    // Set to null to allow the browser window to use full maximized dimensions
    viewport: null,
  },
});