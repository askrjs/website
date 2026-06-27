import { Flex, Stack } from '@askrjs/themes/layouts';
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
          <Flex asChild align="center" gap="3">
            <li>
              <RouteIcon size={18} />
              <span>One route registry for SPA, SSR, and SSG.</span>
            </li>
          </Flex>
          <Flex asChild align="center" gap="3">
            <li>
              <RadarIcon size={18} />
              <span>Fine-grained updates avoid broad render churn.</span>
            </li>
          </Flex>
          <Flex asChild align="center" gap="3">
            <li>
              <WaypointsIcon size={18} />
              <span>
                Docs, examples, and product pages share the same path.
              </span>
            </li>
          </Flex>
          <Flex asChild align="center" gap="3">
            <li>
              <CodeXmlIcon size={18} />
              <span>Theme tokens stay inspectable in ordinary CSS.</span>
            </li>
          </Flex>
        </ul>
      </Stack>
    </SplitSection>
  );
}
