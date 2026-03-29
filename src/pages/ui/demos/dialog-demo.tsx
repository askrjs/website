import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@askrjs/askr-ui/composites/dialog";
import { Button } from "@askrjs/askr-ui/primitives/button";

export function DialogDemo() {
  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Example Dialog</DialogTitle>
          <DialogDescription>
            This is a headless dialog component with full keyboard and focus-trap support.
          </DialogDescription>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
