import { LinkCardGrid } from '../link-cards';
import { PageSection } from './section';
import type { SiteLink } from '../../site/navigation';

export interface CatalogGroup {
  id?: string;
  kicker: string;
  title: string;
  description: string;
  links: SiteLink[];
  gridClassName?: string;
}

export function CatalogSection(props: CatalogGroup) {
  return (
    <PageSection
      id={props.id}
      kicker={props.kicker}
      title={props.title}
      description={props.description}
    >
      <LinkCardGrid links={props.links} className={props.gridClassName} />
    </PageSection>
  );
}
