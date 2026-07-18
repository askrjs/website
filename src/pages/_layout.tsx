import type { Props } from '@askrjs/askr';
import { Link } from '@askrjs/askr/router';
import { MoonIcon, SunIcon } from '@askrjs/lucide';
import {
  Block,
  Brand,
  BrandLabel,
  BrandMark,
  Button,
  Container,
  Footer,
  Header,
  Navbar,
  NavBrand,
  NavGroup,
  Text,
} from '@askrjs/themes/components';
import { ThemeScope, ThemeToggle } from '@askrjs/themes/theme';

export function AskrBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Brand asChild>
      <Link href="/" aria-label="Askr home">
        <BrandMark class="site-brand__mark" aria-hidden="true">
          <img src="/assets/askr-logo.png" alt="" width="32" height="32" />
        </BrandMark>
        {!compact && <BrandLabel>Askr</BrandLabel>}
      </Link>
    </Brand>
  );
}

export function GitHubMark() {
  return (
    <span class="github-mark" aria-hidden="true">
      <img
        class="github-mark__light"
        src="/assets/github-mark-black.svg"
        alt=""
        width="18"
        height="18"
      />
      <img
        class="github-mark__dark"
        src="/assets/github-mark-white.svg"
        alt=""
        width="18"
        height="18"
      />
    </span>
  );
}

export function SiteThemeToggle() {
  return (
    <ThemeToggle
      aria-label="Toggle color theme"
      variant="ghost"
      size="icon"
      lightIcon={<SunIcon size={18} aria-hidden="true" />}
      darkIcon={<MoonIcon size={18} aria-hidden="true" />}
    />
  );
}

export function MarketingLayout({ children }: Props) {
  return (
    <ThemeScope defaultTheme="light" storageKey="askr-theme">
      <div class="marketing-shell" data-layout="marketing">
        <Header sticky>
          <Container>
            <Navbar aria-label="Primary navigation">
              <NavBrand>
                <AskrBrand />
              </NavBrand>
              <NavGroup align="end">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/docs">Docs</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a
                    href="https://github.com/askrjs"
                    aria-label="Askr on GitHub"
                  >
                    <GitHubMark />
                    GitHub
                  </a>
                </Button>
                <SiteThemeToggle />
              </NavGroup>
            </Navbar>
          </Container>
        </Header>
        <main>{children}</main>
        <Footer>
          <Container paddingY="xl">
            <Block
              class="marketing-footer__content"
              direction="row"
              align="center"
              justify="between"
              gap="lg"
            >
              <AskrBrand />
              <Text tone="muted" size="sm">
                Full-stack TypeScript, from first route to production.
              </Text>
              <Block direction="row" align="center" gap="sm">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/docs">Documentation</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href="https://github.com/askrjs">
                    <GitHubMark />
                    GitHub
                  </a>
                </Button>
              </Block>
            </Block>
          </Container>
        </Footer>
      </div>
    </ThemeScope>
  );
}
