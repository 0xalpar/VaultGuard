
"use client";

import { useState, useRef } from "react";

import Link from "next/link";
import {useDemoVault} from "../../components/DemoVaultProvider";
import {CENT,statusLabel} from "../../lib/demo-vault";

import {
  Bot,
  Plus,
  Activity,
  Wallet,
  ShieldCheck,
  Pause,
  Play,
  Pencil,
  Trash2,
  CheckCircle2,
  PauseCircle,
  ArrowRight,
  FlaskConical,
  RotateCcw,
} from "lucide-react";

import {
  useAdaptive,
} from "../../components/AdaptiveProvider";

import AdaptiveAgentWizard, {
  AGENT_TYPES,
  formatAgentMoney,
  type AgentDraft,
} from "../../components/AdaptiveAgentWizard";

import "./adaptive-agents.css";

/* ==========================================
   ADAPTIVE ONE 2.0
   MY ASSISTANTS
========================================== */

const MAX_AGENTS = 6;

export default function AgentsPage() {
  const { preferences } = useAdaptive();

  const {data,day,saveAgent:storeAgent,status,reset}=useDemoVault();
  const agents=data.vault.agents.map(a=>({...a,...data.profiles[a.id],dailyLimit:a.policy.dailyLimit/CENT,spent:a.day===day?a.dailySpent/CENT:0,active:a.status==="active"}));
  const registeredCount=agents.filter(a=>a.status!=="revoked").length;

  const [wizardOpen, setWizardOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [wizardKey, setWizardKey] =
    useState(0);

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  const [notice, setNotice] =
    useState("");

  const wizardRef =
    useRef<HTMLDivElement>(null);

  const easy =
    preferences.mode === "easy";

  const professional =
    preferences.mode === "professional";

  const hidden =
    preferences.hideBalance;

  const activeCount = agents.filter(
    (agent) => agent.active
  ).length;

  const totalSpent = agents.reduce(
    (total, agent) => total + agent.spent,
    0
  );

  const totalLimit = agents.reduce(
    (total, agent) =>
      total + agent.dailyLimit,
    0
  );

  const editingAgent = agents.find(
    (agent) => agent.id === editingId
  );

  function money(cents: number) {
    return hidden
      ? "••••••"
      : formatAgentMoney(cents);
  }

  /* OPEN WIZARD */

  function openWizard(id?: string) {
    if (!id && registeredCount >= MAX_AGENTS) {
      setNotice(
        "Demo ortamında en fazla 6 asistan oluşturabilirsiniz."
      );

      return;
    }

    setEditingId(id ?? null);
    setWizardKey((previous) => previous + 1);
    setWizardOpen(true);
    setDeleteId(null);
    setNotice("");

    requestAnimationFrame(() => {
      wizardRef.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });

      wizardRef.current?.focus({
        preventScroll: true,
      });
    });
  }

  function closeWizard() {
    setWizardOpen(false);
    setEditingId(null);
  }

  /* CREATE / UPDATE */

  function saveAgent(
    draft: AgentDraft
  ): boolean {
    if (
      draft.name.trim().length < 2 ||
      draft.name.trim().length > 40 ||
      !Number.isSafeInteger(draft.dailyLimit) ||
      draft.dailyLimit <= 0 ||
      draft.dailyLimit > 100000000 ||
      !AGENT_TYPES.some(
        (item) => item.id === draft.type
      )
    ) {
      return false;
    }

    try {
      storeAgent(editingId??crypto.randomUUID(),{name:draft.name,type:draft.type},draft.dailyLimit);
      setNotice(editingId?"Asistan bilgileri güncellendi.":"Demo asistan kaydedildi; başlangıçta duraklatıldı.");
      closeWizard();return true;
    } catch(e){setNotice(e instanceof Error?e.message:"Kayıt yapılamadı.");return false;}
  }
  function toggleAgent(id:string){const a=agents.find(x=>x.id===id);if(!a||a.status==="revoked")return;
    if(a.status==="suspended"&&!window.confirm("Askıdaki demo asistanı yeniden yetkilendir? İhlal sayacı sıfırlanır; harcamalar korunur."))return;
    status(id,a.active?"paused":"active");setNotice("Demo asistan yetkisi güncellendi.");
  }
  function deleteAgent(id:string){status(id,"revoked");if(editingId===id)closeWizard();setDeleteId(null);setNotice("Yetki iptal edildi; denetim kaydı korunuyor.");}
  function resetDemo(){if(!window.confirm("Tüm ortak demo verileri sıfırlansın mı?"))return;reset();setDeleteId(null);closeWizard();setNotice("Tüm demo verileri sıfırlandı.");}

  return (
    <div className="adaptive-agents">

      {/* HEADER */}

      <header className="adaptive-agents-header">
        <div className="adaptive-agents-header-text">
          <p className="adaptive-agents-eyebrow">
            DİJİTAL ASİSTAN YÖNETİMİ
          </p>

          <h1 className="adaptive-heading">
            Asistanlarım
          </h1>

          <p className="adaptive-description">
            {easy
              ? "Asistanlarınızı kolayca yönetin."
              : professional
                ? "Asistan durumlarını, görevlerini ve günlük işlem limitlerini yönetin."
                : "Dijital asistanlarınızın görevlerini ve harcama sınırlarını belirleyin."}
          </p>
        </div>

        <button
          type="button"
          className="adaptive-button adaptive-button-primary"
          disabled={registeredCount >= MAX_AGENTS}
          onClick={() => openWizard()}
        >
          <Plus size={23} />
          Yeni asistan oluştur
        </button>
      </header>

      {/* DEMO LABEL */}

      <div className="adaptive-row">
        <FlaskConical
          size={19}
          color="var(--ad-muted)"
        />

        <p className="adaptive-small">
          Demo ortamı · Gerçek AI görevleri
          çalıştırılmaz.
        </p>
      </div>

      {/* STATISTICS */}

      <div className="adaptive-agents-stats">
        <section className="adaptive-card adaptive-agent-stat">
          <span className="adaptive-icon-box">
            <Bot size={25} />
          </span>

          <p className="adaptive-small">
            Toplam asistan
          </p>

          <p className="adaptive-agent-stat-value">
            {agents.length}
          </p>
        </section>

        <section className="adaptive-card adaptive-agent-stat">
          <span className="adaptive-icon-box">
            <Activity size={25} />
          </span>

          <p className="adaptive-small">
            Yetkili asistan
          </p>

          <p className="adaptive-agent-stat-value">
            {activeCount}
          </p>
        </section>

        {!easy && (
          <section className="adaptive-card adaptive-agent-stat">
            <span className="adaptive-icon-box">
              <Wallet size={25} />
            </span>

            <p className="adaptive-small">
              Bugünkü toplam harcama
            </p>

            <p className="adaptive-agent-stat-value">
              {money(totalSpent)} USDC
            </p>
          </section>
        )}
      </div>

      {/* SECURITY NOTICE */}

      <section className="adaptive-status adaptive-status-success">
        <ShieldCheck size={28} />

        <div className="adaptive-grow">
          <p style={{ fontWeight: 600 }}>
            Kontrol sizde
          </p>

          <p className="adaptive-small">
            Her asistan için ayrı bir günlük
            harcama sınırı belirleyebilirsiniz.
            Bu sınırlar şimdilik demo ayarlarıdır.
          </p>
        </div>
      </section>

      {/* FEEDBACK */}

      {notice && (
        <div
          className="adaptive-card adaptive-stack"
          role="status"
        >
          <div className="adaptive-row">
            <CheckCircle2
              size={23}
              color="var(--ad-success)"
            />

            <p className="adaptive-grow">
              {notice}
            </p>
          </div>

          <button
            type="button"
            className="adaptive-button adaptive-button-secondary"
            onClick={() => setNotice("")}
          >
            Anladım
          </button>
        </div>
      )}

      {/* CREATE / EDIT WIZARD */}

      <div
        ref={wizardRef}
        tabIndex={-1}
        style={{ scrollMarginTop: "120px" }}
        hidden={!wizardOpen}
      >
        {wizardOpen && (
          <AdaptiveAgentWizard
            key={wizardKey}
            agent={editingAgent}
            onClose={closeWizard}
            onSave={saveAgent}
          />
        )}
      </div>

      {/* AGENTS LIST HEADER */}

      <div className="adaptive-row adaptive-between">
        <h2 className="adaptive-section-heading">
          Asistan listeniz
        </h2>

        <p className="adaptive-small">
          {registeredCount} / {MAX_AGENTS} yetkisi iptal edilmemiş asistan
        </p>
      </div>

      {/* EMPTY STATE */}

      {agents.length === 0 && (
        <section className="adaptive-card adaptive-agents-empty">
          <div className="adaptive-agent-empty-icon">
            <Bot size={42} />
          </div>

          <h2 className="adaptive-section-heading">
            İlk asistanınızı oluşturun
          </h2>

          <p className="adaptive-description">
            İhtiyacınıza uygun bir görev seçin
            ve harcama sınırınızı belirleyin.
          </p>

          <button
            type="button"
            className="adaptive-button adaptive-button-primary"
            onClick={() => openWizard()}
          >
            <Plus size={22} />
            Asistan oluştur
          </button>
        </section>
      )}

      {/* AGENT CARDS */}

      <div className="adaptive-agents-grid">
        {agents.map((agent) => {
          const type =
            AGENT_TYPES.find(
              (item) => item.id === agent.type
            ) ?? AGENT_TYPES[0];

          const Icon = type.icon;

          const percentage = Math.min(
            100,
            agent.spent / agent.dailyLimit * 100
          );

          const remaining = Math.max(
            0,
            agent.dailyLimit - agent.spent
          );

          return (
            <section
              key={agent.id}
              className="adaptive-card adaptive-agent-card"
            >
              {/* AGENT INFORMATION */}

              <div className="adaptive-agent-card-header">
                <span className="adaptive-agent-avatar">
                  <Icon size={30} />
                </span>

                <div className="adaptive-grow">
                  <h3 className="adaptive-agent-name">
                    {agent.name}
                  </h3>

                  <p className="adaptive-small">
                    {type.description}
                  </p>
                </div>
              </div>

              {/* STATUS */}

              <div
                className="adaptive-agent-status"
                data-active={agent.active}
              >
                {agent.active ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <PauseCircle size={18} />
                )}

                {statusLabel[agent.status]}
              </div>

              <p className="adaptive-small" style={{overflowWrap:"anywhere"}}>AgentID: {agent.id}</p>
              <p className="adaptive-small" style={{overflowWrap:"anywhere"}}>Örnek imzacı: {agent.publicKey}</p>
              <p className={agent.violations>=1?"adaptive-status adaptive-status-danger":"adaptive-small"}>Yetki ihlalleri: {agent.violations}/1 · Gerçek imza doğrulanmıyor</p>
              <div className="adaptive-divider" />
              {/* DAILY SPENDING */}

              <div className="adaptive-agent-budget">
                <div className="adaptive-row adaptive-between">
                  <span className="adaptive-small">
                    Bugünkü harcama
                  </span>

                  <strong className="adaptive-agent-budget-value">
                    {money(agent.spent)} /{" "}
                    {money(agent.dailyLimit)} USDC
                  </strong>
                </div>

                {!hidden && (
                  <div
                    className="adaptive-agent-progress"
                    role="progressbar"
                    aria-label="Günlük harcama sınırı kullanımı"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(
                      percentage
                    )}
                  >
                    <div
                      className="adaptive-agent-progress-fill"
                      data-warning={percentage >= 80}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                )}

                {!easy && (
                  <div className="adaptive-row adaptive-between">
                    <span className="adaptive-small">
                      Kalan günlük sınır
                    </span>

                    <strong>
                      {money(remaining)} USDC
                    </strong>
                  </div>
                )}

                {professional && (
                  <div className="adaptive-card-soft adaptive-stack">
                    <p className="adaptive-small">
                      Asistan kimliği
                    </p>

                    <p
                      className="adaptive-small"
                      style={{
                        overflowWrap: "anywhere",
                      }}
                    >
                      {agent.id}
                    </p>

                    <div className="adaptive-divider" />

                    <p className="adaptive-small">
                      Çalışma ortamı: Simülasyon
                    </p>

                    <p className="adaptive-small">
                      Blockchain bağlantısı: Yok
                    </p>
                  </div>
                )}
              </div>

              {/* ACTIONS */}

              <div className="adaptive-agent-actions">
                <button
                  type="button"
                  className="adaptive-button adaptive-button-secondary"
                  disabled={agent.status==="revoked"}
                  onClick={() =>
                    toggleAgent(agent.id)
                  }
                >
                  {agent.active ? (
                    <>
                      <Pause size={19} />
                      Duraklat
                    </>
                  ) : (
                    <>
                      <Play size={19} />
                      {agent.status==="suspended"?"Yeniden yetkilendir":"Yetkilendir"}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="adaptive-button adaptive-button-secondary"
                  disabled={agent.status==="revoked"}
                  onClick={() =>
                    openWizard(agent.id)
                  }
                >
                  <Pencil size={19} />
                  Düzenle
                </button>
              </div>

              {/* DELETE CONFIRMATION */}

              {deleteId === agent.id ? (
                <div className="adaptive-status adaptive-status-danger adaptive-stack">
                  <p>
                    {agent.name} yetkisi iptal edilsin mi? Bu demo kaydı ve geçmişi korunur; yeni işlemler reddedilir.
                  </p>

                  <button
                    type="button"
                    className="adaptive-button adaptive-button-danger adaptive-button-full"
                    onClick={() =>
                      deleteAgent(agent.id)
                    }
                  >
                    <Trash2 size={19} />
                    Evet, yetkiyi iptal et
                  </button>

                  <button
                    type="button"
                    className="adaptive-button adaptive-button-secondary adaptive-button-full"
                    onClick={() =>
                      setDeleteId(null)
                    }
                  >
                    Vazgeç
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="adaptive-agent-delete"
                  disabled={agent.status==="revoked"}
                  onClick={() =>
                    setDeleteId(agent.id)
                  }
                >
                  <Trash2 size={18} />
                  Yetkiyi iptal et
                </button>
              )}
            </section>
          );
        })}
      </div>

      {/* PROFESSIONAL SUMMARY */}

      {professional && (
        <section className="adaptive-card adaptive-stack">
          <h2 className="adaptive-section-heading">
            Toplam günlük sınırlar
          </h2>

          <div className="adaptive-agent-summary-row">
            <span>
              Asistanların toplam günlük sınırı
            </span>

            <strong>
              {money(totalLimit)} USDC
            </strong>
          </div>

          <div className="adaptive-divider" />

          <div className="adaptive-agent-summary-row">
            <span>Listelenen toplam harcama</span>

            <strong>
              {money(totalSpent)} USDC
            </strong>
          </div>

          <p className="adaptive-small">
            Harcama sınırları ayrılmış gerçek
            para anlamına gelmez.
          </p>
        </section>
      )}

      {/* SECURITY SETTINGS */}

      <section className="adaptive-card adaptive-stack">
        <div className="adaptive-row">
          <span className="adaptive-icon-box">
            <ShieldCheck size={27} />
          </span>

          <div className="adaptive-grow">
            <h2 className="adaptive-section-heading">
              Asistan güvenliği
            </h2>

            <p className="adaptive-description">
              Agent bazlı güvenlik kurallarınızı
              Güvenliğim ekranından yönetebilirsiniz.
            </p>
          </div>
        </div>

        <Link
          href="/policies"
          className="adaptive-button adaptive-button-secondary"
        >
          Güvenlik kurallarını incele
          <ArrowRight size={19} />
        </Link>
      </section>

      {/* RESET */}

      <section className="adaptive-card adaptive-stack">
        <h2 className="adaptive-section-heading">
          Demo asistanları
        </h2>

        <p className="adaptive-small">
          Bakiye, kurallar ve işlem geçmişi dahil tüm ortak demo verileri sıfırlanır.
        </p>

        <button
          type="button"
          className="adaptive-button adaptive-button-secondary"
          onClick={resetDemo}
        >
          <RotateCcw size={19} />
          Tüm demo verilerini sıfırla
        </button>
      </section>
    </div>
  );
}
