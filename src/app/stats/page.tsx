'use client';

import { useEffect, useState } from 'react';

type SystemInfo = {
  os: {
    hostname: string;
    platform: string;
    arch: string;
  };
  cpuTemp: number;
  cpuUsage: number[];
  memoryUsage: {
    used: number;
    total: number;
  };
};

export default function StatsPage() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setSystemInfo(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 3000); // refresh every 3 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-lg font-medium">Loading stats...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Live Time System Stats!</h1>

      <div className="grid gap-6 w-full max-w-2xl">
        {/* OS Info */}
        <div className="bg-card shadow-md rounded-xl p-5 border border-border">
          <h2 className="text-xl font-semibold mb-2">OS Info</h2>
          <p><strong>Hostname:</strong> {systemInfo?.os.hostname}</p>
          <p><strong>Platform:</strong> {systemInfo?.os.platform}</p>
          <p><strong>Architecture:</strong> {systemInfo?.os.arch}</p>
        </div>

        {/* CPU Temp */}
        <div className="bg-card shadow-md rounded-xl p-5 border border-border">
          <h2 className="text-xl font-semibold mb-2">CPU Temperature</h2>
          <p>{systemInfo?.cpuTemp.toFixed(1)}°C</p>
        </div>

        {/* CPU Usage */}
        <div className="bg-card shadow-md rounded-xl p-5 border border-border">
          <h2 className="text-xl font-semibold mb-2">CPU Usage per Core</h2>
          <ul className="list-disc ml-6">
            {systemInfo?.cpuUsage.map((usage, i) => (
              <li key={i}>Core {i}: {usage}%</li>
            ))}
          </ul>
        </div>

        {/* Memory */}
        <div className="bg-card shadow-md rounded-xl p-5 border border-border">
          <h2 className="text-xl font-semibold mb-2">RAM Usage</h2>
          <p>
            {systemInfo?.memoryUsage.used.toFixed(2)} / {systemInfo?.memoryUsage.total.toFixed(2)} GB
          </p>
        </div>
      </div>
    </main>
  );
}