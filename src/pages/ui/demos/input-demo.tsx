import { state } from "@askrjs/askr";
import { Input } from "@askrjs/askr-ui/input";

export function InputDemo() {
  const value = state("");

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-stack">
        <Input
          placeholder="Type something…"
          value={value()}
          onInput={(e: Event) =>
            value.set((e.target as HTMLInputElement).value)
          }
        />
        <div class="demo-output">
          Value: {value}
        </div>
      </div>
    </div>
  );
}
