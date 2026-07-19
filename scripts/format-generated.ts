import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, resolve } from 'node:path';

const root = process.cwd();
const formatter = resolve(root, 'node_modules/.bin/vp');

export function formatGeneratedTypeScript(
  outputPath: string,
  source: string
): string {
  const directory = mkdtempSync(resolve(tmpdir(), 'askr-website-format-'));
  const temporaryPath = resolve(directory, basename(outputPath));

  try {
    writeFileSync(temporaryPath, source);
    const result = spawnSync(formatter, ['fmt', temporaryPath], {
      cwd: root,
      encoding: 'utf8',
    });
    if (result.status !== 0) {
      throw new Error(
        result.stderr || result.stdout || 'Unable to format generated output.'
      );
    }
    return readFileSync(temporaryPath, 'utf8');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
