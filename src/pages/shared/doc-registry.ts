import {
  InstallationDocPage,
  meta as installationMeta,
} from "../docs/getting-started/installation";
import { QuickStartDocPage, meta as quickStartMeta } from "../docs/getting-started/quick-start";
import { SsgOverviewDocPage, meta as ssgOverviewMeta } from "../docs/guides/ssg-overview";
import { BuildingPagesDocPage, meta as buildingPagesMeta } from "../docs/guides/building-pages";
import {
  StylingWithThemesDocPage,
  meta as stylingWithThemesMeta,
} from "../docs/guides/styling-with-themes";

import type { DocEntry } from "./doc-types";

export const docRegistry: DocEntry[] = [
  { meta: installationMeta, component: InstallationDocPage },
  { meta: quickStartMeta, component: QuickStartDocPage },
  { meta: ssgOverviewMeta, component: SsgOverviewDocPage },
  { meta: buildingPagesMeta, component: BuildingPagesDocPage },
  { meta: stylingWithThemesMeta, component: StylingWithThemesDocPage },
];
