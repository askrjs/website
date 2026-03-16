import { jsx } from "../../runtime/jsx";

export interface InputRequirement {
  label: string;
  value: string;
}

export function InputRequirementsList(props: { items: InputRequirement[] }) {
  return (
    <ul class="input-list">
      {props.items.map((item) => (
        <li>
          <strong>{item.label}:</strong> {item.value}
        </li>
      ))}
    </ul>
  );
}

export interface ThemeExampleProps {
  category: string;
  title: string;
  description: string;
}

export function ThemeExampleCard(props: ThemeExampleProps) {
  return (
    <div class="theme-example">
      <span class="badge">{props.category}</span>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <div class="theme-example-controls">
        <button type="button" class="theme-preview-btn">
          Primary action
        </button>
        <button type="button" class="theme-preview-btn ghost">
          Secondary action
        </button>
      </div>
    </div>
  );
}

export interface SpotlightSignal {
  title: string;
  detail: string;
}

export function SpotlightSignals(props: { signals: SpotlightSignal[] }) {
  return (
    <ul class="signal-list">
      {props.signals.map((signal) => (
        <li>
          <strong>{signal.title}</strong>
          <span>{signal.detail}</span>
        </li>
      ))}
    </ul>
  );
}
