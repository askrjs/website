import { Link } from '@askrjs/askr/router';
import { Stack } from '@askrjs/themes/components';
import { ArrowRightIcon } from '@askrjs/lucide';

export interface PathwayItem {
  stage: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export function DocsPathway(props: { items: PathwayItem[] }) {
  return (
    <ol class="docs-pathway">
      {props.items.map((item) => (
        <Stack asChild gap="2">
          <li>
            <span>{item.stage}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link href={item.href}>
              {item.cta}
              <ArrowRightIcon size={15} />
            </Link>
          </li>
        </Stack>
      ))}
    </ol>
  );
}
