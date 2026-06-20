import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Methodology — VIRGIL",
  description:
    "How VIRGIL grades: three weighted on-chain signals, fixed thresholds, fully deterministic and reproducible. Worked through a real launch.",
};

export default function MethodologyPage() {
  return (
    <div className="wrap">
      <SiteHeader />
      <article className="content">
        <div className="eyebrow">Methodology · Rubric v1.1</div>
        <h1>How the instrument reads.</h1>
        <p className="lead">
          VIRGIL converts a launch&apos;s public, on-chain configuration into a
          single grade using a fixed rubric. There is no model, no sentiment, no
          discretion. The same launch always yields the same reading — and you
          can recompute it yourself from the same public data.
        </p>

        <h2>Three weighted signals</h2>
        <p>
          Every launch is measured on three categories, each scored 0–100, then
          combined by weight into a composite:
        </p>
        <ul className="m-list">
          <li><b>Launch configuration — 40%.</b> The choices a founder makes on-chain: the anti-sniper tax, the 60-day founder commitment, the capital-formation module, launch radar, allocation. Choices that cost a serious founder little and a fleeting one everything.</li>
          <li><b>Creator history — 35%.</b> The deployer wallet&apos;s age, transaction record, and how many tokens it had launched <i>before this one</i>. A fresh wallet on its four-hundredth launch reads nothing like a real builder&apos;s.</li>
          <li><b>Presence — 25%.</b> Whether a real, claimed identity stands behind the launch: a linked account, a substantive description, documentation.</li>
        </ul>
        <p className="m-formula mono">
          composite = (config × 0.40) + (creator × 0.35) + (presence × 0.25)
        </p>

        <h2>A reading is dated</h2>
        <p>
          Two of these signals describe the launch as it stood at launch.
          Launch configuration is fixed on-chain the moment a token goes live.
          Creator history is read <b>as of that launch</b> — only the deployer&apos;s
          launches that <i>preceded</i> this one count toward it. A wallet&apos;s
          later launches never reach back and change a grade already issued; what
          a deployer does afterward is its own future record, not a revision of
          this one. This is also what keeps the count reproducible: a tally of
          what came before never shifts, so anyone recomputing it later gets the
          same number.
        </p>

        <h2>Fixed grade thresholds</h2>
        <div className="m-grades">
          <div className="mg"><span className="mg-g gA">A</span><span className="mono">≥ 85</span></div>
          <div className="mg"><span className="mg-g gB">B</span><span className="mono">70–84</span></div>
          <div className="mg"><span className="mg-g gC">C</span><span className="mono">55–69</span></div>
          <div className="mg"><span className="mg-g gD">D</span><span className="mono">40–54</span></div>
          <div className="mg"><span className="mg-g gF">F</span><span className="mono">&lt; 40</span></div>
        </div>
        <p>
          An <b>A</b> is deliberately hard: it requires, among other things, the
          60-day founder commitment — a founder locking their own allocation. The
          bar is not the rubric being harsh; it is the rubric refusing to be
          impressed by anything less than real commitment.
        </p>

        <h2>Worked example — reproduce it yourself</h2>
        <p>
          Take <b>OrbisAPI ($ORBIS)</b>, a real graded launch. Its three readings:
        </p>
        <div className="worked mono">
          <div className="wk-row"><span>Launch configuration</span><span>45 / 100</span></div>
          <div className="wk-sub">sniper tax on (+30) · capital formation (+15) · no 60-day lock (0) · no launch radar (0)</div>
          <div className="wk-row"><span>Creator history</span><span>75 / 100</span></div>
          <div className="wk-row"><span>Presence</span><span>90 / 100</span></div>
          <div className="wk-calc">
            (45 × 0.40) + (75 × 0.35) + (90 × 0.25)<br />
            = 18.0 + 26.25 + 22.5<br />
            = <b>66.8</b> → ≥ 55 and &lt; 70 → <b className="gC">grade C</b>
          </div>
        </div>
        <p>
          Nothing here is a judgment call. Apply the same weights to the same
          public inputs and the grade reproduces exactly — which is the entire
          point: a reading anyone can check is a reading both sides of a
          transaction can trust.
        </p>

        <h2>What a grade is not</h2>
        <p>
          A grade is not a price prediction and not advice. A high reading means a
          founder enabled the honesty signals available at launch — not that the
          token will rise. Most launches that grade well still fail. VIRGIL
          measures one thing: the integrity shown at the gate.
        </p>
      </article>
      <SiteFooter />
    </div>
  );
}
