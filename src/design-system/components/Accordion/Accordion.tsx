import React from "react";
import { cn } from "../../../utils/utils";

export interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen?: boolean;
  isDisabled?: boolean;
  icon?: any;
  className?: string;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  variant?: "default" | "bordered" | "separated";
  size?: "sm" | "md" | "lg";
  allowMultiple?: boolean;
  defaultOpenItems?: number[];
  onToggle?: (index: number, isOpen: boolean) => void;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = "default",
  size = "md",
  allowMultiple = false,
  defaultOpenItems = [],
  onToggle,
  className = "",
}) => {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set(defaultOpenItems));

  const handleToggle = (index: number) => {
    if (items[index].isDisabled) return;

    const newOpenItems = new Set(openItems);

    if (allowMultiple) {
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
    } else {
      newOpenItems.clear();
      if (!newOpenItems.has(index)) {
        newOpenItems.add(index);
      }
    }

    setOpenItems(newOpenItems);
    onToggle?.(index, newOpenItems.has(index));
  };

  const variantStyles = {
    default: "border border-neutral-200 rounded-lg",
    bordered: "border border-neutral-200",
    separated: "border-b border-neutral-200 last:border-b-0",
  };

  const sizeStyles = {
    sm: {
      header: "px-3 py-2",
      content: "px-3 pb-2",
      title: "text-sm",
    },
    md: {
      header: "px-4 py-3",
      content: "px-4 pb-3",
      title: "text-base",
    },
    lg: {
      header: "px-6 py-4",
      content: "px-6 pb-4",
      title: "text-lg",
    },
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  return (
    <div className={`${className} mx-auto`}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        const isDisabled = item.isDisabled;

        return (
          <div
            key={index}
            className={`${currentVariant} ${
              variant === "separated" ? "" : index > 0 ? "mt-2" : ""
            }`}
          >
            <button
              onClick={() => handleToggle(index)}
              disabled={isDisabled}
              className={`w-full flex items-center justify-between ${currentSize.header} ${
                isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-neutral-50"
              } transition-colors duration-150`}
            >
              <div className="flex items-center space-x-3">
                {item.icon && <i className={cn("w-4 h-4 text-neutral-500", item.icon)} />}
                <h3 className={`font-medium text-neutral-900 ${currentSize.title} text-center`}>
                  {item.title}
                </h3>
              </div>
              <i
                className={cn(
                  "w-4 h-4 text-neutral-500 transition-transform duration-200",
                  isOpen ? "rotate-0" : "-rotate-90",
                  isOpen ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up",
                )}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-200 ease-out-quart ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className={`${currentSize.content} text-neutral-700 text-left`}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Individual accordion item component
export const AccordionItem: React.FC<{
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  isDisabled?: boolean;
  icon?: string;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
}> = ({ title, children, isOpen = false, isDisabled = false, icon, onToggle, className = "" }) => {
  const [isExpanded, setIsExpanded] = React.useState(isOpen);

  const handleToggle = () => {
    if (isDisabled) return;

    const newState = !isExpanded;
    setIsExpanded(newState);
    onToggle?.(newState);
  };

  return (
    <div className={`border border-neutral-200 rounded-lg ${className} mx-auto`}>
      <button
        onClick={handleToggle}
        disabled={isDisabled}
        className={`w-full flex items-center justify-between px-4 py-3 ${
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-neutral-50"
        } transition-colors duration-150`}
      >
        <div className="flex items-center space-x-3">
          {icon && <i className={cn("w-4 h-4 text-neutral-500", icon)} />}
          <h3 className="font-medium text-neutral-900 text-center">{title}</h3>
        </div>
        <i
          className={cn(
            "w-4 h-4 text-neutral-500 transition-transform duration-200",
            isExpanded ? "rotate-0" : "-rotate-90",
            isExpanded ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up",
          )}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ease-out-quart ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-3 text-neutral-700 text-left">{children}</div>
      </div>
    </div>
  );
};

// FAQ Accordion component
export const FAQAccordion: React.FC<{
  questions: Array<{
    question: string;
    answer: string;
  }>;
  className?: string;
}> = ({ questions, className = "" }) => {
  const items = questions.map(({ question, answer }) => ({
    title: question,
    content: <p className="text-neutral-600 leading-relaxed">{answer}</p>,
  }));

  return <Accordion items={items} variant="separated" allowMultiple={true} className={className} />;
};

// Settings Accordion component
export const SettingsAccordion: React.FC<{
  sections: Array<{
    title: string;
    icon?: any;
    content: React.ReactNode;
  }>;
  className?: string;
}> = ({ sections, className = "" }) => {
  const items = sections.map(({ title, icon, content }) => ({
    title,
    icon,
    content,
  }));

  return <Accordion items={items} variant="bordered" allowMultiple={false} className={className} />;
};
