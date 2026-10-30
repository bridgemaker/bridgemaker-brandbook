import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

/**
 * Bridgemaker-Badge — shadcn-API, Optik aus dem bm-badge-Rezept.
 * Semantik-Badge: Tint-Fläche + Deep-Text; dieselbe Aussage trägt
 * immer dieselbe Farbe (guidelines/07 §7.6). outline = Themen-Tag,
 * Linie in der Textfarbe (z. B. className="text-bm-purple").
 */
const badgeVariants = cva(
  "bm-badge w-fit shrink-0 gap-1 whitespace-nowrap focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "",
        purple: "bm-badge-purple",
        berry: "bm-badge-berry",
        teal: "bm-badge-teal",
        outline: "!bg-transparent shadow-[inset_0_0_0_1px_currentColor]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
