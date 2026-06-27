import { HeroChipRow } from '../page-primitives';
import { PageShell } from './page-shell';

export interface CatalogTemplateSection {
  id?: string;
  render: () => unknown;
}

export interface CatalogTemplateProps {
  title: string;
  intro: string;
  jumpLinks?: Array<{ href: string; label: string }>;
  sections: CatalogTemplateSection[];
}

export function CatalogTemplate(props: CatalogTemplateProps) {
  return (
    <PageShell
      title={props.title}
      intro={props.intro}
      heroChildren={
        props.jumpLinks && props.jumpLinks.length > 0 ? (
          <HeroChipRow links={props.jumpLinks} />
        ) : undefined
      }
    >
      {props.sections.map((section) => section.render())}
    </PageShell>
  );
}
