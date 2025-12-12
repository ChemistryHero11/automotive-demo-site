import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pro Auto Services - Dealer Precision. Local Heart.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -150,
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(226,232,240,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Wheel icon */}
        <div
          style={{
            display: "flex",
            marginBottom: 32,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="#e2e8f0" strokeWidth="3" fill="none" opacity="0.8" />
            <circle cx="40" cy="40" r="26" stroke="#e2e8f0" strokeWidth="1.5" fill="none" opacity="0.4" />
            <circle cx="40" cy="40" r="10" fill="#dc2626" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="40"
                y1="8"
                x2="40"
                y2="18"
                stroke="#e2e8f0"
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${angle} 40 40)`}
              />
            ))}
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Pro Auto Services
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            fontWeight: 400,
            color: "#94a3b8",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Dealer Precision. Local Heart.
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 48,
          }}
        >
          {["ASE Certified", "24/7 Towing", "500+ Reviews"].map((badge) => (
            <div
              key={badge}
              style={{
                padding: "12px 24px",
                border: "1px solid rgba(226,232,240,0.2)",
                borderRadius: 999,
                background: "rgba(15,23,42,0.6)",
                color: "#cbd5e1",
                fontSize: 16,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
