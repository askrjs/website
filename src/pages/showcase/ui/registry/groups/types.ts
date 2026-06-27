export interface UiComponentSeed {
  slug: string;
  title: string;
  exportName: string;
}

export interface UiComponentMeta extends UiComponentSeed {
  category: string;
  description: string;
}

export interface UiComponentGroup {
  title: string;
  items: UiComponentMeta[];
}

export interface UiComponentSource {
  importFrom?: string;
  importName: string;
  label: string;
}

export interface UiComponentUsage {
  source: string;
  state: string;
  events: string;
  accessibility: string;
  composition: string;
}

const componentDescriptions: Record<string, string> = {
  button:
    'Use Button for actions that submit, save, open, or mutate local state.',
  toggle:
    'Use Toggle for a single pressed/unpressed setting such as bold, mute, or preview.',
  checkbox:
    'Use Checkbox for one boolean form value or one item inside a checklist.',
  'visually-hidden':
    'Use Visually Hidden to keep labels and instructions available to assistive technology without changing layout.',
  separator:
    'Use Separator to divide related groups when spacing alone is not enough.',
  label: 'Use Label to connect form text to the control it names.',
  input:
    'Use Input for short single-line text values such as names, filters, and URLs.',
  textarea: 'Use Textarea for longer free-form text where line breaks matter.',
  field: 'Use Field to group a label, control, hint, and validation message.',
  'radio-group':
    'Use Radio Group when the user must choose one option from a small set.',
  switch:
    'Use Switch for an immediate on/off setting that takes effect without form submission.',
  'focus-ring':
    'Use Focus Ring styling to make keyboard focus visible without changing pointer states.',
  'focus-scope':
    'Use Focus Scope to contain tab order inside dialogs, popovers, and temporary panels.',
  'dismissable-layer':
    'Use Dismissable Layer for UI that closes on Escape, outside press, or focus leaving the layer.',
  dialog:
    'Use Dialog for focused tasks that require a modal layer and explicit dismissal.',
  'alert-dialog':
    'Use Alert Dialog for destructive or irreversible decisions that need confirmation.',
  popover:
    'Use Popover for contextual controls that stay connected to a trigger.',
  tooltip:
    'Use Tooltip for short supplemental text that is not required to complete a task.',
  menu: 'Use Menu for command lists where arrow-key navigation and item activation matter.',
  'dropdown-menu':
    'Use Dropdown Menu for trigger-owned command groups, filters, and compact actions.',
  select:
    'Use Select when one value must be chosen from a list that is too long for radio buttons.',
  collapsible:
    'Use Collapsible to reveal one optional region without implying a full content hierarchy.',
  accordion:
    'Use Accordion for grouped sections where users compare or expand one topic at a time.',
  tabs: 'Use Tabs to switch between peer panels without leaving the current route.',
  badge:
    'Use Badge to label status, category, or compact metadata without creating a button.',
  avatar:
    'Use Avatar to show a person, workspace, or fallback initials in identity rows.',
  skeleton:
    'Use Skeleton to reserve layout while content is loading and avoid page jumps.',
  progress:
    'Use Progress for known completion values such as upload, setup, or processing steps.',
  'progress-circle':
    'Use Progress Circle when completion needs to fit inside a compact control or status area.',
  spinner:
    'Use Spinner for indeterminate waits where no percentage is available.',
  toast:
    'Use Toast for transient feedback after an action, with an escape path for important actions.',
  breadcrumb:
    'Use Breadcrumb to show hierarchy and provide a route back to parent pages.',
  pagination:
    'Use Pagination to move through indexed result pages without losing route context.',
  'toggle-group':
    'Use Toggle Group when a small set of related options can be selected as one or many values.',
  slider:
    'Use Slider for bounded numeric input where direct manipulation is faster than typing.',
  menubar:
    'Use Menubar for persistent command menus that need desktop-style keyboard behavior.',
  'navigation-menu':
    'Use Navigation Menu patterns for grouped site navigation and active route state.',
  container:
    'Use Container to keep page content aligned to a readable maximum width.',
  stack: 'Use Stack to create vertical rhythm between related elements.',
  inline:
    'Use Inline to align controls, tags, and short text groups on one row.',
  grid: 'Use Grid to compare sibling cards, examples, or metrics in consistent columns.',
  center: 'Use Center to place one item in the middle of an available region.',
  spacer:
    'Use Spacer when a layout needs intentional empty space from the spacing scale.',
  'sidebar-layout':
    'Use Sidebar Layout for pages with persistent local navigation beside main content.',
  'topbar-layout':
    'Use Topbar Layout for application screens with global actions above the main region.',
};

const componentSources: Record<string, UiComponentSource> = {
  button: {
    importFrom: '@askrjs/ui/button',
    importName: 'Button',
    label: '@askrjs/ui/button',
  },
  toggle: {
    importFrom: '@askrjs/ui/toggle',
    importName: 'Toggle',
    label: '@askrjs/ui/toggle',
  },
  checkbox: {
    importFrom: '@askrjs/ui/checkbox',
    importName: 'Checkbox',
    label: '@askrjs/ui/checkbox',
  },
  'visually-hidden': {
    importFrom: '@askrjs/ui/visually-hidden',
    importName: 'VisuallyHidden',
    label: '@askrjs/ui/visually-hidden',
  },
  label: {
    importFrom: '@askrjs/ui/label',
    importName: 'Label',
    label: '@askrjs/ui/label',
  },
  input: {
    importFrom: '@askrjs/ui/input',
    importName: 'Input',
    label: '@askrjs/ui/input',
  },
  textarea: {
    importFrom: '@askrjs/ui/textarea',
    importName: 'Textarea',
    label: '@askrjs/ui/textarea',
  },
  'radio-group': {
    importFrom: '@askrjs/ui/radio-group',
    importName: 'RadioGroup',
    label: '@askrjs/ui/radio-group',
  },
  switch: {
    importFrom: '@askrjs/ui/switch',
    importName: 'Switch',
    label: '@askrjs/ui/switch',
  },
  'focus-scope': {
    importFrom: '@askrjs/ui/focus-scope',
    importName: 'FocusScope',
    label: '@askrjs/ui/focus-scope',
  },
  'dismissable-layer': {
    importFrom: '@askrjs/ui/dismissable-layer',
    importName: 'DismissableLayer',
    label: '@askrjs/ui/dismissable-layer',
  },
  dialog: {
    importFrom: '@askrjs/ui/dialog',
    importName: 'Dialog',
    label: '@askrjs/ui/dialog',
  },
  'alert-dialog': {
    importFrom: '@askrjs/ui/alert-dialog',
    importName: 'AlertDialog',
    label: '@askrjs/ui/alert-dialog',
  },
  popover: {
    importFrom: '@askrjs/ui/popover',
    importName: 'Popover',
    label: '@askrjs/ui/popover',
  },
  tooltip: {
    importFrom: '@askrjs/ui/tooltip',
    importName: 'Tooltip',
    label: '@askrjs/ui/tooltip',
  },
  menu: {
    importFrom: '@askrjs/ui/menu',
    importName: 'Menu',
    label: '@askrjs/ui/menu',
  },
  'dropdown-menu': {
    importFrom: '@askrjs/ui/dropdown',
    importName: 'Dropdown',
    label: '@askrjs/ui/dropdown',
  },
  select: {
    importFrom: '@askrjs/ui/select',
    importName: 'Select',
    label: '@askrjs/ui/select',
  },
  collapsible: {
    importFrom: '@askrjs/ui/collapsible',
    importName: 'Collapsible',
    label: '@askrjs/ui/collapsible',
  },
  accordion: {
    importFrom: '@askrjs/ui/accordion',
    importName: 'Accordion',
    label: '@askrjs/ui/accordion',
  },
  avatar: {
    importFrom: '@askrjs/ui/avatar',
    importName: 'Avatar',
    label: '@askrjs/ui/avatar',
  },
  progress: {
    importFrom: '@askrjs/ui/progress',
    importName: 'Progress',
    label: '@askrjs/ui/progress',
  },
  'progress-circle': {
    importFrom: '@askrjs/ui/progress-circle',
    importName: 'ProgressCircle',
    label: '@askrjs/ui/progress-circle',
  },
  toast: {
    importFrom: '@askrjs/ui/toast',
    importName: 'Toast',
    label: '@askrjs/ui/toast',
  },
  'toggle-group': {
    importFrom: '@askrjs/ui/toggle-group',
    importName: 'ToggleGroup',
    label: '@askrjs/ui/toggle-group',
  },
  slider: {
    importFrom: '@askrjs/ui/slider',
    importName: 'Slider',
    label: '@askrjs/ui/slider',
  },
  menubar: {
    importFrom: '@askrjs/ui/menubar',
    importName: 'Menubar',
    label: '@askrjs/ui/menubar',
  },
  field: {
    importFrom: '@askrjs/themes/controls',
    importName: 'Field',
    label: '@askrjs/themes/controls',
  },
  separator: {
    importFrom: '@askrjs/themes/surfaces',
    importName: 'Separator',
    label: '@askrjs/themes/surfaces',
  },
  badge: {
    importFrom: '@askrjs/themes/surfaces',
    importName: 'Badge',
    label: '@askrjs/themes/surfaces',
  },
  skeleton: {
    importFrom: '@askrjs/themes/surfaces',
    importName: 'Skeleton',
    label: '@askrjs/themes/surfaces',
  },
  spinner: {
    importFrom: '@askrjs/themes/feedback',
    importName: 'Spinner',
    label: '@askrjs/themes/feedback',
  },
  breadcrumb: {
    importFrom: '@askrjs/themes/navs',
    importName: 'Breadcrumb',
    label: '@askrjs/themes/navs',
  },
  pagination: {
    importFrom: '@askrjs/themes/navs',
    importName: 'Pagination',
    label: '@askrjs/themes/navs',
  },
  container: {
    importFrom: '@askrjs/themes/layouts',
    importName: 'Container',
    label: '@askrjs/themes/layouts',
  },
  stack: {
    importFrom: '@askrjs/themes/layouts',
    importName: 'Stack',
    label: '@askrjs/themes/layouts',
  },
  inline: {
    importFrom: '@askrjs/themes/layouts',
    importName: 'Inline',
    label: '@askrjs/themes/layouts',
  },
  spacer: {
    importFrom: '@askrjs/themes/layouts',
    importName: 'Spacer',
    label: '@askrjs/themes/layouts',
  },
  'focus-ring': {
    importName: 'FocusRing',
    label: 'Site CSS pattern',
  },
  tabs: {
    importName: 'Tabs',
    label: 'Site demo pattern',
  },
  'navigation-menu': {
    importName: 'NavigationMenu',
    label: 'Site navigation pattern',
  },
  grid: {
    importName: 'Grid',
    label: 'Site layout pattern',
  },
  center: {
    importName: 'Center',
    label: 'Site layout pattern',
  },
  'sidebar-layout': {
    importName: 'SidebarLayout',
    label: 'Site layout pattern',
  },
  'topbar-layout': {
    importName: 'TopbarLayout',
    label: 'Site layout pattern',
  },
};

const stateGuidance: Partial<Record<string, string>> = {
  button: 'No persistent value is required; attach the action to onPress.',
  toggle: 'Store the pressed state when the toggle must be controlled.',
  checkbox:
    'Store checked state for forms or let the primitive manage default state.',
  input:
    'Store the text value when validation, filtering, or submission needs it.',
  textarea:
    'Store the text value when drafts, validation, or autosave need access to it.',
  'radio-group': 'Store one selected value for the group.',
  switch: 'Store a boolean when the setting must persist outside the control.',
  select:
    'Store the selected value and render the selected label in the trigger.',
  'toggle-group':
    'Store one value for single mode or an array of values for multiple mode.',
  slider:
    'Store the numeric value when it affects preview, validation, or submission.',
  progress: 'Pass a known numeric value or null for indeterminate progress.',
  'progress-circle':
    'Pass a known numeric value or null when progress is indeterminate.',
  spinner:
    'No value is required; render it while another operation is pending.',
};

function getSource(component: UiComponentSeed): UiComponentSource {
  return (
    componentSources[component.slug] ?? {
      importName: component.exportName,
      label: 'Package or local pattern that owns this component',
    }
  );
}

function getEventGuidance(component: UiComponentMeta) {
  if (component.category.includes('Form')) {
    return 'Wire value, change, blur, and validation handlers according to the control type.';
  }

  if (component.category.includes('Overlays')) {
    return 'Wire open state, trigger activation, Escape, outside press, and selection handlers.';
  }

  if (component.category.includes('Disclosure')) {
    return 'Wire open/value state only when the expanded panel must be controlled.';
  }

  if (component.category.includes('Navigation')) {
    return 'Wire href, active state, disabled state, and route-aware click handling.';
  }

  if (component.category.includes('Layout')) {
    return 'Set spacing, alignment, responsive behavior, and the semantic element with asChild when needed.';
  }

  return 'Wire only the events needed by the surrounding task.';
}

function getAccessibilityGuidance(component: UiComponentMeta) {
  if (component.category.includes('Overlays')) {
    return 'Confirm trigger labels, focus return, Escape handling, and screen-reader title/description text.';
  }

  if (component.category.includes('Form')) {
    return 'Connect labels, hints, errors, required state, and disabled state to the control.';
  }

  if (component.category.includes('Navigation')) {
    return 'Set aria-current for the active route and keep link text specific.';
  }

  if (component.category.includes('Layout')) {
    return 'Keep the underlying HTML semantic; layout wrappers should not hide headings, landmarks, or list structure.';
  }

  if (component.category.includes('Status')) {
    return 'Expose status text when the visual state communicates loading, progress, or identity.';
  }

  return 'Verify keyboard focus, accessible name, and role match the user task.';
}

function getCompositionGuidance(component: UiComponentMeta) {
  if (component.category.includes('Overlays')) {
    return 'Compose trigger, content, title, description, and close/action parts explicitly.';
  }

  if (component.category.includes('Layout')) {
    return 'Use it as a structural wrapper, then keep page content in the child components.';
  }

  if (component.category.includes('Navigation')) {
    return 'Compose list, item, link, current, and separator parts from route data.';
  }

  if (component.category.includes('Status')) {
    return 'Pair the visual element with nearby text so the state is understandable without color alone.';
  }

  return 'Prefer the smallest component tree that preserves label, control, and helper text relationships.';
}

export function fillDescription(seed: UiComponentSeed) {
  return (
    componentDescriptions[seed.slug] ??
    `${seed.title} reference with purpose, source package, accessibility checks, and an integration example.`
  );
}

export function getComponentSource(component: UiComponentSeed) {
  return getSource(component);
}

export function getComponentUsage(
  component: UiComponentMeta
): UiComponentUsage {
  const source = getSource(component);

  return {
    source: source.label,
    state:
      stateGuidance[component.slug] ??
      'Use local state only when the surrounding page needs to control the value.',
    events: getEventGuidance(component),
    accessibility: getAccessibilityGuidance(component),
    composition: getCompositionGuidance(component),
  };
}
