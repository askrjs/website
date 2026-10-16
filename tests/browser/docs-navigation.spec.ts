import { expect, test } from '@playwright/test';

test('docs sections scope the sidebar and preserve deep-link context', async ({
  page,
}) => {
  await page.goto('/docs/getting-started');
  const sections = page.getByRole('navigation', {
    name: 'Documentation sections',
    exact: true,
  });
  const sidebar = page.getByRole('navigation', {
    name: 'Documentation navigation',
    exact: true,
  });
  await expect(
    sections.getByRole('link', { name: 'Getting Started', exact: true })
  ).toHaveAttribute('aria-current', 'true');
  await expect(
    sidebar.getByRole('link', { name: 'Installation', exact: true })
  ).toBeVisible();
  await expect(
    sidebar.getByRole('link', { name: 'Core Concepts', exact: true })
  ).toHaveCount(0);

  await sections
    .getByRole('link', { name: 'UI & Components', exact: true })
    .click();
  await expect(page).toHaveURL(/\/docs\/components$/);
  await expect(
    sidebar.getByRole('link', { name: 'Installation', exact: true })
  ).toHaveCount(0);
  await sidebar
    .locator('summary')
    .filter({ hasText: /^Overlays$/ })
    .click();
  await sidebar.getByRole('link', { name: 'Dialog', exact: true }).click();
  await expect(page).toHaveURL(/\/docs\/components\/dialog$/);
  await page.reload();
  await expect(
    sections.getByRole('link', { name: 'UI & Components', exact: true })
  ).toHaveAttribute('aria-current', 'true');
  await expect(
    sidebar.getByRole('link', { name: 'Dialog', exact: true })
  ).toBeVisible();
  await expect(
    sidebar.getByRole('link', { name: 'Dialog', exact: true })
  ).toHaveAttribute('aria-current', 'page');
});

test('marketing and docs share the header and outer content width', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto('/');
  const header = page.locator('.site-header');
  await expect(
    header.getByRole('button', { name: 'Search docs', exact: true })
  ).toBeVisible();
  const text = await header.innerText();
  const width = await header
    .locator('[data-slot="container"]')
    .evaluate((element) => element.getBoundingClientRect().width);
  const alignment = await header
    .locator('[data-slot="container"]')
    .evaluate((element) => ({
      left: element.getBoundingClientRect().left,
      width: element.getBoundingClientRect().width,
      padding: getComputedStyle(element).paddingInline,
    }));
  const marketing = await page
    .locator('.hero__content')
    .evaluate((element) => ({
      left: element.getBoundingClientRect().left,
      width: element.getBoundingClientRect().width,
      padding: getComputedStyle(element).paddingInline,
    }));
  expect(marketing).toEqual(alignment);
  await page.goto('/docs/getting-started');
  await expect(header).toHaveText(text, { useInnerText: true });
  for (const selector of ['.docs-section-nav__inner', '.docs-channel']) {
    const docs = await page.locator(selector).evaluate((element) => ({
      left: element.getBoundingClientRect().left,
      width: element.getBoundingClientRect().width,
      padding: getComputedStyle(element).paddingInline,
    }));
    expect(docs).toEqual(alignment);
  }
  await expect(header.locator('[data-slot="container"]')).toHaveJSProperty(
    'clientWidth',
    width
  );
});

test('mobile docs use the current section in the navigation sheet', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs/getting-started/first-application');
  const sections = page.getByRole('navigation', {
    name: 'Documentation sections',
    exact: true,
  });
  await expect(
    sections.getByRole('link', { name: 'Getting Started', exact: true })
  ).toHaveAttribute('aria-current', 'true');
  await page
    .getByRole('button', { name: 'Open documentation navigation' })
    .click();
  const dialog = page.getByRole('dialog');
  await expect(
    dialog.getByRole('link', { name: 'First Application', exact: true })
  ).toHaveAttribute('aria-current', 'page');
  await expect(
    dialog.getByRole('link', { name: 'Core Concepts', exact: true })
  ).toHaveCount(0);
  await dialog.getByRole('link', { name: 'Installation', exact: true }).click();
  await expect(page).toHaveURL(/\/docs\/getting-started\/installation$/);
  await expect(dialog).not.toBeVisible();
  await sections.getByRole('link', { name: 'Reference', exact: true }).click();
  await expect(page).toHaveURL(/\/docs\/reference$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth
    )
  ).toBe(true);
});

test('docs prose renders inline code and the props outline reaches its section', async ({
  page,
}) => {
  await page.goto('/docs/getting-started');
  await expect(
    page.locator('section[aria-labelledby="the-shortest-path"] code').first()
  ).toHaveText('npx @askrjs/cli@latest create startkit my-app');
  await expect(
    page
      .locator('.docs-article')
      .getByRole('link', { name: 'First Application', exact: true })
  ).toHaveAttribute('href', '/docs/getting-started/first-application');
  await page.goto('/docs/components/dialog');
  await page
    .getByRole('complementary', { name: 'On this page' })
    .getByRole('link', { name: 'Published props', exact: true })
    .click();
  const heading = page.locator('#published-props');
  await expect(heading).toBeInViewport();
  const top = await heading.evaluate(
    (element) => element.getBoundingClientRect().top
  );
  const navBottom = await page
    .locator('.docs-section-nav')
    .evaluate((element) => element.getBoundingClientRect().bottom);
  expect(top).toBeGreaterThanOrEqual(navBottom);
});
