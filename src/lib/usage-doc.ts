/**
 * Turns a component's usage doc (`<Name>.md`, imported with `?raw`) into
 * the Storybook Docs description. The doc's own `# Title` is dropped
 * because the Docs page already shows the component name.
 */
export function usageDoc(markdown: string): string {
  return markdown.replace(/^# .*\r?\n+/, "")
}
