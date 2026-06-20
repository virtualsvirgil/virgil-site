import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Grading changelog — VIRGIL",
  description:
    "Every change to how VIRGIL grades, logged in the open with rationale and impact. A reference standard that changes silently cannot be trusted; this is the record.",
};

export default function ChangelogPage() {
  return (
    <div className="wrap">
      <SiteHeader />
      <article className="content">
        <div className="eyebrow">Grading changelog · Amended in public</div>
        <h1>Every change to how VIRGIL grades.</h1>
        <p className="lead">
          A grade is only trustworthy if the method behind it is stable and, when
          it does change, the change is visible. VIRGIL logs every revision to its
          rubric and its grading calculation here — what changed, why, and how many
          grades moved. Nothing is altered silently.
        </p>
        <p>
          Two kinds of entry appear below. A <b>version change</b> (v1.0, v1.1, …)
          is a change to the rubric itself — its signals, weights, or thresholds. A{" "}
          <b>correction</b> fixes how an existing signal is computed without changing
          the weights or thresholds. Both move grades, so both are recorded.
        </p>

        <h2>2026-06-20 · Creator history is read strictly as-of-launch</h2>
        <p>
          <b>Correction (within v1.1 — no change to weights, bands, or thresholds).</b>{" "}
          The all-time index of each wallet&apos;s prior launches had gone stale and
          was under-counting recent repeat launchers, so some serial deployers were
          being read as first-time founders. Two things were fixed: the index was
          made complete and self-maintaining, and the prior-launch count is now read{" "}
          <i>as of each launch</i> — only a wallet&apos;s launches that came{" "}
          <i>before</i> a given launch count toward it. A deployer&apos;s later
          launches never reach back and change a grade already issued, and the count
          no longer shifts over time, so it reproduces exactly.{" "}
          <b>Impact:</b> 136 grades corrected — overwhelmingly mass-deployer spam
          that had been mislabeled, now reading its accurate F.
        </p>

        <h2>2026-06-13 · Rubric v1.1 — full deployer history</h2>
        <p>
          <b>Version change.</b> The serial-deployer signal moved from
          &ldquo;launches VIRGIL had observed since it began&rdquo; to the complete
          all-time index of every token a wallet has launched on the launchpad — the
          same scoring bands and points, on better data. (The 2026-06-20 correction
          above refines how this index is read.)
        </p>

        <h2>2026-06-12 · Rubric v1.0 — the initial instrument</h2>
        <p>
          <b>Version change.</b> The first public rubric: three weighted on-chain
          signals — launch configuration (40%), creator history (35%), and presence
          (25%) — combined into a 0–100 composite and a fixed letter grade.
          Deterministic and reproducible, with no model, sentiment, or discretion.
        </p>

        <p className="m-foot-note">
          For the full scoring method behind these versions, see the{" "}
          <a href="/methodology">methodology</a>.
        </p>
      </article>
      <SiteFooter />
    </div>
  );
}
