import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type LineItem = { label: string; value: unknown; score: number; max: number };
type Reading = {
  id: number; name: string; symbol: string; grade: string; composite: number;
  lc: number; ch: number; pr: number; wallet: string; at: string; scored_at: string;
  status: string; sniper_tax: boolean; sixtyday_lock: boolean;
  capital_formation: boolean; launch_radar: boolean; verified: boolean;
  twitter: string | null;
  subscores: Record<string, Record<string, LineItem>>; narrative: string | null;
  retrospective?: boolean;
};

async function getReading(id: string): Promise<Reading | null> {
  try {
    const p = path.join(process.cwd(), "public", "data", "reading", `${id}.json`);
    return JSON.parse(await fs.readFile(p, "utf8"));
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const ids = new Set<string>();
  for (const file of ["scores.json", "lookback.json"]) {
    try {
      const p = path.join(process.cwd(), "public", "data", file);
      const d = JSON.parse(await fs.readFile(p, "utf8"));
      for (const l of d.launches as { id: number }[]) ids.add(String(l.id));
    } catch {
      /* file may not exist (e.g. lookback not yet generated) */
    }
  }
  return [...ids].map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = await getReading(id);
  if (!r) return { title: "Reading not found — VIRGIL" };
  const t = `${r.name} ($${r.symbol}) — Grade ${r.grade} · VIRGIL`;
  const d = `VIRGIL graded ${r.name} (${r.symbol}) ${r.grade} at ${r.composite}/100 — configuration ${r.lc}, creator ${r.ch}, presence ${r.pr}. A deterministic launch-integrity reading.`;
  return { title: t, description: d, openGraph: { title: t, description: d, type: "article" } };
}

const CATS = [
  { key: "launch_config", title: "Launch configuration", weight: "40%", k: "lc" },
  { key: "creator_history", title: "Creator history", weight: "35%", k: "ch" },
  { key: "presence", title: "Presence", weight: "25%", k: "pr" },
] as const;

function val(v: unknown) {
  if (typeof v === "boolean") return v ? "yes" : "no";
  if (v === null || v === "" || v === undefined) return "—";
  return String(v);
}
function fmt(iso: string) {
  try { return new Date(iso).toISOString().slice(0, 16).replace("T", " ") + " UTC"; }
  catch { return iso; }
}

export default async function ReadingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = await getReading(id);
  if (!r) notFound();

  return (
    <div className="wrap">
      <SiteHeader />

      <Link href={r.retrospective ? "/lookback" : "/archive"} className="rp-back mono">
        ← Back to the {r.retrospective ? "lookback" : "register"}
      </Link>

      <section className="rp">
        {/* reading header */}
        <div className="rp-card">
          <div className="rp-top">
            <div>
              <div className="rp-id mono">Reading № {r.id} · {r.status}</div>
              <h1 className="rp-name">{r.name}</h1>
              <div className="rp-tkr mono">${r.symbol}</div>
            </div>
            <div className="rp-grade">
              <div className={`rp-lg g${r.grade}`}>{r.grade}</div>
              <div className="rp-sc mono">{r.composite.toFixed(1)} / 100</div>
            </div>
          </div>
          <div className="rp-flags mono">
            <span data-on={r.sniper_tax}>Sniper tax</span>
            <span data-on={r.sixtyday_lock}>60-day lock</span>
            <span data-on={r.capital_formation}>Capital formation</span>
            <span data-on={r.verified}>Verified</span>
          </div>
        </div>

        {r.retrospective && (
          <div
            className="mono"
            style={{
              margin: "14px 0 0", padding: "12px 16px", border: "1px solid var(--grid-line)",
              borderRadius: "8px", color: "var(--signal-faint)", fontSize: "12.5px", lineHeight: 1.6,
            }}
          >
            Retrospective reading — this launch predates VIRGIL&apos;s live coverage.
            Graded after the fact by the same rubric, as-of-launch; it was not issued
            in real time. See the <a href="/changelog">changelog</a> and{" "}
            <a href="/lookback">lookback</a>.
          </div>
        )}

        {/* breakdown */}
        <div className="rp-breakdown">
          {CATS.map((c) => {
            const items = r.subscores?.[c.key] ?? {};
            const catScore = (r as unknown as Record<string, number>)[c.k];
            return (
              <div className="rp-cat" key={c.key}>
                <div className="rp-cat-head">
                  <div><span className="rp-cat-title">{c.title}</span><span className="rp-cat-w mono"> · {c.weight}</span></div>
                  <div className="rp-cat-score mono">{catScore}<span>/100</span></div>
                </div>
                <div className="rp-items">
                  {Object.values(items).map((it, i) => (
                    <div className="rp-item" key={i}>
                      <span className="rp-item-lbl">{it.label}</span>
                      <span className="rp-item-val mono">{val(it.value)}</span>
                      <div className="rp-item-meter"><span style={{ width: `${it.max ? (it.score / it.max) * 100 : 0}%` }} /></div>
                      <span className="rp-item-n mono">{it.score}/{it.max}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {r.narrative && (
          <div className="rp-narrative">
            <div className="eyebrow">VIRGIL&apos;s reading</div>
            <p>{r.narrative}</p>
          </div>
        )}

        {/* metadata */}
        <div className="rp-meta">
          <div className="rp-meta-row"><span className="rp-meta-k mono">Deployer</span><span className="rp-meta-v mono">{r.wallet}</span></div>
          <div className="rp-meta-row"><span className="rp-meta-k mono">Launched</span><span className="rp-meta-v mono">{fmt(r.at)}</span></div>
          <div className="rp-meta-row"><span className="rp-meta-k mono">Graded</span><span className="rp-meta-v mono">{fmt(r.scored_at)}</span></div>
          {r.twitter && <div className="rp-meta-row"><span className="rp-meta-k mono">Declared X</span><span className="rp-meta-v mono">@{r.twitter}</span></div>}
          <div className="rp-meta-links">
            <a className="cta" href={`/archive?q=${r.wallet}`}>Other launches by this wallet →</a>
            <a className="cta" href={`https://app.virtuals.io/virtuals/${r.id}`} target="_blank" rel="noopener noreferrer">View on Virtuals →</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
