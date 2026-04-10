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
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lighthouse HLTH"
    >
      {/* Body: bell-tapered silhouette, closed path */}
      <path d="M 4 28 Q 6 22 13 13 L 19 13 Q 26 22 28 28 Z" />
      {/* Cross vertical — continues from body apex upward */}
      <path d="M 16 3 L 16 13" />
      {/* Cross horizontal — the light beam */}
      <path d="M 10 7 L 22 7" />
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
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M 4 28 Q 6 22 13 13 L 19 13 Q 26 22 28 28 Z" />
      <path d="M 16 3 L 16 13" />
      <path d="M 10 7 L 22 7" />
    </svg>
  );
}
