"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "P0" | "P1" | "P2";
type Grade = "F" | "D" | "C" | "B" | "A";

interface LPPage {
  slug: string;
  label: string;
  url: string;
  score: number;
  grade: Grade;
  priority: Priority;
  adSpend?: number;
  leadsTracked?: number;
  sections: number;
  hasVideo: boolean;
  issues: { visual: string[]; copy: string[]; cro: string[]; trust: string[] };
  wins: string[];
  quickFixes: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const LP_DATA: LPPage[] = [
  {
    slug: "softwave",
    label: "SoftWave $49",
    url: "softwave.watersedgemedicalclinic.com",
    score: 48,
    grade: "F",
    priority: "P0",
    adSpend: 14000,
    leadsTracked: 0,
    sections: 3,
    hasVideo: false,
    issues: {
      visual: [
        "Times New Roman como fonte principal — comunica jornal antigo, não clínica premium",
        "Apenas 3 seções — narrativa insuficiente para justificar conversão",
        "Padding 0px em todas as seções — layout comprimido sem espaço para respirar",
        "Nenhuma identidade visual consistente com a marca",
      ],
      copy: [
        'H1 genérico: "Calling All, St. Petersburg Residents!" — idêntico à página Weight Loss',
        "Texto do H2 dividido em duas linhas sem lógica de quebra",
        "Nenhuma proposta de valor específica ao SoftWave (vs. outras clínicas)",
      ],
      cro: [
        "Formulário não embutido — CTA redireciona a popup GHL que quebra o pixel Meta",
        "Zero countdown timer apesar de oferta de preço limitada ($49)",
        "$14.000 investidos em ads com 0 leads rastreados — causa mais provável: esse formulário",
      ],
      trust: [
        "1 testimonial sem foto, nome ou resultado específico",
        "Nenhuma credencial médica ou nome do especialista visível",
        "Nenhuma garantia de satisfação mencionada",
      ],
    },
    wins: [
      'CTA "CLAIM YOUR $49 VOUCHER" é claro e específico',
      "Preço âncora ($250 → $49) bem comunicado",
    ],
    quickFixes: [
      "Embutir formulário nativo (Nome + Telefone) acima do fold",
      "Substituir Times New Roman por Plus Jakarta Sans",
      "Adicionar countdown timer de 48h para a oferta",
      "Reescrever H1 com foco em alívio de dor específico",
    ],
  },
  {
    slug: "jointpain",
    label: "Joint Pain",
    url: "jointpain.watersedgemedicalclinic.com",
    score: 44,
    grade: "F",
    priority: "P0",
    sections: 9,
    hasVideo: true,
    issues: {
      visual: [
        "Aparência de clipart anos 90 — badge de garantia genérico, imagens de stock",
        "Imagem do homem segurando o joelho sem contexto clínico",
        "Texto em blocos densos sem escanabilidade",
        "Cores inconsistentes — mistura de azul médico com amarelo de cupom",
      ],
      copy: [
        "H2 'What if your joints could heal instead of just masking pain?' duplicado no DOM",
        "Seção duplicada indica bug técnico na página",
        "Sem resultado numérico específico (ex: '87% dos pacientes relatam melhora em 3 sessões')",
      ],
      cro: [
        "Zero urgência — sem prazo de oferta, sem contador",
        "Apenas 1 testimonial vago, sem resultado mensurável",
        "Nenhum formulário embutido",
      ],
      trust: [
        "Badge de garantia genérico sem detalhes do que é garantido",
        "Google rating presente mas sem número de avaliações visível",
        "Sem nome/foto do médico responsável pelo tratamento",
      ],
    },
    wins: [
      'H2 "What if your joints could heal instead of just masking pain?" é copy genuinamente bom',
      "Vídeo presente na página",
      "9 seções — estrutura mais completa",
    ],
    quickFixes: [
      "Corrigir seção duplicada (bug técnico)",
      "Adicionar urgência: oferta válida até data específica",
      "Adicionar resultado numérico de paciente real",
      "Embutir formulário nativo",
    ],
  },
  {
    slug: "vampirefacial",
    label: "Vampire Facial",
    url: "vampirefacial.watersedgemedicalclinic.com",
    score: 50,
    grade: "F",
    priority: "P1",
    sections: 7,
    hasVideo: false,
    issues: {
      visual: [
        "Apenas 2 imagens — catastrófico para tratamento estético que depende de resultados visuais",
        "Fundo azul escuro + texto branco: boa intenção, execução genérica de template",
        "Nenhuma imagem do procedimento sendo realizado",
        "Sem before/after visual (apenas texto mencionando)",
      ],
      copy: [
        'CTA "GET OFFER Buy 1 Take 1" — a promoção não está explicada (o que é "Take 1"?)',
        '"Free Consultation and Evaluation" aparece antes do preço/oferta — hierarquia errada',
        "Nenhum depoimento específico de paciente com resultado",
      ],
      cro: [
        "Zero urgência — sem deadline, sem escassez",
        "1 testimonial sem foto ou nome",
        "Sem formulário embutido",
      ],
      trust: [
        "Sem fotos antes/depois reais do tratamento",
        'Nome "Vampire Facial" sem explicação imediata gera hesitação',
        "Sem certificação ou experiência do profissional",
      ],
    },
    wins: [
      '"Hollywood-favorite Vampire Facial" — nomenclatura aspiracional que funciona',
      "Azul escuro cria diferenciação visual entre as páginas",
      "FAQ section com perguntas relevantes",
    ],
    quickFixes: [
      "Adicionar mínimo 8 fotos before/after reais",
      "Reescrever CTA: 'Agendar Vampire Facial por $399' ao invés de 'Get Offer Buy 1 Take 1'",
      "Adicionar depoimento com foto + resultado específico",
      "Embutir formulário nativo",
    ],
  },
  {
    slug: "morpheus8",
    label: "Morpheus8",
    url: "morpheus8.watersedgemedicalclinic.com",
    score: 54,
    grade: "D",
    priority: "P1",
    sections: 9,
    hasVideo: false,
    issues: {
      visual: [
        "Layout hero de duas colunas: estrutura correta mas imagem mal dimensionada",
        "Times New Roman como fonte do corpo",
        "Padding 0px — seções sem respiro visual",
      ],
      copy: [
        'H1 "Unlock Ageless Beauty And Transform Your Skin Layer by Layer!" — melodramático',
        "Urgência verbal ('limited spots') sem elemento visual que suporte",
        "2 testimonials — melhor do grupo, mas ainda sem fotos",
      ],
      cro: [
        "CTA 'SUBMIT' em botão de formulário — pior CTA possível",
        "Tem urgência verbal mas sem countdown timer",
        "Form presente mas pode ser popup GHL",
      ],
      trust: [
        "Imagem de equipamento Morpheus8 real — ponto positivo",
        "Sem número de procedimentos realizados",
        "Sem certificação específica do médico",
      ],
    },
    wins: [
      "30% OFF + FREE PRP é oferta combinada atrativa",
      "2 testimonials — mais que a maioria",
      "Urgência verbal presente ('limited spots', 'don't miss')",
      "Imagem da paciente com marcações é impactante",
    ],
    quickFixes: [
      "Trocar CTA 'SUBMIT' por 'Quero Meu Desconto de 30%'",
      "Adicionar countdown timer real (ex: oferta expira em 3 dias)",
      "Trocar Times New Roman por Geist ou Plus Jakarta Sans",
    ],
  },
  {
    slug: "neuropathy",
    label: "Neuropathy Treatment",
    url: "neuropathy.watersedgemedicalclinic.com",
    score: 55,
    grade: "D",
    priority: "P1",
    sections: 9,
    hasVideo: true,
    issues: {
      visual: [
        "Google reviews badge visível mas testimonials em vídeo aparecem como quadrados pretos",
        "Times New Roman como fonte principal",
        "Layout inconsistente entre seções",
      ],
      copy: [
        'Typo crítico no CTA: "FREE CONSULATION" (faltando L) — destrói credibilidade médica',
        'H1 confuso: "Waters Edge Offers 15 Neuropathy Consultation..." — "15" provavelmente é "$15" com erro de formatação',
        "CTA duplicado na página sem variação de copy",
      ],
      cro: [
        "Urgência verbal presente ('limited') mas sem elemento visual",
        "1 testimonial",
        "Sem formulário embutido",
      ],
      trust: [
        "Vídeo presente — único ativo de trust na página",
        "Google rating badge",
        "Sem credencial do especialista em neuropatia",
      ],
    },
    wins: [
      "Vídeo presente na página",
      "Google rating badge visível",
      "Oferta de $49 para consulta + avaliação é proposta de valor clara",
      "9 seções — estrutura completa",
    ],
    quickFixes: [
      "URGENTE: Corrigir typo 'CONSULATION' → 'CONSULTATION' em todos os CTAs",
      "Corrigir H1: '15 Neuropathy' → '$15 Neuropathy' (ou revisar o valor)",
      "Corrigir vídeos de testimonials que carregam como quadrados pretos",
      "Embutir formulário nativo",
    ],
  },
  {
    slug: "weightloss",
    label: "Weight Loss $49",
    url: "weightloss.watersedgemedicalclinic.com",
    score: 52,
    grade: "D",
    priority: "P1",
    sections: 5,
    hasVideo: true,
    issues: {
      visual: [
        "Imagem da máquina Contour Light domina sem contexto emocional do paciente",
        "Times New Roman como fonte",
        "Capitalização inconsistente: 'when you Pay Now You Get MORE Benefits'",
      ],
      copy: [
        'H1 idêntico ao SoftWave: "Calling All, St. Petersburg Area Residents!" — zero diferenciação',
        'CTA "Go To Step #2" — nenhum usuário entende o que é o Step 2',
        "Sem resultado numérico específico (kg perdidos, cm reduzidos)",
      ],
      cro: [
        "CTA de pior qualidade do grupo: 'Go To Step #2'",
        "Urgência verbal ('limited') sem elemento visual",
        "2 vídeos — melhor conteúdo visual do grupo",
        "Sem formulário embutido",
      ],
      trust: [
        "9 imagens — mais rico visualmente",
        "2 vídeos presentes",
        "Sem resultado de paciente com nome + número específico",
      ],
    },
    wins: [
      "2 vídeos — maior quantidade de conteúdo em vídeo",
      "9 imagens — mais rico visualmente",
      "Oferta $49 com âncora $397 bem apresentada",
    ],
    quickFixes: [
      "Reescrever H1 com foco em resultado (ex: 'Reduza Gordura Localizada em 3 Sessões')",
      "Trocar 'Go To Step #2' por CTA claro com benefício",
      "Adicionar resultado de paciente com nome + número específico",
      "Embutir formulário nativo",
    ],
  },
  {
    slug: "hairrestoration",
    label: "Hair Restoration",
    url: "hairrestoration.watersedgemedicalclinic.com",
    score: 58,
    grade: "D",
    priority: "P2",
    sections: 9,
    hasVideo: true,
    issues: {
      visual: [
        "Times New Roman como fonte principal",
        "Padding 0px em todas as seções",
        "Emoji 🚀 no H2 de página médica — destrói credibilidade profissional",
      ],
      copy: [
        'H1 orientado à oferta: "Buy 3 and Get 1 FREE PRP" — sem benefício emocional',
        'H2 termina com emoji 🚀 — inadequado para contexto médico',
        "1 testimonial apenas",
      ],
      cro: [
        "Urgência verbal presente ('limited spots')",
        "1 testimonial sem foto",
        "Sem formulário embutido",
        "Vídeo presente — ativo positivo de conversão",
      ],
      trust: [
        "8 imagens — boa quantidade",
        "1 vídeo presente",
        "Sem resultado clínico com número (ex: '94% de retenção capilar em 6 meses')",
      ],
    },
    wins: [
      "1 vídeo + 8 imagens — melhor conteúdo visual do grupo D",
      "Urgência verbal presente",
      "9 seções — estrutura narrativa completa",
      "Aborda impacto emocional da calvície — ângulo correto",
    ],
    quickFixes: [
      "Remover emoji 🚀 do H2",
      "Reescrever H1 com benefício: 'Recupere Cabelos Mais Grossos em 90 Dias'",
      "Adicionar resultado com percentual (ex: '94% dos pacientes relatam melhora')",
      "Embutir formulário nativo",
    ],
  },
  {
    slug: "potenza",
    label: "Potenza",
    url: "potenza.watersedgemedicalclinic.com",
    score: 56,
    grade: "D",
    priority: "P2",
    sections: 10,
    hasVideo: false,
    issues: {
      visual: [
        "10 seções (mais longa) mas apenas 3 imagens — wall of text",
        "Times New Roman como fonte",
        "Seções longas sem breaks visuais suficientes",
      ],
      copy: [
        'Typo: "Buy a Potenza and Get a Free Lase Facial" (falta R em "Laser") — erro em todos os CTAs',
        '"click this link" como anchor text de CTA — amadorístico',
        "Urgência presente ('Limited Time Offer') mas sem data específica",
      ],
      cro: [
        "Urgência verbal + 'limited spots' presente",
        "2 testimonials — segundo melhor do grupo",
        "Sem countdown timer",
        "Sem formulário embutido",
      ],
      trust: [
        "2 testimonials",
        "Equipamento Potenza mencionado por nome (credibilidade técnica)",
        "Sem fotos do equipamento ou procedimento",
      ],
    },
    wins: [
      "2 testimonials — empatado com Morpheus8",
      "10 seções — narrativa mais completa",
      "H1 mais forte: 'Say Goodbye to Fine Lines, Wrinkles & Acne Scars'",
      "Urgência verbal presente",
    ],
    quickFixes: [
      "URGENTE: Corrigir 'Lase Facial' → 'Laser Facial' em todos os CTAs",
      "Trocar 'click this link' por CTA descritivo",
      "Adicionar 6+ imagens do procedimento/resultados",
      "Adicionar countdown timer",
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function gradeColor(grade: Grade): string {
  const map: Record<Grade, string> = {
    A: "#10b981",
    B: "#22c55e",
    C: "#eab308",
    D: "#f97316",
    F: "#ef4444",
  };
  return map[grade];
}

function scoreOffset(score: number): number {
  const circumference = 251;
  return circumference - (score / 100) * circumference;
}

function priorityStyle(p: Priority) {
  const map: Record<Priority, { bg: string; color: string; label: string }> = {
    P0: { bg: "rgba(239,68,68,0.15)", color: "#ef4444", label: "P0 — Emergência" },
    P1: { bg: "rgba(249,115,22,0.15)", color: "#f97316", label: "P1 — Alto Impacto" },
    P2: { bg: "rgba(234,179,8,0.15)", color: "#eab308", label: "P2 — Melhoria" },
  };
  return map[p];
}

// ─── Score Ring ───────────────────────────────────────────────────────────────

function ScoreRing({ score, grade, size = 72 }: { score: number; grade: Grade; size?: number }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = gradeColor(grade);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 90 90" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="45" cy="45" r={r} fill="none" stroke="#27272a" strokeWidth="6" />
        <circle
          cx="45"
          cy="45"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          className="score-ring-circle"
          style={{ "--target-offset": offset } as React.CSSProperties}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-base font-bold leading-none" style={{ color }}>
          {score}
        </span>
        <span className="text-[10px] font-semibold mt-0.5" style={{ color }}>
          {grade}
        </span>
      </div>
    </div>
  );
}

// ─── LP Card ──────────────────────────────────────────────────────────────────

function LPCard({ lp, onOpen }: { lp: LPPage; onOpen: () => void }) {
  const p = priorityStyle(lp.priority);
  const allIssues = [...lp.issues.cro, ...lp.issues.visual, ...lp.issues.copy].slice(0, 3);

  return (
    <div
      className="fade-up rounded-2xl border overflow-hidden cursor-pointer group transition-all duration-300"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
        animationDelay: "0.1s",
      }}
      onClick={onOpen}
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden" style={{ height: 160 }}>
        <img
          src={`/screenshots/${lp.slug}-desktop.png`}
          alt={lp.label}
          className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          style={{ height: 320, marginTop: 0 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(24,24,27,0) 40%, rgba(24,24,27,0.95) 100%)",
          }}
        />
        {/* Priority badge */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ background: p.bg, color: p.color, border: `1px solid ${p.color}30` }}
        >
          {p.label}
        </div>
        {lp.adSpend && (
          <div
            className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}
          >
            ${lp.adSpend.toLocaleString()} em ads
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate" style={{ color: "var(--foreground)" }}>
              {lp.label}
            </h3>
            <p className="text-[11px] truncate mt-0.5" style={{ color: "var(--muted)" }}>
              {lp.url}
            </p>
          </div>
          <ScoreRing score={lp.score} grade={lp.grade} size={52} />
        </div>

        {/* Issues preview */}
        <div className="space-y-1.5">
          {allIssues.map((issue, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-[10px]" style={{ color: "#ef4444" }}>
                ✕
              </span>
              <p className="text-[11px] leading-snug line-clamp-2" style={{ color: "var(--muted)" }}>
                {issue}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: "var(--card-border)" }}>
          <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--muted)" }}>
            <span>{lp.sections} seções</span>
            <span>{lp.hasVideo ? "✓ vídeo" : "✗ vídeo"}</span>
            {lp.leadsTracked === 0 && lp.adSpend && (
              <span style={{ color: "#ef4444" }}>0 leads</span>
            )}
          </div>
          <span
            className="text-[11px] font-medium transition-colors"
            style={{ color: "var(--accent)" }}
          >
            Ver análise →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

type IssueCategory = "visual" | "copy" | "cro" | "trust";

const CATEGORY_LABELS: Record<IssueCategory, { label: string; icon: string; color: string }> = {
  visual: { label: "Design Visual", icon: "◈", color: "#a78bfa" },
  copy:   { label: "Copy & Texto",  icon: "✎", color: "#60a5fa" },
  cro:    { label: "Conversão",     icon: "◎", color: "#f97316" },
  trust:  { label: "Confiança",     icon: "◇", color: "#22d3ee" },
};

function Modal({ lp, onClose }: { lp: LPPage; onClose: () => void }) {
  const [tab, setTab] = useState<IssueCategory>("cro");
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const p = priorityStyle(lp.priority);

  const totalIssues =
    lp.issues.visual.length +
    lp.issues.copy.length +
    lp.issues.cro.length +
    lp.issues.trust.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border"
        style={{ background: "#111113", borderColor: "var(--card-border)" }}
      >
        {/* Modal header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b"
          style={{ background: "#111113", borderColor: "var(--card-border)" }}
        >
          <div className="flex items-center gap-4">
            <ScoreRing score={lp.score} grade={lp.grade} size={52} />
            <div>
              <h2 className="font-semibold text-base" style={{ color: "var(--foreground)" }}>
                {lp.label}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                {lp.url}
              </p>
            </div>
            <div
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
              style={{ background: p.bg, color: p.color }}
            >
              {p.label}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors"
            style={{ background: "var(--card-border)", color: "var(--muted)" }}
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-5 gap-0">
          {/* Left: Screenshot */}
          <div className="col-span-2 border-r" style={{ borderColor: "var(--card-border)" }}>
            <div className="p-4 border-b flex gap-2" style={{ borderColor: "var(--card-border)" }}>
              {(["desktop", "mobile"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: view === v ? "rgba(34,211,238,0.1)" : "transparent",
                    color: view === v ? "var(--accent)" : "var(--muted)",
                    border: view === v ? "1px solid rgba(34,211,238,0.3)" : "1px solid transparent",
                  }}
                >
                  {v === "desktop" ? "Desktop" : "Mobile"}
                </button>
              ))}
            </div>
            <div className="p-4">
              <div
                className="rounded-xl overflow-hidden border"
                style={{
                  borderColor: "var(--card-border)",
                  maxHeight: view === "mobile" ? 480 : 420,
                  overflowY: "auto",
                }}
              >
                <img
                  src={`/screenshots/${lp.slug}-${view}.png`}
                  alt={`${lp.label} ${view}`}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Right: Analysis */}
          <div className="col-span-3">
            {/* Stats row */}
            <div className="grid grid-cols-3 border-b" style={{ borderColor: "var(--card-border)" }}>
              {[
                { label: "Problemas", value: totalIssues, color: "#ef4444" },
                { label: "Seções", value: lp.sections, color: "var(--foreground)" },
                { label: "Vídeo", value: lp.hasVideo ? "Sim" : "Não", color: lp.hasVideo ? "#22c55e" : "#ef4444" },
              ].map(({ label, value, color }) => (
                <div key={label} className="px-5 py-4 border-r last:border-r-0" style={{ borderColor: "var(--card-border)" }}>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{label}</p>
                  <p className="text-xl font-bold mt-0.5" style={{ color }}>{value}</p>
                </div>
              ))}
            </div>

            {lp.adSpend !== undefined && (
              <div
                className="mx-5 mt-4 px-4 py-3 rounded-xl flex items-center justify-between"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <div>
                  <p className="text-xs font-semibold" style={{ color: "#ef4444" }}>
                    ⚠ Investimento em Risco
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                    ${lp.adSpend.toLocaleString()} investidos em Meta Ads com{" "}
                    <strong style={{ color: "#ef4444" }}>{lp.leadsTracked} leads rastreados</strong>
                  </p>
                </div>
                <span className="text-2xl font-black" style={{ color: "#ef4444" }}>
                  ${lp.adSpend.toLocaleString()}
                </span>
              </div>
            )}

            {/* Issue tabs */}
            <div className="px-5 mt-4 flex gap-2 flex-wrap">
              {(Object.keys(CATEGORY_LABELS) as IssueCategory[]).map((cat) => {
                const meta = CATEGORY_LABELS[cat];
                const active = tab === cat;
                const count = lp.issues[cat].length;
                return (
                  <button
                    key={cat}
                    onClick={() => setTab(cat)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: active ? `${meta.color}18` : "transparent",
                      color: active ? meta.color : "var(--muted)",
                      border: active ? `1px solid ${meta.color}40` : "1px solid var(--card-border)",
                    }}
                  >
                    <span>{meta.icon}</span>
                    {meta.label}
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[10px]"
                      style={{ background: active ? `${meta.color}25` : "rgba(113,113,122,0.2)" }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Issues list */}
            <div className="px-5 mt-3 space-y-2">
              {lp.issues[tab].map((issue, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="mt-0.5 shrink-0 text-xs" style={{ color: "#ef4444" }}>✕</span>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.85 }}>
                    {issue}
                  </p>
                </div>
              ))}
            </div>

            {/* Wins */}
            <div className="px-5 mt-5">
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>
                O QUE FUNCIONA
              </p>
              <div className="space-y-2">
                {lp.wins.map((win, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)" }}
                  >
                    <span className="mt-0.5 shrink-0 text-xs" style={{ color: "#22c55e" }}>✓</span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.85 }}>
                      {win}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick fixes */}
            <div className="px-5 mt-5 mb-6">
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>
                CORREÇÕES RÁPIDAS
              </p>
              <div className="space-y-2">
                {lp.quickFixes.map((fix, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(34,211,238,0.04)", border: "1px solid rgba(34,211,238,0.12)" }}
                  >
                    <span className="mt-0.5 shrink-0 text-xs font-bold" style={{ color: "var(--accent)" }}>
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.85 }}>
                      {fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const UNIVERSAL_ISSUES = [
  {
    icon: "T",
    color: "#a78bfa",
    title: "Times New Roman em todas as páginas",
    desc: 'Fonte de jornal de 1931 aplicada como fonte principal nas 8 páginas. Para uma clínica que cobra $2.000 por Morpheus8, isso comunica "site de spam".',
  },
  {
    icon: "⌺",
    color: "#ef4444",
    title: "Zero formulários embutidos",
    desc: "Nenhuma das 8 páginas tem formulário nativo. Todos os leads dependem de popups externos do GHL que quebram o pixel do Meta — explicando $14K / 0 leads no SoftWave.",
  },
  {
    icon: "↕",
    color: "#f97316",
    title: "Padding 0px em todas as seções",
    desc: "Todas as seções de todas as páginas têm padding zero. O conteúdo está colado às bordas sem hierarquia visual, parecendo um recibo térmico.",
  },
  {
    icon: "⏱",
    color: "#eab308",
    title: "Zero countdown timers",
    desc: "8 páginas com ofertas de preço limitado ($49, 30% OFF, 'limited spots') e nenhuma tem um countdown timer. Urgência verbal sem urgência visual não converte.",
  },
  {
    icon: "★",
    color: "#22d3ee",
    title: "Testimonials em vídeo não carregam",
    desc: "A seção 'REAL PEOPLE, REAL TESTIMONIALS' existe em todas as páginas, mas os vídeos aparecem como quadrados pretos. O principal elemento de social proof está invisível.",
  },
];

export default function LandingPagesPage() {
  const [selected, setSelected] = useState<LPPage | null>(null);
  const [filter, setFilter] = useState<Priority | "ALL">("ALL");

  const filtered =
    filter === "ALL" ? LP_DATA : LP_DATA.filter((lp) => lp.priority === filter);

  const avgScore = Math.round(LP_DATA.reduce((s, lp) => s + lp.score, 0) / LP_DATA.length);
  const fCount = LP_DATA.filter((lp) => lp.grade === "F").length;
  const totalIssues = LP_DATA.reduce(
    (s, lp) =>
      s + lp.issues.visual.length + lp.issues.copy.length + lp.issues.cro.length + lp.issues.trust.length,
    0
  );

  return (
    <div className="min-h-screen p-8" style={{ background: "var(--background)" }}>
      {/* Page header */}
      <div className="mb-8 fade-up">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(34,211,238,0.1)", color: "var(--accent)", border: "1px solid rgba(34,211,238,0.2)" }}>
            Auditoria CRO v2
          </span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>2026-04-22</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
          Landing Pages
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          8 páginas analisadas com Playwright · Design Visual · Copy · CRO · UX · Confiança
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Score Médio", value: `${avgScore}/100`, sub: "média das 8 páginas", color: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)" },
          { label: "Páginas Críticas", value: `${fCount}`, sub: "nota F — ação imediata", color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" },
          { label: "Problemas", value: `${totalIssues}`, sub: "em design, copy e CRO", color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)" },
          { label: "Investimento em Risco", value: "$14K", sub: "SoftWave — 0 leads rastreados", color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" },
        ].map(({ label, value, sub, color, bg, border }, i) => (
          <div
            key={i}
            className="rounded-2xl px-5 py-4 fade-up"
            style={{ background: bg, border: `1px solid ${border}`, animationDelay: `${i * 0.07}s` }}
          >
            <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>{label}</p>
            <p className="text-3xl font-black mt-1 tracking-tight" style={{ color }}>{value}</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Score bar */}
      <div
        className="rounded-2xl border p-5 mb-8 fade-up"
        style={{ background: "var(--card-bg)", borderColor: "var(--card-border)", animationDelay: "0.2s" }}
      >
        <p className="text-xs font-semibold mb-4" style={{ color: "var(--muted)" }}>
          RANKING POR SCORE
        </p>
        <div className="space-y-3">
          {[...LP_DATA].sort((a, b) => b.score - a.score).map((lp) => (
            <div
              key={lp.slug}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setSelected(lp)}
            >
              <span
                className="w-32 text-xs font-medium truncate transition-colors group-hover:text-white"
                style={{ color: "var(--muted)" }}
              >
                {lp.label}
              </span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--card-border)" }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${lp.score}%`,
                    background: gradeColor(lp.grade),
                  }}
                />
              </div>
              <span className="w-10 text-right text-xs font-bold" style={{ color: gradeColor(lp.grade) }}>
                {lp.score}
              </span>
              <span className="w-4 text-xs font-bold" style={{ color: gradeColor(lp.grade) }}>
                {lp.grade}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-5">
        {(["ALL", "P0", "P1", "P2"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: filter === f ? "rgba(34,211,238,0.1)" : "transparent",
              color: filter === f ? "var(--accent)" : "var(--muted)",
              border: filter === f ? "1px solid rgba(34,211,238,0.3)" : "1px solid var(--card-border)",
            }}
          >
            {f === "ALL" ? "Todas (8)" : f === "P0" ? "P0 — Emergência" : f === "P1" ? "P1 — Alto Impacto" : "P2 — Melhoria"}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
        {filtered.map((lp) => (
          <LPCard key={lp.slug} lp={lp} onOpen={() => setSelected(lp)} />
        ))}
      </div>

      {/* Universal issues */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
            Problemas Universais
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Afetam todas as 8 páginas — precisam de solução sistêmica
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {UNIVERSAL_ISSUES.map((issue, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl px-5 py-4 border fade-up"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: `${issue.color}18`, color: issue.color }}
              >
                {issue.icon}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  {issue.title}
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
                  {issue.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && <Modal lp={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
