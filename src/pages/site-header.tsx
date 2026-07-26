import { Link } from '@askrjs/askr/router';
import { MoonIcon, SunIcon } from '@askrjs/lucide';
import {
  Brand,
  BrandLabel,
  BrandMark,
  Button,
  Container,
  Header,
  NavBrand,
  Navbar,
  NavGroup,
} from '@askrjs/themes/components';
import { ThemeToggle } from '@askrjs/themes/theme';
import { DocsSearch } from './docs/search';

export function AskrBrand() {
  return (
    <Brand asChild>
      <Link href="/" aria-label="Askr home">
        <BrandMark class="site-brand__mark" aria-hidden="true">
          <img src="/assets/askr-logo-64.avif" alt="" width="32" height="32" />
        </BrandMark>
        <BrandLabel>Askr</BrandLabel>
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
      title="Theme"
      variant="ghost"
      size="icon"
      lightIcon={<SunIcon size={18} aria-hidden="true" />}
      darkIcon={<MoonIcon size={18} aria-hidden="true" />}
    />
  );
}

export function SiteHeader() {
  return (
    <Header class="site-header" sticky>
      <Container size="xl">
        <Navbar aria-label="Primary navigation">
          <NavBrand>
            <AskrBrand />
          </NavBrand>
          <NavGroup align="end">
            <DocsSearch />
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
  );
}
