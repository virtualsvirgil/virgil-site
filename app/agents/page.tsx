import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "For Agents & Developers — VIRGIL",
  description:
    "VIRGIL is machine-readable and verifiable. Open JSON endpoints for the platform readout, every grade, and per-launch detail. Verify the method once, rely on the stream.",
};

export default function AgentsPage() {
  return (
    <div className="wrap">
      <SiteHeader />
      <article className="content">
        <div className="eyebrow">For agents &amp; developers</div>
        <h1>Built to be read by machines.</h1>
        <p className="lead">
          VIRGIL&apos;s grade is deterministic and public, which means an agent
          does not have to trust it on faith — it can verify the method once and
          then rely on the stream. The grade is a calibrated, checkable reference
          a counterparty can accept precisely because neither side produced it.
        </p>

        <h2>What the grade means — and doesn&apos;t</h2>
        <p>
          A grade is a launch-time integrity reading on a 0–100 composite of three
          weighted signals (configuration 40%, creator history 35%, presence
          25%), mapped to A–F. It is <b>not</b> a price prediction, a buy signal,
          or a guarantee. Weight it as a risk-and-integrity input, nothing more.
          The full rubric is at <a href="/methodology">/methodology</a>.
        </p>

        <h2>How to weight a grade over time</h2>
        <p>
          A grade is an <b>as-of-launch</b> reading: launch configuration and the
          deployer&apos;s track record are measured at the moment the token went live,
          and a deployer&apos;s <i>later</i> launches never retroactively change it — so
          the value is stable and reproducible. It is a <b>current</b> reading, not a
          sealed one: when the rubric or a calculation is revised, the change is logged
          in the <a href="/changelog">changelog</a> with its impact, so you can pin
          behaviour to a known revision. Presence can update if a project completes its
          launch metadata; configuration and creator history do not move.
        </p>

        <h2>What each grade carries</h2>
        <ul className="m-list">
          <li><b>grade · composite</b> — the A–F letter and its 0–100 score.</li>
          <li><b>config · creator · presence</b> — the three subscores (each 0–100) behind the composite, so you can threshold on a component, not just the letter.</li>
          <li><b>wallet · launched_at · scored_at</b> — the deployer address, when the token launched, and when it was graded.</li>
          <li><b>narrative</b> — a plain-language, fact-derived summary of what drove the grade.</li>
        </ul>

        <h2>Open endpoints</h2>
        <p>All read-only JSON, refreshed on each deploy. No key required.</p>
        <div className="endpoints">
          <div className="ep"><code className="mono"><span className="m">GET</span> /data/summary.json</code><span>Platform readout — totals, grade distribution, concentration, the day&apos;s figures.</span></div>
          <div className="ep"><code className="mono"><span className="m">GET</span> /data/scores.json</code><span>Every graded launch, compact: grade, composite, the three subscores, deployer, date.</span></div>
          <div className="ep"><code className="mono"><span className="m">GET</span> /data/reading/&#123;id&#125;.json</code><span>One launch in full: the complete subscore breakdown, flags, and narrative.</span></div>
          <div className="ep"><code className="mono"><span className="m">GET</span> /llms.txt</code><span>A plain-language self-description for language models — meaning, limits, verification.</span></div>
        </div>

        <h2>Verify, don&apos;t trust</h2>
        <p>
          Because the rubric is published and the inputs are public, you can
          recompute any grade and confirm VIRGIL produced it honestly. Verify once
          that the arithmetic holds; then the ongoing readings are trustworthy by
          construction, not by reputation. That is the whole design — integrity
          you can check is integrity a machine can rely on.
        </p>
      </article>
      <SiteFooter />
    </div>
  );
}
