"use client";

import { useEffect, useMemo, useState } from "react";

type AnyStats = Record<string, any>;

function fmtNumber(n: any, digits = 2) {
  const num = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(num)) return String(n);
  return num.toFixed(digits);
}

function PrettyRow({ label, value }: { label: string; value: any }) {
  const v =
    typeof value === "object" && value !== null
      ? JSON.stringify(value, null, 2)
      : String(value);

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm opacity-80">{label}</div>
      <div className="font-mono text-sm whitespace-pre-wrap break-words">{v}</div>
    </div>
  );
}

export default function StatsPage() {
  const [stats, setStats] = useState<AnyStats | null>(null);
  const [error, setError] = useState<string>("");

  const loadStats = async () => {
    setError("");
    try {
      const res = await fetch("/api/stats", { cache: "no-store" });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setStats(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load stats");
    }
  };

  useEffect(() => {
    loadStats();
    const id = setInterval(loadStats, 5000);
    return () => clearInterval(id);
  }, []);

  // --- Derived values from your API shape ---
  const hostname = stats?.os?.hostname ?? stats?.hostname ?? "";
  const platform = stats?.os?.platform ?? stats?.platform ?? "";
  const arch = stats?.os?.arch ?? stats?.arch ?? "";

  const cpuTemp = stats?.cpuTemp ?? null;

  const cpuUsageArr: number[] = Array.isArray(stats?.cpuUsage)
    ? stats.cpuUsage.map((x: any) => Number(x)).filter((x: number) => Number.isFinite(x))
    : [];

  const cpuAvg = useMemo(() => {
    if (!cpuUsageArr.length) return null;
    const sum = cpuUsageArr.reduce((a, b) => a + b, 0);
    return sum / cpuUsageArr.length;
  }, [cpuUsageArr]);

  const mem = stats?.memoryUsage ?? null;
  const memTotal = mem?.total ?? null;
  const memUsed = mem?.used ?? null;
  const memFree = mem?.free ?? null;

  const memPct = useMemo(() => {
    const t = Number(memTotal);
    const u = Number(memUsed);
    if (!Number.isFinite(t) || !Number.isFinite(u) || t <= 0) return null;
    return (u / t) * 100;
  }, [memTotal, memUsed]);

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">System Stats</h1>

      <div className="box p-4 flex items-center justify-between gap-4">
        <div className="text-sm opacity-90">Live stats update every 5 seconds.</div>
        <button type="button" onClick={loadStats} className="text-sm font-medium">
          Refresh
        </button>
      </div>

      {error ? (
        <div className="box p-4">
          <div className="font-semibold mb-2">Error</div>
          <div className="text-sm whitespace-pre-wrap">{error}</div>
        </div>
      ) : null}

      {!stats ? (
        <div className="box p-6">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overview */}
          <div className="box p-4 flex flex-col gap-4">
            <div className="font-semibold">Overview</div>
            <PrettyRow label="Hostname" value={hostname || "(unknown)"} />
            <PrettyRow label="Platform" value={platform || "(unknown)"} />
            <PrettyRow label="Arch" value={arch || "(unknown)"} />
          </div>

          {/* CPU */}
          <div className="box p-4 flex flex-col gap-4">
            <div className="font-semibold">CPU</div>

            {cpuAvg !== null ? (
              <PrettyRow
                label="Usage (avg)"
                value={`${fmtNumber(cpuAvg * 100, 1)}%`}
              />
            ) : (
              <PrettyRow label="Usage (avg)" value="(unknown)" />
            )}

            {cpuUsageArr.length ? (
              <PrettyRow
                label="Usage (per-core)"
                value={cpuUsageArr.map((v) => `${fmtNumber(v * 100, 1)}%`).join(", ")}
              />
            ) : (
              <PrettyRow label="Usage (per-core)" value="(unknown)" />
            )}

            <PrettyRow
              label="Temp"
              value={cpuTemp !== null ? `${fmtNumber(cpuTemp, 0)}°C` : "(unknown)"}
            />
          </div>

          {/* Memory */}
          <div className="box p-4 flex flex-col gap-4">
            <div className="font-semibold">Memory</div>

            <PrettyRow
              label="Total"
              value={memTotal !== null ? `${fmtNumber(memTotal, 2)} GB` : "(unknown)"}
            />
            <PrettyRow
              label="Used"
              value={
                memUsed !== null
                  ? `${fmtNumber(memUsed, 2)} GB${
                      memPct !== null ? ` (${fmtNumber(memPct, 0)}%)` : ""
                    }`
                  : "(unknown)"
              }
            />
            <PrettyRow
              label="Free"
              value={memFree !== null ? `${fmtNumber(memFree, 2)} GB` : "(unknown)"}
            />
          </div>

          {/* Raw */}
          <div className="box p-4 flex flex-col gap-4">
            <div className="font-semibold">Raw</div>
            <div className="font-mono text-sm whitespace-pre-wrap break-words">
              {JSON.stringify(stats, null, 2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
