import type { StorybookConfig } from "@storybook/nextjs-vite"

const config: StorybookConfig = {
  // One <Name>.stories.tsx next to each component in src/components/ui/<Name>/
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  core: { disableTelemetry: true },
}

export default config
