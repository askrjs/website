import { SplitSection } from '../../../components/page-primitives/section';
import { DocsPathway } from '../../../components/site-primitives';
import type { HomeSection } from './types';

export function DocsLaneSection(props: { section: HomeSection; index: number }) {
  return (
    <SplitSection
      className="docs-lane"
      kicker={props.section.kicker}
      title={props.section.title}
      description={props.section.description}
      reverse={Boolean(props.index % 2)}
    >
      <DocsPathway
        items={props.section.links.map((link, index) => ({
          stage: link.badge ?? `Step ${index + 1}`,
          title: link.label,
          description: link.description ?? link.meta ?? 'Open the guide.',
          href: link.href,
          cta: link.cta ?? 'Read guide',
        }))}
      />
    </SplitSection>
  );
}