// Vite `?raw` imports (used by Storybook to show each component's .md)
declare module "*.md?raw" {
  const content: string
  export default content
}
