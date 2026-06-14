import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('skeleton');

export function SkeletonShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
