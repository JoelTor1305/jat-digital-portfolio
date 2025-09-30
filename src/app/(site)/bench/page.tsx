"use client";

import { useEffect, useMemo, useState } from "react";

type SetData = {
  setNumber: number;
  repTarget: number;
  weight: number;
  repsCompleted: number;
  rir: number; // Reps in Reserve
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

const REP_TARGETS = [10, 8, 6, 4, 2];
const BAR_SPEEDS = ["Fast", "Moderate", "Slow"] as const;
const STRUGGLE_LEVELS = ["Easy", "Medium", "Hard", "Failure"] as const;
const FORM_LEVELS = ["Clean", "Minor Breakdown", "Major Breakdown"] as const;

export default function BenchPage() {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"dashboard" | "workout">("dashboard");
  const [currentSet, setCurrentSet] = useState(0);
  const [workoutData, setWorkoutData] = useState<SetData[]>([]);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [saving, setSaving] = useState(false);

  // Current set form data
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [rir, setRir] = useState("");
  const [barSpeed, setBarSpeed] = useState<"Fast" | "Moderate" | "Slow">("Moderate");
  const [struggle, setStruggle] = useState<"Easy" | "Medium" | "Hard" | "Failure">("Medium");
  const [form, setForm] = useState<"Clean" | "Minor Breakdown" | "Major Breakdown">("Clean");

  useEffect(() => {
    if (document.cookie.includes("bench_auth=1")) setAuthed(true);
  }, []);

  function submitPass(e: React.FormEvent) {
    e.preventDefault();
    const pass = process.env.NEXT_PUBLIC_BENCH_PASS;
    if (input && pass && input === pass) {
      document.cookie = "bench_auth=1; path=/; max-age=2592000";
      setAuthed(true);
    } else {
      alert("Incorrect passcode");
    }
  }

  const estimated1RM = useMemo(() => {
    if (workoutData.length === 0) return 0;
    const topSet = workoutData.reduce((max, set) => 
      set.weight * (1 + set.repsCompleted / 30) > max.weight * (1 + max.repsCompleted / 30) ? set : max
    );
    return Math.round(topSet.weight * (1 + topSet.repsCompleted / 30));
  }, [workoutData]);

  const totalVolume = useMemo(() => {
    return workoutData.reduce((sum, set) => sum + (set.weight * set.repsCompleted), 0);
  }, [workoutData]);

  function startWorkout() {
    setMode("workout");
    setCurrentSet(0);
    setWorkoutData([]);
    
    // Auto-fill first set
    setTimeout(() => {
      autoFillAll();
    }, 100);
  }

  function submitSet() {
    if (!weight || !reps) return;
    if (!isBurnoutSet && !rir) return; // RIR required for non-burnout sets

    const setData: SetData = {
      setNumber: currentSet + 1,
      repTarget: currentSet < REP_TARGETS.length ? REP_TARGETS[currentSet] : 0, // 0 for burnout
      weight: Number(weight),
      repsCompleted: Number(reps),
      rir: isBurnoutSet ? 0 : Number(rir), // Always 0 for burnout sets
      barSpeed,
      struggle,
      form,
    };

    // Check if user hit the target reps
    const targetReps = currentSet < REP_TARGETS.length ? REP_TARGETS[currentSet] : 8; // 8 for burnout
    const hitTarget = Number(reps) >= targetReps;
    
    // Show feedback based on performance
    if (!hitTarget) {
      const recommended = getRecommendedWeights();
      const currentRepTarget = isBurnoutSet ? "burnout" : REP_TARGETS[currentSet];
      const suggestedWeight = recommended[currentRepTarget];
      
      if (Number(weight) > suggestedWeight) {
        alert(`💡 Coach Note: You used ${weight} lbs but only hit ${reps} reps (target: ${targetReps}). Consider reducing to ${suggestedWeight} lbs next time for better form and target completion.`);
      } else {
        alert(`💪 Good effort! You hit ${reps} reps with ${weight} lbs. The coach will adjust your next workout based on this performance.`);
      }
    } else {
      alert(`🎯 Excellent! You hit ${reps} reps with ${weight} lbs. The coach will increase your weight for next workout!`);
    }

    setWorkoutData(prev => [...prev, setData]);
    setCurrentSet(prev => prev + 1);
    
    // Check if this was the final set (burnout)
    if (currentSet >= REP_TARGETS.length) {
      // This was the burnout set - finish the workout
      finishWorkout();
      return;
    }
    
    // Clear form and auto-fill next set
    setWeight("");
    setReps("");
    setRir("");
    setBarSpeed("Moderate");
    setStruggle("Medium");
    setForm("Clean");
    
    // Auto-fill next set
    setTimeout(() => {
      autoFillAll();
    }, 100);
  }

  async function finishWorkout() {
    if (workoutData.length === 0) return;

    setSaving(true);
    const session: WorkoutSession = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString().split('T')[0],
      sets: workoutData,
      totalVolume,
      estimated1RM,
      burnoutResults: workoutData[workoutData.length - 1]?.repTarget === 0 ? {
        weight: workoutData[workoutData.length - 1].weight,
        reps: workoutData[workoutData.length - 1].repsCompleted,
        rir: workoutData[workoutData.length - 1].rir,
      } : undefined,
    };

    try {
      const res = await fetch("/api/bench", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(session),
      });
      
      if (res.ok) {
        setSessions(prev => [session, ...prev]);
        setMode("dashboard");
        setWorkoutData([]);
        setCurrentSet(0);
      }
    } finally {
      setSaving(false);
    }
  }

  function getCoachRecommendation() {
    if (sessions.length === 0) return "Start your first workout to get recommendations!";
    
    const lastSession = sessions[0];
    const topSet = lastSession.sets.reduce((max, set) => 
      set.weight * (1 + set.repsCompleted / 30) > max.weight * (1 + max.repsCompleted / 30) ? set : max
    );
    
    const nextWeight = topSet.weight + (topSet.struggle === "Easy" ? 5 : topSet.struggle === "Medium" ? 2.5 : 0);
    
    return `Next workout: Start with ${nextWeight}lbs for your top set. Focus on ${topSet.form === "Major Breakdown" ? "form improvement" : "progressive overload"}.`;
  }

  function getRecommendedWeights() {
    if (sessions.length === 0) {
      // Default starting weights for first workout
      return {
        10: 135,
        8: 145,
        6: 155,
        4: 165,
        2: 175,
        burnout: 135
      };
    }

    const lastSession = sessions[0];
    const lastSets = lastSession.sets;
    
    // Calculate progression based on last performance
    const progression = {
      10: 0,
      8: 0,
      6: 0,
      4: 0,
      2: 0,
      burnout: 0
    };

    // Find last set for each rep target
    const lastWeights = {
      10: 135,
      8: 145,
      6: 155,
      4: 165,
      2: 175,
      burnout: 135
    };

    lastSets.forEach(set => {
      if (set.repTarget > 0) {
        lastWeights[set.repTarget] = set.weight;
        
        // Calculate progression based on struggle and RIR
        let increase = 0;
        if (set.struggle === "Easy" && set.rir >= 2) {
          increase = 5; // Big jump for easy sets
        } else if (set.struggle === "Easy" && set.rir === 1) {
          increase = 2.5; // Moderate jump
        } else if (set.struggle === "Medium" && set.rir >= 2) {
          increase = 2.5; // Small jump
        } else if (set.struggle === "Medium" && set.rir === 1) {
          increase = 0; // Stay same
        } else if (set.struggle === "Hard" || set.rir === 0) {
          increase = -2.5; // Reduce weight
        }
        
        progression[set.repTarget] = increase;
      } else {
        // Burnout set
        lastWeights.burnout = set.weight;
        if (set.struggle === "Easy" && set.rir >= 2) {
          progression.burnout = 5;
        } else if (set.struggle === "Medium" && set.rir >= 1) {
          progression.burnout = 2.5;
        } else if (set.struggle === "Hard" || set.rir === 0) {
          progression.burnout = -2.5;
        }
      }
    });

    // Calculate recommended weights
    return {
      10: Math.max(95, lastWeights[10] + progression[10]),
      8: Math.max(105, lastWeights[8] + progression[8]),
      6: Math.max(115, lastWeights[6] + progression[6]),
      4: Math.max(125, lastWeights[4] + progression[4]),
      2: Math.max(135, lastWeights[2] + progression[2]),
      burnout: Math.max(95, lastWeights.burnout + progression.burnout)
    };
  }

  function autoFillWeight() {
    const recommended = getRecommendedWeights();
    const currentRepTarget = isBurnoutSet ? "burnout" : REP_TARGETS[currentSet];
    const suggestedWeight = recommended[currentRepTarget];
    
    setWeight(suggestedWeight.toString());
  }

  function autoFillReps() {
    const targetReps = isBurnoutSet ? 8 : REP_TARGETS[currentSet]; // 8 for burnout as default
    setReps(targetReps.toString());
  }

  function autoFillAll() {
    autoFillWeight();
    autoFillReps();
    // Set RIR to 0 for burnout sets
    if (isBurnoutSet) {
      setRir("0");
    }
  }

  if (!authed) {
    return (
      <>
        <meta name="robots" content="noindex,nofollow" />
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Bench Press Tracker (Private)</h1>
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
          </div>
        </section>
      </>
    );
  }

  if (mode === "dashboard") {
    return (
      <>
        <meta name="robots" content="noindex,nofollow" />
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Bench Press Tracker</h1>
              <button
                onClick={startWorkout}
                className="rounded-md bg-blue-500/20 border border-blue-500/30 px-6 py-3 text-sm font-medium hover:bg-blue-500/30 transition"
              >
                Start Workout
              </button>
            </div>

            {/* Progress Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                <div className="text-sm text-foreground/60 mb-1">Total Sessions</div>
                <div className="text-2xl font-bold">{sessions.length}</div>
              </div>
              <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                <div className="text-sm text-foreground/60 mb-1">Best 1RM</div>
                <div className="text-2xl font-bold">
                  {sessions.length > 0 ? Math.max(...sessions.map(s => s.estimated1RM)) : 0} lbs
                </div>
              </div>
              <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                <div className="text-sm text-foreground/60 mb-1">Best Volume</div>
                <div className="text-2xl font-bold">
                  {sessions.length > 0 ? Math.max(...sessions.map(s => s.totalVolume)) : 0} lbs
                </div>
              </div>
              <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                <div className="text-sm text-foreground/60 mb-1">Last Workout</div>
                <div className="text-2xl font-bold">
                  {sessions.length > 0 ? sessions[0].date : "Never"}
                </div>
              </div>
            </div>

            {/* Coach Recommendation */}
            <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20 mb-8">
              <h3 className="text-lg font-semibold mb-2">💡 Coach Recommendation</h3>
              <p className="text-foreground/80 mb-4">{getCoachRecommendation()}</p>
              
              {sessions.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Next Workout Weights:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    {Object.entries(getRecommendedWeights()).map(([reps, weight]) => (
                      <div key={reps} className="flex justify-between p-2 rounded bg-white/5">
                        <span>{reps === "burnout" ? "Burnout" : `${reps} reps`}:</span>
                        <span className="font-medium">{weight} lbs</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recent Sessions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
              <div className="space-y-3">
                {sessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{session.date}</span>
                      <span className="text-sm text-foreground/60">{session.sets.length} sets</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-foreground/60">Volume: </span>
                        <span className="font-medium">{session.totalVolume} lbs</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">1RM: </span>
                        <span className="font-medium">{session.estimated1RM} lbs</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">Top Set: </span>
                        <span className="font-medium">
                          {session.sets.reduce((max, set) => set.weight > max.weight ? set : max).weight} lbs
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {sessions.length === 0 && (
                  <p className="text-foreground/60 text-center py-8">No workouts yet. Start your first session!</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Workout Mode
  const isBurnoutSet = currentSet >= REP_TARGETS.length;
  const currentRepTarget = isBurnoutSet ? "Burnout" : REP_TARGETS[currentSet];

  return (
    <>
      <meta name="robots" content="noindex,nofollow" />
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Set {currentSet + 1} of {REP_TARGETS.length + 1}</h1>
            <button
              onClick={() => setMode("dashboard")}
              className="text-sm text-foreground/60 hover:text-foreground/80"
            >
              Cancel Workout
            </button>
          </div>

          <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-8">
            <h2 className="text-lg font-semibold mb-2">
              {isBurnoutSet ? "🔥 Burnout Set" : `Target: ${currentRepTarget} reps`}
            </h2>
            <p className="text-sm text-foreground/70 mb-3">
              {isBurnoutSet 
                ? "Go to failure or near failure. Use a weight you can do 8-12 reps with good form."
                : `Aim for ${currentRepTarget} reps with 1-2 reps in reserve.`
              }
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={autoFillAll}
                className="px-3 py-1 rounded-md bg-blue-500/20 border border-blue-500/30 text-sm hover:bg-blue-500/30 transition"
              >
                💡 Auto-fill All
              </button>
              <span className="text-sm text-foreground/60">
                Suggested: {getRecommendedWeights()[isBurnoutSet ? "burnout" : REP_TARGETS[currentSet]]} lbs × {isBurnoutSet ? "8" : REP_TARGETS[currentSet]} reps
              </span>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); submitSet(); }} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm mb-2">Weight (lbs)</label>
                <input
                  type="number"
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="135"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Reps Completed</label>
                <input
                  type="number"
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  placeholder={isBurnoutSet ? "8" : REP_TARGETS[currentSet].toString()}
                  required
                />
                <p className="text-xs text-foreground/60 mt-1">
                  Target: {isBurnoutSet ? "8-12 reps" : `${REP_TARGETS[currentSet]} reps`}
                </p>
              </div>
            </div>

            {!isBurnoutSet && (
              <div>
                <label className="block text-sm mb-2">Reps in Reserve (RIR)</label>
                <input
                  type="number"
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
                  value={rir}
                  onChange={(e) => setRir(e.target.value)}
                  placeholder="2"
                  min="0"
                  max="5"
                  required
                />
                <p className="text-xs text-foreground/60 mt-1">How many more reps could you have done?</p>
              </div>
            )}
            
            {isBurnoutSet && (
              <div>
                <label className="block text-sm mb-2">Reps in Reserve (RIR)</label>
                <div className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-foreground/60">
                  0 (Failure Set)
                </div>
                <p className="text-xs text-foreground/60 mt-1">Burnout sets go to failure - no reps left in reserve</p>
              </div>
            )}

            <div>
              <label className="block text-sm mb-2">Bar Speed</label>
              <div className="flex gap-2">
                {BAR_SPEEDS.map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setBarSpeed(speed)}
                    className={`px-3 py-2 rounded-md text-sm border transition ${
                      barSpeed === speed
                        ? "bg-white/10 border-white/20"
                        : "bg-white/5 border-white/10 hover:bg-white/8"
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Struggle Level</label>
              <div className="flex gap-2">
                {STRUGGLE_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setStruggle(level)}
                    className={`px-3 py-2 rounded-md text-sm border transition ${
                      struggle === level
                        ? "bg-white/10 border-white/20"
                        : "bg-white/5 border-white/10 hover:bg-white/8"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Form Quality</label>
              <div className="flex gap-2">
                {FORM_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setForm(level)}
                    className={`px-3 py-2 rounded-md text-sm border transition ${
                      form === level
                        ? "bg-white/10 border-white/20"
                        : "bg-white/5 border-white/10 hover:bg-white/8"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 rounded-md bg-blue-500/20 border border-blue-500/30 px-4 py-3 text-sm font-medium hover:bg-blue-500/30 transition"
              >
                {currentSet < REP_TARGETS.length ? "Next Set" : "Complete Workout"}
              </button>
              {currentSet > 0 && currentSet < REP_TARGETS.length && (
                <button
                  type="button"
                  onClick={finishWorkout}
                  disabled={saving}
                  className="px-4 py-3 rounded-md bg-green-500/20 border border-green-500/30 text-sm font-medium hover:bg-green-500/30 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Finish Early"}
                </button>
              )}
            </div>
          </form>

          {/* Current Workout Progress */}
          {workoutData.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Current Workout</h3>
              <div className="space-y-2">
                {workoutData.map((set, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-md bg-white/5 border border-white/10 text-sm">
                    <span>Set {set.setNumber}: {set.repTarget > 0 ? `${set.repTarget} reps` : "Burnout"}</span>
                    <span>{set.weight} lbs × {set.repsCompleted} reps (RIR: {set.rir})</span>
                    <span className="text-foreground/60">{set.struggle}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-md bg-white/5 border border-white/10">
                <div className="flex justify-between text-sm">
                  <span>Total Volume: {totalVolume} lbs</span>
                  <span>Est. 1RM: {estimated1RM} lbs</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}