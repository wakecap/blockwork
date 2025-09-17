import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

export interface SplitViewProps {
  children: [React.ReactNode, React.ReactNode];
  direction?: 'horizontal' | 'vertical';
  initialSizes?: [number, number]; // percentages
  minSizes?: [number, number]; // minimum sizes in pixels
  maxSizes?: [number, number]; // maximum sizes in pixels
  showDivider?: boolean;
  dividerSize?: number;
  className?: string;
  onResize?: (sizes: [number, number]) => void;
}

export const SplitView: React.FC<SplitViewProps> = ({
  children,
  direction = 'horizontal',
  initialSizes = [50, 50],
  minSizes = [100, 100],
  maxSizes = [undefined, undefined],
  showDivider = true,
  dividerSize = 4,
  className = '',
  onResize,
}) => {
  const [sizes, setSizes] = React.useState<[number, number]>(initialSizes);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const startPosRef = React.useRef<{ x: number; y: number } | null>(null);
  const startSizesRef = React.useRef<[number, number]>([0, 0]);

  const isHorizontal = direction === 'horizontal';

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !startPosRef.current || !startSizesRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      let delta: number;

      if (isHorizontal) {
        delta = e.clientX - startPosRef.current.x;
        const containerWidth = containerRect.width;
        const deltaPercent = (delta / containerWidth) * 100;
        
        let newSize1 = startSizesRef.current[0] + deltaPercent;
        let newSize2 = startSizesRef.current[1] - deltaPercent;

        // Apply constraints
        if (minSizes[0] !== undefined) {
          const minPercent1 = (minSizes[0] / containerWidth) * 100;
          newSize1 = Math.max(newSize1, minPercent1);
        }
        if (minSizes[1] !== undefined) {
          const minPercent2 = (minSizes[1] / containerWidth) * 100;
          newSize2 = Math.max(newSize2, minPercent2);
        }
        if (maxSizes[0] !== undefined) {
          const maxPercent1 = (maxSizes[0] / containerWidth) * 100;
          newSize1 = Math.min(newSize1, maxPercent1);
        }
        if (maxSizes[1] !== undefined) {
          const maxPercent2 = (maxSizes[1] / containerWidth) * 100;
          newSize2 = Math.min(newSize2, maxPercent2);
        }

        // Ensure total is 100%
        const total = newSize1 + newSize2;
        if (total !== 100) {
          const adjustment = (100 - total) / 2;
          newSize1 += adjustment;
          newSize2 += adjustment;
        }

        setSizes([newSize1, newSize2]);
        onResize?.([newSize1, newSize2]);
      } else {
        delta = e.clientY - startPosRef.current.y;
        const containerHeight = containerRect.height;
        const deltaPercent = (delta / containerHeight) * 100;
        
        let newSize1 = startSizesRef.current[0] + deltaPercent;
        let newSize2 = startSizesRef.current[1] - deltaPercent;

        // Apply constraints
        if (minSizes[0] !== undefined) {
          const minPercent1 = (minSizes[0] / containerHeight) * 100;
          newSize1 = Math.max(newSize1, minPercent1);
        }
        if (minSizes[1] !== undefined) {
          const minPercent2 = (minSizes[1] / containerHeight) * 100;
          newSize2 = Math.max(newSize2, minPercent2);
        }
        if (maxSizes[0] !== undefined) {
          const maxPercent1 = (maxSizes[0] / containerHeight) * 100;
          newSize1 = Math.min(newSize1, maxPercent1);
        }
        if (maxSizes[1] !== undefined) {
          const maxPercent2 = (maxSizes[1] / containerHeight) * 100;
          newSize2 = Math.min(newSize2, maxPercent2);
        }

        // Ensure total is 100%
        const total = newSize1 + newSize2;
        if (total !== 100) {
          const adjustment = (100 - total) / 2;
          newSize1 += adjustment;
          newSize2 += adjustment;
        }

        setSizes([newSize1, newSize2]);
        onResize?.([newSize1, newSize2]);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      startPosRef.current = null;
      startSizesRef.current = [0, 0];
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isHorizontal, minSizes, maxSizes, onResize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    if (isHorizontal) {
      startPosRef.current = { x: e.clientX, y: e.clientY };
    } else {
      startPosRef.current = { x: e.clientX, y: e.clientY };
    }
    
    startSizesRef.current = [...sizes];
  };

  const getPanelStyles = (index: number) => {
    const size = sizes[index];
    if (isHorizontal) {
      return { width: `${size}%` };
    } else {
      return { height: `${size}%` };
    }
  };

  const getContainerStyles = () => {
    if (isHorizontal) {
      return 'flex-row';
    } else {
      return 'flex-col';
    }
  };

  const getDividerStyles = () => {
    if (isHorizontal) {
      return `w-${dividerSize} cursor-col-resize`;
    } else {
      return `h-${dividerSize} cursor-row-resize`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex ${getContainerStyles()} ${className}`}
      style={{ height: '100%' }}
    >
      {/* First Panel */}
      <div
        className="flex-shrink-0 overflow-hidden"
        style={getPanelStyles(0)}
      >
        {children[0]}
      </div>

      {/* Divider */}
      {showDivider && (
        <div
          className={`flex items-center justify-center bg-neutral-200 hover:bg-neutral-300 transition-colors ${getDividerStyles()}`}
          onMouseDown={handleMouseDown}
          style={{
            cursor: isHorizontal ? 'col-resize' : 'row-resize',
            userSelect: 'none',
          }}
        >
          <FontAwesomeIcon
            icon={faGripVertical}
            className={`text-neutral-400 ${isHorizontal ? '' : 'rotate-90'}`}
          />
        </div>
      )}

      {/* Second Panel */}
      <div
        className="flex-shrink-0 overflow-hidden"
        style={getPanelStyles(1)}
      >
        {children[1]}
      </div>
    </div>
  );
};

// Pre-built split view components
export const HorizontalSplit: React.FC<{
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  leftSize?: number;
  rightSize?: number;
  minLeftSize?: number;
  minRightSize?: number;
  className?: string;
}> = ({ leftPanel, rightPanel, leftSize = 50, rightSize = 50, minLeftSize, minRightSize, className = '' }) => {
  return (
    <SplitView
      direction="horizontal"
      initialSizes={[leftSize, rightSize]}
      minSizes={[minLeftSize, minRightSize]}
      className={className}
    >
      {leftPanel}
      {rightPanel}
    </SplitView>
  );
};

export const VerticalSplit: React.FC<{
  topPanel: React.ReactNode;
  bottomPanel: React.ReactNode;
  topSize?: number;
  bottomSize?: number;
  minTopSize?: number;
  minBottomSize?: number;
  className?: string;
}> = ({ topPanel, bottomPanel, topSize = 50, bottomSize = 50, minTopSize, minBottomSize, className = '' }) => {
  return (
    <SplitView
      direction="vertical"
      initialSizes={[topSize, bottomSize]}
      minSizes={[minTopSize, minBottomSize]}
      className={className}
    >
      {topPanel}
      {bottomPanel}
    </SplitView>
  );
};

export const ThreePanelSplit: React.FC<{
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  leftSize?: number;
  centerSize?: number;
  rightSize?: number;
  className?: string;
}> = ({ leftPanel, centerPanel, rightPanel, leftSize = 25, centerSize = 50, rightSize = 25, className = '' }) => {
  return (
    <div className={`flex h-full ${className}`}>
      <div className="flex-shrink-0" style={{ width: `${leftSize}%` }}>
        {leftPanel}
      </div>
      <div className="flex-shrink-0" style={{ width: `${centerSize}%` }}>
        {centerPanel}
      </div>
      <div className="flex-shrink-0" style={{ width: `${rightSize}%` }}>
        {rightPanel}
      </div>
    </div>
  );
};
