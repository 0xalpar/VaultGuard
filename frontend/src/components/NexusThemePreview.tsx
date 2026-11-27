
"use client";

import {
  useNexusTheme,
  NEXUS_THEMES,
} from "./ThemeProvider";

export default function NexusThemePreview() {
  const { theme } = useNexusTheme();

  const currentTheme =
    NEXUS_THEMES.find(
      (item) => item.id === theme
    ) ?? NEXUS_THEMES[0];

  const color = currentTheme.color;

  return (
    <div className="relative mx-auto w-full max-w-[600px]">

      <svg
        viewBox="0 0 600 420"
        className="h-auto w-full"
        role="img"
        aria-label={`${currentTheme.name} theme preview`}
      >

        <defs>

          <radialGradient id="themeAura">

            <stop
              offset="0%"
              stopColor={color}
              stopOpacity="0.24"
            />

            <stop
              offset="100%"
              stopColor={color}
              stopOpacity="0"
            />

          </radialGradient>

          <linearGradient
            id="themeMetal"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >

            <stop offset="0%" stopColor="#edf2f5" />
            <stop offset="25%" stopColor="#718080" />
            <stop offset="50%" stopColor="#202729" />
            <stop offset="75%" stopColor="#a6b3b4" />
            <stop offset="100%" stopColor={color} />

          </linearGradient>

          <linearGradient
            id="themeGlass"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >

            <stop
              offset="0%"
              stopColor={color}
              stopOpacity="0.14"
            />

            <stop
              offset="100%"
              stopColor={color}
              stopOpacity="0.02"
            />

          </linearGradient>

          <filter id="themeGlow">
            <feGaussianBlur stdDeviation="5" />
          </filter>

        </defs>

        {/* Ambient illumination */}

        <circle
          cx="300"
          cy="190"
          r="200"
          fill="url(#themeAura)"
        />

        {/* Holographic rings */}

        {[80, 115, 150, 185].map((radius) => (

          <circle
            key={radius}
            cx="300"
            cy="190"
            r={radius}
            fill="none"
            stroke={color}
            opacity="0.12"
          />

        ))}

        <circle
          cx="300"
          cy="190"
          r="165"
          fill="none"
          stroke={color}
          strokeDasharray="2 9"
          opacity="0.45"
        />

        <ellipse
          cx="300"
          cy="190"
          rx="210"
          ry="80"
          transform="rotate(-25 300 190)"
          fill="none"
          stroke={color}
          opacity="0.25"
        />

        <g
          className="nexus-theme-orbit"
          style={{
            transformOrigin: "300px 190px",
          }}
        >

          <circle
            cx="300"
            cy="190"
            r="150"
            fill="none"
            stroke={color}
            strokeDasharray="110 833"
            strokeWidth="1.5"
            opacity="0.6"
          />

          <circle
            cx="450"
            cy="190"
            r="4"
            fill={color}
          />

        </g>

        {/* Floating AgentVault shield */}

        <g className="nexus-theme-float">

          <path
            d="M300 70 L382 115 V205
               Q370 266 300 310
               Q230 266 218 205 V115Z"
            fill="url(#themeMetal)"
            stroke="#b7c4c5"
            strokeWidth="1.2"
          />

          <path
            d="M300 84 L369 123 V205
               Q357 255 300 294
               Q243 255 231 205 V123Z"
            fill="#101719"
            stroke={color}
          />

          <path
            d="M300 97 L357 131 V202
               Q345 246 300 281
               Q255 246 243 202 V131Z"
            fill="url(#themeGlass)"
            stroke={color}
            strokeOpacity="0.2"
          />

          {/* Illuminated edge */}

          <path
            d="M218 115 V205
               Q230 266 300 310"
            stroke={color}
            strokeWidth="6"
            fill="none"
            opacity="0.5"
            filter="url(#themeGlow)"
          />

          <path
            d="M218 115 V205
               Q230 266 300 310"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
          />

          {/* AgentVault A symbol */}

          <path
            d="M265 230 L300 133 L335 230
               M278 200 H322"
            stroke={color}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.5"
            filter="url(#themeGlow)"
          />

          <path
            d="M265 230 L300 133 L335 230
               M278 200 H322"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <circle
            cx="300"
            cy="260"
            r="3"
            fill={color}
            className="nexus-pulse"
          />

        </g>

        {/* Technical labels */}

        <text
          x="300"
          y="25"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="3"
          fill="var(--muted)"
        >
          PERSONALIZED SECURITY ARCHITECTURE
        </text>

        <text
          x="300"
          y="375"
          textAnchor="middle"
          fontSize="16"
          letterSpacing="5"
          fill={color}
        >
          {currentTheme.name.toUpperCase()} EDITION
        </text>

        <text
          x="300"
          y="400"
          textAnchor="middle"
          fontSize="10"
          fill="var(--muted)"
        >
          Your identity. Your control.
        </text>

      </svg>

    </div>
  );
}
