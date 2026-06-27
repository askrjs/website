import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('progress');

export function ProgressShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
