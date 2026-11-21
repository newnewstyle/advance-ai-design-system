import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProductCard } from "./ProductCard"

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  args: {
    imageSrc: "/demo/product-aircon.svg",
    name: "แอร์ติดผนัง Inverter 12,000 BTU",
    brand: "ทองเย็น",
    price: 15900,
  },
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** A long name wraps; the price stays at the bottom. */
export const LongName: Story = {
  args: {
    imageSrc: "/demo/product-fridge.svg",
    name: "ตู้เย็น 2 ประตู 7.4 คิว ระบบ Inverter ประหยัดไฟเบอร์ 5",
    brand: "สดเสมอ",
    price: 8990,
  },
}

export const Grid: Story = {
  decorators: [
    (Story) => (
      <div className="w-[40rem]">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <ProductCard
        imageSrc="/demo/product-aircon.svg"
        name="แอร์ติดผนัง Inverter 12,000 BTU"
        brand="ทองเย็น"
        price={15900}
      />
      <ProductCard
        imageSrc="/demo/product-heater.svg"
        name="เครื่องทำน้ำอุ่น 4,500 วัตต์"
        brand="อุ่นใจ"
        price={3290}
      />
      <ProductCard
        imageSrc="/demo/product-fridge.svg"
        name="ตู้เย็น 2 ประตู 7.4 คิว"
        brand="สดเสมอ"
        price={8990}
      />
    </div>
  ),
}
