import {
  InstallationDocPage,
  meta as installationMeta,
} from './getting-started/installation';
import {
  QuickStartDocPage,
  meta as quickStartMeta,
} from './getting-started/quick-start';
import {
  ProjectStructureDocPage,
  meta as projectStructureMeta,
} from './getting-started/project-structure';
import {
  DevelopmentChecklistDocPage,
  meta as developmentChecklistMeta,
} from './getting-started/development-checklist';
import {
  SsgOverviewDocPage,
  meta as ssgOverviewMeta,
} from './guides/ssg-overview';
import {
  BuildingPagesDocPage,
  meta as buildingPagesMeta,
} from './guides/building-pages';
import {
  ActorModelDocPage,
  meta as actorModelMeta,
} from './foundations/actor-model';
import {
  RenderingStrategyDocPage,
  meta as renderingStrategyMeta,
} from './foundations/rendering-strategy';
import {
  DataLoadingDocPage,
  meta as dataLoadingMeta,
} from './guides/data-loading';
import {
  StylingWithThemesDocPage,
  meta as stylingWithThemesMeta,
} from './guides/styling-with-themes';
import {
  AccessibilityChecklistDocPage,
  meta as accessibilityChecklistMeta,
} from './guides/accessibility-checklist';
import {
  TestingStrategyDocPage,
  meta as testingStrategyMeta,
} from './guides/testing-strategy';
import {
  DeploymentAndHostingDocPage,
  meta as deploymentAndHostingMeta,
} from './guides/deployment-and-hosting';
import {
  SeoAndMetadataDocPage,
  meta as seoAndMetadataMeta,
} from './guides/seo-and-metadata';
import {
  TroubleshootingDocPage,
  meta as troubleshootingMeta,
} from './reference/troubleshooting';
import {
  MigrationGuideDocPage,
  meta as migrationGuideMeta,
} from './reference/migration-guide';

import type { DocEntry } from './_types';

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
