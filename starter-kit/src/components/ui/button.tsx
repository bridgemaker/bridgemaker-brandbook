import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

/**
 * Bridgemaker-Button — shadcn-API, Optik aus dem bm-btn-Rezept
 * (tokens.css): Pill, Charcoal → Deep-Plum, 36/44/52px.
 * outline und destructive sind Aliasse, damit shadcn-Komponenten
 * (AlertDialog, Dialog) ohne Umbau funktionieren.
 */
const buttonVariants = cva(
  "bm-btn gap-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bm-btn-primary",
        destructive: "bm-btn-primary",
        secondary: "bm-btn-secondary",
        outline: "bm-btn-secondary",
        ghost: "bm-btn-ghost",
        link: "bm-link !h-auto !bg-transparent !px-0 underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        xs: "bm-btn-sm",
        sm: "bm-btn-sm",
        lg: "bm-btn-lg",
        icon: "w-11 !px-0",
        "icon-xs": "bm-btn-sm w-9 !px-0",
        "icon-sm": "bm-btn-sm w-9 !px-0",
        "icon-lg": "bm-btn-lg w-13 !px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
