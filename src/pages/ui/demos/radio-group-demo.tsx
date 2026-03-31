import { state } from "@askrjs/askr";
import { RadioGroup, RadioGroupItem } from "@askrjs/askr-ui/primitives/radio-group";

export function RadioGroupDemo() {
  const selected = state("spa");

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-stack">
        <RadioGroup
          value={selected()}
          onValueChange={(v: string) => selected.set(v)}
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
        <div class="demo-output">Selected: {selected}</div>
      </div>
    </div>
  );
}
