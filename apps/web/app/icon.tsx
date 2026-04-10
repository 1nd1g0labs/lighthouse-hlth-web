import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B1D2E',
          borderRadius: 6,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="6" y1="26" x2="22" y2="6" stroke="#0A7E8C" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="22" cy="6" r="5" fill="#0A7E8C" opacity="0.9" />
          <circle cx="22" cy="6" r="8" fill="#0A7E8C" opacity="0.2" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
