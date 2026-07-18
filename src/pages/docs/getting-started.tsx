export function GettingStartedPage() {
  return (
    <article class="docs-article">
      <header class="docs-article__header">
        <h1>Your first Askr app</h1>
        <p>
          Create an SSG project, start its development server, and add a page to
          the same route registry used by the production build.
        </p>
      </header>

      <section>
        <h2>1. Create an SSG project</h2>
        <p>
          Use Node.js 20.19 or newer on the 20.x line, or Node.js 22.12 and
          newer.
        </p>
        <div class="code-block">
          <code>npx @askrjs/cli@latest create ssg my-askr-app</code>
        </div>
        <p>
          The generator creates the project and installs its dependencies. Use{' '}
          <code>spa</code>, <code>ssr</code>, <code>full-stack</code>, or{' '}
          <code>startkit</code> instead of <code>ssg</code> when another starter
          better matches the application.
        </p>
      </section>

      <section>
        <h2>2. Run it locally</h2>
        <div class="code-block">
          <code>cd my-askr-app{`\n`}npm run dev</code>
        </div>
        <p>
          The SSG starter runs as a client-rendered app during development, with
          module updates handled by the Vite-powered development server.
        </p>
      </section>

      <section>
        <h2>3. Add a page</h2>
        <p>
          Create <code>src/pages/hello.tsx</code>:
        </p>
        <div class="code-block">
          <code>{`export default function HelloPage() {\n  return <h1>Hello, Askr.</h1>;\n}`}</code>
        </div>
        <p>
          Then import it in <code>src/routes.tsx</code> and add the route inside
          the existing <code>group(...)</code> callback:
        </p>
        <div class="code-block">
          <code>{`import HelloPage from './pages/hello';\n\nroute('/hello', HelloPage);`}</code>
        </div>
        <p>
          The starter's existing <code>pageRegistry</code> powers browser
          navigation in <code>src/main.tsx</code> and static generation in{' '}
          <code>ssg.config.ts</code>. Registering <code>/hello</code> once makes
          it available to both.
        </p>
        <p>
          The starter also protects its explicit route tree in{' '}
          <code>tests/ssg-config.test.ts</code>. Add <code>/hello</code> to the
          expected paths and change the expected route count from four to five:
        </p>
        <div class="code-block">
          <code>{`).toEqual([\n  '/',\n  '/content',\n  '/hello',\n  '/preview',\n  '/workflow',\n].sort());\nexpect(staticConfig.registry.routes).toHaveLength(5);`}</code>
        </div>
      </section>

      <section>
        <h2>4. Generate the site</h2>
        <div class="code-block">
          <code>npm run build{`\n`}npm run preview</code>
        </div>
        <p>
          The build compiles the browser assets and pre-renders every registered
          route into <code>dist/</code>. Preview serves that production output
          locally.
        </p>
      </section>
    </article>
  );
}
