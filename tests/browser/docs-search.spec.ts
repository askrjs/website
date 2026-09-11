import { expect, test } from '@playwright/test';
import { searchDocs } from '../../src/pages/docs/search-index';

const query = 'createSPA';
const destination = searchDocs(query, 1)[0];

if (!destination) {
  throw new Error(`Expected a documentation search result for ${query}`);
}

test.describe('documentation command-palette search', () => {
  test('moves a real keyboard highlight from the input and navigates on Enter', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('.docs-search__trigger').click();

    const input = page.locator('[data-docs-search-input]');
    await expect(input).toBeFocused();
    await input.fill(query);

    const results = page.locator('[data-slot="command-item"]');
    await expect(results.first()).toBeVisible();

    const firstResultId = await results.first().getAttribute('id');
    const lastResultId = await results.last().getAttribute('id');

    await expect(input).not.toHaveAttribute('aria-activedescendant');

    await page.keyboard.press('ArrowDown');
    await expect(input).toBeFocused();
    await expect(input).toHaveAttribute(
      'aria-activedescendant',
      firstResultId ?? ''
    );
    await expect(results.first()).toHaveAttribute('data-active', 'true');

    await page.keyboard.press('ArrowUp');
    await expect(input).toHaveAttribute(
      'aria-activedescendant',
      lastResultId ?? ''
    );
    await expect(results.last()).toHaveAttribute('data-active', 'true');

    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveAttribute(
      'aria-activedescendant',
      firstResultId ?? ''
    );

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`${destination.route}(#.*)?$`));
  });
});
