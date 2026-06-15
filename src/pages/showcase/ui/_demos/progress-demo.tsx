import { state } from '@askrjs/askr';
import { Progress, ProgressIndicator } from '../_demo-kit/primitives/progress';
import { Button } from '../_demo-kit/primitives/button';

export function ProgressDemo() {
  const [value, setValue] = state(33);

  return (
    <div class="demo-area">
      <h4>Live demo</h4>
      <div class="demo-stack">
        <Progress value={value()} max={100}>
          <ProgressIndicator />
        </Progress>
        <div class="demo-row">
          <Button onPress={() => setValue((v) => Math.max(0, v - 10))}>
            -10
          </Button>
          <span>{value()}%</span>
          <Button onPress={() => setValue((v) => Math.min(100, v + 10))}>
            +10
          </Button>
        </div>
      </div>
    </div>
  );
}
