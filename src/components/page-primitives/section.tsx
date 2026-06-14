export interface SectionHeadProps {
  kicker: string;
  title: string;
  description?: string;
}

export function SectionHead(props: SectionHeadProps) {
  return (
    <div class="section-head">
      <span class="section-kicker">{props.kicker}</span>
      <h2>{props.title}</h2>
      {props.description ? <p>{props.description}</p> : null}
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
  const classNames = ['section-block'];

  if (props.panel) classNames.push('panel');
  if (props.splitBand) classNames.push('split-band');
  if (props.className) classNames.push(props.className);

  return (
    <section id={props.id} class={classNames.join(' ')}>
      <SectionHead
        kicker={props.kicker}
        title={props.title}
        description={props.description}
      />
      {props.children}
    </section>
  );
}

export interface SplitSectionProps extends SectionHeadProps {
  id?: string;
  className?: string;
  reverse?: boolean;
  children?: unknown;
}

export function SplitSection(props: SplitSectionProps) {
  const classNames = ['page-section-split'];

  if (props.className) classNames.push(props.className);
  if (props.reverse) {
    classNames.push('page-section-split-reverse');
    if (props.className) classNames.push(`${props.className}-reverse`);
  }

  return (
    <section id={props.id} class={classNames.join(' ')}>
      <SectionHead
        kicker={props.kicker}
        title={props.title}
        description={props.description}
      />
      {props.children}
    </section>
  );
}
