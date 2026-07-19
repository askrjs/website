import { navigate, type LinkProps } from '@askrjs/askr/router';

type DocsLinkProps = Omit<LinkProps, 'href' | 'to' | 'onClick'> & {
  href: string;
  onClick?: (event: Event) => void;
};

type TransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => {
    finished: Promise<void>;
  };
};

function waitForNavigation(target: URL): Promise<void> {
  const expected = `${target.pathname}${target.search}${target.hash}`;
  const deadline = performance.now() + 2_000;
  return new Promise((resolve) => {
    const check = () => {
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (current === expected || performance.now() >= deadline) {
        window.requestAnimationFrame(() => resolve());
        return;
      }
      window.requestAnimationFrame(check);
    };
    check();
  });
}

export function DocsLink({ href, onClick, ...props }: DocsLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event: MouseEvent) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey ||
          props.target
        ) {
          return;
        }

        const target = new URL(href, window.location.href);
        if (target.origin !== window.location.origin) return;
        event.preventDefault();

        const currentPath = `${window.location.pathname}${window.location.search}`;
        const targetPath = `${target.pathname}${target.search}`;
        const transitionDocument = document as TransitionDocument;
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;
        if (
          currentPath === targetPath ||
          reduceMotion ||
          !transitionDocument.startViewTransition
        ) {
          navigate(`${target.pathname}${target.search}${target.hash}`);
          return;
        }

        const transition = transitionDocument.startViewTransition(async () => {
          navigate(`${target.pathname}${target.search}${target.hash}`);
          await waitForNavigation(target);
        });
        void transition.finished.catch(() => undefined);
      }}
    />
  );
}
