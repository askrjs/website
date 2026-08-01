import { describe, expect, it } from 'vitest';

function generatedStyleRegistryErrors(html: string, route: string): string[] {
  const generatedStyleClasses = new Set(
    [...html.matchAll(/\b(ak-style-[a-z0-9]+)\b/g)].map((match) => match[1]!)
  );
  const styleRegistries = [
    ...html.matchAll(
      /<style\b[^>]*\bdata-askr-style-registry(?:="true")?[^>]*>([\s\S]*?)<\/style>/gi
    ),
  ];
  if (styleRegistries.length !== 1) {
    return [
      `${route} must contain exactly one initial generated-style registry`,
    ];
  }
  const registeredCss = styleRegistries[0]?.[1] ?? '';
  if (registeredCss.trim().length === 0) {
    return [`${route} generated-style registry must not be empty`];
  }
  return [...generatedStyleClasses]
    .filter((className) => !registeredCss.includes(`.${className}{`))
    .map(
      (className) => `${route} is missing the initial rule for .${className}`
    );
}

describe('static output style contracts', () => {
  it('should require a nonempty registry given a route without generated classes', () => {
    expect(
      generatedStyleRegistryErrors('<main>Static route</main>', '/plain')
    ).toEqual([
      '/plain must contain exactly one initial generated-style registry',
    ]);
  });
});
