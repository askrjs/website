import {
  InstallationDocPage,
  meta as installationMeta,
} from '../pages/docs/getting-started/installation';
import {
  QuickStartDocPage,
  meta as quickStartMeta,
} from '../pages/docs/getting-started/quick-start';
import {
  SsgOverviewDocPage,
  meta as ssgOverviewMeta,
} from '../pages/docs/guides/ssg-overview';
import {
  StylingWithThemesDocPage,
  meta as stylingWithThemesMeta,
} from '../pages/docs/guides/styling-with-themes';

import type { DocEntry } from './doc-types';

export const docRegistry: DocEntry[] = [
  { meta: installationMeta, component: InstallationDocPage },
  { meta: quickStartMeta, component: QuickStartDocPage },
  { meta: ssgOverviewMeta, component: SsgOverviewDocPage },
  { meta: stylingWithThemesMeta, component: StylingWithThemesDocPage },
];