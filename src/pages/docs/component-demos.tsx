import { state } from '@askrjs/askr';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Calendar,
  Checkbox,
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toast,
  ToastDescription,
  ToastHost,
  ToastTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@askrjs/themes/components';
import type { ComponentDemoDefinition } from './types';

function DemoFrame({ children }: { children: any }) {
  return <div class="component-demo__surface">{children}</div>;
}

function DialogDemo() {
  return (
    <DemoFrame>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Project settings</DialogTitle>
          <DialogDescription>
            Changes are visible immediately.
          </DialogDescription>
          <Button>Save settings</Button>
        </DialogContent>
      </Dialog>
    </DemoFrame>
  );
}
function SelectDemo() {
  const value = state('active');
  return (
    <DemoFrame>
      <Select value={value()} onValueChange={value.set}>
        <SelectTrigger aria-label="Project status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="paused">Paused</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
    </DemoFrame>
  );
}
function ComboboxDemo() {
  const value = state('maya');
  return (
    <DemoFrame>
      <Combobox value={value()} onValueChange={value.set}>
        <ComboboxInput
          aria-label="Project owner"
          placeholder="Choose an owner"
        />
        <ComboboxList>
          <ComboboxOption value="maya">Maya</ComboboxOption>
          <ComboboxOption value="leo">Leo</ComboboxOption>
          <ComboboxOption value="sam">Sam</ComboboxOption>
        </ComboboxList>
      </Combobox>
    </DemoFrame>
  );
}
function TabsDemo() {
  const value = state('overview');
  return (
    <DemoFrame>
      <Tabs value={value()} onValueChange={value.set}>
        <TabsList aria-label="Project sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Project health is good.</TabsContent>
        <TabsContent value="activity">No recent activity.</TabsContent>
      </Tabs>
    </DemoFrame>
  );
}
function AccordionDemo() {
  return (
    <DemoFrame>
      <Accordion type="single" collapsible>
        <AccordionItem value="billing">
          <AccordionTrigger>How billing works</AccordionTrigger>
          <AccordionContent>
            Usage is calculated per workspace.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="access">
          <AccordionTrigger>Who can access the project?</AccordionTrigger>
          <AccordionContent>
            Workspace members can be assigned roles.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </DemoFrame>
  );
}
function SwitchDemo() {
  const checked = state(false);
  return (
    <DemoFrame>
      <Switch
        checked={checked()}
        onCheckedChange={checked.set}
        aria-label="Public project"
      />
    </DemoFrame>
  );
}
function SliderDemo() {
  const value = state(42);
  return (
    <DemoFrame>
      <Slider
        aria-label="Capacity"
        min={0}
        max={100}
        value={value()}
        onValueChange={value.set}
      />
    </DemoFrame>
  );
}
function CheckboxDemo() {
  const checked = state(true);
  return (
    <DemoFrame>
      <Checkbox
        checked={checked()}
        onCheckedChange={checked.set}
        aria-label="Email updates"
      />
    </DemoFrame>
  );
}
function CalendarDemo() {
  return (
    <DemoFrame>
      <Calendar aria-label="Project calendar" />
    </DemoFrame>
  );
}
function RadioDemo() {
  const value = state('team');
  return (
    <DemoFrame>
      <RadioGroup value={value()} onValueChange={value.set} aria-label="Plan">
        <label>
          <RadioGroupItem value="team" /> Team
        </label>
        <label>
          <RadioGroupItem value="business" /> Business
        </label>
      </RadioGroup>
    </DemoFrame>
  );
}
function PopoverDemo() {
  return (
    <DemoFrame>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Filters</Button>
        </PopoverTrigger>
        <PopoverContent>Filter projects by status.</PopoverContent>
      </Popover>
    </DemoFrame>
  );
}
function TooltipDemo() {
  return (
    <DemoFrame>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button aria-label="Archive project">Archive</Button>
        </TooltipTrigger>
        <TooltipContent>Move this project to the archive.</TooltipContent>
      </Tooltip>
    </DemoFrame>
  );
}
function MenuDemo() {
  return (
    <DemoFrame>
      <Dropdown>
        <DropdownTrigger aria-label="Project actions">Actions</DropdownTrigger>
        <DropdownContent>
          <DropdownItem onSelect={() => undefined}>Archive</DropdownItem>
          <DropdownItem onSelect={() => undefined}>Duplicate</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </DemoFrame>
  );
}
function ToastDemo() {
  const open = state(true);
  return (
    <DemoFrame>
      <ToastHost>
        <Toast open={open()} onOpenChange={open.set}>
          <ToastTitle>Project saved</ToastTitle>
          <ToastDescription>Your changes are now visible.</ToastDescription>
        </Toast>
      </ToastHost>
    </DemoFrame>
  );
}

function defineDemo(
  title: string,
  description: string,
  component: (props: any) => any
): ComponentDemoDefinition {
  return {
    title,
    description,
    component,
    load: async () => ({ default: component }),
  };
}

const demos: Record<string, ComponentDemoDefinition> = {
  Dialog: defineDemo(
    'Try Dialog',
    'Open and dismiss a modal while focus stays managed.',
    DialogDemo
  ),
  Select: defineDemo(
    'Try Select',
    'Choose an option with keyboard navigation.',
    SelectDemo
  ),
  'Combobox and Command': defineDemo(
    'Try Combobox',
    'Filter and select an owner from a searchable list.',
    ComboboxDemo
  ),
  Tabs: defineDemo(
    'Try Tabs',
    'Switch between panels without losing the active tab.',
    TabsDemo
  ),
  'Accordion and Collapsible': defineDemo(
    'Try Accordion',
    'Expand one panel at a time and inspect its state.',
    AccordionDemo
  ),
  Switch: defineDemo('Try Switch', 'Toggle a boolean setting.', SwitchDemo),
  Slider: defineDemo(
    'Try Slider',
    'Adjust a value with pointer or keyboard input.',
    SliderDemo
  ),
  Checkbox: defineDemo(
    'Try Checkbox',
    'Toggle an independent option.',
    CheckboxDemo
  ),
  'Calendar and Date Picker': defineDemo(
    'Try Calendar',
    'Browse a calendar surface for date selection.',
    CalendarDemo
  ),
  'Radio Group': defineDemo(
    'Try Radio Group',
    'Choose exactly one option from a group.',
    RadioDemo
  ),
  Popover: defineDemo(
    'Try Popover',
    'Open contextual content anchored to a trigger.',
    PopoverDemo
  ),
  Tooltip: defineDemo(
    'Try Tooltip',
    'Reveal supporting text from an accessible trigger.',
    TooltipDemo
  ),
  'Menu, Dropdown, and Context Menu': defineDemo(
    'Try Menu',
    'Open actions and select an item.',
    MenuDemo
  ),
  'Toast and Sonner': defineDemo(
    'Try Toast',
    'Dismiss transient feedback from the viewport.',
    ToastDemo
  ),
};

export function componentDemoFor(
  title: string
): ComponentDemoDefinition | undefined {
  return demos[title];
}
export const componentDemoTitles = Object.freeze(Object.keys(demos));
