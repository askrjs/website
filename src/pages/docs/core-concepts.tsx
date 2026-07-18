export function CoreConceptsPage() {
  return (
    <article class="docs-article">
      <header class="docs-article__header">
        <p class="eyebrow">Core concepts</p>
        <h1>Runtime and rendering</h1>
        <p>
          Askr keeps state local, routing explicit, and rendering modes aligned
          so browser and generated output follow the same application structure.
        </p>
      </header>

      <section>
        <h2>State is explicit</h2>
        <p>
          A state value is read like a function and updated through its setter.
          Reads made while rendering establish the work Askr needs to repeat
          when that value changes.
        </p>
        <div class="code-block">
          <code>{`const count = state(0);\n\n<button onClick={() => count.set(count() + 1)}>\n  {count()}\n</button>`}</code>
        </div>
      </section>

      <section>
        <h2>Routes compose the application</h2>
        <p>
          Route groups attach shared layouts and metadata without hiding each
          page. The registry resolves the same tree for browser navigation and
          static generation.
        </p>
      </section>

      <section>
        <h2>Hydration adopts generated HTML</h2>
        <p>
          SSG writes complete page content before deployment. In the browser,
          <code> hydrateSPA </code> verifies and adopts that markup, then
          attaches interactions. Keep the first browser render deterministic so
          the generated document and hydrated tree agree.
        </p>
      </section>
    </article>
  );
}
