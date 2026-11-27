
"use client";

import { useState } from "react";

import {
  Wallet,
  ChartNoAxesCombined,
  CalendarDays,
  Bot,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export type AgentType =
  | "payment"
  | "trading"
  | "subscription"
  | "custom";

export type AdaptiveAgent = {
  id: string;
  name: string;
  type: AgentType;
  dailyLimit: number;
  spent: number;
  active: boolean;
};

export type AgentDraft = {
  name: string;
  type: AgentType;
  dailyLimit: number;
};

export const AGENT_TYPES = [
  {
    id: "payment",
    name: "Ödeme asistanı",
    description:
      "Ödemelerinizi ve para gönderimlerinizi yönetir.",
    icon: Wallet,
  },
  {
    id: "trading",
    name: "Alım satım asistanı",
    description:
      "Dijital varlık işlemlerinizi yönetir.",
    icon: ChartNoAxesCombined,
  },
  {
    id: "subscription",
    name: "Abonelik asistanı",
    description:
      "Düzenli ödemelerinizi ve aboneliklerinizi takip eder.",
    icon: CalendarDays,
  },
  {
    id: "custom",
    name: "Özel asistan",
    description:
      "Belirlediğiniz özel görevleri yönetir.",
    icon: Bot,
  },
] as const;

export function formatAgentMoney(
  cents: number
) {
  return (cents / 100).toLocaleString(
    "tr-TR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
}

type Props = {
  agent?: AdaptiveAgent;
  onClose: () => void;
  onSave: (draft: AgentDraft) => boolean;
};

export default function AdaptiveAgentWizard({
  agent,
  onClose,
  onSave,
}: Props) {
  const [step, setStep] = useState(1);

  const [type, setType] =
    useState<AgentType>(
      agent?.type ?? "payment"
    );

  const [name, setName] = useState(
    agent?.name ?? ""
  );

  const [limit, setLimit] = useState(
    agent
      ? String(agent.dailyLimit / 100)
      : "25"
  );

  const [error, setError] = useState("");

  const selectedType =
    AGENT_TYPES.find(
      (item) => item.id === type
    ) ?? AGENT_TYPES[0];

  const normalized =
    limit.trim().replace(",", ".");

  const cents = Math.round(
    Number(normalized) * 100
  );

  function validate() {
    if (
      name.trim().length < 2 ||
      name.trim().length > 40
    ) {
      setError(
        "Asistan adı 2 ile 40 karakter arasında olmalıdır."
      );

      return false;
    }

    if (
      !/^\d+(\.\d{1,2})?$/.test(normalized) ||
      !Number.isSafeInteger(cents) ||
      cents <= 0 ||
      cents > 100000000
    ) {
      setError(
        "0,01 ile 1.000.000 USDC arasında geçerli bir sınır girin."
      );

      return false;
    }

    if (agent && cents < agent.spent) {
      setError(
        "Günlük sınır, bugün harcanan tutardan düşük olamaz."
      );

      return false;
    }

    setError("");
    return true;
  }

  function next() {
    if (step === 1) {
      if (!name.trim()) {
        setName(selectedType.name);
      }

      setStep(2);
      setError("");
      return;
    }

    if (validate()) {
      setStep(3);
    }
  }

  function save() {
    if (!validate()) return;

    const success = onSave({
      name: name.trim(),
      type,
      dailyLimit: cents,
    });

    if (!success) {
      setError(
        "Asistan kaydedilemedi. Bilgileri kontrol edin."
      );
    }
  }

  return (
    <section
      className="adaptive-card adaptive-stack adaptive-agent-wizard"
      aria-labelledby="agent-wizard-title"
    >
      <div className="adaptive-row adaptive-between">
        <h2
          id="agent-wizard-title"
          className="adaptive-section-heading"
        >
          {agent
            ? "Asistanı düzenle"
            : "Yeni asistan oluştur"}
        </h2>

        <button
          type="button"
          className="adaptive-icon-button"
          aria-label="Asistan formunu kapat"
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </div>

      <div
        className="adaptive-agent-steps"
        aria-label={`Adım ${step}, toplam 3 adım`}
      >
        {["Görev", "Sınırlar", "Onay"].map(
          (label, index) => (
            <div
              key={label}
              className="adaptive-agent-step"
              data-active={step >= index + 1}
              aria-current={
                step === index + 1
                  ? "step"
                  : undefined
              }
            >
              <span />
              {index + 1}. {label}
            </div>
          )
        )}
      </div>

      {/* STEP 1 */}

      {step === 1 && (
        <div className="adaptive-stack">
          <h3 className="adaptive-section-heading">
            Asistanınız ne yapacak?
          </h3>

          <p className="adaptive-description">
            İhtiyacınıza uygun bir görev seçin.
          </p>

          <div className="adaptive-agent-types">
            {AGENT_TYPES.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  className="adaptive-agent-type"
                  aria-pressed={type === item.id}
                  onClick={() => {
                    setType(item.id);
                    setError("");
                  }}
                >
                  <span className="adaptive-icon-box">
                    <Icon size={25} />
                  </span>

                  <span className="adaptive-grow">
                    <strong>{item.name}</strong>

                    <span className="adaptive-small">
                      {item.description}
                    </span>
                  </span>

                  {type === item.id && (
                    <CheckCircle2
                      size={23}
                      color="var(--ad-accent)"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2 */}

      {step === 2 && (
        <div className="adaptive-stack">
          <h3 className="adaptive-section-heading">
            Asistanınızı kişiselleştirin
          </h3>

          <label
            htmlFor="agent-name"
            className="adaptive-label"
          >
            Asistanın adı
          </label>

          <input
            id="agent-name"
            className="adaptive-input"
            value={name}
            maxLength={40}
            placeholder="Örneğin: Fatura asistanım"
            onChange={(event) => {
              setName(event.target.value);
              setError("");
            }}
          />

          <label
            htmlFor="agent-limit"
            className="adaptive-label"
          >
            Günlük harcama sınırı (USDC)
          </label>

          <input
            id="agent-limit"
            className="adaptive-input"
            inputMode="decimal"
            value={limit}
            maxLength={16}
            placeholder="25,00"
            onChange={(event) => {
              setLimit(event.target.value);
              setError("");
            }}
          />

          <div className="adaptive-agent-presets">
            {[10, 25, 50, 100].map((value) => (
              <button
                key={value}
                type="button"
                className="adaptive-button adaptive-button-secondary"
                onClick={() => {
                  setLimit(String(value));
                  setError("");
                }}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="adaptive-card-soft adaptive-row">
            <ShieldCheck size={25} />

            <p className="adaptive-small">
              Günlük harcama sınırı,
              asistanınız için belirlediğiniz
              en yüksek günlük işlem tutarıdır.
              Şimdilik yalnızca demo ayarıdır.
            </p>
          </div>
        </div>
      )}

      {/* STEP 3 */}

      {step === 3 && (
        <div className="adaptive-stack">
          <h3 className="adaptive-section-heading">
            Bilgileri kontrol edin
          </h3>

          <div className="adaptive-card-soft adaptive-stack">
            <div className="adaptive-agent-summary-row">
              <span>Asistan adı</span>
              <strong>{name.trim()}</strong>
            </div>

            <div className="adaptive-divider" />

            <div className="adaptive-agent-summary-row">
              <span>Görev</span>
              <strong>{selectedType.name}</strong>
            </div>

            <div className="adaptive-divider" />

            <div className="adaptive-agent-summary-row">
              <span>Günlük sınır</span>

              <strong>
                {formatAgentMoney(cents)} USDC
              </strong>
            </div>

            <div className="adaptive-divider" />

            <div className="adaptive-agent-summary-row">
              <span>Durum</span>

              <strong>
                {agent?.active
                  ? "Çalışıyor"
                  : "Duraklatıldı"}
              </strong>
            </div>
          </div>

          <div className="adaptive-status adaptive-status-success">
            <ShieldCheck size={25} />

            <p>
              {agent
                ? "Değişiklikler demo asistanınıza uygulanacaktır."
                : "Yeni asistanınız duraklatılmış olarak oluşturulacaktır. Hazır olduğunuzda başlatabilirsiniz."}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div
          className="adaptive-status adaptive-status-danger"
          role="alert"
        >
          <AlertCircle size={23} />
          <p>{error}</p>
        </div>
      )}

      <div className="adaptive-stack">
        <button
          type="button"
          className="adaptive-button adaptive-button-primary adaptive-button-full"
          onClick={step === 3 ? save : next}
        >
          {step === 3 ? (
            <>
              <CheckCircle2 size={20} />
              {agent
                ? "Değişiklikleri kaydet"
                : "Asistanı oluştur"}
            </>
          ) : (
            <>
              Devam et
              <ArrowRight size={20} />
            </>
          )}
        </button>

        {step > 1 && (
          <button
            type="button"
            className="adaptive-button adaptive-button-secondary adaptive-button-full"
            onClick={() => {
              setStep((previous) => previous - 1);
              setError("");
            }}
          >
            <ArrowLeft size={20} />
            Geri dön
          </button>
        )}
      </div>
    </section>
  );
}
