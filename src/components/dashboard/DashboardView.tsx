import { LogoutButton } from "./LogoutButton";

type Lead = {
  id: number;
  parent_name: string;
  phone: string;
  child_age: string;
  program_name: string;
  callback_datetime: string;
  summary: string;
  priority: "HOT" | "WARM";
  priority_reason: string;
  transcript: string;
  call_time: string;
  recording_url: string | null;
  created_at: Date;
};

type Stats = {
  total_calls: string;
  leads_caught: string;
  hot_leads: string;
};

function formatDate(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#141414",
        border: `1px solid ${accent ? "rgba(255,84,54,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "10px",
        padding: "20px 16px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 700,
          color: accent ? "#ff5436" : "#fff",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          marginBottom: "8px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "9px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#555",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const isHot = lead.priority === "HOT";

  return (
    <div
      style={{
        background: "#141414",
        border: `1px solid ${isHot ? "rgba(255,84,54,0.2)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Card top strip for HOT leads */}
      {isHot && (
        <div style={{ height: "2px", background: "#ff5436" }} />
      )}

      <div style={{ padding: "16px 18px" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "3px 8px",
                borderRadius: "4px",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                background: isHot ? "#ff5436" : "rgba(245,158,11,0.15)",
                color: isHot ? "#fff" : "#f59e0b",
                border: isHot ? "none" : "1px solid rgba(245,158,11,0.3)",
              }}
            >
              {isHot ? "🔥 HOT" : "WARM"}
            </span>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>
              {lead.parent_name}
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "10px",
              color: "#444",
              whiteSpace: "nowrap",
            }}
          >
            {formatDate(lead.created_at)}
          </span>
        </div>

        {/* Contact + class row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 16px",
            marginBottom: "12px",
          }}
        >
          {lead.phone && lead.phone !== "Not captured" && (
            <a
              href={`tel:${lead.phone}`}
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "12px",
                color: "#ff5436",
                textDecoration: "none",
              }}
            >
              {lead.phone}
            </a>
          )}
          {lead.program_name && lead.program_name !== "Not captured" && (
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "12px",
                color: "#888",
              }}
            >
              {lead.program_name}
            </span>
          )}
          {lead.child_age && lead.child_age !== "Not captured" && (
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "12px",
                color: "#555",
              }}
            >
              age {lead.child_age}
            </span>
          )}
        </div>

        {/* Callback */}
        {lead.callback_datetime && lead.callback_datetime !== "No specific time requested" && (
          <div
            style={{
              marginBottom: "12px",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#444",
                paddingTop: "1px",
                whiteSpace: "nowrap",
              }}
            >
              Call back
            </span>
            <span style={{ fontSize: "13px", color: "#aaa" }}>
              {lead.callback_datetime}
            </span>
          </div>
        )}

        {/* Summary */}
        {lead.summary && (
          <p
            style={{
              fontSize: "13px",
              color: "#bbb",
              lineHeight: 1.65,
              margin: "0 0 14px",
            }}
          >
            {lead.summary}
          </p>
        )}

        {/* Call recording */}
        {lead.recording_url && (
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#444",
                marginBottom: "8px",
              }}
            >
              Call Recording
            </div>
            <audio
              controls
              preload="none"
              src={`/api/dashboard/recording?url=${encodeURIComponent(lead.recording_url)}`}
              style={{ width: "100%", borderRadius: "6px" }}
            />
          </div>
        )}

        {/* Transcript toggle */}
        {lead.transcript && (
          <details>
            <summary
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#444",
                cursor: "pointer",
                userSelect: "none",
                listStyle: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ color: "#333" }}>▶</span>
              <span>View Transcript</span>
            </summary>
            <pre
              style={{
                marginTop: "12px",
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "6px",
                padding: "14px",
                fontSize: "11px",
                fontFamily: "var(--font-geist-mono), monospace",
                color: "#666",
                lineHeight: 1.75,
                whiteSpace: "pre-wrap",
                overflowX: "auto",
                margin: "12px 0 0",
              }}
            >
              {lead.transcript}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export function DashboardView({
  clientName,
  leads,
  stats,
}: {
  clientName: string;
  leads: Lead[];
  stats: Stats;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(8px)",
          zIndex: 10,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#ff5436",
              marginBottom: "2px",
            }}
          >
            JAT DIGITAL
          </div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
            {clientName}
          </div>
        </div>
        <LogoutButton />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "28px 16px 60px",
        }}
      >
        {/* Section label */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#ff5436",
              marginBottom: "6px",
            }}
          >
            MAYA · RECEPTIONIST
          </div>
          <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Call Activity
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
          <StatCard label="Calls handled" value={stats.total_calls} />
          <StatCard label="Leads caught" value={stats.leads_caught} />
          <StatCard label="Hot leads" value={stats.hot_leads} accent={Number(stats.hot_leads) > 0} />
        </div>

        {/* Leads list */}
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#444",
            marginBottom: "16px",
            paddingBottom: "12px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          Recent Leads
        </div>

        {leads.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#333",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px",
              letterSpacing: "0.08em",
            }}
          >
            No calls yet — Maya is ready and waiting.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
