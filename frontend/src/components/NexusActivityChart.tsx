
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type ActivityPoint = {
  time: string;
  volume: number;
};

type Props = {
  data: ActivityPoint[];
};

export default function NexusActivityChart({
  data,
}: Props) {
  return (
    <div className="h-[260px] w-full min-w-0 sm:h-[320px]">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <AreaChart
          data={data}
          margin={{
            top: 15,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >

          <defs>

            <linearGradient
              id="nexusActivityGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="var(--accent)"
                stopOpacity={0.24}
              />

              <stop
                offset="100%"
                stopColor="var(--accent)"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="3 6"
          />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted)",
              fontSize: 11,
            }}
            tickMargin={15}
            minTickGap={25}
          />

          <YAxis
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted)",
              fontSize: 11,
            }}
            tickMargin={10}
            width={45}
            domain={[0, "auto"]}
          />

          <Tooltip
            cursor={{
              stroke: "var(--accent)",
              strokeDasharray: "4 6",
              strokeOpacity: 0.4,
            }}
            contentStyle={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              fontSize: "12px",
              color: "var(--foreground)",
            }}
            labelStyle={{
              color: "var(--muted)",
              marginBottom: "8px",
            }}
            itemStyle={{
              color: "var(--accent)",
            }}
            formatter={(value) => [
              `${Number(value).toFixed(2)} USDC`,
              "Executed volume",
            ]}
          />

          <Area
            type="stepAfter"
            dataKey="volume"
            stroke="var(--accent)"
            strokeWidth={2}
            fill="url(#nexusActivityGradient)"
            activeDot={{
              r: 5,
              fill: "var(--accent)",
              stroke: "var(--background)",
              strokeWidth: 3,
            }}
            animationDuration={900}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}
