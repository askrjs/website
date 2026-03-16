import { jsx } from "../../../runtime/jsx";

import { DocLayout } from "../../../components/doc-layout";
import type { DocMeta } from "../../../pages/shared/doc-types";

export const meta: DocMeta = {
  slug: "guides/building-pages",
  title: "Building Pages",
  summary:
    "Use page primitives, templates, and page models to add pages without ad hoc markup.",
};

export function BuildingPagesDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary}>
      <section>
        <h2>Use the Layered Structure</h2>
        <p>
          Start from the shell and build upward through page primitives, thin
          templates, and page-model adapters. Keep each layer focused on one
          responsibility.
        </p>
        <p>
          Use primitives for repeated hero, section, catalog, detail, and
          snippet structure. Use templates to compose those primitives into
          common page shapes.
        </p>
      </section>
      <section>
        <h2>Keep Data Separate from Rendering</h2>
        <p>
          Build page-specific view models in pages/shared/page-models and pass
          that shaped data into templates and primitives. Avoid mixing route
          data transforms into page markup.
        </p>
        <p>
          If a page starts repeating structural markup that already exists
          elsewhere, extract that structure into a primitive instead of copying
          it again.
        </p>
      </section>
      <section>
        <h2>Preferred Workflow</h2>
        <p>
          Add or update source content in site data, create a page-model adapter
          when needed, compose the page from an existing template, and then
          register the route.
        </p>
        <p>
          Keep new pages explicit TSX files, but keep those files small by
          pushing repeated structure into reusable components.
        </p>
      </section>
    </DocLayout>
  );
}
