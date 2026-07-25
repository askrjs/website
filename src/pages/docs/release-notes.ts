export const releaseNotes = [
  {
    version: '0.0.x current line',
    date: '2026',
    summary:
      'The current line focuses on explicit route registries, SSR/SSG delivery, typed package boundaries, and CLI workflows that keep generated artifacts reviewable.',
  },
  {
    version: 'Before upgrading',
    date: 'Every release',
    summary:
      'Run askr outdated first, review the proposed package set, then use askr update for range-safe changes or askr upgrade when you are deliberately accepting breaking 0.x movement.',
  },
] as const;
