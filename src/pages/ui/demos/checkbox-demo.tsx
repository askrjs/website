import { state, derive } from '@askrjs/askr';
import { Checkbox } from '../../../ui/primitives/checkbox';

export function CheckboxDemo() {
  const [checked, setChecked] = state(false);
  const label = derive(() => (checked() ? 'Checked' : 'Unchecked'));

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-row">
        <Checkbox
          checked={checked()}
          onCheckedChange={(v: boolean) => setChecked(v)}
        />
        <span>{label()}</span>
      </div>
    </div>
  );
}
