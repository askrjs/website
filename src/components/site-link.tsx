import { Link } from "@askrjs/askr";

import type { Props } from "../types/props";

export interface SiteAnchorProps extends Props {
  href: string;
  className?: string;
  children?: unknown;
  target?: string;
  rel?: string;
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | "true" | "false";
  "aria-label"?: string;
}

function isRouterLink(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function SiteAnchor(props: SiteAnchorProps) {
  const className = props.className;

  if (!isRouterLink(props.href)) {
    return (
      <a
        href={props.href}
        class={className}
        target={props.target}
        rel={props.rel}
        aria-current={props["aria-current"]}
        aria-label={props["aria-label"]}
      >
        {props.children}
      </a>
    );
  }

  return (
    <Link
      href={props.href}
      class={className}
      target={props.target}
      rel={props.rel}
      aria-current={props["aria-current"]}
      aria-label={props["aria-label"]}
    >
      {props.children}
    </Link>
  );
}
