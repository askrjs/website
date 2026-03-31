import { state } from "@askrjs/askr";
import { Progress, ProgressIndicator } from "@askrjs/askr-ui/primitives/progress";
import { Button } from "@askrjs/askr-ui/primitives/button";

export function ProgressDemo() {
  const value = state(33);

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-stack">
        <Progress value={value()} max={100}>
          <ProgressIndicator />
        </Progress>
        <div class="demo-row">
          <Button onPress={() => value.set((v) => Math.max(0, v - 10))}>-10</Button>
          <span>{value}%</span>
          <Button onPress={() => value.set((v) => Math.min(100, v + 10))}>+10</Button>
        </div>
      </div>
    </div>
  );
}
