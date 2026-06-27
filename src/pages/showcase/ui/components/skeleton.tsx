import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('skeleton');

export function SkeletonShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
