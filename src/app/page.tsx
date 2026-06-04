import type { Metadata } from "next";
import HalideLanding from "@/components/ui/halide-topo-hero";

const CALENDLY_URL = "https://calendly.com/joelatorres1305/lets-chat";

export const metadata: Metadata = {
  title: {
    absolute: "JAT Digital — AI Systems for Business Owners",
  },
  description:
    "Stop working in your business. Put AI to work instead. Custom AI systems built to your workflow, handed off, running without you.",
};

export default function Home() {
  return (
    <>
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <HalideLanding />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "350px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 80%, #000000 100%)",
          pointerEvents: "none",
          zIndex: 50,
        }} />
      </div>

      {/* ── AGITATION ─────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "6rem 4rem",
          fontFamily: "'Montserrat', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >




        <div style={{ maxWidth: "1100px", width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* eyebrow */}
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "#ff3c00",
            textTransform: "uppercase",
            marginBottom: "3rem",
          }}>
            THE COST OF STAYING STUCK
          </p>

          {/* main statement */}
          <h2 style={{
            fontSize: "clamp(2.8rem, 6vw, 7rem)",
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#e0e0e0",
            marginBottom: "5rem",
          }}>
            You&apos;re not too busy<br />
            <span style={{ color: "#ff3c00" }}>to grow.</span><br />
            You&apos;re the bottleneck.
          </h2>

          {/* pain points */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}>
            {[
              {
                label: "01 — LEADS",
                headline: "They called. You missed it. They moved on.",
                body: "Every call that goes to voicemail is a customer someone else closed. It happens every day and you don't even know how many.",
              },
              {
                label: "02 — TIME",
                headline: "The week disappears before it starts.",
                body: "Follow-ups. Scheduling. Intake. Admin. Work that doesn't need a person — it needs a system. But you're still doing it by hand.",
              },
              {
                label: "03 — EDGE",
                headline: "You know AI is changing this. You just haven't moved.",
                body: "You've thought about it. You just haven't had time to figure out what it looks like for your business. Every week that's true, the gap gets wider.",
              },
            ].map(({ label, headline, body }, i) => (
              <div
                key={i}
                style={{
                  padding: "2.5rem 2.5rem 2.5rem 0",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  paddingLeft: i > 0 ? "2.5rem" : 0,
                }}
              >
                <p style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                }}>
                  {label}
                </p>
                <h3 style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#e0e0e0",
                  lineHeight: 1.2,
                  marginBottom: "1rem",
                }}>
                  {headline}
                </h3>
                <p style={{
                  fontFamily: "monospace",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.8,
                }}>
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* closing agitation line */}
          <div style={{
            marginTop: "4rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}>
            <p style={{
              fontFamily: "monospace",
              fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.8,
              maxWidth: "700px",
            }}>
              Every week you stay stuck inside the business is a week a smarter
              operator is widening the gap between you.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
