import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '../demo-kit/composites/accordion';

export function AccordionDemo() {
  return (
    <div class="demo-area">
      <h4>Live demo</h4>
      <Accordion type="single" collapsible>
        <AccordionItem value="what">
          <AccordionHeader>
            <AccordionTrigger>What is askr?</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            A fine-grained reactive UI framework with actor-backed state
            management and direct dependency tracking.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="why">
          <AccordionHeader>
            <AccordionTrigger>Why no virtual DOM?</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            Fine-grained reactivity updates only the DOM nodes that changed,
            skipping the diffing overhead entirely.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="themes">
          <AccordionHeader>
            <AccordionTrigger>How does theming work?</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            askr-themes provides CSS-only theming via data-slot selectors and
            --ak-* design tokens. No JavaScript required.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
