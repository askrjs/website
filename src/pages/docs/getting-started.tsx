export function GettingStartedPage() {
  return (
    <article class="docs-article">
      <header class="docs-article__header">
        <p class="eyebrow">Getting started</p>
        <h1>Your first Askr app</h1>
        <p>
          Create a project, start the development server, and add a route using
          the same registry your production build will use.
        </p>
      </header>

      <section>
        <h2>1. Create the project</h2>
        <div class="code-block">
          <code>npm create askr@latest</code>
        </div>
        <p>
          Choose the starter that matches your rendering target. You can move
          between SPA, SSG, and server-backed projects without relearning the
          component model.
        </p>
      </section>

      <section>
        <h2>2. Run it locally</h2>
        <div class="code-block">
          <code>
            cd my-askr-app{`\n`}npm install{`\n`}npm run dev
          </code>
        </div>
        <p>
          The development server handles module updates while Askr owns the
          application runtime and navigation.
        </p>
      </section>

      <section>
        <h2>3. Register a page</h2>
        <div class="code-block">
          <code>{`createRouteRegistry(() => {\n  route('/', HomePage);\n});`}</code>
        </div>
        <p>
          Pass this registry to the browser boot function and, for a static
          site, to the SSG configuration. One definition then drives navigation
          and generated routes.
        </p>
      </section>
    </article>
  );
}
