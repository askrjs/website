import type { Props } from '@askrjs/askr';
import { SiteLayout } from '../site-layout';

export function MarketingLayout({ children }: Props) {
  return <SiteLayout variant="marketing">{children}</SiteLayout>;
}
