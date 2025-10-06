import React from "react";
import { cn } from "../../../utils/utils";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  mode?: "wysiwyg" | "markdown";
  placeholder?: string;
  readOnly?: boolean;
  toolbar?: string[];
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  mode = "wysiwyg",
  placeholder = "Start writing...",
  readOnly = false,
  toolbar = [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "heading",
    "list",
    "quote",
    "code",
    "link",
  ],
  className = "",
}) => {
  const [isMarkdownPreview, setIsMarkdownPreview] = React.useState(false);
  const editorRef = React.useRef<HTMLDivElement>(null);

  const toolbarItems = {
    bold: { icon: "fa-solid fa-bold", label: "Bold", command: "bold" },
    italic: { icon: "fa-solid fa-italic", label: "Italic", command: "italic" },
    underline: { icon: "fa-solid fa-underline", label: "Underline", command: "underline" },
    strikethrough: {
      icon: "fa-solid fa-strikethrough",
      label: "Strikethrough",
      command: "strikeThrough",
    },
    heading: { icon: "fa-solid fa-heading", label: "Heading", command: "formatBlock" },
    list: { icon: "fa-solid fa-list-ul", label: "List", command: "insertUnorderedList" },
    orderedList: {
      icon: "fa-solid fa-list-ol",
      label: "Ordered List",
      command: "insertOrderedList",
    },
    quote: { icon: "fa-solid fa-quote-left", label: "Quote", command: "formatBlock" },
    code: { icon: "fa-solid fa-code", label: "Code", command: "formatBlock" },
    link: { icon: "fa-solid fa-link", label: "Link", command: "createLink" },
  };

  const handleToolbarClick = (command: string, value?: string) => {
    if (readOnly) return;

    if (mode === "wysiwyg") {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
    } else {
      // Markdown mode - insert markdown syntax
      const textarea = editorRef.current?.querySelector("textarea") as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        let replacement = "";
        switch (command) {
          case "bold":
            replacement = `**${selectedText}**`;
            break;
          case "italic":
            replacement = `*${selectedText}*`;
            break;
          case "strikethrough":
            replacement = `~~${selectedText}~~`;
            break;
          case "heading":
            replacement = `# ${selectedText}`;
            break;
          case "list":
            replacement = `- ${selectedText}`;
            break;
          case "orderedList":
            replacement = `1. ${selectedText}`;
            break;
          case "quote":
            replacement = `> ${selectedText}`;
            break;
          case "code":
            replacement = `\`${selectedText}\``;
            break;
          case "link":
            const url = prompt("Enter URL:");
            if (url) {
              replacement = `[${selectedText}](${url})`;
            } else {
              return;
            }
            break;
        }

        const newValue =
          textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
        onChange(newValue);

        // Set cursor position
        setTimeout(() => {
          textarea.setSelectionRange(start + replacement.length, start + replacement.length);
          textarea.focus();
        }, 0);
      }
    }
  };

  const renderMarkdownPreview = (markdown: string) => {
    // Simple markdown to HTML conversion
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/~~(.*?)~~/g, "<del>$1</del>")
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^- (.*$)/gm, "<li>$1</li>")
      .replace(/^(\d+)\. (.*$)/gm, "<li>$2</li>")
      .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, "<br>");

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className={`border border-neutral-300 rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-2 border-b border-neutral-200 bg-neutral-50">
        {toolbar.map((item) => {
          const toolbarItem = toolbarItems[item as keyof typeof toolbarItems];
          if (!toolbarItem) return null;

          return (
            <button
              key={item}
              onClick={() => handleToolbarClick(toolbarItem.command)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded transition-colors"
              title={toolbarItem.label}
              disabled={readOnly}
            >
              <i className={cn("w-4 h-4", toolbarItem.icon)} />
            </button>
          );
        })}

        {mode === "markdown" && (
          <div className="ml-auto flex items-center space-x-2">
            <button
              onClick={() => setIsMarkdownPreview(!isMarkdownPreview)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded transition-colors"
              title={isMarkdownPreview ? "Edit" : "Preview"}
            >
              <i
                className={cn(
                  "w-4 h-4",
                  isMarkdownPreview ? "fa-solid fa-eye-slash" : "fa-solid fa-eye",
                )}
              />
            </button>
            <span className="text-xs text-neutral-500">
              {isMarkdownPreview ? "Preview" : "Markdown"}
            </span>
          </div>
        )}
      </div>

      {/* Editor */}
      <div ref={editorRef} className="min-h-48">
        {mode === "wysiwyg" ? (
          <div
            contentEditable={!readOnly}
            onInput={(e) => onChange(e.currentTarget.innerHTML)}
            onBlur={(e) => onChange(e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: value }}
            className="p-4 focus:outline-none min-h-48"
            style={{ minHeight: "12rem" }}
          />
        ) : (
          <div className="relative">
            {isMarkdownPreview ? (
              <div className="p-4 min-h-48 prose prose-sm max-w-none">
                {renderMarkdownPreview(value)}
              </div>
            ) : (
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                readOnly={readOnly}
                className="w-full p-4 border-0 focus:outline-none resize-none min-h-48 font-mono text-sm"
                style={{ minHeight: "12rem" }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Pre-built rich text editor components
export const WYSIWYGEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}> = ({ value, onChange, placeholder, readOnly, className = "" }) => {
  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      mode="wysiwyg"
      placeholder={placeholder}
      readOnly={readOnly}
      className={className}
    />
  );
};

export const MarkdownEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}> = ({ value, onChange, placeholder, readOnly, className = "" }) => {
  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      mode="markdown"
      placeholder={placeholder}
      readOnly={readOnly}
      className={className}
    />
  );
};

export const SimpleEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}> = ({ value, onChange, placeholder, readOnly, className = "" }) => {
  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      mode="wysiwyg"
      placeholder={placeholder}
      readOnly={readOnly}
      toolbar={["bold", "italic", "underline", "list", "link"]}
      className={className}
    />
  );
};
