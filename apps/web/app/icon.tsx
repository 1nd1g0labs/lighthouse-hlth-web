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
          width="26"
          height="26"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#0A7E8C"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 4 28 Q 6 22 13 13 L 19 13 Q 26 22 28 28 Z" />
          <path d="M 16 3 L 16 13" />
          <path d="M 10 7 L 22 7" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
