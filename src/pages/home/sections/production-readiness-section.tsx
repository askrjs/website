import { HeroActionGrid } from '../../../shared/page-primitives/hero';
import { PageSection } from '../../../shared/page-primitives/section';
import { docsStartPath } from '../../../site/navigation';

export function ProductionReadinessSection() {
  return (
    <PageSection
      className="home-final"
      kicker="Production readiness"
      title="Verify the route, the document, and the generated files."
      description="Before release, confirm the app has one document shell, shared route handlers, route metadata, themed CSS, and direct-load static output."
    >
      <HeroActionGrid
        actions={[
          {
            href: docsStartPath,
            label: 'Open onboarding lane',
            cta: 'Install and create a route',
          },
          {
            href: '/docs',
            label: 'Open docs hub',
            cta: 'Choose a task guide',
          },
          {
            href: '/showcase/askr',
            label: 'Inspect runtime reference',
            cta: 'Review the runtime model',
          },
        ]}
      />
    </PageSection>
  );
}
