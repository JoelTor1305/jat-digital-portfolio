"use client";

import { useEffect, useMemo, useState } from "react";

export default function BenchPage() {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (document.cookie.includes("bench_auth=1")) setAuthed(true);
  }, []);

  function submitPass(e: React.FormEvent) {
    e.preventDefault();
    const pass = process.env.NEXT_PUBLIC_BENCH_PASS;
    if (input && pass && input === pass) {
      document.cookie = "bench_auth=1; path=/; max-age=2592000"; // 30d
      setAuthed(true);
    } else {
      alert("Incorrect passcode");
    }
  }

  // Basic 1RM calc (Epley)
  const [date, setDate] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const oneRm = useMemo(() => {
    const w = Number(weight || 0);
    const r = Number(reps || 0);
    return w > 0 && r > 0 ? Math.round(w * (1 + r / 30)) : 0;
  }, [weight, reps]);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/bench")
      .then((r) => r.json())
      .then((d) => setEntries(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, [authed]);

  async function submitEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !weight || !reps) return;
    setSaving(true);
    try {
      const res = await fetch("/api/bench", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ date, weight: Number(weight), reps: Number(reps), notes }),
      });
      if (res.ok) {
        const savedEntry = await res.json();
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
        setEntries((prev) => [savedEntry, ...prev]);
        setWeight("");
        setReps("");
        setNotes("");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <meta name="robots" content="noindex,nofollow" />
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Bench Log (Private)</h1>
          {!authed ? (
            <form onSubmit={submitPass} className="space-y-4 max-w-sm">
              <label className="block text-sm">Passcode</label>
              <input
                type="password"
                className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter passcode"
              />
              <button className="rounded-md bg-white/10 border border-white/20 px-4 py-2 text-sm">Enter</button>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Weight (lb)</label>
                  <input
                    type="number"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Reps</label>
                  <input
                    type="number"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-sm text-foreground/60">Estimated 1RM</div>
                <div className="text-3xl font-bold">{oneRm} lb</div>
              </div>
              <div>
                <label className="block text-sm mb-1">Notes</label>
                <textarea
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional notes"
                />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={submitEntry} disabled={saving} className="rounded-md bg-white/10 border border-white/20 px-4 py-2 text-sm">
                  {saving ? "Saving..." : "Save Entry"}
                </button>
                {saved && <span className="text-green-400 text-sm">Saved</span>}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">Recent Entries</h2>
                <div className="space-y-2">
                  {entries.map((e) => (
                    <div key={e.id} className="p-3 rounded-md bg-white/5 border border-white/10 text-sm flex justify-between">
                      <span>{e.date}</span>
                      <span>{e.weight} x {e.reps}</span>
                      <span>{e.oneRm} 1RM</span>
                    </div>
                  ))}
                  {entries.length === 0 && (
                    <p className="text-foreground/60 text-sm">No entries yet.</p>
                  )}
                </div>
              </div>
              <p className="text-foreground/70 text-sm">This page is hidden (noindex) and requires a passcode. Add NEXT_PUBLIC_BENCH_PASS to your .env.local.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}


