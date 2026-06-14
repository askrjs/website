interface SeparatorProps {
  class?: string;
  className?: string;
  decorative?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export function Separator({
  className,
  class: classProp,
  decorative,
  orientation = 'horizontal',
}: SeparatorProps) {
  return (
    <hr
      class={className ?? classProp ?? 'separator'}
      role={decorative ? 'none' : 'separator'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-orientation={decorative ? undefined : orientation}
    />
  );
}
