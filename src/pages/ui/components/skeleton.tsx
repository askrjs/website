import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('skeleton');

export function SkeletonShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
