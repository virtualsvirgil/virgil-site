"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Row = {
  id: number; name: string; symbol: string; grade: string; composite: number;
  lc: number; ch: number; pr: number; wallet: string; at: string;
  pre_token?: string | null;
};
const ORDER = ["A", "B", "C", "D", "F"];

function short(w: string) {
  return w && w.length > 14 ? `${w.slice(0, 6)}…${w.slice(-4)}` : w;
}

export default function ArchiveTable(
  { src = "/data/scores.json", linkReadings = true }:
  { src?: string; linkReadings?: boolean }
) {
  const params = useSearchParams();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [q, setQ] = useState("");
  const [grades, setGrades] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<"date" | "score">("date");
  const [limit, setLimit] = useState(100);

  // Initialize filters from URL (hero deep-links: ?grade=C, ?min=C, ?q=0x…)
  useEffect(() => {
    const g = params.get("grade");
    const min = params.get("min");
    const qq = params.get("q");
    if (qq) setQ(qq);
    if (g) setGrades(new Set([g.toUpperCase()]));
    else if (min) {
      const i = ORDER.indexOf(min.toUpperCase());
      if (i >= 0) setGrades(new Set(ORDER.slice(0, i + 1)));
    }
  }, [params]);

  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then((d) => setRows(d.launches as Row[]))
      .catch(() => setRows([]));
  }, [src]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const needle = q.trim().toLowerCase();
    let out = rows.filter((r) => {
      if (grades.size && !grades.has(r.grade)) return false;
      if (needle) {
        const hay = `${r.symbol} ${r.name} ${r.wallet} ${r.pre_token ?? ""}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    if (sort === "score") out = [...out].sort((a, b) => b.composite - a.composite);
    return out;
  }, [rows, q, grades, sort]);

  useEffect(() => setLimit(100), [q, grades, sort]);

  const toggle = (g: string) =>
    setGrades((prev) => {
      const n = new Set(prev);
      n.has(g) ? n.delete(g) : n.add(g);
      return n;
    });

  if (!rows) return <div className="arch-loading mono">Loading register…</div>;

  const shown = filtered.slice(0, limit);

  return (
    <>
      <div className="arch-bar">
        <input
          className="arch-search mono"
          placeholder="Search ticker, name, deployer, or contract…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="arch-chips">
          {ORDER.map((g) => (
            <button
              key={g}
              className="chip"
              data-on={grades.has(g)}
              onClick={() => toggle(g)}
            >
              {g}
            </button>
          ))}
          {(grades.size > 0 || q) && (
            <button className="chip" onClick={() => { setGrades(new Set()); setQ(""); }}>
              clear
            </button>
          )}
        </div>
      </div>

      <div className="arch-meta">
        {filtered.length.toLocaleString("en-US")} launches
        {grades.size || q ? " (filtered)" : ""} ·{" "}
        <button className="arch-sort" onClick={() => setSort(sort === "date" ? "score" : "date")}>
          sort: {sort === "date" ? "newest" : "composite"}
        </button>
      </div>

      <div className="arch-scroll">
        <table className="arch-table">
          <thead>
            <tr>
              <th>Grade</th><th>Ticker</th><th>Launch</th>
              <th>Score</th><th>Cfg</th><th>Cr</th><th>Pr</th>
              <th>Deployer</th><th>Contract</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id}>
                <td><span className={`arch-g g${r.grade}`}>{r.grade}</span></td>
                <td>{linkReadings
                  ? <a className="arch-tkr" href={`/reading/${r.id}`}>${r.symbol}</a>
                  : <span className="arch-tkr">${r.symbol}</span>}</td>
                <td className="arch-name">{r.name}</td>
                <td>{r.composite.toFixed(1)}</td>
                <td>{r.lc}</td><td>{r.ch}</td><td>{r.pr}</td>
                <td title={r.wallet}>{short(r.wallet)}</td>
                <td>{r.pre_token
                  ? <a className="arch-tkr" href={`https://basescan.org/token/${r.pre_token}`}
                       target="_blank" rel="noopener noreferrer" title={r.pre_token}>{short(r.pre_token)}</a>
                  : <span title="pre-coverage — contract not preserved for retrospective entries">—</span>}</td>
                <td>{r.at.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length > limit && (
        <button className="arch-more mono" onClick={() => setLimit(limit + 200)}>
          Load more — {(filtered.length - limit).toLocaleString("en-US")} remaining
        </button>
      )}
    </>
  );
}
