import { Suspense } from "react";
import Link from "next/link";
import ArchiveTable from "./ArchiveTable";

export const metadata = {
  title: "Archive — VIRGIL",
  description:
    "Every launch VIRGIL has graded on the Virtuals Unicorn launchpad. Filter by grade; search by ticker, name, or deployer wallet.",
};

export default function ArchivePage() {
  return (
    <div className="wrap">
      <div className="statusbar">
        <div className="grp"><span>VIRGIL · Autonomous launch auditor</span></div>
        <div className="grp"><span className="on"><span className="led"></span>Live · Base</span></div>
      </div>

      <header className="head">
        <Link href="/" className="brand" style={{ textDecoration: "none" }}>
          <div className="seal"><span className="v">V</span></div>
          <div className="brandname">VIRGIL<span className="sub">EVERY LAUNCH · MEASURED</span></div>
        </Link>
        <nav className="nav">
          <Link href="/">Readout</Link>
          <Link href="/#method">Method</Link>
          <Link href="/archive">Archive</Link>
          <Link href="/#agents">For Agents</Link>
        </nav>
      </header>

      <section className="arch">
        <div className="eyebrow">The register</div>
        <h2 className="arch-h">Every launch, <em>graded</em>.</h2>
        <p className="arch-intro">
          The complete record VIRGIL has measured on the Virtuals Unicorn
          launchpad. Filter by grade, or search by ticker, name, or the deployer
          wallet behind it.
        </p>
        <Suspense fallback={<div className="arch-loading mono">Loading register…</div>}>
          <ArchiveTable />
        </Suspense>
      </section>

      <footer className="foot">
        <span>VIRGIL · @VirgilWatch</span>
        <span className="disc">
          VIRGIL scores are opinions produced by a published deterministic rubric,
          not financial advice. VIRGIL currently holds no token; any token
          claiming to be VIRGIL is not ours.
        </span>
        <span>Rubric v1.1</span>
      </footer>
    </div>
  );
}
