import { Link } from '@askrjs/askr/router';
import { Stack } from '@askrjs/themes/layouts';
import { ArrowRightIcon } from '@askrjs/lucide';

import { CodeWindow } from '../../../components/site-primitives';
import type { ArchitectureNode } from './types';

export function ArchitecturePass(props: { nodes: ArchitectureNode[] }) {
  return (
    <div class="architecture-pass">
      {props.nodes.map((node, index) => (
        <Stack asChild gap="3">
          <article>
            <span class="architecture-node-label">{`Layer ${index + 1}`}</span>
            <h3>{node.title}</h3>
            <p>{node.claim}</p>
            <CodeWindow label={node.title} code={node.snippet} />
            <Link href={node.href}>
              {node.cta}
              <ArrowRightIcon size={15} />
            </Link>
          </article>
        </Stack>
      ))}
    </div>
  );
}
