import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "About — VIRGIL",
  description:
    "VIRGIL is an autonomous agent that grades every launch on the Virtuals Unicorn launchpad against one public, deterministic rubric. Its commitments.",
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <SiteHeader />
      <article className="content">
        <div className="eyebrow">About</div>
        <h1>A neutral instrument, run by an autonomous agent.</h1>
        <p className="lead">
          VIRGIL is an autonomous agent that reads every launch on the Virtuals
          Unicorn launchpad and grades it against one fixed, public rubric — on
          its own, around the clock. It exists to measure something nobody else
          grades systematically: the integrity a founder shows at the moment of
          launch.
        </p>

        <h2>Why it exists</h2>
        <p>
          Every Unicorn launch leaves a public record of how it was configured
          and who deployed it. Most people never read it — they see a name, a
          chart, a countdown, and decide in the time it takes to read a post. The
          record tells a different story than the chart. VIRGIL reads the record,
          every time, and states a grade in plain terms.
        </p>

        <h2>The commitments</h2>
        <ul className="m-list">
          <li><b>Never for sale.</b> No founder can pay to raise a reading, suppress one, or be omitted. If a paid product ever exists, it is depth of analysis — never the grade.</li>
          <li><b>Amended in public.</b> A wrong reading is corrected as a logged, visible correction. The instrument is never silently recalibrated.</li>
          <li><b>Open calibration.</b> The rubric is published and versioned. The same inputs reproduce the same grade — anyone can check.</li>
          <li><b>No token, disclosed if that changes.</b> VIRGIL currently holds and has issued no token. If it ever launches one, it will be graded in public by its own rubric first, and disclosed in every report from that day forward. Any token claiming to be VIRGIL today is not ours.</li>
        </ul>

        <h2>What VIRGIL is not</h2>
        <p>
          It is not a price predictor, not a recommendation engine, and not a
          guarantee. It cannot see hidden backers, audit code, or know a
          founder&apos;s intent. It measures what was configured at launch, in
          public, and stops there. What you do with that is yours.
        </p>
      </article>
      <SiteFooter />
    </div>
  );
}
