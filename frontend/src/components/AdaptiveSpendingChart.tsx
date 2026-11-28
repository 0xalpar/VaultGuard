
"use client";

import { useState } from "react";

import {useDemoVault} from "./DemoVaultProvider";
import {dayAt} from "../lib/demo-vault";
import { EyeOff } from "lucide-react";

import {
  useAdaptive,
} from "./AdaptiveProvider";

type Period = "7D" | "30D";

export default function AdaptiveSpendingChart() {
  const {
    preferences,
    motionEnabled,
  } = useAdaptive();

  const [period, setPeriod] =
    useState<Period>("7D");

  const [selected, setSelected] =
    useState<number | null>(null);

  const {data:store,day}=useDemoVault();
  const length=period==="7D"?7:30,group=period==="7D"?1:5;
  const end=Date.parse(day+"T00:00:00+03:00");
  const data=Array.from({length:length/group},(_,i)=>{
    const start=end-(length-1-i*group)*86400000;
    const value=store.vault.logs.filter(l=>l.decision==="approved"&&l.at>=start&&l.at<start+group*86400000).reduce((sum,l)=>sum+l.request.amount/1e6,0);
    return {label:dayAt(start).slice(5,10),value};
  });

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const max = Math.max(
    ...data.map((item) => item.value),
    1
  );

  function changePeriod(next: Period) {
    setPeriod(next);
    setSelected(null);
  }

  const formattedTotal =
    total.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <section className="adaptive-card adaptive-stack">

      <div className="adaptive-row adaptive-between">

        <h2 className="adaptive-section-heading">
          Harcama geçmişi
        </h2>

        <div
          className="adaptive-chart-period"
          aria-label="Grafik zaman aralığı"
        >

          <button
            type="button"
            aria-pressed={period === "7D"}
            onClick={() => changePeriod("7D")}
          >
            7 gün
          </button>

          <button
            type="button"
            aria-pressed={period === "30D"}
            onClick={() => changePeriod("30D")}
          >
            30 gün
          </button>

        </div>

      </div>

      {preferences.hideBalance ? (
        <div className="adaptive-chart-hidden">

          <EyeOff size={32} />

          <p>Harcama tutarları gizlendi.</p>

        </div>
      ) : (
        <>

          <div>

            <p className="adaptive-small">
              Toplam örnek harcama
            </p>

            <p className="adaptive-chart-total">
              {formattedTotal} USDC
            </p>

          </div>

          <div
            className="adaptive-chart-bars"
            style={{
              gridTemplateColumns:
                `repeat(${data.length}, minmax(0, 1fr))`,
            }}
          >

            {data.map((item, index) => (
              <button
                key={`${period}-${index}`}
                type="button"
                className="adaptive-chart-column"
                aria-label={
                  `${item.label}: ${item.value} USDC`
                }
                aria-pressed={
                  selected === index
                }
                onClick={() =>
                  setSelected(
                    selected === index
                      ? null
                      : index
                  )
                }
              >

                <span className="adaptive-chart-value">
                  {item.value}
                </span>

                <span className="adaptive-chart-track">

                  <span
                    className="adaptive-chart-bar"
                    data-selected={
                      selected === index
                    }
                    style={{
                      height:
                        `${item.value / max * 100}%`,

                      transition: motionEnabled
                        ? "height 250ms ease"
                        : "none",
                    }}
                  />

                </span>

                <span className="adaptive-chart-label">
                  {item.label}
                </span>

              </button>
            ))}

          </div>

          <div
            className="adaptive-card-soft"
            role="status"
            aria-live="polite"
          >

            <p className="adaptive-small">

              {selected !== null
                ? `${data[selected].label}: ${data[selected].value} USDC harcama`
                : "Detayları görmek için bir sütuna dokunun."}

            </p>

          </div>

        </>
      )}

      <p className="adaptive-small">
        Örnek veriler · Simülasyon ortamı
      </p>

    </section>
  );
}
