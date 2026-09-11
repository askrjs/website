import { defineConfig, devices } from '@playwright/test';

const PORT = 4179;
const HOST = '127.0.0.1';

export default defineConfig({
  testDir: './tests/browser',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: `http://${HOST}:${PORT}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npx vp dev --host ${HOST} --port ${PORT} --strictPort`,
    url: `http://${HOST}:${PORT}`,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 120_000,
  },
  timeout: 30_000,
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
