
"use client";

import { useRef, type PointerEvent } from "react";

export default function NexusCore() {
  const coreRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (!coreRef.current) return;

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    if (event.pointerType === "touch") return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    coreRef.current.style.transform = `
      perspective(1000px)
      rotateY(${x * 16}deg)
      rotateX(${-y * 12}deg)
    `;
  }

  function resetPerspective() {
    if (!coreRef.current) return;

    coreRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPerspective}
      className="relative mx-auto w-full max-w-[640px]"
    >

      {/* Technical labels */}
      <div className="pointer-events-none absolute left-2 top-4 z-10 hidden sm:block">

        <p className="text-[9px] tracking-[0.2em] text-accent">
          AV / SECURITY ARCHITECTURE
        </p>

        <p className="mt-2 text-[9px] text-subtle">
          CORE SYSTEM — GEN 02
        </p>

      </div>

      <div className="pointer-events-none absolute right-2 top-4 z-10 hidden text-right sm:block">

        <p className="text-[9px] tracking-widest text-muted">
          SIMULATION MODE
        </p>

        <p className="mt-2 text-[9px] text-subtle">
          SOLANA DEVNET
        </p>

      </div>

      {/* Perspective container */}
      <div
        ref={coreRef}
        className="nexus-core-perspective"
      >

        <svg
          viewBox="0 0 600 500"
          className="h-auto w-full"
          role="img"
          aria-label="Animated Nexus security core simulation"
        >

          <defs>

            {/* Ambient glow */}
            <radialGradient id="nexusAuraV2">

              <stop
                offset="0%"
                stopColor="var(--accent)"
                stopOpacity="0.22"
              />

              <stop
                offset="55%"
                stopColor="var(--accent)"
                stopOpacity="0.05"
              />

              <stop
                offset="100%"
                stopColor="var(--accent)"
                stopOpacity="0"
              />

            </radialGradient>

            {/* Titanium material */}
            <linearGradient
              id="nexusMetalV2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >

              <stop offset="0%" stopColor="#f5fff9" />

              <stop offset="18%" stopColor="#879d92" />

              <stop offset="38%" stopColor="#263b31" />

              <stop offset="58%" stopColor="#d1e2d9" />

              <stop offset="80%" stopColor="#3b5448" />

              <stop
                offset="100%"
                stopColor="var(--accent)"
              />

            </linearGradient>

            {/* Glass material */}
            <linearGradient
              id="nexusGlassV2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >

              <stop offset="0%" stopColor="#38574a" />

              <stop offset="50%" stopColor="#101d17" />

              <stop offset="100%" stopColor="#090b0c" />

            </linearGradient>

            {/* Energy glow */}
            <radialGradient id="nexusEnergyV2">

              <stop
                offset="0%"
                stopColor="var(--accent)"
                stopOpacity="0.35"
              />

              <stop
                offset="100%"
                stopColor="var(--accent)"
                stopOpacity="0"
              />

            </radialGradient>

            {/* Floor reflection */}
            <radialGradient id="nexusFloorV2">

              <stop
                offset="0%"
                stopColor="var(--accent)"
                stopOpacity="0.28"
              />

              <stop
                offset="100%"
                stopColor="var(--accent)"
                stopOpacity="0"
              />

            </radialGradient>

            {/* Glow filter */}
            <filter id="nexusGlowV2">

              <feGaussianBlur stdDeviation="5" />

            </filter>

            {/* Shield clipping mask */}
            <clipPath id="nexusShieldClipV2">

              <path
                d="M300 100 L374 140 V235
                   Q360 296 300 332
                   Q240 296 226 235 V140Z"
              />

            </clipPath>

          </defs>

          {/* Background illumination */}
          <circle
            cx="300"
            cy="220"
            r="220"
            fill="url(#nexusAuraV2)"
          />

          {/* Background technical grid */}
          <g opacity="0.045">

            {Array.from({ length: 13 }).map((_, index) => (
              <line
                key={`vertical-${index}`}
                x1={60 + index * 40}
                y1="50"
                x2={60 + index * 40}
                y2="400"
                stroke="var(--accent)"
                strokeWidth="0.6"
              />
            ))}

            {Array.from({ length: 9 }).map((_, index) => (
              <line
                key={`horizontal-${index}`}
                x1="60"
                y1={60 + index * 40}
                x2="540"
                y2={60 + index * 40}
                stroke="var(--accent)"
                strokeWidth="0.6"
              />
            ))}

          </g>

          {/* Static orbital rings */}
          {[100, 140, 165, 190].map((radius) => (

            <circle
              key={radius}
              cx="300"
              cy="220"
              r={radius}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.7"
              opacity="0.12"
            />

          ))}

          <circle
            cx="300"
            cy="220"
            r="175"
            fill="none"
            stroke="var(--accent)"
            strokeDasharray="1 7"
            opacity="0.25"
          />

          {/* Primary rotating orbit */}
          <g
            className="nexus-orbit"
            style={{
              transformOrigin: "300px 220px",
            }}
          >

            <ellipse
              cx="300"
              cy="220"
              rx="210"
              ry="80"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              opacity="0.5"
            />

            <circle
              cx="300"
              cy="220"
              r="180"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="130 1000"
              opacity="0.65"
            />

            <circle
              cx="510"
              cy="220"
              r="4"
              fill="var(--accent)"
            />

            <circle
              cx="90"
              cy="220"
              r="2.5"
              fill="#e1fff1"
            />

          </g>

          {/* Secondary rotating orbit */}
          <g
            className="nexus-orbit-reverse"
            style={{
              transformOrigin: "300px 220px",
            }}
          >

            <ellipse
              cx="300"
              cy="220"
              rx="200"
              ry="95"
              fill="none"
              stroke="var(--accent)"
              opacity="0.25"
            />

            <circle
              cx="100"
              cy="220"
              r="3"
              fill="var(--accent)"
            />

          </g>

          {/* Diagonal orbit */}
          <ellipse
            cx="300"
            cy="220"
            rx="215"
            ry="75"
            transform="rotate(-35 300 220)"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.8"
            opacity="0.3"
          />

          {/* Floating platform */}
          <ellipse
            cx="300"
            cy="379"
            rx="165"
            ry="27"
            fill="url(#nexusFloorV2)"
          />

          <ellipse
            cx="300"
            cy="379"
            rx="130"
            ry="18"
            fill="none"
            stroke="var(--accent)"
            opacity="0.18"
          />

          {/* Main floating shield */}
          <g className="nexus-float">

            {/* Metallic depth */}
            <path
              d="M316 91 L398 137 V235
                 Q383 308 316 350
                 L300 337 L380 139Z"
              fill="#294639"
              stroke="var(--accent)"
              strokeOpacity="0.4"
            />

            {/* Titanium frame */}
            <path
              d="M300 86 L383 132 V235
                 Q368 307 300 345
                 Q232 307 217 235 V132Z"
              fill="url(#nexusMetalV2)"
              stroke="#d2e2d9"
              strokeWidth="1.2"
            />

            {/* Glass surface */}
            <path
              d="M300 100 L374 140 V235
                 Q360 296 300 332
                 Q240 296 226 235 V140Z"
              fill="url(#nexusGlassV2)"
              stroke="var(--accent)"
              strokeOpacity="0.5"
            />

            {/* Inner layer */}
            <path
              d="M300 122 L354 152 V233
                 Q344 280 300 306
                 Q256 280 246 233 V152Z"
              fill="#0c1511"
              stroke="var(--accent)"
              strokeOpacity="0.3"
            />

            {/* Energy center */}
            <circle
              cx="300"
              cy="217"
              r="65"
              fill="url(#nexusEnergyV2)"
              className="nexus-pulse"
            />

            {/* AgentVault monogram */}
            <path
              d="M300 153 L344 263
                 H326 L300 194
                 L274 263 H256Z"
              fill="url(#nexusMetalV2)"
            />

            <path
              d="M279 239 H321"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Holographic scanner */}
            <g clipPath="url(#nexusShieldClipV2)">

              <rect
                x="217"
                y="150"
                width="166"
                height="24"
                fill="var(--accent)"
                opacity="0.07"
                className="nexus-scan"
              />

              <line
                x1="217"
                y1="174"
                x2="383"
                y2="174"
                stroke="var(--accent)"
                opacity="0.65"
                className="nexus-scan"
              />

            </g>

            {/* Illuminated frame */}
            <path
              d="M217 132 V235
                 Q232 307 300 345"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="5"
              opacity="0.4"
              filter="url(#nexusGlowV2)"
            />

            <path
              d="M217 132 V235
                 Q232 307 300 345"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />

            {/* Surface reflection */}
            <path
              d="M226 140 L300 100 L374 140"
              fill="none"
              stroke="#f5fff9"
              strokeWidth="1"
              opacity="0.65"
            />

          </g>

          {/* Payment agent connection */}
          <path
            d="M75 150 H145 L217 190"
            fill="none"
            stroke="var(--accent)"
            strokeDasharray="4 6"
            opacity="0.5"
            className="nexus-data-flow"
          />

          <circle
            cx="75"
            cy="150"
            r="12"
            fill="none"
            stroke="var(--accent)"
            opacity="0.15"
          />

          <circle
            cx="75"
            cy="150"
            r="4"
            fill="var(--accent)"
            className="nexus-pulse"
          />

          <text
            x="75"
            y="125"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="2"
            fill="var(--muted)"
          >
            PAYMENT
          </text>

          {/* Trading agent connection */}
          <path
            d="M383 252 L445 290 H525"
            fill="none"
            stroke="var(--accent)"
            strokeDasharray="4 6"
            opacity="0.5"
            className="nexus-data-flow"
          />

          <circle
            cx="525"
            cy="290"
            r="12"
            fill="none"
            stroke="var(--accent)"
            opacity="0.15"
          />

          <circle
            cx="525"
            cy="290"
            r="4"
            fill="var(--accent)"
            className="nexus-pulse"
          />

          <text
            x="525"
            y="318"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="2"
            fill="var(--muted)"
          >
            TRADING
          </text>

          {/* Ambient particles */}
          {[
            [150, 90],
            [450, 75],
            [110, 340],
            [470, 360],
            [300, 42],
            [390, 390],
          ].map(([x, y], index) => (

            <circle
              key={index}
              cx={x}
              cy={y}
              r={index % 2 === 0 ? 2 : 1.5}
              fill="var(--accent)"
              className="nexus-pulse"
              style={{
                animationDelay: `${index * 0.6}s`,
              }}
            />

          ))}

          {/* Core branding */}
          <text
            x="300"
            y="437"
            textAnchor="middle"
            fontSize="16"
            letterSpacing="7"
            fill="var(--foreground)"
          >
            NEXUS CORE
          </text>

          <text
            x="300"
            y="460"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="3"
            fill="var(--accent)"
          >
            GENERATION 02
          </text>

          <text
            x="300"
            y="480"
            textAnchor="middle"
            fontSize="10"
            fill="var(--muted)"
          >
            Autonomous security architecture
          </text>

        </svg>

      </div>

    </div>
  );
}
