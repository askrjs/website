import { Inline, Stack } from '@askrjs/themes/components';

export interface ProofItem {
  value: string;
  label: string;
  detail: string;
}

export function ProofStrip(props: { items: ProofItem[] }) {
  return (
    <Inline asChild gap="3" wrap="wrap">
      <dl class="proof-strip">
        {props.items.map((item) => (
          <Stack asChild gap="2">
            <div class="proof-item">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
              <span>{item.detail}</span>
            </div>
          </Stack>
        ))}
      </dl>
    </Inline>
  );
}
