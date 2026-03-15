import { readdirSync, readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

import type { DocPage } from './content';

interface ParsedFrontmatter {
  title: string;
  summary: string;
}

function walkMarkdownFiles(root: string): string[] {
  const entries = readdirSync(root, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = resolve(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(entryPath);
    }
  }

  return files;
}

function parseFrontmatter(markdown: string, filePath: string): {
  frontmatter: ParsedFrontmatter;
  body: string;
} {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const trimmed = normalized.trimStart();

  if (!trimmed.startsWith('---\n')) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }

  const endMarkerIndex = trimmed.indexOf('\n---\n', 4);

  if (endMarkerIndex < 0) {
    throw new Error(`Unterminated frontmatter in ${filePath}`);
  }

  const rawFrontmatter = trimmed.slice(4, endMarkerIndex).trim();
  const body = trimmed.slice(endMarkerIndex + 5).trim();

  const values: Record<string, string> = {};

  for (const line of rawFrontmatter.split('\n')) {
    const divider = line.indexOf(':');
    if (divider < 0) continue;

    const key = line.slice(0, divider).trim();
    const value = line.slice(divider + 1).trim();
    values[key] = value;
  }

  const title = values.title;
  const summary = values.summary;

  if (!title || !summary) {
    throw new Error(`Frontmatter in ${filePath} must include title and summary`);
  }

  return {
    frontmatter: { title, summary },
    body,
  };
}

function parseSections(body: string) {
  const lines = body.split('\n');
  const sections: Array<{ heading: string; body: string[] }> = [];

  let currentHeading = 'Overview';
  let currentBody: string[] = [];

  function flushSection() {
    if (currentBody.length === 0) return;

    sections.push({
      heading: currentHeading,
      body: currentBody,
    });
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith('## ')) {
      flushSection();
      currentHeading = line.slice(3).trim();
      currentBody = [];
      continue;
    }

    if (line.length === 0) {
      continue;
    }

    currentBody.push(line);
  }

  flushSection();

  return sections;
}

function toSlug(docsRoot: string, filePath: string): string {
  return relative(docsRoot, filePath).replace(/\\/g, '/').replace(/\.md$/i, '');
}

export function loadDocsPages(): DocPage[] {
  const docsRoot = resolve(process.cwd(), 'docs');
  const files = walkMarkdownFiles(docsRoot).sort((a, b) => a.localeCompare(b));

  return files.map((filePath) => {
    const markdown = readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(markdown, filePath);

    return {
      slug: toSlug(docsRoot, filePath),
      title: frontmatter.title,
      summary: frontmatter.summary,
      sections: parseSections(body),
    };
  });
}
