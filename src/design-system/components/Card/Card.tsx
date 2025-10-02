import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faHeart, faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";

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
    default: "bg-white border border-neutral-200",
    elevated: "bg-white shadow-md border border-neutral-200",
    outlined: "bg-white border-2 border-neutral-300",
    interactive: "bg-white border border-neutral-200 cursor-pointer",
  };

  const sizeStyles = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const hoverStyles = isHoverable
    ? "hover:shadow-lg hover:border-neutral-300 transition-all duration-200"
    : "";
  const selectedStyles = isSelected ? "ring-2 ring-primary-500 border-primary-500" : "";
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
            {title && <h3 className="text-lg font-semibold text-neutral-900 mb-1">{title}</h3>}
            {subtitle && <p className="text-sm text-neutral-600">{subtitle}</p>}
          </div>
        )}

        {content && <div className="mb-4">{content}</div>}

        {children}
      </div>

      {footer && (
        <div className={`${sizeStyles[size]} pt-0 border-t border-neutral-100`}>{footer}</div>
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
          className="p-2 bg-white rounded-full shadow-md hover:bg-neutral-50 transition-colors"
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`w-4 h-4 ${isLiked ? "text-red-500" : "text-neutral-400"}`}
          />
        </button>
      }
      footer={
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-neutral-900">{price}</span>
            {rating && (
              <div className="flex items-center mt-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-neutral-600 ml-1">{rating}</span>
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-sm hover:bg-primary-700 transition-colors"
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
          <h4 className="font-medium text-neutral-900">{name}</h4>
          <p className="text-sm text-neutral-600">{role}</p>
          <p className="text-sm text-neutral-500">{email}</p>
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
          className="flex-1 px-3 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
        >
          Message
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile?.();
          }}
          className="flex-1 px-3 py-2 bg-neutral-200 text-neutral-700 text-sm rounded hover:bg-neutral-300 transition-colors"
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
        <p className="text-neutral-700 mb-3 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-neutral-500">
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
          className="p-2 bg-white rounded-full shadow-md hover:bg-neutral-50 transition-colors"
        >
          <FontAwesomeIcon icon={faBookmark} className="w-4 h-4 text-neutral-400" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare?.();
          }}
          className="p-2 bg-white rounded-full shadow-md hover:bg-neutral-50 transition-colors"
        >
          <FontAwesomeIcon icon={faShare} className="w-4 h-4 text-neutral-400" />
        </button>
      </div>
    }
    footer={
      <button
        onClick={(e) => {
          e.stopPropagation();
          onReadMore?.();
        }}
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-sm hover:bg-primary-700 transition-colors"
      >
        Read More
      </button>
    }
  />
);
