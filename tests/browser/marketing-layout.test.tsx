import { page, userEvent } from '@vitest/browser/context';
import { cleanupApp, createSPA } from '@askrjs/askr/boot';
import { createRouteRegistry } from '@askrjs/askr/router';
import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test';
import {
  marketingRouteMetadata,
  registerMarketingRoutes,
} from '../../src/pages/marketing/_routes';
import '../../src/styles.css';

const registry = createRouteRegistry(() => registerMarketingRoutes());
const routes = Object.keys(marketingRouteMetadata);
const editorialRoutes = routes.filter(
  (route) => route !== '/' && route !== '/404'
);
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 1000 },
] as const;
const themes = ['light', 'dark'] as const;

async function settle(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

function requiredElement<T extends HTMLElement>(
  root: ParentNode,
  selector: string
): T {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Missing expected element: ${selector}`);
  return element;
}

function expectVerticalChildren(element: HTMLElement): void {
  expect(getComputedStyle(element).display).toBe('flex');
  expect(getComputedStyle(element).flexDirection).toBe('column');

  const children = Array.from(element.children, (child) =>
    child.getBoundingClientRect()
  );
  for (let index = 1; index < children.length; index += 1) {
    expect(children[index]!.top).toBeGreaterThanOrEqual(
      children[index - 1]!.bottom - 1
    );
  }
}

describe('marketing page layout', () => {
  let container: HTMLDivElement | undefined;

  beforeEach(() => {
    localStorage.removeItem('askr-theme');
    document.documentElement.removeAttribute('data-theme');
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(async () => {
    if (container) {
      cleanupApp(container);
      container.remove();
      container = undefined;
    }
    localStorage.removeItem('askr-theme');
    document.documentElement.removeAttribute('data-theme');
    await page.viewport(1280, 900);
  });

  for (const viewport of viewports) {
    for (const theme of themes) {
      for (const route of routes) {
        it(`keeps ${route} intact at ${viewport.name} width in ${theme} mode`, async () => {
          await page.viewport(viewport.width, viewport.height);
          window.history.replaceState({}, '', route);
          await createSPA({ root: container!, registry });
          await settle();

          if (theme === 'dark') {
            const toggle = requiredElement<HTMLElement>(
              container!,
              '[data-theme-control="toggle"]'
            );
            await userEvent.click(toggle);
            await settle();
          }

          expect(document.documentElement.dataset.theme).toBe(theme);

          const shell = requiredElement<HTMLElement>(container!, '.site-shell');
          expect(shell.scrollWidth).toBeLessThanOrEqual(shell.clientWidth + 1);

          expect(
            getComputedStyle(
              requiredElement<HTMLElement>(
                shell,
                'header.site-header > [data-slot="container"]'
              )
            ).flexDirection
          ).toBe('column');

          const footerContainer = requiredElement<HTMLElement>(
            shell,
            'footer.site-footer > [data-slot="container"]'
          );
          expectVerticalChildren(footerContainer);

          const footerColumns = requiredElement<HTMLElement>(
            footerContainer,
            '.marketing-footer__columns'
          );
          const footerColumnCount =
            getComputedStyle(footerColumns).gridTemplateColumns.split(
              ' '
            ).length;
          expect(footerColumnCount).toBe(viewport.name === 'mobile' ? 1 : 3);

          if (route === '/') {
            const differentiation = requiredElement<HTMLElement>(
              shell,
              '.differentiation__inner'
            );
            expectVerticalChildren(differentiation);

            const body = requiredElement<HTMLElement>(
              differentiation,
              '.differentiation__body'
            );
            const bodyColumnCount =
              getComputedStyle(body).gridTemplateColumns.split(' ').length;
            expect(bodyColumnCount).toBe(viewport.name === 'mobile' ? 1 : 2);
          } else if (route === '/404') {
            expectVerticalChildren(
              requiredElement<HTMLElement>(shell, '.not-found__inner')
            );
          } else {
            expect(editorialRoutes).toContain(route);
            expectVerticalChildren(
              requiredElement<HTMLElement>(
                shell,
                '.editorial-hero > [data-slot="container"]'
              )
            );
          }
        });
      }
    }
  }
});
