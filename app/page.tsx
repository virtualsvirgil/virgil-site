import Counter from "./Counter";
import summary from "@/data/summary.json";

type Specimen = {
  vid: number; name: string; symbol: string; grade: string; composite: number;
  config: number; creator: number; presence: number;
  sniper_tax: boolean; sixtyday_lock: boolean; launched_at: string;
};
type Recent = { symbol: string; grade: string; vid: number };

function fmtUTC(iso: string): string {
  try { return new Date(iso).toISOString().slice(0, 16).replace("T", " ") + " UTC"; }
  catch { return iso; }
}
function shortWallet(w: string): string {
  return w && w.length > 18 ? `${w.slice(0, 10)}…${w.slice(-7)}` : w;
}

const GRADES = ["A", "B", "C", "D", "F"] as const;

export default function Home() {
  const s = summary;
  const spec = s.specimen as Specimen | null;
  const recent = (s.recent as Recent[]) ?? [];
  const dist = s.grade_dist as Record<string, number>;
  const pct = (g: string) => (s.total ? (dist[g] / s.total) * 100 : 0);

  return (
    <div className="wrap">
      <div className="statusbar r d1">
        <div className="grp"><span>VIRGIL · Autonomous launch auditor</span></div>
        <div className="grp">
          <span>Rubric v{s.rubric_version}</span>
          <span className="on"><span className="led"></span>Live · Base</span>
        </div>
      </div>

      <header className="head">
        <div className="brand">
          <div className="seal"><span className="v">V</span></div>
          <div className="brandname">VIRGIL<span className="sub">EVERY LAUNCH · MEASURED</span></div>
        </div>
        <nav className="nav">
          <a href="#readout">Readout</a><a href="#method">Method</a>
          <a href="/archive">Archive</a><a href="#agents">For Agents</a>
        </nav>
      </header>

      {/* HERO — thesis + platform readout (scarcity + distribution spectrum) */}
      <section className="hero" id="readout">
        <div>
          <div className="eyebrow r d1">Autonomous launch auditor · Virtuals Protocol</div>
          <h1 className="r d2">A fixed instrument for<br />an <em>unfixed</em> market.</h1>
          <p className="lede r d3">
            VIRGIL is an autonomous agent that grades every launch on the
            Virtuals Unicorn launchpad — reading each one&apos;s on-chain
            configuration against a single calibrated, public rubric. It runs on
            its own, around the clock. No judgment calls, no black box: the same
            input always yields the same reading, and anyone can check the
            instrument.
          </p>
        </div>

        <div className="readout r d4">
          <div className="readout-label">
            <span>Platform readout</span><span>Live · Base</span>
          </div>
          <div className="readout-big">
            <span className="num"><Counter to={s.total} /></span>
            <span className="unit">launches measured</span>
          </div>

          <div className="spectrum">
            <div className="spectrum-bar">
              {GRADES.map((g) =>
                dist[g] > 0 ? (
                  <div key={g} className={`seg g${g}`} style={{ width: `${pct(g)}%` }} />
                ) : null
              )}
            </div>
            <div className="spectrum-legend">
              {GRADES.map((g) => (
                <a key={g} className={`leg g${g}`} href={`/archive?grade=${g}`}>
                  <div className="lg-g">{g}</div>
                  <div className="lg-n">{dist[g].toLocaleString("en-US")}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="readout-line">
            <a href="/archive?min=C"><b>{s.cleared_c}</b> cleared C+</a>
            <a href="/archive?grade=A"><b>{s.cleared_a}</b> cleared A</a>
            <span><b>{s.graded_24h}</b> in last 24h</span>
          </div>
        </div>
      </section>

      {/* LIVE TAPE — continuous measurement */}
      {recent.length > 0 && (
        <div className="tape">
          <div className="tape-label"><span className="led"></span>Latest readings</div>
          <div className="tape-viewport">
            <div className="tape-track">
              {[...recent, ...recent].map((r, i) => (
                <a className="tape-item" key={i} href={`/archive?q=${r.symbol}`}>
                  <span>${r.symbol}</span><span className={`tg g${r.grade}`}>{r.grade}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONCENTRATION */}
      <section className="section">
        <div className="concentration">
          <div>
            <div className="eyebrow">Concentration</div>
            <h2>One wallet. <em>Most</em><br />of the register.</h2>
            <p className="intro">
              Most launches are not projects — they are inventory. A single
              deployer mints tokens by the thousand, minutes apart, around the
              clock. VIRGIL grades each by what was configured on-chain, not by
              what it was named.
            </p>
          </div>
          <div>
            <div className="conc-stat">
              <Counter to={s.top_deployer_pct} dec={1} /><span className="pc">%</span>
            </div>
            <div className="conc-sub">
              of the entire graded register — {s.top_deployer_count.toLocaleString("en-US")} launches from one address
            </div>
            <div className="conc-bar"><span style={{ width: `${s.top_deployer_pct}%` }} /></div>
            <div className="conc-bar-foot">
              <span>one wallet · {s.top_deployer_pct}%</span>
              <span>everyone else · {(100 - s.top_deployer_pct).toFixed(1)}%</span>
            </div>
            <a className="conc-link" href={`/archive?q=${s.top_deployer_wallet}`}>
              <div className="conc-wallet">DEPLOYER · <b>{shortWallet(s.top_deployer_wallet)}</b> — view all →</div>
            </a>
          </div>
        </div>
      </section>

      {/* SPECIMEN READING */}
      {spec && (
        <section className="section" id="method">
          <div className="specimen">
            <div>
              <div className="eyebrow">A single reading</div>
              <h2>The grade, and the<br /><em>three channels</em> beneath it.</h2>
              <p>
                Every launch returns a reading: a composite score and the three
                measured signals — configuration, creator history, declared
                presence — each with the plain reason for its value.
              </p>
              <p>
                VIRGIL does not forecast price. A high reading means a founder
                enabled every honesty signal available — <em>not</em> that the
                token will rise. The instrument reports the state at launch.
                Nothing more.
              </p>
            </div>
            <div className="reading">
              <div className="reading-top">
                <div>
                  <div className="reading-id">Reading № {spec.vid} · {fmtUTC(spec.launched_at)}</div>
                  <div className="reading-proj">{spec.name}</div>
                  <div className="reading-tkr">${spec.symbol}</div>
                </div>
                <div className="reading-grade">
                  <div className="lg">{spec.grade}</div>
                  <div className="sc">{spec.composite.toFixed(1)} / 100</div>
                </div>
              </div>
              <div className="reading-channels">
                <div className="rc"><span className="lbl">Config</span><div className="meter"><span style={{ width: `${spec.config}%` }} /></div><span className="n">{spec.config}</span></div>
                <div className="rc"><span className="lbl">Creator</span><div className="meter"><span style={{ width: `${spec.creator}%` }} /></div><span className="n">{spec.creator}</span></div>
                <div className="rc"><span className="lbl">Presence</span><div className="meter"><span style={{ width: `${spec.presence}%` }} /></div><span className="n">{spec.presence}</span></div>
              </div>
              <div className="reading-foot">
                <span>{spec.sniper_tax ? "SNIPER TAX ON" : "NO SNIPER TAX"} · {spec.sixtyday_lock ? "60-DAY LOCK" : "NO 60-DAY LOCK"}</span>
                <span>OPINION · NOT ADVICE</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* THREE SIGNALS */}
      <section className="section">
        <div className="eyebrow">What the instrument measures</div>
        <h2>Three signals, <em>one reading</em>.</h2>
        <div className="signals-grid">
          <div className="sig"><div className="w">Launch config · 40%</div><h3>What was configured</h3><p>Sniper-tax decay, capital formation, and the 60-day founder commitment. On-chain choices that cost a serious founder nothing and a fleeting one everything.</p></div>
          <div className="sig"><div className="w">Creator history · 35%</div><h3>Who deployed it</h3><p>The wallet&apos;s age, transaction record, and prior launches. A fresh address on its four-hundredth token reads nothing like a real builder&apos;s.</p></div>
          <div className="sig"><div className="w">Presence · 25%</div><h3>Who stands behind it</h3><p>A verified account, a substantive description, real documentation. Anonymity isn&apos;t disqualifying — the absence of any claimed identity is.</p></div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="section">
        <div className="eyebrow">Instrument specification</div>
        <h2>The commitments, <em>held against it</em>.</h2>
        <div className="specs-grid">
          <div className="spec"><div className="sid">SPEC 01</div><h3>Never for sale</h3><p>No founder can pay to raise a reading, suppress one, or be omitted. The paid product is depth of analysis — never the grade.</p></div>
          <div className="spec"><div className="sid">SPEC 02</div><h3>Amended in public</h3><p>A wrong reading is corrected as a correction, logged and visible. The instrument is never silently recalibrated.</p></div>
          <div className="spec"><div className="sid">SPEC 03</div><h3>Open calibration</h3><p>The rubric is published and versioned. Apply the same weights to the same launch and the reading reproduces exactly.</p></div>
        </div>
      </section>

      {/* FOR AGENTS */}
      <section className="section" id="agents">
        <div className="agents">
          <div>
            <div className="eyebrow">For agents &amp; developers</div>
            <h2>Built to be <em>read by machines</em>, not just people.</h2>
            <p className="intro">
              Because the rubric is deterministic and public, an agent can verify
              the method once and rely on the stream. The grade is a calibrated,
              checkable reference — not a black box to be trusted on faith.
            </p>
            <a className="cta" href="#">Read the methodology →</a>
          </div>
          <div className="agents-card">
            <div><span className="k">deterministic</span> <span className="c">— same input, same grade, every time</span></div>
            <div><span className="k">verifiable</span> <span className="c">— recompute it yourself and check</span></div>
            <div><span className="k">neutral</span> <span className="c">— never for sale, no exceptions</span></div>
            <div><span className="k">open</span> <span className="c">— every grade public, machine-readable</span></div>
          </div>
        </div>
      </section>

      <footer className="foot">
        <span>VIRGIL · @VirgilWatch</span>
        <span className="disc">
          VIRGIL scores are opinions produced by a published deterministic rubric,
          not financial advice. VIRGIL currently holds no token; any token
          claiming to be VIRGIL is not ours.
        </span>
        <span>Rubric v{s.rubric_version}</span>
      </footer>
    </div>
  );
}
