import { cn } from "cn"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  type CardProps,
} from "@/components/ui/Card"

import styles from "./ProductCard.module.css"

const baht = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
})

type ProductCardProps = Omit<CardProps, "children"> & {
  imageSrc: string
  /** Defaults to `name`. */
  imageAlt?: string
  name: string
  brand: string
  /** Price in THB. */
  price: number
}

function ProductCard({
  className,
  imageSrc,
  imageAlt,
  name,
  brand,
  price,
  ...props
}: ProductCardProps) {
  return (
    <Card
      data-slot="product-card"
      className={cn(styles.card, className)}
      {...props}
    >
      {/* Plain <img>: Card styles an img first child; callers pass any URL. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-slot="product-card-image"
        src={imageSrc}
        alt={imageAlt ?? name}
        className={styles.image}
      />
      <CardHeader>
        <div data-slot="product-card-brand" className={styles.brand}>
          {brand}
        </div>
        <CardTitle data-slot="product-card-name" className={styles.name}>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div data-slot="product-card-price" className={styles.price}>
          {baht.format(price)}
        </div>
      </CardContent>
    </Card>
  )
}

export { ProductCard, type ProductCardProps }
