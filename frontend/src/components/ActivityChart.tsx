
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

const data = [
  { day: "Mon", amount: 2 },
  { day: "Tue", amount: 5 },
  { day: "Wed", amount: 3 },
  { day: "Thu", amount: 8 },
  { day: "Fri", amount: 4 },
  { day: "Sat", amount: 10 },
  { day: "Sun", amount: 3 },
];

export default function ActivityChart() {
  return (
    <section className="bg-surface border border-border rounded-xl p-6 mt-6">

      <h2 className="text-xl font-semibold text-foreground">
        Agent Activity
      </h2>

      <p className="text-sm text-muted mt-1 mb-6">
        Weekly spending (USDC)
      </p>

      <div className="h-[280px] w-full min-w-0">

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>

            <defs>
              <linearGradient
                id="spendingGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.3}
                />

                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="var(--muted)"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="var(--muted)"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--sidebar)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--foreground)",
              }}
              itemStyle={{
                color: "var(--accent)",
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              name="USDC"
              stroke="var(--accent)"
              strokeWidth={3}
              fill="url(#spendingGradient)"
              activeDot={{ r: 6 }}
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

    </section>
  );
}
