
"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Period = "7D" | "30D" | "90D";

const activityData = {
  "7D": [
    { date: "Mon", amount: 2 },
    { date: "Tue", amount: 5 },
    { date: "Wed", amount: 3 },
    { date: "Thu", amount: 8 },
    { date: "Fri", amount: 4 },
    { date: "Sat", amount: 10 },
    { date: "Sun", amount: 3 },
  ],
  "30D": [
    { date: "Day 1", amount: 8 },
    { date: "Day 5", amount: 12 },
    { date: "Day 10", amount: 9.5 },
    { date: "Day 15", amount: 16 },
    { date: "Day 20", amount: 14 },
    { date: "Day 25", amount: 10 },
    { date: "Day 30", amount: 13 },
  ],
  "90D": [
    { date: "Week 1", amount: 12 },
    { date: "Week 3", amount: 18 },
    { date: "Week 5", amount: 15 },
    { date: "Week 7", amount: 24 },
    { date: "Week 9", amount: 21 },
    { date: "Week 11", amount: 26 },
    { date: "Week 13", amount: 30 },
  ],
};

const periods: Period[] = ["7D", "30D", "90D"];

export default function CapitalActivity() {
  const [period, setPeriod] = useState<Period>("7D");

  const data = activityData[period];

  const total = data.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <section className="min-w-0">

      {/* Section heading */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-lg font-medium tracking-tight">
            Capital activity
          </h2>

          <p className="mt-1 text-xs text-muted">
            Agent spending · Demo data
          </p>
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
          {periods.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={period === item}
              onClick={() => setPeriod(item)}
              className={`
                rounded-full px-3 py-1.5
                text-xs font-medium
                ${
                  period === item
                    ? "bg-surface-elevated text-foreground"
                    : "text-muted hover:text-foreground"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>

      </div>

      {/* Total spending */}
      <div className="mb-6 flex items-baseline gap-2">

        <span className="nexus-number text-4xl">
          {total.toFixed(2)}
        </span>

        <span className="text-sm text-muted">
          USDC
        </span>

      </div>

      {/* Chart */}
      <div className="h-[240px] w-full">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="capitalGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--accent)"
                  stopOpacity={0.2}
                />

                <stop
                  offset="100%"
                  stopColor="var(--accent)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 6"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              tick={{
                fill: "var(--muted)",
                fontSize: 11,
              }}
            />

            <YAxis hide domain={[0, "auto"]} />

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                color: "var(--foreground)",
                fontSize: "12px",
              }}
              labelStyle={{
                color: "var(--muted)",
              }}
              cursor={{
                stroke: "var(--border)",
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              name="Spending (USDC)"
              stroke="var(--accent)"
              strokeWidth={2}
              fill="url(#capitalGradient)"
              animationDuration={700}
              activeDot={{
                r: 4,
                fill: "var(--accent)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}
