import React from "react";

export interface SignatureInputProps {
  value?: string;
  onChange?: (signature: string) => void;
  width?: number;
  height?: number;
  penColor?: string;
  penWidth?: number;
  backgroundColor?: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export const SignatureInput: React.FC<SignatureInputProps> = ({
  value = "",
  onChange,
  width = 400,
  height = 200,
  penColor = "#000000",
  penWidth = 2,
  backgroundColor = "#ffffff",
  placeholder = "Sign here...",
  readOnly = false,
  className = "",
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [hasSignature, setHasSignature] = React.useState(false);
  const [history, setHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Set background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Load existing signature
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        setHasSignature(true);
      };
      img.src = value;
    }
  }, [width, height, backgroundColor, value]);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (readOnly) return;

    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e as any).clientX - rect.left;
    const y = (e as any).clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || readOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e as any).clientX - rect.left;
    const y = (e as any).clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    setHasSignature(true);
    saveToHistory();
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signature = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(signature);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    onChange?.(signature);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    setHasSignature(false);
    onChange?.("");
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      loadFromHistory(history[newIndex]);
    } else if (historyIndex === 0) {
      clear();
      setHistoryIndex(-1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      loadFromHistory(history[newIndex]);
    }
  };

  const loadFromHistory = (signature: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      setHasSignature(true);
      onChange?.(signature);
    };
    img.src = signature;
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "signature.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={`border border-neutral-300 rounded-lg ${className}`}>
      {/* Toolbar */}
      {!readOnly && (
        <div className="flex items-center space-x-2 p-3 border-b border-neutral-200 bg-neutral-50">
          <button
            onClick={clear}
            className="p-2 text-neutral-600 hover:text-red-600 hover:bg-neutral-200 rounded transition-colors"
            title="Clear"
          >
            <i className="w-4 h-4 fa-solid fa-trash" />
          </button>
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <i className="w-4 h-4 fa-solid fa-undo" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <i className="w-4 h-4 fa-solid fa-redo" />
          </button>
          <div className="flex-1" />
          <button
            onClick={download}
            disabled={!hasSignature}
            className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download"
          >
            <i className="w-4 h-4 fa-solid fa-download" />
          </button>
        </div>
      )}

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair"
          style={{ width, height }}
        />
        {!hasSignature && !readOnly && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-neutral-400 text-lg">{placeholder}</p>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="p-3 border-t border-neutral-200 bg-neutral-50">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <span>{hasSignature ? "Signature captured" : "No signature yet"}</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div
                className="w-4 h-4 rounded border border-neutral-300"
                style={{ backgroundColor: penColor }}
              />
              <span>Pen color</span>
            </div>
            <span>•</span>
            <span>Width: {penWidth}px</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pre-built signature components
export const DocumentSignature: React.FC<{
  value?: string;
  onChange?: (signature: string) => void;
  readOnly?: boolean;
  className?: string;
}> = ({ value, onChange, readOnly, className = "" }) => {
  return (
    <SignatureInput
      value={value}
      onChange={onChange}
      width={500}
      height={150}
      penColor="#1f2937"
      penWidth={3}
      placeholder="Sign the document..."
      readOnly={readOnly}
      className={className}
    />
  );
};

export const CompactSignature: React.FC<{
  value?: string;
  onChange?: (signature: string) => void;
  readOnly?: boolean;
  className?: string;
}> = ({ value, onChange, readOnly, className = "" }) => {
  return (
    <SignatureInput
      value={value}
      onChange={onChange}
      width={300}
      height={100}
      penColor="#000000"
      penWidth={2}
      placeholder="Sign here..."
      readOnly={readOnly}
      className={className}
    />
  );
};
