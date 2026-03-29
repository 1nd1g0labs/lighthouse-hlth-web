import React, { useState, useCallback, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Search, Info, History, TrendingUp } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ConfidenceBadge } from './ConfidenceBadge';

/**
 * EmissionFactorMatcher Component
 *
 * Search and select emission factors with confidence scoring and audit trails.
 * Supports both modal and inline display modes.
 *
 * Features:
 * - Debounced search (300ms delay)
 * - Confidence visualization with badges
 * - Audit trail display ("Used 12x, last on 2024-11-15")
 * - Explanation tooltips ("Why this factor?")
 * - Modal and inline variants
 * - Keyboard navigation (Arrow keys, Enter, Esc)
 *
 * WCAG 2.1 AA Compliance:
 * - Semantic HTML with proper ARIA attributes ✓
 * - Keyboard accessible (Tab, Arrow keys, Enter, Esc) ✓
 * - Focus indicators visible ✓
 * - Color contrast 4.5:1+ ✓
 * - Screen reader announcements for search results ✓
 *
 * @example
 * ```tsx
 * const factors = [
 *   {
 *     id: 'ef-1',
 *     name: 'Natural Gas - Stationary Combustion',
 *     category: 'Scope 1 - Direct Emissions',
 *     confidence: 92,
 *     usageCount: 145,
 *     lastUsed: '2024-11-15',
 *     explanation: 'Based on description matching and usage patterns'
 *   }
 * ];
 *
 * <EmissionFactorMatcher
 *   factors={factors}
 *   onSelect={(factor) => console.log('Selected:', factor)}
 * />
 * ```
 */

export interface EmissionFactorMatch {
  id: string;
  name: string;
  category: string;
  confidence: number;
  unit?: string;
  usageCount?: number;
  lastUsed?: string;
  explanation?: string;
  factor?: number; // kg CO2e per unit
}

const matcherVariants = cva(
  [
    'flex flex-col',
    'bg-white',
    'rounded-lg',
  ].join(' '),
  {
    variants: {
      variant: {
        inline: 'border border-border-subtle',
        modal: 'shadow-modal',
      },
    },
    defaultVariants: {
      variant: 'inline',
    },
  }
);

export interface EmissionFactorMatcherProps
  extends VariantProps<typeof matcherVariants> {
  /**
   * Available emission factors
   */
  factors: EmissionFactorMatch[];

  /**
   * Callback when factor is selected
   */
  onSelect?: (factor: EmissionFactorMatch) => void;

  /**
   * Search query (controlled)
   */
  searchQuery?: string;

  /**
   * Search change callback (controlled)
   */
  onSearchChange?: (query: string) => void;

  /**
   * Placeholder for search input
   * @default 'Search emission factors...'
   */
  placeholder?: string;

  /**
   * Display variant
   * @default 'inline'
   */
  variant?: 'inline' | 'modal';

  /**
   * Show audit trail (usage count, last used)
   * @default true
   */
  showAuditTrail?: boolean;

  /**
   * Show explanation tooltips
   * @default true
   */
  showExplanation?: boolean;

  /**
   * Loading state
   */
  isLoading?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Maximum height for results list
   * @default 400
   */
  maxHeight?: number;
}

export const EmissionFactorMatcher: React.FC<EmissionFactorMatcherProps> = ({
  factors = [],
  onSelect,
  searchQuery: controlledQuery,
  onSearchChange,
  placeholder = 'Search emission factors...',
  variant = 'inline',
  showAuditTrail = true,
  showExplanation = true,
  isLoading = false,
  className,
  maxHeight = 400,
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Use controlled or uncontrolled query
  const searchQuery = controlledQuery !== undefined ? controlledQuery : internalQuery;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter factors based on debounced query
  const filteredFactors = debouncedQuery
    ? factors.filter((factor) =>
        factor.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        factor.category.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : factors;

  // Sort by confidence (descending)
  const sortedFactors = [...filteredFactors].sort((a, b) => b.confidence - a.confidence);

  // Handle search change
  const handleSearchChange = useCallback(
    (value: string) => {
      if (onSearchChange) {
        onSearchChange(value);
      } else {
        setInternalQuery(value);
      }
      setSelectedIndex(0);
    },
    [onSearchChange]
  );

  // Handle factor selection
  const handleSelect = useCallback(
    (factor: EmissionFactorMatch) => {
      onSelect?.(factor);
      handleSearchChange('');
      searchInputRef.current?.blur();
    },
    [onSelect, handleSearchChange]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (sortedFactors.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, sortedFactors.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (sortedFactors[selectedIndex]) {
            handleSelect(sortedFactors[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleSearchChange('');
          searchInputRef.current?.blur();
          break;
      }
    },
    [sortedFactors, selectedIndex, handleSelect, handleSearchChange]
  );

  return (
    <div className={cn(matcherVariants({ variant }), className)}>
      {/* Search Input */}
      <div className="relative p-4 border-b border-border-subtle">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              'w-full pl-10 pr-4 py-2.5',
              'text-app-body text-text-main',
              'bg-white border border-border-subtle rounded-lg',
              'placeholder:text-text-muted',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'transition-all duration-200'
            )}
            aria-label="Search emission factors"
            aria-autocomplete="list"
            aria-controls="factor-results"
            aria-activedescendant={
              sortedFactors[selectedIndex] ? `factor-${sortedFactors[selectedIndex].id}` : undefined
            }
          />
        </div>

        {/* Search status */}
        {debouncedQuery && (
          <p
            className="mt-2 text-app-body-sm text-text-secondary"
            role="status"
            aria-live="polite"
          >
            {isLoading ? (
              'Searching...'
            ) : (
              <>
                {sortedFactors.length} result{sortedFactors.length !== 1 ? 's' : ''} found
              </>
            )}
          </p>
        )}
      </div>

      {/* Results List */}
      <div
        id="factor-results"
        className="overflow-auto"
        style={{ maxHeight: `${maxHeight}px` }}
        role="listbox"
        aria-label="Emission factor search results"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : sortedFactors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Search size={48} className="text-text-disabled mb-3" />
            <p className="text-app-body text-text-secondary">
              {debouncedQuery
                ? 'No emission factors match your search'
                : 'Start typing to search emission factors'}
            </p>
          </div>
        ) : (
          <div className="py-2">
            {sortedFactors.map((factor, index) => (
              <FactorMatchCard
                key={factor.id}
                factor={factor}
                isSelected={index === selectedIndex}
                showAuditTrail={showAuditTrail}
                showExplanation={showExplanation}
                onSelect={() => handleSelect(factor)}
                onShowTooltip={(show) => setShowTooltip(show ? factor.id : null)}
                isTooltipVisible={showTooltip === factor.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      {variant === 'modal' && (
        <div className="px-4 py-3 border-t border-border-subtle bg-neutral-50">
          <p className="text-app-body-xs text-text-secondary">
            <kbd className="px-1.5 py-0.5 bg-white border border-border-muted rounded text-app-caption font-mono">↑↓</kbd>
            {' '}navigate,{' '}
            <kbd className="px-1.5 py-0.5 bg-white border border-border-muted rounded text-app-caption font-mono">Enter</kbd>
            {' '}select,{' '}
            <kbd className="px-1.5 py-0.5 bg-white border border-border-muted rounded text-app-caption font-mono">Esc</kbd>
            {' '}close
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * FactorMatchCard - Individual factor result card
 */
interface FactorMatchCardProps {
  factor: EmissionFactorMatch;
  isSelected: boolean;
  showAuditTrail: boolean;
  showExplanation: boolean;
  onSelect: () => void;
  onShowTooltip: (show: boolean) => void;
  isTooltipVisible: boolean;
}

const FactorMatchCard: React.FC<FactorMatchCardProps> = ({
  factor,
  isSelected,
  showAuditTrail,
  showExplanation,
  onSelect,
  onShowTooltip,
  isTooltipVisible,
}) => {
  return (
    <button
      id={`factor-${factor.id}`}
      onClick={onSelect}
      className={cn(
        'w-full px-4 py-3 text-left',
        'hover:bg-neutral-50 transition-colors',
        'focus:outline-none focus:bg-neutral-50',
        isSelected && 'bg-primary-50 border-l-4 border-primary-500',
        !isSelected && 'border-l-4 border-transparent'
      )}
      role="option"
      aria-selected={isSelected}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Factor Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-app-body font-semibold text-text-main truncate">
              {factor.name}
            </h4>
            <ConfidenceBadge score={factor.confidence} size="sm" />
          </div>

          <p className="text-app-body-sm text-text-secondary mb-2">
            {factor.category}
          </p>

          {/* Audit Trail */}
          {showAuditTrail && (factor.usageCount !== undefined || factor.lastUsed) && (
            <div className="flex items-center gap-3 text-app-body-xs text-text-muted">
              {factor.usageCount !== undefined && (
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} aria-hidden="true" />
                  <span>Used {factor.usageCount}x</span>
                </div>
              )}
              {factor.lastUsed && (
                <div className="flex items-center gap-1">
                  <History size={12} aria-hidden="true" />
                  <span>Last: {formatDate(factor.lastUsed)}</span>
                </div>
              )}
            </div>
          )}

          {/* Factor Value */}
          {factor.factor !== undefined && (
            <p className="text-app-body-xs text-text-secondary mt-2">
              {factor.factor} kg CO2e{factor.unit ? ` per ${factor.unit}` : ''}
            </p>
          )}
        </div>

        {/* Explanation Tooltip */}
        {showExplanation && factor.explanation && (
          <div className="relative">
            <button
              onMouseEnter={() => onShowTooltip(true)}
              onMouseLeave={() => onShowTooltip(false)}
              onFocus={() => onShowTooltip(true)}
              onBlur={() => onShowTooltip(false)}
              className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Why this factor?"
              onClick={(e) => {
                e.stopPropagation();
                onShowTooltip(!isTooltipVisible);
              }}
            >
              <Info size={16} className="text-text-muted" />
            </button>

            {isTooltipVisible && (
              <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-neutral-900 text-white text-app-body-xs rounded-lg shadow-tooltip z-tooltip">
                <p className="font-semibold mb-1">Why this factor?</p>
                <p className="text-neutral-300">{factor.explanation}</p>
                <div className="absolute -top-1.5 right-4 w-3 h-3 bg-neutral-900 transform rotate-45" />
              </div>
            )}
          </div>
        )}
      </div>
    </button>
  );
};

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateString;
  }
}

EmissionFactorMatcher.displayName = 'EmissionFactorMatcher';
