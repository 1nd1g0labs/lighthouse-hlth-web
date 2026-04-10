interface IconProps {
  className?: string;
  size?: number;
}

export function CarbonIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
    </svg>
  );
}

export function FootprintIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function CapitalIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 20h20" /><path d="M5 20v-8l4-4 4 4v8" /><path d="M17 20V8l4 4" />
    </svg>
  );
}

export function LighthouseBeam({ className, size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lighthouse HLTH"
    >
      {/* Beam — angled line from lower-left to upper-right */}
      <line x1="6" y1="26" x2="22" y2="6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Radiating point — circle at beam terminus */}
      <circle cx="22" cy="6" r="4" fill="currentColor" opacity="0.85" />
      <circle cx="22" cy="6" r="7" fill="currentColor" opacity="0.15" />
      {/* Base anchor — short horizontal at foundation */}
      <line x1="2" y1="28" x2="12" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LighthouseBeamSmall({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="6" y1="26" x2="22" y2="6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="22" cy="6" r="5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
