import { apiManifest } from './api-manifest';
import { apiSymbolSets } from './api-snapshot';
import { docsSearchRecords } from './catalog';
import type { DocsSearchRecord } from './types';

export const completeSearchIndex: readonly DocsSearchRecord[] = [
  ...docsSearchRecords,
  ...apiManifest.flatMap((entrypoint) => {
    const route =
      `/docs/reference/api/${entrypoint.packageName.slice('@askrjs/'.length)}/${entrypoint.slug}` as `/docs${string}`;
    return apiSymbolSets[entrypoint.symbolSet].map((symbol) => ({
      route,
      anchor: symbol.anchor,
      title: symbol.name,
      description: entrypoint.importName,
      group: 'API',
      terms: [symbol.signature, entrypoint.packageName, entrypoint.importName],
    }));
  }),
];

export function searchDocs(query: string, limit = 24) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return completeSearchIndex
    .map((record) => {
      const title = record.title.toLowerCase();
      const haystack = [
        record.title,
        record.description,
        record.group,
        ...record.terms,
      ]
        .join(' ')
        .toLowerCase();
      if (!terms.every((term) => haystack.includes(term))) return undefined;
      const score = terms.reduce(
        (total, term) =>
          total +
          (title === term
            ? 12
            : title.startsWith(term)
              ? 8
              : title.includes(term)
                ? 4
                : 1),
        0
      );
      return { record, score };
    })
    .filter((value): value is { record: DocsSearchRecord; score: number } =>
      Boolean(value)
    )
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.record.title.localeCompare(right.record.title)
    )
    .slice(0, limit)
    .map(({ record }) => record);
}
