import { ButtonDemo } from './demos/button-demo';
import { ToggleDemo } from './demos/toggle-demo';
import { InputDemo } from './demos/input-demo';
import { CheckboxDemo } from './demos/checkbox-demo';
import { SwitchDemo } from './demos/switch-demo';
import { BadgeDemo } from './demos/badge-demo';

type DemoRenderer = () => unknown;

const demos: Record<string, DemoRenderer> = {
  button: ButtonDemo,
  toggle: ToggleDemo,
  input: InputDemo,
  checkbox: CheckboxDemo,
  switch: SwitchDemo,
  badge: BadgeDemo,
};

export function getDemoForSlug(slug: string): DemoRenderer | null {
  return demos[slug] ?? null;
}
