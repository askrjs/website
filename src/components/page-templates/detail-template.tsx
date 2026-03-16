import { jsx } from "../../runtime/jsx";

import { HeroChipRow } from "../page-primitives";
import { SiteShell } from "../site-shell";

export interface DetailTemplateSection {
  id: string;
  label: string;
  render: () => unknown;
}

export interface DetailTemplateProps {
  title: string;
  intro: string;
  sections: DetailTemplateSection[];
}

export function DetailTemplate(props: DetailTemplateProps) {
  return (
    <SiteShell
      title={props.title}
      intro={props.intro}
      heroChildren={
        <HeroChipRow
          links={props.sections.map((section) => ({
            href: `#${section.id}`,
            label: section.label,
          }))}
        />
      }
    >
      {props.sections.map((section) => section.render())}
    </SiteShell>
  );
}
