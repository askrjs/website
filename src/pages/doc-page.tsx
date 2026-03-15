import { Fragment, jsx } from '../runtime/jsx';

import { SiteShell } from '../components/site-shell';
import type { DocPage } from '../site/content';
import type { Props } from '../types/props';

const fallbackDoc: DocPage = {
  slug: 'not-found',
  title: 'Document Not Found',
  summary: 'The requested documentation page is not available.',
  sections: [
    {
      heading: 'Next Steps',
      body: ['Return to /docs and choose another guide.'],
    },
  ],
};

export function DocPageView(props: Props) {
  const doc = (props.doc as DocPage | undefined) ?? fallbackDoc;

  return (
    <SiteShell title={doc.title} intro={doc.summary}>
      <article class="panel">
        {doc.sections.map((section) => (
          <section>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    </SiteShell>
  );
}
