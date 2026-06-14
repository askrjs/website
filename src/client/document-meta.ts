import { getWebsiteDocumentMeta } from '../pages/_routes';
import { applyDocumentMeta } from '../utils/document-meta';

const routeChangeEvent = 'askr-website:routechange';

let installed = false;

function syncDocumentMeta() {
  applyDocumentMeta(getWebsiteDocumentMeta(window.location.pathname));
}

function scheduleDocumentMetaSync() {
  queueMicrotask(syncDocumentMeta);
}

function wrapHistoryMethod(method: 'pushState' | 'replaceState') {
  const original = window.history[method];

  window.history[method] = function wrappedHistoryMethod(...args) {
    const result = original.apply(this, args);
    window.dispatchEvent(new Event(routeChangeEvent));
    return result;
  };
}

export function installWebsiteDocumentMetaSync() {
  if (installed || typeof window === 'undefined') return;

  installed = true;
  wrapHistoryMethod('pushState');
  wrapHistoryMethod('replaceState');

  window.addEventListener(routeChangeEvent, scheduleDocumentMetaSync);
  window.addEventListener('popstate', scheduleDocumentMetaSync);
  window.addEventListener('hashchange', scheduleDocumentMetaSync);

  syncDocumentMeta();
}
