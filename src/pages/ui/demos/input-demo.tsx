import { state } from '@askrjs/askr';
import { Input } from '../../../ui/primitives/input';

export function InputDemo() {
  const [value, setValue] = state('');

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-stack">
        <Input
          placeholder="Type something…"
          value={value()}
          onInput={(e: Event) => setValue((e.target as HTMLInputElement).value)}
        />
        <div class="demo-output">Value: {value()}</div>
      </div>
    </div>
  );
}
