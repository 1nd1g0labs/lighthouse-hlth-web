import React, { forwardRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  open?: boolean;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      open = false,
      onClose,
      size = 'md',
      closeOnOverlayClick = true,
      showCloseButton = true,
      children,
    },
    ref
  ) => {
    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open && onClose) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-[95vw]',
    };

    return (
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[1300] bg-black/50"
              onClick={closeOnOverlayClick ? onClose : undefined}
              aria-hidden="true"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[1400] overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-2 md:p-4">
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                  role="dialog"
                  aria-modal="true"
                  className={cn(
                    'relative w-full rounded-[0.75rem] bg-white dark:bg-gray-900 shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.25)]',
                    'p-4 md:p-6',
                    'max-h-[calc(100vh-1rem)] md:max-h-[calc(100vh-2rem)] overflow-y-auto',
                    sizeClasses[size],
                    className
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  {showCloseButton && onClose && (
                    <button
                      onClick={onClose}
                      className="absolute right-3 top-3 md:right-4 md:top-4 rounded-[0.375rem] p-1.5 md:p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors touch-manipulation z-10"
                      aria-label="Close modal"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}

                  {children}
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

Modal.displayName = 'Modal';

export const ModalHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
));

ModalHeader.displayName = 'ModalHeader';

export const ModalTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-[1.25rem] md:text-[1.5rem] font-semibold leading-none tracking-tight text-gray-900 pr-8',
      className
    )}
    {...props}
  />
));

ModalTitle.displayName = 'ModalTitle';

export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-500', className)} {...props} />
));

ModalDescription.displayName = 'ModalDescription';

export const ModalContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('py-4', className)} {...props} />
));

ModalContent.displayName = 'ModalContent';

export const ModalFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-end gap-3 pt-4', className)}
    {...props}
  />
));

ModalFooter.displayName = 'ModalFooter';
