export const askrBenchmarkSnapshot = {
  frameworkVersion: '0.0.64-local',
  browser: 'Chrome headless, no throttling',
  runs: 3,
  measuredAt: '2026-07-25',
  rows: [
    ['Create 1,000 rows', 24.6, 37.1],
    ['Replace 1,000 rows', 28.7, 15.1],
    ['Update every 10th row', 3.4, 3.2],
    ['Select a row', 2.2, 1.9],
    ['Swap rows', 3.7, 5.0],
    ['Remove one row', 5.4, 29.8],
    ['Create 10,000 rows', 270.4, 395.3],
    ['Append 1,000 rows', 29.2, 45.0],
    ['Clear 1,000 rows', 6.0, 6.7],
  ] as const,
} as const;
