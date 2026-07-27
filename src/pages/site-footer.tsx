import {
  Container,
  Footer,
  FooterContent,
  FooterLink,
  FooterLinks,
  FooterSection,
  FooterTitle,
  Text,
} from '@askrjs/themes/components';
import { Link } from '@askrjs/askr/router';
import { BookOpenIcon, CompassIcon } from '@askrjs/lucide';
import { marketingPages } from './marketing/catalog';
import { docsPrimarySections } from './docs/primary-sections';
import { GitHubMark } from './site-header';

export function SiteFooter() {
  return (
    <Footer class="site-footer">
      <Container size="xl" paddingY="xl">
        <FooterContent class="marketing-footer__columns">
          <FooterSection>
            <FooterTitle>
              <span class="marketing-footer__title-label">
                <CompassIcon size={18} aria-hidden="true" />
                Explore
              </span>
            </FooterTitle>
            <FooterLinks aria-label="Marketing links">
              <Link class="footer-link" data-slot="footer-link" href="/">
                Overview
              </Link>
              {marketingPages.map((page) => (
                <Link
                  key={page.path}
                  class="footer-link"
                  data-slot="footer-link"
                  href={page.path}
                >
                  {page.label}
                </Link>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>
              <Link class="marketing-footer__title-link" href="/docs">
                <BookOpenIcon size={18} aria-hidden="true" />
                Documentation
              </Link>
            </FooterTitle>
            <FooterLinks aria-label="Documentation links">
              {docsPrimarySections.map((section) => (
                <Link
                  key={section.route}
                  class="footer-link"
                  data-slot="footer-link"
                  href={section.route}
                >
                  {section.label}
                </Link>
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
  );
}
