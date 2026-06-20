import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ArchiveTable from "./ArchiveTable";

export const metadata = {
  title: "Archive — VIRGIL",
  description:
    "Every launch VIRGIL has graded on the Virtuals Unicorn launchpad. Filter by grade; search by ticker, name, or deployer wallet.",
};

export default function ArchivePage() {
  return (
    <div className="wrap">
      <SiteHeader />
      <section className="arch">
        <div className="eyebrow">The register</div>
        <h2 className="arch-h">Every launch, <em>graded</em>.</h2>
        <p className="arch-intro">
          The complete record VIRGIL has measured on the Virtuals Unicorn
          launchpad <b>since it began live coverage</b>. Filter by grade, or search
          by ticker, name, or the deployer wallet behind it. For the launches that
          came before — graded retrospectively — see the{" "}
          <a href="/lookback">lookback</a>.
        </p>
        <Suspense fallback={<div className="arch-loading mono">Loading register…</div>}>
          <ArchiveTable />
        </Suspense>
      </section>
      <SiteFooter />
    </div>
  );
}
