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

        <h2>The full weights table</h2>
        <p>
          Every point is published — this is the entire instrument. Each category
          scores 0–100 from the sub-signals below, then enters the composite at its
          weight. Nothing is withheld, so any grade can be recomputed from public data.
        </p>
        <table className="arch-table">
          <thead>
            <tr><th>Signal</th><th>Points</th></tr>
          </thead>
          <tbody>
            <tr><td><b>Launch configuration — 40% of composite</b></td><td></td></tr>
            <tr><td>60-day founder commitment</td><td>40</td></tr>
            <tr><td>Sniper-tax enabled</td><td>30</td></tr>
            <tr><td>Capital Formation module</td><td>15</td></tr>
            <tr><td>Launch Radar module</td><td>10</td></tr>
            <tr><td>Airdrop allocation</td><td>5</td></tr>
            <tr><td><b>Creator history — 35% of composite</b></td><td></td></tr>
            <tr><td>First-time deployer (1 all-time launch)</td><td>50</td></tr>
            <tr><td>2–5 all-time launches</td><td>35</td></tr>
            <tr><td>6–20 all-time launches</td><td>15</td></tr>
            <tr><td>21+ all-time launches</td><td>0</td></tr>
            <tr><td>Wallet age ≥ 1 year</td><td>30</td></tr>
            <tr><td>Wallet age 90 days – 1 year</td><td>20</td></tr>
            <tr><td>Wallet age 30 – 89 days</td><td>10</td></tr>
            <tr><td>Wallet age &lt; 30 days</td><td>0</td></tr>
            <tr><td>Tx count ≥ 500</td><td>20</td></tr>
            <tr><td>Tx count 100 – 499</td><td>15</td></tr>
            <tr><td>Tx count 20 – 99</td><td>10</td></tr>
            <tr><td>Tx count 5 – 19</td><td>5</td></tr>
            <tr><td>Tx count &lt; 5</td><td>0</td></tr>
            <tr><td><b>Presence — 25% of composite</b></td><td></td></tr>
            <tr><td>Verified Twitter / X linked</td><td>40</td></tr>
            <tr><td>Substantive description (&gt; 20 chars)</td><td>30</td></tr>
            <tr><td>Project documentation present</td><td>20</td></tr>
            <tr><td>Virtuals verified badge</td><td>10</td></tr>
          </tbody>
        </table>
        <p>
          <b>An A requires the 60-day founder commitment.</b> At 40 points of launch
          configuration, no launch can reach the ≥ 85 composite for an A without it —
          the bar is structural, not a matter of taste.
        </p>

        <h2>A reading is dated</h2>
        <p>
          Two of these signals describe the launch as it stood at launch.
          Launch configuration is fixed on-chain the moment a token goes live.
          Creator history is read <b>as of that launch</b> — only the deployer&apos;s
          launches that preceded this one count toward it. A wallet&apos;s
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
        <ul className="m-list">
          <li>Hidden backer or insider-wallet relationships — VIRGIL sees on-chain config only.</li>
          <li>Code quality or contract-audit status.</li>
          <li>Team identity or real-world credentials.</li>
          <li>Price performance or graduation likelihood — no prediction of any kind.</li>
          <li>Community size or engagement quality.</li>
          <li>Product viability — VIRGIL does not evaluate what the project builds.</li>
        </ul>

        <h2>Missing-data policy</h2>
        <p>
          Any signal VIRGIL cannot verify scores 0 for that signal.{" "}
          <b>Unknown is not average.</b> A wallet with no on-chain history scores 0
          on wallet-age and tx-count — not an assumed median — so a launch is never
          flattered by the absence of evidence.
        </p>

        <h2>On-chain data sources</h2>
        <p>Every input is read from public data, at no cost — so anyone can reproduce it.</p>
        <table className="arch-table">
          <thead>
            <tr><th>Data</th><th>Method</th><th>Cost</th></tr>
          </thead>
          <tbody>
            <tr><td>Wallet age</td><td>Binary-search on nonce history via public Base RPC</td><td>Free</td></tr>
            <tr><td>Tx count</td><td>eth_getTransactionCount</td><td>Free</td></tr>
            <tr><td>Prior launches</td><td>Full Virtuals Protocol launch index, counted as-of-launch</td><td>Free</td></tr>
            <tr><td>Config &amp; presence</td><td>Virtuals Protocol API (launch configuration, socials, docs)</td><td>Free</td></tr>
          </tbody>
        </table>

        <h2>When the method changes</h2>
        <p>
          The rubric is meant to be stable, but when it is revised — or when a
          calculation is corrected — the change is logged openly, with its
          rationale and the number of grades it moved. The full record lives in
          the <a href="/changelog">grading changelog</a>.
        </p>
      </article>
      <SiteFooter />
    </div>
  );
}
