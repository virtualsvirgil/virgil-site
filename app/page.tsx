import Counter from "./Counter";
import summary from "@/data/summary.json";

type Specimen = {
  vid: number;
  name: string;
  symbol: string;
  grade: string;
  composite: number;
  config: number;
  creator: number;
  presence: number;
  sniper_tax: boolean;
  sixtyday_lock: boolean;
  launched_at: string;
};

function fmtUTC(iso: string): string {
  try {
    return new Date(iso).toISOString().slice(0, 16).replace("T", " ") + " UTC";
  } catch {
    return iso;
  }
}

export default function Home() {
  const s = summary;
  const spec = s.specimen as Specimen | null;

  // Gauge geometry, data-driven from the failure rate.
  // Semicircle arc length ≈ π·76 ≈ 239 (matches CSS stroke-dasharray).
  const ARC = 239;
  const p = Math.max(0, Math.min(100, s.failure_pct));
  const off = +(ARC * (1 - p / 100)).toFixed(1);
  const angle = +(-90 + 1.8 * p).toFixed(1); // -90° at 0%, +90° at 100%

  return (
    <div className="wrap">
      <div className="statusbar r d1">
        <div className="grp">
          <span>VIRGIL · Launch Integrity Instrument</span>
        </div>
        <div className="grp">
          <span>Rubric v{s.rubric_version}</span>
          <span className="on">
            <span className="led"></span>Live · Base
          </span>
        </div>
      </div>

      <header className="head">
        <div className="brand">
          <div className="seal">
            <span className="v">V</span>
          </div>
          <div className="brandname">
            VIRGIL<span className="sub">EVERY LAUNCH · MEASURED</span>
          </div>
        </div>
        <nav className="nav">
          <a href="#">Readout</a>
          <a href="#">Method</a>
          <a href="#">Archive</a>
          <a href="#">For Agents</a>
        </nav>
      </header>

      <section className="hero">
        <div>
          <div className="eyebrow r d1">Continuous measurement</div>
          <h1 className="r d2">
            A fixed instrument for
            <br />
            an <em>unfixed</em> market.
          </h1>
          <p className="lede r d3">
            VIRGIL measures the on-chain configuration of every launch on the
            Virtuals Unicorn launchpad against one calibrated rubric. No judgment
            calls. No black box. The same input always yields the same reading —
            and anyone may check the instrument.
          </p>
        </div>
        <div className="gauge-card r d4">
          <div className="gauge-label">
            <span>Failure rate</span>
            <span>n = {s.total.toLocaleString("en-US")}</span>
          </div>
          <div className="gauge">
            <svg viewBox="0 0 200 140">
              <path className="arc-track" d="M 24 120 A 76 76 0 0 1 176 120" />
              <path
                className="arc-fill"
                d="M 24 120 A 76 76 0 0 1 176 120"
                style={{ ["--off" as string]: off }}
              />
              <line className="tick-major" x1="24" y1="120" x2="33" y2="116" />
              <line className="tick" x1="62" y1="60" x2="68" y2="64" strokeWidth="1" />
              <line className="tick-major" x1="100" y1="44" x2="100" y2="54" />
              <line className="tick" x1="138" y1="60" x2="132" y2="64" strokeWidth="1" />
              <line className="tick-major" x1="176" y1="120" x2="167" y2="116" />
              <line
                className="needle"
                x1="100"
                y1="120"
                x2="100"
                y2="56"
                style={{ ["--angle" as string]: `${angle}deg` }}
              />
              <circle className="needle-hub" cx="100" cy="120" r="5" />
            </svg>
            <div className="gauge-readout">
              <div className="big">
                <Counter to={s.failure_pct} dec={1} />
                <span className="pc">%</span>
              </div>
              <div className="pct">graded D or F</div>
            </div>
          </div>
          <div className="gauge-foot">
            <span>
              <b>{s.c_count}</b> reached C
            </span>
            <span>
              <b>{s.ab_count}</b> reached A or B
            </span>
          </div>
        </div>
      </section>

      <section className="channels">
        <div className="channel r d3">
          <div className="ch-id">
            <span>CH 01 · Volume</span>
            <span>cumulative</span>
          </div>
          <div className="ch-val">
            <Counter to={s.total} />
          </div>
          <div className="ch-desc">
            Launches read since the instrument came online — about{" "}
            <b>{s.per_day} per day</b>, without exception.
          </div>
        </div>
        <div className="channel r d4">
          <div className="ch-id">
            <span>CH 02 · Concentration</span>
            <span className="ch-spark">▲ flagged</span>
          </div>
          <div className="ch-val">
            <Counter to={s.top_deployer_pct} dec={1} />
            <span className="u">%</span>
          </div>
          <div className="ch-desc">
            Of the entire register traces to <b>one wallet</b> —{" "}
            {s.top_deployer_count.toLocaleString("en-US")} launches, minutes
            apart. Inventory, not projects.
          </div>
        </div>
        <div className="channel r d5">
          <div className="ch-id">
            <span>CH 03 · Commitment</span>
            <span>60-day lock</span>
          </div>
          <div className="ch-val">
            <Counter to={s.sixtyday_count} />
          </div>
          <div className="ch-desc">
            Founders who made the 60-day commitment an <b>A</b> requires. None
            cleared it. The bar is real.
          </div>
        </div>
      </section>

      {spec && (
        <section className="specimen">
          <div className="r d2">
            <div className="eyebrow">A single reading</div>
            <h2>
              The grade, and the
              <br />
              <em>three channels</em> beneath it.
            </h2>
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
          <div className="r d4">
            <div className="reading">
              <div className="reading-top">
                <div>
                  <div className="reading-id">
                    Reading № {spec.vid} · {fmtUTC(spec.launched_at)}
                  </div>
                  <div className="reading-proj">{spec.name}</div>
                  <div className="reading-tkr">${spec.symbol}</div>
                </div>
                <div className="reading-grade">
                  <div className="lg">{spec.grade}</div>
                  <div className="sc">{spec.composite.toFixed(1)} / 100</div>
                </div>
              </div>
              <div className="reading-channels">
                <div className="rc">
                  <span className="lbl">Config</span>
                  <div className="meter">
                    <span style={{ ["--w" as string]: `${spec.config}%` }}></span>
                  </div>
                  <span className="n">{spec.config}</span>
                </div>
                <div className="rc">
                  <span className="lbl">Creator</span>
                  <div className="meter">
                    <span style={{ ["--w" as string]: `${spec.creator}%` }}></span>
                  </div>
                  <span className="n">{spec.creator}</span>
                </div>
                <div className="rc">
                  <span className="lbl">Presence</span>
                  <div className="meter">
                    <span style={{ ["--w" as string]: `${spec.presence}%` }}></span>
                  </div>
                  <span className="n">{spec.presence}</span>
                </div>
              </div>
              <div className="reading-foot">
                <span>
                  {spec.sniper_tax ? "SNIPER TAX ON" : "NO SNIPER TAX"} ·{" "}
                  {spec.sixtyday_lock ? "60-DAY LOCK" : "NO 60-DAY LOCK"}
                </span>
                <span>OPINION · NOT ADVICE</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="specs">
        <div className="eyebrow">Instrument specification</div>
        <div className="specs-grid">
          <div className="spec r d2">
            <div className="sid">SPEC 01</div>
            <h3>Never for sale</h3>
            <p>
              No founder can pay to raise a reading, suppress one, or be omitted.
              The paid product is depth of analysis — never the grade.
            </p>
          </div>
          <div className="spec r d3">
            <div className="sid">SPEC 02</div>
            <h3>Amended in public</h3>
            <p>
              A wrong reading is corrected as a correction, logged and visible.
              The instrument is never silently recalibrated.
            </p>
          </div>
          <div className="spec r d4">
            <div className="sid">SPEC 03</div>
            <h3>Open calibration</h3>
            <p>
              The rubric is published and versioned. Apply the same weights to the
              same launch and the reading reproduces exactly.
            </p>
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
