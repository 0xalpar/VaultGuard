
"use client";

import { useState } from "react";

import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Info,
} from "lucide-react";

export type MoneyAction =
  "deposit" | "withdraw";

type Props = {
  action: MoneyAction;
  balance: number;
  available: number;
  hidden: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => boolean;
};

function formatMoney(cents: number) {
  return (cents / 100).toLocaleString(
    "tr-TR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
}

export default function AdaptiveMoneyWizard({
  action,
  balance,
  available,
  hidden,
  onClose,
  onConfirm,
}: Props) {

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const deposit = action === "deposit";

  const title = deposit
    ? "Para yatır"
    : "Para çek";

  const normalized =
    amount.trim().replace(",", ".");

  const cents =
    Math.round(Number(normalized) * 100);

  const validAmount =
    /^\d+(\.\d{1,2})?$/.test(normalized) &&
    Number.isSafeInteger(cents) &&
    cents > 0;

  const newBalance = deposit
    ? balance + cents
    : balance - cents;

  const newAvailable = deposit
    ? available + cents
    : available - cents;

  function validate() {

    if (!validAmount) {
      setError(
        "Lütfen sıfırdan büyük, geçerli bir tutar girin."
      );

      return false;
    }

    if (cents > 100000000) {
      setError(
        "Tek işlemde en fazla 1.000.000 USDC kullanılabilir."
      );

      return false;
    }

    if (!deposit && cents > available) {
      setError(
        "Kullanılabilir paranız bu işlem için yeterli değil."
      );

      return false;
    }

    if (!Number.isSafeInteger(newBalance)) {
      setError("Bakiye sınırı aşıldı.");

      return false;
    }

    setError("");

    return true;
  }

  function nextStep() {

    if (validate()) {
      setStep(2);
    }
  }

  function confirmTransaction() {

    if (!validate()) return;

    const success = onConfirm(cents);

    if (!success) {
      setError(
        "İşlem tamamlanamadı. Lütfen tutarı kontrol edin."
      );

      return;
    }

    setStep(3);
  }

  function changeAmount(value: string) {
    setAmount(value);
    setError("");
  }

  function displayMoney(value: number) {
    return hidden
      ? "••••••"
      : `${formatMoney(value)} USDC`;
  }

  return (
    <section
      className="adaptive-card adaptive-stack adaptive-money-wizard"
      aria-labelledby="money-wizard-title"
    >

      {/* HEADER */}

      <div className="adaptive-row adaptive-between">

        <h2
          id="money-wizard-title"
          className="adaptive-section-heading"
        >
          {title}
        </h2>

        <button
          type="button"
          className="adaptive-icon-button"
          aria-label="İşlem ekranını kapat"
          onClick={onClose}
        >
          <X size={23} />
        </button>

      </div>

      {/* STEP INDICATOR */}

      <div
        className="adaptive-wizard-steps"
        aria-label={`Adım ${step}, toplam 3 adım`}
      >

        {["Tutar", "Kontrol", "Onay"].map(
          (label, index) => (

            <div
              key={label}
              className="adaptive-wizard-step"
              data-active={step >= index + 1}
              aria-current={
                step === index + 1
                  ? "step"
                  : undefined
              }
            >

              <div className="adaptive-wizard-step-line" />

              <span>
                {index + 1}. {label}
              </span>

            </div>

          )
        )}

      </div>

      {/* STEP 1: AMOUNT */}

      {step === 1 && (
        <form
          className="adaptive-stack"
          onSubmit={(event) => {
            event.preventDefault();
            nextStep();
          }}
        >

          <div className="adaptive-stack">

            <label
              htmlFor="money-amount"
              className="adaptive-label"
            >

              {deposit
                ? "Ne kadar para yatırmak istiyorsunuz?"
                : "Ne kadar para çekmek istiyorsunuz?"}

            </label>

            <div className="adaptive-money-input-wrap">

              <input
                id="money-amount"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                maxLength={16}
                placeholder="0,00"
                value={amount}
                aria-invalid={Boolean(error)}
                aria-describedby="money-help"
                onChange={(event) =>
                  changeAmount(event.target.value)
                }
                className="adaptive-money-input"
              />

              <span>USDC</span>

            </div>

            <p
              id="money-help"
              className="adaptive-small"
            >
              {deposit
                ? "Demo hesabınıza eklemek istediğiniz tutarı girin."
                : `Kullanılabilir para: ${displayMoney(available)}`}
            </p>

          </div>

          {/* QUICK AMOUNTS */}

          <div className="adaptive-money-presets">

            {[10, 25, 50, 100].map(
              (value) => (

                <button
                  key={value}
                  type="button"
                  className="adaptive-button adaptive-button-secondary"
                  disabled={
                    !deposit &&
                    value * 100 > available
                  }
                  onClick={() =>
                    changeAmount(String(value))
                  }
                >

                  {value}

                </button>

              )
            )}

            {!deposit && (
              <button
                type="button"
                className="adaptive-button adaptive-button-secondary"
                disabled={available <= 0}
                onClick={() =>
                  changeAmount(
                    (available / 100).toFixed(2)
                  )
                }
              >
                Tümü
              </button>
            )}

          </div>

          {!deposit && (
            <div className="adaptive-card-soft adaptive-row">

              <Info size={22} />

              <p className="adaptive-small">
                Asistanlara ayrılan para bu işlemde
                kullanılamaz.
              </p>

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

          <button
            type="submit"
            className="adaptive-button adaptive-button-primary adaptive-button-full"
          >

            Devam et

            <ArrowRight size={20} />

          </button>

        </form>
      )}

      {/* STEP 2: REVIEW */}

      {step === 2 && (
        <div className="adaptive-stack">

          <h3 className="adaptive-section-heading">
            İşleminizi kontrol edin
          </h3>

          <p className="adaptive-description">
            Onaylamadan önce işlem bilgilerini
            inceleyebilirsiniz.
          </p>

          <div className="adaptive-card-soft adaptive-stack">

            <div className="adaptive-vault-summary-row">

              <span className="adaptive-small">
                İşlem türü
              </span>

              <strong>
                {deposit
                  ? "Para yatırma"
                  : "Para çekme"}
              </strong>

            </div>

            <div className="adaptive-divider" />

            <div className="adaptive-vault-summary-row">

              <span className="adaptive-small">
                İşlem tutarı
              </span>

              <strong>
                {formatMoney(cents)} USDC
              </strong>

            </div>

            <div className="adaptive-divider" />

            <div className="adaptive-vault-summary-row">

              <span className="adaptive-small">
                İşlem ücreti (demo)
              </span>

              <strong>0,00 USDC</strong>

            </div>

            <div className="adaptive-divider" />

            <div className="adaptive-vault-summary-row">

              <span className="adaptive-small">
                Yeni toplam bakiye
              </span>

              <strong>
                {displayMoney(newBalance)}
              </strong>

            </div>

            <div className="adaptive-divider" />

            <div className="adaptive-vault-summary-row">

              <span className="adaptive-small">
                Yeni kullanılabilir para
              </span>

              <strong>
                {displayMoney(newAvailable)}
              </strong>

            </div>

          </div>

          <div className="adaptive-status adaptive-status-success">

            <ShieldCheck size={26} />

            <p>
              Bu bir demo işlemidir.
              Gerçek para transferi yapılmayacaktır.
            </p>

          </div>

          {error && (
            <div
              className="adaptive-status adaptive-status-danger"
              role="alert"
            >

              <AlertCircle size={23} />

              <p>{error}</p>

            </div>
          )}

          <button
            type="button"
            className="adaptive-button adaptive-button-primary adaptive-button-full"
            onClick={confirmTransaction}
          >

            <CheckCircle2 size={21} />

            İşlemi onayla

          </button>

          <button
            type="button"
            className="adaptive-button adaptive-button-secondary adaptive-button-full"
            onClick={() => {
              setError("");
              setStep(1);
            }}
          >

            <ArrowLeft size={20} />

            Geri dön

          </button>

        </div>
      )}

      {/* STEP 3: SUCCESS */}

      {step === 3 && (
        <div
          className="adaptive-wizard-success"
          role="status"
        >

          <div className="adaptive-wizard-success-icon">

            <CheckCircle2 size={46} />

          </div>

          <h3 className="adaptive-section-heading">
            İşlem başarılı!
          </h3>

          <p className="adaptive-description">

            {formatMoney(cents)} USDC

            {deposit
              ? " demo hesabınıza eklendi."
              : " demo hesabınızdan düşüldü."}

          </p>

          <div className="adaptive-card-soft adaptive-stack">

            <p className="adaptive-small">
              Güncel kullanılabilir paranız
            </p>

            <strong
              className="adaptive-vault-result-value"
            >
              {displayMoney(available)}
            </strong>

          </div>

          <button
            type="button"
            className="adaptive-button adaptive-button-primary adaptive-button-full"
            onClick={onClose}
          >

            Tamam

          </button>

        </div>
      )}

    </section>
  );
}
