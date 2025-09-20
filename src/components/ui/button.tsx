import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/src/utils/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // WakeCap specific variants with black-primary design
        wakecap: "bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-800 hover:shadow-md active:bg-neutral-950 focus-visible:ring-neutral-500",
        "wakecap-secondary": "bg-neutral-100 text-neutral-900 border border-neutral-200 hover:bg-neutral-200 hover:shadow-sm active:bg-neutral-300 focus-visible:ring-neutral-500",
        "wakecap-accent": "bg-orange-600 text-white border border-orange-600 hover:bg-orange-700 hover:shadow-md active:bg-orange-800 focus-visible:ring-orange-500",
        "wakecap-outline": "bg-transparent text-neutral-900 border border-neutral-900 hover:bg-neutral-900 hover:text-white hover:shadow-sm focus-visible:ring-neutral-500",
        "wakecap-ghost": "bg-transparent text-neutral-600 border border-transparent hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-500",
        "wakecap-text": "bg-transparent text-neutral-900 border border-transparent hover:bg-neutral-50 hover:text-neutral-700 focus-visible:ring-neutral-500",
        "wakecap-success": "bg-green-600 text-white border border-green-600 hover:bg-green-700 hover:shadow-md active:bg-green-800 focus-visible:ring-green-500",
        "wakecap-warning": "bg-yellow-500 text-white border border-yellow-500 hover:bg-yellow-600 hover:shadow-md active:bg-yellow-700 focus-visible:ring-yellow-500",
        "wakecap-destructive": "bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:shadow-md active:bg-red-800 focus-visible:ring-red-500",
        "wakecap-info": "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 hover:shadow-md active:bg-blue-800 focus-visible:ring-blue-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }