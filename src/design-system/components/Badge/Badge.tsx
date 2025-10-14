import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const badgeVariants = cva(
  "inline-flex items-center rounded-md rounded-bl-none border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-bw-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-bw-primary text-bw-on-primary hover:bg-bw-primary-hover",
        secondary:
          "border-transparent bg-bw-bg-secondary text-bw-text-primary hover:bg-bw-bg-primary-hover",
        destructive:
          "border-transparent bg-bw-negative text-bw-on-primary hover:bg-bw-negative-hover",
        outline: "text-bw-text-primary border-bw-border-ui bg-transparent",
        // Semantic variants with Blockwork colors
        success: "border-transparent bg-bw-positive-selected text-bw-positive hover:bg-bw-positive-selected-hover",
        warning: "border-transparent bg-bw-warning-selected text-bw-warning hover:bg-bw-warning-selected-hover",
        info: "border-transparent bg-bw-primary-selected text-bw-primary hover:bg-bw-primary-selected-hover",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div ref={ref} className={twMerge(badgeVariants({ variant, size }), className)} {...props}>
        {children}
      </div>
    );
  },
);
Badge.displayName = "Badge";

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
