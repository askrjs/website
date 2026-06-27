interface TabsProps {
  children?: unknown;
  defaultValue?: string;
  value?: string;
}

export function Tabs({ children, defaultValue, value }: TabsProps) {
  const activeValue = value ?? defaultValue;
  const activeClass = activeValue ? ` tabs-root--${activeValue}` : '';

  return <div class={`tabs-root${activeClass}`}>{children}</div>;
}

interface TabsListProps {
  children?: unknown;
}

export function TabsList({ children }: TabsListProps) {
  return <div class="tabs-list">{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children?: unknown;
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  return (
    <button
      type="button"
      class={`tabs-trigger tabs-trigger--${value}`}
      data-value={value}
      aria-label={`Open ${value} tab`}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children?: unknown;
}

export function TabsContent({ value, children }: TabsContentProps) {
  return (
    <div class="tabs-content" data-value={value}>
      {children}
    </div>
  );
}
