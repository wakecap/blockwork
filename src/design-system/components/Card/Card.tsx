import React from "react";
import { cn } from "../../../utils/utils";

export interface CardProps {
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "interactive";
  size?: "sm" | "md" | "lg";
  isHoverable?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  content,
  image,
  imageAlt,
  actions,
  footer,
  variant = "default",
  size = "md",
  isHoverable = false,
  isSelected = false,
  isDisabled = false,
  onClick,
  className = "",
  children,
}) => {
  const variantStyles = {
    default: "bg-bw-bg-primary border border-bw-border-ui",
    elevated: "bg-bw-bg-primary shadow-md border border-bw-border-ui",
    outlined: "bg-bw-bg-primary border-2 border-bw-border-layout",
    interactive: "bg-bw-bg-primary border border-bw-border-ui cursor-pointer",
  };

  const sizeStyles = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const hoverStyles = isHoverable
    ? "hover:shadow-lg hover:border-bw-primary-hover transition-all duration-200"
    : "";
  const selectedStyles = isSelected ? "ring-2 ring-bw-primary border-bw-primary" : "";
  const disabledStyles = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  const cardContent = (
    <>
      {image && (
        <div className="relative">
          <img
            src={image}
            alt={imageAlt || title || "Card image"}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {actions && <div className="absolute top-2 right-2">{actions}</div>}
        </div>
      )}

      <div className={sizeStyles[size]}>
        {(title || subtitle) && (
          <div className="mb-3">
            {title && <h3 className="text-lg font-semibold text-bw-text-primary mb-1 font-heading">{title}</h3>}
            {subtitle && <p className="text-sm text-bw-text-secondary font-sans">{subtitle}</p>}
          </div>
        )}

        {content && <div className="mb-4">{content}</div>}

        {children}
      </div>

      {footer && (
        <div className={`${sizeStyles[size]} pt-0 border-t border-bw-border-layout`}>{footer}</div>
      )}
    </>
  );

  const cardClasses = `
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${hoverStyles}
    ${selectedStyles}
    ${disabledStyles}
    rounded-lg
    ${className}
  `.trim();

  if (onClick && !isDisabled) {
    return (
      <div
        className={cardClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {cardContent}
      </div>
    );
  }

  return <div className={cardClasses}>{cardContent}</div>;
};

// Predefined card components
export const ProductCard: React.FC<{
  title: string;
  price: string;
  image: string;
  rating?: number;
  onAddToCart?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
  className?: string;
}> = ({
  title,
  price,
  image,
  rating,
  onAddToCart,
  onFavorite,
  isFavorited = false,
  className = "",
}) => {
  const [isLiked, setIsLiked] = React.useState(isFavorited);

  const handleFavorite = () => {
    setIsLiked(!isLiked);
    onFavorite?.();
  };

  return (
    <Card
      title={title}
      image={image}
      variant="interactive"
      isHoverable
      className={className}
      actions={
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFavorite();
          }}
          className="p-2 bg-bw-bg-primary rounded-full shadow-md hover:bg-bw-bg-secondary transition-colors"
        >
          <i
            className={cn(
              "w-4 h-4 fa-solid fa-heart",
              isLiked ? "text-bw-negative" : "text-bw-text-disabled",
            )}
          />
        </button>
      }
      footer={
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-bw-text-primary">{price}</span>
            {rating && (
              <div className="flex items-center mt-1">
                <span className="text-bw-warning">★</span>
                <span className="text-sm text-bw-text-secondary ml-1">{rating}</span>
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
            className="px-4 py-2 bg-bw-primary text-bw-on-primary rounded-sm hover:bg-bw-primary-hover transition-colors"
          >
            Add to Cart
          </button>
        </div>
      }
    />
  );
};

export const UserCard: React.FC<{
  name: string;
  role: string;
  avatar: string;
  email: string;
  onMessage?: () => void;
  onViewProfile?: () => void;
  className?: string;
}> = ({ name, role, avatar, email, onMessage, onViewProfile, className = "" }) => (
  <Card
    variant="interactive"
    isHoverable
    className={className}
    content={
        <div className="flex items-center space-x-3">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1">
          <h4 className="font-medium text-bw-text-primary font-heading">{name}</h4>
          <p className="text-sm text-bw-text-secondary font-sans">{role}</p>
          <p className="text-sm text-bw-text-placeholder font-sans">{email}</p>
        </div>
      </div>
    }
    footer={
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMessage?.();
          }}
          className="flex-1 px-3 py-2 bg-bw-primary text-bw-on-primary text-sm rounded hover:bg-bw-primary-hover transition-colors"
        >
          Message
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile?.();
          }}
          className="flex-1 px-3 py-2 bg-bw-bg-secondary text-bw-text-primary text-sm rounded hover:bg-bw-bg-primary-hover transition-colors"
        >
          View Profile
        </button>
      </div>
    }
  />
);

export const ArticleCard: React.FC<{
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  readTime?: string;
  onReadMore?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  className?: string;
}> = ({
  title,
  excerpt,
  author,
  date,
  image,
  readTime,
  onReadMore,
  onShare,
  onBookmark,
  className = "",
}) => (
  <Card
    title={title}
    image={image}
    variant="interactive"
    isHoverable
    className={className}
    content={
      <div>
        <p className="text-bw-text-secondary mb-3 line-clamp-3 font-sans">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-bw-text-placeholder font-sans">
          <span>{author}</span>
          <span>{date}</span>
          {readTime && <span>{readTime} read</span>}
        </div>
      </div>
    }
    actions={
      <div className="flex space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmark?.();
          }}
          className="p-2 bg-bw-bg-primary rounded-full shadow-md hover:bg-bw-bg-secondary transition-colors"
        >
          <i className="w-4 h-4 text-bw-text-disabled fa-solid fa-bookmark" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare?.();
          }}
          className="p-2 bg-bw-bg-primary rounded-full shadow-md hover:bg-bw-bg-secondary transition-colors"
        >
          <i className="w-4 h-4 text-bw-text-disabled fa-solid fa-share" />
        </button>
      </div>
    }
    footer={
      <button
        onClick={(e) => {
          e.stopPropagation();
          onReadMore?.();
        }}
        className="w-full px-4 py-2 bg-bw-primary text-bw-on-primary rounded-sm hover:bg-bw-primary-hover transition-colors"
      >
        Read More
      </button>
    }
  />
);
