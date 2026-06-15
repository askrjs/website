import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('skeleton');

export function SkeletonShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
