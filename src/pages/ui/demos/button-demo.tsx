import { state } from "@askrjs/askr";
import { Button } from "@askrjs/askr-ui/button";

export function ButtonDemo() {
  const clicks = state(0);

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-row">
        <Button onPress={() => clicks.set((v) => v + 1)}>
          Primary
        </Button>
        <Button disabled>Disabled</Button>
      </div>
      <div class="demo-output">Pressed {clicks} times</div>
    </div>
  );
}
