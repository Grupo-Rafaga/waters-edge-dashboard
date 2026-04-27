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

// Dados extraídos por Playwright em scripts/deep-lp-audit.mjs (data/lp-raw.json).
// Critérios: apenas o que o script realmente mede — H1/H2, fontes carregadas,
// CTAs, contagem de imagens/vídeos, forms, countdown, urgência (keywords),
// padding das primeiras seções e keywords de trust.
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
      copy: [
        'H1 "Calling All, St. Petersburg Residents!" — idêntico ao H1 da página Weight Loss',
        "11 H2s espalhados pela página — narrativa fragmentada sem hierarquia",
        "Nenhuma keyword de urgência detectada (limited / today / expires / hurry / spots) apesar de oferta limitada",
      ],
      cro: [
        "0 formulários nativos detectados — todos os CTAs dependem de popup externo (provável quebra de pixel Meta)",
        "0 countdown / timer no DOM apesar da oferta $49",
        "$14.000 investidos em ads com 0 leads rastreados — ausência de form é a hipótese mais provável",
      ],
      visual: [
        "Estética datada: palavras sublinhadas dentro do H2 (joint pain, neuropathy) — sublinhado em texto não-link comunica web 2005",
        "Lista de condições com bullets de estrelinha amarela sobre fundo branco — pattern de blog antigo",
        "Voucher $49 dentro de bloco azul marinho chapado, sem corner radius — parece banner anúncio dos anos 2000",
        'Seta preta desenhada apontando para baixo entre seções — elemento de design datado',
        "9 famílias tipográficas carregadas, incluindo Gloria Hallelujah (manuscrita) misturada com Times New Roman, Outfit, Lato, Raleway",
        "Apenas 5 imagens, 0 vídeos",
      ],
      trust: [
        "Nenhuma keyword de credibilidade detectada (guarantee / certified / licensed / board-certified / google / reviews / dr.)",
        'Apenas "after" aparece — sem par "before"',
        "Sem nome/credencial do especialista no DOM",
      ],
    },
    wins: [
      'CTA principal "CLAIM YOUR $49 VOUCHER" é descritivo',
      "Preço âncora $250 → $49 explícito no body",
    ],
    quickFixes: [
      "Embutir form nativo — provável causa raiz dos $14K / 0 leads (popup quebra pixel Meta)",
      "Remover sublinhados em palavras não-link e a seta preta decorativa",
      "Trocar bullets-estrela por checkmarks consistentes",
      "Reescrever H1 com benefício específico (substituir template 'Calling All...')",
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
      copy: [
        'H2 "What if your joints could heal" / "instead of just masking pain?" duplicado no DOM (provável quebra forçada em 2 linhas como elementos separados)',
        'H1 real "Find Lasting Relief for Joint Pain at Waters Edge Medical Clinic" — descritivo, sem promessa de resultado',
        "Nenhuma keyword de urgência detectada (limited / today / expires / hurry / spots)",
      ],
      cro: [
        "0 formulários nativos detectados",
        "0 countdown / timer no DOM",
        "Nenhuma palavra de urgência (limited / today / hurry / spots) na cópia",
      ],
      visual: [
        '2 boxes com borda pontilhada laranja-vermelha (estilo "limited offer" dos anos 90): "EMBRACE THE FREEDOM..." e "Experience immediate relief..."',
        "Badge dourado/marrom genérico tipo selo de confiança no hero — visual de stock, não credencial real",
        "Sublinhado em palavras dentro do H1/header (FREE consultation, joint pain) — comunica link mas não é link",
        "Lista 'Ready for a change?' com bullets de estrelinha amarela",
        "Paleta competindo: laranja agressivo + azul marinho + amarelo + branco sem hierarquia",
        "9 famílias tipográficas carregadas",
      ],
      trust: [
        "Badge dourado de 'trust' presente mas sem texto explicando do que é a garantia",
        "Nenhuma keyword de credibilidade detectada (guarantee / certified / licensed / google / reviews)",
        "Sem nome/credencial do médico responsável",
      ],
    },
    wins: [
      'H2 "What if your joints could heal instead of just masking pain?" — copy conceitualmente forte',
      "1 vídeo + 5 imagens",
      "9 seções — estrutura narrativa completa",
    ],
    quickFixes: [
      "Corrigir H2 duplicado/dividido — unificar em um único elemento",
      "Trocar boxes pontilhados por cards limpos com sombra suave",
      "Substituir badge dourado genérico por credencial verificável (CRM, FDA, Google reviews real)",
      "Embutir form nativo + countdown",
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
      copy: [
        'H1 "Restore & Refresh Your Skin!" — não menciona "Vampire Facial" nem benefício específico',
        'CTA "GET OFFER Buy 1 Take 1" — promo não explicada (o que é "Take 1"?)',
        'Typo no CTA: "Free Consultation and Evaulation" (falta L em "Evaluation")',
        'H2 "Follow us" duplicado no DOM',
      ],
      cro: [
        "0 formulários nativos detectados",
        "0 countdown / timer no DOM",
        "Nenhuma keyword de urgência detectada (limited / today / hurry / spots)",
      ],
      visual: [
        "Hero azul marinho chapado, conteúdo encostado às bordas — sem corner radius, sem hierarquia",
        'Logo "Waters Edge" em fonte cursiva isolada no topo, desconectado do restante da tipografia',
        '"Double the glow for $399!" como texto chapado, sem tratamento de oferta (preço-valor, badge, destaque)',
        "Form box com styling mínimo, sem destaque visual em relação ao fundo",
        "7 famílias tipográficas carregadas",
        "Apenas 2 imagens, 0 vídeos — crítico para tratamento estético",
      ],
      trust: [
        "Nenhuma keyword de credibilidade detectada (guarantee / certified / licensed / google / reviews)",
        "Sem mídia comparativa antes/depois detectada",
      ],
    },
    wins: [
      '"Hollywood-favorite Vampire Facial" como âncora aspiracional no body',
      "7 seções — estrutura adequada",
    ],
    quickFixes: [
      'Corrigir typo "Evaulation" → "Evaluation"',
      'Reescrever CTA: "Reserve Vampire Facial $399" no lugar de "Buy 1 Take 1"',
      "Adicionar fotos antes/depois reais (mínimo 6)",
      "Reescrever H1 incluindo o nome do tratamento + benefício",
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
      copy: [
        'H1 "Unlock Ageless Beauty And Transform Your Skin Layer by Layer!" — superlativo sem prova',
        'CTA principal "SUBMIT" repetido em 2 botões — verbo de formulário, não benefício',
        'H2 duplicado no DOM: "Reduce Fine lines, wrinkles, ages spots, and sagging skin"',
      ],
      cro: [
        "0 formulários nativos detectados",
        "0 countdown / timer no DOM (apesar de urgência verbal 'limited' / 'spots')",
        'CTA principal "SUBMIT" — verbo de form, não promessa',
      ],
      visual: [
        '"30% OFF" sublinhado dentro do H1 — sublinhado em texto não-link confunde affordance',
        "Foto da paciente com marcações de procedimento dominando o hero — visual clínico, não aspiracional",
        "Bullets de estrelinha amarela na seção 'About Morpheus8'",
        "9 famílias tipográficas carregadas",
        "8 imagens, 0 vídeos",
      ],
      trust: [
        "Nenhuma keyword de credibilidade detectada (guarantee / certified / licensed / google / reviews)",
        'Apenas "before" e "after" mencionados — sem confirmação de fotos comparativas',
      ],
    },
    wins: [
      "Oferta combinada explícita: 30% OFF + FREE PRP",
      "Urgência verbal presente: 'limited' + 'spots'",
      "8 imagens — bom para tratamento estético",
      "9 seções (estrutura completa)",
    ],
    quickFixes: [
      'Trocar CTA "SUBMIT" por benefício ("Quero 30% OFF + PRP grátis")',
      "Corrigir H2 duplicado",
      "Adicionar countdown timer alinhado à urgência verbal",
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
      copy: [
        'TYPO crítico em CTAs repetidos: "FREE CONSULATION AND EVALUATION" (falta L) — em 2 botões',
        'H1 "Waters Edge Offers 15 Neuropathy Consultation and Evaluation - SoftWave Treatment for $49" — "15" provavelmente é "$15" digitado errado',
        'A palavra "CONSULATION" aparece também no body, não só no CTA',
      ],
      cro: [
        "0 formulários nativos detectados",
        "0 countdown / timer no DOM",
        "Urgência verbal presente: 'limited'",
      ],
      visual: [
        "Sublinhado em palavras dentro do H1 (Numbness, Prickling/Tingling, Burning Pain) — comunica link mas não é link",
        'Box "SOFTWAVE FOR NEUROPATHY" preto com bullets-estrela amarelos — visual de banner promocional pirata',
        "Box laranja 'GET 30% OFF' com borda pontilhada — pattern de cupom dos anos 2000",
        'Logo "Waters Edge" em fonte cursiva aparece isolado no meio do scroll, desconectado da tipografia da seção',
        "10 famílias tipográficas carregadas — o maior número entre as 8 páginas",
        "6 imagens + 1 vídeo",
      ],
      trust: [
        "Nenhuma keyword de credibilidade detectada (guarantee / certified / licensed / google / reviews)",
        "Sem nome/credencial do especialista em neuropatia",
      ],
    },
    wins: [
      "1 vídeo + 6 imagens — mix de mídia melhor que a média",
      'Oferta $49 explícita ("for $49")',
      "9 seções — estrutura completa",
    ],
    quickFixes: [
      'URGENTE: corrigir typo "CONSULATION" → "CONSULTATION" em todos os CTAs e no body',
      'Corrigir H1: "15 Neuropathy" → "$15 Neuropathy" (ou validar o valor real da oferta)',
      "Embutir form nativo",
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
      copy: [
        'H1 "Calling All, St. Petersburg Area Residents!" — idêntico ao H1 do SoftWave (zero diferenciação entre páginas)',
        'CTA "Go To Step #2" — sem contexto sobre o que é Step 2',
        "Apenas 3 CTAs na página inteira — menor exposição de conversão entre as 8 páginas",
      ],
      cro: [
        "0 formulários nativos detectados",
        "0 countdown / timer no DOM",
        "Urgência verbal presente: 'limited'",
      ],
      visual: [
        'Seta preta gigante desenhada apontando "Photo & Video Explanation Below" — elemento de design datado',
        '"$49!" sublinhado em vermelho dentro do bloco de oferta — sublinhado decorativo',
        "Lista 'when you Pay Now You Get MORE Benefits' com checkmarks verdes mas mistura caps aleatória ('when' minúsculo, 'MORE' maiúsculo)",
        "7 famílias tipográficas carregadas — incluindo Gloria Hallelujah (manuscrita)",
      ],
      trust: [
        "Nenhuma keyword de credibilidade detectada (guarantee / certified / licensed / google / reviews)",
        "Sem nome/credencial visível",
      ],
    },
    wins: [
      "9 imagens + 2 vídeos — melhor mix de mídia entre as 8 páginas",
      "Oferta $49 ancorada em $397",
      "Urgência verbal presente",
    ],
    quickFixes: [
      "Reescrever H1 com benefício específico (não copiar o template do SoftWave)",
      'Trocar "Go To Step #2" por CTA descritivo com benefício',
      "Remover seta decorativa e padronizar capitalização",
      "Embutir form nativo",
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
      copy: [
        'H1 "Buy 3 and Get 1 FREE PRP" — orientado à oferta, sem benefício emocional/funcional',
        "Sem promessa de resultado (ex: tempo até notar diferença, percentual de pacientes)",
      ],
      cro: [
        "0 formulários nativos detectados",
        "0 countdown / timer no DOM",
        "Urgência verbal presente: 'limited' + 'spots'",
      ],
      visual: [
        '"Buy 3 and Get 1 FREE PRP" em amarelo gigante chapado dominando o hero, sem hierarquia com o restante',
        "Sublinhado em palavras dentro do H1 (Thinning Hair, Bald Spots) — sublinhado decorativo",
        'Logo "Waters Edge" em fonte cursiva aparece isolado no meio do scroll',
        "Body em cinza-azulado sem hierarquia tipográfica — peso e tamanho de subheads inconsistentes",
        "9 famílias tipográficas carregadas",
      ],
      trust: [
        "Nenhuma keyword de credibilidade detectada (guarantee / certified / licensed / google / reviews)",
        'Apenas "before" e "after" mencionados — não confirma fotos comparativas',
      ],
    },
    wins: [
      "8 imagens + 1 vídeo — bom mix de mídia",
      "Urgência verbal presente",
      "9 seções (estrutura completa)",
    ],
    quickFixes: [
      'Reescrever H1 com benefício ("Cabelo mais cheio em 90 dias") em vez de oferta',
      "Tratar a oferta como elemento secundário (badge), não como H1 principal",
      "Embutir form nativo",
      "Adicionar resultado com número (ex: % de pacientes que relatam melhora)",
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
      copy: [
        'TYPO em CTA repetido: "Buy a Potenza and Get a Free Lase Facial" (falta R em "Laser") — em 2 botões',
        'H2 duplicado no DOM: "Rejuvenate Your Skin with Potenza RF Microneedling"',
      ],
      cro: [
        "0 formulários nativos detectados",
        "0 countdown / timer no DOM",
        "Urgência verbal presente: 'limited' + 'spots'",
      ],
      visual: [
        'Shapes circulares laranjas dentro de "What are the treatment areas for Potenza?" — formas redondas quentes brigando com fotos quadradas',
        'Box "Don\'t Miss Out — Spots Are Filling Fast!" com fundo laranja saturado e texto sublinhado dentro',
        '"REAL PEOPLE, REAL TESTIMONIALS" com REAL em destaque vermelho/laranja — formato banner spam',
        "9 famílias tipográficas carregadas",
        "Apenas 3 imagens, 0 vídeos — pouco para 10 seções",
      ],
      trust: [
        "Nenhuma keyword de credibilidade detectada (guarantee / certified / licensed / google / reviews)",
        'Apenas "before" e "after" mencionados',
      ],
    },
    wins: [
      'H1 forte: "Say Goodbye to Fine Lines, Wrinkles & Acne Scars — Instantly Glow with Potenza"',
      "10 seções — narrativa mais completa do grupo",
      "Urgência verbal presente",
    ],
    quickFixes: [
      'URGENTE: corrigir typo "Lase Facial" → "Laser Facial" em todos os CTAs',
      "Corrigir H2 duplicado",
      "Adicionar 6+ imagens do procedimento e resultados",
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

// Cada item é confirmado pelo lp-raw.json (medição direta via Playwright).
const UNIVERSAL_ISSUES = [
  {
    icon: "⌺",
    color: "#ef4444",
    title: "0 formulários nativos em 8 de 8 páginas",
    desc: "Nenhuma página tem <form> embutido — todos os CTAs dependem de popup externo do GHL. É a hipótese mais provável para o caso $14K em ads / 0 leads rastreados no SoftWave (popup quebra o pixel Meta).",
  },
  {
    icon: "⏱",
    color: "#eab308",
    title: "0 countdown / timer em 8 de 8 páginas",
    desc: "Nenhum elemento [class*=countdown|timer] foi encontrado, apesar de todas terem oferta com preço limitado ou 'limited spots'. Urgência verbal sem suporte visual.",
  },
  {
    icon: "✚",
    color: "#22d3ee",
    title: "Sinais de credibilidade médica ausentes em 8 de 8",
    desc: "Nenhuma das páginas contém as palavras 'guarantee', 'certified', 'licensed', 'board-certified', 'google', 'reviews', 'bbb' ou 'dr.' no DOM. Só 'before' e 'after' aparecem (texto, não foto comparativa confirmada).",
  },
  {
    icon: "Aa",
    color: "#a78bfa",
    title: "7 a 10 famílias tipográficas carregadas por página",
    desc: "Mistura de Times New Roman + Outfit + Lato + Montserrat + Roboto + Raleway + Inter — Neuropathy chega a 10. SoftWave e Weight Loss carregam Gloria Hallelujah (manuscrita). Sem sistema tipográfico definido.",
  },
  {
    icon: "_",
    color: "#f97316",
    title: "Sublinhado decorativo em palavras dentro de H1 e H2",
    desc: "Em SoftWave, JointPain, Neuropathy, HairRestoration, Morpheus8 e WeightLoss, palavras aleatórias dentro de headings aparecem sublinhadas em vermelho ou amarelo (joint pain, Thinning Hair, Bald Spots, 30% OFF, $49!). Sublinhado em texto não-link confunde affordance e tem cara de Word de 2003.",
  },
  {
    icon: "✦",
    color: "#facc15",
    title: "Bullets de estrelinha amarela e setas pretas desenhadas",
    desc: "Listas de benefícios em SoftWave, JointPain, Neuropathy, Morpheus8, WeightLoss e HairRestoration usam asterisco/estrela amarela como bullet sobre fundo branco. SoftWave e WeightLoss têm seta preta gigante apontando para baixo entre seções. Padrões visuais de blog e landing page dos anos 2000.",
  },
  {
    icon: "▭",
    color: "#fb923c",
    title: "Boxes com borda pontilhada laranja-vermelha em ofertas",
    desc: "Em JointPain (2 boxes), Neuropathy ('GET 30% OFF'), VampireFacial e SoftWave ('$49 voucher'), as caixas de oferta usam border-style dashed laranja ou vermelho. Estilo cupom-pirata-promocional, oposto da estética de clínica médica premium.",
  },
  {
    icon: "≡",
    color: "#fda4af",
    title: 'H1 idêntico entre SoftWave e Weight Loss',
    desc: '"Calling All, St. Petersburg [Area] Residents!" é o H1 das duas páginas — sem diferenciação por serviço. Indica reuso de template sem adaptação.',
  },
  {
    icon: "✗",
    color: "#f43f5e",
    title: "Typos críticos em CTAs principais (Neuropathy + Potenza)",
    desc: '"FREE CONSULATION" (sem o L) repetido em 2 CTAs do Neuropathy e "Lase Facial" (sem o R) repetido em 2 CTAs do Potenza. Erros aparecem no botão principal — alto custo em credibilidade.',
  },
  {
    icon: "⤬",
    color: "#fb923c",
    title: "H2s duplicados no DOM (Morpheus8, Joint Pain, Vampire Facial, Potenza)",
    desc: "Em 4 das 8 páginas o mesmo H2 aparece duas vezes no DOM. No Joint Pain, o H2 'What if your joints could heal / instead of just masking pain?' está dividido em 2 elementos separados. Indica template/builder mal configurado.",
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
          8 páginas extraídas com Playwright · critérios baseados em medição direta do DOM (H1/H2, fontes, CTAs, forms, urgência, padding, trust keywords)
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
