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

function AICoach({ sessions }: { sessions: WorkoutSession[] }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Array<{id: string, type: 'user' | 'ai', content: string, timestamp: Date}>>([]);
  const [loading, setLoading] = useState(false);

  const analyzeWorkoutData = () => {
    if (sessions.length === 0) return "No workout data available yet.";
    
    const latestSession = sessions[0];
    const totalSessions = sessions.length;
    const avgVolume = sessions.reduce((sum, s) => sum + s.totalVolume, 0) / totalSessions;
    const best1RM = Math.max(...sessions.map(s => s.estimated1RM));
    const volumeTrend = sessions.length > 1 ? 
      (sessions[0].totalVolume - sessions[1].totalVolume) : 0;
    
    return {
      totalSessions,
      latestVolume: latestSession.totalVolume,
      avgVolume: Math.round(avgVolume),
      best1RM,
      volumeTrend: Math.round(volumeTrend),
      latestDate: latestSession.date,
      latest1RM: latestSession.estimated1RM
    };
  };

  const getAIResponse = async (userQuestion: string) => {
    setLoading(true);
    
    // Add user message to chat
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: userQuestion,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI processing with workout data analysis
    const data = analyzeWorkoutData();
    
    // Simple AI responses based on common questions
    let aiResponse = "";
    
    if (userQuestion.toLowerCase().includes("progress") || userQuestion.toLowerCase().includes("improvement")) {
      aiResponse = `📈 Progress Analysis:\n\n` +
        `• Total workouts: ${data.totalSessions}\n` +
        `• Latest volume: ${data.latestVolume} lbs\n` +
        `• Average volume: ${data.avgVolume} lbs\n` +
        `• Best 1RM: ${data.best1RM} lbs\n` +
        `• Volume trend: ${data.volumeTrend > 0 ? '+' : ''}${data.volumeTrend} lbs\n\n` +
        `${data.volumeTrend > 0 ? '🎯 Great progress! You\'re increasing volume consistently.' : 
          data.volumeTrend < 0 ? '📉 Volume decreased. Consider deloading or form focus.' : 
          '📊 Steady progress. Keep pushing!'}`;
    } else if (userQuestion.toLowerCase().includes("weight") || userQuestion.toLowerCase().includes("heavy")) {
      aiResponse = `🏋️ Weight Recommendations:\n\n` +
        `• Current best 1RM: ${data.best1RM} lbs\n` +
        `• Latest session 1RM: ${data.latest1RM} lbs\n\n` +
        `Suggested next weights:\n` +
        `• 10 reps: ${Math.round(data.best1RM * 0.75)} lbs\n` +
        `• 8 reps: ${Math.round(data.best1RM * 0.8)} lbs\n` +
        `• 6 reps: ${Math.round(data.best1RM * 0.85)} lbs\n` +
        `• 4 reps: ${Math.round(data.best1RM * 0.9)} lbs\n` +
        `• 2 reps: ${Math.round(data.best1RM * 0.95)} lbs\n` +
        `• Burnout: ${Math.round(data.best1RM * 0.65)} lbs (lighter for high reps)\n\n` +
        `💡 Progressive overload: Heavy sets build strength, burnout set builds endurance with lighter weight.`;
    } else if (userQuestion.toLowerCase().includes("form") || userQuestion.toLowerCase().includes("technique")) {
      aiResponse = `🎯 Form & Technique Tips:\n\n` +
        `• Keep your feet flat on the floor\n` +
        `• Maintain a slight arch in your back\n` +
        `• Lower the bar to your chest with control\n` +
        `• Press up explosively but controlled\n` +
        `• Keep your core tight throughout\n` +
        `• Don't bounce the bar off your chest\n\n` +
        `📊 Based on your data, focus on ${data.volumeTrend < 0 ? 'form over weight' : 'progressive overload'}.`;
    } else if (userQuestion.toLowerCase().includes("rest") || userQuestion.toLowerCase().includes("recovery")) {
      aiResponse = `😴 Recovery & Rest:\n\n` +
        `• Rest 2-3 minutes between sets\n` +
        `• Take 48-72 hours between bench sessions\n` +
        `• Sleep 7-9 hours for optimal recovery\n` +
        `• Stay hydrated throughout the day\n` +
        `• Consider deloading every 4-6 weeks\n\n` +
        `📈 Your current frequency looks good with ${data.totalSessions} sessions tracked.`;
    } else if (userQuestion.toLowerCase().includes("deload")) {
      const shouldDeload = data.volumeTrend < -50 || data.totalSessions > 12;
      aiResponse = `🔄 Deload Analysis:\n\n` +
        `• Current volume trend: ${data.volumeTrend > 0 ? '+' : ''}${data.volumeTrend} lbs\n` +
        `• Total sessions: ${data.totalSessions}\n` +
        `• Latest volume: ${data.latestVolume} lbs\n\n` +
        `${shouldDeload ? 
          '⚠️ Recommendation: YES, consider deloading\n\n' +
          '• Reduce weights by 10-20%\n' +
          '• Focus on form and technique\n' +
          '• Take extra rest days\n' +
          '• Come back stronger next week!' :
          '✅ Recommendation: Keep pushing!\n\n' +
          '• Your progress looks good\n' +
          '• Continue progressive overload\n' +
          '• Monitor for signs of overtraining'}`;
    } else if (userQuestion.toLowerCase().includes("best set")) {
      const bestSet = sessions.reduce((best, session) => {
        const sessionBest = session.sets.reduce((max, set) => 
          set.weight * (1 + set.repsCompleted / 30) > max.weight * (1 + max.repsCompleted / 30) ? set : max
        );
        return sessionBest.weight * (1 + sessionBest.repsCompleted / 30) > 
               best.weight * (1 + best.repsCompleted / 30) ? sessionBest : best;
      }, sessions[0]?.sets[0] || { weight: 0, repsCompleted: 0 });
      
      const best1RM = Math.round(bestSet.weight * (1 + bestSet.repsCompleted / 30));
      aiResponse = `🏆 Your Best Set:\n\n` +
        `• Weight: ${bestSet.weight} lbs\n` +
        `• Reps: ${bestSet.repsCompleted}\n` +
        `• Estimated 1RM: ${best1RM} lbs\n` +
        `• Set type: ${bestSet.repTarget === 0 ? 'Burnout' : `${bestSet.repTarget} reps`}\n\n` +
        `🎯 This represents your current strength peak. Use this as a benchmark for future progress!`;
    } else {
      aiResponse = `🤖 I can help you with:\n\n` +
        `• Progress analysis and trends\n` +
        `• Weight recommendations\n` +
        `• Form and technique tips\n` +
        `• Recovery and rest advice\n` +
        `• Workout planning\n\n` +
        `Ask me about your bench press progress, form, or training!`;
    }
    
    setTimeout(() => {
      // Add AI response to chat
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      getAIResponse(question);
      setQuestion("");
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-black rounded-2xl border border-white/10 overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8">
            Ask me anything about your training! 💪
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 text-sm ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white rounded-3xl rounded-br-lg'
                  : 'bg-gray-600 text-white rounded-3xl rounded-bl-lg'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-600 text-white px-3 py-2 rounded-2xl rounded-bl-md text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="border-t border-white/10 p-3 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask the AI coach..."
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 min-h-10 max-h-10"
            style={{ resize: 'none' }}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl text-sm font-medium hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed h-10 min-h-10 max-h-10"
          >
            Send
          </button>
        </form>
        
        {/* Quick Questions */}
        <div className="flex flex-wrap gap-1 mt-2">
          {["Progress", "Weights", "Form", "Deload?"].map((label, index) => (
            <button
              key={index}
              onClick={() => getAIResponse(
                label === "Progress" ? "How's my progress?" :
                label === "Weights" ? "What weights should I use?" :
                label === "Form" ? "Give me form tips" :
                "Should I deload?"
              )}
              disabled={loading}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full hover:bg-gray-600 transition disabled:opacity-50"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function VolumeChart({ sessions }: { sessions: WorkoutSession[] }) {
  if (sessions.length === 0) return null;

  // Filter to only show last 16 workouts (2 months × 2 workouts/week)
  const recentSessions = sessions.slice(0, 16); // Take only the most recent 16 sessions

  // Sort sessions by date (oldest first for chart)
  const sortedSessions = [...recentSessions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  // If no recent sessions, show all sessions (fallback)
  if (sortedSessions.length === 0) {
    const allSortedSessions = [...sessions].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    return <VolumeChartDisplay sessions={allSortedSessions} showAllData={true} />;
  }

  return <VolumeChartDisplay sessions={sortedSessions} showAllData={false} />;
}

function VolumeChartDisplay({ sessions, showAllData }: { sessions: WorkoutSession[], showAllData: boolean }) {
  const maxVolume = Math.max(...sessions.map(s => s.totalVolume));
  const minVolume = Math.min(...sessions.map(s => s.totalVolume));
  const volumeRange = maxVolume - minVolume;
  const padding = volumeRange * 0.1; // 10% padding

  const chartHeight = 300;
  const chartWidth = 1000; // Reduced width to fit without scrolling
  const margin = { top: 20, right: 40, bottom: 60, left: 60 };

  // Calculate points for the line with better spacing
  const points = sessions.map((session, index) => {
    const availableWidth = chartWidth - margin.left - margin.right;
    const x = margin.left + (index / Math.max(1, sessions.length - 1)) * availableWidth;
    const y = margin.top + chartHeight - margin.top - margin.bottom - 
              ((session.totalVolume - minVolume + padding) / (volumeRange + padding * 2)) * (chartHeight - margin.top - margin.bottom);
    return { x, y, volume: session.totalVolume, date: session.date };
  });

  // Create path for the line
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  // Create area path (filled area under the line)
  const areaPath = `${pathData} L ${points[points.length - 1].x} ${margin.top + chartHeight - margin.top - margin.bottom} L ${points[0].x} ${margin.top + chartHeight - margin.top - margin.bottom} Z`;

  return (
    <div className="w-full">
      <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="max-w-full">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = margin.top + ratio * (chartHeight - margin.top - margin.bottom);
          const value = Math.round(minVolume + (1 - ratio) * (volumeRange + padding * 2));
          return (
            <g key={index}>
              <line
                x1={margin.left}
                y1={y}
                x2={chartWidth - margin.right}
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text
                x={margin.left - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-foreground/60"
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* X-axis grid lines */}
        {points.map((point, index) => (
          <line
            key={index}
            x1={point.x}
            y1={margin.top}
            x2={point.x}
            y2={chartHeight - margin.bottom}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Area under the line */}
        <path
          d={areaPath}
          fill="url(#gradient)"
          opacity="0.3"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="#3b82f6"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {/* Tooltip on hover */}
            <circle
              cx={point.x}
              cy={point.y}
              r="12"
              fill="transparent"
              className="cursor-pointer"
            >
              <title>{`${point.date}: ${point.volume} lbs`}</title>
            </circle>
          </g>
        ))}

        {/* X-axis labels */}
        {points.map((point, index) => {
          const date = new Date(point.date);
          const month = date.toLocaleDateString('en-US', { month: 'short' });
          const day = date.getDate();
          return (
            <text
              key={index}
              x={point.x}
              y={chartHeight - margin.bottom + 20}
              textAnchor="middle"
              className="text-xs fill-foreground/60"
            >
              {month} {day}
            </text>
          );
        })}

        {/* Y-axis label */}
        <text
          x={15}
          y={chartHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90, 15, ${chartHeight / 2})`}
          className="text-sm fill-foreground/80 font-medium"
        >
          Total Volume (lbs)
        </text>
      </svg>
    </div>
  );
}

export default function BenchPage() {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"dashboard" | "workout">("dashboard");
  const [currentSet, setCurrentSet] = useState(0);
  const [workoutData, setWorkoutData] = useState<SetData[]>([]);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [saving, setSaving] = useState(false);

  // Helper function to sort sessions by date (latest first)
  const sortSessionsByDate = (sessions: WorkoutSession[]): WorkoutSession[] => {
    return [...sessions].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Latest first
    });
  };

  // Current set form data
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [rir, setRir] = useState("");
  const [barSpeed, setBarSpeed] = useState<"Fast" | "Moderate" | "Slow">("Moderate");
  const [struggle, setStruggle] = useState<"Easy" | "Medium" | "Hard" | "Failure">("Medium");
  const [form, setForm] = useState<"Clean" | "Minor Breakdown" | "Major Breakdown">("Clean");

  useEffect(() => {
    if (document.cookie.includes("bench_auth=1")) {
      setAuthed(true);
      // Fetch and sort sessions
      fetch("/api/bench")
        .then(res => res.json())
        .then(data => setSessions(sortSessionsByDate(data)))
        .catch(console.error);
    }
  }, []);

  function submitPass(e: React.FormEvent) {
    e.preventDefault();
    const pass = process.env.NEXT_PUBLIC_BENCH_PASS;
    if (input && pass && input === pass) {
      document.cookie = "bench_auth=1; path=/; max-age=2592000";
      setAuthed(true);
      // Fetch and sort sessions
      fetch("/api/bench")
        .then(res => res.json())
        .then(data => setSessions(sortSessionsByDate(data)))
        .catch(console.error);
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
    const today = new Date();
    const session: WorkoutSession = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
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
        setSessions(prev => sortSessionsByDate([session, ...prev]));
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

  async function generateTestData() {
    const testSessions: WorkoutSession[] = [];
    const today = new Date();
    
    // Generate 6 workout sessions over the past 2 months with LINEAR progression
    for (let i = 0; i < 6; i++) {
      const sessionDate = new Date(today);
      sessionDate.setDate(today.getDate() - ((5 - i) * 7)); // Start 5 weeks ago, work forward (weekly workouts)
      
      // Linear progression: start at 135, increase by 7.5 lbs per session
      // i=0 gets the oldest date with lowest weight, i=7 gets newest date with highest weight
      const baseWeight = 135 + (i * 7.5);
      const sets: SetData[] = [];
      let totalVolume = 0;
      
      // Generate 6 sets (10, 8, 6, 4, 2, burnout) with consistent progression
      const repTargets = [10, 8, 6, 4, 2, 0];
      repTargets.forEach((target, setIndex) => {
        // Each set increases by 5 lbs from the previous set
        const weight = baseWeight + (setIndex * 5);
        
        // Reps stay close to target with slight positive variation (showing improvement)
        const reps = target === 0 
          ? 8 + Math.floor(Math.random() * 3) // Burnout: 8-10 reps
          : target + Math.floor(Math.random() * 2); // Regular sets: hit target or +1 rep
        
        // RIR decreases over time (showing you're getting stronger)
        const rir = target === 0 ? 0 : Math.max(0, 2 - Math.floor(i / 3));
        
        const setData: SetData = {
          setNumber: setIndex + 1,
          repTarget: target,
          weight: Math.round(weight),
          repsCompleted: Math.max(1, reps),
          rir,
          barSpeed: i < 3 ? "Moderate" : "Fast", // Getting faster over time
          struggle: i < 2 ? "Hard" : i < 5 ? "Medium" : "Easy", // Getting easier over time
          form: i < 2 ? "Minor Breakdown" : "Clean", // Form improving over time
        };
        
        sets.push(setData);
        totalVolume += setData.weight * setData.repsCompleted;
      });
      
      const topSet = sets.reduce((max, set) => 
        set.weight * (1 + set.repsCompleted / 30) > max.weight * (1 + max.repsCompleted / 30) ? set : max
      );
      const estimated1RM = Math.round(topSet.weight * (1 + topSet.repsCompleted / 30));
      
      const session: WorkoutSession = {
        id: `test-${Date.now()}-${i}`,
        date: sessionDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        sets,
        totalVolume,
        estimated1RM,
        burnoutResults: sets[5] ? {
          weight: sets[5].weight,
          reps: sets[5].repsCompleted,
          rir: sets[5].rir,
        } : undefined,
      };
      
      testSessions.push(session);
    }
    
    // Save all test sessions
    for (const session of testSessions) {
      try {
        await fetch("/api/bench", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(session),
        });
      } catch (error) {
        console.error("Error saving test session:", error);
      }
    }
    
    // Refresh the sessions list
    setSessions(prev => sortSessionsByDate([...testSessions, ...prev]));
    alert("🧪 Test data generated! Check out your progress chart!");
  }

  async function resetAllData() {
    if (!confirm("⚠️ Are you sure you want to delete ALL workout data? This cannot be undone!")) {
      return;
    }

    try {
      // Clear all sessions from the backend
      const res = await fetch("/api/bench", {
        method: "DELETE",
      });

      if (res.ok) {
        // Clear local state
        setSessions([]);
        alert("🗑️ All data has been reset! You can now start fresh or generate new test data.");
      } else {
        alert("❌ Failed to reset data. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting data:", error);
      alert("❌ An error occurred while resetting data.");
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
              <div className="flex gap-3">
                <button
                  onClick={generateTestData}
                  className="rounded-md bg-green-500/20 border border-green-500/30 px-4 py-3 text-sm font-medium hover:bg-green-500/30 transition"
                >
                  🧪 Auto-fill Test Data
                </button>
                <button
                  onClick={resetAllData}
                  className="rounded-md bg-red-500/20 border border-red-500/30 px-4 py-3 text-sm font-medium hover:bg-red-500/30 transition"
                >
                  🗑️ Reset Data
                </button>
                <button
                  onClick={startWorkout}
                  className="rounded-md bg-blue-500/20 border border-blue-500/30 px-6 py-3 text-sm font-medium hover:bg-blue-500/30 transition"
                >
                  Start Workout
                </button>
              </div>
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
              <h3 className="text-lg font-semibold mb-4">💡 Coach Recommendations</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Rep Progression */}
                <div>
                  <h4 className="text-md font-medium mb-3">📋 Next Workout Plan</h4>
                  <div className="space-y-2">
                    {Object.entries(getRecommendedWeights())
                      .filter(([reps]) => reps !== "burnout") // Remove burnout from main list
                      .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort descending: 10, 8, 6, 4, 2
                      .map(([reps, weight]) => (
                        <div key={reps} className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/10">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-blue-400">{reps}</span>
                            <span className="font-medium">{reps} reps</span>
                          </div>
                          <span className="font-bold text-lg">{weight} lbs</span>
                        </div>
                      ))}
                    {/* Burnout set at the bottom */}
                    <div className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-blue-400">🔥</span>
                        <span className="font-medium">Burnout Set</span>
                      </div>
                      <span className="font-bold text-lg">{getRecommendedWeights().burnout} lbs</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/60 mt-3">
                    💪 Progressive overload: Each set increases in weight, decreases in reps. Burnout set uses lighter weight for high reps to failure.
                  </p>
                </div>

                {/* Right Column: AI Coach */}
                <div className="flex flex-col h-[28rem]">
                  <h4 className="text-md font-medium mb-3">🤖 AI Coach Assistant</h4>
                  <div className="flex-1 min-h-0">
                    <AICoach sessions={sessions} />
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Chart */}
            {sessions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Volume Progress 
                  <span className="text-sm font-normal text-foreground/60 ml-2">
                    (Last 2 months)
                  </span>
                </h2>
                <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                  <VolumeChart sessions={sessions} />
                </div>
              </div>
            )}

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
                ? "Go to failure or near failure. Use LIGHTER weight (65% of 1RM) for 8-12 reps with good form."
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