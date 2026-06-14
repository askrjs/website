import {
  InstallationDocPage,
  meta as installationMeta,
} from '../docs/getting-started/installation';
import {
  QuickStartDocPage,
  meta as quickStartMeta,
} from '../docs/getting-started/quick-start';
import {
  ProjectStructureDocPage,
  meta as projectStructureMeta,
} from '../docs/getting-started/project-structure';
import {
  DevelopmentChecklistDocPage,
  meta as developmentChecklistMeta,
} from '../docs/getting-started/development-checklist';
import {
  SsgOverviewDocPage,
  meta as ssgOverviewMeta,
} from '../docs/guides/ssg-overview';
import {
  BuildingPagesDocPage,
  meta as buildingPagesMeta,
} from '../docs/guides/building-pages';
import {
  ActorModelDocPage,
  meta as actorModelMeta,
} from '../docs/foundations/actor-model';
import {
  RenderingStrategyDocPage,
  meta as renderingStrategyMeta,
} from '../docs/foundations/rendering-strategy';
import {
  DataLoadingDocPage,
  meta as dataLoadingMeta,
} from '../docs/guides/data-loading';
import {
  StylingWithThemesDocPage,
  meta as stylingWithThemesMeta,
} from '../docs/guides/styling-with-themes';
import {
  AccessibilityChecklistDocPage,
  meta as accessibilityChecklistMeta,
} from '../docs/guides/accessibility-checklist';
import {
  TestingStrategyDocPage,
  meta as testingStrategyMeta,
} from '../docs/guides/testing-strategy';
import {
  DeploymentAndHostingDocPage,
  meta as deploymentAndHostingMeta,
} from '../docs/guides/deployment-and-hosting';
import {
  SeoAndMetadataDocPage,
  meta as seoAndMetadataMeta,
} from '../docs/guides/seo-and-metadata';
import {
  TroubleshootingDocPage,
  meta as troubleshootingMeta,
} from '../docs/reference/troubleshooting';
import {
  MigrationGuideDocPage,
  meta as migrationGuideMeta,
} from '../docs/reference/migration-guide';

import type { DocEntry } from './doc-types';

export const docRegistry: DocEntry[] = [
  { meta: installationMeta, component: InstallationDocPage },
  { meta: quickStartMeta, component: QuickStartDocPage },
  { meta: projectStructureMeta, component: ProjectStructureDocPage },
  { meta: developmentChecklistMeta, component: DevelopmentChecklistDocPage },
  { meta: actorModelMeta, component: ActorModelDocPage },
  { meta: renderingStrategyMeta, component: RenderingStrategyDocPage },
  { meta: ssgOverviewMeta, component: SsgOverviewDocPage },
  { meta: buildingPagesMeta, component: BuildingPagesDocPage },
  { meta: dataLoadingMeta, component: DataLoadingDocPage },
  { meta: stylingWithThemesMeta, component: StylingWithThemesDocPage },
  {
    meta: accessibilityChecklistMeta,
    component: AccessibilityChecklistDocPage,
  },
  { meta: testingStrategyMeta, component: TestingStrategyDocPage },
  { meta: deploymentAndHostingMeta, component: DeploymentAndHostingDocPage },
  { meta: seoAndMetadataMeta, component: SeoAndMetadataDocPage },
  { meta: troubleshootingMeta, component: TroubleshootingDocPage },
  { meta: migrationGuideMeta, component: MigrationGuideDocPage },
];
