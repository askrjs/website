import { Link } from '@askrjs/askr/router';
import { Stack } from '@askrjs/themes/layouts';
import { ArrowRightIcon } from '@askrjs/lucide';

import type { LaunchStep } from './types';

export function LaunchRail(props: { steps: LaunchStep[] }) {
  return (
    <ol class="launch-path">
      {props.steps.map((step, index) => (
        <Stack asChild gap="2">
          <li>
            <span>{`0${index + 1}`}</span>
            <small>{step.phase}</small>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
            <Link href={step.href}>
              {step.cta}
              <ArrowRightIcon size={15} />
            </Link>
          </li>
        </Stack>
      ))}
    </ol>
  );
}
