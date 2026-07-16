import { Inline, Stack } from '@askrjs/themes/components';

type IconComponent = (props: {
  class?: string;
  className?: string;
  title?: string;
  size?: number | string;
}) => unknown;

export interface IconFeature {
  icon: IconComponent;
  title: string;
  description: string;
}

export function IconFeatureList(props: { features: IconFeature[] }) {
  return (
    <Inline class="icon-feature-list" gap="3" wrap="wrap">
      {props.features.map((feature) => {
        const Icon = feature.icon;
        return (
          <Stack asChild gap="2">
            <article>
              <span class="feature-icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          </Stack>
        );
      })}
    </Inline>
  );
}
