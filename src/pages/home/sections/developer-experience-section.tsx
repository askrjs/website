import { Inline, Stack } from '@askrjs/themes/components';
import {
  CodeXmlIcon,
  RadarIcon,
  RouteIcon,
  WaypointsIcon,
} from '@askrjs/lucide';

import { SplitSection } from '../../../shared/page-primitives/section';

export function DeveloperExperienceSection(props: {
  title: string;
  description: string;
}) {
  return (
    <SplitSection
      className="build-confidence"
      kicker="Developer experience"
      title={props.title}
      description={props.description}
    >
      <Stack asChild gap="3">
        <ul>
          <Inline asChild align="center" gap="3">
            <li>
              <RouteIcon size={18} />
              <span>One route registry for SPA, SSR, and SSG.</span>
            </li>
          </Inline>
          <Inline asChild align="center" gap="3">
            <li>
              <RadarIcon size={18} />
              <span>Fine-grained updates avoid broad render churn.</span>
            </li>
          </Inline>
          <Inline asChild align="center" gap="3">
            <li>
              <WaypointsIcon size={18} />
              <span>
                Docs, examples, and product pages share the same path.
              </span>
            </li>
          </Inline>
          <Inline asChild align="center" gap="3">
            <li>
              <CodeXmlIcon size={18} />
              <span>Theme tokens stay inspectable in ordinary CSS.</span>
            </li>
          </Inline>
        </ul>
      </Stack>
    </SplitSection>
  );
}
