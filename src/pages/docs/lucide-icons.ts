import * as iconExports from '@askrjs/lucide';
import { CircleIcon } from '@askrjs/lucide';

export type LucideIconComponent = typeof CircleIcon;

export const lucideIcons = Object.entries(iconExports)
  .filter(
    ([name, value]) => name.endsWith('Icon') && typeof value === 'function'
  )
  .map(([name, value]) => ({
    name,
    Icon: value as LucideIconComponent,
  }))
  .sort((left, right) => left.name.localeCompare(right.name));

export const lucideIconsByName = new Map(
  lucideIcons.map(({ name, Icon }) => [name, Icon])
);
