import { PageSection } from '../../../shared/page-primitives/section';
import { ArchitecturePass } from './architecture-pass';
import type { ArchitectureNode } from './types';

export function SolutionSection(props: { nodes: ArchitectureNode[] }) {
  return (
    <PageSection
      className="section-band"
      kicker="Solution"
      title="One page model across runtime and static output"
      description="Use the same route registry for client boot, server rendering, and static generation. Add theme tokens and UI primitives without moving document concerns into page components."
    >
      <ArchitecturePass nodes={props.nodes} />
    </PageSection>
  );
}
