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
