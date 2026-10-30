import * as React from "react"
import { cn } from "@/lib/utils"

/** Optik aus dem bm-textarea-Rezept: Outline, radius-md, weiß erst bei Fokus. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bm-textarea field-sizing-content disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:!border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
