export function toAnchorId(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}
