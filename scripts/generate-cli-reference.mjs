import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const executable = resolve(root, 'node_modules/.bin/askr');
const outputPath = resolve(root, 'src/pages/docs/cli-snapshot.ts');
const help = spawnSync(executable, ['--help'], { encoding: 'utf8' });
const createHelp = spawnSync(executable, ['create', '--help'], {
  encoding: 'utf8',
});
if (help.status !== 0 || createHelp.status !== 0) {
  console.error(help.stderr || createHelp.stderr || 'Unable to read CLI help.');
  process.exit(1);
}

function namedLines(source, heading) {
  const section = source.split(`${heading}:`)[1]?.split('\n\n')[0] ?? '';
  return section
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(/\s{2,}/)[0]);
}

const snapshot = {
  version: JSON.parse(
    readFileSync(resolve(root, 'node_modules/@askrjs/cli/package.json'), 'utf8')
  ).version,
  commands: namedLines(help.stdout, 'Commands'),
  templates: (createHelp.stdout.match(/Templates:\n\s+([^\n]+)/)?.[1] ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
  help: help.stdout.trim(),
  createHelp: createHelp.stdout.trim(),
};
const source = `// Generated from @askrjs/cli --help. Do not edit.\nexport const cliSnapshot = ${JSON.stringify(snapshot, null, 2)} as const;\n`;

if (process.argv.includes('--check')) {
  if (!existsSync(outputPath) || readFileSync(outputPath, 'utf8') !== source) {
    console.error('CLI snapshot is out of date. Run npm run docs:cli.');
    process.exitCode = 1;
  }
} else {
  writeFileSync(outputPath, source);
  console.log(
    `Generated CLI reference for ${snapshot.commands.length} commands and ${snapshot.templates.length} templates.`
  );
}
