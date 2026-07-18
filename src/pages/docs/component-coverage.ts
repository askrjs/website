const familyRoutes = [
  {
    match: /accordion|collapsible/,
    route: '/docs/components/accordion-and-collapsible',
  },
  { match: /alert-dialog/, route: '/docs/components/alert-dialog' },
  {
    match: /alert|badge|empty|skeleton|spinner|stat/,
    route: '/docs/components/alert-badge-empty-skeleton-spinner-and-stat',
  },
  { match: /avatar|item/, route: '/docs/components/avatar-and-item' },
  {
    match: /breadcrumb|pagination/,
    route: '/docs/components/breadcrumb-and-pagination',
  },
  {
    match: /button-group|button/,
    route: '/docs/components/button-and-button-group',
  },
  {
    match: /calendar|date-picker/,
    route: '/docs/components/calendar-and-date-picker',
  },
  { match: /checkbox/, route: '/docs/components/checkbox' },
  { match: /combobox|command/, route: '/docs/components/combobox-and-command' },
  {
    match: /context-menu|dropdown|menu(?!bar)/,
    route: '/docs/components/menu-dropdown-and-context-menu',
  },
  { match: /data-table/, route: '/docs/components/data-table' },
  { match: /dialog/, route: '/docs/components/dialog' },
  { match: /drawer|sheet/, route: '/docs/components/drawer-and-sheet' },
  {
    match: /field|form|input-group|label/,
    route: '/docs/components/form-label-field-and-input-group',
  },
  { match: /focus|dismissable/, route: '/docs/components/focus-and-dismissal' },
  { match: /hover-card/, route: '/docs/components/hover-card' },
  {
    match: /input-otp|native-select/,
    route: '/docs/components/native-select-and-input-otp',
  },
  { match: /input/, route: '/docs/components/input' },
  { match: /menubar/, route: '/docs/components/menubar' },
  {
    match: /navigation-menu|navbar/,
    route: '/docs/components/navbar-and-navigation-menu',
  },
  { match: /popover/, route: '/docs/components/popover' },
  { match: /progress-circle|progress/, route: '/docs/components/progress' },
  { match: /radio-group/, route: '/docs/components/radio-group' },
  { match: /scroll-area/, route: '/docs/components/scroll-area' },
  { match: /select/, route: '/docs/components/select' },
  { match: /sidebar/, route: '/docs/components/sidebar' },
  { match: /slider/, route: '/docs/components/slider' },
  { match: /sonner|toast/, route: '/docs/components/toast-and-sonner' },
  { match: /switch/, route: '/docs/components/switch' },
  { match: /table/, route: '/docs/components/table' },
  { match: /tabs/, route: '/docs/components/tabs' },
  { match: /textarea/, route: '/docs/components/textarea' },
  { match: /toggle/, route: '/docs/components/toggle-family' },
  { match: /tooltip/, route: '/docs/components/tooltip' },
  { match: /virtual-list/, route: '/docs/components/virtual-list' },
  { match: /virtual-table/, route: '/docs/components/virtual-table' },
  { match: /portal|layer/, route: '/docs/components/portals-and-layers' },
  { match: /collection/, route: '/docs/components/collections' },
  {
    match: /aria|visually-hidden|ref/,
    route: '/docs/components/aria-and-ref-utilities',
  },
] as const;

export function componentGuideRoute(
  importName: string
): `/docs${string}` | undefined {
  if (importName === '@askrjs/ui' || importName === '@askrjs/themes/components')
    return '/docs/components';
  if (
    importName === '@askrjs/themes' ||
    importName.endsWith('/default') ||
    importName.endsWith('/presets') ||
    importName.endsWith('/theme') ||
    importName.endsWith('/direction')
  )
    return '/docs/components/theme-tokens-modes-and-direction';
  const subpath = importName.split('/').slice(2).join('/');
  const family = familyRoutes.find((candidate) =>
    candidate.match.test(subpath)
  );
  return (
    family?.route ??
    (importName.startsWith('@askrjs/themes/')
      ? '/docs/components/advanced-layout'
      : undefined)
  );
}
