import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheck, faTimes, faExclamation } from "@fortawesome/free-solid-svg-icons";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  status?: "completed" | "pending" | "error" | "warning";
  icon?: any;
  color?: string;
  children?: TimelineItem[];
}

export interface TimelineProps {
  items: TimelineItem[];
  variant?: "default" | "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  showConnectors?: boolean;
  showDates?: boolean;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  variant = "default",
  size = "md",
  showConnectors = true,
  showDates = true,
  className = "",
}) => {
  const sizeStyles = {
    sm: {
      container: "space-y-3",
      item: "text-sm",
      title: "text-sm",
      description: "text-xs",
      date: "text-xs",
      icon: "w-4 h-4",
      connector: "w-0.5",
    },
    md: {
      container: "space-y-4",
      item: "text-base",
      title: "text-base",
      description: "text-sm",
      date: "text-sm",
      icon: "w-5 h-5",
      connector: "w-1",
    },
    lg: {
      container: "space-y-6",
      item: "text-lg",
      title: "text-lg",
      description: "text-base",
      date: "text-base",
      icon: "w-6 h-6",
      connector: "w-1.5",
    },
  };

  const statusStyles = {
    completed: {
      icon: faCheck,
      color: "text-success-600",
      bg: "bg-success-100",
      border: "border-success-200",
    },
    pending: {
      icon: faCircle,
      color: "text-neutral-400",
      bg: "bg-neutral-100",
      border: "border-neutral-200",
    },
    error: {
      icon: faTimes,
      color: "text-error-600",
      bg: "bg-error-100",
      border: "border-error-200",
    },
    warning: {
      icon: faExclamation,
      color: "text-warning-600",
      bg: "bg-warning-100",
      border: "border-warning-200",
    },
  };

  const currentSize = sizeStyles[size];

  const renderTimelineItem = (item: TimelineItem, index: number, isLast: boolean) => {
    const status = item.status || "pending";
    const statusConfig = statusStyles[status];
    const IconComponent = item.icon || statusConfig.icon;

    return (
      <div key={item.id} className="relative">
        <div className="flex items-start space-x-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div
              className={`${currentSize.icon} ${statusConfig.bg} ${statusConfig.border} border-2 rounded-full flex items-center justify-center ${statusConfig.color}`}
            >
              <FontAwesomeIcon icon={IconComponent} className="w-3 h-3" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className={`${currentSize.title} font-medium text-neutral-900`}>{item.title}</h3>
              {showDates && (
                <span className={`${currentSize.date} text-neutral-500`}>{item.date}</span>
              )}
            </div>

            {item.description && (
              <p className={`${currentSize.description} text-neutral-600 mt-1`}>
                {item.description}
              </p>
            )}

            {/* Nested items */}
            {item.children && item.children.length > 0 && (
              <div className="mt-3 ml-4">
                <Timeline
                  items={item.children}
                  variant={variant}
                  size={size}
                  showConnectors={showConnectors}
                  showDates={showDates}
                />
              </div>
            )}
          </div>
        </div>

        {/* Connector */}
        {showConnectors && !isLast && (
          <div className={`absolute left-2.5 top-6 ${currentSize.connector} h-8 bg-neutral-200`} />
        )}
      </div>
    );
  };

  const renderVerticalTimeline = () => (
    <div className={`${currentSize.container} ${className}`}>
      {items.map((item, index) => renderTimelineItem(item, index, index === items.length - 1))}
    </div>
  );

  const renderHorizontalTimeline = () => (
    <div className={`flex space-x-8 overflow-x-auto pb-4 ${className}`}>
      {items.map((item, index) => {
        const status = item.status || "pending";
        const statusConfig = statusStyles[status];
        const IconComponent = item.icon || statusConfig.icon;

        return (
          <div key={item.id} className="flex-shrink-0 min-w-48">
            <div className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-3">
                <div
                  className={`${currentSize.icon} ${statusConfig.bg} ${statusConfig.border} border-2 rounded-full flex items-center justify-center ${statusConfig.color}`}
                >
                  <FontAwesomeIcon icon={IconComponent} className="w-3 h-3" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className={`${currentSize.title} font-medium text-neutral-900 mb-1`}>
                  {item.title}
                </h3>

                {item.description && (
                  <p className={`${currentSize.description} text-neutral-600 mb-2`}>
                    {item.description}
                  </p>
                )}

                {showDates && (
                  <span className={`${currentSize.date} text-neutral-500`}>{item.date}</span>
                )}
              </div>

              {/* Connector */}
              {showConnectors && index < items.length - 1 && (
                <div className="absolute top-3 left-full w-8 h-0.5 bg-neutral-200" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  if (variant === "horizontal") {
    return renderHorizontalTimeline();
  }

  return renderVerticalTimeline();
};

// Predefined timeline components
export const ActivityTimeline: React.FC<{
  activities: Array<{
    id: string;
    action: string;
    user: string;
    date: string;
    status: "completed" | "pending" | "error";
  }>;
  className?: string;
}> = ({ activities, className = "" }) => {
  const items: TimelineItem[] = activities.map((activity) => ({
    id: activity.id,
    title: activity.action,
    description: `by ${activity.user}`,
    date: activity.date,
    status: activity.status,
  }));

  return <Timeline items={items} variant="default" size="md" className={className} />;
};

export const ProjectTimeline: React.FC<{
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    status: "completed" | "pending" | "warning";
    progress?: number;
  }>;
  className?: string;
}> = ({ milestones, className = "" }) => {
  const items: TimelineItem[] = milestones.map((milestone) => ({
    id: milestone.id,
    title: milestone.title,
    description: milestone.description,
    date: milestone.date,
    status: milestone.status,
  }));

  return <Timeline items={items} variant="default" size="lg" className={className} />;
};

export const EventTimeline: React.FC<{
  events: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location?: string;
  }>;
  className?: string;
}> = ({ events, className = "" }) => {
  const items: TimelineItem[] = events.map((event) => ({
    id: event.id,
    title: event.title,
    description: `${event.time}${event.location ? ` • ${event.location}` : ""}`,
    date: event.date,
    status: "pending",
  }));

  return <Timeline items={items} variant="default" size="md" className={className} />;
};
