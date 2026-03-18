import { ButtonDemo } from "./button-demo";
import { ToggleDemo } from "./toggle-demo";
import { TabsDemo } from "./tabs-demo";
import { AccordionDemo } from "./accordion-demo";
import { InputDemo } from "./input-demo";
import { CheckboxDemo } from "./checkbox-demo";
import { SwitchDemo } from "./switch-demo";
import { BadgeDemo } from "./badge-demo";
import { DialogDemo } from "./dialog-demo";
import { SliderDemo } from "./slider-demo";
import { ProgressDemo } from "./progress-demo";
import { RadioGroupDemo } from "./radio-group-demo";
import { SelectDemo } from "./select-demo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const demos: Record<string, () => any> = {
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
  "radio-group": RadioGroupDemo,
  select: SelectDemo,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDemoForSlug(slug: string): (() => any) | null {
  return demos[slug] ?? null;
}
