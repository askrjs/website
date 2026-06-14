export function CodeSnippetBlock(props: { snippet: string }) {
  return (
    <pre class="code-block">
      <code>{props.snippet}</code>
    </pre>
  );
}
