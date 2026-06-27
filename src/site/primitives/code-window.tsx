export interface CodeWindowProps {
  label: string;
  code: string;
  meta?: string;
}

export function CodeWindow(props: CodeWindowProps) {
  return (
    <figure class="code-window">
      <figcaption>
        <span>{props.label}</span>
        {props.meta ? <small>{props.meta}</small> : null}
      </figcaption>
      <pre>
        <code>{props.code}</code>
      </pre>
    </figure>
  );
}
