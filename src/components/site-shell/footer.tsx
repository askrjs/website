import { Link } from '@askrjs/askr/router';

export function SiteFooter() {
  return (
    <footer>
      <div class="container site-footer">
        <div class="footer-grid">
          <div class="footer-col">
            <strong>Ecosystem</strong>
            <ul>
              <li>
                <Link href="/framework">Framework</Link>
              </li>
              <li>
                <Link href="/ui">UI</Link>
              </li>
              <li>
                <Link href="/themes">Themes</Link>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <strong>Reference</strong>
            <ul>
              <li>
                <Link href="/showcase/askr">Runtime</Link>
              </li>
              <li>
                <Link href="/showcase/ui">Components</Link>
              </li>
              <li>
                <Link href="/showcase/themes">Theme tokens</Link>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <strong>Docs</strong>
            <ul>
              <li>
                <Link href="/docs">Documentation</Link>
              </li>
              <li>
                <Link href="/docs/getting-started/installation">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/docs/guides/ssg-overview">Guides</Link>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <strong>Community</strong>
            <ul>
              <li>
                <a
                  href="https://github.com/askrjs/askr"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@askrjs/askr"
                  target="_blank"
                  rel="noopener"
                >
                  npm
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          Apache-2.0 License &middot; Built with askr, askr-ui, and askr-themes.
        </div>
      </div>
    </footer>
  );
}
