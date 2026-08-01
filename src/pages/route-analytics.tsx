import type { Props } from '@askrjs/askr';
import { onRouteChange, type RouteSnapshot } from '@askrjs/askr/router';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export interface PageViewPayload {
  readonly page_location: string;
  readonly page_title: string;
}

interface PageViewTarget {
  readonly pageLocation: string;
  readonly pageTitle: string;
  readonly gtag?: (...args: unknown[]) => void;
  readonly dataLayer?: unknown[];
}

type RouteChangeSubscriber = typeof onRouteChange;

export function createPageViewPayload(
  pageLocation: string,
  pageTitle: string
): PageViewPayload {
  return {
    page_location: pageLocation,
    page_title: pageTitle,
  };
}

export function emitPageView(target: PageViewTarget): boolean {
  const payload = createPageViewPayload(target.pageLocation, target.pageTitle);

  if (target.gtag) {
    target.gtag('event', 'page_view', payload);
    return true;
  }

  if (target.dataLayer) {
    target.dataLayer.push(['event', 'page_view', payload]);
    return true;
  }

  return false;
}

function routePageKey(route: RouteSnapshot): string {
  return `${route.path}\0${JSON.stringify(route.query.toJSON())}`;
}

export function queueCurrentPageView(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Askr commits route components before it reconciles history and metadata.
  // Queueing the event lets page_location and page_title observe that completed
  // navigation rather than the document that initiated it.
  queueMicrotask(() => {
    emitPageView({
      pageLocation: window.location.href,
      pageTitle: document.title,
      gtag: window.gtag,
      dataLayer: window.dataLayer,
    });
  });
}

export function observeRoutePageViews(
  subscribe: RouteChangeSubscriber = onRouteChange,
  emit: () => void = queueCurrentPageView
): void {
  subscribe(
    (current, previous) => {
      if (previous && routePageKey(current) === routePageKey(previous)) return;
      emit();
    },
    { immediate: true }
  );
}

export function RouteAnalyticsLayout({ children }: Props) {
  observeRoutePageViews();
  return <>{children}</>;
}
