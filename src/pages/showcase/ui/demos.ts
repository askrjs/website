import { ButtonDemo } from './demos/button-demo';
import { ToggleDemo } from './demos/toggle-demo';
import { TabsDemo } from './demos/tabs-demo';
import { AccordionDemo } from './demos/accordion-demo';
import { InputDemo } from './demos/input-demo';
import { CheckboxDemo } from './demos/checkbox-demo';
import { SwitchDemo } from './demos/switch-demo';
import { BadgeDemo } from './demos/badge-demo';
import { DialogDemo } from './demos/dialog-demo';
import { SliderDemo } from './demos/slider-demo';
import { ProgressDemo } from './demos/progress-demo';
import { RadioGroupDemo } from './demos/radio-group-demo';
import { SelectDemo } from './demos/select-demo';

type DemoRenderer = () => unknown;

const demos: Record<string, DemoRenderer> = {
  button: ButtonDemo,
  toggle: ToggleDemo,
  tabs: TabsDemo,
  accordion: AccordionDemo,
  input: InputDemo,
  checkbox: CheckboxDemo,
  switch: SwitchDemo,
  badge: BadgeDemo,
  dialog: DialogDemo,
  slider: SliderDemo,
  progress: ProgressDemo,
  'radio-group': RadioGroupDemo,
  select: SelectDemo,
};

export function getDemoForSlug(slug: string): DemoRenderer | null {
  return demos[slug] ?? null;
}
