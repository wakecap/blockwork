/**
 * Typography Foundation Components
 * 
 * These components ensure consistent text styling across the entire design system.
 * All text components inherit from Blockwork color tokens.
 */

import React from "react";
import { cn } from "../../utils/utils";
import { cva, type VariantProps } from "class-variance-authority";

// ============================================================================
// HEADING COMPONENT
// ============================================================================

const headingVariants = cva("font-heading text-bw-text-primary", {
  variants: {
    level: {
      h1: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight",
      h2: "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight",
      h3: "text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug",
      h4: "text-xl md:text-2xl lg:text-3xl font-semibold leading-snug",
      h5: "text-lg md:text-xl lg:text-2xl font-semibold leading-normal",
      h6: "text-base md:text-lg lg:text-xl font-semibold leading-normal",
    },
    color: {
      primary: "text-bw-text-primary",
      secondary: "text-bw-text-secondary",
      disabled: "text-bw-text-disabled",
      onPrimary: "text-bw-on-primary",
      onInverted: "text-bw-text-on-inverted",
      link: "text-bw-text-link",
    },
  },
  defaultVariants: {
    level: "h2",
    color: "primary",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: React.FC<HeadingProps> = ({
  as,
  level,
  color,
  className,
  children,
  ...props
}) => {
  const Component = as || level || "h2";

  return (
    <Component
      className={cn(headingVariants({ level: level || (as as any), color }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// TEXT/PARAGRAPH COMPONENT
// ============================================================================

const textVariants = cva("font-sans", {
  variants: {
    size: {
      xs: "text-xs leading-relaxed",
      sm: "text-sm leading-relaxed",
      base: "text-base leading-relaxed",
      lg: "text-lg leading-relaxed",
      xl: "text-xl leading-relaxed",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      primary: "text-bw-text-primary",
      secondary: "text-bw-text-secondary",
      disabled: "text-bw-text-disabled",
      placeholder: "text-bw-text-placeholder",
      onPrimary: "text-bw-on-primary",
      onInverted: "text-bw-text-on-inverted",
      onSecondary: "text-bw-text-on-secondary",
      link: "text-bw-text-link hover:text-bw-primary-hover",
      positive: "text-bw-positive",
      negative: "text-bw-negative",
      warning: "text-bw-warning",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "primary",
    align: "left",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "label";
  truncate?: boolean;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Text: React.FC<TextProps> = ({
  as = "p",
  size,
  weight,
  color,
  align,
  truncate,
  lineClamp,
  className,
  children,
  ...props
}) => {
  const Component = as;

  return (
    <Component
      className={cn(
        textVariants({ size, weight, color, align }),
        truncate && "truncate",
        lineClamp && `line-clamp-${lineClamp}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// LABEL COMPONENT
// ============================================================================

const labelVariants = cva("font-sans font-medium", {
  variants: {
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
    color: {
      primary: "text-bw-text-primary",
      secondary: "text-bw-text-secondary",
      disabled: "text-bw-text-disabled",
    },
    required: {
      true: "after:content-['*'] after:ml-0.5 after:text-bw-negative",
    },
  },
  defaultVariants: {
    size: "base",
    color: "secondary",
  },
});

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  size,
  color,
  required,
  className,
  children,
  ...props
}) => {
  return (
    <label
      className={cn(labelVariants({ size, color, required: required }), className)}
      {...props}
    >
      {children}
    </label>
  );
};

// ============================================================================
// LINK COMPONENT
// ============================================================================

const linkVariants = cva("font-sans transition-colors duration-200", {
  variants: {
    variant: {
      default: "text-bw-text-link hover:text-bw-primary-hover underline",
      inline: "text-bw-text-link hover:text-bw-primary-hover underline",
      subtle: "text-bw-text-secondary hover:text-bw-primary underline-offset-2 hover:underline",
      navigation: "text-bw-text-primary hover:text-bw-primary no-underline",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
  },
});

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  external?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  variant,
  size,
  external,
  className,
  children,
  ...props
}) => {
  return (
    <a
      className={cn(linkVariants({ variant, size }), className)}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    >
      {children}
      {external && <span className="ml-1">↗</span>}
    </a>
  );
};

// ============================================================================
// CODE COMPONENT
// ============================================================================

const codeVariants = cva("font-mono rounded", {
  variants: {
    variant: {
      inline: "text-bw-text-secondary bg-bw-bg-secondary px-1.5 py-0.5 text-sm",
      block: "text-bw-text-primary bg-bw-bg-secondary p-4 overflow-auto text-sm block",
    },
  },
  defaultVariants: {
    variant: "inline",
  },
});

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {}

export const Code: React.FC<CodeProps> = ({ variant, className, children, ...props }) => {
  if (variant === "block") {
    return (
      <pre className={cn(codeVariants({ variant }), className)} {...props}>
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <code className={cn(codeVariants({ variant }), className)} {...props}>
      {children}
    </code>
  );
};

// ============================================================================
// CAPTION/SMALL TEXT COMPONENT
// ============================================================================

export interface CaptionProps extends React.HTMLAttributes<HTMLElement> {
  color?: "primary" | "secondary" | "disabled";
}

export const Caption: React.FC<CaptionProps> = ({
  color = "secondary",
  className,
  children,
  ...props
}) => {
  const colorClass = {
    primary: "text-bw-text-primary",
    secondary: "text-bw-text-secondary",
    disabled: "text-bw-text-disabled",
  }[color];

  return (
    <small className={cn("text-xs font-sans", colorClass, className)} {...props}>
      {children}
    </small>
  );
};

// ============================================================================
// BLOCKQUOTE COMPONENT
// ============================================================================

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {}

export const Blockquote: React.FC<BlockquoteProps> = ({ className, children, ...props }) => {
  return (
    <blockquote
      className={cn(
        "border-l-4 border-bw-primary bg-bw-primary-highlighted text-bw-text-secondary pl-4 py-2 my-4 italic",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
};

// ============================================================================
// LIST COMPONENT
// ============================================================================

const listVariants = cva("font-sans text-bw-text-primary", {
  variants: {
    variant: {
      unordered: "list-disc list-inside space-y-1",
      ordered: "list-decimal list-inside space-y-1",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "unordered",
    size: "base",
  },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {
  items?: React.ReactNode[];
}

export const List: React.FC<ListProps> = ({
  variant,
  size,
  items,
  className,
  children,
  ...props
}) => {
  const Component = variant === "ordered" ? "ol" : "ul";

  return (
    <Component className={cn(listVariants({ variant, size }), className)} {...props}>
      {items ? items.map((item, index) => <li key={index}>{item}</li>) : children}
    </Component>
  );
};

// Export all variants for external use
export { headingVariants, textVariants, labelVariants, linkVariants, codeVariants, listVariants };

