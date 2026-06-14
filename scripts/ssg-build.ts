import { createHash } from 'node:crypto';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { createStaticGen, type SSGResult } from '@askrjs/askr/ssg';

import { getWebsiteDocumentMeta } from '../src/pages/_routes';
import { renderDocument } from '../src/server/document-template';
import { renderApp } from '../src/server/entry-server';
import type { StaticRouteConfig } from '../src/pages/_types';

const root = process.cwd();
const emptyAppRootPattern = /<div([^>]*\bid=["']app["'][^>]*)>\s*<\/div>/i;
const ssrDataMissingError =
  'Server-side rendering requires all data to be available synchronously.';

interface TemplateState {
  templateHash: string;
}

interface BuildArgs {
  mode: 'full' | 'incremental';
  changedKeys: string[];
  changedRoutes: string[];
  forceFull: boolean;
}

function hashContent(content: string) {
  return createHash('sha256').update(content).digest('hex');
}

function hashRouteHtml(html: string) {
  let hash = 2166136261;

  for (let index = 0; index < html.length; index += 1) {
    hash ^= html.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).padStart(8, '0');
}

function parseBuildArgs(args: string[]): BuildArgs {
  const changedKeys: string[] = [];
  const changedRoutes: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    if (arg === '--changed-key' && next) {
      changedKeys.push(next);
      index += 1;
      continue;
    }

    if (arg === '--changed-route' && next) {
      changedRoutes.push(next);
      index += 1;
    }
  }

  return {
    mode: args.includes('--incremental') ? 'incremental' : 'full',
    changedKeys,
    changedRoutes,
    forceFull: args.includes('--force-full'),
  };
}

function readJsonFile<T>(path: string): T | null {
  if (!existsSync(path)) return null;

  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function writeJsonFile(path: string, value: unknown) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function readDocumentTemplate(outputDir: string) {
  const askrDir = resolve(outputDir, '.askr');
  const templatePath = resolve(askrDir, 'document-template.html');
  const indexPath = resolve(outputDir, 'index.html');

  if (existsSync(indexPath)) {
    const indexHtml = readFileSync(indexPath, 'utf8');
    if (emptyAppRootPattern.test(indexHtml)) {
      mkdirSync(askrDir, { recursive: true });
      writeFileSync(templatePath, indexHtml, 'utf8');
      return indexHtml;
    }
  }

  if (existsSync(templatePath)) {
    return readFileSync(templatePath, 'utf8');
  }

  throw new Error(
    'Unable to find a built document template. Run `npm run build:client` before static generation.'
  );
}

function getTemplateStatePath(outputDir: string) {
  return resolve(outputDir, '.askr', 'document-template-state.json');
}

function getGeneratedRouteCachePath(outputDir: string, filePath: string) {
  return resolve(outputDir, '.askr', 'generated-routes', filePath);
}

function cacheGeneratedRoute(outputDir: string, filePath: string, html: string) {
  const cachePath = getGeneratedRouteCachePath(outputDir, filePath);
  mkdirSync(dirname(cachePath), { recursive: true });
  writeFileSync(cachePath, html, 'utf8');
}

function needsRouteRestore(routePath: string) {
  if (!existsSync(routePath)) return true;

  return emptyAppRootPattern.test(readFileSync(routePath, 'utf8'));
}

function restoreCachedRoute(
  outputDir: string,
  filePath: string,
  routePath: string
) {
  const cachePath = getGeneratedRouteCachePath(outputDir, filePath);
  if (!existsSync(cachePath)) return false;

  const cachedHtml = readFileSync(cachePath, 'utf8');
  mkdirSync(dirname(routePath), { recursive: true });
  writeFileSync(routePath, cachedHtml, 'utf8');
  return true;
}

function shouldForceFullForTemplate(
  mode: 'full' | 'incremental',
  outputDir: string,
  templateHash: string
) {
  if (mode === 'full') return false;

  const state = readJsonFile<TemplateState>(getTemplateStatePath(outputDir));
  return state?.templateHash !== templateHash;
}

function canRepairRouteRender(route: SSGResult['routes'][number]) {
  return (
    route.status === 'error' &&
    typeof route.error === 'string' &&
    route.error.includes(ssrDataMissingError)
  );
}

function repairRouteRender(route: SSGResult['routes'][number]) {
  route.html = renderApp(route.path);
  route.status = 'success';
  route.error = undefined;
  route.fileSize = Buffer.byteLength(route.html, 'utf8');
  route.written = true;
}

function wrapGeneratedRoutes(
  result: SSGResult,
  outputDir: string,
  template: string
) {
  for (const route of result.routes) {
    const routePath = resolve(outputDir, route.filePath);

    if (canRepairRouteRender(route)) {
      repairRouteRender(route);
    }

    if (route.status === 'skipped') {
      if (
        needsRouteRestore(routePath) &&
        !restoreCachedRoute(outputDir, route.filePath, routePath)
      ) {
        throw new Error(
          `Skipped route "${route.path}" has no generated HTML to restore. Run a full build before incremental generation.`
        );
      }

      if (existsSync(routePath)) {
        route.fileSize = statSync(routePath).size;
      }
      continue;
    }

    if (route.status !== 'success') continue;

    const existingHtml = existsSync(routePath)
      ? readFileSync(routePath, 'utf8')
      : '';
    const routeNeedsRestore =
      !existsSync(routePath) || emptyAppRootPattern.test(existingHtml);

    if (routeNeedsRestore && !route.html) {
      if (restoreCachedRoute(outputDir, route.filePath, routePath)) {
        route.fileSize = statSync(routePath).size;
        continue;
      }

      throw new Error(
        `Route "${route.path}" has no generated HTML to restore. Run a full build before incremental generation.`
      );
    }

    const needsDocumentWrite =
      route.written || (route.html && routeNeedsRestore);

    if (!needsDocumentWrite) {
      if (existsSync(routePath)) {
        route.fileSize = statSync(routePath).size;
        if (!emptyAppRootPattern.test(existingHtml)) {
          cacheGeneratedRoute(outputDir, route.filePath, existingHtml);
        }
      }
      continue;
    }

    const documentHtml = renderDocument({
      templateHtml: template,
      appHtml: route.html,
      meta: getWebsiteDocumentMeta(route.path),
    });

    writeFileSync(routePath, documentHtml, 'utf8');
    route.html = documentHtml;
    route.fileSize = Buffer.byteLength(documentHtml, 'utf8');
    route.written = true;
    cacheGeneratedRoute(outputDir, route.filePath, documentHtml);
  }
}

function updateResultCounts(result: SSGResult) {
  result.successful = result.routes.filter(
    (route) => route.status === 'success' || route.status === 'skipped'
  ).length;
  result.failed = result.routes.filter((route) => route.status === 'error').length;
  result.removed = result.routes.filter(
    (route) => route.status === 'removed'
  ).length;
}

function writeMetadata(result: SSGResult, outputDir: string) {
  writeJsonFile(resolve(outputDir, 'metadata.json'), {
    generatedAt: result.generatedAt,
    totalRoutes: result.totalRoutes,
    successful: result.successful,
    failed: result.failed,
    totalDuration: result.totalDuration,
    mode: result.mode,
    rebuilt: result.rebuilt,
    skipped: result.skipped,
    removed: result.removed,
    cacheHits: result.cacheHits,
    invalidatedKeys: result.invalidatedKeys,
    invalidatedRoutes: result.invalidatedRoutes,
    routes: result.routes.map((route) => ({
      path: route.path,
      filePath: route.filePath,
      fileSize: route.fileSize,
      renderDuration: route.renderDuration,
      resourceCount: route.resourceCount,
      status: route.status,
      reason: route.reason,
      written: route.written,
      error: route.error,
    })),
  });
}

function getOutputFilePath(path: string) {
  if (path === '/') return 'index.html';
  return `${path.replace(/^\/|\/$/g, '')}/index.html`;
}

function interpolateRoutePath(
  routePath: string,
  params?: Record<string, string>
) {
  if (!params) return routePath;

  return routePath.replace(/\{([^}]+)\}/g, (_, key: string) => params[key] ?? '');
}

function writeIncrementalManifest(
  result: SSGResult,
  outputDir: string,
  seed: number,
  routes: StaticRouteConfig[]
) {
  const resultById = new Map(
    result.routes.map((route) => [
      `${route.path}::${route.filePath}`,
      route,
    ])
  );

  writeJsonFile(resolve(outputDir, '.askr', 'ssg-manifest.json'), {
    schemaVersion: 1,
    seed,
    mode: result.mode,
    routes: routes.map((route) => {
      const path = interpolateRoutePath(route.path, route.params);
      const filePath = getOutputFilePath(path);
      const routeId = `${path}::${filePath}`;
      const resultRoute = resultById.get(routeId);
      const outputPath = resolve(outputDir, filePath);
      const isSuccess =
        resultRoute?.status === 'success' || resultRoute?.status === 'skipped';
      const htmlHash =
        isSuccess && existsSync(outputPath)
          ? hashRouteHtml(readFileSync(outputPath, 'utf8'))
          : null;

      return {
        routeId,
        path,
        filePath,
        invalidationKeys: route.invalidationKeys?.slice() ?? [],
        htmlHash,
        lastStatus: htmlHash === null ? 'error' : 'success',
      };
    }),
  });
}

function copyPublicAssets(outputDir: string) {
  const publicDir = resolve(root, 'public');
  if (existsSync(publicDir)) {
    cpSync(publicDir, outputDir, {
      recursive: true,
    });
  }
}

function removeLegacyStaticArtifacts(outputDir: string) {
  for (const artifact of ['styles.css', 'theme-tokens.css', 'styles']) {
    const artifactPath = resolve(outputDir, artifact);
    if (existsSync(artifactPath)) {
      rmSync(artifactPath, { recursive: true, force: true });
    }
  }
}

async function run() {
  const args = parseBuildArgs(process.argv.slice(2));

  const config = await import(
    pathToFileURL(resolve(root, 'ssg.config.ts')).href
  );
  const outputDir = config.outputDir ?? 'dist';
  const resolvedOutputDir = resolve(root, outputDir);
  const templateHtml = readDocumentTemplate(resolvedOutputDir);
  const templateHash = hashContent(templateHtml);
  const forceFull =
    args.forceFull ||
    shouldForceFullForTemplate(args.mode, resolvedOutputDir, templateHash);

  const generator = createStaticGen({
    routes: config.routes,
    outputDir: resolvedOutputDir,
    seed: config.seed,
    concurrency: config.concurrency,
    dataOverrides: config.dataOverrides,
  });

  const originalWarn = console.warn;
  console.warn = (...values: unknown[]) => {
    const message = values.map(String).join(' ');

    if (
      message.includes('Skipping failed route:') &&
      message.includes(ssrDataMissingError)
    ) {
      return;
    }

    originalWarn(...values);
  };

  let result: SSGResult;

  try {
    result = await generator.generate({
      mode: args.mode,
      forceFull,
      changedKeys:
        args.mode === 'incremental' && !forceFull ? args.changedKeys : undefined,
      changedRoutes:
        args.mode === 'incremental' && !forceFull
          ? args.changedRoutes
          : undefined,
    });
  } finally {
    console.warn = originalWarn;
  }

  wrapGeneratedRoutes(result, resolvedOutputDir, templateHtml);
  updateResultCounts(result);
  writeMetadata(result, resolvedOutputDir);
  removeLegacyStaticArtifacts(resolvedOutputDir);
  mkdirSync(resolve(resolvedOutputDir, '.askr'), { recursive: true });
  writeJsonFile(getTemplateStatePath(resolvedOutputDir), { templateHash });
  writeIncrementalManifest(result, resolvedOutputDir, config.seed ?? 12345, config.routes);
  copyPublicAssets(resolvedOutputDir);
}

run().catch((error: unknown) => {
  console.error('Website build failed.');
  console.error(error);
  process.exit(1);
});
