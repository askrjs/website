export function CoreConceptsPage() {
  return (
    <article class="docs-article">
      <header class="docs-article__header">
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
          A component subscribes only to state it read during its last committed
          render.
        </p>
        <div class="code-block">
          <code>{`import { state } from '@askrjs/askr';\n\nexport function Counter() {\n  const [count, setCount] = state(0);\n\n  return (\n    <button onClick={() => setCount((value) => value + 1)}>\n      {count()}\n    </button>\n  );\n}`}</code>
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
          <code>hydrateSPA</code> adopts matching generated DOM and attaches
          event bindings. Development builds also verify the generated markup by
          default. Keep the first browser render deterministic so the generated
          document and hydrated tree agree.
        </p>
      </section>
    </article>
  );
}
