import { createRouteRegistry, route } from '@askrjs/askr/router';
import { RootLayout } from './_layout';
import { HomePage } from './home';

export const routeRegistry = createRouteRegistry(() => {
  route('/', () => (
    <RootLayout>
      <HomePage />
    </RootLayout>
  ));
});
