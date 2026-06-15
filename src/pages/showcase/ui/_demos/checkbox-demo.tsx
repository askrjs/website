import { state, derive } from '@askrjs/askr';
import { Checkbox } from '../_demo-kit/primitives/checkbox';

export function CheckboxDemo() {
  const [checked, setChecked] = state(false);
  const label = derive(() => (checked() ? 'Checked' : 'Unchecked'));

  return (
    <div class="demo-area">
      <h4>Live demo</h4>
      <div class="demo-row">
        <label class="demo-choice">
          <Checkbox
            checked={checked()}
            onCheckedChange={(v: boolean) => setChecked(v)}
          />
          <span>{label()}</span>
        </label>
      </div>
    </div>
  );
}
