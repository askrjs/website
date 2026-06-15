import { PageSection } from '../../../components/page-primitives/section';
import { LaunchRail } from './launch-rail';
import type { LaunchStep } from './types';

export function ProblemSection(props: { steps: LaunchStep[] }) {
  return (
    <PageSection
      className="section-band"
      kicker="Why Askr"
      title="State, routing, and output should not become separate projects"
      description="Askr keeps component state, route registration, and generated output tied to the same app structure so teams can see what code owns each page."
    >
      <LaunchRail steps={props.steps} />
    </PageSection>
  );
}
