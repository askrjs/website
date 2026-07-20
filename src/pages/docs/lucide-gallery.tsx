import { state } from '@askrjs/askr';
import { Link } from '@askrjs/askr/router';
import * as iconExports from '@askrjs/lucide';
import { ArrowLeftIcon, CircleIcon, SearchIcon } from '@askrjs/lucide';

type IconComponent = typeof CircleIcon;
const icons = Object.entries(iconExports)
  .filter(
    ([name, value]) => name.endsWith('Icon') && typeof value === 'function'
  )
  .map(([name, value]) => ({ name, Icon: value as IconComponent }))
  .sort((left, right) => left.name.localeCompare(right.name));

export default function LucideGalleryPage() {
  const [query, setQuery] = state('');
  const visible = () => {
    const normalized = query().trim().toLowerCase();
    return normalized
      ? icons.filter((icon) => icon.name.toLowerCase().includes(normalized))
      : icons;
  };
  return (
    <article
      class="docs-article"
      data-docs-route="/docs/integrations/lucide-gallery"
    >
      <nav class="docs-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <Link href="/docs/integrations">Integrations</Link>
        <span>/</span>
        <span aria-current="page">Lucide Gallery</span>
      </nav>
      <header class="docs-article__header">
        <div class="docs-eyebrow">
          <span>UI &amp; Components</span>
        </div>
        <h1>Lucide Gallery</h1>
        <p>
          Search every icon exported by @askrjs/lucide 0.0.4. Import the
          selected component by name and give icon-only controls an accessible
          label.
        </p>
        <ul class="package-badges">
          <li>
            <code>@askrjs/lucide</code>
            <span>0.0.4</span>
          </li>
        </ul>
      </header>
      <section aria-labelledby="search-the-gallery">
        <h2 id="search-the-gallery" class="anchored-heading">
          <a href="#search-the-gallery">Search the gallery</a>
        </h2>
        <label class="gallery-search">
          <SearchIcon size={18} aria-hidden="true" />
          <span class="sr-only">Filter icons</span>
          <input
            type="search"
            value={query()}
            placeholder={`Filter ${icons.length} icons`}
            onInput={(event: Event) =>
              setQuery((event.currentTarget as HTMLInputElement).value)
            }
          />
        </label>
        <p class="gallery-count">{visible().length} icons</p>
        <div class="icon-gallery">
          {visible().map(({ name, Icon }) => (
            <div class="icon-gallery__item" key={name} title={name}>
              <Icon size={22} aria-hidden="true" />
              <code>{name}</code>
            </div>
          ))}
        </div>
      </section>
      <section aria-labelledby="direct-icon-imports">
        <h2 id="direct-icon-imports" class="anchored-heading">
          <a href="#direct-icon-imports">Direct icon imports</a>
        </h2>
        <p>
          Import named icons from <code>@askrjs/lucide</code>. Keep the icon
          decorative when nearby text names the action; otherwise label the
          interactive control.
        </p>
        <div class="code-block" data-code-block>
          <pre>
            <code>{`import { SearchIcon } from '@askrjs/lucide';

<button type="button" aria-label="Search">
  <SearchIcon size={18} aria-hidden="true" />
</button>`}</code>
          </pre>
        </div>
      </section>
      <section aria-labelledby="sizing-and-stroke">
        <h2 id="sizing-and-stroke" class="anchored-heading">
          <a href="#sizing-and-stroke">Sizing and stroke</a>
        </h2>
        <p>
          Set a consistent <code>size</code> at the owning control or layout
          boundary. Preserve the default stroke unless your application theme
          intentionally defines another icon weight.
        </p>
      </section>
      <section aria-labelledby="accessibility">
        <h2 id="accessibility" class="anchored-heading">
          <a href="#accessibility">Accessibility</a>
        </h2>
        <aside class="docs-callout" data-tone="accessibility">
          <strong>Icon contract</strong>
          <p>
            Icons do not replace text alternatives. Use{' '}
            <code>aria-hidden="true"</code> for decoration and an{' '}
            <code>aria-label</code> on icon-only buttons and links.
          </p>
        </aside>
      </section>
      <nav class="docs-pagination" aria-label="Documentation pagination">
        <Link href="/docs/integrations/icons-and-logos">
          <ArrowLeftIcon size={16} aria-hidden="true" />
          <span>
            <small>Previous</small>Icons and Logos
          </span>
        </Link>
      </nav>
    </article>
  );
}
