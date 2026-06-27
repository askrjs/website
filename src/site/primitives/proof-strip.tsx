import { Flex, Stack } from '@askrjs/themes/layouts';

export interface ProofItem {
  value: string;
  label: string;
  detail: string;
}

export function ProofStrip(props: { items: ProofItem[] }) {
  return (
    <Flex asChild gap="3" wrap="wrap">
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
    </Flex>
  );
}
