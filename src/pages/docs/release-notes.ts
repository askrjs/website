export const upgradeGuidance = [
  {
    title: 'Use the published version table',
    when: 'Before changing dependencies',
    summary:
      'The version table above is generated from the installed package manifests. Treat those versions as the exact package set used to build and validate this documentation.',
  },
  {
    title: 'Review and validate the proposed set',
    when: 'For every update',
    summary:
      'Run askr outdated first, use askr update for range-safe changes, and reserve askr upgrade for deliberately accepting breaking 0.x movement. Install, test, and build before committing the result.',
  },
] as const;
