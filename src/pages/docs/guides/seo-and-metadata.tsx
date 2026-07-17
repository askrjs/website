import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'guides/seo-and-metadata',
  title: 'SEO and metadata',
  summary: 'Set route titles, descriptions, and social metadata in one place.',
  section: 'Guides',
  order: 8,
  goal: 'Ensure route metadata is complete and stable across marketing and app pages.',
  outcome:
    'Search-friendly pages with stable social previews and no metadata drift.',
  prerequisites: ['Document metadata configured', 'Route registry complete'],
  next: '/docs/reference/troubleshooting',
  nextLabel: 'Handle runtime issues',
  toc: [
    { id: 'metadata-contract', label: 'Metadata contract' },
    { id: 'crawlability', label: 'Crawlability checks' },
  ],
};

const metadataCode = `route("/framework", FrameworkPage, {
  meta: {
    title: "Framework",
    description: "Fine-grained state, routing, SSR, and SSG.",
    canonical: "https://askr.dev/framework",
    openGraph: {
      "og:title": "Askr framework",
      "og:type": "website",
    },
  },
});`;

export function SeoAndMetadataDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="metadata-contract">
        <h2>Metadata contract</h2>
        <p>
          Put title, description, canonical, Open Graph, links, JSON-LD, and
          document-language hints in the route's <code>meta</code> option.
        </p>
        <pre class="code-block">
          <code>{metadataCode}</code>
        </pre>
      </section>

      <section id="crawlability">
        <h2>Crawlability checks</h2>
        <ul>
          <li>Validate robots and sitemap behavior from generated output.</li>
          <li>Verify canonical URLs and social card image paths.</li>
          <li>Keep OG payload strings short and specific.</li>
        </ul>
      </section>
    </DocLayout>
  );
}
