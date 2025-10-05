import { NextResponse } from "next/server";
import { promises as fsp } from "fs";
import path from "path";

type SetData = {
  setNumber: number;
  repTarget: number;
  weight: number;
  repsCompleted: number;
  rir: number;
  barSpeed: "Fast" | "Moderate" | "Slow";
  struggle: "Easy" | "Medium" | "Hard" | "Failure";
  form: "Clean" | "Minor Breakdown" | "Major Breakdown";
};

type WorkoutSession = {
  id: string;
  date: string;
  sets: SetData[];
  totalVolume: number;
  estimated1RM: number;
  burnoutResults?: {
    weight: number;
    reps: number;
    rir: number;
  };
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

async function readAll(): Promise<WorkoutSession[]> {
  await ensureDataFile();
  const raw = await fsp.readFile(DATA_FILE, "utf8");
  try {
    return JSON.parse(raw) as WorkoutSession[];
  } catch {
    return [];
  }
}

async function writeAll(sessions: WorkoutSession[]) {
  await ensureDataFile();
  await fsp.writeFile(DATA_FILE, JSON.stringify(sessions, null, 2), "utf8");
}

function parseDate(dateStr: string): Date {
  // Handle both formats: "September 9, 2025" and "2025-09-09"
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  } catch {}
  
  // Fallback to current date if parsing fails
  return new Date();
}

export async function GET() {
  const sessions = await readAll();
  // Latest first - sort by actual date objects
  sessions.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
  return NextResponse.json(sessions);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  
  // Handle both old simple format and new workout session format
  if (body.date && body.weight && body.reps) {
    // Old simple format - convert to new format
    const w = Number(body.weight);
    const r = Number(body.reps);
    if (!Number.isFinite(w) || !Number.isFinite(r) || w <= 0 || r <= 0) {
      return NextResponse.json({ error: "weight and reps must be positive numbers" }, { status: 400 });
    }

    const oneRm = Math.round(w * (1 + r / 30));
    const session: WorkoutSession = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: body.date,
      sets: [{
        setNumber: 1,
        repTarget: 0,
        weight: w,
        repsCompleted: r,
        rir: 0,
        barSpeed: "Moderate",
        struggle: "Medium",
        form: "Clean",
      }],
      totalVolume: w * r,
      estimated1RM: oneRm,
    };

    const all = await readAll();
    all.push(session);
    await writeAll(all);

    // Optional: forward to n8n webhook
    const webhook = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (webhook) {
      fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(session),
      }).catch(() => {});
    }

    return NextResponse.json(session, { status: 201 });
  }

  // New workout session format
  if (!body.id || !body.date || !Array.isArray(body.sets)) {
    return NextResponse.json({ error: "Invalid workout session format" }, { status: 400 });
  }

  const session: WorkoutSession = {
    id: body.id,
    date: body.date,
    sets: body.sets,
    totalVolume: body.totalVolume || 0,
    estimated1RM: body.estimated1RM || 0,
    burnoutResults: body.burnoutResults,
  };

  const all = await readAll();
  all.push(session);
  await writeAll(all);

  // Optional: forward to n8n webhook
  const webhook = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(session),
    }).catch(() => {});
  }

  return NextResponse.json(session, { status: 201 });
}

export async function DELETE() {
  try {
    // Clear all data by writing an empty array
    await writeAll([]);
    return NextResponse.json({ message: "All data cleared" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /api/bench:", error);
    return NextResponse.json({ message: "Error clearing data" }, { status: 500 });
  }
}