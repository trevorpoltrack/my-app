import os from "os";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

function getCpuUsage() {
  const cpus = os.cpus();
  return cpus.map((cpu) => {
    const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
    const usage = 100 - (100 * cpu.times.idle) / total;
    return parseFloat(usage.toFixed(1));
  });
}

async function getCpuTemp() {
  const { stdout } = await execAsync("vcgencmd measure_temp");
  return parseFloat(stdout.replace("temp=", "").replace("'C", ""));
}

function bytesToGB(bytes: number) {
  return parseFloat((bytes / (1024 ** 3)).toFixed(2));
}

export async function getSystemDetails() {
  const cpuUsage = getCpuUsage();
  const cpuTemp = await getCpuTemp();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  return {
    os: {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
    },
    cpuTemp,
    cpuUsage,
    memoryUsage: {
      total: bytesToGB(totalMem),
      used: bytesToGB(usedMem),
      free: bytesToGB(freeMem),
    },
  };
}