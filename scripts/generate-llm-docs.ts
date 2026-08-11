import {
  mkdirSync,
  mkdtempSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { llmDocsArtifacts } from '../src/pages/docs/markdown';

const outputDir = resolve(process.cwd(), '.askr/llms');
const buildDir = resolve(process.cwd(), '.askr');
mkdirSync(buildDir, { recursive: true });
const stagingDir = mkdtempSync(resolve(buildDir, 'llms-staging-'));

const artifacts = llmDocsArtifacts();
try {
  for (const [relativePath, content] of artifacts) {
    const outputPath = resolve(stagingDir, relativePath);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, content, 'utf8');
  }
  rmSync(outputDir, { recursive: true, force: true });
  renameSync(stagingDir, outputDir);
} catch (error) {
  rmSync(stagingDir, { recursive: true, force: true });
  throw error;
}

console.log(
  `Generated ${artifacts.size - 1} Markdown pages and llms-full.txt in ${outputDir}`
);
