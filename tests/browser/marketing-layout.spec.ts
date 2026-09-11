import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { marketingRouteMetadata } from '../../src/pages/marketing/_routes';

const routes = Object.keys(marketingRouteMetadata);
const editorialRoutes = routes.filter(
  (route) => route !== '/' && route !== '/404'
);
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 1000 },
] as const;
const themes = ['light', 'dark'] as const;

async function expectVerticalChildren(locator: Locator): Promise<void> {
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('flex-direction', 'column');

  const rects = await locator.evaluate((element) =>
    Array.from(element.children, (child) =>
      child.getBoundingClientRect().toJSON()
    )
  );
  for (let index = 1; index < rects.length; index += 1) {
    expect(rects[index]!.top).toBeGreaterThanOrEqual(
      rects[index - 1]!.bottom - 1
    );
  }
}

async function gridColumnCount(locator: Locator): Promise<number> {
  return locator.evaluate(
    (element) => getComputedStyle(element).gridTemplateColumns.split(' ').length
  );
}

async function requiredLocator(page: Page, selector: string): Promise<Locator> {
  const locator = page.locator(selector);
  await expect(locator).toHaveCount(1);
  return locator;
}

test.describe('marketing page layout', () => {
  for (const viewport of viewports) {
    for (const theme of themes) {
      for (const route of routes) {
        test(`keeps ${route} intact at ${viewport.name} width in ${theme} mode`, async ({
          page,
        }) => {
          await page.setViewportSize({
            width: viewport.width,
            height: viewport.height,
          });
          await page.addInitScript(() => {
            window.localStorage.removeItem('askr-theme');
          });
          await page.goto(route);

          if (theme === 'dark') {
            const toggle = await requiredLocator(
              page,
              '[data-theme-control="toggle"]'
            );
            await toggle.click();
          }

          await expect(page.locator('html')).toHaveAttribute(
            'data-theme',
            theme
          );

          const shell = await requiredLocator(page, '.site-shell');
          const overflow = await shell.evaluate((element) => ({
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
          }));
          expect(overflow.scrollWidth).toBeLessThanOrEqual(
            overflow.clientWidth + 1
          );

          const headerContainer = await requiredLocator(
            page,
            'header.site-header > [data-slot="container"]'
          );
          await expect(headerContainer).toHaveCSS('flex-direction', 'column');

          const footerContainer = await requiredLocator(
            page,
            'footer.site-footer > [data-slot="container"]'
          );
          await expectVerticalChildren(footerContainer);

          const footerColumns = await requiredLocator(
            page,
            '.marketing-footer__columns'
          );
          const footerColumnCount = await gridColumnCount(footerColumns);
          expect(footerColumnCount).toBe(viewport.name === 'mobile' ? 1 : 3);

          if (route === '/') {
            const differentiation = await requiredLocator(
              page,
              '.differentiation__inner'
            );
            await expectVerticalChildren(differentiation);

            const body = await requiredLocator(page, '.differentiation__body');
            const bodyColumnCount = await gridColumnCount(body);
            expect(bodyColumnCount).toBe(viewport.name === 'mobile' ? 1 : 2);
          } else if (route === '/404') {
            await expectVerticalChildren(
              await requiredLocator(page, '.not-found__inner')
            );
          } else {
            expect(editorialRoutes).toContain(route);
            await expectVerticalChildren(
              await requiredLocator(
                page,
                '.editorial-hero > [data-slot="container"]'
              )
            );
          }
        });
      }
    }
  }
});
