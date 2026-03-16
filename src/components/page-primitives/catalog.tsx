import { jsx } from "../../runtime/jsx";

import { LinkCardGrid } from "../cards";
import { PageSection } from "./section";
import type { SiteLink } from "../../pages/shared/content";

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
