import type { RouteHandler, RouteParams } from '@askrjs/askr/router';
import { ThemeProvider, type ThemeOption } from '@askrjs/themes/theme';

const WEBSITE_THEME_OPTIONS: readonly ThemeOption[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

function getInitialTheme() {
  if (typeof document === 'undefined') {
    return 'light';
  }

  const theme = document.documentElement.getAttribute('data-theme');

  if (theme === 'dark' || theme === 'light') {
    return theme;
  }

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  return 'light';
}

export function WebsiteProviders(props: { children?: unknown }) {
  if (typeof window === 'undefined') {
    return <div data-slot="theme-provider">{props.children}</div>;
  }

  return (
    <ThemeProvider
      defaultTheme={getInitialTheme()}
      storageKey="theme"
      themes={WEBSITE_THEME_OPTIONS}
    >
      {props.children}
    </ThemeProvider>
  );
}

function WebsiteRouteContent(props: {
  context?: { signal: AbortSignal };
  handler: RouteHandler;
  params: RouteParams;
}) {
  return props.handler(props.params, props.context);
}

export function withWebsiteProviders(handler: RouteHandler): RouteHandler {
  return (params: RouteParams, context?: { signal: AbortSignal }) => (
    <WebsiteProviders>
      <WebsiteRouteContent
        context={context}
        handler={handler}
        params={params}
      />
    </WebsiteProviders>
  );
}
