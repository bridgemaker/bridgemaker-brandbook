import * as React from "react"
import { cn } from "@/lib/utils"

/** Optik aus dem bm-input-Rezept: Outline, radius-md, weiß erst bei Fokus. */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bm-input min-w-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:!border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
