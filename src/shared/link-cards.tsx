import { Link } from '@askrjs/askr/router';
import { Flex, Stack } from '@askrjs/themes/layouts';
import { Badge, Card } from '@askrjs/themes/surfaces';

import type { SiteLink } from '../site/navigation';

export function LinkCard(props: SiteLink) {
  return (
    <Stack asChild gap="3">
      <Card>
        {props.badge ? <Badge>{props.badge}</Badge> : null}
        <h2>{props.label}</h2>
        <p>{props.description ?? ''}</p>
        {props.meta ? <div class="card-meta">{props.meta}</div> : null}
        <Link class="card-cta" href={props.href}>
          {props.cta ?? 'Explore'}
        </Link>
      </Card>
    </Stack>
  );
}

export function LinkCardGrid(props: { links: SiteLink[]; className?: string }) {
  const className = props.className ? `grid ${props.className}` : 'grid';
  return (
    <Flex class={className} gap="4" wrap="wrap">
      {props.links.map((link) => (
        <LinkCard {...link} />
      ))}
    </Flex>
  );
}
