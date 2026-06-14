interface BadgeProps {
  children?: unknown;
  class?: string;
  className?: string;
}

export function Badge({ children, className, class: classProp }: BadgeProps) {
  return <span class={className ?? classProp ?? 'badge-pill'}>{children}</span>;
}
