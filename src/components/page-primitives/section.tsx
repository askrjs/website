export interface SectionHeadProps {
  kicker: string;
  title: string;
  description: string;
}

export function SectionHead(props: SectionHeadProps) {
  return (
    <div class="section-head">
      <span class="section-kicker">{props.kicker}</span>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}

export interface PageSectionProps extends SectionHeadProps {
  id?: string;
  panel?: boolean;
  splitBand?: boolean;
  className?: string;
  children?: unknown;
}

export function PageSection(props: PageSectionProps) {
  const classNames = ["section-block"];

  if (props.panel) classNames.push("panel");
  if (props.splitBand) classNames.push("split-band");
  if (props.className) classNames.push(props.className);

  return (
    <section id={props.id} class={classNames.join(" ")}>
      <SectionHead
        kicker={props.kicker}
        title={props.title}
        description={props.description}
      />
      {props.children}
    </section>
  );
}
