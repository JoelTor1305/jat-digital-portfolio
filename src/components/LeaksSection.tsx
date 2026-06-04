"use client";

import { useState } from "react";

const LEAKS = [
  {
    id: 0,
    title: "Leads slipping to voicemail",
    desc: "They call the next business in the results.",
    impact: "Lost revenue. Hot leads rarely call twice.",
    loss: 400,
  },
  {
    id: 1,
    title: "Hours lost to repetitive busywork",
    desc: "Copy-paste, scheduling, reminders, double-entry — all by hand.",
    impact: "6–12 hrs/week, gone.",
    loss: 300,
  },
  {
    id: 2,
    title: "AI is the edge — but yours isn't running",
    desc: "You've got the subscription, not the system. A browser tab, not machinery.",
    impact: "Competitors are quietly pulling ahead.",
    loss: 250,
  },
  {
    id: 3,
    title: "Stuck working IN the business, not ON it",
    desc: "Take a 3-day weekend — does everything stall?",
    impact: "A job that traps you. Zero asset value.",
    loss: 200,
  },
];

export function LeaksSection({ calendlyUrl }: { calendlyUrl: string }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalLoss = Array.from(checked).reduce((sum, id) => sum + LEAKS[id].loss, 0);

  return (
    <section style={{
      minHeight: "100vh",
      background: "#000000",
      padding: "6rem 4rem",
      fontFamily: "'Montserrat', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "800px", width: "100%", margin: "0 auto" }}>

        {/* eyebrow */}
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          color: "#ff3c00",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}>
          THE LEAKS YOU&apos;RE IGNORING
        </p>

        {/* headline */}
        <h2 style={{
          fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
          fontWeight: 700,
          fontStyle: "italic",
          color: "#e0e0e0",
          lineHeight: 1.1,
          marginBottom: "1rem",
        }}>
          Where your operation drops money<br />on a Tuesday afternoon.
        </h2>

        <p style={{
          fontFamily: "monospace",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "3rem",
          letterSpacing: "0.05em",
        }}>
          Check the ones you recognize:
        </p>

        {/* checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {LEAKS.map((leak, i) => (
            <div
              key={leak.id}
              onClick={() => toggle(leak.id)}
              style={{
                display: "flex",
                gap: "1.5rem",
                padding: "1.5rem 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderBottom: i === LEAKS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              {/* checkbox */}
              <div style={{
                width: "20px",
                height: "20px",
                border: checked.has(leak.id) ? "2px solid #ff3c00" : "2px solid rgba(255,255,255,0.2)",
                background: checked.has(leak.id) ? "rgba(255,60,0,0.15)" : "transparent",
                borderRadius: "3px",
                flexShrink: 0,
                marginTop: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}>
                {checked.has(leak.id) && (
                  <span style={{ color: "#ff3c00", fontSize: "12px", fontWeight: 700 }}>✓</span>
                )}
              </div>

              {/* content */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: checked.has(leak.id) ? "#ffffff" : "rgba(255,255,255,0.75)",
                  marginBottom: "0.3rem",
                  transition: "color 0.2s",
                }}>
                  {leak.title}
                </h3>
                <p style={{
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: "0.5rem",
                }}>
                  {leak.desc}
                </p>
                <p style={{
                  fontFamily: "monospace",
                  fontSize: "0.72rem",
                  color: checked.has(leak.id) ? "#ff3c00" : "rgba(255,255,255,0.25)",
                  transition: "color 0.2s",
                }}>
                  → {leak.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* readout */}
        <div style={{
          marginTop: "2.5rem",
          padding: "1.5rem",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          borderRadius: "4px",
        }}>
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.2em",
            marginBottom: "1rem",
            textTransform: "uppercase",
          }}>
            LEAK READOUT
          </p>
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginBottom: "0.25rem" }}>SELECTED</p>
              <p style={{ fontFamily: "monospace", fontSize: "1.1rem", color: "#e0e0e0", fontWeight: 700 }}>
                {checked.size} <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>of 4</span>
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginBottom: "0.25rem" }}>EST. WEEKLY LOSS</p>
              <p style={{ fontFamily: "monospace", fontSize: "1.1rem", color: checked.size > 0 ? "#ff3c00" : "rgba(255,255,255,0.3)", fontWeight: 700 }}>
                {checked.size > 0 ? `$${totalLoss.toLocaleString()}` : "—"}
              </p>
            </div>
          </div>
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.2)",
            marginTop: "0.75rem",
          }}>
            Based on admin hours + missed-lead callbacks.
          </p>
        </div>

        {/* closing */}
        <div style={{ marginTop: "2.5rem" }}>
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "2rem",
            lineHeight: 1.7,
          }}>
            The leaks are active. This is implementation, not imagination.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "#ffffff",
              color: "#0a0a0a",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "0.85rem",
              padding: "0.9rem 2rem",
              textDecoration: "none",
              letterSpacing: "0.05em",
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 94% 100%, 0 100%)",
              transition: "background 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#ff3c00")}
            onMouseLeave={e => (e.currentTarget.style.background = "#ffffff")}
          >
            BOOK A CALL
          </a>
        </div>

      </div>
    </section>
  );
}
