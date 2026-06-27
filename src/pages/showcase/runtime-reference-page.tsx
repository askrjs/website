import { ShowcaseTemplate } from '../../shared/page-templates';

export function AskrPage() {
  return (
    <ShowcaseTemplate
      badge="Reference"
      title="Runtime reference"
      summary="State, derived values, resource(), routing, SSR, and SSG notes for building Askr pages."
      bullets={[
        'Choose SPA, SSR, or SSG based on how fresh the HTML needs to be',
        'Use state(), derive(), and resource() for local state, computed reads, and async data',
        'Keep route handlers app-only so client, server, and static boot paths can share them',
      ]}
      metrics={[
        { label: 'Render modes', value: '3' },
        { label: 'State primitives', value: '3+' },
        { label: 'Shared route table', value: '1' },
      ]}
    />
  );
}
