import { state } from '@askrjs/askr';
import { RadioGroup, RadioGroupItem } from '../_demo-kit/primitives/radio-group';

export function RadioGroupDemo() {
  const [selected, setSelected] = state('spa');

  return (
    <div class="demo-area">
      <h4>Live demo</h4>
      <div class="demo-stack">
        <RadioGroup
          value={selected()}
          onValueChange={(v: string) => setSelected(v)}
        >
          <label class="demo-row">
            <RadioGroupItem value="spa" /> SPA
          </label>
          <label class="demo-row">
            <RadioGroupItem value="ssr" /> SSR
          </label>
          <label class="demo-row">
            <RadioGroupItem value="ssg" /> SSG
          </label>
        </RadioGroup>
        <div class="demo-output">Selected: {selected()}</div>
      </div>
    </div>
  );
}
