import type { WebsiteDocumentMeta } from './site-routes';

export function formatDocumentTitle(meta: WebsiteDocumentMeta) {
  return meta.title === 'Askr' ? 'Askr' : `${meta.title} | Askr`;
}

export function applyDocumentMeta(meta: WebsiteDocumentMeta) {
  if (typeof document === 'undefined') return;

  document.title = formatDocumentTitle(meta);

  const selector = 'meta[name="description"]';
  let description = document.querySelector<HTMLMetaElement>(selector);

  if (!meta.description) {
    description?.remove();
    return;
  }

  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.append(description);
  }

  description.content = meta.description;
}
