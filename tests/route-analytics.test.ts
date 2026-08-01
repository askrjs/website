import type { RouteSnapshot } from '@askrjs/askr/router';
import { describe, expect, it, vi } from 'vitest';
import {
  createPageViewPayload,
  emitPageView,
  observeRoutePageViews,
  RouteAnalyticsLayout,
} from '../src/pages/route-analytics';
import { routeRegistry } from '../src/pages/_routes';

function route(
  path: string,
  query: Record<string, string | string[]> = {},
  hash: string | null = null
): RouteSnapshot {
  return {
    path,
    params: {},
    query: {
      get: (key) => {
        const value = query[key];
        return Array.isArray(value) ? (value[0] ?? null) : (value ?? null);
      },
      getAll: (key) => {
        const value = query[key];
        return value === undefined
          ? []
          : Array.isArray(value)
            ? value
            : [value];
      },
      has: (key) => key in query,
      toJSON: () => query,
    },
    hash,
    matches: [],
  };
}

describe('route analytics', () => {
  it('is the persistent outer layout for every registered route', () => {
    expect(routeRegistry.manifest.records.length).toBeGreaterThan(0);
    expect(
      routeRegistry.manifest.records.every(
        (record) => record.layoutChain[0]?.component === RouteAnalyticsLayout
      )
    ).toBe(true);
  });

  it('builds the GA4 page_view payload', () => {
    expect(
      createPageViewPayload(
        'https://askrjs.com/docs?source=nav',
        'Documentation | Askr'
      )
    ).toEqual({
      page_location: 'https://askrjs.com/docs?source=nav',
      page_title: 'Documentation | Askr',
    });
  });

  it('uses gtag when available and the dataLayer queue otherwise', () => {
    const gtag = vi.fn();
    const dataLayer: unknown[] = [];

    expect(
      emitPageView({
        pageLocation: 'https://askrjs.com/platform',
        pageTitle: 'Platform | Askr',
        gtag,
        dataLayer,
      })
    ).toBe(true);
    expect(gtag).toHaveBeenCalledWith('event', 'page_view', {
      page_location: 'https://askrjs.com/platform',
      page_title: 'Platform | Askr',
    });
    expect(dataLayer).toEqual([]);

    expect(
      emitPageView({
        pageLocation: 'https://askrjs.com/docs',
        pageTitle: 'Documentation | Askr',
        dataLayer,
      })
    ).toBe(true);
    expect(dataLayer).toEqual([
      [
        'event',
        'page_view',
        {
          page_location: 'https://askrjs.com/docs',
          page_title: 'Documentation | Askr',
        },
      ],
    ]);

    expect(
      emitPageView({
        pageLocation: 'https://askrjs.com/',
        pageTitle: 'Askr',
      })
    ).toBe(false);
  });

  it('subscribes immediately, tracks path and query commits, and ignores hashes', () => {
    let callback:
      | ((current: RouteSnapshot, previous: RouteSnapshot | null) => void)
      | undefined;
    const subscribe = vi.fn((next, options) => {
      callback = next;
      expect(options).toEqual({ immediate: true });
    });
    const emit = vi.fn();

    observeRoutePageViews(subscribe, emit);

    expect(subscribe).toHaveBeenCalledOnce();
    callback!(route('/'), null);
    callback!(route('/platform'), route('/'));
    callback!(route('/platform', { source: 'docs' }), route('/platform'));
    callback!(
      route('/platform', { source: 'docs' }, 'details'),
      route('/platform', { source: 'docs' })
    );

    expect(emit).toHaveBeenCalledTimes(3);
  });
});
