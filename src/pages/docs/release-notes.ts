export const upgradeGuidance = [
  {
    title: 'Start from the installed package set',
    when: 'Before changing dependencies',
    summary:
      'This documentation is checked against the package set installed by its lockfile. Compare the relevant API pages with your application before changing dependencies.',
  },
  {
    title: 'Review and validate the proposed set',
    when: 'For every update',
    summary:
      'Run askr outdated first, use askr update for range-safe changes, and reserve askr upgrade for deliberately accepting breaking 0.x movement. Install, test, and build before committing the result.',
  },
] as const;
