import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { extname, join, relative } from 'node:path';

import {
  allowedLeadingUnderscorePageFiles,
  pageModuleNamePattern,
  reservedPageModuleNames,
} from '../src/shared/project-structure';

interface StructureViolation {
  path: string;
  reason: string;
}

function isAllowedUnderscoreFile(fileName: string) {
  return allowedLeadingUnderscorePageFiles.includes(
    fileName as (typeof allowedLeadingUnderscorePageFiles)[number]
  );
}

function formatViolations(violations: StructureViolation[]) {
  return [
    'Invalid src/pages structure detected:',
    ...violations.map(
      (violation) => `- ${violation.path}: ${violation.reason}`
    ),
  ].join('\n');
}

function validateDirectoryName(relativePath: string, directoryName: string) {
  if (directoryName.startsWith('_')) {
    return {
      path: relativePath,
      reason: 'leading-underscore directories are not allowed under src/pages',
    };
  }

  if (!pageModuleNamePattern.test(directoryName)) {
    return {
      path: relativePath,
      reason: 'directory names must stay kebab-case under src/pages',
    };
  }

  return null;
}

function validateFileName(relativePath: string, fileName: string) {
  if (isAllowedUnderscoreFile(fileName)) {
    return null;
  }

  if (reservedPageModuleNames.has(fileName)) {
    return {
      path: relativePath,
      reason:
        'use a named kebab-case page module instead of index.ts or index.tsx',
    };
  }

  const extension = extname(fileName);
  if (extension !== '.ts' && extension !== '.tsx') {
    return {
      path: relativePath,
      reason: 'page files must be .ts or .tsx modules',
    };
  }

  const baseName = fileName.slice(0, -extension.length);
  if (!pageModuleNamePattern.test(baseName)) {
    return {
      path: relativePath,
      reason: 'file names under src/pages must be kebab-case',
    };
  }

  return null;
}

async function walkPagesTree(
  rootDir: string,
  currentDir = rootDir
): Promise<StructureViolation[]> {
  const violations: StructureViolation[] = [];
  const entries = await readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = join(currentDir, entry.name);
    const relativePath = relative(rootDir, absolutePath);

    if (entry.isDirectory()) {
      const directoryViolation = validateDirectoryName(
        relativePath,
        entry.name
      );
      if (directoryViolation) violations.push(directoryViolation);
      violations.push(...(await walkPagesTree(rootDir, absolutePath)));
      continue;
    }

    if (entry.isFile()) {
      const fileViolation = validateFileName(relativePath, entry.name);
      if (fileViolation) violations.push(fileViolation);
    }
  }

  return violations;
}

async function validateProjectStructure(rootDir: string) {
  const violations = await walkPagesTree(rootDir);
  if (violations.length > 0) {
    throw new Error(formatViolations(violations));
  }
}

async function runNegativeCase(fileName: string) {
  const tempRoot = await mkdtemp(join(tmpdir(), 'askr-structure-'));
  try {
    const tempPagesRoot = join(tempRoot, 'src/pages');
    await mkdir(tempPagesRoot, { recursive: true });
    await writeFile(
      join(tempPagesRoot, fileName),
      'export const sentinel = 1;\n'
    );

    await assert.rejects(
      () => validateProjectStructure(tempPagesRoot),
      (error: unknown) =>
        error instanceof Error &&
        error.message.includes(fileName) &&
        error.message.includes('Invalid src/pages structure detected')
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

async function main() {
  await runNegativeCase('_content.ts');
  await runNegativeCase('camelCase.tsx');
  await validateProjectStructure(join(process.cwd(), 'src/pages'));
}

await main();
