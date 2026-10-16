import { expect, test } from '@playwright/test';
import { legacyRedirects } from '../../src/pages/marketing/redirects';

test('the landing page leads straight into docs', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Get started', exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/docs\/getting-started$/);
  await expect(
    page.getByRole('navigation', {
      name: 'Documentation sections',
      exact: true,
    })
  ).toBeVisible();
});

for (const [path, destination] of Object.entries(legacyRedirects)) {
  test(`${path} forwards to ${destination} and preserves the URL suffix`, async ({
    page,
  }) => {
    await page.goto(`${path}?source=legacy#details`);
    await expect(page).toHaveURL(
      new RegExp(`${destination}\\?source=legacy#details$`)
    );
    await expect(page.locator('.site-shell')).toHaveAttribute(
      'data-layout',
      'docs'
    );
  });
}
