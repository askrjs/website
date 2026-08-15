import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';
import { beforeAll, describe, expect, it } from 'vitest';
import { apiManifest } from '../src/pages/docs/api-manifest';
import { apiSymbolSets } from '../src/pages/docs/api-snapshot';
import { cliSnapshot } from '../src/pages/docs/cli-snapshot';
import { packagePeers } from '../src/pages/docs/package-peers';

interface PackageLock {
  readonly packages: Record<string, unknown>;
}

interface PackageManifest {
  readonly version: string;
  readonly exports?: Record<string, unknown>;
  readonly peerDependencies?: Record<string, string>;
}

interface Entrypoint {
  readonly packageName: string;
  readonly version: string;
  readonly subpath: string;
  readonly importName: string;
  readonly declarationPath: string;
}

interface MutableContract {
  apiManifest: Array<{
    packageName: string;
    version: string;
    subpath: string;
    importName: string;
    slug: string;
    symbolSet: string;
  }>;
  apiSymbolSets: Record<
    string,
    Array<{
      name: string;
      anchor: string;
      signature: string;
      typeOnly: boolean;
      summary?: string;
      remarks?: string;
      tags?: Record<string, string[]>;
      members?: Array<{
        name: string;
        summary: string;
        signature: string;
        tags?: Record<string, string[]>;
      }>;
    }>
  >;
  cli: {
    version: string;
    commands: string[];
    templates: string[];
    help: string;
    createHelp: string;
  };
  packagePeers: Record<string, string[]>;
}

const updatePackageSnapshot = process.env.UPDATE_PACKAGE_SNAPSHOT === '1';

const removedRouterSymbols = new Set([
  'registerRoutes',
  'getManifest',
  'getRoutes',
  'clearRoutes',
  'RegisterRoutesOptions',
]);

function exportedTypesTarget(value: unknown): string | undefined {
  if (typeof value === 'string' || !value || typeof value !== 'object') {
    return undefined;
  }
  if ('types' in value && typeof value.types === 'string') return value.types;
  for (const nested of Object.values(value)) {
    const target = exportedTypesTarget(nested);
    if (target) return target;
  }
}

function anchorFor(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function namedLines(source: string, heading: string): string[] {
  const section = source.split(`${heading}:`)[1]?.split('\n\n')[0] ?? '';
  return section
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(/\s{2,}/)[0]!);
}

function deriveInstalledContract(): MutableContract {
  const root = process.cwd();
  const packageLock = JSON.parse(
    readFileSync(resolve(root, 'package-lock.json'), 'utf8')
  ) as PackageLock;
  const installedPackageNames = Object.keys(packageLock.packages)
    .filter((path) => /^node_modules\/@askrjs\/[^/]+$/.test(path))
    .map((path) => path.slice('node_modules/'.length))
    .sort();
  const installedManifests = new Map(
    installedPackageNames.map((packageName) => [
      packageName,
      JSON.parse(
        readFileSync(
          resolve(root, 'node_modules', packageName, 'package.json'),
          'utf8'
        )
      ) as PackageManifest,
    ])
  );

  const entrypoints: Entrypoint[] = [];
  for (const packageName of installedPackageNames.filter(
    (name) => name !== '@askrjs/cli'
  )) {
    const manifest = installedManifests.get(packageName)!;
    const packageDirectory = resolve(root, 'node_modules', packageName);
    for (const [subpath, target] of Object.entries(manifest.exports ?? {})) {
      if (subpath.includes('*') || subpath === './package.json') continue;
      const typesTarget = exportedTypesTarget(target);
      if (!typesTarget) continue;
      const declarationPath = resolve(packageDirectory, typesTarget);
      if (!existsSync(declarationPath)) continue;
      entrypoints.push({
        packageName,
        version: manifest.version,
        subpath,
        importName:
          subpath === '.' ? packageName : `${packageName}/${subpath.slice(2)}`,
        declarationPath,
      });
    }
  }

  const program = ts.createProgram(
    entrypoints.map((entrypoint) => entrypoint.declarationPath),
    {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      skipLibCheck: true,
    }
  );
  const checker = program.getTypeChecker();
  const symbolSets: MutableContract['apiSymbolSets'] = {};
  const symbolSetNames = new Map<string, string>();

  function signatureFor(symbol: ts.Symbol): string {
    const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
    if (!declaration) return symbol.name;
    try {
      const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
      const rendered = checker.typeToString(
        type,
        declaration,
        ts.TypeFormatFlags.NoTruncation |
          ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope
      );
      return `${symbol.name}: ${rendered}`;
    } catch {
      return symbol.name;
    }
  }

  function documentationFor(symbol: ts.Symbol): {
    summary?: string;
    remarks?: string;
    tags?: Record<string, string[]>;
    members?: Array<{
      name: string;
      summary: string;
      signature: string;
      tags?: Record<string, string[]>;
    }>;
  } {
    const resolved =
      symbol.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(symbol)
        : symbol;
    const summary = ts
      .displayPartsToString(resolved.getDocumentationComment(checker))
      .trim();
    const tags: Record<string, string[]> = {};
    for (const tag of resolved.getJsDocTags(checker)) {
      const value =
        typeof tag.text === 'string'
          ? tag.text
          : ts.displayPartsToString([...(tag.text ?? [])]);
      (tags[tag.name] ??= []).push(value.trim());
    }
    const declaration = resolved.declarations?.[0];
    const memberDeclaration =
      declaration &&
      (ts.isInterfaceDeclaration(declaration) ||
        ts.isClassDeclaration(declaration) ||
        ts.isEnumDeclaration(declaration) ||
        ts.isTypeLiteralNode(declaration))
        ? declaration
        : undefined;
    const members = memberDeclaration
      ? memberDeclaration.members.flatMap((member) => {
          const memberName = member.name;
          if (!memberName || !ts.isIdentifier(memberName)) return [];
          const name = memberName.text;
          const memberSymbol = checker.getSymbolAtLocation(memberName);
          if (!memberSymbol) return [];
          const memberSummary = ts
            .displayPartsToString(memberSymbol.getDocumentationComment(checker))
            .trim();
          const memberTags: Record<string, string[]> = {};
          for (const tag of memberSymbol.getJsDocTags(checker)) {
            const value =
              typeof tag.text === 'string'
                ? tag.text
                : ts.displayPartsToString([...(tag.text ?? [])]);
            (memberTags[tag.name] ??= []).push(value.trim());
          }
          return [
            {
              name,
              summary: memberSummary,
              signature: member.getText(member.getSourceFile()),
              ...(Object.keys(memberTags).length ? { tags: memberTags } : {}),
            },
          ];
        })
      : undefined;
    return {
      ...(summary ? { summary } : {}),
      ...(tags.remarks?.length ? { remarks: tags.remarks.join('\n') } : {}),
      ...(Object.keys(tags).length ? { tags } : {}),
      ...(members?.length ? { members } : {}),
    };
  }

  const installedApiManifest = entrypoints.map((entrypoint) => {
    let symbolSet = symbolSetNames.get(entrypoint.declarationPath);
    if (!symbolSet) {
      const source = program.getSourceFile(entrypoint.declarationPath);
      const moduleSymbol = source && checker.getSymbolAtLocation(source);
      const usedAnchors = new Map<string, number>();
      const symbols = moduleSymbol
        ? checker
            .getExportsOfModule(moduleSymbol)
            .filter(
              (symbol) =>
                symbol.name !== 'default' &&
                !(
                  entrypoint.packageName === '@askrjs/askr' &&
                  entrypoint.subpath === './router' &&
                  removedRouterSymbols.has(symbol.name)
                )
            )
            .map((symbol) => {
              const baseAnchor = anchorFor(symbol.name) || 'export';
              const count = usedAnchors.get(baseAnchor) ?? 0;
              usedAnchors.set(baseAnchor, count + 1);
              const signature = signatureFor(symbol);
              const isRouterEntrypoint =
                entrypoint.packageName === '@askrjs/askr' &&
                entrypoint.subpath === './router';
              return {
                name: symbol.name,
                anchor: count === 0 ? baseAnchor : `${baseAnchor}-${count + 1}`,
                signature: isRouterEntrypoint
                  ? signature.replaceAll(
                      'RegisterRoutesOptions',
                      'RouteRegistryOptions'
                    )
                  : signature,
                typeOnly: !symbol.valueDeclaration,
                ...documentationFor(symbol),
              };
            })
            .sort((left, right) => left.name.localeCompare(right.name))
        : [];
      symbolSet = `symbols${symbolSetNames.size}`;
      symbolSetNames.set(entrypoint.declarationPath, symbolSet);
      symbolSets[symbolSet] = symbols;
    }

    return {
      packageName: entrypoint.packageName,
      version: entrypoint.version,
      subpath: entrypoint.subpath,
      importName: entrypoint.importName,
      slug:
        entrypoint.subpath === '.'
          ? 'root'
          : entrypoint.subpath.slice(2).replaceAll('/', '--'),
      symbolSet,
    };
  });

  const executable = resolve(root, 'node_modules/.bin/askr');
  const help = spawnSync(executable, ['--help'], { encoding: 'utf8' });
  const createHelp = spawnSync(executable, ['create', '--help'], {
    encoding: 'utf8',
  });
  if (help.status !== 0 || createHelp.status !== 0) {
    throw new Error(
      help.stderr || createHelp.stderr || 'Unable to read installed CLI help.'
    );
  }
  const cliManifest = installedManifests.get('@askrjs/cli')!;

  return {
    apiManifest: installedApiManifest,
    apiSymbolSets: symbolSets,
    cli: {
      version: cliManifest.version,
      commands: namedLines(help.stdout, 'Commands'),
      templates: (createHelp.stdout.match(/Templates:\n\s+([^\n]+)/)?.[1] ?? '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      help: help.stdout.trim(),
      createHelp: createHelp.stdout.trim(),
    },
    packagePeers: Object.fromEntries(
      [...installedManifests].map(([packageName, manifest]) => [
        packageName.slice('@askrjs/'.length),
        Object.keys(manifest.peerDependencies ?? {})
          .filter((peer) => peer.startsWith('@askrjs/'))
          .map((peer) => peer.slice('@askrjs/'.length))
          .sort(),
      ])
    ),
  };
}

function recordedContract(): MutableContract {
  return JSON.parse(
    JSON.stringify({
      apiManifest,
      apiSymbolSets,
      cli: cliSnapshot,
      packagePeers,
    })
  ) as MutableContract;
}

function writeRecordedContract(contract: MutableContract): void {
  const root = process.cwd();
  const outputs = [
    {
      path: resolve(root, 'src/pages/docs/api-manifest.ts'),
      source:
        '// Generated package API contract. Do not edit.\n' +
        'export interface ApiEntrypointDefinition {\n' +
        '  readonly packageName: string;\n' +
        '  readonly version: string;\n' +
        '  readonly subpath: string;\n' +
        '  readonly importName: string;\n' +
        '  readonly slug: string;\n' +
        '  readonly symbolSet: string;\n' +
        '}\n\n' +
        `export const apiManifest: readonly ApiEntrypointDefinition[] = ${JSON.stringify(contract.apiManifest, null, 2)};\n`,
    },
    {
      path: resolve(root, 'src/pages/docs/api-snapshot.ts'),
      source:
        '// Generated package API contract. Do not edit.\n' +
        'export interface ApiSymbolDefinition {\n' +
        '  readonly name: string;\n' +
        '  readonly anchor: string;\n' +
        '  readonly signature: string;\n' +
        '  readonly typeOnly: boolean;\n' +
        '  readonly summary?: string;\n' +
        '  readonly remarks?: string;\n' +
        '  readonly tags?: Readonly<Record<string, readonly string[]>>;\n' +
        '  readonly members?: readonly ApiMemberDefinition[];\n' +
        '}\n\n' +
        'export interface ApiMemberDefinition {\n' +
        '  readonly name: string;\n' +
        '  readonly summary: string;\n' +
        '  readonly signature: string;\n' +
        '  readonly tags?: Readonly<Record<string, readonly string[]>>;\n' +
        '}\n\n' +
        'export const apiSymbolSets: Readonly<Record<string, readonly ApiSymbolDefinition[]>> = ' +
        `${JSON.stringify(contract.apiSymbolSets, null, 2)};\n`,
    },
    {
      path: resolve(root, 'src/pages/docs/cli-snapshot.ts'),
      source:
        '// Generated from @askrjs/cli --help. Do not edit.\n' +
        `export const cliSnapshot = ${JSON.stringify(contract.cli, null, 2)} as const;\n`,
    },
    {
      path: resolve(root, 'src/pages/docs/package-peers.ts'),
      source:
        '// Internal package metadata snapshot. This is contract data, not page copy.\n' +
        'export const packagePeers: Readonly<Record<string, readonly string[]>> = ' +
        `${JSON.stringify(contract.packagePeers, null, 2)};\n`,
    },
  ];

  for (const output of outputs) writeFileSync(output.path, output.source);
  const formatted = spawnSync(
    resolve(root, 'node_modules/.bin/vp'),
    ['fmt', ...outputs.map((output) => output.path)],
    { encoding: 'utf8' }
  );
  if (formatted.status !== 0) {
    throw new Error(
      formatted.stderr ||
        formatted.stdout ||
        'Unable to format package snapshots.'
    );
  }
}

function equal(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function entrypointIdentity(contract: MutableContract) {
  return contract.apiManifest.map((entrypoint) => ({
    packageName: entrypoint.packageName,
    subpath: entrypoint.subpath,
    importName: entrypoint.importName,
    slug: entrypoint.slug,
    symbolSet: entrypoint.symbolSet,
  }));
}

function packageVersions(contract: MutableContract) {
  return contract.apiManifest.map((entrypoint) => ({
    importName: entrypoint.importName,
    version: entrypoint.version,
  }));
}

function snapshotContractErrors(
  installed: MutableContract,
  recorded: MutableContract
): string[] {
  const errors: string[] = [];
  if (!equal(entrypointIdentity(installed), entrypointIdentity(recorded))) {
    errors.push('API entrypoints');
  }
  if (!equal(packageVersions(installed), packageVersions(recorded))) {
    errors.push('package versions');
  }
  if (!equal(installed.apiSymbolSets, recorded.apiSymbolSets)) {
    errors.push('API exported symbols and signatures');
  }
  if (!equal(installed.packagePeers, recorded.packagePeers)) {
    errors.push('package peer metadata');
  }
  if (installed.cli.version !== recorded.cli.version) {
    errors.push('CLI package version');
  }
  if (!equal(installed.cli.commands, recorded.cli.commands)) {
    errors.push('CLI commands');
  }
  if (!equal(installed.cli.templates, recorded.cli.templates)) {
    errors.push('CLI templates');
  }
  if (installed.cli.help !== recorded.cli.help) errors.push('CLI help');
  if (installed.cli.createHelp !== recorded.cli.createHelp) {
    errors.push('CLI create help');
  }
  return errors;
}

describe('installed package snapshot contract', () => {
  let installed: MutableContract;

  beforeAll(() => {
    installed = deriveInstalledContract();
    if (updatePackageSnapshot) writeRecordedContract(installed);
  }, 30_000);

  it('should match entrypoints, versions, exported signatures, peers, and CLI help', () => {
    if (updatePackageSnapshot) return;
    expect(snapshotContractErrors(installed, recordedContract())).toEqual([]);
  });

  it('should detect an intentionally changed API signature', () => {
    const recorded = recordedContract();
    recorded.apiSymbolSets.symbols0![0]!.signature += ' drift';
    expect(snapshotContractErrors(installed, recorded)).toContain(
      'API exported symbols and signatures'
    );
  });

  it('should detect an intentionally changed entrypoint', () => {
    const recorded = recordedContract();
    recorded.apiManifest[0]!.subpath = './drift';
    expect(snapshotContractErrors(installed, recorded)).toContain(
      'API entrypoints'
    );
  });

  it('should detect an intentionally changed CLI command', () => {
    const recorded = recordedContract();
    recorded.cli.commands.shift();
    expect(snapshotContractErrors(installed, recorded)).toContain(
      'CLI commands'
    );
  });

  it('should detect an intentionally changed recorded package version', () => {
    const recorded = recordedContract();
    recorded.apiManifest[0]!.version = '0.0.0-drift';
    expect(snapshotContractErrors(installed, recorded)).toContain(
      'package versions'
    );
  });
});
