import { Link } from '@askrjs/askr/router';
import { ArrowLeftIcon } from '@askrjs/lucide';
import { Button, Container } from '@askrjs/themes/components';

export function NotFoundPage() {
  return (
    <section class="not-found" aria-labelledby="not-found-title">
      <Container class="not-found__inner" direction="column" size="xl">
        <span aria-hidden="true">404</span>
        <h1 id="not-found-title">We couldn't find that page.</h1>
        <p>Check the address, return home, or browse the documentation.</p>
        <div class="not-found__actions">
          <Button asChild>
            <Link href="/">
              <ArrowLeftIcon size={18} aria-hidden="true" />
              Return home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs">Read the documentation</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
