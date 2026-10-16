/** Render the small inline Markdown vocabulary used by authored docs. */
export function InlineProse({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
        .map((part, index) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={index}>{part.slice(1, -1)}</code>;
          }
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
          }
          const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
          if (link && /^(?:\/(?!\/)|https?:\/\/|mailto:)/.test(link[2]!)) {
            return (
              <a key={index} href={link[2]}>
                {link[1]}
              </a>
            );
          }
          return part;
        })}
    </>
  );
}
