import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />
          <circle cx="10" cy="10" r="6" stroke="#e2e8f0" strokeWidth="0.8" fill="none" opacity="0.5" />
          <circle cx="10" cy="10" r="2.5" fill="#dc2626" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="10"
              y1="2"
              x2="10"
              y2="4"
              stroke="#e2e8f0"
              strokeWidth="1.2"
              strokeLinecap="round"
              transform={`rotate(${angle} 10 10)`}
            />
          ))}
        </svg>
      </div>
    ),
    { ...size }
  );
}
