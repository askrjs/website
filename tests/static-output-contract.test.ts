import { describe, expect, it } from 'vitest';
import { generatedStyleRegistryErrors } from '../scripts/generated-style-contract';

describe('static output style contracts', () => {
  it('should require a nonempty registry given a route without generated classes', () => {
    expect(
      generatedStyleRegistryErrors('<main>Static route</main>', '/plain')
    ).toEqual([
      '/plain must contain exactly one initial generated-style registry',
    ]);
  });
});
