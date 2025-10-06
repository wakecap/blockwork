import React from "react";

export interface CommandAction {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  keywords?: string[];
  action: () => void;
  category?: string;
  shortcut?: string;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  actions: CommandAction[];
  placeholder?: string;
  title?: string;
  className?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  actions,
  placeholder = "Search commands...",
  title = "Command Palette",
  className = "",
}) => {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [filteredActions, setFilteredActions] = React.useState<CommandAction[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!query.trim()) {
      setFilteredActions(actions);
      setSelectedIndex(0);
      return;
    }

    const filtered = actions.filter((action) => {
      const searchText =
        `${action.title} ${action.description || ""} ${action.keywords?.join(" ") || ""}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    setFilteredActions(filtered);
    setSelectedIndex(0);
  }, [query, actions]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
          break;
        case "Enter":
          e.preventDefault();
          if (filteredActions[selectedIndex]) {
            filteredActions[selectedIndex].action();
            onClose();
          }
          break;
        case "k":
        case "K":
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            onClose();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  const handleActionClick = (action: CommandAction) => {
    action.action();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div
          className={`w-full max-w-2xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all ${className}`}
        >
          {/* Header */}
          <div className="border-b border-neutral-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                <i className="w-5 h-5 fa-solid fa-times" />
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="border-b border-neutral-200 px-6 py-4">
            <div className="relative">
              <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 fa-solid fa-search" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3 border-0 text-lg placeholder-neutral-400 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredActions.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <i className="w-12 h-12 text-neutral-300 mx-auto mb-4 fa-solid fa-search" />
                <p className="text-neutral-500 text-lg">No commands found</p>
                <p className="text-neutral-400 text-sm">Try a different search term</p>
              </div>
            ) : (
              <div className="py-2">
                {filteredActions.map((action, index) => (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action)}
                    className={`w-full px-6 py-3 text-left hover:bg-neutral-50 transition-colors ${
                      index === selectedIndex ? "bg-neutral-100" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-neutral-500">
                        {action.icon || <i className="w-4 h-4 fa-solid fa-keyboard" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-neutral-900 truncate">
                            {action.title}
                          </h3>
                          {action.shortcut && (
                            <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded">
                              {action.shortcut}
                            </span>
                          )}
                        </div>
                        {action.description && (
                          <p className="text-sm text-neutral-500 truncate mt-1">
                            {action.description}
                          </p>
                        )}
                        {action.category && (
                          <span className="inline-block text-xs text-neutral-400 bg-neutral-50 px-2 py-1 rounded mt-1">
                            {action.category}
                          </span>
                        )}
                      </div>

                      {/* Selection Indicator */}
                      {index === selectedIndex && (
                        <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-200 px-6 py-3 bg-neutral-50">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <i className="w-3 h-3 fa-solid fa-arrow-up" />
                  <i className="w-3 h-3 fa-solid fa-arrow-down" />
                  <span>Navigate</span>
                </span>
                <span>Enter to select</span>
              </div>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook for managing command palette state
export const useCommandPalette = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, open, close, toggle };
};

// Pre-built command palette components
export const GlobalCommandPalette: React.FC<{
  actions: CommandAction[];
  className?: string;
}> = ({ actions, className = "" }) => {
  const { isOpen, open, close } = useCommandPalette();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={close}
      actions={actions}
      title="Global Commands"
      placeholder="Search commands, files, and more..."
      className={className}
    />
  );
};

export const QuickActionsPalette: React.FC<{
  actions: CommandAction[];
  className?: string;
}> = ({ actions, className = "" }) => {
  const { isOpen, open, close } = useCommandPalette();

  return (
    <>
      <button
        onClick={open}
        className="inline-flex items-center px-4 py-2 bg-neutral-100 text-neutral-700 rounded-sm hover:bg-neutral-200 transition-colors"
      >
        <i className="w-4 h-4 mr-2 fa-solid fa-keyboard" />
        Quick Actions
      </button>

      <CommandPalette
        isOpen={isOpen}
        onClose={close}
        actions={actions}
        title="Quick Actions"
        placeholder="Search actions..."
        className={className}
      />
    </>
  );
};
