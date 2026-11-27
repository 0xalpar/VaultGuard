
type Props = {
  emergencyStop: boolean;
  whitelistEnabled: boolean;
};

export default function NexusGuardian({
  emergencyStop,
  whitelistEnabled,
}: Props) {
  const color = emergencyStop
    ? "var(--danger)"
    : "var(--accent)";

  return (
    <div className="relative mx-auto w-full max-w-[640px]">

      <svg
        viewBox="0 0 600 440"
        className="h-auto w-full"
        role="img"
        aria-label={
          emergencyStop
            ? "Emergency stop simulation active"
            : "Security configuration simulation"
        }
      >
        <defs>

          <radialGradient id="guardianAura">
            <stop
              offset="0%"
              stopColor={color}
              stopOpacity="0.25"
            />
            <stop
              offset="100%"
              stopColor={color}
              stopOpacity="0"
            />
          </radialGradient>

          <linearGradient
            id="guardianMetal"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#e4ece8" />
            <stop offset="25%" stopColor="#879d92" />
            <stop offset="50%" stopColor="#263b31" />
            <stop offset="75%" stopColor="#b7c9c0" />
            <stop offset="100%" stopColor="#17251e" />
          </linearGradient>

          <linearGradient
            id="guardianGlass"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={color}
              stopOpacity="0.15"
            />
            <stop
              offset="100%"
              stopColor={color}
              stopOpacity="0.02"
            />
          </linearGradient>

          <filter id="guardianGlow">
            <feGaussianBlur stdDeviation="5" />
          </filter>

        </defs>

        {/* Ambient illumination */}

        <circle
          cx="300"
          cy="200"
          r="205"
          fill="url(#guardianAura)"
        />

        {/* Security rings */}

        {[90, 125, 160, 190].map((radius) => (
          <circle
            key={radius}
            cx="300"
            cy="200"
            r={radius}
            fill="none"
            stroke={color}
            opacity="0.12"
          />
        ))}

        <circle
          cx="300"
          cy="200"
          r="175"
          fill="none"
          stroke={color}
          strokeDasharray="2 9"
          opacity="0.5"
        />

        {/* Orbital animation */}

        <g
          className="nexus-guardian-orbit"
          style={{
            transformOrigin: "300px 200px",
          }}
        >
          <circle
            cx="300"
            cy="200"
            r="160"
            fill="none"
            stroke={color}
            strokeDasharray="100 906"
            strokeWidth="1.5"
            opacity="0.6"
          />

          <circle
            cx="460"
            cy="200"
            r="3"
            fill={color}
          />
        </g>

        <ellipse
          cx="300"
          cy="200"
          rx="190"
          ry="75"
          transform="rotate(-30 300 200)"
          fill="none"
          stroke={color}
          opacity="0.2"
        />

        {/* Security connections */}

        {[
          {
            path: "M235 140 H155 L95 90",
            x: 95,
            y: 90,
            label: "SPENDING LIMITS",
            enabled: true,
          },
          {
            path: "M365 140 H445 L505 90",
            x: 505,
            y: 90,
            label: "WHITELIST",
            enabled: whitelistEnabled,
          },
          {
            path: "M235 255 H155 L95 310",
            x: 95,
            y: 310,
            label: "AUTHORIZATION",
            enabled: !emergencyStop,
          },
          {
            path: "M365 255 H445 L505 310",
            x: 505,
            y: 310,
            label: "EMERGENCY STOP",
            enabled: emergencyStop,
          },
        ].map((node) => (
          <g key={node.label}>

            <path
              d={node.path}
              fill="none"
              stroke={
                node.enabled
                  ? color
                  : "var(--muted)"
              }
              strokeDasharray="4 6"
              opacity={
                node.enabled ? 0.7 : 0.2
              }
            />

            <circle
              cx={node.x}
              cy={node.y}
              r="12"
              fill="none"
              stroke={color}
              opacity="0.2"
            />

            <circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill={
                node.enabled
                  ? color
                  : "var(--muted)"
              }
              className={
                node.enabled
                  ? "nexus-pulse"
                  : ""
              }
            />

            <text
              x={node.x}
              y={node.y + 28}
              textAnchor="middle"
              fontSize="9"
              letterSpacing="1"
              fill="var(--muted)"
            >
              {node.label}
            </text>

          </g>
        ))}

        {/* Floating security shield */}

        <g className="nexus-guardian-float">

          <path
            d="M300 90 L380 132 V210
               Q367 270 300 312
               Q233 270 220 210 V132Z"
            fill="url(#guardianMetal)"
            stroke="#b7c9c0"
            strokeWidth="1.2"
          />

          <path
            d="M300 103 L368 139 V210
               Q355 262 300 298
               Q245 262 232 210 V139Z"
            fill="#101917"
            stroke={color}
            strokeOpacity="0.8"
          />

          <path
            d="M300 115 L357 146 V208
               Q345 251 300 284
               Q255 251 243 208 V146Z"
            fill="url(#guardianGlass)"
            stroke={color}
            strokeOpacity="0.25"
          />

          {/* Illuminated edge */}

          <path
            d="M220 132 V210
               Q233 270 300 312"
            fill="none"
            stroke={color}
            strokeWidth="6"
            opacity="0.4"
            filter="url(#guardianGlow)"
          />

          <path
            d="M220 132 V210
               Q233 270 300 312"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />

          {/* Shield symbol */}

          {emergencyStop ? (
            <g>
              <path
                d="M300 163 V210"
                stroke={color}
                strokeWidth="9"
                strokeLinecap="round"
              />

              <circle
                cx="300"
                cy="230"
                r="5"
                fill={color}
              />
            </g>
          ) : (
            <path
              d="M270 195 L292 217 L333 172"
              fill="none"
              stroke={color}
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Status light */}

          <circle
            cx="300"
            cy="265"
            r="3"
            fill={color}
            className="nexus-pulse"
          />

        </g>

        {/* Technical branding */}

        <text
          x="300"
          y="30"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="3"
          fill="var(--muted)"
        >
          AUTONOMOUS SECURITY ARCHITECTURE
        </text>

        <text
          x="300"
          y="395"
          textAnchor="middle"
          fontSize="15"
          letterSpacing="5"
          fill={color}
        >
          {emergencyStop
            ? "SYSTEM SUSPENDED"
            : "NEXUS GUARDIAN"}
        </text>

        <text
          x="300"
          y="418"
          textAnchor="middle"
          fontSize="10"
          fill="var(--muted)"
        >
          Security simulation / No on-chain enforcement
        </text>

      </svg>

    </div>
  );
}
