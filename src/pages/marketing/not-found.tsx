import { Link } from '@askrjs/askr/router';
import { ArrowLeftIcon } from '@askrjs/lucide';
import { Button, Container } from '@askrjs/themes/components';

export function NotFoundPage() {
  return (
    <section class="not-found" aria-labelledby="not-found-title">
      <Container class="not-found__inner" size="xl">
        <span aria-hidden="true">404</span>
        <h1 id="not-found-title">This route does not exist.</h1>
        <p>
          The address may have changed, or the page may never have been here.
        </p>
        <div class="not-found__actions">
          <Button asChild>
            <Link href="/">
              <ArrowLeftIcon size={18} aria-hidden="true" />
              Return home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href="/docs">Read the documentation</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
