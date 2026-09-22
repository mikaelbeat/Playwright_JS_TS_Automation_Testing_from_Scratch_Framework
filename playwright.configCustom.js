
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  // In case of failure, test is tried one more time.
  retries:1,


  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    actionTimeout: 10_000,
    navigationTimeout: 10_000,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },


  projects: [
    {
      name: 'chromium',
      // Automatically advances in situation where browser warns that
      // connection is not secure. User needs to click Advanced .....
      ignoreHttpsErrors:true,
      // Automatically allows when browser asks would user allow site to
      // know your location.
      permissions:['geolocation'],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'safari',
      use: { ...devices['Desktop Safari'] },
    },

  ],

});

