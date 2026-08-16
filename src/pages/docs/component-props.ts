import { apiManifest } from './api-manifest';
import {
  apiSymbolSets,
  type ApiMemberDefinition,
  type ApiSymbolDefinition,
} from './api-snapshot';
import type { DocsPageDefinition } from './types';

export interface ComponentPropReference extends ApiSymbolDefinition {
  readonly importName: string;
  readonly members: readonly ApiMemberDefinition[];
}

function propSymbolsFor(importName: string): readonly ComponentPropReference[] {
  const entrypoint = apiManifest.find(
    (candidate) => candidate.importName === importName
  );
  if (!entrypoint) return [];
  return (apiSymbolSets[entrypoint.symbolSet] ?? []).flatMap((symbol) =>
    symbol.name.endsWith('Props') && symbol.members?.length
      ? [{ ...symbol, importName, members: symbol.members }]
      : []
  );
}

/**
 * Resolve component prop contracts from the declarations captured from the
 * installed package. Explicit page selections retain their authored order.
 */
export function componentPropReferences(
  page: DocsPageDefinition
): readonly ComponentPropReference[] {
  const available = page.packages.flatMap((item) =>
    item.importPath &&
    (page.propTypes?.length || item.importPath.split('/').length > 2)
      ? propSymbolsFor(item.importPath)
      : []
  );
  const byName = new Map(available.map((symbol) => [symbol.name, symbol]));

  // ContainerProps is an Omit<BlockDivProps, ...> composition. The compiler's
  // mapped type exposes its local `size` member separately, so present the
  // inherited public layout surface alongside it.
  const container = byName.get('ContainerProps');
  const block = byName.get('BlockOwnProps');
  if (container && block) {
    const members = new Map(
      [...block.members, ...container.members].map((member) => [
        member.name,
        member,
      ])
    );
    members.delete('maxWidth');
    byName.set('ContainerProps', {
      ...container,
      members: [...members.values()].sort((left, right) =>
        left.name.localeCompare(right.name)
      ),
    });
  }

  const text = byName.get('TextProps');
  if (text) {
    byName.set('TextProps', {
      ...text,
      members: text.members.map((member) =>
        member.name === 'as'
          ? {
              ...member,
              signature: member.signature.replace('TElement', 'TextElement'),
            }
          : member
      ),
    });
  }

  const selected = page.propTypes ?? [];
  if (selected.length > 0) {
    return selected.flatMap((name) => {
      const symbol = byName.get(name);
      return symbol ? [symbol] : [];
    });
  }
  return [...byName.values()];
}
