import { NextResponse } from "next/server";
import { promises as fsp } from "fs";
import path from "path";

type BenchEntry = {
  id: string;
  date: string; // ISO yyyy-mm-dd
  weight: number;
  reps: number;
  notes?: string;
  oneRm: number;
  createdAt: string; // ISO
};

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "bench.json");

async function ensureDataFile() {
  try {
    await fsp.mkdir(DATA_DIR, { recursive: true });
    await fsp.access(DATA_FILE).catch(async () => {
      await fsp.writeFile(DATA_FILE, "[]", "utf8");
    });
  } catch {}
}

async function readAll(): Promise<BenchEntry[]> {
  await ensureDataFile();
  const raw = await fsp.readFile(DATA_FILE, "utf8");
  try {
    return JSON.parse(raw) as BenchEntry[];
  } catch {
    return [];
  }
}

async function writeAll(entries: BenchEntry[]) {
  await ensureDataFile();
  await fsp.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf8");
}

export async function GET() {
  const entries = await readAll();
  // latest first
  entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { date, weight, reps, notes } = body ?? {};

  if (!date || typeof date !== "string") {
    return NextResponse.json({ error: "date required (yyyy-mm-dd)" }, { status: 400 });
  }
  const w = Number(weight);
  const r = Number(reps);
  if (!Number.isFinite(w) || !Number.isFinite(r) || w <= 0 || r <= 0) {
    return NextResponse.json({ error: "weight and reps must be positive numbers" }, { status: 400 });
  }

  const oneRm = Math.round(w * (1 + r / 30));
  const entry: BenchEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date,
    weight: w,
    reps: r,
    notes: typeof notes === "string" && notes.trim() ? notes.trim() : undefined,
    oneRm,
    createdAt: new Date().toISOString(),
  };

  const all = await readAll();
  all.push(entry);
  await writeAll(all);

  // Optional: forward to n8n webhook if provided
  const webhook = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(entry),
    }).catch(() => {});
  }

  return NextResponse.json(entry, { status: 201 });
}


