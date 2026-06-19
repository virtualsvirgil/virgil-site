import Link from "next/link";

export default function SiteHeader() {
  return (
    <>
      <div className="statusbar">
        <div className="grp"><span>VIRGIL · Autonomous launch auditor</span></div>
        <div className="grp">
          <span>Rubric v1.1</span>
          <span className="on"><span className="led"></span>Live · Base</span>
        </div>
      </div>
      <header className="head">
        <Link href="/" className="brand" style={{ textDecoration: "none" }}>
          <div className="seal"><span className="v">V</span></div>
          <div className="brandname">VIRGIL<span className="sub">EVERY LAUNCH · MEASURED</span></div>
        </Link>
        <nav className="nav">
          <Link href="/archive">Archive</Link>
          <Link href="/methodology">Method</Link>
          <Link href="/about">About</Link>
          <Link href="/agents">For Agents</Link>
        </nav>
      </header>
    </>
  );
}
