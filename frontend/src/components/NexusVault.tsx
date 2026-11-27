
export default function NexusVault() {
  return (
    <div className="relative mx-auto w-full max-w-[600px]">

      <svg
        viewBox="0 0 600 440"
        className="h-auto w-full"
        role="img"
        aria-label="Nexus digital vault illustration"
      >
        <defs>
          <radialGradient id="vaultAura">
            <stop
              offset="0%"
              stopColor="var(--accent)"
              stopOpacity="0.2"
            />
            <stop
              offset="100%"
              stopColor="var(--accent)"
              stopOpacity="0"
            />
          </radialGradient>

          <linearGradient
            id="vaultMetal"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#e1eae6" />
            <stop offset="25%" stopColor="#71867c" />
            <stop offset="50%" stopColor="#20332a" />
            <stop offset="75%" stopColor="#809a8c" />
            <stop offset="100%" stopColor="#18251e" />
          </linearGradient>

          <linearGradient
            id="vaultFront"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#34483e" />
            <stop offset="100%" stopColor="#101a15" />
          </linearGradient>

          <filter id="vaultGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Ambient illumination */}
        <circle
          cx="300"
          cy="205"
          r="215"
          fill="url(#vaultAura)"
        />

        {/* Holographic rings */}
        {[110, 150, 190].map((radius) => (
          <circle
            key={radius}
            cx="300"
            cy="205"
            r={radius}
            fill="none"
            stroke="var(--accent)"
            opacity="0.1"
          />
        ))}

        <g
          className="nexus-orbit"
          style={{
            transformOrigin: "300px 205px",
          }}
        >
          <circle
            cx="300"
            cy="205"
            r="175"
            fill="none"
            stroke="var(--accent)"
            strokeDasharray="80 1020"
            opacity="0.5"
          />

          <circle
            cx="475"
            cy="205"
            r="3"
            fill="var(--accent)"
          />
        </g>

        {/* Floor reflection */}
        <ellipse
          cx="300"
          cy="345"
          rx="190"
          ry="30"
          fill="url(#vaultAura)"
        />

        {/* Floating vault */}
        <g className="nexus-vault-float">

          {/* Top surface */}
          <path
            d="M120 130 L310 65 L480 145 L290 215 Z"
            fill="url(#vaultMetal)"
            stroke="#b7c9c0"
            strokeWidth="1.2"
          />

          {/* Left surface */}
          <path
            d="M120 130 L290 215 V335 L120 250 Z"
            fill="#15231c"
            stroke="#61786d"
          />

          {/* Front surface */}
          <path
            d="M290 215 L480 145 V265 L290 335 Z"
            fill="url(#vaultFront)"
            stroke="var(--accent)"
            strokeOpacity="0.5"
          />

          {/* Vault door */}
          <path
            d="M306 225 L463 167 V254 L306 312 Z"
            fill="#0c1511"
            stroke="#7d9689"
          />

          <path
            d="M316 231 L453 181 V247 L316 298 Z"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.2"
          />

          {/* Mechanical lock */}
          <g transform="rotate(25 385 240)">

            <ellipse
              cx="385"
              cy="240"
              rx="34"
              ry="43"
              fill="url(#vaultMetal)"
              stroke="var(--accent)"
            />

            <ellipse
              cx="385"
              cy="240"
              rx="23"
              ry="31"
              fill="#101b16"
              stroke="var(--accent)"
              strokeOpacity="0.7"
            />

            <g className="nexus-vault-lock">

              <path
                d="M385 217 V263 M362 240 H408"
                stroke="#b8c9c0"
                strokeWidth="5"
                strokeLinecap="round"
              />

              <circle
                cx="385"
                cy="240"
                r="9"
                fill="url(#vaultMetal)"
                stroke="var(--accent)"
              />

            </g>

          </g>

          {/* Side panel */}
          <path
            d="M135 151 V240 L274 309"
            fill="none"
            stroke="var(--accent)"
            opacity="0.2"
          />

          {/* Illuminated edge */}
          <path
            d="M120 130 L290 215 L480 145"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            opacity="0.3"
            filter="url(#vaultGlow)"
          />

          <path
            d="M120 130 L290 215 L480 145"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />

          {/* Status light */}
          <circle
            cx="438"
            cy="200"
            r="3.5"
            fill="var(--accent)"
            className="nexus-pulse"
          />

          {/* Surface details */}
          <path
            d="M180 125 L310 80 L420 132"
            fill="none"
            stroke="#e1eae6"
            opacity="0.3"
          />

        </g>

        {/* Technical labels */}
        <text
          x="60"
          y="45"
          fontSize="9"
          letterSpacing="2"
          fill="var(--muted)"
        >
          DIGITAL CUSTODY
        </text>

        <text
          x="540"
          y="45"
          textAnchor="end"
          fontSize="9"
          letterSpacing="2"
          fill="var(--accent)"
        >
          SIMULATION
        </text>

        {/* Branding */}
        <text
          x="300"
          y="400"
          textAnchor="middle"
          fontSize="15"
          letterSpacing="6"
          fill="var(--foreground)"
        >
          NEXUS VAULT
        </text>

        <text
          x="300"
          y="423"
          textAnchor="middle"
          fontSize="10"
          fill="var(--muted)"
        >
          Digital custody architecture
        </text>

      </svg>
    </div>
  );
}
