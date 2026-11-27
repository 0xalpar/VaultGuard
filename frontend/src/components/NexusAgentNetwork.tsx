
export type Agent = {
  id: string;
  name: string;
  type: string;
  dailyLimit: number;
  spent: number;
  active: boolean;
};

type Props = {
  agents: Agent[];
};

export default function NexusAgentNetwork({
  agents,
}: Props) {
  const centerX = 300;
  const centerY = 210;
  const radius = 155;

  return (
    <div className="relative mx-auto w-full max-w-[640px]">

      <svg
        viewBox="0 0 600 460"
        className="h-auto w-full"
        role="img"
        aria-label="Autonomous agent network simulation"
      >
        <defs>

          <radialGradient id="agentNetworkAura">
            <stop
              offset="0%"
              stopColor="var(--accent)"
              stopOpacity="0.22"
            />
            <stop
              offset="100%"
              stopColor="var(--accent)"
              stopOpacity="0"
            />
          </radialGradient>

          <linearGradient
            id="agentNetworkMetal"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#e1eae6" />
            <stop offset="25%" stopColor="#879d92" />
            <stop offset="45%" stopColor="#263b31" />
            <stop offset="70%" stopColor="#b7c9c0" />
            <stop
              offset="100%"
              stopColor="var(--accent)"
            />
          </linearGradient>

          <filter id="agentNetworkGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>

        </defs>

        {/* Ambient glow */}
        <circle
          cx={centerX}
          cy={centerY}
          r="215"
          fill="url(#agentNetworkAura)"
        />

        {/* Background rings */}
        {[80, 115, 155, 190].map((r) => (
          <circle
            key={r}
            cx={centerX}
            cy={centerY}
            r={r}
            fill="none"
            stroke="var(--accent)"
            opacity="0.12"
          />
        ))}

        {/* Rotating orbital ring */}
        <g
          className="nexus-orbit"
          style={{
            transformOrigin: "300px 210px",
          }}
        >
          <circle
            cx={centerX}
            cy={centerY}
            r="185"
            fill="none"
            stroke="var(--accent)"
            strokeDasharray="100 1062"
            opacity="0.5"
          />

          <circle
            cx="485"
            cy="210"
            r="3"
            fill="var(--accent)"
          />
        </g>

        {/* Agent network nodes */}
        {agents.slice(0, 6).map((agent, index, list) => {
          const angle =
            (index / list.length) * Math.PI * 2 -
            Math.PI / 2;

          const x =
            centerX + Math.cos(angle) * radius;

          const y =
            centerY + Math.sin(angle) * radius;

          const color = agent.active
            ? "var(--accent)"
            : "var(--muted)";

          const label =
            agent.name.length > 18
              ? `${agent.name.slice(0, 16)}...`
              : agent.name;

          return (
            <g key={agent.id}>

              {/* Agent connection */}
              <line
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth="1.2"
                strokeDasharray="4 7"
                opacity={agent.active ? 0.65 : 0.2}
                className={
                  agent.active
                    ? "nexus-data-flow"
                    : ""
                }
              />

              {/* Agent outer ring */}
              <circle
                cx={x}
                cy={y}
                r="35"
                fill="none"
                stroke={color}
                opacity="0.15"
              />

              {/* Agent body */}
              <circle
                cx={x}
                cy={y}
                r="28"
                fill="var(--surface)"
                stroke={color}
                strokeOpacity={
                  agent.active ? 0.8 : 0.3
                }
              />

              {/* Robot icon */}
              <rect
                x={x - 13}
                y={y - 9}
                width="26"
                height="20"
                rx="6"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
              />

              <path
                d={`M${x} ${y - 9} V${y - 15}`}
                stroke={color}
                strokeWidth="1.5"
              />

              <circle
                cx={x}
                cy={y - 16}
                r="2"
                fill={color}
              />

              <circle
                cx={x - 5}
                cy={y}
                r="2"
                fill={color}
              />

              <circle
                cx={x + 5}
                cy={y}
                r="2"
                fill={color}
              />

              {/* Status indicator */}
              <circle
                cx={x + 21}
                cy={y - 21}
                r="4"
                fill={color}
                className={
                  agent.active ? "nexus-pulse" : ""
                }
              />

              {/* Agent label */}
              <text
                x={x}
                y={y + 43}
                textAnchor="middle"
                fontSize="10"
                fill="var(--foreground)"
              >
                {label}
              </text>

              <text
                x={x}
                y={y + 57}
                textAnchor="middle"
                fontSize="8"
                letterSpacing="1.5"
                fill={color}
              >
                {agent.active
                  ? "CONNECTED"
                  : "PAUSED"}
              </text>

            </g>
          );
        })}

        {/* Central Nexus shield */}
        <g className="nexus-agent-core">

          <circle
            cx="300"
            cy="210"
            r="72"
            fill="var(--background)"
            stroke="var(--accent)"
            strokeOpacity="0.2"
          />

          <path
            d="M300 145 L350 173 V220
               Q342 257 300 282
               Q258 257 250 220 V173Z"
            fill="url(#agentNetworkMetal)"
            stroke="#b7c9c0"
          />

          <path
            d="M300 156 L340 179 V219
               Q333 248 300 269
               Q267 248 260 219 V179Z"
            fill="#101b16"
            stroke="var(--accent)"
            strokeOpacity="0.5"
          />

          <path
            d="M300 178 L325 239 H314
               L300 202 L286 239 H275Z"
            fill="url(#agentNetworkMetal)"
          />

          <path
            d="M288 226 H312"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M250 173 V220 Q258 257 300 282"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            opacity="0.4"
            filter="url(#agentNetworkGlow)"
          />

        </g>

        {/* Network branding */}
        <text
          x="300"
          y="425"
          textAnchor="middle"
          fontSize="13"
          letterSpacing="5"
          fill="var(--foreground)"
        >
          NEXUS NETWORK
        </text>

        <text
          x="300"
          y="446"
          textAnchor="middle"
          fontSize="9"
          fill="var(--muted)"
        >
          {agents.filter((a) => a.active).length}
          {" active agents / Simulation mode"}
        </text>

      </svg>

    </div>
  );
}
