import React, { useState, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, side = 'top', delay = 200, className }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const handleMouseEnter = () => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    const positionClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    };

    const arrowClasses = {
      top: 'top-full left-1/2 -translate-x-1/2 border-t-[#1F2937] border-x-transparent border-b-transparent',
      right: 'right-full top-1/2 -translate-y-1/2 border-r-[#1F2937] border-y-transparent border-l-transparent',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#1F2937] border-x-transparent border-t-transparent',
      left: 'left-full top-1/2 -translate-y-1/2 border-l-[#1F2937] border-y-transparent border-r-transparent',
    };

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}

        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              role="tooltip"
              className={cn(
                'absolute z-[1600] rounded-[0.375rem] bg-[#1F2937] px-3 py-1.5 text-sm text-white shadow-md pointer-events-none',
                'whitespace-nowrap md:whitespace-nowrap max-w-[200px] md:max-w-none',
                positionClasses[side],
                className
              )}
            >
              {content}

              {/* Arrow */}
              <div
                className={cn(
                  'absolute w-0 h-0 border-4',
                  arrowClasses[side]
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
