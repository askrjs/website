import { Link } from '@askrjs/askr/router';
import { Inline, Stack } from '@askrjs/themes/components';

export interface SignalHeroAction {
  href: string;
  label: string;
  detail: string;
}

export interface SignalHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  primary: SignalHeroAction;
  secondary: SignalHeroAction;
  children?: unknown;
}

export function SignalHero(props: SignalHeroProps) {
  return (
    <Inline class="signal-hero" gap="6" align="stretch" wrap="wrap">
      <Stack class="signal-hero-copy" gap="4">
        <span class="section-kicker">{props.eyebrow}</span>
        <h1>{props.title}</h1>
        <p>{props.intro}</p>
        <Inline class="signal-hero-actions" gap="3" wrap="wrap">
          <Stack asChild gap="1">
            <Link href={props.primary.href} class="cta-primary">
              <span>{props.primary.label}</span>
              <small>{props.primary.detail}</small>
            </Link>
          </Stack>
          <Stack asChild gap="1">
            <Link href={props.secondary.href} class="cta-secondary">
              <span>{props.secondary.label}</span>
              <small>{props.secondary.detail}</small>
            </Link>
          </Stack>
        </Inline>
      </Stack>
      <div class="signal-hero-stage">{props.children}</div>
    </Inline>
  );
}
