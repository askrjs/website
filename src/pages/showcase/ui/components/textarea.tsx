import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('textarea');

export function TextareaShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
