import type { Props } from '@askrjs/askr';
import { Link } from '@askrjs/askr/router';
import { BookOpenIcon, CompassIcon, MoonIcon, SunIcon } from '@askrjs/lucide';
import {
  Brand,
  BrandLabel,
  BrandMark,
  Button,
  Container,
  Footer,
  FooterContent,
  FooterLink,
  FooterLinks,
  FooterSection,
  FooterTitle,
  Header,
  Navbar,
  NavBrand,
  NavGroup,
  Text,
} from '@askrjs/themes/components';
import { ThemeScope, ThemeToggle } from '@askrjs/themes/theme';
import { marketingPages } from './catalog';
import { docsPrimarySections } from '../docs/primary-sections';

export function AskrBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Brand asChild>
      <Link href="/" aria-label="Askr home">
        <BrandMark class="site-brand__mark" aria-hidden="true">
          <img src="/assets/askr-logo-64.avif" alt="" width="32" height="32" />
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
          <Container size="xl">
            <Navbar aria-label="Primary navigation">
              <NavBrand>
                <AskrBrand />
              </NavBrand>
              <NavGroup align="end">
                <Button asChild variant="ghost" size="icon">
                  <a
                    href="/docs"
                    aria-label="Documentation"
                    title="Documentation"
                  >
                    <BookOpenIcon size={18} aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <a
                    href="https://github.com/askrjs"
                    aria-label="Askr on GitHub"
                    title="GitHub"
                  >
                    <GitHubMark />
                  </a>
                </Button>
                <SiteThemeToggle />
              </NavGroup>
            </Navbar>
          </Container>
        </Header>
        <main>{children}</main>
        <Footer>
          <Container size="xl" paddingY="xl">
            <FooterContent class="marketing-footer__columns">
              <FooterSection>
                <FooterTitle>
                  <span class="marketing-footer__title-label">
                    <CompassIcon
                      class="marketing-footer__explore-icon"
                      size={18}
                      aria-hidden="true"
                    />
                    Explore
                  </span>
                </FooterTitle>
                <FooterLinks aria-label="Marketing links">
                  <FooterLink href="/">Overview</FooterLink>
                  {marketingPages.map((page) => (
                    <FooterLink key={page.path} href={page.path}>
                      {page.label}
                    </FooterLink>
                  ))}
                </FooterLinks>
              </FooterSection>

              <FooterSection>
                <FooterTitle>
                  <a class="marketing-footer__title-link" href="/docs">
                    <BookOpenIcon
                      class="marketing-footer__documentation-icon"
                      size={18}
                      aria-hidden="true"
                    />
                    Documentation
                  </a>
                </FooterTitle>
                <FooterLinks aria-label="Documentation links">
                  {docsPrimarySections.map((section) => (
                    <a
                      key={section.route}
                      class="footer-link"
                      data-slot="footer-link"
                      href={section.route}
                    >
                      {section.label}
                    </a>
                  ))}
                </FooterLinks>
              </FooterSection>

              <FooterSection>
                <FooterTitle>
                  <a
                    class="marketing-footer__title-link"
                    href="https://github.com/askrjs"
                  >
                    <GitHubMark />
                    GitHub
                  </a>
                </FooterTitle>
                <FooterLinks aria-label="External links">
                  <FooterLink href="https://github.com/askrjs/askr">
                    askr
                  </FooterLink>
                  <FooterLink href="https://github.com/askrjs/askr-server">
                    askr-server
                  </FooterLink>
                  <FooterLink href="https://github.com/askrjs/askr-ui">
                    askr-ui
                  </FooterLink>
                  <FooterLink href="https://github.com/askrjs/askr-themes">
                    askr-themes
                  </FooterLink>
                  <FooterLink href="https://github.com/askrjs/askr-cli">
                    askr-cli
                  </FooterLink>
                </FooterLinks>
              </FooterSection>
            </FooterContent>
            <Text class="marketing-footer__copyright" size="sm" tone="muted">
              © 2026 Askr contributors.
            </Text>
          </Container>
        </Footer>
      </div>
    </ThemeScope>
  );
}
