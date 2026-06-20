import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ArchiveTable from "../archive/ArchiveTable";

export const metadata = {
  title: "Lookback — VIRGIL",
  description:
    "Launches from before VIRGIL began live coverage, graded retrospectively by the same rubric, as-of-launch. The fuller landscape — search by ticker, name, or deployer wallet.",
};

export default function LookbackPage() {
  return (
    <div className="wrap">
      <SiteHeader />
      <section className="arch">
        <div className="eyebrow">The lookback · retrospective</div>
        <h2 className="arch-h">Before VIRGIL was <em>watching</em>.</h2>
        <p className="arch-intro">
          Every launch on the Unicorn launchpad from <b>before VIRGIL began live
          coverage</b> (through 2026-06-10), graded retrospectively by the same
          deterministic rubric, computed <b>as-of-launch</b>. These readings were
          <i> not</i> issued in real time — that is the one difference from the{" "}
          <a href="/archive">live register</a>. Everything else — the weights, the
          thresholds, the arithmetic — is identical, and the{" "}
          <a href="/methodology">method</a> is published. Filter by grade, or search
          by ticker, name, or deployer wallet.
        </p>
        <Suspense fallback={<div className="arch-loading mono">Loading lookback…</div>}>
          <ArchiveTable src="/data/lookback.json" linkReadings={false} />
        </Suspense>
      </section>
      <SiteFooter />
    </div>
  );
}
